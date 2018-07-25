import Hammer from 'hammerjs'; // npm install --save hammerjs
//import * as cornerstone from 'cornerstone-core'; // npm install --save cornerstone-core
//import * as cornerstone from '../public_codecs/cornerstone.js';
// import * as cornerstoneTools from '../public_codecs/cornerstoneTools.js';
import { activeReferenceLine } from "./lineProjector.js";
// let cornerstoneTools = require('../public_codecs/cornerstoneTools.js')
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
//操作页面中的各类信息
import { domNodeEdit } from "./domNodeEdit.js";
let user_equipment = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "phone" : "computer";
//console.log('cornerstone', cornerstone);
//魔术棒数据与uid的对应关系
let uid_magicCoordObj = {};
let uid_startPixelPtObj = {};
let uid_magicAdjustObj = {};
let uid_magicOulinePtObj = {};
class DicomImage {
	constructor(element) {
		this.element = element;
		this.loaded = false;
		//放大倍数
		this.scaleNum = 1;
		this.currentImage = "";
		this.imageId = "";
		this.seriesObj = {};
		//所有已加载序列相对应的图像张数
		this.globalInstanceNumObj = {};
		this.currentDisplaySeries = "";
		this.currentDisplaySeriesPicNum = "";
		//当前选择工具名称
		this.currentToolName = "flipOver";
		//显示的序列有多少张图
		this.seriesNum = 0;
		//当前显示的图像在显示的序列数组中的偏移位置(为了记录处于网络情况下,内存中不能够加载全部的图像)
		//this.instanceOfSeriesOffset = 0;
		//图像内置的方位
		this.mrtopmiddle = $(element).find('.mrtopmiddle');
		this.mrbottommiddle = $(element).find('.mrbottommiddle');
		this.mrrightmiddle = $(element).find('.mrrightmiddle');
		this.mrleftmiddle = $(element).find('.mrleftmiddle');
		//DCM信息展示相关参数
		this.pixelR = "";
		this.heightBit = "";
		this.bitsStored = '';
		//病人基本信息
		this.patientName = '';
		this.patientBirthDate = '';
		this.patientID = '';
		this.patientGender = '';
		this.sID = '';
		//其他
		this.transferSyntax = '';
		this.sopClass = '';
		this.samplesPerPixel = '';
		this.photometricInterpretation = '';
		this.numberOfFrames = '';
		this.planarConfiguration = '';
		this.rows = '';
		this.columns = '';
		this.totalTime = '';
		this.loadTime = '';
		this.decodeTime = '';
		this.minStoredPixelValue = '';
		this.maxStoredPixelValue = '';
		this.basicOffsetTable = '';
		this.fragments = '';
		//像素间距
		this.pixelSpacing = '';
		this.imagePixelSpacing = '';
		this.rowPixelSpacing = '';
		//放射放大率
		this.magnification = '';
		//放射源到面板的距离
		this.sourceTOdetector = '';
		//放射源到病人的距离
		this.sourceTOpatient = '';
		//判断当前是否播放多帧
		this.isPlayingFrames = false;
		this.playFramesEle = '';
		//当前序列的imageIDArr
		this.frameImageIDs = [];
		//当前一个文件所有帧image
		this.frameImageArr = {};
		//多帧图像第一帧
		this.firstFrameImage = '';
		//多帧图像的数量
		this.numframes = "";
		//当前多帧图像的位置
		this.currentShowFrameIndex = 1;
		//帧播放Interval
		this.frameInterval = "";
		this.bitsAllocated = '';
		/////////////////////////
		//图像instanceUID
		this.instanceUID = '';
		//图像绘制信息
		this.appState = {};
		this.needUpdateAppState = true;
		this.strAppState = '';
		this.oldAppState = '';
		this.dynamicAppstate = '';
		this.c_markArr = [];
		//定位线相关
		this.drawLine = true;
		this.referenceLine = "";
		this.referenceCallback = null;
		this.dynamicCallback = null;
		this.showInfo = true;
		// VOI lut 个数
		this.voiContent = [];
		// 截距
		this.rescaleIntercept = '';
		// 斜率
		this.rescaleSlope = '';
		//记录鼠标起始位置
		this.startY = '';
		//魔术棒
		this.magicStart = false;
		this.detail = '';
		this.magicPixelCoord = [];
		this.magicCanvasCoord = {};
		this.magicCanvasOutlinePtObj = {};
		//魔术棒向后台保存的数据
		this.magicInfo = {};

		this.focusMagic = -1;
	}

	// 将要显示的序列放入状态堆栈中，并启用工具
	setSeriesAndStack(seriesObj, imageIDArr, globalInstanceNumObj, appState, magicState) {
		//		console.log("setSeriesAndStack");
		this.seriesObj = seriesObj;
		this.dynamicAppstate = JSON.stringify(appState);
		this.globalInstanceNumObj = globalInstanceNumObj;
		var imageIDArrTemp = Array.from(new Set(imageIDArr));
		//		console.log(imageIDArrTemp,"imageIDArr");

		// -----------------状态堆栈-----------------
		var stack = {
			currentImageIdIndex: 1,
			imageIds: imageIDArrTemp
		};
		// 图像注释
		var config = {
			getTextCallback: this.getTextCallback,
			changeTextCallback: this.changeTextCallback,
			drawHandles: false,
			drawHandlesOnHover: true,
			arrowFirst: true
		}
		var configuration = {
			testPointers: function(eventData) {
				return(eventData.numPointers >= 3);
			}
		};
		cornerstoneTools.panMultiTouch.setConfiguration(configuration);
		cornerstoneTools.arrowAnnotate.setConfiguration(config);
		// 将堆栈设置为工具状态
		cornerstoneTools.addStackStateManager(this.element, ['stack']);

		cornerstoneTools.addToolState(this.element, 'stack', stack);
		if(JSON.stringify(magicState) != "{}") {
			this.clearMagicDraw = false;
			uid_magicCoordObj = magicState.coord;
			uid_startPixelPtObj = magicState.startPixelPt;
			uid_magicAdjustObj = magicState.threshold;
			//uid_magicOulinePtObj = magicState.oulinePt;
		}
		if(appState) {
			this.restoreSeriesObj();
		}
		if(Object.keys(uid_magicCoordObj).length || Object.keys(uid_startPixelPtObj).length || Object.keys(uid_magicAdjustObj).length || Object.keys(uid_magicOulinePtObj).length) {
			this.restoreMagicSeriesObj();
		}
		this.focusMagic = -1;
		// 启用要用的所有工具
		//cornerstoneTools.stackScrollWheel.activate(this.element);
	}

	// 当前显示序列
	setCurrentDisplaySeries(currentDisplaySeries, seriesNum, SeriesPicNum) {
		this.currentDisplaySeries = currentDisplaySeries;
		//console.log('SeriesPicNum',169,SeriesPicNum,this.seriesObj[currentDisplaySeries]["picOrderNum"][SeriesPicNum - 1],this.seriesObj);
		this.currentDisplaySeriesPicNum = SeriesPicNum ? SeriesPicNum : this.seriesObj[currentDisplaySeries]["picOrderNum"][0];
		this.seriesNum = seriesNum || 0;
		//在这里初始化一下帧图像
		clearInterval(this.frameInterval);
		// 判断当前是否播放多帧
		this.isPlayingFrames = false;
		this.playFramesEle = '';
		// 当前序列的imageIDArr
		this.frameImageIDs = [];
		// 多帧图像的数量
		this.numframes = "";
		// 当前多帧图像的位置
		this.currentShowFrameIndex = 1;
		// 帧播放Interval
		this.frameInterval = "";
	}

	//更新序列
	updateSeriesObjAndInstance(seriesObj, globalInstanceNumObj) {
		this.seriesObj = seriesObj;
		this.globalInstanceNumObj = globalInstanceNumObj;
	}

	destoryImage() {
		cornerstone.disable(this.element);
		if(this.isPlayingFrames){
			this.stopFramesFn();
		}
		clearInterval(this.loadingTipInterval);
	}

	//清空魔术棒数据
	clearMagicData(){
		uid_magicCoordObj = {};
		uid_startPixelPtObj = {};
		uid_magicAdjustObj = {};
		uid_magicOulinePtObj = {};
	}
	// 图像初始化
	initImage() {
		cornerstone.disable(this.element);
		cornerstone.enable(this.element);
		let _this = this;
		this.element.addEventListener('cornerstonetoolsmeasurementadded', function(e) {
			//console.log("cornerstonetoolsmeasurementadded",e.detail);
		});
		this.element.addEventListener('cornerstonemeasurementremoved', function(e) {
			//console.log("cornerstonemeasurementremoved",e.detail);
		});
		this.element.addEventListener('cornerstonetoolsmeasurementmodified', function(e) {
			//			console.log("cornerstonetoolsmeasurementmodified",e.detail);
		});
		this.element.addEventListener('cornerstoneimagerendered', function(e) {
			_this.detail = e.detail;
			_this.onImageRendered(e);
		});
		//$(this.element).on('mousedown', this.downFn.bind(this));
		if(user_equipment == 'phone') {
			this.element.onmousewheel = null;
			$(this.element).on('touchstart', this.moveFn.bind(this));
		} else if(user_equipment == 'computer') {
			// 执行滚动事件
			this.element.onmousewheel = function() {
				if($('#dicomDiv>div').length == 1) {
					_this.scrollFn(_this);
				} else {
					if($(this).hasClass("pitch")) {
						_this.scrollFn(_this);
					} else {
						return;
					}
				}
			}
		}
		let loadingTip = $(this.element).find(".loadingTip")
		this.loadingTipInterval = setInterval(function() {
			loadingTip.css("display", "none");
		}, 3000);
	}

	//检查是否处于freehand
	freeHandCheck() {
		let toolState = cornerstoneTools.getToolState(this.element, "freehand");
		let freeHandFinished = true;
		//		console.log(toolState);
		if(toolState) {
			let toolStateData = toolState.data;
			if(toolStateData[toolStateData.length - 1].active) {
				freeHandFinished = false;
			}
		}
		return freeHandFinished;
	}

	// 图像滚动事件
	scrollFn(_this, difY) {
		//检查是否处于freehand
		if(!this.freeHandCheck()) {
			return;
		}
		let _seriesObj = _this.seriesObj;
		let _globalInstanceNumArr = _this.globalInstanceNumObj[_this.currentDisplaySeries];
		let _currentDisplaySeries = _this.currentDisplaySeries;
		if(_seriesObj == "{}" || _currentDisplaySeries == "") {
			return;
		}
		//let index = _seriesObj[_currentDisplaySeries]["picOrderNum"].indexOf(_this.currentDisplaySeriesPicNum);
		let index = _globalInstanceNumArr.indexOf(_this.currentDisplaySeriesPicNum);
		// 如果只有1张，不触发滚动事件变化
		//let _currentDisplaySeriesPicLen = _seriesObj[_currentDisplaySeries]["picOrderNum"].length;
		let _currentDisplaySeriesPicLen = _globalInstanceNumArr.length;
		console.log(_seriesObj,_globalInstanceNumArr,_currentDisplaySeries,index,_currentDisplaySeriesPicLen);
		if(_currentDisplaySeriesPicLen < 2) {
			return;
		}
		var dir;
		if(user_equipment == 'phone') {
			if(difY >= 15) {
				dir = 'Down';
			} else if(difY <= -15) {
				dir = 'Up'
			}
		} else if(user_equipment == 'computer') {
			if(event.wheelDelta) {
				dir = event.wheelDelta > 0 ? 'Up' : 'Down';
			} else {
				if(difY >= 3) {
					dir = 'Down';
				} else if(difY <= -3) {
					dir = 'Up'
				}
			}
		}

		if(dir == 'Up') {
			index--;
		} else if(dir == 'Down') {
			index++;
		}
		if(index >= _currentDisplaySeriesPicLen) {
			index = _currentDisplaySeriesPicLen - 1;
			//return;
		} else if(index < 0) {
			index = 0;
			$(_this.element).find(".loadingTip").css("display", "none");
			return;
		}
		//整理魔术棒数据
		_this.restoreMagicSeriesObj();
		//判断当前seriesObj是否存在图像
//		console.log(1,_seriesObj[_currentDisplaySeries],2, _globalInstanceNumArr[index]);
//		console.log(3,_globalInstanceNumArr);
		if(_seriesObj[_currentDisplaySeries]["picOrderNum"].indexOf(_globalInstanceNumArr[index]) < 0) {
			//认为可能数据有问题,或者需要进行数据请求
			_this.dynamicCallback(_this.currentDisplaySeriesPicNum, _this.currentDisplaySeries, true);
			$(_this.element).find(".loadingTip").css("display", "block");
			return;
		}
		//_this.currentDisplaySeriesPicNum = _seriesObj[_currentDisplaySeries]["picOrderNum"][index];
		_this.currentDisplaySeriesPicNum = _globalInstanceNumArr[index];
		//切换图像
		let viewport = cornerstone.getViewport(_this.element);
		_this.dynamicCallback(_this.currentDisplaySeriesPicNum, _this.currentDisplaySeries);
		_this.imageView(_seriesObj[_currentDisplaySeries][_this.currentDisplaySeriesPicNum], viewport);
		_this.referenceCallback();
		//$(".loadingTip").css("display","none");
//		console.log(344,this.currentImage);
		//动态拼接魔术棒状态栏
		_this.magicStatus();
		_this.focusMagic = -1;
		return false;
	}

