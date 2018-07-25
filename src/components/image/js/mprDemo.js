//console.log('cornerstone', cornerstone, cornerstoneWADOImageLoader, "cornerstoneWADOImageLoader");
import Hammer from 'hammerjs';
// import * as cornerstoneTools from '../public_codecs/cornerstoneTools.js';
// let cornerstoneTools = require('../public_codecs/cornerstoneTools.js')
// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
const MprImageObj = {};
cornerstone.registerImageLoader('mprW', getMprImage);
cornerstone.registerImageLoader('mprH', getMprImage);
let loaded, changeTag, infoShow, user_equipment, Orielement, Welement, Helement, OriImage, Wimage, Himage, downStartY;
let positionLine = {
	OriginElement: {
		x: undefined,
		y: undefined
	},
	CoroElement: {
		x: undefined,
		y: undefined
	},
	SagiElement: {
		x: undefined,
		y: undefined
	}
};

function concatenate(resultConstructor, ...arrays) {
	let totalLength = 0;
	for(let arr of arrays) {
		totalLength += arr.length;
	}
	let result = new resultConstructor(totalLength);
	let offset = 0;
	for(let arr of arrays) {
		result.set(arr, offset);
		offset += arr.length;
	}
	return result;
}

function kindOf(val) {
	const toString = Object.prototype.toString;
	// 原始数据类型
	if(typeof val === 'undefined') {
		return 'undefined';
	}
	if(val === null) {
		return 'null';
	}
	if(val === true || val === false || val instanceof Boolean) {
		return 'boolean';
	}
	if(typeof val === 'string' || val instanceof String) {
		return 'string';
	}
	if(typeof val === 'number' || val instanceof Number) {
		return val === val ? 'number' : 0 / 0;
	}

	// 函数
	if(typeof val === 'function' || val instanceof Function) {
		return 'function';
	}

	// 数组
	if(typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
		return 'array';
	}

	//转化为字符串之前判断对象是否为Date【日期对象】与RegExp【正则表达式】的实例对象
	if(val instanceof RegExp) {
		return 'regexp';
	}
	if(val instanceof Date) {
		return 'date';
	}

	// 其他对象
	var type = toString.call(val);

	if(type === '[object RegExp]') {
		return 'regexp';
	}
	if(type === '[object Date]') {
		return 'date';
	}
	if(type === '[object Arguments]') {
		return 'arguments';
	}
	if(type === '[object Error]') {
		return 'error';
	}

	// es6对象: Map, WeakMap, Set, WeakSet
	if(type === '[object Set]') {
		return 'set';
	}
	if(type === '[object WeakSet]') {
		return 'weakset';
	}
	if(type === '[object Map]') {
		return 'map';
	}
	if(type === '[object WeakMap]') {
		return 'weakmap';
	}
	if(type === '[object Symbol]') {
		return 'symbol';
	}

	// 数组类型
	if(type === '[object Int8Array]') {
		return Int8Array;
	}
	if(type === '[object Uint8Array]') {
		return Uint8Array;
	}
	if(type === '[object Uint8ClampedArray]') {
		return Uint8ClampedArray;
	}
	if(type === '[object Int16Array]') {
		return Int16Array;
	}
	if(type === '[object Uint16Array]') {
		return Uint16Array;
	}
	if(type === '[object Int32Array]') {
		return Int32Array;
	}
	if(type === '[object Uint32Array]') {
		return Uint32Array;
	}
	if(type === '[object Float32Array]') {
		return Float32Array;
	}
	if(type === '[object Float64Array]') {
		return Float64Array;
	}

	// 必定是个简单对象
	return 'object';
};

function getMprImage(imageId) {
	let imageIdTemp = imageId.split("//")[1];
	if(!imageId) {
		throw "unknown imageId";
	}
	//	return mprImage;
	return {
		promise: new Promise((resolve) => {
			resolve(MprImageObj[imageIdTemp]);
		}),
		cancelFn: undefined
	};
}

