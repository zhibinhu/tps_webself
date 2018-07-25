// import * as cornerstone from "cornerstone-core";
// import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "../public_codecs/cornerstoneTools.js";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "../public/cornerstoneWADOImageLoader.min.js";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstone.imageCache.setMaximumSizeBytes(524288000);
//操作页面中的各类信息
import { domNodeEdit } from "./domNodeEdit.js";
import DicomImage from "./DicomImage.js";
import { activeReferenceLine } from "./lineProjector.js";
import { mprDemo } from "./mprDemo.js";
import TouchEmulator from "../public_codecs/touch-emulator.min.js";
//使用设备判断
let user_equipment = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "phone" : "computer";
//console.log(user_equipment);
var db = 0;
if(user_equipment == "phone") {
	//移动端触屏开启
	TouchEmulator();
}

//网络请求
var netUrl = "/";
if(location.hostname == "127.0.0.1" || location.hostname == "localhost" || location.hostname == "192.168.31.216") {
//	netUrl = "http://10.131.104.140:8089/";
	netUrl = "http://10.131.104.168:8080/";
//	netUrl = "http://10.131.104.171/";
}
// var studyUID = (getUrlParameter()).studyUID;
var studyUID = '1.2.840.113619.2.55.3.12624128.2910.1151313604.887';
//console.log('studyUID', studyUID)

function getUrlParameter() {
	var url = location.href;
	//if(typeof doc != "undefined"){
	//	url = doc.location.href;
	//}
	//判断有没有参数
	if(url.indexOf("?") == -1) {
		return {};
	}
	var paraString = url.substring(url.indexOf("?") + 1, url.length);
	var arrPara = paraString.split('#');
	paraString = arrPara[0];
	paraString = paraString.replace(/=/g, ":'");
	paraString = paraString.replace(/&/g, "',");
	paraString = paraString.replace(/%22/g, "\"");
	if(arrPara.length == 2)
		paraString += ",WellNo:" + arrPara[1];

	var param = eval("({" + paraString + "'})");
	return param;
}
//存放标注数据
var appState = {};
var magicState = {};
//后台传来的原始值
var netAppstate = {};
var showInfo = true;
// 盛放宫格布局的div数组
var elementShowObj = [{
		element: "",
		dicomImage: "",
	},
	{
		element: "",
		dicomImage: "",
	},
	{
		element: "",
		dicomImage: "",
	},
	{
		element: "",
		dicomImage: "",
	}
];
//默认第一个
var activeElementImage = "";
var activeElement = "";
var activeTool = "";
var changeTag = "flipOver";
// 所有已加载序列的所有对应image
var seriesObj = {};
// 所有已加载序列相对应的图像张数
var globalInstanceNumObj = {};
// 加载文件总数
var fileLen = 0;
// 盛放所有加载的image
var imageOriginArr = [];
// 盛放imageId
var imageIDArr = [];
var currentDisplaySeries = "";
var currentDisplaySeriesPicNum = 0;
// 盛放所有已加载的图像的序列号
var seriesIDArr = [];
// 盛放网络加载的所有序列相对应的信息
var netSeriesInfo = {};
// 当前宫格布局方式
var domGenArg;
// 当前本地加载文件数量
var loadPicNum = 0;
// 参考线
var haveLine = true;
// 记录是本地加载图像还是网络加载图像
var fileSource = "internet";
// 是否是网络初始化
var isInternetInit = true;
// 动态SeriesObj是否稳定
var dynamicSeriesObjComplete = false;
// 是否是初始化图像处理
var isInitImageDeal = true;
// 内存警告
var memoryWarning = false;
// 是否是向上翻页（向上请求）
var netDirUp = true;
var loaded = false;
// 打开本地文件
var divTag = $(".ui_btn");
var inputTag = $("#selectFile");
divTag.on("click", function() {
	$('#left>li>div').css('display', 'none');
	return inputTag[0].click();
})
//文件加载初始化
function initDicomImage() {
	$("#dicomDiv>div").off();
	$("#dicomDiv").empty();
	// 动态向DOM中拼接显示宫格布局
	domNodeEdit.dicomImageWrapGenerator();
	var element = $('#dicomDiv>div')[0];
	//	console.log(elementShowObj);
	activeElement = elementShowObj[0]["element"] = element;
	activeElementImage = elementShowObj[0]["dicomImage"] = new DicomImage(activeElement);
	activeElementImage.referenceCallback = referenceCallback;
	activeElementImage.dynamicCallback = dynamicCallback;
	activeElementImage.initImage();
	// 多帧播放与暂停
	let playFramesbtn = document.getElementById('playFrames');
	playFramesbtn.onclick = function() {
		if(activeElementImage.isPlayingFrames) {
			activeElementImage.stopFramesFn();
		} else {
			activeElementImage.playFramesFn();
		}
	}
}
// 初始化参数、页面
function initParams() {
	$(".dynamicWLdiv").remove();
	$("#violutSum").empty();
	seriesObj = {};
	loadPicNum = 0;
	currentDisplaySeries = "";
	currentDisplaySeriesPicNum = 0;
	for(var i = 0; i < imageOriginArr.length; i++) {
		imageOriginArr[i].data = null;
		imageOriginArr[i].getPixelData = null;
	}
	imageOriginArr = [];
	cornerstone.imageCache.purgeCache();
	cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
	cornerstoneWADOImageLoader.wadouri.fileManager.purge();
	imageIDArr = [];
	$('.loading').css('display', 'block');
	$('#layoutDiv div').removeClass('bc');
	//之前的宫格
	for(var i = 0; i < elementShowObj.length; i++) {
		if(elementShowObj[i]["dicomImage"] && elementShowObj[i]["dicomImage"].loaded) {
//			console.log(elementShowObj[i]["dicomImage"].currentImage);
			if(elementShowObj[i]["dicomImage"].frameInterval){
				elementShowObj[i]["dicomImage"].stopFramesFn();
			}
			elementShowObj[i]["dicomImage"].destoryImage();
		}
	}
	//之前的缩略图
	//	console.log(seriesIDArr,1212123);
	for(let i = 0; i < seriesIDArr.length; i++) {
		//		console.log("#smallPic" + seriesIDArr[i]);
		cornerstone.disable($("#smallPic" + seriesIDArr[i]).get(0));
	}
	//清空缩略图
	$("#rightNav>div").empty();
	seriesIDArr = [];
	globalInstanceNumObj = {};
	elementShowObj = [{
			element: "",
			dicomImage: "",
			imageIdArr: []
		},
		{
			element: "",
			dicomImage: "",
			imageIdArr: []
		},
		{
			element: "",
			dicomImage: "",
			imageIdArr: []
		},
		{
			element: "",
			dicomImage: "",
			imageIdArr: []
		}
	];
	//文件加载初始化
	initDicomImage();
}

//文件选取之后的处理方法
function fileChange(files) {
	fileLen = files.length;
	//	console.log(files,fileLen);
	if(fileLen == 0) {
		return;
	}
	//更改文件源为本地
	fileSource = "local";
	//初始化页面
	initParams();
	//有效文件长度
	let fileLenTemp = fileLen;
	var fileExg = /.dcm|.dic|.pr$/i;
	for(var i = 0; i < fileLenTemp; i++) {
		//		console.log(fileExg.test(files[i].name));
		if(!fileExg.test(files[i].name)) {
			fileLen--;
			if(fileLen == 0) {
				$('.loading').css('display', 'none');
				alert("无有效文件可供读取");
			}
			continue;
		}
//		console.log(files[i], "文件");
		var imageid = cornerstoneWADOImageLoader.wadouri.fileManager.add(files[i]);
		loadImage(imageid);
	}
	//清空魔术棒数据
	activeElementImage.clearMagicData();
  //console.log('ac',activeElementImage)
	// 清除工具选种样式
	$('#left>li>div *').removeClass('bcSmall');
	$('#left>li').removeClass('bc');

	//关闭魔术棒阈值窗口
	$('#magicLiSum').css('display','none');
	$('#referenceLine>span')[0].innerHTML = '定位线隐藏';
	$('#infoLi>span')[0].innerHTML = '患者信息隐藏';
}

// 获取本地文件
inputTag[0].onchange = function(e) {
	let files = e.target.files;
	fileChange(files)
};

// 一旦用户将文件放到div中，这个函数就会被调用
function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	// 获取包含被删除的文件列表的FileList对象
	let files = evt.dataTransfer.files;
	// this UI is only built for a single file so just dump the first one
	fileChange(files)
}

// 处理拖拽？？？
//function handleDragOver(evt) {
//	evt.stopPropagation();
//	evt.preventDefault();
//	evt.dataTransfer.dropEffect = 'copy'; // 显式地显示这是一个副本
//}
// Setup the dnd listeners.
//var dicomDiv = document.getElementById("dicomDiv");
//dicomDiv.addEventListener('dragover', handleDragOver, false);
//dicomDiv.addEventListener('drop', handleFileSelect, false);
//cornerstoneWADOImageLoader.configure({
//	beforeSend: function(xhr) {
// Add custom headers here (e.g. auth tokens)
//xhr.setRequestHeader('x-auth-token', 'my auth token');
//	},
//});

// 将本地文件展示到canvas中
function loadImage(imageId) {
	loadPicNum = 0;
	if(fileSource == "local") {
		$(".loading").css("display", "block");
	}
	$('.loading p').html('loading...');
	//console.log(imageId);
	cornerstone.loadImage(imageId).then(function(image) {
		//显示读取本地文件进度的进度条
		//console.log(fileLen,image,"图像读取完成");
		loadPicNum++;
		let percentageNum = parseInt(loadPicNum / fileLen * 100) + '%';
		$('.loading p').html(percentageNum);
		let loadDivWidth = loadPicNum / fileLen * document.querySelector('.loading').offsetWidth + 'px';
		$('.loading div').css({
			width: loadDivWidth,
			height: '100%'
		})
		//		console.log(cornerstone.imageCache.getCacheInfo());
		if(netDirUp) {
			imageOriginArr.push(image);
		} else {
			imageOriginArr.unshift(image);
		}
		if(loadPicNum == fileLen) {
			//已经读取的文件数据处理
			fileLen = 0;
			dealImageArr(imageOriginArr);
		}
	}, function(err) {
		alert("文件格式错误");
		loadPicNum += 1;
		$('.loading').css('display', 'none');
		console.log(err, "文件加载出错");
	});
}

