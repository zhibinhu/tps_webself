/*
 1.序列请求保留500M的缓存文件（转换味blob）
 2.改造work，并且返回给index作为参考，进行文件的索引（或者后台进行返回数据）
 3.鼠标滚动，让work返回数据
 4.work处理imagearr？
 * */
//140725600
var netUrl = "http://117.78.44.34:82/";
var tempFileSizeMax = 14072560000
var netSeriesInfo = {};
var netInstanceNoCache = {};
var netCacheObj = {
	size: 0,
	fileNum: 0,
	indexNumbers: []
};
var questMargin = 50;
var dynamicQuestLock = false;
var dynamicQuestArr = [];
var cacheSizeFullLock = true;
var returnIngFile = false;
var _this = this;
this.currentSeries = undefined;
this.imageCount = undefined;
this.onmessage = function(ev) {
	/*
	 {
	 	type:"init",
	 	seriesUid:seriesUid,
	 	imageCount:number,
	 	netSeriesInfo:{}
	 * */
	if(ev.data.type == "init") {
		//进行当前序列的加载
		this.currentSeries = ev.data.seriesUid;
		this.imageCount = ev.data.imageCount;
		netSeriesInfo = ev.data.netSeriesInfo;
		netUrl = ev.data.netUrl;
		//1.2.840.113619.2.55.3.12624128.2910.1151313604.962
		//1.2.840.113619.2.55.3.12624128.2910.1151313604.894
		//1.2.840.113619.2.55.3.12624128.2835.1151312975.454
		if(this.currentSeries == "1.2.840.113619.2.55.3.12624128.2835.1151312975.454") {
			//console.log(32323232);
			return;
		}
		if(this.imageCount == 1) {
			return;
		}
		//区别对待多少开始请求
		if(this.netSeriesInfo.imageCount > 400) {
			questMargin = 100;
		} else if(this.netSeriesInfo.imageCount > 600) {
			questMargin = 150;
		}
		//请求序列
		netGetseriesInstance(this.currentSeries);
	} else if(ev.data.type == "windowInfo") {
		//处理用户当前显示状态
		/*
		 {
		 	type:"windowInfo",
		 	windowInfo : {
				currentDisplaySeries:undefined,
				netDirection:undefined //true为向下,false为向上翻页
				currentpicOrderNum:显示下标
			}
		 }
		 * */
		if(this.currentSeries == ev.data.windowInfo.currentDisplaySeries && !cacheSizeFullLock) {
			var showIndex = Number(ev.data.windowInfo.currentpicOrderNum);
			if(ev.data.windowInfo.netDirection && !dynamicQuestLock) {
				//向下翻页
				let currentMin = netCacheObj.indexNumbers[0];
				if(showIndex - currentMin < questMargin) {
					//向下请求数据(50次)
					for(var i = 0; i < 50; i++) {
						var questPage = currentMin - i - 1;
						if(dynamicQuestArr.indexOf(questPage) < 0 && questPage > 0) {
							dynamicQuestLock = true;
							dynamicQuestArr.push(questPage);
							dynamicQuestInstanceDOWN(this.currentSeries, questPage);
						} else {
							//							console.log("超出边界了--下翻页");
							break;
						}
					}
				}
			} else if(!ev.data.windowInfo.netDirection && !dynamicQuestLock) {
				//向上翻页
				let currentMax = netCacheObj.indexNumbers[netCacheObj.indexNumbers.length - 1];
				if(netCacheObj.indexNumbers.length - netCacheObj.indexNumbers.indexOf(showIndex) < questMargin) {
					//向上请求数据(50次)
					for(var i = 0; i < 50; i++) {
						var questPage = currentMax + i + 1;
						if(dynamicQuestArr.indexOf(questPage) < 0 && questPage <= netSeriesInfo.imageCount) {
							dynamicQuestLock = true;
							dynamicQuestArr.push(questPage);
							dynamicQuestInstanceUP(this.currentSeries, questPage);
						} else {
							//							console.log("超出边界了--上翻页");
							break;
						}
					}
				}
			}
		}
	} else if(ev.data.type == "getFile" && !returnIngFile) {
		//想要获取数据,返回指定的文件
		/*
		 {
		 	type:"windowInfo",
		 	start : 开始index,
		 	length:文件数量
		 * */
		returnIngFile = true;
		return;
		var returnFiles = [];
		for(var i = 1; i <= ev.data.length; i++) {
			if(netCacheObj[i]) {
				returnFiles.push(netCacheObj[i]);
			} else {
				//没有或者需要进行获取
			}

		}
		returnIngFile = false;
		this.postMessage({
			type: "returnFiles",
			files: returnFiles,
			globalSize: netCacheObj.size
		});
		returnFiles = undefined;
	} else if(ev.data.type == "getFileViewClick") {
		//想要获取数据,返回指定的文件
		/*
		 {
		 	type:"windowInfo",
		 	start : 开始index,
		 	length:文件数量
		 * */
		return;
		var returnFiles = [];
		for(var i = 1; i <= ev.data.length; i++) {
			if(netCacheObj[i]) {
				returnFiles.push(netCacheObj[i]);
			} else {
				//没有或者需要进行获取
			}

		}
		this.postMessage({
			type: "returnViewClickFiles",
			files: returnFiles,
			globalSize: netCacheObj.size
		});
		returnFiles = undefined;
	} else if(ev.data.type == "dynamicGetFileUp" && !returnIngFile) {
		//想要获取数据,返回指定的文件
		/*
		 {
		 	type:"windowInfo",
		 	start : 开始index,
		 	length:文件数量
		 * */
		return;
		returnIngFile = true;
		var returnFiles = [];
		for(var i = ev.data.startIndex; i <= ev.data.startIndex + ev.data.length; i++) {
			if(i > netSeriesInfo.imageCount) {
				break
			}
			if(netCacheObj[i]) {
				returnFiles.push(netCacheObj[i]);
			} else {
				//没有或者需要进行获取
			}

		}
		this.postMessage({
			type: "returnDynamicFiles",
			files: returnFiles,
			direction: "UP",
			globalSize: netCacheObj.size,
			series: this.currentSeries
		});
		returnIngFile = false;
		returnFiles = undefined;
	} else if(ev.data.type == "dynamicGetFileDown" && !returnIngFile) {
		//想要获取数据,返回指定的文件
		/*
		 {
		 	type:"windowInfo",
		 	start : 开始index,
		 	length:文件数量
		 * */
		return;
		returnIngFile = true;
		var returnFiles = [];
		var minI = (ev.data.startIndex - ev.data.length) > 0 ? (ev.data.startIndex - ev.data.length) : 0;
		for(var i = ev.data.startIndex; i >= minI; i--) {
			if(netCacheObj[i]) {
				returnFiles.push(netCacheObj[i]);
			} else {
				//没有或者需要进行获取
			}

		}
		this.postMessage({
			type: "returnDynamicFiles",
			files: returnFiles,
			direction: "DOWN",
			globalSize: netCacheObj.size,
			series: this.currentSeries
		});
		returnIngFile = false;
		returnFiles = undefined;
	} else if(ev.data.type == "console") {
		console.log("缓存的文件", netCacheObj.size);
		console.log("请求的页码", dynamicQuestArr)
	}

}