function createMprImage({
	sourceImage,
	width,
	seriesObj,
	sourceViewport,
	type,
	position
}) {

	//判断序列中instance的顺序
	let seriesDirection;
	let seriesLength = seriesObj["picOrderNum"].length;
	let firstImage = seriesObj[seriesObj["picOrderNum"][0]]
	let lastImage = seriesObj[seriesObj["picOrderNum"][seriesLength - 1]];
	let firstZPosition = Number(firstImage.data.string('x00200032').split("\\")[2]);
	let lastZPosition = Number(lastImage.data.string('x00200032').split("\\")[2]);
	if(firstZPosition > lastZPosition) {
		seriesDirection = true;
	} else {
		seriesDirection = false;
	}
	//计算得到需要生成的图像  高度height/列数row
	let finalDistance = Math.abs(firstZPosition - lastZPosition);
	console.log(firstZPosition, "firstZPosition", lastZPosition, "lastZPosition", finalDistance, "finalDistance");
	let mprPixelSpacing = (sourceImage.columnPixelSpacing + sourceImage.rowPixelSpacing) / 2;
	let heightAndRow = parseInt(finalDistance / mprPixelSpacing);
	console.log(heightAndRow, "heightAndRow");
	let columnPixelSpacing;
	if(type == "coro") {
		columnPixelSpacing = sourceImage.columnPixelSpacing;
	} else {
		columnPixelSpacing = sourceImage.rowPixelSpacing;
	}
	let imageId = type == "coro" ? "mprW_" + position : "mprH_" + position;
	//计算得到MPR的height值
	//seriesObj["picOrderNum"].length
	const mprImage = {
		imageId,
		color: sourceImage.color,
		columnPixelSpacing: columnPixelSpacing,
		rowPixelSpacing: mprPixelSpacing,
		columns: width,
		rows: heightAndRow,
		width: width,
		height: heightAndRow,
		originImageNum: seriesObj["picOrderNum"].length,
		intercept: sourceImage.intercept,
		invert: sourceImage.invert,
		minPixelValue: sourceImage.minPixelValue,
		maxPixelValue: sourceImage.maxPixelValue,
		sizeInBytes: seriesObj["picOrderNum"].length * width,
		slope: sourceImage.slope,
		windowCenter: sourceImage.windowCenter,
		windowWidth: sourceImage.windowWidth,
		floatPixelData: undefined,
		viewport: sourceViewport,
		pixelData: undefined,
		stats: {}
	}

	//拼接点数据的
	generateMprpixelData(mprImage, seriesObj, position, type, seriesDirection);
	mprImage.getPixelData = function() {
		return this.pixelData;
	}
	if(!MprImageObj.imageId) {
		MprImageObj[imageId] = mprImage;
	}

}

function generateMprpixelData(mprImage, seriesObj, position, type, seriesDirection) {
	//position为当前type下的断面位置, type为哪个方向的断面(冠状位coro || sagi矢位 || axis轴位)
	let seriesLength = seriesObj["picOrderNum"].length;
	//获得截取的像素位置
	if(type == "coro") {
		//冠状位--X
		let pixelArea;
		pixelArea = {
			startIndex: (position - 1) * mprImage.width,
			endIndex: position * mprImage.width
		}
		let mprPixelData;
		for(let i = 0; i < seriesLength; i++) {
			let TempPixelData = seriesObj[seriesObj["picOrderNum"][i]].getPixelData();
			let areaPixelData = TempPixelData.slice(pixelArea.startIndex, pixelArea.endIndex);
			let resultConstructor = kindOf(TempPixelData);
			if(mprPixelData && mprPixelData.length) {
				if(seriesDirection) {
					mprPixelData = concatenate(resultConstructor, mprPixelData, areaPixelData);
				} else {
					mprPixelData = concatenate(resultConstructor, areaPixelData, mprPixelData);
				}
			} else {
				mprPixelData = areaPixelData;
			}
		}
		//		console.log(mprPixelData);
		mprImage.pixelData = mprPixelData;

	} else if(type == "sagi") {
		//矢状位--Y
		let mprPixelData;
		for(let i = 0; i < seriesLength; i++) {
			//			console.log(i,seriesObj[seriesObj["picOrderNum"][i]]);
			let TempPixelData = seriesObj[seriesObj["picOrderNum"][i]].getPixelData();
			let TempWidth = seriesObj[seriesObj["picOrderNum"][i]].width;
			let TempHeight = seriesObj[seriesObj["picOrderNum"][i]].height;
			//循环取得每一行中position位置的像素值
			let resultConstructor = kindOf(TempPixelData);
			let areaPixelData;
			//获取position位置的像素点
			for(var row = 0; row < TempHeight; row++) {
				if(areaPixelData) {
					let rowPointPixelData = TempPixelData.slice(row * TempWidth + position - 1, row * TempWidth + position);
					areaPixelData = concatenate(resultConstructor, areaPixelData, rowPointPixelData);
				} else {
					areaPixelData = TempPixelData.slice(row * TempWidth + position - 1, row * TempWidth + position);
				}
			}
			if(mprPixelData && mprPixelData.length) {
				if(seriesDirection) {
					mprPixelData = concatenate(resultConstructor, mprPixelData, areaPixelData);
				} else {
					mprPixelData = concatenate(resultConstructor, areaPixelData, mprPixelData);
				}
			} else {
				mprPixelData = areaPixelData;
			}
		}
		//		console.log(mprPixelData);
		mprImage.pixelData = mprPixelData;
	}
}