	// 所有canvas图像自适应窗口
	resize() {
		cornerstone.resize(this.element, true);
	}

	// 判断图像类型并展示图像
	imageView(image, viewportValue) {
		let _this = this;
		this.loaded = true;
		let start = new Date().getTime();
		// 传递dcm信息并去解析
		this.dcmInfoFn(image);
		//查看是否存在多帧
		let numframes = parseInt(image.data.string("x00280008"));
		//		console.log(331,'多少帧',numframes);
		if(!numframes) {
			cornerstone.displayImage(this.element, image);
			this.imageViewAttach(image, viewportValue, start);
			//console.log('aa',image)
		} else {
			this.numframes = numframes;
			//添加多帧frameImageIDs
			let beforeImageid = image.imageId;
			let frameStrIndex = Number(beforeImageid.indexOf('\?'));
			if(frameStrIndex != -1) {
				beforeImageid = image.imageId.substr(0, frameStrIndex);
			}
			for(let i = 0; i < numframes; i++) {
				let frameImageId = beforeImageid + "?frame=" + i;
				this.frameImageIDs.push(frameImageId);
			}
			this.frameLoadImage(this.frameImageIDs);
			//console.log(343,beforeImageid,'frameImageIDs',this.frameImageIDs);
			//如果是多帧，默认处理第一帧
			if(!(image.columnPixelSpacing || image.rowPixelSpacing)) {
				try {
					let frame_pixelspacing = image.data.elements.x52009230.items[0].dataSet.elements.x00289110.items[0].dataSet.string('x00280030');
					let index_num = frame_pixelspacing.indexOf('\\');
					image.columnPixelSpacing = Number(frame_pixelspacing.substr(0, index_num));
					image.rowPixelSpacing = Number(frame_pixelspacing.substr(index_num + 1));
				} catch(e) {
					//TODO handle the exception
				}
			}
			image.imageId = beforeImageid + "?frame=0";
			cornerstone.displayImage(this.element, image);
			this.imageViewAttach(image, viewportValue, start);
			//保存第一帧状态
			this.firstFrameImage = image;
		}
	}

	// 多帧loadImage处理
	frameLoadImage(frameImageIDs) {
		//console.log('frameImageIDs',frameImageIDs);
		let _this = this;
		for(let i = 0; i < frameImageIDs.length; i++) {
			cornerstone.loadImage(frameImageIDs[i]).then(function(image) {
				if(!(image.columnPixelSpacing || image.rowPixelSpacing)) {
					try {
						let frame_pixelspacing = image.data.elements.x52009230.items[0].dataSet.elements.x00289110.items[0].dataSet.string('x00280030');
						let index_num = frame_pixelspacing.indexOf('\\');
						image.columnPixelSpacing = Number(frame_pixelspacing.substr(0, index_num));
						image.rowPixelSpacing = Number(frame_pixelspacing.substr(index_num + 1));
					} catch(e) {
						//TODO handle the exception
					}
				}
				//console.log(22, image);
				let frameIndex = image.imageId.substr(image.imageId.indexOf('=') + 1);
				_this.frameImageArr[frameIndex] = image;
			}, function(err) {
				//				console.log(err, "frame帧显示出错");
			})
		}
	}

	// 多帧播放
	playFramesFn() {
		this.frameImageArr[0] = this.firstFrameImage;
//		console.log('this.frameImageArr', this.frameImageArr);
		if(this.frameImageIDs.length == 0) {
			return;
		}
		this.isPlayingFrames = true;
		this.playFramesEle = $('<img src="' + domNodeEdit.stopImgBase64 + '">');
		$('#playFrames').empty().append(this.playFramesEle).append($('<span>多帧演示</span>'));
		//播放
		var _this = this;
		this.frameInterval = setInterval(function() {
			let start = new Date().getTime();
			let viewport = cornerstone.getViewport(_this.element);
			if(_this.currentShowFrameIndex >= _this.numframes) {
				_this.currentShowFrameIndex = 0;
			}
			//恢复多帧图像每一帧的魔术棒痕迹
			let nowImage = _this.frameImageArr[_this.currentShowFrameIndex];
			//console.log(428, nowImage);
			//整理每张图像对应的魔术棒数据
			let frameIndex = nowImage.imageId.substr(nowImage.imageId.indexOf('=') + 1);
			for(let frameKey in uid_magicCoordObj[_this.instanceUID]) {
				if(frameIndex == frameKey) {
					nowImage.magicCoordObj = uid_magicCoordObj[_this.instanceUID][frameKey];
				}
			}
			for(let frameKey in uid_startPixelPtObj[_this.instanceUID]) {
				if(frameIndex == frameKey) {
					nowImage.startPixelPtObj = uid_startPixelPtObj[_this.instanceUID][frameKey];
				}
			}
			for(let frameKey in uid_magicAdjustObj[_this.instanceUID]) {
				if(frameIndex == frameKey) {
					nowImage.magicAdjustObj = uid_magicAdjustObj[_this.instanceUID][frameKey];
				}
			}
//			for(let frameKey in uid_magicOulinePtObj[_this.instanceUID]) {
//				if(frameIndex == frameKey) {
//					nowImage.magicAdjustObj = uid_magicOulinePtObj[_this.instanceUID][frameKey];
//				}
//			}
			/////
			cornerstone.displayImage(_this.element, nowImage);
			_this.imageViewAttach(nowImage, viewport, start);
			// 魔术棒绘制
			if(!_this.currentImage.clearMagicDraw) {
				//console.log(77777,_this.currentImage,_this.magicEnable,_this.currentImage.clearMagicDraw);
				_this.magicDraw(_this.detail.canvasContext.canvas.getContext('2d'));
				//_this.magicOutlineDraw(_this.detail.canvasContext.canvas.getContext('2d'));
			}
			//动态拼接魔术棒状态栏
			_this.magicStatus();
			_this.currentShowFrameIndex++;
		}, 500);
	}
	// 多帧暂停播放
	stopFramesFn() {
		this.isPlayingFrames = false;
		this.playFramesEle = $('<img src="' + domNodeEdit.playImgBase64 + '">');
		$('#playFrames').empty().append(this.playFramesEle).append($('<span>多帧演示</span>'));
		//暂停播放
		clearInterval(this.frameInterval);
	}

	// 处理需要显示的图像
	imageViewAttach(image, viewportValue, start) {
		cornerstoneTools.mouseInput.enable(this.element);
		cornerstoneTools.touchInput.enable(this.element);
		// 当前图像
		//console.log(475,'imageViewAttach')
		this.currentImage = image;
		//魔术棒操作次数
		if(!this.currentImage.start) {
			this.currentImage.start = 0;
		}
		//点击处坐标数组
		if(!this.currentImage.startPixelPtObj) {
			this.currentImage.startPixelPtObj = {};
		}
		//魔术棒痕迹像素坐标
		if(!this.currentImage.magicCoordObj) {
			this.currentImage.magicCoordObj = {};
		}
		//魔术棒轮廓像素坐标
		if(!this.currentImage.magicOulinePtObj) {
			this.currentImage.magicOulinePtObj = {};
		}
		//魔术棒阈值
		if(!this.currentImage.magicAdjustObj) {
			this.currentImage.magicAdjustObj = {};
		}
		this.imageId = image.imageId;
		if(!viewportValue) {
			var viewport = cornerstone.getDefaultViewportForImage(this.element, image);
		} else {
			var viewport = viewportValue;
		}
		cornerstone.setViewport(this.element, viewport);

		/* 获得ModalityLUT以及VOILUT的数值显示 */
		let LMviewport = cornerstone.getViewport(this.element);
		if(LMviewport.voiLUT) {
			LMviewport.voiLUT = undefined;
			cornerstone.setViewport(this.element, LMviewport);
		}
		// 斜率截距
		//		console.log('呀呀呀呀',this.rescaleIntercept,this.rescaleSlope);
		//		if(this.rescaleIntercept || this.rescaleSlope){
		//			LMviewport.voi.windowCenter = LMviewport.voi.windowCenter * this.rescaleSlope + this.rescaleIntercept;
		//			cornerstone.setViewport(this.element, LMviewport);
		//		}
		//		console.log(LMviewport)

		// totalTime
		let end = new Date().getTime();
		this.totalTime = end - start;
		$('#totalTime').html(this.totalTime + "ms");

		//lut选项
		this.vLutFn();
		this.magicStatus();
	}
	// DCM的相关信息解析
	dcmInfoFn(image) {
		// 其他
//		console.log('imageaaaa',image)
		this.transferSyntax = image.data.string('x00020010') || '';
		this.sopClass = image.data.string('x00080016') || '';
		this.samplesPerPixel = image.data.uint16('x00280002') || '';
		this.photometricInterpretation = image.data.string('x00280004') || '';
		// 图像名称信息
		this.instanceUID = image.data.string('x00080018');
		// 是否是多帧
		this.numberOfFrames = Number(image.data.string('x00280008') || "0");
		//整理魔术棒数据（多帧图处理）
		if(this.numberOfFrames > 0) {
			if(!uid_magicCoordObj[this.instanceUID]) {
				uid_magicCoordObj[this.instanceUID] = {};
			}
			if(!uid_startPixelPtObj[this.instanceUID]) {
				uid_startPixelPtObj[this.instanceUID] = {};
			}
			if(!uid_magicAdjustObj[this.instanceUID]) {
				uid_magicAdjustObj[this.instanceUID] = {};
			}
//			if(!uid_magicOulinePtObj[this.instanceUID]) {
//				uid_magicOulinePtObj[this.instanceUID] = {};
//			}
		}

		this.planarConfiguration = image.data.uint16('x00280103') || '';
		this.rows = image.data.uint16('x00280010');
		this.columns = image.data.uint16('x00280011');
		this.bitsAllocated = image.data.uint16('x00280100') || '';
		this.bitsStored = image.data.uint16('x00280101') || '';
		this.basicOffsetTable = image.data.elements.x7fe00010 && image.data.elements.x7fe00010.basicOffsetTable ? image.data.elements.x7fe00010.basicOffsetTable.length : '';
		this.fragments = image.data.elements.x7fe00010 && image.data.elements.x7fe00010.fragments ? image.data.elements.x7fe00010.fragments.length : '';
		this.loadTime = image.loadTimeInMS;
		this.decodeTime = image.decodeTimeInMS;
		this.minStoredPixelValue = image.minPixelValue || '';
		this.maxStoredPixelValue = image.maxPixelValue || '';
		// 判断窗宽窗位是否合法
		this.pixelR = image.data.uint16('x00280103');
		this.heightBit = image.data.uint16('x00280102') || '';
		// 病人基本信息
		this.patientName = image.data.string('x00100010');
		this.patientBirthDate = image.data.string('x00100030');
		this.patientID = image.data.string('x00100020');
		this.patientGender = image.data.string('x00100040');
		this.sID = image.data.string('x00200011');
		// 像素间距
		this.pixelSpacing = image.data.string('x00280030');
		this.imagePixelSpacing = image.data.string('x00181164') || '';
		this.rowPixelSpacing = image.rowPixelSpacing;
		// 放射放大系数
		this.magnification = Number(image.data.string('x00181114'));
		// 放射源到面板的距离
		this.sourceTOdetector = image.data.string('x00181110');
		// 放射源到病人的距离
		this.sourceTOpatient = image.data.string('x00181111');
		//this.modalityLUT = cornerstone.metaData.get('modalityLutModule', image.imageId).modalityLUTSequence;
		this.voiContent = cornerstone.metaData.get('voiLutModule', image.imageId);
		// 斜率截距
		this.rescaleIntercept = Number(image.data.string('x00281052'));
		this.rescaleSlope = Number(image.data.string('x00281053'));
		//console.log('斜率截距', this.rescaleIntercept, this.rescaleSlope)
	}

