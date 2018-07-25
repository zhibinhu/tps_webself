console.log('cornerstone', cornerstone, cornerstoneWADOImageLoader, "cornerstoneWADOImageLoader");
function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
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
//获取最大最小值
function getMinMax (storedPixelData) {
  // we always calculate the min max values since they are not always
  // present in DICOM and we don't want to trust them anyway as cornerstone
  // depends on us providing reliable values for these
  let min = storedPixelData[0];
  let max = storedPixelData[0];
  let storedPixel;
  const numPixels = storedPixelData.length;

  for (let index = 1; index < numPixels; index++) {
    storedPixel = storedPixelData[index];
    min = Math.min(min, storedPixel);
    max = Math.max(max, storedPixel);
  }

  return {
    min,
    max
  };
}
//返回image的pixeldata所使用
function convertToIntPixelData (floatPixelData) {
  const floatMinMax = getMinMax(floatPixelData);
  const floatRange = Math.abs(floatMinMax.max - floatMinMax.min);
  const intRange = 65535;
  const slope = floatRange / intRange;
  const intercept = floatMinMax.min;
  const numPixels = floatPixelData.length;
  const intPixelData = new Uint16Array(numPixels);
  let min = 65535;
  let max = 0;

  for (let i = 0; i < numPixels; i++) {
    const rescaledPixel = Math.floor((floatPixelData[i] - intercept) / slope);

    intPixelData[i] = rescaledPixel;
    min = Math.min(min, rescaledPixel);
    max = Math.max(max, rescaledPixel);
  }

  return {
    min,
    max,
    intPixelData,
    slope,
    intercept
  };
}

function createMprImage(sourceImage,width,height,sourceViewport){
	let imageId = sourceImage.width == width ? "mprW_" + sourceImage.imageId : "mprH_" + sourceImage.imageId
	const mprImage = {
    imageId,
    color: sourceImage.color,
    columnPixelSpacing: width == sourceImage.width ? sourceImage.columnPixelSpacing :"",
    rowPixelSpacing: height == sourceImage.height ? sourceImage.rowPixelSpacing :"",
    columns: width ? width : "",
    rows: height ? height : "",
    width: width ? width : "",
    height: height ? height :"",
    intercept: sourceImage.intercept,
    invert: sourceImage.invert,
    minPixelValue: sourceImage.minPixelValue,
    maxPixelValue: sourceImage.maxPixelValue,
    render: undefined, // set below
    sizeInBytes: undefined,
    slope: sourceImage.slope,
    windowCenter: sourceImage.windowCenter,
    windowWidth: sourceImage.windowWidth,
    floatPixelData: undefined,
    viewport:sourceViewport,
    pixelData: undefined,
    displayPixelData: undefined,
    stats: {}
  }
	mprImage.getPixelData = function(){
		return this.pixelData;
	}
	return mprImage;
}