function demoFn1(mprSeriesObj, mprSourceElement) {
	console.log("mprSeriesObj", mprSeriesObj);
	loaded = false;
	changeTag = "mprWL";
	infoShow = true;
	user_equipment = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "phone" : "computer";
	let firstImage = cornerstone.getImage(mprSourceElement);
	let sourceViewport = cornerstone.getViewport(mprSourceElement);
	let WOption = {
		sourceImage: firstImage,
		width: firstImage.width,
		seriesObj: mprSeriesObj,
		sourceViewport: sourceViewport,
		type: "coro",
		position: firstImage.height / 2
	}
	let HOption = {
		sourceImage: firstImage,
		width: firstImage.height,
		seriesObj: mprSeriesObj,
		sourceViewport: sourceViewport,
		type: "sagi",
		position: firstImage.width / 2
	}
	//生成MPR_image
	createMprImage(WOption);
	createMprImage(HOption);
	//赋值给positionLine,绘制图像的位置参考线
	positionLine = {
		OriginElement: {
			x: firstImage.height / 2, //横线
			y: firstImage.width / 2 //竖线
		},
		CoroElement: {
			y: undefined, //竖线
			z: undefined //横线
		},
		SagiElement: {
			x: undefined, //竖线
			z: undefined //横线
		}
	};
	console.log(MprImageObj);
	Orielement = document.getElementById("axisDiv");
	Welement = document.getElementById('coroDiv');
	Helement = document.getElementById('sagiDiv');
	//轴状位（原图）
	cornerstone.enable(Orielement);
	//监听cornerstoneimagerendered
	Orielement.addEventListener('cornerstoneimagerendered', cornerstoneimagerendered);
	cornerstoneTools.mouseInput.enable(Orielement);
	cornerstoneTools.wwwc.enable(Orielement);
	cornerstoneTools.wwwc.activate(Orielement, 1);
	OriImage = mprSeriesObj[mprSeriesObj["picOrderNum"][0]];
	cornerstone.displayImage(Orielement, OriImage);
	toolAdjust(Orielement);

	//矢状位
	cornerstone.enable(Welement);
	//监听cornerstoneimagerendered
	Welement.addEventListener('cornerstoneimagerendered', cornerstoneimagerendered);
	cornerstoneTools.mouseInput.enable(Welement)
	cornerstoneTools.wwwc.enable(Welement);
	cornerstoneTools.wwwc.activate(Welement, 1);

	cornerstone.loadImage("mprW://mprW_256").then(function(image) {
		cornerstone.displayImage(Welement, image);
		Wimage = image;
		toolAdjust(Welement);
	});

	//冠状位
	cornerstone.enable(Helement);
	//监听cornerstoneimagerendered
	Helement.addEventListener('cornerstoneimagerendered', cornerstoneimagerendered);
	cornerstoneTools.mouseInput.enable(Helement);
	cornerstoneTools.wwwc.enable(Helement);
	cornerstoneTools.wwwc.activate(Helement, 1);
	cornerstone.loadImage("mprH://mprH_256").then(function(image) {
		cornerstone.displayImage(Helement, image);
		Himage = image;
		toolAdjust(Helement);
	});
	loaded = true;
	//边框选中
	borderPitch();
	//信息是否绘制
	mprInfoShow([Orielement, Welement, Helement]);
}