// 重新组装imageID
function parseImageId(imageId) {
	// build a url by parsing out the url scheme and frame index from the imageId
	const firstColonIndex = imageId.indexOf(':');
	let url = imageId.substring(firstColonIndex + 1);
	const frameIndex = url.indexOf('frame=');
	let frame;

	if(frameIndex !== -1) {
		const frameStr = url.substr(frameIndex + 6);

		frame = parseInt(frameStr, 10);
		url = url.substr(0, frameIndex - 1);
	}

	return {
		scheme: imageId.substr(0, firstColonIndex),
		url,
		frame
	};
}

//已经读取的文件数据处理
function dealImageArr(imageOriginArr) {
	//	console.log(43442342,imageOriginArr);
	let showingImageIdArr = [];
	for(let i = 0; i < elementShowObj.length; i++) {
		if(elementShowObj[i].dicomImage.loaded) {
			showingImageIdArr.push(elementShowObj[i].dicomImage.imageId);
		}
	}
	let deleteLength = 20;
	//估算占用的内存值
	let shallowMemorySize = (cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.getInfo()).cacheSizeInBytes * 5 / 1024 / 1024;
	//	console.log(shallowMemorySize,"估算占用的内存值");
	if(shallowMemorySize > 550) {
		deleteLength = 30;
	}
	if(memoryWarning && imageOriginArr.length > deleteLength) {
		console.log("内存占用达到预设峰值");
		let imageOriginindex = {};
//		console.log(imageOriginArr, 111222333);
		for(let i = 0; i < imageOriginArr.length; i++) {
			if(!imageOriginArr[i]) {
				imageOriginArr.splice(i, 1);
				i--;
				continue;
			}
			imageOriginindex[imageOriginArr[i].imageId] = i;
		}
		if(netDirUp) {
			//向上请求,删除前面的
			for(let i = 0; i < deleteLength; i++) {
				if(!imageOriginArr[i]) {
					continue;
				}
				let imageIdTemp = imageOriginArr[i].imageId;
				if(showingImageIdArr.indexOf(imageIdTemp) >= 0) {
					//已经有显示的,跳过删除
					continue;
				}
				let indexTemp = Number(imageIdTemp.split("dicomfile:")[1]);
				let uriTemp = parseImageId(imageIdTemp);
				if(imageOriginArr[imageOriginindex[imageIdTemp]]) {
					imageOriginArr[imageOriginindex[imageIdTemp]].data = undefined;
					imageOriginArr[imageOriginindex[imageIdTemp]].getPixelData = undefined;
					imageOriginArr[imageOriginindex[imageIdTemp]] = undefined;
				}
				cornerstoneWADOImageLoader.wadouri.fileManager.remove(indexTemp);
				cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.unload(uriTemp.url);
			}
		} else {
			//向下请求,删除后面的
			let lengthTemp = imageOriginArr.length;
			for(let i = lengthTemp - 1; i > lengthTemp - 1 - deleteLength; i--) {
				if(!imageOriginArr[i]) {
					continue;
				}
				let imageIdTemp = imageOriginArr[i].imageId;
				if(showingImageIdArr.indexOf(imageIdTemp) >= 0) {
					//已经有显示的,跳过删除
					continue;
				}
				let indexTemp = Number(imageIdTemp.split("dicomfile:")[1]);
				let uriTemp = parseImageId(imageIdTemp);
				if(imageOriginArr[imageOriginindex[imageIdTemp]]) {
					imageOriginArr[imageOriginindex[imageIdTemp]].data = undefined;
					imageOriginArr[imageOriginindex[imageIdTemp]].getPixelData = undefined;
					imageOriginArr[imageOriginindex[imageIdTemp]] = undefined;
				}
				cornerstoneWADOImageLoader.wadouri.fileManager.remove(indexTemp);
				cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.unload(uriTemp.url);
			}

		}
		for(let i = 0; i < imageOriginArr.length; i++) {
			if(!imageOriginArr[i]) {
				imageOriginArr.splice(i, 1);
				i--;
			}
		}
//		console.log(imageOriginArr, 1231230000123123);
		seriesObj = {};
		memoryWarning = false;
	}

	imageOriginArr.forEach(function(image, key) {
		if(!image) {
			return;
		}
		//拿到series,并且放到数组中
		let seriesNum = image.data.string('x00200011');
		let picOrderNum = image.data.string('x00200013');
		//多帧播放
		let numframes = parseInt(image.data.string("x00280008"));
		//console.log(222,numframes);

		if(numframes) {
			for(let i = 0; i < numframes; i++) {
				let imageId = image.imageId + "?frame=" + i;
				imageIDArr.push(imageId);
			}
		} else {
			imageIDArr.push(image.imageId);
		}

		if(seriesObj[seriesNum]) {
			seriesObj[seriesNum][picOrderNum] = image;
			seriesObj[seriesNum]["picOrderNum"].push(picOrderNum);
		} else {
			seriesObj[seriesNum] = {};
			seriesObj[seriesNum][picOrderNum] = image;
			//存储order值
			seriesObj[seriesNum]["picOrderNum"] = [picOrderNum];
		}
		//去重
		seriesObj[seriesNum]["picOrderNum"] = Array.from(new Set(seriesObj[seriesNum]["picOrderNum"]));
		//排序
		seriesObj[seriesNum]["picOrderNum"].sort(function(a, b) {
			return a - b;
		});
	})
//	console.log(seriesObj, "seriesObj", dynamicSeriesObjComplete);

	if(!dynamicSeriesObjComplete) {
		dynamicSeriesObjComplete = false;
		$(activeElement).find(".loadingTip").css("display", "block");
	} else {
		dynamicSeriesObjComplete = true;
		$(activeElement).find(".loadingTip").css("display", "none");
	}

	if(fileSource == "local" || isInternetInit) {
		$(activeElement).find(".loadingTip").css("display", "none");
	}
	globalInstanceNumFn(seriesObj);

	if(isInitImageDeal && dynamicSeriesObjComplete) {
		//显示序列(后续点击序列进行添加)
		seriesChangePicShow(currentDisplaySeries);
		return;
	}

	if(isInitImageDeal && fileSource == "internet") {
		//显示序列(一开始序列进行显示)
		if(dynamicSeriesObjComplete) {
			seriesChangePicShow(currentDisplaySeries);
		} else {
			seriesShow();
		}
	}

	if(fileSource == "local") {
		seriesShow();
	}
}

//处理当前所有的(处理过的)instanceUID
function globalInstanceNumFn(seriesObj) {
	for(let key in seriesObj) {
		if(globalInstanceNumObj[key]) {
			globalInstanceNumObj[key] = globalInstanceNumObj[key].concat(seriesObj[key].picOrderNum);
			//去重
			globalInstanceNumObj[key] = Array.from(new Set(globalInstanceNumObj[key]));
			//排序
			globalInstanceNumObj[key].sort(function(a, b) {
				return a - b;
			});
		} else {
			globalInstanceNumObj[key] = seriesObj[key].picOrderNum;
		}
	}
	let domLength = $("#dicomDiv>div").length;
	for(let i = 0; i < domLength; i++) {
		let loaded = elementShowObj[i]["dicomImage"].loaded;
		if(loaded) {
			elementShowObj[i]["dicomImage"].updateSeriesObjAndInstance(seriesObj, globalInstanceNumObj);
		}
	}
//	console.log(503, globalInstanceNumObj, seriesObj);
}