function netGetseriesInstance(selectedSeries) {
	if(netSeriesInfo.loadComplete) {
		return;
	}
	if(netSeriesInfo.loading) {
		return;
	}
	netSeriesInfo.loading = true;
	var loadedNum = netSeriesInfo.loadedNum;
	var questPage = Math.floor(loadedNum) + 1;
	var imageCountMax = netSeriesInfo.imageCount;
	var questNumber = 1;
	var seriesUid = netSeriesInfo.seriesUid;

	//网络请求
	netAjax({
		url: netUrl,
		type: "get",
		uid: selectedSeries,
		curPage: questPage,
		pageSize: 1
	}, questNumber);
	// ajax请求函数
	function netAjax(obj) {
		let xhr = new XMLHttpRequest();
		let method = obj.type.toUpperCase();
		if(method == 'GET') {
			xhr.open('GET', obj.url + 'api/dcm/insts?uid=' + obj.uid + "&curPage=" + obj.curPage + "&pageSize=1", true);
			xhr.send(null);
		} else if(method == 'POST') {
			xhr.open('POST', obj.url, true);
			xhr.send(obj.data);
		}
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseXML ? xhr.responseXML : xhr.responseText;
				var data = JSON.parse(result);
				questNumber = obj.curPage;

				//变量存储instance
				if(netInstanceNoCache[seriesUid]) {
					netInstanceNoCache[seriesUid]["questNumber"][questNumber] = data.contents[0]["instanceUid"];
					netInstanceNoCache[seriesUid]["instanceUID"][data.contents[0]["instanceUid"]] = questNumber;
				} else {
					netInstanceNoCache[seriesUid] = {};
					netInstanceNoCache[seriesUid]["questNumber"] = {};
					netInstanceNoCache[seriesUid]["questNumber"][questNumber] = data.contents[0]["instanceUid"];
					netInstanceNoCache[seriesUid]["instanceUID"] = {};
					netInstanceNoCache[seriesUid]["instanceUID"][data.contents[0]["instanceUid"]] = questNumber;
				}

				obj.curPage++;
				var process = questNumber / imageCountMax * 100 + "%";
				var blobTemp = b64toBlob(data.contents[0]["content"]);
				_this.postMessage({
					type: "netQuest",
					series: _this.currentSeries,
					process: process,
					file: blobTemp,
					instanceUID: data.contents[0]["instanceUid"],
					questPage: questNumber,
					netSeriesInfo: netSeriesInfo
				})
				blobTemp = undefined;

				if(questNumber < imageCountMax) {
					netSeriesInfo.loadedNum = questNumber;
					netSeriesInfo.loadComplete = false;
					if(!netSeriesInfo.netQuestPause) {
						netAjax(obj);
					} else {
						netSeriesInfo.loading = false;
					}
				} else {
					obj.curPage = 1;
					questNumber = 1;
					netSeriesInfo.loadedNum = netSeriesInfo.imageCount;
					netSeriesInfo.loadComplete = true;
					netSeriesInfo.loading = false;
				}
				xhr = null;
			} else if(xhr.status == 404) {
				console.error('页面找不到');
			} else if(xhr.status == 500) {
				console.error('服务器内部错误');
			}
		}
	}
}