//监听cornerstoneimagerendered

function cornerstoneimagerendered(e) {
//		console.log("渲染完毕");
//		console.log(this);
	let element = this;
	let detail = e.detail;
	//暂时只加原图的方向
	if(element == Orielement){
		//图像方向
		calculateOrientationMarkers(element,detail);
		//截面参考线
//		drawPosition(positionLine.OriginElement,element,detail);
	}
	//信息是否绘制
	if(infoShow){
		let image = cornerstone.getImage(element);
		let elementName = $(element).attr('id');
		imageInfoDraw(detail,image,elementName);
	}
}

//窗口自适应
function resize() {
	//console.log('loaded',loaded)
	if(loaded) {
		cornerstone.resize(Orielement, true);
		cornerstone.resize(Welement, true);
		cornerstone.resize(Helement, true);
	}
}
window.addEventListener('resize', resize);

//边框选中
function borderPitch() {
	$('#mprDicomDiv>div').off();
	$('#mprDicomDiv>div').on('mousedown', function() {
		if($("#mprDicomDiv>div").hasClass("mprPitch")) {
			$("#mprDicomDiv>div").removeClass('mprPitch')
		}
		$(this).addClass('mprPitch');
	})
}

//位置参考线
function drawPosition(coordinate, element, detail) {
	//	console.log("位置参考线",coordinate);
	if(loaded) {
		let enabledElement = cornerstone.getEnabledElement(element);
		//		console.log(enabledElement,"enabledElement");
		let context = detail.canvasContext.canvas.getContext('2d');
		const color = cornerstoneTools.toolColors.getActiveColor();
		const lineWidth = cornerstoneTools.toolStyle.getToolWidth();
		let image = cornerstone.getImage(element);
		//计算canvas的偏移位置
		let canvasWidth = detail.canvasContext.canvas.width;
		let canvasHeight = detail.canvasContext.canvas.height;
		//判断现在以图像的宽/高,哪一个作为判断依准
		let widthAbs = Math.abs(canvasWidth - image.width);
		let heightAbs = Math.abs(canvasHeight - image.height);
		let translateX = 0;
		let translateY = 0;
		if(widthAbs > heightAbs) {
			console.log(11);
			translateX = -(widthAbs / 2);
		} else {
			//			console.log(22);
			translateY = -(heightAbs / 2);
		}

		context.save();
		//		context.setTransform(1, 0, 0, 1, 0, 0);
		context.beginPath();
		context.strokeStyle = color;
		context.lineWidth = lineWidth;
		//横线
		context.save();
		if(translateX) {
			context.translate(translateX, translateY);
		}
		context.moveTo(0, coordinate.x);
		context.lineTo(image.width - translateX * 2, coordinate.x);
		context.stroke();
		context.restore();

		//竖线
		if(translateY) {
			context.translate(translateX, translateY);
		}
		context.moveTo(coordinate.y, 0);
		context.lineTo(coordinate.y, image.height - translateY * 2);
		context.stroke();
		context.restore();
	}
}
//移动线段
function moveLine(Orielement,Welement, Helement) {
	$('#axisDiv>.crosswise')[0].onmousedown = function(e) {
		let that = this;
		//清除div的所有鼠标事件
		$(Orielement).off('mousedown');
		$(Orielement).off('mousemove');
		$(Orielement).off('mouseup');
		cornerstoneTools.wwwc.disable(Orielement);
		cornerstoneTools.wwwcTouchDrag.deactivate(Orielement);
		cornerstoneTools.length.deactivate(Orielement, 1);
		cornerstoneTools.lengthTouch.deactivate(Orielement);
		///////////////////////////////////////////////////
		let synLine = $('#sagiDiv>.lengthways')[0];
		let Oy = e.clientY - that.offsetTop;
		let oldTop = that.offsetTop;
		let oldSynleft = synLine.offsetLeft;
		$(document).on('mousemove', function(e) {
			that.style.top = e.clientY - Oy + 'px';
			let changeNum = oldTop - that.offsetTop;
			synLine.style.left = oldSynleft - changeNum + 'px';
			cornerstone.updateImage(Orielement);
			cornerstone.updateImage(Helement);
		});
		$(that).on('mouseup', function() {
			$(document).off('mousemove');
			$(that).off('mouseup');
		});
	}

	$('#sagiDiv>.lengthways')[0].onmousedown = function(e) {
		let that = this;
		//清除div的所有鼠标事件
		$(Helement).off('mousedown');
		$(Helement).off('mousemove');
		$(Helement).off('mouseup');
		cornerstoneTools.wwwc.disable(Helement);
		cornerstoneTools.wwwcTouchDrag.deactivate(Helement);
		cornerstoneTools.length.deactivate(Helement, 1);
		cornerstoneTools.lengthTouch.deactivate(Helement);
		///////////////////////////////////////////////////
		let synLine = $('#axisDiv>.crosswise')[0];
		let Ox = e.clientX - that.offsetLeft;
		let oldLeft = that.offsetLeft;
		let oldSynTop = synLine.offsetTop;
		$(document).on('mousemove', function(e) {
			that.style.left = e.clientX - Ox + 'px';
			let changeNum = oldLeft - that.offsetLeft;
			synLine.style.top = oldSynTop - changeNum + 'px';
			cornerstone.updateImage(Orielement);
			cornerstone.updateImage(Helement);
		});
		$(that).on('mouseup', function() {
			$(document).off('mousemove');
			$(that).off('mouseup');
		});
	}
}
//绘制线
function mprLine(detail, elementName) {
	//console.log(detail,elementName);
	let context = detail.canvasContext.canvas.getContext('2d');
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.lineWidth = 2;
	if(elementName == 'axisDiv') {
		//横
		context.beginPath();
		context.moveTo(0, $('#axisDiv>.crosswise')[0].offsetTop+10);
		context.lineTo($('#axisDiv')[0].offsetWidth, $('#axisDiv>.crosswise')[0].offsetTop+10);
		context.strokeStyle = 'limegreen';
		context.stroke();
		//竖
		context.beginPath();
		context.moveTo($('#axisDiv>.lengthways')[0].offsetLeft+10, 0);
		context.lineTo($('#axisDiv>.lengthways')[0].offsetLeft+10, $('#axisDiv')[0].offsetHeight);
		context.strokeStyle = 'cornflowerblue';
		context.stroke();
	} else if(elementName == 'coroDiv') {
		//横
		context.beginPath();
		context.moveTo(0, $('#coroDiv>.crosswise')[0].offsetTop+10);
		context.lineTo($('#coroDiv')[0].offsetWidth, $('#coroDiv>.crosswise')[0].offsetTop+10);
		context.strokeStyle = 'lightcoral';
		context.stroke();
		//竖
		context.beginPath();
		context.moveTo($('#coroDiv>.lengthways')[0].offsetLeft+10, 0);
		context.lineTo($('#coroDiv>.lengthways')[0].offsetLeft+10, $('#coroDiv')[0].offsetHeight);
		context.strokeStyle = 'cornflowerblue';
		context.stroke();
	} else if(elementName == 'sagiDiv') {
		//横
		context.beginPath();
		context.moveTo(0, $('#sagiDiv>.crosswise')[0].offsetTop+10);
		context.lineTo($('#sagiDiv')[0].offsetWidth, $('#sagiDiv>.crosswise')[0].offsetTop+10);
		context.strokeStyle = 'lightcoral';
		context.stroke();
		//竖
		context.beginPath();
		context.moveTo($('#sagiDiv>.lengthways')[0].offsetLeft+10, 0);
		context.lineTo($('#sagiDiv>.lengthways')[0].offsetLeft+10, $('#sagiDiv')[0].offsetHeight);
		context.strokeStyle = 'limegreen';
		context.stroke();
	}
	//移动线段
	moveLine(Orielement,Welement, Helement);
}