//序列显示
function seriesShow() {
//	console.log("序列数组seriesShow");
	//设置当前元素显示的序列和状态管理
	activeElementImage.needUpdateAppState = true;
	activeElementImage.setSeriesAndStack(seriesObj, imageIDArr, globalInstanceNumObj, appState,magicState);
	//循环添加缩略图
	for(let key in seriesObj) {
		let domId = "smallPic" + key;
		seriesIDArr.push(key);
		//console.log(fileSource, isInternetInit);
		if(fileSource == "local") {
			$("#rightNav>div").append($('<div class="sPIC">' + "<p class='seriesInfo'>" + (seriesObj[key]["picOrderNum"].length) + "(ID:" + key + ")" + "</p >" + '</div>').append($('<div id="' + domId + '"></div>')).on("click", seriesChange).data("seriesID", key));
		} else if(fileSource == "internet" && isInternetInit) {
			$("#rightNav>div").append($('<div class="sPIC">' + "<div class='smallLoading'><div><div class='smallProgress'></div></div></div>" + "<p class='seriesInfo'>" + netSeriesInfo[key]["imageCount"] + "(ID:" + key + ")" + "</p >" + '</div>').append($('<div id="' + domId + '"></div>')).on("click", seriesChange).data("seriesID", key));
		}
		if((fileSource == "internet" && isInternetInit) || fileSource == "local") {
			let seriesElement = $("#" + domId).get(0);
			cornerstone.enable(seriesElement);
			// 显示图像
			let seriesShowOrder = seriesObj[key]["picOrderNum"][0];
			cornerstone.displayImage(seriesElement, seriesObj[key][seriesShowOrder]);
//			console.log(seriesObj[key][seriesShowOrder],"image");
//			console.log(seriesObj[key][seriesShowOrder].getPixelData(),"getpixeldata");
			//默认显示无lut值的图像
			let LMviewport = cornerstone.getViewport(seriesElement);
			if(LMviewport.voiLUT) {
				LMviewport.voiLUT = undefined;
				cornerstone.setViewport(seriesElement, LMviewport);
			}
		}

	}
//	console.log('netSeriesInfo', netSeriesInfo, 'netSeriesInfo');
	// 滚动缩略图
	rightnavScroll();

	if((fileSource == "internet" && isInternetInit) || fileSource == "local") {
		currentDisplaySeries = seriesIDArr[0];
		// 防止下次添加缩略图
		isInternetInit = false;
		// 设置当前选择的series
		let elementShowOrder = seriesObj[currentDisplaySeries]["picOrderNum"][0]
		// 当前显示序列
		//activeElementImage.setCurrentDisplaySeries(currentDisplaySeries);
		if(fileSource == "internet") {
			activeElementImage.setCurrentDisplaySeries(currentDisplaySeries, netSeriesInfo[currentDisplaySeries].imageCount);
		} else {
			activeElementImage.setCurrentDisplaySeries(currentDisplaySeries, seriesObj[currentDisplaySeries]["picOrderNum"].length);
		}
		// 展示图像
		activeElementImage.imageView(seriesObj[currentDisplaySeries][elementShowOrder]);
		activeElementImage.resize();
		// 定位线
		if(haveLine) {
			activeElementImage.enableLine();
		} else {
			activeElementImage.disableLine();
		}
		//PC默认请求series
		if(fileSource == "internet") {
			pcNetQuestSeries();
		}
	} else {
		if(activeElementImage.loaded) {
			activeElementImage.updateImage();
		}
	}

	// Div添加点击事件
	if(user_equipment == 'phone') {
		activeElementImage.element.ontouchstart = phoneTouchStartAction;
	} else if(user_equipment == 'computer') {
		$("#dicomDiv>div").off();
		console.log(593593);
		$(activeElementImage.element).on("click", computerClickAction)
	}
	//添加点击样式
	$('#rightNav>div>div').click(function(){
		$('#rightNav>div>div').css('backgroundColor','black');
		this.style.backgroundColor = 'darkgray';
	})
	clickColorSmall($('#wlInput div'));
	// 文件加载完毕，隐藏进度条
	$('.loading').html('').css('display', 'none');
	loaded = true;
}
//点击序列缩略图，切换序列显示图像
function seriesChange() {
//	console.log('change',1);
	let seriesChangeAppState = cornerstoneTools.appState.save([activeElement]);
	seriesChangeAppState.elementToolState = appState.elementToolState;
	seriesChangeAppState.elementViewport = appState.elementViewport;
	//	console.log(99999999,appState,seriesChangeAppState);
	appState = seriesChangeAppState;
	//检查是否处于freehand
	if(!activeElementImage.freeHandCheck()) {
		$('#rightNav').off('click');
		return;
	}
	currentDisplaySeries = activeElementImage.currentDisplaySeries;
	let seriesElement = this;
	// 当前点击的序列号
	let selectedSeries = $(this).data("seriesID");
//	console.log("序列点击", selectedSeries);

	if(currentDisplaySeries == selectedSeries && fileSource == "local") {
		return;
	} else {
		currentDisplaySeries = selectedSeries;
	}
	//如果是多帧图像
	if(activeElementImage.isPlayingFrames) {
		activeElementImage.stopFramesFn();
	}
	if(fileSource == "internet") {
		//显示loading图
		$(activeElementImage.element).find(".loadingTip").css("display", "block");
		if(!netSeriesInfo[selectedSeries].loadComplete) {
			//已经请求完成就不再中断网络
			for(let key in netSeriesInfo) {
				netSeriesInfo[key].netQuestPause = true;
			}
			netSeriesInfo[selectedSeries].netQuestPause = false;
		}
		netGetseriesInstance(selectedSeries, seriesElement);
		dynamicImageArrGenerator(selectedSeries, seriesElement)
	} else {
		//本地可以直接进行序列切换显示
		seriesChangePicShow(currentDisplaySeries);
	}
}
//本地可以直接进行序列切换显示
function seriesChangePicShow(currentDisplaySeries) {
//	console.log('change',2);
	//	console.log("序列数组seriesChangePicShow");
	isInitImageDeal = false;
	// 切换显示的图像
	let elementShowOrder = seriesObj[currentDisplaySeries]["picOrderNum"][0];
	//	console.log(activeElementImage.element);
	if(fileSource == "internet") {
		activeElementImage.setCurrentDisplaySeries(currentDisplaySeries, netSeriesInfo[currentDisplaySeries].imageCount);
	} else {
		activeElementImage.setCurrentDisplaySeries(currentDisplaySeries, seriesObj[currentDisplaySeries]["picOrderNum"].length);
	}
	activeElementImage.needUpdateAppState = true;
	activeElementImage.setSeriesAndStack(seriesObj, imageIDArr, globalInstanceNumObj, appState,magicState);
	//	console.log(seriesObj[currentDisplaySeries][elementShowOrder]);
	activeElementImage.imageView(seriesObj[currentDisplaySeries][elementShowOrder]);
	activeElementImage.resize();
	if(haveLine) {
		activeElementImage.enableLine();
		//定位线展示
		lineRenderFn();
	} else {
		activeElementImage.disableLine();
	}
	// 判断病人信息是否显示
	if(showInfo) {
		activeElementImage.patientInfo(true);
	} else {
		activeElementImage.patientInfo(false);
	}
	//信息显示
	nodeInfoOperation(activeElementImage);
	//	console.log(seriesObj);
}

//动态生成imageArr
function dynamicImageArrGenerator(selectedSeries, seriesElement) {
	//动态进行请求(从本地)加载图像,并形成显示用的数组
	let seriesImageCount = netSeriesInfo[selectedSeries].imageCount;
	let seriesLoadedNum = netSeriesInfo[selectedSeries].loadedNum;
	let seriesLoadedComplete = netSeriesInfo[selectedSeries].loadComplete;
//	console.log(seriesLoadedNum, "已经加载的数量");
	if(seriesLoadedComplete || seriesLoadedNum > 20 || seriesImageCount == 1) {
		//序列都加载/缓存完成,或者已经缓存了20张,可以进行本地文件存储
//		console.log("文件缓存足够");
		//检查当前数组中是否存在instanceNum为1的图像
//		console.log(seriesObj[selectedSeries]);
		if(seriesObj[selectedSeries]) {
			//已经在内存中有文件的
			if(seriesObj[selectedSeries]["1"] && seriesImageCount == 1) {
//				console.log("存在第一张图,可以不走网络请求");
				$(".loadingTip").css("display", "none");
				seriesChangePicShow(selectedSeries)
			} else {
				if(seriesObj[selectedSeries]["picOrderNum"][0] !== "1" || seriesObj[selectedSeries]["picOrderNum"].length == 1) {
//					console.log("多图序列,请求文件");
					//					seriesChangePicShow(selectedSeries)
					isInitImageDeal = true;
					// 检查要请求多少页
					if(netSeriesInfo[selectedSeries].maxquestNum >= 4) {
						dynamicNetGetInstance(selectedSeries, 4, 1, true);
					} else {
						dynamicNetGetInstance(selectedSeries, netSeriesInfo[selectedSeries].maxquestNum, 1, true);
					}
				} else if(seriesObj[selectedSeries]["picOrderNum"][0] < 2 || seriesObj[selectedSeries]["picOrderNum"].length == netSeriesInfo[selectedSeries].imageCount) {
//					console.log("多图序列,不请求文件");
					$(".loadingTip").css("display", "none");
					seriesChangePicShow(selectedSeries);
				}
			}
		} else {
			//需要请求数据(在内存中没有数据的)
			if(seriesImageCount == 1) {
				//单图序列
				isInitImageDeal = true;
				dynamicNetGetInstance(selectedSeries, 1, 1, true);
			} else {
				//多图序列
				isInitImageDeal = true;
				dynamicNetGetInstance(selectedSeries, 4, 1, true);
			}
		}
	} else {
		let fileQuestWaiting = setTimeout(function() {
			//显示加载图标
			console.log("请求等待中");
			//再次运行当前方法
			dynamicImageArrGenerator(selectedSeries, seriesElement);
		}, 1000);
	}

}

//鼠标滚动时获取网络数据
function dynamicNetGetInstance(selectedSeries, questNum, curPage, upOrDown) {
	//upOrDown用来记录是要向上还是向下进行请求
	if(netSeriesInfo[selectedSeries].maxquestNum < curPage || curPage <= 0) {
		//请求超出范围  curPage小于等于0的时候
		netSeriesInfo[selectedSeries].dynamicLoading = false;
		questNum = 0;
		dynamicCallbackLock = false;
		dynamicSeriesObjComplete = true
		clearInterval(netSeriesInfo[selectedSeries].netQuestInterval);
		return;
	}
	//questNum控制请求的次数(20条数据,即为4页),curPage为请求的页数
	let seriesUID = netSeriesInfo[selectedSeries].seriesUid;
	let pageSize = 5;
	let maxQuestNum = questNum || 1;
	if(netSeriesInfo[selectedSeries].dynamicLoading) {
//		console.log("请求中......");
		dynamicSeriesObjComplete = false;
		$(activeElement).find(".loadingTip").css("display", "block");
		return;
	} else {
		dynamicSeriesObjComplete = true;
		$(activeElement).find(".loadingTip").css("display", "none");
	}
	if(fileLen) {
//		console.log("文件处理中");
		dynamicSeriesObjComplete = false;
		$(activeElement).find(".loadingTip").css("display", "block");
		return;
	} else {
		dynamicSeriesObjComplete = true;
		$(activeElement).find(".loadingTip").css("display", "none");
	}
	if(!curPage) {
		curPage = 1;
	}
	dynamicSeriesObjComplete = false;
	netSeriesInfo[selectedSeries].dynamicLoading = true;
	console.log(questNum,"questnum",curPage,"curPage")
	$.ajax({
		type: "get",
		url: netUrl + "api/dcm/insts",
		data: {
			uid: seriesUID,
			curPage: curPage,
			pageSize: pageSize,
		},
		async: true,
		cache: true,
		dataType: "json",
		success: function(obj) {
			let series = obj.contents;
//			console.log(22, series);
			if(series.length > 0) {
				fileLen = series.length;
				netSeriesInfo[selectedSeries].dynamicLoading = false;
				questNum--;
				if(upOrDown) {
					curPage++;
					netSeriesInfo[selectedSeries].dynamicCurpage++;
				} else {
					netSeriesInfo[selectedSeries].dynamicCurpage--
					curPage--;
				}
				if(questNum <= 0 || curPage > netSeriesInfo[selectedSeries].maxquestNum) {
					dynamicSeriesObjComplete = true;
					$(".loadingTip").css("display", "none");
				}
				clearInterval(netSeriesInfo[selectedSeries].netQuestInterval);
				netSeriesInfo[selectedSeries].netQuestInterval = setInterval(function() {
					//console.log(netSeriesInfo[selectedSeries].loadedNum,netSeriesInfo[selectedSeries].imageCount);
					if(fileLen == 0) {
						if(questNum <= 0) {
							clearInterval(netSeriesInfo[selectedSeries].netQuestInterval);
						} else {

							dynamicNetGetInstance(selectedSeries, questNum, curPage, upOrDown);
						}
					}
				}, 100);
				for(let i = 0; i < series.length; i++) {
					if(series[i].content){
						var imageid = cornerstoneWADOImageLoader.wadouri.fileManager.add(b64toBlob(series[i].content), series[i].instanceUid);
						loadImage(imageid);
					}else{
						// TODO 更新可用数量 globalInstanceNumObj
						netSeriesInfo[selectedSeries].imageCount--;
					}
				}
			} else {
				alert("获取序列图像发生错误,请稍后");
			}
		},
		error: function(err) {
			console.log("网络请求出错");
			dynamicNetGetInstance(selectedSeries, questNum, curPage, upOrDown);
		}
	});
}