	// 停用工具    // before making a new tool active
	disableAllTools() {
		cornerstoneTools.wwwc.disable(this.element);
		cornerstoneTools.pan.deactivate(this.element, 2); // 2 is middle mouse button
		cornerstoneTools.zoom.deactivate(this.element, 1); // 4 is right mouse button
		cornerstoneTools.probe.deactivate(this.element, 1);
		cornerstoneTools.length.deactivate(this.element, 1);
		cornerstoneTools.ellipticalRoi.deactivate(this.element, 1);
		cornerstoneTools.rectangleRoi.deactivate(this.element, 1);
		cornerstoneTools.angle.deactivate(this.element, 1);
		cornerstoneTools.highlight.deactivate(this.element, 1);
		cornerstoneTools.freehand.deactivate(this.element, 1);
		cornerstoneTools.stackScroll.deactivate(this.element);
		cornerstoneTools.arrowAnnotate.deactivate(this.element, 1);
		cornerstoneTools.freehand.deactivate(this.element, 1);
		// touch
		cornerstoneTools.wwwcTouchDrag.deactivate(this.element);
		cornerstoneTools.probeTouch.deactivate(this.element);
		cornerstoneTools.panTouchDrag.deactivate(this.element);
		cornerstoneTools.zoomTouchDrag.deactivate(this.element);
		cornerstoneTools.lengthTouch.deactivate(this.element);
		cornerstoneTools.ellipticalRoiTouch.deactivate(this.element);
		cornerstoneTools.rectangleRoiTouch.deactivate(this.element);
		cornerstoneTools.angleTouch.deactivate(this.element);
		cornerstoneTools.stackScrollTouchDrag.deactivate(this.element);
		cornerstoneTools.arrowAnnotateTouch.deactivate(this.element);
		cornerstoneTools.rotateTouchDrag.deactivate(this.element);
		cornerstoneTools.rotateTouch.disable(this.element);
	}

	// 禁用工具
	enableAllTools() {
		cornerstoneTools.wwwc.enable(this.element);
		cornerstoneTools.pan.enable(this.element, 2); // 2 is middle mouse button
		cornerstoneTools.zoom.enable(this.element, 1); // 4 is right mouse button
		cornerstoneTools.probe.enable(this.element, 1);
		cornerstoneTools.length.enable(this.element, 1);
		cornerstoneTools.ellipticalRoi.enable(this.element, 1);
		cornerstoneTools.rectangleRoi.enable(this.element, 1);
		cornerstoneTools.angle.enable(this.element, 1);
		cornerstoneTools.highlight.enable(this.element, 1);
		cornerstoneTools.freehand.enable(this.element, 1);
		cornerstoneTools.stackScroll.enable(this.element);
		cornerstoneTools.arrowAnnotate.enable(this.element, 1);
		cornerstoneTools.freehand.enable(this.element, 1);
		// touch
		cornerstoneTools.wwwcTouchDrag.deactivate(this.element);
		cornerstoneTools.probeTouch.deactivate(this.element);
		cornerstoneTools.panTouchDrag.deactivate(this.element);
		cornerstoneTools.zoomTouchDrag.deactivate(this.element);
		cornerstoneTools.lengthTouch.deactivate(this.element);
		cornerstoneTools.ellipticalRoiTouch.deactivate(this.element);
		cornerstoneTools.rectangleRoiTouch.deactivate(this.element);
		cornerstoneTools.angleTouch.deactivate(this.element);
		cornerstoneTools.stackScrollTouchDrag.deactivate(this.element);
		cornerstoneTools.arrowAnnotateTouch.deactivate(this.element);
		cornerstoneTools.rotateTouchDrag.deactivate(this.element);
		cornerstoneTools.rotateTouch.disable(this.element);
	}

	// 方位调整的展示
	calculateOrientationMarkers() {
		var _this = this;
		var enabledElement = cornerstone.getEnabledElement(this.element);
		var imagePlaneMetaData = cornerstone.metaData.get('imagePlaneModule', enabledElement.image.imageId);
		//console.log(767567576575,enabledElement,imagePlaneMetaData);
		if(imagePlaneMetaData != undefined) {
			var rowString = imagePlaneMetaData.rowCosines ? cornerstoneTools.orientation.getOrientationString(imagePlaneMetaData.rowCosines) : "";
			var columnString = imagePlaneMetaData.columnCosines ? cornerstoneTools.orientation.getOrientationString(imagePlaneMetaData.columnCosines) : "";
		} else {
			var rowString = '';
			var columnString = '';
		}
		//console.log('rowString',rowString);
		if(!rowString || !columnString) {
			this.mrtopmiddle.html("");
			this.mrbottommiddle.html("");
			this.mrrightmiddle.html("");
			this.mrleftmiddle.html("");
			return;
		}

		var oppositeRowString = cornerstoneTools.orientation.invertOrientationString(rowString);
		var oppositeColumnString = cornerstoneTools.orientation.invertOrientationString(columnString);
		// 监听角度变化
		let viewport = cornerstone.getViewport(this.element);
		if(viewport.rotation == 0) {
			this.mrtopmiddle.html(oppositeColumnString);
			this.mrbottommiddle.html(columnString);
			this.mrrightmiddle.html(rowString);
			this.mrleftmiddle.html(oppositeRowString);
			mirrorFn();
		} else if(viewport.rotation == 90) {
			this.mrtopmiddle.html(oppositeRowString);
			this.mrbottommiddle.html(rowString);
			this.mrrightmiddle.html(oppositeColumnString);
			this.mrleftmiddle.html(columnString);
			mirrorFn();
		} else if(viewport.rotation == 180) {
			this.mrtopmiddle.html(columnString);
			this.mrbottommiddle.html(oppositeColumnString);
			this.mrrightmiddle.html(oppositeRowString);
			this.mrleftmiddle.html(rowString);
			mirrorFn();
		} else if(viewport.rotation == 270) {
			this.mrtopmiddle.html(rowString);
			this.mrbottommiddle.html(oppositeRowString);
			this.mrrightmiddle.html(columnString);
			this.mrleftmiddle.html(oppositeColumnString);
			mirrorFn();
		}
		// 监听镜像变化
		function mirrorFn() {
			let thtml = _this.mrtopmiddle.html();
			let bhtml = _this.mrbottommiddle.html();
			let rhtml = _this.mrrightmiddle.html();
			let lhtml = _this.mrleftmiddle.html();
			if(viewport.hflip) {
				if(viewport.rotation == 180 || viewport.rotation == 0) {
					_this.mrrightmiddle.html(lhtml);
					_this.mrleftmiddle.html(rhtml);
				} else {
					_this.mrtopmiddle.html(bhtml);
					_this.mrbottommiddle.html(thtml);
				}
			}
			if(viewport.vflip) {
				if(viewport.rotation == 90 || viewport.rotation == 270) {
					_this.mrrightmiddle.html(lhtml);
					_this.mrleftmiddle.html(rhtml);
				} else {
					_this.mrtopmiddle.html(bhtml);
					_this.mrbottommiddle.html(thtml);
				}
			}
		}

	}

	// 调整窗宽窗位、自定义窗宽窗位
	wwwlAdjust(ww, wl) {
		if(!this.loaded || this.currentImage == "") {
			return;
		}
		// 最大窗宽
		let maxWW = Math.pow(2, this.bitsStored);
		let wwTOP = '';
		let wwBOTTOM = '';
		//		this.rescaleIntercept,this.rescaleSlope
		//判断pixelR值，是1则存在负值，是0则全为正
		if(this.pixelR) {
			if(this.rescaleSlope || this.rescaleIntercept) {
				wwTOP = (Math.pow(2, this.heightBit) - 1) * this.rescaleSlope + this.rescaleIntercept;
				wwBOTTOM = (-Math.pow(2, this.heightBit)) * this.rescaleSlope + this.rescaleIntercept;
			} else {
				wwTOP = Math.pow(2, this.heightBit) - 1;
				wwBOTTOM = -Math.pow(2, this.heightBit);
			}
		} else {
			if(this.rescaleSlope || this.rescaleIntercept) {
				wwTOP = (Math.pow(2, this.heightBit) * 2) * this.rescaleSlope + this.rescaleIntercept;
				wwBOTTOM = 0 + this.rescaleIntercept;
			} else {
				wwTOP = Math.pow(2, this.heightBit) * 2;
				wwBOTTOM = 0;
			}
		}
		//		console.log('wl', ww, wl)
		//		console.log('斜率截距', this.rescaleSlope, this.rescaleIntercept);
		//		console.log('最大窗宽', maxWW, wwTOP, wwBOTTOM);
		//判断输入的窗位、窗宽是否合法
		if((wl >= wwBOTTOM && wl <= wwTOP) && (ww > 0 && ww <= maxWW) || (ww == "default" && wl == "default")) {
			let viewportDefault = cornerstone.getDefaultViewportForImage(this.element, this.currentImage);
			let viewport = cornerstone.getViewport(this.element);
			viewport.voiLUT = undefined;
			//			console.log(viewportDefault,"viewportDefault");
			//			console.log(viewport,"viewport");
			if(ww == "default" && wl == "default") {
				viewport.voi.windowWidth = viewportDefault.voi.windowWidth;
				viewport.voi.windowCenter = viewportDefault.voi.windowCenter;
				cornerstone.setViewport(this.element, viewport);
			} else if(ww == "" && wl == "") {
				return;
			} else {
				viewport.voi.windowWidth = Number(ww);
				viewport.voi.windowCenter = Number(wl);
				cornerstone.setViewport(this.element, viewport);
			}
		} else if(!(wl >= wwBOTTOM && wl <= wwTOP)) {
			alert('输入的窗位值不合法');
		} else if(!(ww > 0 && ww <= maxWW)) {
			alert('输入的窗宽值不合法');
		}
	}

	// 监听viewport的变化，并更新
	onImageRendered(e) {
		let image = e.detail.enabledElement.image;
		//		console.log("渲染完毕",e);
		this.loaded = true;
		this.haveImage = true;
		var eventData = e.detail;
		this.scaleNum = eventData.viewport.scale;

		// 将画布设置为像素坐标系。建议使用画布调用在图像上绘制文本或几何图形的事件之前调用此函数
		cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, eventData.canvasContext);

		// 方向变化标记
		this.calculateOrientationMarkers();
		// 图像中其他信息绘制
		this.imageInfoDraw(eventData);

		// 魔术棒绘制
		//console.log(!this.currentImage.clearMagicDraw,"魔术棒绘制");
		if(!this.currentImage.clearMagicDraw) {
			this.magicDraw(eventData.canvasContext.canvas.getContext('2d'));
			//this.magicOutlineDraw(this.detail.canvasContext.canvas.getContext('2d'));
		}