function dynamicQuestInstanceDOWN(selectedSeries, questPage) {
	dynamicAjax({
		url: netUrl,
		type: "get",
		uid: selectedSeries,
		curPage: questPage,
		pageSize: 1
	})

	function dynamicAjax(obj) {
		let xhr = new XMLHttpRequest();
		let method = obj.type.toUpperCase();
		if(method == 'GET') {
			xhr.open('GET', obj.url + 'api/dcm/insts?uid=' + obj.uid + "&curPage=" + obj.curPage + "&pageSize=1", true);
			xhr.send(null);
		} else if(method == 'POST') {
			xhr.open('POST', obj.url, true);
			xhr.send(obj.data);
		}
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseXML ? xhr.responseXML : xhr.responseText;
				var data = JSON.parse(result);
				//删除一个
				netCacheObj.fileNum--;
				var deleteFilePage = netCacheObj["indexNumbers"][netCacheObj["indexNumbers"].length - 1];
				netCacheObj.size -= netCacheObj[deleteFilePage].file.size;
				delete netCacheObj[deleteFilePage];
				netCacheObj["indexNumbers"].pop();
				dynamicQuestArr.splice(dynamicQuestArr.indexOf(obj.curPage), 1);

				//加入新的文件
				var blobTemp = b64toBlob(data.contents[0]["content"]);
				data.contents[0]["content"] = null;
				netCacheObj[obj.curPage] = {};
				netCacheObj[obj.curPage]["file"] = blobTemp;
				netCacheObj[obj.curPage]["instanceUID"] = data.contents[0]["instanceUid"];
				netCacheObj["indexNumbers"].unshift(obj.curPage);

				netCacheObj.size += blobTemp.size;
				netSeriesInfo.cachedSize = netCacheObj.size;
				netCacheObj.fileNum++;
				//检测是否请求完成了
				if(!dynamicQuestArr.length) {
					netCacheObj["indexNumbers"].sort(function(a, b) {
						return a - b;
					});
					dynamicQuestLock = false;
				}
			} else if(xhr.status == 404) {
				console.error('页面找不到');
			} else if(xhr.status == 500) {
				console.error('服务器内部错误');
			}
		}
	}
}

function dynamicQuestInstanceUP(selectedSeries, questPage) {
	dynamicAjax({
		url: netUrl,
		type: "get",
		uid: selectedSeries,
		curPage: questPage,
		pageSize: 1
	})

	function dynamicAjax(obj) {
		let xhr = new XMLHttpRequest();
		let method = obj.type.toUpperCase();
		if(method == 'GET') {
			xhr.open('GET', obj.url + 'api/dcm/insts?uid=' + obj.uid + "&curPage=" + obj.curPage + "&pageSize=1", true);
			xhr.send(null);
		} else if(method == 'POST') {
			xhr.open('POST', obj.url, true);
			xhr.send(obj.data);
		}
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseXML ? xhr.responseXML : xhr.responseText;
				var data = JSON.parse(result);
				//删除一个
				netCacheObj.fileNum--;
				var deleteFilePage = netCacheObj["indexNumbers"][0];
				netCacheObj.size -= netCacheObj[deleteFilePage].file.size;
				delete netCacheObj[deleteFilePage];
				netCacheObj["indexNumbers"].shift();
				dynamicQuestArr.splice(dynamicQuestArr.indexOf(obj.curPage), 1);
				//加入新的文件
				var blobTemp = b64toBlob(data.contents[0]["content"]);
				data.contents[0]["content"] = null;
				netCacheObj[obj.curPage] = {};
				netCacheObj[obj.curPage]["file"] = blobTemp;
				netCacheObj[obj.curPage]["instanceUID"] = data.contents[0]["instanceUid"];
				netCacheObj["indexNumbers"].push(obj.curPage);

				netCacheObj.size += blobTemp.size;
				netSeriesInfo.cachedSize = netCacheObj.size;
				netCacheObj.fileNum++;
				//检测是否请求完成了
				if(!dynamicQuestArr.length) {
					netCacheObj["indexNumbers"].sort(function(a, b) {
						return a - b;
					});
					dynamicQuestLock = false;
				}
			} else if(xhr.status == 404) {
				console.error('页面找不到');
			} else if(xhr.status == 500) {
				console.error('服务器内部错误');
			}
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
	b64Data = null;
	return blob;
}