function generateMprpixelData(mprImage,seriesObj,position,type){
	//position为当前type下的断面位置, type为哪个方向的断面(冠状位coro || sagi矢位 || axis轴位)
	let seriesDirection;
	//判断序列中instance的顺序
	let seriesLength = seriesObj["picOrderNum"].length;
	let firstImage = seriesObj[seriesObj["picOrderNum"][0]]
	let lastImage= seriesObj[seriesObj["picOrderNum"][seriesLength - 1]];
	let firstZPosition = Number(firstImage.data.string('x00200032').split("\\")[2]);
	let lastZPosition = Number(lastImage.data.string('x00200032').split("\\")[2]);
	if(firstZPosition > lastZPosition){
		seriesDirection = true;
	}else{
		seriesDirection = false;
	}
	
//获得截取的像素位置
	if(type == "coro"){
		//冠状位--X
		let pixelArea;
		pixelArea = {
			startIndex: (position - 1) * mprImage.width,
			endIndex: position * mprImage.width
		}
		let mprPixelData;
		for (let i = 0; i < seriesLength; i++) {
			let TempPixelData = seriesObj[seriesObj["picOrderNum"][i]].getPixelData();
			let areaPixelData = TempPixelData.slice(pixelArea.startIndex,pixelArea.endIndex);
			let resultConstructor = kindOf(TempPixelData);
			if(mprPixelData && mprPixelData.length){
				if(seriesDirection){
					mprPixelData = concatenate(resultConstructor, mprPixelData, areaPixelData);
				}else{
					mprPixelData = concatenate(resultConstructor, areaPixelData, mprPixelData);
				}
			}else{
				mprPixelData = areaPixelData;
			}
		}
		console.log(mprPixelData);
		mprImage.pixelData = mprPixelData;
		//生成初始的画板数据
		const mprRenderCanvas = document.createElement('canvas');
		mprRenderCanvas.width = mprImage.width;
		mprRenderCanvas.height = mprImage.height;
		const canvasContext = mprRenderCanvas.getContext('2d');
		canvasContext.fillStyle = 'white';
		canvasContext.fillRect(0, 0, mprRenderCanvas.width, mprRenderCanvas.height);
		const renderCanvasData = canvasContext.getImageData(0, 0, mprImage.width, mprImage.height);
		mprImage.renderCanvasData = renderCanvasData;
	}else if(type == "sagi"){
		//矢状位--Y
		let mprPixelData;
		for (let i = 0; i < seriesLength; i++) {
//			console.log(i,seriesObj[seriesObj["picOrderNum"][i]]);
			let TempPixelData = seriesObj[seriesObj["picOrderNum"][i]].getPixelData();
			let TempWidth = seriesObj[seriesObj["picOrderNum"][i]].width;
			let TempHeight = seriesObj[seriesObj["picOrderNum"][i]].height;
			//循环取得每一行中position位置的像素值
			let resultConstructor = kindOf(TempPixelData);
			let areaPixelData;
			//获取position位置的像素点
			for (var row = 0; row < TempHeight; row++) {
				if(areaPixelData){
					let rowPointPixelData = TempPixelData.slice(row * TempWidth + position - 1,row * TempWidth + position);
					areaPixelData = concatenate(resultConstructor, areaPixelData, rowPointPixelData);
				}else{
					areaPixelData = TempPixelData.slice(row * TempWidth + position - 1, row * TempWidth + position);
				}
			}
			if(mprPixelData && mprPixelData.length){
				if(seriesDirection){
					mprPixelData = concatenate(resultConstructor, mprPixelData, areaPixelData);
				}else{
					mprPixelData = concatenate(resultConstructor, areaPixelData, mprPixelData);
				}
			}else{
				mprPixelData = areaPixelData;
			}
		}
//		console.log(mprPixelData);
		mprImage.pixelData = mprPixelData;
		//生成初始的画板数据
		const mprRenderCanvas = document.createElement('canvas');
		mprRenderCanvas.width = mprImage.height;
		mprRenderCanvas.height = mprImage.width;
		const canvasContext = mprRenderCanvas.getContext('2d');
		canvasContext.fillStyle = 'white';
		canvasContext.fillRect(0, 0, mprRenderCanvas.width, mprRenderCanvas.height);
		const renderCanvasData = canvasContext.getImageData(0, 0, mprImage.height, mprImage.width);
		mprImage.renderCanvasData = renderCanvasData;
	}
}
function generateMPRDisplayImage(image,lut){
	cornerstone.storedPixelDataToCanvasImageData(image, lut, image.renderCanvasData.data);
//const pixelData = image.getPixelData();
//const numPixels = pixelData.length;
//const minPixelValue = image.minPixelValue;
//const canvasImageDataData = image.renderCanvasData.data;
//console.log(image.renderCanvasData);
//let canvasImageDataIndex = 3;
//let storedPixelDataIndex = 0;
//
//if (pixelData instanceof Int16Array) {
//  if (minPixelValue < 0) {
//    while (storedPixelDataIndex < numPixels) {
//      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++] + (-minPixelValue)]; // Alpha
//      canvasImageDataIndex += 4;
//    }
//  } else {
//    while (storedPixelDataIndex < numPixels) {
//      canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++]]; // Alpha
//      canvasImageDataIndex += 4;
//    }
//  }
//} else if (pixelData instanceof Uint16Array) {
//  while (storedPixelDataIndex < numPixels) {
//    canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++]]; // Alpha
//    canvasImageDataIndex += 4;
//  }
//} else if (minPixelValue < 0) {
//  while (storedPixelDataIndex < numPixels) {
//    canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++] + (-minPixelValue)]; // Alpha
//    canvasImageDataIndex += 4;
//  }
//} else {
//  while (storedPixelDataIndex < numPixels) {
//    canvasImageDataData[canvasImageDataIndex] = lut[pixelData[storedPixelDataIndex++]]; // Alpha
//    canvasImageDataIndex += 4;
//  }
//}
	return image.renderCanvasData;
}
function getLUT(image){
	let viewport = image.viewport;
	let lut = cornerstone.generateLut(image,viewport.voi.windowWidth,viewport.voi.windowCenter,viewport.invert,viewport.modalityLUT,viewport.voiLUT)
	return lut;
}
function demoFn(mprSeriesObj, mprSourceElement){
	console.log("MPR_DEMO",mprSeriesObj);
	let firstImage = cornerstone.getImage(mprSourceElement);
	let sourceViewport = cornerstone.getViewport(mprSourceElement);
//	console.log(sourceViewport,"sourceViewport");
	let widthMprImage = createMprImage(firstImage,firstImage.width,mprSeriesObj["picOrderNum"].length,sourceViewport);
	let heightMprImage = createMprImage(firstImage,mprSeriesObj["picOrderNum"].length,firstImage.height,sourceViewport);
//	console.log(widthMprImage);
	//横切,冠状位 拼接点
	generateMprpixelData(widthMprImage, mprSeriesObj, firstImage.height / 2, "coro");
	//生成可显示的图像
	let widthPlaneData = generateMPRDisplayImage(widthMprImage,getLUT(widthMprImage));
//	竖切,矢位
	generateMprpixelData(heightMprImage, mprSeriesObj, firstImage.width / 2, "sagi");
	let heightPlaneData = generateMPRDisplayImage(heightMprImage,getLUT(heightMprImage));
	
	//  ############################
	let csstemp = {
		border: "5px solid purple",
		position: "relative",
		zIndex: 2000
	}
	let widthMprDom = $('<canvas width="512" height="512"></canvas>').css(csstemp);
	let heightMprDom = $('<canvas width="512" height="512"></canvas>').css(csstemp);
	$("#mprDicomDiv").append(widthMprDom).append(heightMprDom);
	let widthContext = widthMprDom.get(0).getContext('2d');
	let heightContext = heightMprDom.get(0).getContext('2d');
	widthContext.fillStyle = 'blue';
	widthContext.fillRect(0, 0, 300, 300);
	widthContext.putImageData(widthPlaneData,0,0);
	heightContext.putImageData(heightPlaneData,0,0);
	//  ############################
}

export const mprDemo = {
	demoFn
}