//序列切换时的网络请求处理
function netGetseriesInstance(selectedSeries, seriesElement) {
	//检查当前 占用内存(粗略估计),以dataSetCacheManager中缓冲的size*5作为判断依据
	if(fileSource == "local") {
		return;
	}
	if(netSeriesInfo[selectedSeries].loadComplete) {
		//console.log("加载完成");
		return;
	}
	if(netSeriesInfo[selectedSeries].loading) {
//		console.log("加载进行中");
		return;
	}
	netSeriesInfo[selectedSeries].loading = true;
	//计算请求的page
//	console.log(netSeriesInfo[selectedSeries].loadedNum, "计算请求的page");
	let loadedNum = netSeriesInfo[selectedSeries].loadedNum;
	let questPage = Math.floor(loadedNum / 5) + 1;
	let imageCountMax = netSeriesInfo[selectedSeries].imageCount;
	let questNumber = 1;
	let seriesUid = netSeriesInfo[selectedSeries].seriesUid;
	$(seriesElement).find(".smallLoading").css("display", "block");
	//网络请求
	seriesAjaxFn();

	function seriesAjaxFn() {
		$.ajax({
			type: "get",
			url: netUrl + "api/dcm/insts",
			data: {
				uid: seriesUid,
				curPage: questPage,
				pageSize: 5
			},
			async: true,
			cache: true,
			dataType: "json",
			success: function(data) {
//				var contentsArr = data.contents;
//				for(var i = 0; i < contentsArr.length; i++) {
//					var instanceUid = contentsArr[i]["instanceUid"];
//					var instanceBase64 = contentsArr[i]["content"];
//				}
				questNumber = 5 * questPage;
				questPage++;
				let process = questNumber / imageCountMax * 100 + "%";
				$(seriesElement).find(".smallProgress").css("width", process);
				if(questNumber < imageCountMax) {
					netSeriesInfo[selectedSeries].loadedNum = questNumber;
					netSeriesInfo[selectedSeries].loadComplete = false;
					if(!netSeriesInfo[selectedSeries].netQuestPause) {
						seriesAjaxFn();
					} else {
						netSeriesInfo[selectedSeries].loading = false;
					}
				} else {
					questPage = 1;
					questNumber = 1;
					$(seriesElement).find(".smallProgress").css("width", "100%");
					$(seriesElement).find(".smallLoading").css("display", "none");
					netSeriesInfo[selectedSeries].loadedNum = netSeriesInfo[selectedSeries].imageCount;
					netSeriesInfo[selectedSeries].loadComplete = true;
					netSeriesInfo[selectedSeries].loading = false;
					//检查请求序列是否完整
					if(user_equipment == 'computer') {
						pcNetQuestSeries();
					}
				}
			},
			error: function(err) {
				console.log("网络请求出错");
				seriesAjaxFn();
			}
		})
	}
}

// 检查是否需要加载序列
function checkIfNeedLoadInstance(element) {
	if(fileSource == "local") {
		return;
	}
	//console.log("检查是否需要进行请求序列");
	//当前点击的seriesId
	let elementOrder = parseInt($(element).attr("data-order")) - 1;
	console.log('elementShowObj',elementOrder,elementShowObj)
	if(elementShowObj[elementOrder]["dicomImage"] && elementShowObj[elementOrder]["dicomImage"].loaded) {
		//console.log("有图?尝试请求序列");
		let seriesId = elementShowObj[elementOrder]["dicomImage"].currentDisplaySeries;
		if(netSeriesInfo[seriesId].loading || netSeriesInfo[seriesId].loadComplete) {
			//console.log("正在加载...", "请求完成");
		} else {
			//console.log("netGetseriesInstance",element);
			let seriesElement;
			$(".sPIC").each(function(index, seriesElementTemp) {
				//console.log(index, element);
				if($(seriesElementTemp).data("seriesID") == seriesId) {
					//console.log("找到了");
					seriesElement = seriesElementTemp
				}
			})
			netGetseriesInstance(seriesId, seriesElement);
		}
		//找到缩略图中对应的元素,判断是否需要动态加载图像
		if(Object.keys(seriesObj[seriesId]).length < 20){
			$(".sPIC").each(function(index, element) {
				//console.log(index, element);
				if($(element).data("seriesID") == seriesId) {
					//console.log("找到了");
					currentDisplaySeries = seriesId;
					dynamicNetGetInstance(seriesId, 4, 1, true);
					return false;
				}
			})
		}
	}
}

// 宫格布局切换
$("#layoutDiv>div").on("click", function() {
	let layoutAppState = cornerstoneTools.appState.save([activeElement]);
	layoutAppState.elementToolState = appState.elementToolState;
	layoutAppState.elementViewport = appState.elementViewport;
	//console.log(777777,appState,layoutAppState)
	appState = layoutAppState;
	//清除图像显示区域结构与所有相关事件
	db = 0;
	$("#dicomDiv *").off();
	$("#dicomDiv").empty();
	domGenArg = "r" + $(this).attr("data-row") + "_" + "c" + $(this).attr("data-column");
	//console.log(domGenArg);
	// 动态向DOM中拼接显示宫格布局
	domNodeEdit.dicomImageWrapGenerator(domGenArg);
	// 更新容器
	elementShowObjFn();
	$('#resetViewBtn').css('display', 'none');
	//关闭魔术棒阈值窗口
	activeElementImage.magicStart = false;
	$('#magicLiSum').css('display','none');
})

