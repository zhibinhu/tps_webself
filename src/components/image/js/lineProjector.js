import Hammer from 'hammerjs'; // npm install --save hammerjs
//import * as cornerstone from 'cornerstone-core'; // npm install --save cornerstone-core
//import * as cornerstone from '../public_codecs/cornerstone.js';
// import * as cornerstoneTools from '../public_codecs/cornerstoneTools.js';
// let cornerstoneTools = require('../public_codecs/cornerstoneTools.js')
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;

function convertToVector3(arrayOrVector3) {
	const cornerstoneMath = window.cornerstoneMath;

	if(arrayOrVector3 instanceof cornerstoneMath.Vector3) {
		return arrayOrVector3;
	}

	return new cornerstoneMath.Vector3(arrayOrVector3[0], arrayOrVector3[1], arrayOrVector3[2]);
}

function calculateReferenceLine(targetImagePlane, referenceImagePlane) {
	const points = planePlaneIntersection(targetImagePlane, referenceImagePlane);

	if(!points) {
		return;
	}

	return {
		start: projectPatientPointToImagePlane(points.start, targetImagePlane),
		end: projectPatientPointToImagePlane(points.end, targetImagePlane)
	};
}

function getRectangleFromImagePlane(imagePlane) {
	// Get the points
	const topLeft = imagePointToPatientPoint({
		x: 0,
		y: 0
	}, imagePlane);
	const topRight = imagePointToPatientPoint({
		x: imagePlane.columns,
		y: 0
	}, imagePlane);
	const bottomLeft = imagePointToPatientPoint({
		x: 0,
		y: imagePlane.rows
	}, imagePlane);
	const bottomRight = imagePointToPatientPoint({
		x: imagePlane.columns,
		y: imagePlane.rows
	}, imagePlane);

	// 把每一面都当成向量
	const rect = {
		top: new cornerstoneMath.Line3(topLeft, topRight),
		left: new cornerstoneMath.Line3(topLeft, bottomLeft),
		right: new cornerstoneMath.Line3(topRight, bottomRight),
		bottom: new cornerstoneMath.Line3(bottomLeft, bottomRight)
	};

	return rect;
}

function lineRectangleIntersection(line, rect) {
	const intersections = [];

	Object.keys(rect).forEach(function(side) {
		const segment = rect[side];
		const intersection = line.intersectLine(segment);

		if(intersection) {
			intersections.push(intersection);
		}
	});

	return intersections;
}

function imagePointToPatientPoint(imagePoint, imagePlane) {
	const rowCosines = convertToVector3(imagePlane.rowCosines);
	const columnCosines = convertToVector3(imagePlane.columnCosines);
	const imagePositionPatient = convertToVector3(imagePlane.imagePositionPatient);

	const x = rowCosines.clone().multiplyScalar(imagePoint.x);

	x.multiplyScalar(imagePlane.columnPixelSpacing);
	const y = columnCosines.clone().multiplyScalar(imagePoint.y);

	y.multiplyScalar(imagePlane.rowPixelSpacing);
	const patientPoint = x.add(y);

	patientPoint.add(imagePositionPatient);

	return patientPoint;
}

function planePlaneIntersection(targetImagePlane, referenceImagePlane) {
	const targetRowCosines = convertToVector3(targetImagePlane.rowCosines);
	const targetColumnCosines = convertToVector3(targetImagePlane.columnCosines);
	const targetImagePositionPatient = convertToVector3(targetImagePlane.imagePositionPatient);
	const referenceRowCosines = convertToVector3(referenceImagePlane.rowCosines);
	const referenceColumnCosines = convertToVector3(referenceImagePlane.columnCosines);
	const referenceImagePositionPatient = convertToVector3(referenceImagePlane.imagePositionPatient);

	// 首先，得到每个图像平面的法线
	const targetNormal = targetRowCosines.clone().cross(targetColumnCosines);
	const targetPlane = new window.cornerstoneMath.Plane();

	targetPlane.setFromNormalAndCoplanarPoint(targetNormal, targetImagePositionPatient);

	const referenceNormal = referenceRowCosines.clone().cross(referenceColumnCosines);
	const referencePlane = new window.cornerstoneMath.Plane();

	referencePlane.setFromNormalAndCoplanarPoint(referenceNormal, referenceImagePositionPatient);

	const originDirection = referencePlane.clone().intersectPlane(targetPlane);
	const origin = originDirection.origin;
	const direction = originDirection.direction;

	// 计算参考图像平面中最长的可能长度（对角线的长度）
	const bottomRight = imagePointToPatientPoint({
		x: referenceImagePlane.columns,
		y: referenceImagePlane.rows
	}, referenceImagePlane);
	const distance = referenceImagePositionPatient.distanceTo(bottomRight);

	// 利用这段距离将射线与两个平面相交
	const line = new window.cornerstoneMath.Line3();

	line.start = origin;
	line.end = origin.clone().add(direction.multiplyScalar(distance));

	// 找出这条直线和参考图像平面的四边之间的交点
	const rect = getRectangleFromImagePlane(referenceImagePlane);
	const intersections = lineRectangleIntersection(line, rect);

	// 返回这条直线和参考图像平面的相交点
	// 为了从目标图像中绘制参考线
	if(intersections.length !== 2) {
		return;
	}

	return {
		start: intersections[0],
		end: intersections[1]
	};
}