//方位调整的展示
function calculateOrientationMarkers(element, detail) {
	//	console.log(326,detail);
	if(loaded) {
		let rowString, columnString;
		let enabledElement = cornerstone.getEnabledElement(element);
		let imagePlaneMetaData = cornerstone.metaData.get('imagePlaneModule', enabledElement.image.imageId);
		let mrtopmiddle = $(element).find('.mrtopmiddle');
		let mrbottommiddle = $(element).find('.mrbottommiddle');
		let mrrightmiddle = $(element).find('.mrrightmiddle');
		let mrleftmiddle = $(element).find('.mrleftmiddle');
		//		console.log(767567576575,enabledElement,imagePlaneMetaData);
		if(imagePlaneMetaData != undefined) {
			rowString = imagePlaneMetaData.rowCosines ? cornerstoneTools.orientation.getOrientationString(imagePlaneMetaData.rowCosines) : "";
			columnString = imagePlaneMetaData.columnCosines ? cornerstoneTools.orientation.getOrientationString(imagePlaneMetaData.columnCosines) : "";
		} else {
			rowString = '';
			columnString = '';
		}
		if(!rowString || !columnString) {
			mrtopmiddle.html("");
			mrbottommiddle.html("");
			mrrightmiddle.html("");
			mrleftmiddle.html("");
			return;
		}
		let oppositeRowString = cornerstoneTools.orientation.invertOrientationString(rowString);
		let oppositeColumnString = cornerstoneTools.orientation.invertOrientationString(columnString);
		let viewport = cornerstone.getViewport(element);
		//		console.log(oppositeColumnString,columnString,rowString,oppositeRowString);
		mrtopmiddle.html(oppositeColumnString);
		mrbottommiddle.html(columnString);
		mrrightmiddle.html(rowString);
		mrleftmiddle.html(oppositeRowString);
		//绘制方向信息
		let context = detail.canvasContext.canvas.getContext('2d');
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.font = '11px Arial';
		context.fillStyle = 'red';
		context.fillText(mrtopmiddle[0].innerHTML, mrtopmiddle[0].offsetLeft, mrtopmiddle[0].offsetTop + 5);
		context.fillText(mrrightmiddle[0].innerHTML, mrrightmiddle[0].offsetLeft - 15, mrrightmiddle[0].offsetTop);
		context.fillText(mrbottommiddle[0].innerHTML, mrbottommiddle[0].offsetLeft, mrbottommiddle[0].offsetTop + 20);
		context.fillText(mrleftmiddle[0].innerHTML, mrleftmiddle[0].offsetLeft - 8, mrleftmiddle[0].offsetTop);
		context.restore();
	}
}

