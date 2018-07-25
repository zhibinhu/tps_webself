netSeriesInfo[series[i].seriesNo] = 
{
	loading: false,//序列加载
	loadComplete: false,//加载完成
	dynamicLoading: false,//动态加载完成
	seriesId: series[i].seriesNo,//序列号
	seriesUid: series[i].seriesUid,//序列UID
	imageCount: series[i].imageCount,//image数量
	loadedNum: 0,//已经加载的图像数量
	netQuestInterval: null,//网络请求间隙loop
	netLoadCount:0,//网络请求的数量
	maxquestNum:0//最大请求数量
};
setSeriesAndStack
dynamicCallback//提供给DicomImage的动态回调
seriesChangePicShow(currentDisplaySeries)//

seriesObjPicNumMax - picOrderNum < 10 
&& !netSeriesInfo[currentDisplaySeries].dynamicLoading
&& fileLen == 0 
&& !dynamicCallbackLock 
&& dynamicSeriesObjComplete

function checkIfNeedLoadInstance(){
	console.log("检查是否需要进行请求序列");
}
seriesID
netGetseriesInstance(selectedSeries, seriesElement)


var toolType = 'probe';
let positionLine = {
	OriginElement : {
		x:undefined,
		y:undefined
	},
	CoroElement : {
		x:undefined,
		y:undefined
	},
	SagiElement : {
		x:undefined,
		y:undefined
	}
};