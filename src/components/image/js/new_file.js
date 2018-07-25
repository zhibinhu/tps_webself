
		let that = this;
		this.magicStart = true;
		this.currentImage.clearMagicDraw = false;
		let pointBox = function(x, y) {
			this.x = x;
			this.y = y;
		}
		let magicPointArr = [];
		let dx = [0, 0, -1, 1, -1, -1, 1, 1];
		let dy = [1, -1, 0, 0, -1, 1, -1, 1];
		/////////////////////////////
		this.element.onclick = function(e){
			console.log('开始了吗',that.magicStart);
			if(that.magicStart){
				let startPt = {
					x:e.offsetX,
					y:e.offsetY
				}
				//起始点像素坐标
				let startPixelPT = cornerstone.canvasToPixel(this,startPt);
				//操作区域必须在图像范围内
				if(startPixelPT.x < 0 || startPixelPT.y < 0){
					alert('非图像区域');
					return;
				}
				let startPixelX = parseInt(startPixelPT.x);
				let startPixelY = parseInt(startPixelPT.y);
				let w = that.detail.enabledElement.renderingTools.renderCanvasData.width;
				let h = that.detail.enabledElement.renderingTools.renderCanvasData.height;
				//imageData
				let renderCanvasData = that.detail.enabledElement.renderingTools.renderCanvasData.data;
				let R,G,B,A;
				//当前像素所在位置下标
				let startPointIndex = 4 * w * (startPixelY-1) + 4 * (startPixelX-1);
				//找到当前像素点的RGBA值
				if(that.currentImage.color){
					console.log("有色图喽");
					R = renderCanvasData[startPointIndex];
					G = renderCanvasData[startPointIndex+1];
					B = renderCanvasData[startPointIndex+2];
					A = renderCanvasData[startPointIndex+3];
				}else{
					A = renderCanvasData[startPointIndex+3];
				}
				console.log('RGBA',R,G,B,A,'startPixelPT',startPixelX,startPixelY);
				//算法
				let queue = [];
				let visit = [];
				queue.push(new pointBox(startPixelX, startPixelY));
				while(queue.length != 0) {
					let firstObj = queue.shift();
					for(let i = 0; i < dx.length; i++) {
						let X = firstObj.x + dx[i];
						let Y = firstObj.y + dy[i];
						if(X < 0 || Y < 0 || X > w-1 || Y > h-1 || visit[Y * w + X]){ 
							continue;
						}
						visit[Y * w + X] = true;
						//彩图       //当前被对比的像素点下标
						let nowPointIndex = 4 * w * (Y-1) + 4 * (X-1);
						if(that.currentImage.color){
							if(Math.abs(renderCanvasData[nowPointIndex] - R) > 30){
								magicPointArr.push({x:X,y:Y});
								continue;
							}
							if(Math.abs(renderCanvasData[nowPointIndex+1] - G) > 30){
								magicPointArr.push({x:X,y:Y});
								continue;
							}
							if(Math.abs(renderCanvasData[nowPointIndex+2] - B) > 30){
								magicPointArr.push({x:X,y:Y});
								continue;
							}
							if(Math.abs(renderCanvasData[nowPointIndex+3] - A) > 30){
								magicPointArr.push({x:X,y:Y});
								continue;
							}
						//灰度图
						}else{
							if(Math.abs(renderCanvasData[nowPointIndex+3] - A) > 30){
								magicPointArr.push({x:X,y:Y});
								continue;
							}
						}	
						queue.push(new pointBox(X, Y));
					}
				}
//				console.log(magicPointArr,"magicPointArr");
				//转化为像素坐标
				that.magicPixelCoord = [];
				that.magicPixelCoord = magicPointArr;
//				console.log('像素坐标',that.magicPixelCoord);
				//向每一个imageId中添加像素坐标信息
				that.currentImage.magicCoord = [];
				for(let i = 0; i < that.magicPixelCoord.length; i++){
					that.currentImage.magicCoord[i] = {};
					that.currentImage.magicCoord[i].x = that.magicPixelCoord[i].x;
					that.currentImage.magicCoord[i].y = that.magicPixelCoord[i].y;
				}
				console.log('当前图像',that.currentImage);
				//将imageId中的像素坐标信息保存到magicCanvasCoord
				that.magicCanvasCoord = [];
				for(let i = 0; i < that.currentImage.magicCoord.length; i++){
					that.magicCanvasCoord.push(cornerstone.pixelToCanvas(this,that.currentImage.magicCoord[i]));
				}
//				console.log('canvas坐标',that.magicCanvasCoord);
				//开始绘制
				that.magicDraw(that.detail.canvasContext.canvas.getContext('2d'));
				that.currentImage.magic = true;
			}
			that.magicStart = false;
		}
	

function getMprImage(imageId){
	let imageIdTemp = imageId.split("//")[1];
	if(!imageId){
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