//信息是否绘制
function mprInfoShow(eleArr) {
	$('#mprInfo').off();
	$('#mprInfo').on('click', function() {
		if(infoShow) {
			infoShow = false;
		} else {
			infoShow = true;
		}
		console.log(infoShow)
		for(let i = 0; i < eleArr.length; i++) {
			cornerstone.updateImage(eleArr[i]);
		}
	})
}
//病人信息展示
function patientInfoShowFn(context) {
	context.fillStyle = '#ffcc00';
	let sex = (OriImage.data.string('x00100040') || "未知") == "M" ? "男" : "女";
	let dateStr = OriImage.data.string('x00080012');
	let date = dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substr(6, 2);
	context.fillText(((OriImage.data.string('x00100010') + ' ：') || "未知 ：") + sex, 10, 20);
	context.fillText(date, 10, 35);
	context.fillText('病人ID：' + (OriImage.data.string('x00100020') || "未知"), 10, 50);
	context.fillText('SeriesID：' + (OriImage.data.string('x00200011') || "未知"), 10, 65);
}

//其他信息绘制
function imageInfoDraw(detail, image, elementName) {
	//console.log('image',image)
	let scaleNum = detail.viewport.scale;
	let context = detail.canvasContext.canvas.getContext('2d');
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.font = '11px Arial';
	let bottomLeftH = detail.canvasContext.canvas.offsetHeight;
	let bottomRightW = detail.canvasContext.canvas.offsetWidth;
	// 窗宽窗位
	let wlNum = "W/L：" + Math.round(detail.viewport.voi.windowWidth) + "/" + Math.round(detail.viewport.voi.windowCenter);
	context.fillStyle = '#ffcc00';
	context.fillText(wlNum, 10, bottomLeftH - 30);
	// 当前图片下标
	context.fillStyle = '#ffcc00';
	let howImageNum = '';
	if(elementName == 'axisDiv') {
		howImageNum = 'axis--红'
	} else if(elementName == 'coroDiv') {
		howImageNum = 'coro--绿'
	} else if(elementName == 'sagiDiv') {
		howImageNum = 'sagi--蓝'
	}
	context.fillText(howImageNum, 10, bottomLeftH - 10);
	// 放大系数
	context.fillStyle = '#ffcc00';
	context.fillText('zoom：' + parseInt(100 * scaleNum) + '%', bottomRightW - 75, bottomLeftH - 10);
	// 标尺
	let centerNum = bottomLeftH / 2;
	context.beginPath();
	context.moveTo(bottomRightW - 10, centerNum - (100 / image.rowPixelSpacing / 2) * scaleNum);
	context.lineTo(bottomRightW - 10, centerNum + (100 / image.rowPixelSpacing / 2) * scaleNum);
	context.strokeStyle = '#ffcc00';
	context.stroke();
	context.fillStyle = '#ffcc00';
	context.fillText('10cm', bottomRightW - 35, centerNum + (100 / image.rowPixelSpacing / 2) * scaleNum + 10);
	// 刻度数量
	let rulerNum = 0;
	for(let i = 0; i < 11; i++) {
		context.moveTo(bottomRightW - 10, centerNum - (100 / image.rowPixelSpacing / 2) * scaleNum + rulerNum);
		context.lineTo(bottomRightW - 20, centerNum - (100 / image.rowPixelSpacing / 2) * scaleNum + rulerNum);
		context.stroke();
		rulerNum += (100 / image.rowPixelSpacing) * scaleNum / 10;
	}
	//病人信息绘制
	patientInfoShowFn(context);
	//绘制线
	mprLine(detail, elementName);
}