		// 病人信息
		if(this.showInfo) {
			this.patientInfoShowFn(eventData.canvasContext.canvas.getContext('2d'));
		}
		//参考线绘制
		if(this.drawLine) {
			this.referenceLinesFn(eventData.canvasContext.canvas.getContext('2d'));
		}
		//恢复标记
		if(this.oldAppState && this.needUpdateAppState) {
			//			console.log('恢复恢复恢复', this.needUpdateAppState);
			this.restoreDraw(e.detail.element);
		}
	}

	// 图像中其他信息绘制
	imageInfoDraw(eventData) {
		let context = eventData.canvasContext.canvas.getContext('2d');
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.font = '11px Arial';
		let bottomLeftH = eventData.canvasContext.canvas.offsetHeight;
		let bottomRightW = eventData.canvasContext.canvas.offsetWidth;
		// 窗宽窗位
		let wlNum = "W/L：" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter);
		context.fillStyle = '#ffcc00';
		context.fillText(wlNum, 10, bottomLeftH - 30);
		// 当前图片下标
		//		 console.log('no',this.currentDisplaySeries)
		if(!this.numframes) {
			context.fillStyle = '#ffcc00';
			//let index = this.seriesObj[this.currentDisplaySeries]["picOrderNum"].indexOf(this.currentDisplaySeriesPicNum);
			let index = this.globalInstanceNumObj[this.currentDisplaySeries].indexOf(this.currentDisplaySeriesPicNum);
			//let howImageNum = 'image：' + (index + 1) + '/' + this.seriesObj[this.currentDisplaySeries]["picOrderNum"].length;
			let howImageNum = 'image：' + (index + 1) + '/' + this.seriesNum;
			context.fillText(howImageNum, 10, bottomLeftH - 10);
		} else {
			context.fillStyle = 'lawngreen';
			let howImageNum = 'frame：' + this.currentShowFrameIndex + '/' + this.numframes;
			context.fillText(howImageNum, 10, bottomLeftH - 10);
		}
		// 放大系数
		context.fillStyle = '#ffcc00';
		context.fillText('zoom：' + parseInt(100 * this.scaleNum) + '%', bottomRightW - 75, bottomLeftH - 10);
		//		context.fillText('zoom：1000' + '%', bottomRightW - 75, bottomLeftH - 10);
		// 方向
		context.fillStyle = 'red';
		context.fillText(this.mrtopmiddle[0].innerHTML, this.mrtopmiddle[0].offsetLeft, this.mrtopmiddle[0].offsetTop + 5);
		context.fillText(this.mrrightmiddle[0].innerHTML, this.mrrightmiddle[0].offsetLeft - 15, this.mrrightmiddle[0].offsetTop);
		context.fillText(this.mrbottommiddle[0].innerHTML, this.mrbottommiddle[0].offsetLeft, this.mrbottommiddle[0].offsetTop + 20);
		context.fillText(this.mrleftmiddle[0].innerHTML, this.mrleftmiddle[0].offsetLeft - 8, this.mrleftmiddle[0].offsetTop);
		// 标尺
		let centerNum = bottomLeftH / 2;
		context.beginPath();
		context.moveTo(bottomRightW - 10, centerNum - (100 / this.rowPixelSpacing / 2) * this.scaleNum);
		context.lineTo(bottomRightW - 10, centerNum + (100 / this.rowPixelSpacing / 2) * this.scaleNum);
		context.strokeStyle = '#ffcc00';
		context.stroke();
		context.fillStyle = '#ffcc00';
		context.fillText('10cm', bottomRightW - 35, centerNum + (100 / this.rowPixelSpacing / 2) * this.scaleNum + 10);
		// 刻度数量
		let rulerNum = 0;
		for(let i = 0; i < 11; i++) {
			context.moveTo(bottomRightW - 10, centerNum - (100 / this.rowPixelSpacing / 2) * this.scaleNum + rulerNum);
			context.lineTo(bottomRightW - 20, centerNum - (100 / this.rowPixelSpacing / 2) * this.scaleNum + rulerNum);
			context.stroke();
			rulerNum += (100 / this.rowPixelSpacing) * this.scaleNum / 10;
		}
		//console.log('qqq',this.scaleNum,this.rowPixelSpacing);
	}

	// 病人信息展示
	patientInfoShowFn(context) {
		context.fillStyle = '#ffcc00';
		let sex = (this.patientGender || "未知") == "M" ? "病人性别：男" : "病人性别：女";
		context.fillText('病人姓名：' + (this.patientName || "未知"), 10, 20);
		context.fillText(sex, 10, 35);
		//		context.fillText('病人生日：' + (this.patientBirthDate || "未知"), 10, 35);
		context.fillText('病人ID：' + (this.patientID || "未知"), 10, 50);
		context.fillText('SeriesID：' + (this.sID || "未知"), 10, 65);
	}

	// 禁用定位线功能
	disableLine() {
		this.drawLine = false;
	}

	// 启动定位线功能
	enableLine() {
		this.drawLine = true;
	}

	//参考线绘制
	referenceLinesFn(context) {
		// console.log(this.referenceLine);
		if(!this.referenceLine) {
			return;
		}
		// console.log("画线了");
		const refLineStartCanvas = cornerstone.pixelToCanvas(this.element, this.referenceLine.start);
		const refLineEndCanvas = cornerstone.pixelToCanvas(this.element, this.referenceLine.end);
		const color = cornerstoneTools.toolColors.getActiveColor();
		const lineWidth = cornerstoneTools.toolStyle.getToolWidth();

		// Draw the referenceLines
		context.setTransform(1, 0, 0, 1, 0, 0);

		context.save();
		context.beginPath();
		context.strokeStyle = color;
		context.lineWidth = lineWidth;
		context.moveTo(refLineStartCanvas.x, refLineStartCanvas.y);
		context.lineTo(refLineEndCanvas.x, refLineEndCanvas.y);
		context.stroke();
		context.restore();
	}
	drawReferenceLine(referenceLine) {
		//		console.log(referenceLine,"参考线啊");
		if(!referenceLine) {
			return;
		}
		this.referenceLine = referenceLine;
		cornerstone.updateImage(this.element);
	}

	// 病人信息的显示与隐藏
	patientInfo(show) {
		this.showInfo = show;
		if(this.showInfo){
			$('#infoLi>span')[0].innerHTML = '患者信息隐藏';
		}else{
			$('#infoLi>span')[0].innerHTML = '患者信息显示';
		}
		cornerstone.updateImage(this.element);
	}

	//更新图像
	updateImage() {
		cornerstone.updateImage(this.element);
	}

	downFn(ev) {
		//		console.log('按下');
		this.startY = ev.clientY;
		$(this.element).on('mousemove', this.moveFn.bind(this));
		$(this.element).on('mouseup', this.upFn.bind(this));
		console.log(962,this);
	}
	moveFn(ev) {
		let that = this;
		let difY;
		//		console.log('移动');
		if(user_equipment == 'phone') {
			$(this.element).on('touchend', this.upFn.bind(this));
			let startY = ev.originalEvent.targetTouches[0].clientY;
			$(this.element).on('touchmove', function(ev) {
				difY = ev.originalEvent.targetTouches[0].clientY - startY;
				if($('#dicomDiv>div').length == 1) {
					that.scrollFn(that, difY);
				} else {
					if($(this).hasClass("pitch")) {
						that.scrollFn(that, difY);
					} else {
						return;
					}
				}
			});
		} else if(user_equipment == 'computer') {
			difY = ev.clientY - this.startY;
			if($('#dicomDiv>div').length == 1) {
				this.scrollFn(this, difY);
			} else {
				if($(this.element).hasClass("pitch")) {
					this.scrollFn(this, difY);
				} else {
					return;
				}
			}
		}
	}
	upFn() {
		//		console.log('抬起');
		$(this.element).off('mousemove');
		$(this.element).off('mouseup');
		$(this.element).off('touchmove');
		$(this.element).off('touchend');
	}
	// 翻页
	unbindAction() {
		$(this.element).off('mousedown');
		$(this.element).off('mousemove');
		$(this.element).off('mouseup');
		$(this.element).off('touchstart');
		$(this.element).off('touchmove');
		$(this.element).off('touchend');
	}
	// 工具更改
	toolsChange(toolName) {
		this.currentToolName = toolName;
		if(!this.loaded) {
			return;
		}
		//关闭魔术棒阈值窗口
		this.magicStart = false;
		$('#magicLiSum').css('display', 'none');

		this.disableAllTools();
		if(toolName != "flipOver") {
			this.unbindAction()
		}
		if(user_equipment == 'phone') {
			if(toolName == 'freehand') {
				cornerstoneTools.touchInput.disable(this.element);
			} else {
				cornerstoneTools.touchInput.enable(this.element);
			}
		}
		switch(toolName) {
			case "flipOver":
				if(user_equipment == 'phone') {
					//					console.log('手机flipOver')
					$(this.element).on('touchstart', this.moveFn.bind(this));
				} else if(user_equipment == 'computer') {
					//					console.log('电脑flipOver');
					this.enableAllTools();
					$(this.element).on('mousedown', this.downFn.bind(this));
				}
				break;
			case "arrowAnnotate":
				//箭头标注
				cornerstoneTools.arrowAnnotate.activate(this.element, 1);
				cornerstoneTools.arrowAnnotateTouch.activate(this.element);
				break;
			case "pan":
				cornerstoneTools.pan.activate(this.element, 3);
				cornerstoneTools.panTouchDrag.activate(this.element);
				// 3 means left mouse button and middle mouse button
				break;
			case "length":
				cornerstoneTools.length.activate(this.element, 1);
				cornerstoneTools.lengthTouch.activate(this.element);
				break;
			case "probe":
				cornerstoneTools.probe.activate(this.element, 1);
				cornerstoneTools.probeTouch.activate(this.element);
				break;
			case "ellipticalRoi":
				cornerstoneTools.ellipticalRoi.activate(this.element, 1);
				cornerstoneTools.ellipticalRoiTouch.activate(this.element);
				break;
			case "rectangleRoi":
				cornerstoneTools.rectangleRoi.activate(this.element, 1);
				cornerstoneTools.rectangleRoiTouch.activate(this.element);
				break;
			case "angle":
				cornerstoneTools.angle.activate(this.element, 1);
				cornerstoneTools.angleTouch.activate(this.element);
				break;
			case "zoom":
				cornerstoneTools.zoom.activate(this.element, 1);
				cornerstoneTools.zoomTouchDrag.activate(this.element);
				break;
			case "enableWindowLevelTool":
				cornerstoneTools.wwwc.activate(this.element, 1);
				cornerstoneTools.wwwcTouchDrag.activate(this.element);
				break;
			case "freehand":
				cornerstoneTools.freehand.activate(this.element, 1);
				break;
			case "clearToolState":
				// 只适用于特定映像的工具状态管理器(for now)
				let toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;
				toolStateManager.clear(this.element);
				cornerstone.updateImage(this.element);
				break;
			default:
				break;
		}
	}

	// 方向和镜像更改
	viewportChange(viewportProp) {
		if(!this.loaded) {
			return;
		}
		//关闭魔术棒阈值窗口
		this.magicStart = false;
		$('#magicLiSum').css('display', 'none');

		let viewport = cornerstone.getViewport(this.element);
		switch(viewportProp) {
			case "invert":
				//负片
				viewport.invert = !viewport.invert;
				cornerstone.setViewport(this.element, viewport);
				break;
			case "hflip":
				viewport.hflip = !viewport.hflip;
				cornerstone.setViewport(this.element, viewport);
				this.calculateOrientationMarkers();
				break;
			case "vflip":
				viewport.vflip = !viewport.vflip;
				cornerstone.setViewport(this.element, viewport);
				this.calculateOrientationMarkers();
				break;
			case "rotate":
				viewport.rotation += 90;
				cornerstone.setViewport(this.element, viewport);
				this.calculateOrientationMarkers();
				break;
			case "resetViewport":
				cornerstone.reset(this.element);
				this.calculateOrientationMarkers();
				let deviewport = cornerstone.getDefaultViewportForImage(this.element, this.currentImage);
				//				console.log(deviewport);
				if(deviewport.voiLUT) {
					deviewport.voiLUT = undefined;
					cornerstone.setViewport(this.element, deviewport);
				}
				break;
			default:
				break;
		}
	}

	// 箭头标记
	getTextCallback(doneChangingTextCallback) {
		$("#wlInput").css("display", "none");
		$('#magicLiSum').css('display', 'none');
		let annotationDialog = document.querySelector('.annotationDialog');
		let getTextInput = annotationDialog.querySelector('#annotationTextInput');
		let confirm = annotationDialog.querySelector('.annotationDialogConfirm');
		let dialogclose = annotationDialog.querySelector('.dialogclose');
		annotationDialog.style.display = "block";
		getTextInput.focus();

		function confirmHandler() {
			//console.log(123, getTextInput.value)
			if(!getTextInput.value || getTextInput.value == "") {
				return;
			}
			doneChangingTextCallback(getTextInput.value);
			closeDialog();
		}

		function closeHandler() {
			doneChangingTextCallback("");
			closeDialog();
		}

		function closeDialog() {
			annotationDialog.style.display = "none";
			getTextInput.value = "";
			confirm.removeEventListener('click', confirmHandler);
			dialogclose.removeEventListener('click', closeHandler);
		}
		confirm.removeEventListener('click', confirmHandler);
		dialogclose.removeEventListener('click', closeHandler);

		confirm.addEventListener('click', confirmHandler);
		dialogclose.addEventListener('click', closeHandler);

	}
	changeTextCallback(data, eventData, doneChangingTextCallback) {
		//		console.log('hahaha',data)
		//		let relabelDialog = document.querySelector('.relabelDialog');
		//		let getTextInput = relabelDialog.querySelector('.annotationTextInput');
		//		let confirm = relabelDialog.querySelector('.relabelConfirm');
		//		let relabelclose = relabelDialog.querySelector('.relabelclose');
		//
		//		getTextInput.value = data.text;
		//		relabelDialog.showModal();
		//
		//		function confirmHandler() {
		//			relabelDialog.close();
		//			doneChangingTextCallback(data, getTextInput.value);
		//		}
		//		confirm.removeEventListener('click', confirmHandler);
		//		confirm.addEventListener('click', confirmHandler);
		//
		//		relabelclose.removeEventListener('click', closeHandler);
		//		relabelclose.addEventListener('click', closeHandler);
		//
		//		function closeHandler() {
		//			relabelDialog.close();
		//			doneChangingTextCallback(data, getTextInput.value);
		//		}
	}

	// 获取默认显示的窗宽窗位值
	getDefaultwwwl() {
		if(!this.loaded) {
			return null;
		}
		return {
			ww: cornerstone.getDefaultViewportForImage(this.element, this.currentImage).voi.windowWidth,
			wl: cornerstone.getDefaultViewportForImage(this.element, this.currentImage).voi.windowCenter
		}
	}

	// VOI LUT
	vLutFn() {
		//		console.log("lut重新计算");
		let that = this;
		// VOI lut 个数
		$('#violutSum').empty().append('<div class="nolut">无lut</div>');
		$('.dynamicWLdiv').off();
		$('.dynamicWLdiv').remove();
		//		console.log(this.currentImage)
		//		console.log("获得的lut",cornerstone.generateLut(this.currentImage,this.currentImage.windowWidth,this.currentImage.windowCenter,true));
		//		console.log("自己获得的lut");
		if(this.voiContent) {
			$('#violutSum').empty().append('<div class="nolut">无lut</div>');
			// 动态拼接lut
			if(this.voiContent.voiLUTSequence) {
				$('#violutSum').empty();
				for(let i = 0; i < this.voiContent.voiLUTSequence.length; i++) {
					let vioDom = `<div class="vlut" data-order='${i}'> lut${i+1}</div>`
					$('#violutSum').append(vioDom);
				}
				let vLUTSum = document.querySelectorAll('.vlut');
				for(let i = 0; i < vLUTSum.length; i++) {
					vLUTSum[i].onclick = function() {
						let nowOrder = Number($(this).attr('data-order'));
						let viewport = cornerstone.getViewport(that.element);
						viewport.voiLUT = that.voiContent.voiLUTSequence[nowOrder];
						//console.log(that.voiContent.voiLUTSequence[nowOrder],"点击的lut");
						//console.log(viewport,"更改之后的viewport");
						cornerstone.setViewport(that.element, viewport);
						cornerstone.updateImage(that.element, true);
					}
				}
			}
			// 预设窗宽窗位
			if(this.voiContent.windowCenter && this.voiContent.windowWidth) {
				$('.dynamicWLdiv').off();
				$('.dynamicWLdiv').remove();
				for(let i = 0; i < this.voiContent.windowCenter.length - 1; i++) {
					let datawl = that.voiContent.windowCenter[i + 1];
					let dataww = that.voiContent.windowWidth[i + 1];
					let wlDom = `<div class="dynamicWLdiv" data-ww="${dataww}" data-wl="${datawl}" data-order='${i+11}'>预设${i+1} (ww:${dataww}/wl:${datawl})</div>`
					$('#wlDiv').append(wlDom);
				}

				$("#wlDiv>div.dynamicWLdiv").on("click", function() {
					let ww = Number($(this).attr("data-ww"));
					let wl = Number($(this).attr("data-wl"));
					that.wwwlAdjust(ww, wl);
				});
			}
		}
	}

	//动态拼接魔术棒状态
	magicStatus() {
	  //console.log('this.currentImage')
		$('#magicLiSumDiv').empty();
		if(Object.keys(this.currentImage.startPixelPtObj).length){
			for(let i in this.currentImage.startPixelPtObj){
				let magicAdjustNum = this.currentImage.magicAdjustObj[i];
				let magicDivLiDom = `<div class="magicDivLi">
							<div class="magicLiNum"></div>
							<input type="range" min="0" max="100" step="1" value="${magicAdjustNum}" class="magicRange"/>
							<div class="rangeVal">${magicAdjustNum}</div>
							<div class="deleteMagicLi"><img src="${domNodeEdit.deleteImg}" alt=""></div>
						</div>`;
				$('#magicLiSumDiv').append(magicDivLiDom);
			}
			$('#magicLiSumNav>p')[0].innerHTML = '当前图像数据';
		} else {
			$('#magicLiSumNav>p')[0].innerHTML = '当前图像无数据';
		}
		//动态改变阈值/删除某个数据
		let that = this;
		if(Object.keys(this.currentImage.startPixelPtObj).length){
			let index = 0;
			for(let i in this.currentImage.startPixelPtObj) {
				let rangeInput = $('.magicRange')[index];
				let rangeVal = $('.rangeVal')[index];
				let magicDivLi = $('.magicDivLi')[index];
				let deleteMagicLi = $('.deleteMagicLi')[index];
				let magicLiNum = $('.magicLiNum')[index];
				let nowPixelPt = this.currentImage.startPixelPtObj[i];
				index++;
				if(user_equipment == 'phone'){
					rangeInput.ontouchend = function(){
						$('.magicLiNum').css('backgroundColor','lime');
						magicLiNum.style.backgroundColor = 'red';
						that.currentImage.magicAdjustObj[i] = $(rangeInput).val();
						rangeVal.innerHTML = $(rangeInput).val();
						that.currentImage.magicAdjustObj[i] = Number($(rangeInput).val());
						let nowMagicAdjustNum = that.currentImage.magicAdjustObj[i];
						that.magicAdjust(nowPixelPt,nowMagicAdjustNum,true,i);
					}
					deleteMagicLi.ontouchstart = function(){
						delete that.currentImage.magicAdjustObj[i];
						delete that.currentImage.startPixelPtObj[i];
						$('#magicLiSumDiv')[0].removeChild(magicDivLi);
						that.magicAdjust(null, null, true, i);
					}
					magicLiNum.ontouchstart = function() {
						$('.magicLiNum').css('backgroundColor','lime');
						this.style.backgroundColor = 'red';
						cornerstone.updateImage(that.element);
						that.focusMagic = i;
					}
				} else if(user_equipment == 'computer') {
					rangeInput.onmouseup = function() {
						$('.magicLiNum').css('backgroundColor','lime');
						magicLiNum.style.backgroundColor = 'red';
						that.currentImage.magicAdjustObj[i] = $(rangeInput).val();
						rangeVal.innerHTML = $(rangeInput).val();
						that.currentImage.magicAdjustObj[i] = Number($(rangeInput).val());
						let nowMagicAdjustNum = that.currentImage.magicAdjustObj[i];
						that.magicAdjust(nowPixelPt, nowMagicAdjustNum, true, i);
						that.focusMagic = i;
						//console.log('up',that.currentImage);
					}
					deleteMagicLi.onclick = function() {
						delete that.currentImage.magicAdjustObj[i];
						delete that.currentImage.startPixelPtObj[i];
						that.magicAdjust(null, null, true, i);
						$('#magicLiSumDiv')[0].removeChild(magicDivLi);
						//console.log(i,'click',that.currentImage);
					}
					magicLiNum.onclick = function() {
						$('.magicLiNum').css('backgroundColor','lime');
						this.style.backgroundColor = 'red';
						cornerstone.updateImage(that.element);
						that.focusMagic = i;

					}
				}
			}
		}
	}

	// 魔术棒
	magic() {
		let that = this;
		this.magicStart = true;
		this.currentImage.clearMagicDraw = false;
		this.disableAllTools();
	}

	magicPoint(X, Y) {
		this.currentImage.clearMagicDraw = false;
		//console.log('开始了吗',X,Y,this.magicStart);
		this.focusMagic = -1;
		if(this.magicStart) {
			let startPt = {
				x: X,
				y: Y
			}
			//起始点像素坐标
			let startPixelPT = cornerstone.canvasToPixel(this.element, startPt);
			//操作区域必须在图像范围内
			if(startPixelPT.x < 0 || startPixelPT.y < 0) {
				alert('非图像区域');
				return;
			}
			//将所有点击处的像素坐标存放在image的startPixelPtObj数组中
			this.currentImage.start++;
			if(Object.keys(this.currentImage.startPixelPtObj).length) {
				let exist = false;
				for(let key in this.currentImage.startPixelPtObj) {
					if(JSON.stringify(startPixelPT) === JSON.stringify(this.currentImage.startPixelPtObj[key])) {
						exist = true;
						this.currentImage.start--;
						break;
					}
				}
				if(!exist) {
					this.currentImage.startPixelPtObj[this.currentImage.start] = startPixelPT;
					this.currentImage.magicAdjustObj[this.currentImage.start] = 30;
				}
			} else {
				this.currentImage.startPixelPtObj[this.currentImage.start] = startPixelPT;
				this.currentImage.magicAdjustObj[this.currentImage.start] = 30;
			}
			//console.log(this.currentImage.start,1367);
			//设置最新一笔的魔术棒痕迹为选中状态
			this.focusMagic = this.currentImage.start;
			//算法
			this.magicAdjust(startPixelPT, 30, false);
			//自动弹出阈值调整弹窗
			$('#magicLiSum').css('display', 'block');
		}
		//console.log('this.currentImage.startPixelPtObj',this.currentImage.startPixelPtObj,this.currentImage.magicAdjustObj);
		//动态拼接魔术棒状态
		this.magicStatus();
		//设置最新一笔的魔术棒痕迹为选中状态
		$('.magicLiNum').css('backgroundColor','lime');
		$('.magicLiNum')[$('.magicLiNum').length-1].style.backgroundColor = 'red';
	}
	//取魔术棒阈值
	magicAdjust(startPixelPt, magicAdjustNum, isSingle, singleNum) {
		let magicPointArr = [];
		if(startPixelPt) {
			let pointBox = function(x, y) {
				this.x = x;
				this.y = y;
			}
			let dx = [0, 0, -1, 1, -1, -1, 1, 1];
			let dy = [1, -1, 0, 0, -1, 1, -1, 1];

			let w = this.detail.enabledElement.renderingTools.renderCanvasData.width;
			let h = this.detail.enabledElement.renderingTools.renderCanvasData.height;
			//imageData
			let renderCanvasData = this.detail.enabledElement.renderingTools.renderCanvasData.data;
			let startPixelX = parseInt(startPixelPt.x);
			let startPixelY = parseInt(startPixelPt.y);
			let R, G, B, A;
			//当前像素所在位置下标
			let startPointIndex = 4 * w * (startPixelY - 1) + 4 * (startPixelX - 1);
			//找到当前像素点的RGBA值
			if(this.currentImage.color) {
				R = renderCanvasData[startPointIndex];
				G = renderCanvasData[startPointIndex + 1];
				B = renderCanvasData[startPointIndex + 2];
				A = renderCanvasData[startPointIndex + 3];
			} else {
				A = renderCanvasData[startPointIndex + 3];
			}
			let queue = [];
			let visit = [];
			queue.push(new pointBox(startPixelX, startPixelY));
			while(queue.length != 0) {
				let firstObj = queue.shift();
				for(let i = 0; i < dx.length; i++) {
					let X = firstObj.x + dx[i];
					let Y = firstObj.y + dy[i];
					if(X < 0 || Y < 0 || X > w - 1 || Y > h - 1 || visit[Y * w + X]) {
						continue;
					}
					visit[Y * w + X] = true;
					//彩图       //当前被对比的像素点下标
					let nowPointIndex = 4 * w * (Y - 1) + 4 * (X - 1);
					if(this.currentImage.color) {
						if(Math.abs(renderCanvasData[nowPointIndex] - R) > (magicAdjustNum || 31)) {
							magicPointArr.push({
								x: X,
								y: Y
							});
							continue;
						}
						if(Math.abs(renderCanvasData[nowPointIndex + 1] - G) > (magicAdjustNum || 31)) {
							magicPointArr.push({
								x: X,
								y: Y
							});
							continue;
						}
						if(Math.abs(renderCanvasData[nowPointIndex + 2] - B) > (magicAdjustNum || 31)) {
							magicPointArr.push({
								x: X,
								y: Y
							});
							continue;
						}
						if(Math.abs(renderCanvasData[nowPointIndex + 3] - A) > (magicAdjustNum || 31)) {
							magicPointArr.push({
								x: X,
								y: Y
							});
							continue;
						}
						//灰度图
					} else {
						if(Math.abs(renderCanvasData[nowPointIndex + 3] - A) > (magicAdjustNum || 31)) {
							magicPointArr.push({
								x: X,
								y: Y
							});
							continue;
						}
					}
					queue.push(new pointBox(X, Y));
				}
			}
		}
		//转化为像素坐标/向每一个imageId中添加像素坐标信息
		let magicPixelCoord = {};
		if(magicPointArr.length) {
			for(let i = 0; i < magicPointArr.length; i++) {
				magicPixelCoord[i] = {};
				magicPixelCoord[i].x = magicPointArr[i].x;
				magicPixelCoord[i].y = magicPointArr[i].y;
			}
		}
		if(isSingle) {
			if(Object.keys(magicPixelCoord).length) {
				this.currentImage.magicCoordObj[singleNum] = magicPixelCoord;
			} else {
				delete this.currentImage.magicCoordObj[singleNum];
			}
		} else {
			this.currentImage.magicCoordObj[this.currentImage.start] = magicPixelCoord;
		}
		/////////////////////////////////////////////////////////////////////////////
//整理4个轮廓坐标点
		//console.log('this.currentImage.magicCoordObj',this.currentImage.magicCoordObj);
		let outlinePointObj = {};
		for(let key in this.currentImage.magicCoordObj){
			outlinePointObj[key] = {};
			let magicCoordObj = this.currentImage.magicCoordObj[key];
			let maxX = magicCoordObj[0].x;
			let minX = magicCoordObj[0].x;
			let maxY = magicCoordObj[0].y;
			let minY = magicCoordObj[0].y;
			for(let i in magicCoordObj){
				let curX = magicCoordObj[i].x;
				let curY = magicCoordObj[i].y;
				curX>maxX ? maxX=curX : null;
			  curX<minX ? minX=curX : null;
			  curY>maxY ? maxY=curY : null;
			  curY<minY ? minY=curY : null;
			}
			outlinePointObj[key][0] = {};
			outlinePointObj[key][1] = {};
			outlinePointObj[key][2] = {};
			outlinePointObj[key][3] = {};
			outlinePointObj[key][0].x = minX;
			outlinePointObj[key][0].y = minY;
			outlinePointObj[key][1].x = maxX;
			outlinePointObj[key][1].y = minY;
			outlinePointObj[key][2].x = maxX;
			outlinePointObj[key][2].y = maxY;
			outlinePointObj[key][3].x = minX;
			outlinePointObj[key][3].y = maxY;

		}
		this.currentImage.magicOulinePtObj = outlinePointObj;
		console.log('this.currentImage.magicOulinePtObj',this.currentImage.magicOulinePtObj);
		/////////////////////////////////////////////////////////////////////////////
//将坐标信息与instanceuid关联起来
		let uid = this.instanceUID;
		//处理多帧的保存方式
		if(this.numberOfFrames > 0) {
			let frameIndex = Number(this.currentImage.imageId.substr(this.currentImage.imageId.indexOf('=') + 1));
			uid_magicCoordObj[uid][frameIndex] = this.currentImage.magicCoordObj;
			uid_startPixelPtObj[uid][frameIndex] = this.currentImage.startPixelPtObj;
			uid_magicAdjustObj[uid][frameIndex] = this.currentImage.magicAdjustObj;
			//uid_magicOulinePtObj[uid][frameIndex] = this.currentImage.magicOulinePtObj;
		} else {
			uid_magicCoordObj[uid] = this.currentImage.magicCoordObj;
			uid_startPixelPtObj[uid] = this.currentImage.startPixelPtObj;
			uid_magicAdjustObj[uid] = this.currentImage.magicAdjustObj;
			//uid_magicOulinePtObj[uid] = this.currentImage.magicOulinePtObj;
		}
		////////////////////////////////////////////////////////////////////////////
//将imageId中的像素坐标信息保存到magicCanvasCoord
		this.magicCanvasCoord = {};
		if(Object.keys(this.currentImage.magicCoordObj).length) {
			for(let startKey in this.currentImage.magicCoordObj) {
				let magicCoord = this.currentImage.magicCoordObj[startKey];
				let magicCanvasCoord = {};
				for(let key in magicCoord) {
					magicCanvasCoord[key] = cornerstone.pixelToCanvas(this.element, magicCoord[key]);
				}
				this.magicCanvasCoord[startKey] = magicCanvasCoord;
			}
		}
//将4个轮廓坐标点保存到magicCanvasOutlinePt
		this.magicCanvasOutlinePtObj = {};
		if(Object.keys(this.currentImage.magicOulinePtObj).length){
			for(let startKey in this.currentImage.magicOulinePtObj){
				let magicOulinePt = this.currentImage.magicOulinePtObj[startKey];
				let magicCanvasOutlinePtObj = {};
				for(let key in magicOulinePt) {
					magicCanvasOutlinePtObj[key] = cornerstone.pixelToCanvas(this.element, magicOulinePt[key]);
				}
				this.magicCanvasOutlinePtObj[startKey] = magicCanvasOutlinePtObj;
			}
		}
		///////////////////////////////////////////////////////////////////////////////////////
		//console.log(this.magicCanvasCoord);
		//console.log(isSingle,singleNum,'sasas',this.currentImage.startPixelPtObj);
		cornerstone.updateImage(this.element);
		if(JSON.stringify(this.currentImage.startPixelPtObj) == '{}') {
			$('#magicLiSumNav>p')[0].innerHTML = '当前图像无数据';
		}
		//开始绘制
		this.magicDraw(this.detail.canvasContext.canvas.getContext('2d'));
		//this.magicOutlineDraw(this.detail.canvasContext.canvas.getContext('2d'));
	}

	//魔术棒轮廓绘制
	magicOutlineDraw(ctx){
		if(Object.keys(this.currentImage.magicOulinePtObj).length){
			let scale = this.detail.viewport.scale;
			this.magicCanvasOutlinePtObj = {};
			//console.log(' this.currentImage.magicOulinePtObj', this.currentImage.magicOulinePtObj);
			for(let startKey in this.currentImage.magicOulinePtObj) {
				let magicOulinePtObj = this.currentImage.magicOulinePtObj[startKey];
				let magicCanvasOutlinePtObj = {};
				for(let key in magicOulinePtObj) {
					magicCanvasOutlinePtObj[key] = cornerstone.pixelToCanvas(this.element, magicOulinePtObj[key]);
				}
				this.magicCanvasOutlinePtObj[startKey] = magicCanvasOutlinePtObj;
			}
			//console.log('canvas坐标',this.magicCanvasOutlinePtObj);
			for(let startKey in this.magicCanvasOutlinePtObj) {
				if(this.focusMagic >= 0 && this.focusMagic == Number(startKey)) {
					let magicCanvasOutlinePtObj = this.magicCanvasOutlinePtObj[this.focusMagic];
					console.log(magicCanvasOutlinePtObj[0].x, magicCanvasOutlinePtObj[0].y)
					ctx.beginPath();
					ctx.moveTo(magicCanvasOutlinePtObj[0].x, magicCanvasOutlinePtObj[0].y);
					ctx.lineTo(magicCanvasOutlinePtObj[1].x, magicCanvasOutlinePtObj[1].y);
					ctx.lineTo(magicCanvasOutlinePtObj[2].x, magicCanvasOutlinePtObj[2].y);
					ctx.lineTo(magicCanvasOutlinePtObj[3].x, magicCanvasOutlinePtObj[3].y);
					ctx.lineTo(magicCanvasOutlinePtObj[0].x, magicCanvasOutlinePtObj[0].y);
					ctx.strokeStyle = 'red';
					ctx.stroke();
				} else {
					let magicCanvasOutlinePtObj = this.magicCanvasOutlinePtObj[startKey];
					ctx.beginPath();
					ctx.moveTo(magicCanvasOutlinePtObj[0].x, magicCanvasOutlinePtObj[0].y);
					ctx.lineTo(magicCanvasOutlinePtObj[1].x, magicCanvasOutlinePtObj[1].y);
					ctx.lineTo(magicCanvasOutlinePtObj[2].x, magicCanvasOutlinePtObj[2].y);
					ctx.lineTo(magicCanvasOutlinePtObj[3].x, magicCanvasOutlinePtObj[3].y);
					ctx.lineTo(magicCanvasOutlinePtObj[0].x, magicCanvasOutlinePtObj[0].y);
					ctx.strokeStyle = 'limegreen';
					ctx.stroke();
				}
			}
		} else {
			this.magicCanvasOutlinePtObj = {};
		}
	}

	//魔术棒绘制
	magicDraw(ctx) {
		//console.log('当前dedede图像',this.currentImage);
		if(Object.keys(this.currentImage.magicCoordObj).length){
			let scale = this.detail.viewport.scale;
			//console.log('放大倍数',scale);
			this.magicCanvasCoord = {};
			for(let startKey in this.currentImage.magicCoordObj) {
				let magicCoord = this.currentImage.magicCoordObj[startKey];
				let magicCanvasCoord = {};
				for(let key in magicCoord) {
					magicCanvasCoord[key] = cornerstone.pixelToCanvas(this.element, magicCoord[key]);
				}
				this.magicCanvasCoord[startKey] = magicCanvasCoord;
			}
			//console.log('canvas坐标',this.magicCanvasCoord,'是否删除',this.currentImage.clearMagicDraw);
			for(let startKey in this.magicCanvasCoord) {
				if(this.focusMagic >= 0 && this.focusMagic == Number(startKey)) {
					let magicCanvasCoord = this.magicCanvasCoord[this.focusMagic];
					for(let key in magicCanvasCoord) {
						let x = magicCanvasCoord[key].x;
						let y = magicCanvasCoord[key].y;
						ctx.beginPath();
						ctx.arc(x - 1, y - 1, scale / 3, 0, Math.PI * 2);
						ctx.fillStyle = 'red';
						ctx.fill();
					}
				} else {
					let magicCanvasCoord = this.magicCanvasCoord[startKey];
					for(let key in magicCanvasCoord) {
						let x = magicCanvasCoord[key].x;
						let y = magicCanvasCoord[key].y;
						ctx.beginPath();
						ctx.arc(x - 1, y - 1, scale / 3, 0, Math.PI * 2);
						ctx.fillStyle = 'lime';
						ctx.fill();
					}
				}
			}
		} else {
			this.magicCanvasCoord = {};
		}
	}

	restoreMagicSeriesObj() {
		//console.log('飒飒飒飒飒飒');
		if(!Object.keys(uid_magicCoordObj).length && !Object.keys(uid_startPixelPtObj).length && !Object.keys(uid_magicAdjustObj).length && !Object.keys(uid_magicOulinePtObj).length) {
			return;
		}
		//console.log('seriesObj',this.seriesObj);
		//console.log(1487,uid_magicAdjustObj)
		for(let seriesID in this.seriesObj) {
			for(let key in this.seriesObj[seriesID]) {
				if(key == 'picOrderNum') {
					continue;
				}
				let uid = this.seriesObj[seriesID][key].data.string('x00080018');
				let image = this.seriesObj[seriesID][key];
				let imageid = this.seriesObj[seriesID][key].imageId;
				//恢复有魔术棒数据的image
				//				console.log(1483,'uid_startPixelPtObj',uid_startPixelPtObj);
				let numberOfFrames = Number(image.data.string('x00280008') || "0");
				//像素坐标
				if(Object.keys(uid_magicCoordObj).length) {
					for(let uidKey in uid_magicCoordObj) {
						if(uidKey == uid) {
							//处理多帧
							if(numberOfFrames > 0) {
								let frameIndex = image.imageId.substr(image.imageId.indexOf('=') + 1);
								for(let frameKey in uid_magicCoordObj[uidKey]) {
									if(frameIndex == frameKey) {
										image.magicCoordObj = uid_magicCoordObj[uid][frameKey];
									}
									//console.log(1496,frameIndex,frameKey);
								}
								//console.log(1498,image);
							} else {
								image.magicCoordObj = uid_magicCoordObj[uid];
								//console.log('imaggggg',Object.keys(image.magicCoordObj).length);
								image.start = Object.keys(image.magicCoordObj).length;
							}
						}
					}
				}
				//所有点击处坐标
				if(Object.keys(uid_startPixelPtObj).length) {
					for(let uidKey in uid_startPixelPtObj) {
						if(uidKey == uid) {
							//处理多帧
							if(numberOfFrames > 0) {
								let frameIndex = image.imageId.substr(image.imageId.indexOf('=') + 1);
								for(let frameKey in uid_startPixelPtObj[uidKey]) {
									if(frameIndex == frameKey) {
										image.startPixelPtObj = uid_startPixelPtObj[uid][frameKey];
									}
									//console.log(1516,frameIndex,frameKey);
								}
								//console.log(1518,image);
							} else {
								image.startPixelPtObj = uid_startPixelPtObj[uid];
							}
						}
					}
				}
				//阈值
				if(Object.keys(uid_magicAdjustObj).length) {
					for(let uidKey in uid_magicAdjustObj) {
						if(uidKey == uid) {
							//处理多帧
							if(numberOfFrames > 0) {
								let frameIndex = image.imageId.substr(image.imageId.indexOf('=') + 1);
								for(let frameKey in uid_magicAdjustObj[uidKey]) {
									if(frameIndex == frameKey) {
										image.magicAdjustObj = uid_magicAdjustObj[uid][frameKey];
									}
									//console.log(1536,frameIndex,frameKey);
								}
								//console.log(1538,image);
							} else {
								image.magicAdjustObj = uid_magicAdjustObj[uid];
							}
						}
					}
				}
				//魔术棒轮廓
//				if(Object.keys(uid_magicOulinePtObj).length) {
//					for(let uidKey in uid_magicOulinePtObj) {
//						if(uidKey == uid) {
//							//处理多帧
//							if(numberOfFrames > 0) {
//								let frameIndex = image.imageId.substr(image.imageId.indexOf('=') + 1);
//								for(let frameKey in uid_magicOulinePtObj[uidKey]) {
//									if(frameIndex == frameKey) {
//										image.magicOulinePtObj = uid_magicOulinePtObj[uid][frameKey];
//									}
//									//console.log(1536,frameIndex,frameKey);
//								}
//								//console.log(1538,image);
//							} else {
//								image.magicOulinePtObj = uid_magicOulinePtObj[uid];
//							}
//						}
//					}
//				}
				//console.log(1556,'restoreMag',image);
			}
		}
	}

	// 图像保存
	saveImage() {
		let canvas = this.detail.canvasContext.canvas;
		if(this.loaded) {
			//文件名
			let index = this.seriesObj[this.currentDisplaySeries]["picOrderNum"].indexOf(this.currentDisplaySeriesPicNum);
			let canvasFilename = this.patientName + '---' + this.sID + '.' + (index + 1);
			let information = this.patientName + "——" + this.sID + '.' + (index + 1);
			//转base64
			let strDataURI = canvas.toDataURL("image/jpg").split("base64,")[1];
			//创建压缩对象
			let zip = new JSZip();
			//zip.file("information.txt", information);
			//压缩打包
			let img = zip.folder(canvasFilename);
			img.file(canvasFilename + ".jpg", strDataURI, {
				base64: true
			});
			zip.generateAsync({
				type: "blob"
			}).then(function(content) {
				//see FileSaver.js
				saveAs(content, canvasFilename + ".zip");
			});
		}
	}
	// ctrl + c 图像保存
	ctrlCSaveImage() {
		let canvas = this.detail.canvasContext.canvas;
		if(this.loaded) {
			//转base64
			return canvas.toDataURL("image/jpg");
		}
	}
	// 恢复绘制
	restoreDraw(element) {
		//		console.log('恢复',element);
		this.disableAllTools();
		this.needUpdateAppState = false;
		cornerstoneTools.appState.restore(JSON.parse(this.oldAppState));
		cornerstone.updateImage(element);
	}

	// 恢复ajax默认绘制
	restoreNetAppstateDraw(eleArr, netAppstate) {
		let appState = netAppstate;
		//console.log('restoreNetAppstateDraw');
		if(!appState) {
			alert('无信息');
			return;
		}
		let orderImageIdToolState = {};
		for(let seriesID in this.seriesObj) {
			for(let key in this.seriesObj[seriesID]) {
				if(key == 'picOrderNum') {
					continue;
				}
				let uid = this.seriesObj[seriesID][key].data.string('x00080018');
				let imageid = this.seriesObj[seriesID][key].imageId;
				for(let imgId in appState.imageIdToolState) {
					if(appState.imageIdToolState[imgId].sopInstanceUID == uid) {
						orderImageIdToolState[imageid] = appState.imageIdToolState[imgId];
					}
				}
			}
		}
		let orderImageIdToolStateStr = JSON.stringify(orderImageIdToolState);
		appState.imageIdToolState = JSON.parse(orderImageIdToolStateStr);
		let nowAppstate = JSON.stringify(appState);
		this.disableAllTools();
		cornerstoneTools.appState.restore(JSON.parse(nowAppstate));
		//console.log(eleArr);
		for(let i = 0; i < eleArr.length; i++) {
			cornerstone.updateImage(eleArr[i]);
		}
	}

	//整理错乱的image信息以及imageID
	restoreSeriesObj() {
		//需要更改appstate中的数据,依据是seriesObj
		let appState = JSON.parse(this.dynamicAppstate);
		if(!appState) {
			alert('无保存信息');
			return;
		}
		//console.log(appState,12112222111);
		let orderImageIdToolState = JSON.parse(this.dynamicAppstate);
		for(let seriesID in this.seriesObj) {
			for(let key in this.seriesObj[seriesID]) {
				if(key == 'picOrderNum') {
					continue;
				}
				let uid = this.seriesObj[seriesID][key].data.string('x00080018');
				let image = this.seriesObj[seriesID][key];
				let imageid = this.seriesObj[seriesID][key].imageId;
				if(appState) {
					for(let imgId in appState.imageIdToolState) {
						if(appState.imageIdToolState[imgId].sopInstanceUID == uid) {
							orderImageIdToolState.imageIdToolState[imageid] = appState.imageIdToolState[imgId];
						}
					}
				}
			}
		}
		//console.log(orderImageIdToolState,"orderImageIdToolState");

		let orderImageIdToolStateStr = JSON.stringify(orderImageIdToolState);
		appState = JSON.parse(orderImageIdToolStateStr);
		if(JSON.stringify(appState) != '{"imageIdToolState":{}}') {
			this.oldAppState = JSON.stringify(appState);
		}
	}
	//保存坐标信息
	saveCoordinate(studyUID) {
		// 获取当前保存的时间节点
		let dateTime = new Date();
		let date_Year = dateTime.getFullYear();
		let date_month = dateTime.getMonth();
		let date_date = dateTime.getDate();
		let date_hour = dateTime.getHours();
		let date_minute = dateTime.getMinutes();
		let date_s = dateTime.getSeconds();
		//c++处理所需数据
		this.c_markArr = [];
		let c_markInfo = {};
		//c_markInfo.saveTime = date_Year+'-'+date_month+'-'+date_date+ ' ' +date_hour+':'+date_minute+':'+date_s;
		let eleArr = [];
		for(let i = 0; i < $('#dicomDiv>div').length; i++) {
			//console.log($('#dicomDiv>div')[i].children.length)
			if($('#dicomDiv>div')[i].children.length == 5) {
				eleArr.push($('#dicomDiv>div')[i]);
			} else {
				continue;
			}
		}
		let saveAppState = cornerstoneTools.appState.save(eleArr);
		//		let saveAppState = cornerstoneTools.appState.save([this.element]);
		for(let key in saveAppState.imageIdToolState) {
			for(let i in saveAppState.imageIdToolState[key]) {
				if(saveAppState.imageIdToolState[key][i].data) {
					if(saveAppState.imageIdToolState[key][i].data.length == 0) {
						delete saveAppState.imageIdToolState[key][i];
					}
				}
			}
			//console.log('childNum', saveAppState, Object.keys(saveAppState.imageIdToolState[key]));
			if(Object.keys(saveAppState.imageIdToolState[key]).length == 2) {
				delete saveAppState.imageIdToolState[key];
			}
		}
		this.appState = saveAppState;
		//console.log(111, this.appState);

		let imageMarkInfo = {};
		let index = 0;
		for(let key in this.appState.imageIdToolState) {
			let dataArr = [];
			let frameBox = {};
			imageMarkInfo = this.appState.imageIdToolState[key];
			if(!c_markInfo[imageMarkInfo.sopInstanceUID]) {
				c_markInfo[imageMarkInfo.sopInstanceUID] = {};
				c_markInfo[imageMarkInfo.sopInstanceUID].sopInstanceUID = imageMarkInfo.sopInstanceUID;
				c_markInfo[imageMarkInfo.sopInstanceUID].seriesID = imageMarkInfo.seriesID;
				c_markInfo[imageMarkInfo.sopInstanceUID].studyUID = studyUID;
				c_markInfo[imageMarkInfo.sopInstanceUID].marks = [];
				if(this.numframes) {
					c_markInfo[imageMarkInfo.sopInstanceUID].frame = true;
				} else {
					c_markInfo[imageMarkInfo.sopInstanceUID].frame = false;
				}
			}
			for(let i in imageMarkInfo) {
				//				console.log(555,i,imageMarkInfo[i].data);
				if(imageMarkInfo[i].data) {
					if(i == 'rectangleRoi') {
						for(let j = 0; j < imageMarkInfo[i].data.length; j++) {
							let mm = {};
							mm.textBox = {};
							mm.polylineBox = {};
							mm.polylineBox.type = 'polyline';
							mm.polylineBox.coord = [];
							let n1 = {};
							let n2 = {};
							let n3 = {};
							let n4 = {};
							let n5 = {};
							n1.x1 = imageMarkInfo[i].data[j].handles.end.x;
							n1.y1 = imageMarkInfo[i].data[j].handles.start.y;
							n2.x2 = imageMarkInfo[i].data[j].handles.start.x;
							n2.y2 = imageMarkInfo[i].data[j].handles.start.y;
							n3.x3 = imageMarkInfo[i].data[j].handles.start.x;
							n3.y3 = imageMarkInfo[i].data[j].handles.end.y;
							n4.x4 = imageMarkInfo[i].data[j].handles.end.x;
							n4.y4 = imageMarkInfo[i].data[j].handles.end.y;
							n5.x5 = imageMarkInfo[i].data[j].handles.end.x;
							n5.y5 = imageMarkInfo[i].data[j].handles.start.y;
							mm.polylineBox.coord.push(n1);
							mm.polylineBox.coord.push(n2);
							mm.polylineBox.coord.push(n3);
							mm.polylineBox.coord.push(n4);
							mm.polylineBox.coord.push(n5);
							mm.textBox.type = 'text';
							mm.textBox.coord = imageMarkInfo[i].data[j].handles.textBox.boundingBox;
							mm.textBox.x = imageMarkInfo[i].data[j].handles.textBox.x;
							mm.textBox.y = imageMarkInfo[i].data[j].handles.textBox.y;
							mm.textBox.text = [];
							mm.textBox.text.push('Mean:' + imageMarkInfo[i].data[j].meanStdDev.mean.toFixed(2) + 'HU');
							mm.textBox.text.push('StdDev:' + imageMarkInfo[i].data[j].meanStdDev.stdDev.toFixed(2) + 'HU');
							mm.textBox.text.push('Area:' + imageMarkInfo[i].data[j].area.toFixed(2) + 'mm²');
							//							mm.markTime = imageMarkInfo[i].data[j].markTime;
							dataArr.push(mm);
						}
					} else if(i == 'freehand') {
						for(let j = 0; j < imageMarkInfo[i].data.length; j++) {
							let mm = {};
							mm.textBox = {};
							mm.polylineBox = {};
							mm.polylineBox.type = 'polyline';
							mm.polylineBox.coord = [];
							for(let k = 0; k < imageMarkInfo[i].data[j].handles.length; k++) {
								let nn = {};
								nn['x' + (k + 1)] = imageMarkInfo[i].data[j].handles[k].x;
								nn['y' + (k + 1)] = imageMarkInfo[i].data[j].handles[k].y;
								mm.polylineBox.coord.push(nn);
							}
							mm.textBox.type = 'text';
							mm.textBox.coordSize = imageMarkInfo[i].data[j].textBox.boundingBox;
							mm.textBox.x = imageMarkInfo[i].data[j].textBox.x;
							mm.textBox.y = imageMarkInfo[i].data[j].textBox.y;
							mm.textBox.text = [];
							mm.textBox.text.push('Mean:' + imageMarkInfo[i].data[j].meanStdDev.mean.toFixed(2) + 'HU');
							mm.textBox.text.push('StdDev:' + imageMarkInfo[i].data[j].meanStdDev.stdDev.toFixed(2) + 'HU');
							mm.textBox.text.push('Area:' + imageMarkInfo[i].data[j].area.toFixed(2) + 'mm²');
							//							mm.markTime = imageMarkInfo[i].data[j].markTime;
							dataArr.push(mm);
						}
					} else if(i == 'probe') {
						for(let j = 0; j < imageMarkInfo[i].data.length; j++) {
							let mm = {};
							mm.textBox = {};
							mm.probeBox = {};
							mm.probeBox.type = 'probe';
							mm.probeBox.coord = [];
							let nn = {};
							nn['x' + (j + 1)] = imageMarkInfo[i].data[j].handles.end.x;
							nn['y' + (j + 1)] = imageMarkInfo[i].data[j].handles.end.y;
							mm.probeBox.coord.push(nn);
							mm.textBox.type = 'text';
							mm.textBox.text = imageMarkInfo[i].data[j].textBox;
							mm.textBox.coordSize = imageMarkInfo[i].data[j].handles.textBox.boundingBox;
							mm.textBox.x = imageMarkInfo[i].data[j].handles.textBox.x;
							mm.textBox.y = imageMarkInfo[i].data[j].handles.textBox.y;
							//							mm.markTime = imageMarkInfo[i].data[j].markTime;
							dataArr.push(mm);
						}
					} else {
						for(let j = 0; j < imageMarkInfo[i].data.length; j++) {
							let mm = {};
							mm.textBox = {};
							mm.textBox.type = 'text';
							if('start2' in imageMarkInfo[i].data[j].handles) {
								mm.polylineBox = {};
								mm.polylineBox.type = 'polyline';
								mm.polylineBox.coord = [];
								mm.textBox.text = imageMarkInfo[i].data[j].angletext;
								let n1 = {};
								let n2 = {};
								let n3 = {};
								let n4 = {};
								n1.x1 = imageMarkInfo[i].data[j].handles.start.x;
								n1.y1 = imageMarkInfo[i].data[j].handles.start.y;
								n2.x2 = imageMarkInfo[i].data[j].handles.end.x;
								n2.y2 = imageMarkInfo[i].data[j].handles.end.y;
								n3.x3 = imageMarkInfo[i].data[j].handles.start2.x;
								n3.y3 = imageMarkInfo[i].data[j].handles.start2.y;
								n4.x4 = imageMarkInfo[i].data[j].handles.end2.x;
								n4.y4 = imageMarkInfo[i].data[j].handles.end2.y;
								mm.polylineBox.coord.push(n1);
								mm.polylineBox.coord.push(n2);
								mm.polylineBox.coord.push(n3);
								mm.polylineBox.coord.push(n4);
							}
							if('textBox' in imageMarkInfo[i].data[j].handles) {
								mm.textBox.coordSize = imageMarkInfo[i].data[j].handles.textBox.boundingBox;
								mm.textBox.x = imageMarkInfo[i].data[j].handles.textBox.x;
								mm.textBox.y = imageMarkInfo[i].data[j].handles.textBox.y;
							}
							if('text' in imageMarkInfo[i].data[j]) {
								mm.arrowBox = {};
								mm.arrowBox.type = 'arrow';
								mm.arrowBox.coord = [];
								let n1 = {};
								let n2 = {};
								n1.x1 = imageMarkInfo[i].data[j].handles.start.x;
								n1.y1 = imageMarkInfo[i].data[j].handles.start.y;
								n2.x2 = imageMarkInfo[i].data[j].handles.end.x;
								n2.y2 = imageMarkInfo[i].data[j].handles.end.y;
								mm.arrowBox.coord.push(n1);
								mm.arrowBox.coord.push(n2);
								mm.textBox.text = imageMarkInfo[i].data[j].text;
							}
							if('length' in imageMarkInfo[i].data[j]) {
								mm.polylineBox = {};
								mm.polylineBox.type = 'polyline';
								mm.polylineBox.coord = [];
								let n1 = {};
								let n2 = {};
								n1.x1 = imageMarkInfo[i].data[j].handles.start.x;
								n1.y1 = imageMarkInfo[i].data[j].handles.start.y;
								n2.x2 = imageMarkInfo[i].data[j].handles.end.x;
								n2.y2 = imageMarkInfo[i].data[j].handles.end.y;
								mm.polylineBox.coord.push(n1);
								mm.polylineBox.coord.push(n2);
								mm.textBox.text = imageMarkInfo[i].data[j].length.toFixed(2) + 'mm';
							}
							if('meanStdDev' in imageMarkInfo[i].data[j]) {
								mm.ellipseBox = {};
								mm.ellipseBox.type = 'ellipse';
								mm.ellipseBox.coord = [];
								let n1 = {};
								let n2 = {};
								n1.x1 = imageMarkInfo[i].data[j].handles.start.x;
								n1.y1 = imageMarkInfo[i].data[j].handles.start.y;
								n2.x2 = imageMarkInfo[i].data[j].handles.end.x;
								n2.y2 = imageMarkInfo[i].data[j].handles.end.y;
								mm.ellipseBox.coord.push(n1);
								mm.ellipseBox.coord.push(n2);
								mm.textBox.text = [];
								mm.textBox.text.push('Mean:' + imageMarkInfo[i].data[j].meanStdDev.mean.toFixed(2) + 'HU');
								mm.textBox.text.push('StdDev:' + imageMarkInfo[i].data[j].meanStdDev.mean.toFixed(2) + 'HU');
								mm.textBox.text.push('Area:' + imageMarkInfo[i].data[j].area.toFixed(2) + 'mm²');
							}
							//mm.markTime = imageMarkInfo[i].data[j].markTime;
							dataArr.push(mm);
						}
					}
				}
				if(!this.numframes) {
					if(frameBox.mark == undefined) {
						frameBox.frameId = null;
						frameBox.mark = dataArr;
						c_markInfo[imageMarkInfo.sopInstanceUID].marks.push(frameBox);
					}
				} else {
					if(frameBox.frameId == undefined) {
						frameBox.frameId = imageMarkInfo['frameID'];
						frameBox.mark = dataArr;
						c_markInfo[imageMarkInfo.sopInstanceUID].marks.push(frameBox);
					}
				}
			}
		}
		////////////////////////////////////////
		//console.log('c_markInfo',c_markInfo);
		for(let key in c_markInfo) {
			this.c_markArr.push(c_markInfo[key]);
		}
		console.log(34342, this.c_markArr);
		////////////////////////////////////////
		//魔术棒数据整理
		for(let uid in uid_magicCoordObj) {
			if(JSON.stringify(uid_magicCoordObj[uid]) == '{}') {
				delete uid_magicCoordObj[uid];
				delete uid_startPixelPtObj[uid];
				delete uid_magicAdjustObj[uid];
				//delete uid_magicOulinePtObj[uid];
			}
		}
		this.magicInfo = {};
		//////////////////////////////////////////////////
//		console.log(uid_magicCoordObj,uid_startPixelPtObj,uid_magicAdjustObj);
		this.magicInfo.coord = uid_magicCoordObj;
		this.magicInfo.startPixelPt = uid_startPixelPtObj;
		this.magicInfo.threshold = uid_magicAdjustObj;
		//this.magicInfo.oulinePt = uid_magicOulinePtObj;
		if(!this.numframes){
			for(let key in uid_magicCoordObj){
				let coord = uid_magicCoordObj[key];
				let startPixelPt = uid_startPixelPtObj[key];
				let threshold = uid_magicAdjustObj[key];
				//let oulinePt = uid_magicOulinePtObj[key];
				this.magicInfo.coord[key] = {};
				this.magicInfo.startPixelPt[key] = {};
				this.magicInfo.threshold[key] = {};
				this.magicInfo.oulinePt[key] = {};
				let index = 1;
				for(let i in coord){
					this.magicInfo.coord[key][index] = coord[i];
					this.magicInfo.startPixelPt[key][index] = startPixelPt[i];
					this.magicInfo.threshold[key][index] = threshold[i];
					//this.magicInfo.oulinePt[key][index] = oulinePt[i];
					index++;
				}
			}
		}else{
			for(let key in uid_magicCoordObj){
				let magicCoordObj = uid_magicCoordObj[key];
				let startPixelPtObj = uid_startPixelPtObj[key];
				let thresholdObj = uid_magicAdjustObj[key];
				//let oulinePtObj = uid_magicOulinePtObj[key];
				for(let frameId in magicCoordObj){
					let coord = magicCoordObj[frameId];
					let startPixelPt = startPixelPtObj[frameId];
					let threshold = thresholdObj[frameId];
					let oulinePt = oulinePtObj[frameId];
					this.magicInfo.coord[key][frameId] = {};
					this.magicInfo.startPixelPt[key][frameId] = {};
					this.magicInfo.threshold[key][frameId] = {};
					this.magicInfo.oulinePt[key][frameId] = {};
					let index = 1;
					for(let i in coord){
						this.magicInfo.coord[key][frameId][index] = coord[i];
						this.magicInfo.startPixelPt[key][frameId][index] = startPixelPt[i];
						this.magicInfo.threshold[key][frameId][index] = threshold[i];
						//this.magicInfo.oulinePt[key][frameId][index] = oulinePt[i];
						index++;
					}
				}
			}
		}
		///////////////////////////////////////////////////
		if(JSON.stringify(this.magicInfo.coord) == "{}"){
			this.magicInfo = {};
		}
		console.log('ddd',this.magicInfo);
	}

}

export default DicomImage;