// 魔术棒
$('#magic').click(function() {
	console.log('llll');
	if(activeElementImage.loaded) {
		activeElementImage.magic();
	}
})
//打开魔术棒状态管理弹窗
$('#magicLiDiv')[0].onclick = function(){
	$('#magicLiSum').css('display','block');
}
//关闭魔术棒状态管理弹窗
$('#magicLiSumClose')[0].onclick = function(){
	$('#magicLiSum').css('display','none');
}
//动态拼接魔术棒状态
function magicStatus(){
//	console.log(990,activeElementImage.currentImage.startPixelPtObj);
	if(activeElementImage.loaded){
		$('#magicLiSumDiv').empty();
		if(Object.keys(activeElementImage.currentImage.startPixelPtObj).length){
			for(let i in activeElementImage.currentImage.startPixelPtObj){
				let magicAdjustNum = activeElementImage.currentImage.magicAdjustObj[i];
				let magicDivLiDom = `<div class="magicDivLi">
							<div class="magicLiNum"></div>
							<input type="range" min="0" max="100" step="1" value="${magicAdjustNum}" class="magicRange"/>
							<div class="rangeVal">${magicAdjustNum}</div>
							<div class="deleteMagicLi"><img src="${domNodeEdit.deleteImg}" alt=""></div>
						</div>`;
				$('#magicLiSumDiv').append(magicDivLiDom);
			}
			$('#magicLiSumNav>p')[0].innerHTML = '当前图像数据';
		}else{
			$('#magicLiSumNav>p')[0].innerHTML = '当前图像无数据';
		}
		//动态改变阈值/删除某个数据
		if(Object.keys(activeElementImage.currentImage.startPixelPtObj).length){
			let index = 0;
			for(let i in activeElementImage.currentImage.startPixelPtObj){
				let rangeInput = $('.magicRange')[index];
				let rangeVal = $('.rangeVal')[index];
				let magicDivLi = $('.magicDivLi')[index];
				let deleteMagicLi = $('.deleteMagicLi')[index];
				let magicLiNum = $('.magicLiNum')[index];
				let nowPixelPt = activeElementImage.currentImage.startPixelPtObj[i];
				index++;
				if(user_equipment == 'phone'){
					rangeInput.ontouchend = function(){
						$('.magicLiNum').css('backgroundColor','lime');
						magicLiNum.style.backgroundColor = 'red';
						activeElementImage.currentImage.magicAdjustObj[i] = $(rangeInput).val();
						rangeVal.innerHTML = $(rangeInput).val();
						activeElementImage.currentImage.magicAdjustObj[i] = Number($(rangeInput).val());
						let nowMagicAdjustNum = activeElementImage.currentImage.magicAdjustObj[i];
						activeElementImage.magicAdjust(nowPixelPt,nowMagicAdjustNum,true,i);
					}
					deleteMagicLi.ontouchstart = function(){
						delete activeElementImage.currentImage.magicAdjustObj[i];
						delete activeElementImage.currentImage.startPixelPtObj[i];
						$('#magicLiSumDiv')[0].removeChild(magicDivLi);
						activeElementImage.magicAdjust(null,null,true,i);
					}
					magicLiNum.ontouchstart = function(){
						$('.magicLiNum').css('backgroundColor','lime');
						this.style.backgroundColor = 'red';
						cornerstone.updateImage(that.element);
						activeElementImage.focusMagic = i;
					}
				}else if(user_equipment == 'computer'){
					rangeInput.onmouseup = function(){
						$('.magicLiNum').css('backgroundColor','lime');
						magicLiNum.style.backgroundColor = 'red';
						activeElementImage.currentImage.magicAdjustObj[i] = $(rangeInput).val();
						rangeVal.innerHTML = $(rangeInput).val();
						activeElementImage.currentImage.magicAdjustObj[i] = Number($(rangeInput).val());
						let nowMagicAdjustNum = activeElementImage.currentImage.magicAdjustObj[i];
						activeElementImage.magicAdjust(nowPixelPt,nowMagicAdjustNum,true,i);
						//console.log('up',activeElementImage.currentImage);
					}
					deleteMagicLi.onclick = function(){
						delete activeElementImage.currentImage.magicAdjustObj[i];
						delete activeElementImage.currentImage.startPixelPtObj[i];
						activeElementImage.magicAdjust(null,null,true,i);
						$('#magicLiSumDiv')[0].removeChild(magicDivLi);
						//console.log(i,'click',activeElementImage.currentImage);
					}
					magicLiNum.onclick = function(){
						$('.magicLiNum').css('backgroundColor','lime');
						this.style.backgroundColor = 'red';
						cornerstone.updateImage(activeElement);
						activeElementImage.focusMagic = i;
					}
				}
			}
		}
	}else{
		$('#magicLiSumDiv').empty();
		$('#magicLiSumNav>p')[0].innerHTML = '未加载图像';
	}
}
//电脑选中div相关的共用部分
function computerPitchPublic(that){
	//console.log('lllooo',activeElementImage.currentImage)
	$("#dicomDiv>div").css("border", "");
	if($("#dicomDiv>div").hasClass("pitch")){
		$("#dicomDiv>div").removeClass('pitch')
	}
	$(that).addClass('pitch');
}
//手机端选中div相关的共用部分
function phonePitchPublic(that){
	$("#dicomDiv>div").css("border", "");
	if($("#dicomDiv>div").hasClass("pitch")){
		$("#dicomDiv>div").removeClass('pitch')
	}
	$(that).addClass('pitch');
}
//电脑操作相关事件
var clickTimeout = null;
function computerClickAction(e) {
	console.log("computerClickAction");
	checkIfNeedLoadInstance(this);
	let that = this;
	//当前容器标号
	let elementOrder = parseInt($(this).attr("data-order"));
	//电脑选中div相关的共用部分
	computerPitchPublic(this);
	db++;
	//向选中了的图像容器中添加选中的序列
	let dicomImagetemp;
	if(elementShowObj[elementOrder - 1]["element"] == "") {
		db = 0;
		elementShowObj[elementOrder - 1]["element"] = activeElement = this;
		// 如果容器内是空的就向里面添加选中的序列
		elementShowObj[elementOrder - 1]["dicomImage"] = new DicomImage(activeElement);
		elementShowObj[elementOrder - 1]["dicomImage"].referenceCallback = referenceCallback;
		elementShowObj[elementOrder - 1]["dicomImage"].dynamicCallback = dynamicCallback
		dicomImagetemp = activeElementImage = elementShowObj[elementOrder - 1]["dicomImage"];
		dicomImagetemp.initImage();
		dicomImagetemp.setSeriesAndStack(seriesObj, imageIDArr, globalInstanceNumObj, appState,magicState);
	} else {
		// 如果容器中已经存在图像，就用新选中的序列代替已存在的
		if(activeElement == this){
			clearTimeout(clickTimeout);
			clickTimeout = setTimeout(function(){
				//console.log("单击吗",db,activeElementImage.magicStart);
				if( db <= 1){
					//绘制/计算勾画点
					if(activeElementImage.magicStart){
						activeElementImage.magicPoint(e.offsetX, e.offsetY);
					}
				}else if(db > 1) {
					if(changeTag == 'freehand') {
						return;
					}
					console.log('computer双击',db);
					if(domGenArg == 'r1_c2' || domGenArg == 'r2_c1' || domGenArg == 'r2_c2') {
						$(that).css({
							width: '100%',
							height: '100%'
						});
						$(that).siblings().css({
							width: '0',
							height: '0'
						});
						indexResize();
						$('#resetViewBtn').css('display', 'block');
					}
					// 恢复放大的窗口
					$('#resetViewBtn').off();
					$('#resetViewBtn').on('click', function() {
						if(domGenArg == 'r1_c2') {
							$('#dicomDiv>div').css({
								width: '50%',
								height: '100%'
							});
							indexResize();
							$('#resetViewBtn').css('display', 'none');
						} else if(domGenArg == 'r2_c1') {
							$('#dicomDiv>div').css({
								width: '100%',
								height: '50%'
							});
							indexResize();
							$('#resetViewBtn').css('display', 'none');
						} else if(domGenArg == 'r2_c2') {
							$('#dicomDiv>div').css({
								width: '50%',
								height: '50%'
							});
							indexResize();
							$('#resetViewBtn').css('display', 'none');
						}
					})
				}
				db = 0;
			},200);
			if(activeElementImage.numframes < 1){
				return;
			}
		}else{
			db = 0;
		}
		activeElement = this;
		dicomImagetemp = activeElementImage = elementShowObj[elementOrder - 1]["dicomImage"];
	}
	//动态拼接魔术棒状态
	magicStatus();
	//患者信息展示
	nodeInfoOperation(dicomImagetemp);
	//参考线
	lineRenderFn();
	// 翻页
	let domLength = $("#dicomDiv>div").length;
	for(let i = 0; i < domLength; i++) {
		let loaded = elementShowObj[i]["dicomImage"].loaded;
		if(loaded) {
			elementShowObj[i]["dicomImage"].unbindAction();
			if(changeTag == "flipOver" && activeElementImage == elementShowObj[i]["dicomImage"]) {
				$(elementShowObj[i]["dicomImage"].element).on("mousedown", elementShowObj[i]["dicomImage"].downFn.bind(elementShowObj[i]["dicomImage"]));
			}
		}
	}

	// 多帧播放与暂停
	let playFramesbtn = document.getElementById('playFrames');
//	console.log(playFramesbtn,"12091209",activeElementImage.isPlayingFrames);
	if(activeElementImage.isPlayingFrames) {
		$('#playFrames').empty().append($('<img src="' + domNodeEdit.stopImgBase64 + '">')).append($('<span>多帧演示</span>'));
	} else {
		$('#playFrames').empty().append($('<img src="' + domNodeEdit.playImgBase64 + '">')).append($('<span>多帧演示</span>'));
	}
	playFramesbtn.onclick = function() {
		console.log('sdsdsdsdlokm')
		if(activeElementImage.isPlayingFrames) {
			activeElementImage.stopFramesFn();
		} else {
			activeElementImage.playFramesFn();
		}
	}
}

//手机端相关事件
function phoneTouchStartAction(e) {
	checkIfNeedLoadInstance(this);
	let that = this;
	//当前容器标号
	let elementOrder = parseInt($(this).attr("data-order"));
	//手机端选中div相关的共用部分
	phonePitchPublic(this);
	db++;
	//向选中了的图像容器中添加选中的序列
	let dicomImagetemp;
	if(elementShowObj[elementOrder - 1]["element"] == "") {
		// 如果容器内是空的就向里面添加选中的序列
		elementShowObj[elementOrder - 1]["element"] = activeElement = this;
		elementShowObj[elementOrder - 1]["dicomImage"] = new DicomImage(activeElement);
		elementShowObj[elementOrder - 1]["dicomImage"].referenceCallback = referenceCallback;
		elementShowObj[elementOrder - 1]["dicomImage"].dynamicCallback = dynamicCallback
		dicomImagetemp = activeElementImage = elementShowObj[elementOrder - 1]["dicomImage"];
		dicomImagetemp.initImage();
		dicomImagetemp.setSeriesAndStack(seriesObj, imageIDArr, globalInstanceNumObj, appState,magicState);
	}else {
		// 如果容器中已经存在图像，就用新选中的序列代替已存在的
		if(activeElement == this){
			clearTimeout(clickTimeout);
			clickTimeout = setTimeout(function(){
				if( db <= 1){
//					console.log("phone单击");
					//绘制/计算勾画点
					if(activeElementImage.magicStart){
						let offsetX = e.targetTouches[0].pageX - $(that).offset().left;
						let offsetY = e.targetTouches[0].pageY - $(that).offset().top;
						activeElementImage.magicPoint(offsetX, offsetY);
					}
				}else if(db > 1) {
					if(changeTag == 'freehand') {
						return;
					}
//					console.log('phone双击');
					if(domGenArg == 'r1_c2' || domGenArg == 'r2_c1' || domGenArg == 'r2_c2') {
						$(that).css({
							width: '100%',
							height: '100%'
						});
						$(that).siblings().css({
							width: '0',
							height: '0'
						});
						indexResize();
						$('#resetViewBtn').css('display', 'block');
					}
					// 恢复放大的窗口
					$('#resetViewBtn')[0].ontouchstart = function() {
//						console.log(123123123);
						if(domGenArg == 'r1_c2') {
							$('#dicomDiv>div').css({
								width: '50%',
								height: '100%'
							});
							indexResize();
							$('#resetViewBtn').css('display', 'none');
						} else if(domGenArg == 'r2_c1') {
							$('#dicomDiv>div').css({
								width: '100%',
								height: '50%'
							});
							indexResize();
							$('#resetViewBtn').css('display', 'none');
						} else if(domGenArg == 'r2_c2') {
							$('#dicomDiv>div').css({
								width: '50%',
								height: '50%'
							});
							indexResize();
							$('#resetViewBtn').css('display', 'none');
						}
					}
				}
				db = 0;
			},200);
//			return;
		}
		activeElement = this;
		dicomImagetemp = activeElementImage = elementShowObj[elementOrder - 1]["dicomImage"];
		db = 0;
	}
	//动态拼接魔术棒状态
	magicStatus();
	//患者信息展示
	nodeInfoOperation(dicomImagetemp);
	lineRenderFn();
	// 多帧播放与暂停
	let playFramesbtn = document.getElementById('playFrames');
	// console.log(activeElementImage.isPlayingFrames);
	if(activeElementImage.isPlayingFrames) {
		$('#playFrames').empty().append($($('<img src="' + domNodeEdit.stopImgBase64 + '">'))).append($('<span>多帧演示</span>'));
	} else {
		$('#playFrames').empty().append($($('<img src="' + domNodeEdit.playImgBase64 + '">'))).append($('<span>多帧演示</span>'));
	}
	playFramesbtn.ontouchstart = function() {
		if(activeElementImage.isPlayingFrames) {
			activeElementImage.stopFramesFn();
		} else {
			activeElementImage.playFramesFn();
		}
	}
}