// 图像滚动事件
function scrollFn(_this, difY) {

}
// 工具变动
function toolAdjust(element) {
	$(".mprAdjust").on("click", function() {
		//取得元素ID值
		changeTag = $(this).prop("id");
		//切换工具
		toolsChange(changeTag, element);
	})
}

function downFn(ev, element) {
	console.log('down11');
	downStartY = ev.clientY;
	$(element).on('mousemove', function(ev) {
		moveFn(ev, this);
	});
	$(element).on('mouseup', function() {
		upFn(this);
	});
}

function moveFn(ev, element) {
	console.log('move11');
	let difY;
	if(user_equipment == 'phone') {
		$(element).on('touchend', upFn(this));
		let startY = ev.originalEvent.targetTouches[0].clientY;
		$(element).on('touchmove', function(ev) {
			difY = ev.originalEvent.targetTouches[0].clientY - startY;
			if($(this).hasClass("mprPitch")) {
				//				scrollFn(that, difY);
			} else {
				return;
			}
		});
	} else if(user_equipment == 'computer') {
		difY = ev.clientY - downStartY;
		if($(element).hasClass("mprPitch")) {
			//			scrollFn(this, difY);
		} else {
			return;
		}
	}
}

function upFn(element) {
	console.log('up11');
	$(element).off('mousemove');
	$(element).off('mouseup');
	$(element).off('touchmove');
	$(element).off('touchend');
}
//切换工具
function toolsChange(toolName, element) {
	if(!loaded) {
		return;
	}
	cornerstoneTools.wwwc.disable(element);
	cornerstoneTools.wwwcTouchDrag.deactivate(element);
	cornerstoneTools.length.deactivate(element, 1);
	cornerstoneTools.lengthTouch.deactivate(element);
	if(toolName != "mprflipOver") {
		$(element).off('mousedown');
		$(element).off('mousemove');
		$(element).off('mouseup');
		$(element).off('touchstart');
		$(element).off('touchmove');
		$(element).off('touchend');
	}
	if(user_equipment == 'phone') {
		cornerstoneTools.touchInput.enable(element);
	}
	switch(toolName) {
		case "mprflipOver":
			if(user_equipment == 'phone') {
				$(element).on('touchstart', function(ev) {
					moveFn(ev, this);
				});
			} else if(user_equipment == 'computer') {
				cornerstoneTools.wwwc.enable(element);
				cornerstoneTools.length.enable(element, 1);
				$(element).on('mousedown', function(ev) {
					downFn(ev, this);
				});
			}
			break;
		case "mprWL":
			cornerstoneTools.wwwc.activate(element, 1);
			cornerstoneTools.wwwcTouchDrag.activate(element);
			break;
		case "mprLen":
			cornerstoneTools.length.activate(element, 1);
			cornerstoneTools.lengthTouch.activate(element);
			break;
		default:
			break;
	}
}

const mprDemo = {
	demoFn1
}
export default mprDemo;