function projectPatientPointToImagePlane(patientPoint, imagePlane) {
	const rowCosines = convertToVector3(imagePlane.rowCosines);
	const columnCosines = convertToVector3(imagePlane.columnCosines);
	const imagePositionPatient = convertToVector3(imagePlane.imagePositionPatient);
	const point = patientPoint.clone().sub(imagePositionPatient);
	const x = rowCosines.dot(point) / imagePlane.columnPixelSpacing;
	const y = columnCosines.dot(point) / imagePlane.rowPixelSpacing;

	return {
		x,
		y
	};
}

function activeReferenceLine(targetElementImage, referenceElementImage) {
	var targetImage = "";
	var referenceImage = "";
	if(targetElementImage.element) {
		targetImage = cornerstone.getEnabledElement(targetElementImage.element).image;
	} else {
		targetImage = targetElementImage.currentImage;
	}
	if(referenceElementImage.element) {
		referenceImage = cornerstone.getEnabledElement(referenceElementImage.element).image;
	} else {
		referenceImage = referenceElementImage.currentImage;
	}
	// 确保这些图像是 loaded for the target and reference
	if(!targetImage || !referenceImage) {
		return;
	}

	const targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);
	const referenceImagePlane = cornerstone.metaData.get('imagePlaneModule', referenceImage.imageId);

	// 确保 the target and reference 具有图像平面元数据
	if(!targetImagePlane ||
		!referenceImagePlane ||
		!targetImagePlane.rowCosines ||
		!targetImagePlane.columnCosines ||
		!targetImagePlane.imagePositionPatient ||
		!referenceImagePlane.rowCosines ||
		!referenceImagePlane.columnCosines ||
		!referenceImagePlane.imagePositionPatient) {
		return;
	}

	// (图像平面必须在相同的参考系中)The image planes must be in the same frame of reference
	if(targetImagePlane.frameOfReferenceUID !== referenceImagePlane.frameOfReferenceUID) {
		return;
	}

	targetImagePlane.rowCosines = convertToVector3(targetImagePlane.rowCosines);
	targetImagePlane.columnCosines = convertToVector3(targetImagePlane.columnCosines);
	targetImagePlane.imagePositionPatient = convertToVector3(targetImagePlane.imagePositionPatient);
	referenceImagePlane.rowCosines = convertToVector3(referenceImagePlane.rowCosines);
	referenceImagePlane.columnCosines = convertToVector3(referenceImagePlane.columnCosines);
	referenceImagePlane.imagePositionPatient = convertToVector3(referenceImagePlane.imagePositionPatient);

	// 图像平面法线必须大于30度
	const targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
	const referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
	let angleInRadians = targetNormal.angleTo(referenceNormal);

	angleInRadians = Math.abs(angleInRadians);
	if(angleInRadians < 0.5) { // 0.5 radians = ~30 degrees(0.5弧度=30度)
		return;
	}

	const referenceLine = calculateReferenceLine(targetImagePlane, referenceImagePlane);

	if(!referenceLine) {
		return;
	}
//	console.log("有线了吧!!!!!!",referenceLine);
	return referenceLine;
	//	targetElementImage.drawReferenceLine(referenceLine);
}

// export {
// 	activeReferenceLine
// };
export default activeReferenceLine;