// 更新容器，刷新显示的区域对象
function elementShowObjFn() {
	$(".dynamicWLdiv").remove();
	$("#violutSum").empty();
	let currentImageDoms = $("#dicomDiv>div");
	let seriesKeys = [];
	for(let key in seriesObj) {
		seriesKeys.push(key);
	}
	// 处理之前已经存在的图像
	for(var i = 0; i < currentImageDoms.length; i++) {
		let loaded = elementShowObj[i]["dicomImage"].loaded;
		let currentDisplaySeriesTemp;
		let currentDisplaySeriesPicNumTemp;
//		console.log("是否已经加载图像", loaded, currentDisplaySeriesPicNum);
		if(loaded) {
			elementShowObj[i]["element"] = currentImageDoms[i];
			currentDisplaySeriesTemp = elementShowObj[i]["dicomImage"].currentDisplaySeries;
			currentDisplaySeriesPicNumTemp = elementShowObj[i]["dicomImage"].currentDisplaySeriesPicNum;
			elementShowObj[i]["dicomImage"].destoryImage();
		} else {
			//没有图像
			if(i < seriesKeys.length) {
				elementShowObj[i]["element"] = currentImageDoms[i];
				//console.log(seriesObj,seriesKeys,i);
				currentDisplaySeriesTemp = seriesKeys[i];
				currentDisplaySeriesPicNumTemp = seriesObj[seriesKeys[i]]["picOrderNum"][0];
			} else {
				continue;
			}
		}
		elementShowObj[i]["dicomImage"] = new DicomImage(elementShowObj[i]["element"]);
		elementShowObj[i]["dicomImage"].referenceCallback = referenceCallback;
		elementShowObj[i]["dicomImage"].dynamicCallback = dynamicCallback;
		let dicomImagetemp = elementShowObj[i]["dicomImage"];
		dicomImagetemp.initImage();
		activeElementImage.needUpdateAppState = true;
		//console.log(appState,"elementShowObjFn");
		dicomImagetemp.setSeriesAndStack(seriesObj, imageIDArr, globalInstanceNumObj, appState,magicState);
		//	dicomImagetemp.setCurrentDisplaySeries(currentDisplaySeriesTemp);
		//	if(fileSource == "internet"){
		//		activeElementImage.setCurrentDisplaySeries(currentDisplaySeries,netSeriesInfo[currentDisplaySeriesTemp].imageCount);
		//	}else{
		//		activeElementImage.setCurrentDisplaySeries(currentDisplaySeries,seriesObj[currentDisplaySeriesTemp]["picOrderNum"].length);
		//	}
		if(fileSource == "internet") {
			dicomImagetemp.setCurrentDisplaySeries(currentDisplaySeriesTemp, netSeriesInfo[currentDisplaySeriesTemp].imageCount, currentDisplaySeriesPicNumTemp);
		} else {
			//console.log('dsdsdsdsdsd');
			dicomImagetemp.setCurrentDisplaySeries(currentDisplaySeriesTemp, seriesObj[currentDisplaySeriesTemp]["picOrderNum"].length, currentDisplaySeriesPicNumTemp);
		}
		dicomImagetemp.imageView(seriesObj[currentDisplaySeriesTemp][currentDisplaySeriesPicNumTemp]);
//		console.log(activeTool,"activeTool");
		if(activeTool) {
			//不是默认值的时候,进行改变工具
			dicomImagetemp.toolsChange(activeTool);
		}
		if(haveLine) {
			elementShowObj[i]['dicomImage'].enableLine();
		} else {
			elementShowObj[i]['dicomImage'].disableLine();
		}
		// 判断病人信息是否显示
		if(showInfo) {
			elementShowObj[i].dicomImage.patientInfo(true);
		} else {
			elementShowObj[i].dicomImage.patientInfo(false);
		}

		// 使用其他工具时，画笔工具消除
		//	$('#left>li').click(function() {
		//		if(!($('.tools>div').hasClass('bcSmall'))) {
		//			if(dicomImagetemp.loaded) {
		//				dicomImagetemp.disableAllTools();
		//			}
		//		}
		//	})
	}
	//	console.log(seriesObj);
	//设置第一个为激活的选项
	activeElement = elementShowObj[0]["element"];
	activeElementImage = elementShowObj[0]["dicomImage"];

	// 给每个图像容器添加点击事件的监听
	if(user_equipment == 'phone') {
		$("#dicomDiv>div").each(function(index, element) {
			element.ontouchstart = phoneTouchStartAction;
		})
	} else if(user_equipment == 'computer') {
		$("#dicomDiv>div").off();
		for(let i = 0; i < $("#dicomDiv>div").length; i++){
			$("#dicomDiv>div")[i].onclick = computerClickAction;
		}
//		$("#dicomDiv>div").on("click", computerClickAction);
	}
	lineRenderFn();
}

// 窗口尺寸大小变化时的情况
function rightnavScroll() {
	$('#rightNav')[0].scrollTop = 0;
	$('#rightNav')[0].scrollLeft = 0;
	let sPIC_length;
	let rightScroll = document.getElementById('rightScroll');
	if(document.body.offsetWidth <= 1000) {
		if($('.sPIC').length) {
			sPIC_length = $('.sPIC').length * $('.sPIC')[0].offsetWidth + 13;
			$('#rightScroll').css('width', sPIC_length + 'px');
			$('#backBtn').on('click', function() {
				$('#rightNav')[0].scrollLeft -= 50;
			})
			$('#goBtn').on('click', function() {
				$('#rightNav')[0].scrollLeft += 50;
			})
		}
	} else {
		$('#rightScroll').css('width', '100%');
		$('#backBtn').on('click', function() {
			$('#rightNav')[0].scrollTop -= 50;
		})
		$('#goBtn').on('click', function() {
			$('#rightNav')[0].scrollTop += 50;
		})
	}
}

// 图像尺寸自适应窗口变化
function indexResize() {
	let domLength = $("#dicomDiv>div").length;
	for(let i = 0; i < domLength; i++) {
		let loaded = elementShowObj[i]["dicomImage"].loaded;
		if(loaded) {
			elementShowObj[i]["dicomImage"].resize()
		}
	}
}
// 图像尺寸自适应窗口变化
window.addEventListener('resize',function(){
	indexResize();
	// 滚动缩略图
	rightnavScroll();
})

// 过长的工具栏移动端长度调整
if(user_equipment == 'phone') {
	$('#wlDiv').css({
		"height": "2.5rem",
		"overflow-y": "scroll",
		"border-bottom": "0.01rem solid gray"
	});
	$('#gaotools').css({
		"height": "2.5rem",
		"overflow-y": "scroll",
		"border-bottom": "0.01rem solid gray"
	})
}
// 工具栏显示隐藏下拉框
$("#layout").click(function() {
	if(!loaded) {
		return;
	}
	let brotherDiv = $(this).siblings().find('.broChlidren');
	brotherDiv.css('display', 'none');
	$("#layoutDiv").css("display") == "none" ? $("#layoutDiv").css("display", "block") : $("#layoutDiv").css("display", "none");
});
$("#wlLi").click(function() {
	if(!loaded) {
		return;
	}
	let brotherDiv = $(this).siblings().find('.broChlidren');
	brotherDiv.css('display', 'none');
	$("#wlDiv").css("display") == "none" ? $("#wlDiv").css("display", "block") : $("#wlDiv").css("display", "none");
});
$("#chu").click(function() {
	if(!loaded) {
		return;
	}
	let brotherDiv = $(this).siblings().find('.broChlidren');
	brotherDiv.css('display', 'none');
	$("#chutools").css("display") == "none" ? $("#chutools").css("display", "block") : $("#chutools").css("display", "none");
});
$("#gao").click(function() {
	if(!loaded) {
		return;
	}
	let brotherDiv = $(this).siblings().find('.broChlidren');
	brotherDiv.css('display', 'none');
	$("#gaotools").css("display") == "none" ? $("#gaotools").css("display", "block") : $("#gaotools").css("display", "none");
});
$("#triangleLi").click(function() {
	if(!loaded) {
		return;
	}
	let brotherDiv = $(this).siblings().find('.broChlidren');
	brotherDiv.css('display', 'none');
	$("#testtriangleLi").css("display") == "none" ? $("#testtriangleLi").css("display", "block") : $("#testtriangleLi").css("display", "none");
});
$("#lutList").click(function() {
	if(!loaded) {
		return;
	}
	let brotherDiv = $(this).siblings().find('.broChlidren');
	brotherDiv.css('display', 'none');
	$("#violutSum").css("display") == "none" ? $("#violutSum").css("display", "block") : $("#violutSum").css("display", "none");
});
$('#dicomDiv').click(function() {
	$('#left>li>div').css('display', 'none');
})
$('#dicomDiv').on('touchstart', function() {
	$('#left>li>div').css('display', 'none');
})
$('#rightNav').click(function() {
	$('#left>li>div').css('display', 'none');
})
$('#wlInput').click(function() {
	$('#left>li>div').css('display', 'none');
})
$('.annotationDialog').click(function() {
	$('#left>li>div').css('display', 'none');
})

// 右上角版权
$('#icon').on('click', function() {
	$('#copyRightWrap').css('display', 'block');
	//测试数据
	//	console.log(activeElementImage.currentImage.getPixelData());
})
$('#copyRightDivClose').on('click', function() {
	$('#copyRightWrap').css('display', 'none');
});

// 方向和镜像改变
$(".viewportChange").on("click", function() {
	if(activeElementImage.loaded) {
		//取得元素ID值
		changeTag = $(this).prop("id");
//		console.log(changeTag, "viewportChange");
		activeElementImage.viewportChange(changeTag);
	} else {
		return;
	}
})

// 工具变动
$(".signAdjust").on("click", function() {
	//取得元素ID值
	changeTag = $(this).prop("id");
//	console.log(changeTag, "toolChange");
	activeTool = changeTag;
	//需要处理(暂时没有处理变为多个的时候,激活的工具)
	//“清除所有”单个使用
	if(activeElementImage.loaded) {
		//console.log(11)
		if(changeTag == 'clearToolState') {
			//console.log(22)
			activeElementImage.toolsChange(changeTag);
		}
	}
	//除“清除所有”之外，其他工具在多宫格布局时一同开启
	let domLength = $("#dicomDiv>div").length;
	for(var i = 0; i < domLength; i++) {
		let loaded = elementShowObj[i]["dicomImage"].loaded;
		if(loaded) {
			if(changeTag == 'clearToolState') {
				return;
			}
			elementShowObj[i]["dicomImage"].toolsChange(changeTag);
		}
	}
})

//预设的窗宽窗位
$("#wlDiv>div").on("click", function() {
	if(activeElementImage.loaded) {
		//关闭魔术棒阈值窗口
		activeElementImage.magicStart = false;
		$('#magicLiSum').css('display','none');

		let ww = $(this).attr("data-ww");
		let wl = $(this).attr("data-wl");
		if(ww == 'default' && wl == "default") {
			activeElementImage.wwwlAdjust(ww, wl);
		} else {
			activeElementImage.wwwlAdjust(Number(ww), Number(wl));
		}
	} else {
		return;
	}
});

//自定义WW/WL弹窗,盛放上次输入的value值
let wwVal = "";
let wlVal = "";
$('#wlDiv>#wlCustom').on('click', function() {
	if(activeElementImage.loaded) {
		//隐藏文字标注弹出框
		if($(".annotationDialog").css("display") == "block") {
			alert("请先完成信息标注!");
			return;
		}
		$('#magicLiSum').css('display','none');
		wwVal = $('#ww').val();
		wlVal = $('#wl').val();
		$('#wlInput div').removeClass('bc');
		$('#wlInput').css('display', 'block');
		let info = activeElementImage.getDefaultwwwl();
		if(info) {
//			console.log('info' + info);
			if(wwVal == "" && wlVal == "") {
				$('#ww').val(info.ww);
				$('#wl').val(info.wl);
			} else {
				$('#ww').val(wwVal);
				$('#wl').val(wlVal);
			}
		}
	} else {
		return;
	}
})

//点击确定向下一次传递默认value值，并将自定义的ww/wl赋给图像
$('#wlYes').on('click', function() {
	if(activeElementImage.loaded) {
		wwVal = Number($('#ww').val());
		wlVal = Number($('#wl').val());
		activeElementImage.wwwlAdjust(wwVal, wlVal);
		$('#wlInput').css('display', 'none');
	}
})
//关闭自定义窗宽窗位弹窗
$('#wlNo').on('click', function() {
	$('#wlInput').css('display', 'none');
})

// 图像保存
$('#save').on("click", function() {
	if(activeElementImage.loaded) {
		activeElementImage.saveImage();
	} else {
		return;
	}
})

// click边框样式
function clickColorSmall(ele) {
	for(var i = 0; i < ele.length; i++) {
		(function() {
			if(user_equipment == 'phone') {
				$(ele[i]).on('touchstart', function(e) {
					$('#left>li>div *').removeClass('bcSmall');
					$('#left>li').removeClass('bc');
					ele.removeClass('bc');
					ele.removeClass('bcSmall');
					$(this).addClass('bcSmall');
				})
			} else if(user_equipment == 'computer') {
				ele[i].addEventListener('mousedown', function(e) {
					$('#left>li>div *').removeClass('bcSmall');
					$('#left>li').removeClass('bc');
					ele.removeClass('bc');
					ele.removeClass('bcSmall');
					$(this).addClass('bcSmall');
				})
			}
		})(i)
	}
}

function clickColorBig(ele) {
	for(var i = 0; i < ele.length; i++) {
		(function() {
			if(user_equipment == 'phone') {
				$(ele[i]).on('touchstart', function(e) {
					$('#left>li').removeClass('bc');
					ele.removeClass('bcSmall');
					ele.removeClass('bc');
					$(this).addClass('bc');
				})
			} else if(user_equipment == 'computer') {
				ele[i].addEventListener('mousedown', function(e) {
					$('#left>li').removeClass('bc');
					ele.removeClass('bcSmall');
					ele.removeClass('bc');
					$(this).addClass('bc');
				})
			}
		})(i)
	}
}
clickColorBig($('#left>li'));
clickColorSmall($('#left>li>div *'));

// 病人信息的显示与隐藏
$('#infoLi').on("click", function() {
//	console.log(elementShowObj);
	for(let i = 0; i < elementShowObj.length; i++) {
		if(elementShowObj[i].dicomImage.loaded) {
			if(showInfo) {
				elementShowObj[i].dicomImage.patientInfo(false);
			} else {
				elementShowObj[i].dicomImage.patientInfo(true);

			}
		}
	}
	showInfo = !showInfo;
});

// DCM信息弹框的显示与隐藏
$('#dcmList').on('click', function() {
	$('#dcmInfoWrap').css('display', 'block');
	$('#info_name')[0].innerHTML = (activeElementImage.patientName || '未知') + '/' + (activeElementImage.sID || '未知');
	if(activeElementImage.loaded) {
		nodeInfoOperation(activeElementImage);
	}
})
$('#dcmInfoDivClose').on('click', function() {
	$('#dcmInfoWrap').css('display', 'none');
})

// DCM信息展示
function nodeInfoOperation(newObj) {
	if(!newObj) {
		return;
	}
	// 将内容添加到DOM中
	//	console.log(cornerstone.getDefaultViewportForImage(newObj.element, newObj.currentImage))
	$('#transferSyntax').html(newObj.transferSyntax);
	$('#sopClass').html(newObj.sopClass);
	$('#samplesPerPixel').html(newObj.samplesPerPixel);
	$('#photometricInterpretation').html(newObj.photometricInterpretation);
	$('#numberOfFrames').html(newObj.numberOfFrames);
	$('#planarConfiguration').html(newObj.planarConfiguration + (newObj.planarConfiguration === 0 ? ' (unsigned)' : ' (signed)'));
	$('#rows').html(newObj.rows);
	$('#columns').html(newObj.columns);
	$('#pixelSpacing').html(newObj.pixelSpacing);
	$('#imagePixelSpacing').html(newObj.imagePixelSpacing);
	$('#highBit').html(newObj.heightBit);
	$('#bitsAllocated').html(newObj.bitsAllocated);
	$('#bitsStored').html(newObj.bitsStored);
	$('#pixelRepresentation').html(newObj.pixelR);
	$('#rescaleIntercept').html(newObj.rescaleIntercept)
	$('#rescaleSlope').html(newObj.rescaleSlope);
	$('#basicOffsetTable').html(newObj.basicOffsetTable);
	$('#fragments').html(newObj.fragments);
	$('#minStoredPixelValue').html(newObj.minStoredPixelValue);
	$('#maxStoredPixelValue').html(newObj.maxStoredPixelValue);
	$('#loadTime').html(newObj.loadTime + "ms");
	$('#decodeTime').html(newObj.decodeTime + "ms");
	newObj.vLutFn();
	clickColorSmall($('#left>li>div *'));
	clickColorSmall($('#leftNav>div>div>div'));
}

// 定位线功能的禁用与启用
$('#referenceLine').on('click', function() {
	if(activeElementImage.loaded) {
		let index = [];
		for(let i = 0; i < elementShowObj.length; i++) {
			let loaded = elementShowObj[i]["dicomImage"].loaded;
			if(loaded) {
				index.push(Number(i));
				elementShowObj[i]["dicomImage"].updateImage();
			}
		}
		if(index) {
			if(haveLine) {
				for(let i = 0; i < index.length; i++) {
					haveLine = false;
					elementShowObj[index[i]]['dicomImage'].disableLine();
					$('#referenceLine>span')[0].innerHTML = '定位线显示';
				}
			} else {
				for(let i = 0; i < index.length; i++) {
					haveLine = true;
					elementShowObj[index[i]]['dicomImage'].enableLine();
					$('#referenceLine>span')[0].innerHTML = '定位线隐藏';
				}
			}
		}
	}
})

function lineRenderFn() {
	let imageWrapNum = $("#dicomDiv>div").length;
	//	console.log(imageWrapNum);
	if(imageWrapNum < 2 || !haveLine || !activeElementImage) {
		return;
	}
	//	activeReferenceLine("targetElement", "referenceElement");
	// targetElement是需要绘制的位置
	for(let i = 0; i < imageWrapNum; i++) {
		if(elementShowObj[i]["dicomImage"] == activeElementImage || !elementShowObj[i]["dicomImage"].loaded) {
			continue;
		} else {
			// console.log("计算线了",activeElement.style.border);
			elementShowObj[i]["dicomImage"].drawLine = false;
			activeElementImage.drawLine = false;
			let targetLine = activeReferenceLine(elementShowObj[i]["dicomImage"], activeElementImage);
			let refLine = activeReferenceLine(activeElementImage, elementShowObj[i]["dicomImage"]);
			if(!targetLine || !refLine) {
				//没有参考线
				if(imageWrapNum > 2) {
					elementShowObj[i]["dicomImage"].drawLine = false;
					activeElementImage.drawLine = false;
					elementShowObj[i]["dicomImage"].updateImage();
					activeElementImage.drawReferenceLine(refLine);
				} else {
					elementShowObj[i]["dicomImage"].updateImage();
				}
			} else {
				elementShowObj[i]["dicomImage"].drawLine = true;
				activeElementImage.drawLine = false;
				elementShowObj[i]["dicomImage"].drawReferenceLine(targetLine);
				activeElementImage.drawReferenceLine(refLine);
			}
		}
	}
}
// 参考线回调方法
function referenceCallback() {
	lineRenderFn();
}

//滑动请求锁
var dynamicCallbackLock = false;
//滚动事件触发回调方法（DicomImage.js）
function dynamicCallback(picOrderNum, currentDisplaySeries, forceUpdate) {
	if(fileSource == "local") {
		return;
	}
	// TODO  调整 questCurPage
//	console.log("图像切换", picOrderNum, currentDisplaySeries);
//	console.log("图像切换",seriesObj[currentDisplaySeries]);
	let currentpicOrderNum = picOrderNum;
	let seriesObjPicNumLength = seriesObj[currentDisplaySeries]["picOrderNum"].length;
	let seriesObjPicNumMin = Number(seriesObj[currentDisplaySeries]["picOrderNum"][0]);
	let seriesObjPicNumMax = Number(seriesObj[currentDisplaySeries]["picOrderNum"][seriesObjPicNumLength - 1]);
	console.log(seriesObjPicNumLength,"长度",seriesObjPicNumMin,"最小值",seriesObjPicNumMax,"最大值")
//	console.log(currentDisplaySeries,"currentDisplaySeries",Math.ceil(seriesObjPicNumMin / 5),"questCurPage");
	setTimeout(function() {
		dynamicCallbackLock = false;
	}, 200);
	// 判断到边界的距离,决定是否进行文件的加载
	/*
	 1.距离边界小于10
	 2.当前序列请求闲置
	 3.没有文件处于解析状态
	 4.没有数据处于组装过程
	 * */

	//强制刷新数据
	if(forceUpdate) {
//		console.log("数据可能出错/数据需要加载(强制进行)");
		let shallowMemorySize = (cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.getInfo()).cacheSizeInBytes * 5 / 1024 / 1024;
		//		console.log(shallowMemorySize,"估算占用的内存值");
		if(shallowMemorySize > 500) {
			memoryWarning = true;
		}
		netDirUp = true;
		dynamicCallbackLock = true;
		//计算请求的curPage
		let questCurPage = Math.ceil(Number(picOrderNum) / 5) - 2;
		if(questCurPage <= 0) {
			questCurPage = 1;
		}
		if(questCurPage > netSeriesInfo[currentDisplaySeries].maxquestNum) {
			return;
		}
		dynamicNetGetInstance(currentDisplaySeries, 6, questCurPage, netDirUp);
	}

	if(seriesObjPicNumMax - picOrderNum < 10 && !netSeriesInfo[currentDisplaySeries].dynamicLoading && fileLen == 0 && !dynamicCallbackLock && dynamicSeriesObjComplete) {
		console.log("需要加载新的文件...请求?", 19131913);
		$(activeElement).find(".loadingTip").css("display", "block");
		netDirUp = true;
		let shallowMemorySize = (cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.getInfo()).cacheSizeInBytes * 5 / 1024 / 1024;
		//console.log(shallowMemorySize,"估算占用的内存值");
		if(shallowMemorySize > 500) {
			memoryWarning = true;
		}
		dynamicCallbackLock = true;
		//计算请求的curPage
//		let questCurPage = Math.ceil(seriesObjPicNumMax / 5);
		let questCurPage = netSeriesInfo[currentDisplaySeries].dynamicCurpage;
		if(questCurPage > netSeriesInfo[currentDisplaySeries].maxquestNum) {
//			console.log(questCurPage, netSeriesInfo[currentDisplaySeries].maxquestNum);
			$(activeElement).find(".loadingTip").css("display", "none");
			netSeriesInfo[currentDisplaySeries].dynamicCurpage--;
			return;
		}
//		console.log("dynamicNetGetInstance");
		dynamicNetGetInstance(currentDisplaySeries, 5, questCurPage, netDirUp);
	} else if(seriesObjPicNumMin > 10 && picOrderNum - seriesObjPicNumMin < 10 && !netSeriesInfo[currentDisplaySeries].dynamicLoading && fileLen == 0 && !dynamicCallbackLock && dynamicSeriesObjComplete) {
		console.log("需要加载新的文件...请求?",19321932);
		netDirUp = false;
		let shallowMemorySize = (cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.getInfo()).cacheSizeInBytes * 5 / 1024 / 1024;
//		console.log(shallowMemorySize, "估算占用的内存值");
		if(shallowMemorySize > 500) {
			memoryWarning = true;
		}
		dynamicCallbackLock = true;
		//计算请求的curPage
//		let questCurPage = Math.ceil(seriesObjPicNumMin / 5);
		let questCurPage = netSeriesInfo[currentDisplaySeries].dynamicCurpage;
		if(questCurPage <= 0) {
			$(activeElement).find(".loadingTip").css("display", "none");
			netSeriesInfo[currentDisplaySeries].dynamicCurpage = 0;
			return;
		}
		dynamicNetGetInstance(currentDisplaySeries, 4, questCurPage, netDirUp);
	}
}

// 保存坐标
$('#coordSave').click(function() {
	if(activeElementImage.loaded) {
		activeElementImage.saveCoordinate(studyUID);
		//console.log(99999, activeElementImage.c_markArr);
		let jsonStr = JSON.stringify({
			"uid": studyUID,
			"appState": JSON.stringify(activeElementImage.appState),
			"cMarkInfo": activeElementImage.c_markArr,
			"magicInfo": JSON.stringify(activeElementImage.magicInfo)
		});
		//console.log('jsonStr', jsonStr)
		$.ajax({
			type: "post",
			url: netUrl + "api/dcmj/coordinate",
			data: jsonStr,
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			complete: function(XHR, TS) {
				XHR = null
			},
			success: function(obj) {
				console.log('成功保存');
				alert('保存成功');
//				activeElementImage.restoreSeriesObj();
//				activeElementImage.restoreMagicSeriesObj();
			},
			error: function(err) {
				console.log("保存失败");
			}
		})
	}
})
// 恢复绘制
$('#restoreDraw').click(function(e) {
	if(activeElementImage.loaded) {
		//console.log('elementShowObj', elementShowObj);
		let eleArr = [];
		for(let i = 0; i < elementShowObj.length; i++) {
			if(elementShowObj[i].element != '') {
				eleArr.push(elementShowObj[i].element);
			}
		}
		activeElementImage.restoreNetAppstateDraw(eleArr, netAppstate);
	}
})

// ajax请求函数
function ajax(obj) {
	let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	let method = obj.type.toUpperCase();
	if(method == 'GET') {
		xhr.open('GET', obj.url + '?' + obj.data.uid.param + "=" + obj.data.uid.seriesUID + "&" + obj.data.pageSize.param + "=" + obj.data.pageSize.pageSize + "&" + obj.data.curPage.param + "=" + obj.data.curPage.curPage, true);
		xhr.setRequestHeader("Cache-Control", "Private");
		xhr.send(null);
	} else if(method == 'POST') {
		xhr.open('POST', obj.url, true);
		xhr.send(obj.data);
	}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseXML ? xhr.responseXML : xhr.responseText;
			obj.success(JSON.parse(result));
			xhr = null;
		} else if(xhr.status == 404) {
			obj.error('页面找不到');
		} else if(xhr.status == 500) {
			obj.error('服务器内部错误');
		}
	}
}

//blob转换函数
function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for(var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for(var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {
		type: contentType
	});
	byteArrays = null;
	byteCharacters = null;
	return blob;
}

// 进行ajax请求
/*
返回的数据为数组[series:{}] ==>
{
	firstContent: base64数据,
	imageCount: 此序列图像的数量,
	seriesSn: 序列号,
	seriesUid: 序列唯一标识
}
*/
if(studyUID) {
	$("#dicomImage .netLoading").css("display", "block");
	pageEnterNetQuest(studyUID);
}

function pageEnterNetQuest(studyUID) {
	$.ajax({
		type: "get",
		url: netUrl + "api/dcm/list",
		data: {
			uid: studyUID
		},
		cache: false,
		async: true,
		dataType: "json",
		complete: function(XHR, TS) {
			XHR = null
		},
		success: function(obj) {
			if(obj.appState && obj.appState != '') {
				appState = JSON.parse(obj.appState);
				netAppstate = JSON.parse(obj.appState);
//				console.log(2044, appState);
			}
			if(obj.magicInfo && obj.magicInfo != '') {
				magicState = JSON.parse(obj.magicInfo);
//				console.log(2049,'CHU', magicState);
			}
			//初始化页面
			initParams();
			//console.log(obj);
			let series = obj.series;
			if(series.length > 0) {
				fileLen = series.length;
				//console.log('series',series);
				for(let i = 0; i < series.length; i++) {
					netSeriesInfo[series[i].seriesNo] = {
						loading: false,
						dynamicLoading: false,
						loadComplete: false,
						seriesId: series[i].seriesNo,
						seriesUid: series[i].seriesUid,
						imageCount: series[i].imageCount,
						loadedNum: 0,
						netQuestInterval: null,
						netLoadCount: 0,
						maxquestNum: Math.ceil(series[i].imageCount / 5),
						netQuestPause: false,
						dynamicCurpage: 1
					};
					if(series[i]["firstContent"].content){
						var imageid = cornerstoneWADOImageLoader.wadouri.fileManager.add(b64toBlob(series[i]["firstContent"].content), series[i]["firstContent"].instanceuid);
						loadImage(imageid);
						//console.log(imageid)
					}else{
						continue;
					}
				}
				//console.log(netSeriesInfo,"初始数据");
			} else {
				alert("当前studyUID无对应序列数据");
			}
		},
		error: function(err) {
			console.log("网络请求出错");
			$(".netLoading>img").css("display", "none");
			$(".netLoading>p").css("display", "block")
		}
	})
}

//电脑端请求序列
function pcNetQuestSeries() {
//	console.log("global", "123123123333", seriesObj);
	//http://127.0.0.1:7777/?studyUID=1.2.840.113619.2.55.3.12624128.2910.1151313604.887
	var seriesElementArrTemp = $(".sPIC");
	for(var i = 0; i < seriesIDArr.length; i++) {
		let seriesElement = $("#smallPic" + seriesIDArr[i]).get(0);
		netSeriesInfo[seriesIDArr[i]].netQuestPause = false;
//		netGetseriesInstance(seriesIDArr[i], seriesElementArrTemp.get(i));
	}
}


//##############################  MPR  ##############################
$("#mpr").on("click",function(){
	let selectSeries = activeElementImage.currentDisplaySeries;
	let selectElement = activeElementImage.element;
// console.log(selectSeries,"selectSeries",seriesObj,"seriesObj");
// domNodeEdit.dicomMprWrap();
	if(selectSeries){
		if(selectSeries && seriesObj[selectSeries]["picOrderNum"].length >= 2){
			//开启MPR
			domNodeEdit.dicomMprWrap();
			//生成图像
			mprDemo.demoFn1(seriesObj[selectSeries],selectElement);
			//退出MPR
			$('#mprClose').click(function(){
				console.log('退出MPR');
				let mprWrap = document.getElementById('mprWrap');
				document.body.removeChild(mprWrap);
			})
		}else{
			alert('单张图像不支持MPR功能！');
		}
	}
})


//##############################  IE(ctrl+c复制当前选中图像到剪贴板)  ##############################
$(document).on("keydown",function(e){
	if (e.keyCode == 67 && e.ctrlKey && window.clipboardData) {
		if(activeElement && activeElementImage && activeElementImage.loaded){
			let value =  activeElementImage.ctrlCSaveImage();
			window.clipboardData.setData("text", value);
		}
	}
})
