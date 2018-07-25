/*! cornerstone-tools - 2.3.2 - 2018-04-20 | (c) 2017 Chris Hafey | https://github.com/cornerstonejs/cornerstoneTools */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cornerstoneTools", [], factory);
	else if(typeof exports === 'object')
		exports["cornerstoneTools"] = factory();
	else
		root["cornerstoneTools"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./events.js":
/*!*******************!*\
  !*** ./events.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EVENTS = {
  // Events from Cornerstone Core
  IMAGE_RENDERED: 'cornerstoneimagerendered',
  NEW_IMAGE: 'cornerstonenewimage',
  IMAGE_CACHE_PROMISE_REMOVED: 'cornerstoneimagecachepromiseremoved',
  ELEMENT_DISABLED: 'cornerstoneelementdisabled',

  // Mouse events
  MOUSE_DOWN: 'cornerstonetoolsmousedown',
  MOUSE_UP: 'cornerstonetoolsmouseup',
  MOUSE_DOWN_ACTIVATE: 'cornerstonetoolsmousedownactivate',
  MOUSE_DRAG: 'cornerstonetoolsmousedrag',
  MOUSE_MOVE: 'cornerstonetoolsmousemove',
  MOUSE_CLICK: 'cornerstonetoolsmouseclick',
  MOUSE_DOUBLE_CLICK: 'cornerstonetoolsmousedoubleclick',
  MOUSE_WHEEL: 'cornerstonetoolsmousewheel',

  // Touch events
  TOUCH_START: 'cornerstonetoolstouchstart',
  TOUCH_START_ACTIVE: 'cornerstonetoolstouchstartactive',
  TOUCH_END: 'cornerstonetoolstouchend',
  TOUCH_DRAG: 'cornerstonetoolstouchdrag',
  TOUCH_DRAG_END: 'cornerstonetoolstouchdragend',
  TOUCH_PINCH: 'cornerstonetoolstouchpinch',
  TOUCH_ROTATE: 'cornerstonetoolstouchrotate',
  TOUCH_PRESS: 'cornerstonetoolstouchpress',
  TAP: 'cornerstonetoolstap',
  DOUBLE_TAP: 'cornerstonetoolsdoubletap',
  MULTI_TOUCH_START: 'cornerstonetoolsmultitouchstart',
  MULTI_TOUCH_START_ACTIVE: 'cornerstonetoolsmultitouchstartactive',
  MULTI_TOUCH_DRAG: 'cornerstonetoolsmultitouchdrag',

  // Keyboard events
  KEY_DOWN: 'cornerstonetoolskeydown',
  KEY_UP: 'cornerstonetoolskeyup',
  KEY_PRESS: 'cornerstonetoolskeypress',

  // Measurement / tool events
  MEASUREMENT_ADDED: 'cornerstonetoolsmeasurementadded',
  MEASUREMENT_MODIFIED: 'cornerstonetoolsmeasurementmodified',
  MEASUREMENT_REMOVED: 'cornerstonemeasurementremoved',
  TOOL_DEACTIVATED: 'cornerstonetoolstooldeactivated',
  CLIP_STOPPED: 'cornerstonetoolsclipstopped',
  STACK_SCROLL: 'cornerstonestackscroll', // Should be renamed

  LINE_SAMPLE_UPDATED: 'cornerstonelinesampleupdated'
};

exports.default = EVENTS;

/***/ }),

/***/ "./externalModules.js":
/*!****************************!*\
  !*** ./externalModules.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cornerstone = window.cornerstone;
var cornerstoneMath = window.cornerstoneMath;
var Hammer = window.Hammer;

exports.default = {
  set cornerstone(cs) {
    cornerstone = cs;
  },
  get cornerstone() {
    return cornerstone;
  },
  set cornerstoneMath(cm) {
    cornerstoneMath = cm;
  },
  get cornerstoneMath() {
    return cornerstoneMath;
  },
  set Hammer(module) {
    Hammer = module;
  },
  get Hammer() {
    return Hammer;
  }
};

/***/ }),

/***/ "./imageTools/angleTool.js":
/*!*********************************!*\
  !*** ./imageTools/angleTool.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.angleTouch = exports.angle = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _roundToDecimal = __webpack_require__(/*! ../util/roundToDecimal.js */ "./util/roundToDecimal.js");

var _roundToDecimal2 = _interopRequireDefault(_roundToDecimal);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'angle';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var angleData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x - 20,
        y: mouseEventData.currentPoints.image.y + 10,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      start2: {
        x: mouseEventData.currentPoints.image.x - 20,
        y: mouseEventData.currentPoints.image.y + 10,
        highlight: true,
        active: false
      },
      end2: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y + 20,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return angleData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;

  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.end)
  };

  var distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  if (distanceToPoint < 5) {
    return true;
  }

  lineSegment.start = cornerstone.pixelToCanvas(element, data.handles.start2);
  lineSegment.end = cornerstone.pixelToCanvas(element, data.handles.end2);

  distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 5;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');
  var image = eventData.image,
      element = eventData.element;

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Activation color
  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = angle.getConfiguration();
  var cornerstone = _externalModules2.default.cornerstone;

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    // Configurable shadow
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    // Differentiate the color of activation tool
    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw the line
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);

    handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start2);
    handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end2);

    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);
    context.stroke();

    // Draw the handles
    (0, _drawHandles2.default)(context, eventData, data.handles);

    // Draw the text
    context.fillStyle = color;

    // Need to work on correct angle to measure.  This is a cobb angle and we need to determine
    // Where lines cross to measure angle. For now it will show smallest angle.
    var dx1 = (Math.ceil(data.handles.start.x) - Math.ceil(data.handles.end.x)) * eventData.image.columnPixelSpacing;
    var dy1 = (Math.ceil(data.handles.start.y) - Math.ceil(data.handles.end.y)) * eventData.image.rowPixelSpacing;
    var dx2 = (Math.ceil(data.handles.start2.x) - Math.ceil(data.handles.end2.x)) * eventData.image.columnPixelSpacing;
    var dy2 = (Math.ceil(data.handles.start2.y) - Math.ceil(data.handles.end2.y)) * eventData.image.rowPixelSpacing;

    var _angle = Math.acos(Math.abs((dx1 * dx2 + dy1 * dy2) / (Math.sqrt(dx1 * dx1 + dy1 * dy1) * Math.sqrt(dx2 * dx2 + dy2 * dy2))));

    _angle *= 180 / Math.PI;

    var rAngle = (0, _roundToDecimal2.default)(_angle, 2);
    var str = '00B0'; // Degrees symbol
    var text = rAngle.toString() + String.fromCharCode(parseInt(str, 16));
	//console.log(666,text);
	if (!data.handles.textBox.hasMoved) {
      var coords = {
        x: Math.max(data.handles.start.x, data.handles.end.x)
      };

      // Depending on which handle has the largest x-value,
      // Set the y-value for the text box
      if (coords.x === data.handles.start.x) {
        coords.y = data.handles.start.y;
      } else {
        coords.y = data.handles.end.y;
      }

      data.handles.textBox.x = coords.x;
      data.handles.textBox.y = coords.y;
    }
	var textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);
	textCoords.x += 10;
	var options = {
      centering: {
        x: false,
        y: true
      }
    };
	
	data.angletext = text;
//  var textX = (handleStartCanvas.x + handleEndCanvas.x) / 2;
//  var textY = (handleStartCanvas.y + handleEndCanvas.y) / 2;

    context.font = font;
    var boundingBox = (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color, options);
    data.handles.textBox.boundingBox = boundingBox;
//  (0, _drawTextBox2.default)(context, text, textX, textY, color);
    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between ellipse and text
      var link = {
        start: {},
        end: {}
      };

      var midpointCanvas = {
        x: (handleStartCanvas.x + handleEndCanvas.x) / 2,
        y: (handleStartCanvas.y + handleEndCanvas.y) / 2
      };

      var points = [handleStartCanvas, handleEndCanvas, midpointCanvas];

      link.end.x = textCoords.x;
      link.end.y = textCoords.y;

      link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(points, link.end);

      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }
    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var angle = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var angleTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.angle = angle;
exports.angleTouch = angleTouch;

/***/ }),

/***/ "./imageTools/arrowAnnotate.js":
/*!*************************************!*\
  !*** ./imageTools/arrowAnnotate.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrowAnnotateTouch = exports.arrowAnnotate = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawArrow = __webpack_require__(/*! ../util/drawArrow.js */ "./util/drawArrow.js");

var _drawArrow2 = _interopRequireDefault(_drawArrow);

var _moveNewHandle = __webpack_require__(/*! ../manipulators/moveNewHandle.js */ "./manipulators/moveNewHandle.js");

var _moveNewHandle2 = _interopRequireDefault(_moveNewHandle);

var _moveNewHandleTouch = __webpack_require__(/*! ../manipulators/moveNewHandleTouch.js */ "./manipulators/moveNewHandleTouch.js");

var _moveNewHandleTouch2 = _interopRequireDefault(_moveNewHandleTouch);

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _pointInsideBoundingBox = __webpack_require__(/*! ../util/pointInsideBoundingBox.js */ "./util/pointInsideBoundingBox.js");

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'arrowAnnotate';

// Define a callback to get your text annotation
// This could be used, e.g. to open a modal
/* eslint no-alert:0 */
function getTextCallback(doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Enter your annotation:'));
}

function changeTextCallback(data, eventData, doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Change your annotation:'));
}

var configuration = {
  getTextCallback: getTextCallback,
  changeTextCallback: changeTextCallback,
  drawHandles: false,
  drawHandlesOnHover: true,
  arrowFirst: true
};

// / --- Mouse Tool --- ///

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurement(mouseEventData) {
  var element = mouseEventData.element;
  var measurementData = createNewMeasurement(mouseEventData);
  var cornerstone = _externalModules2.default.cornerstone;

  function doneChangingTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);

    element.addEventListener(_events2.default.MOUSE_MOVE, arrowAnnotate.mouseMoveCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN, arrowAnnotate.mouseDownCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, arrowAnnotate.mouseDownActivateCallback);
    element.addEventListener(_events2.default.MOUSE_DOUBLE_CLICK, arrowAnnotate.mouseDoubleClickCallback);
  }

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  // Since we are dragging to another place to drop the end point, we can just activate
  // The end point and let the moveHandle move it for us.
  element.removeEventListener(_events2.default.MOUSE_MOVE, arrowAnnotate.mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DOWN, arrowAnnotate.mouseDownCallback);
  element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, arrowAnnotate.mouseDownActivateCallback);
  element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, arrowAnnotate.mouseDoubleClickCallback);

  cornerstone.updateImage(element);
  (0, _moveNewHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
    if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    var config = arrowAnnotate.getConfiguration();

    if (measurementData.text === undefined) {
      config.getTextCallback(doneChangingTextCallback);
    }

    cornerstone.updateImage(element);
  });
}

function createNewMeasurement(eventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: eventData.currentPoints.image.x,
        y: eventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: eventData.currentPoints.image.x,
        y: eventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;

  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.end)
  };

  var distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 25;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var enabledElement = eventData.enabledElement;
  var cornerstone = _externalModules2.default.cornerstone;

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = arrowAnnotate.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw the arrow
    var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    // Config.arrowFirst = false;
    if (config.arrowFirst) {
      (0, _drawArrow2.default)(context, handleEndCanvas, handleStartCanvas, color, lineWidth);
    } else {
      (0, _drawArrow2.default)(context, handleStartCanvas, handleEndCanvas, color, lineWidth);
    }

    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    if (config.drawHandles) {
      (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);
    }

    // Draw the text
    if (data.text && data.text !== '') {
      context.font = font;

      // Calculate the text coordinates.
      var textWidth = context.measureText(data.text).width + 10;
      var textHeight = _textStyle2.default.getFontSize() + 10;

      var distance = Math.max(textWidth, textHeight) / 2 + 5;

      if (handleEndCanvas.x < handleStartCanvas.x) {
        distance = -distance;
      }

      var textCoords = void 0;

      if (!data.handles.textBox.hasMoved) {
        if (config.arrowFirst) {
          textCoords = {
            x: handleEndCanvas.x - textWidth / 2 + distance,
            y: handleEndCanvas.y - textHeight / 2
          };
        } else {
          // If the arrow is at the End position, the text should
          // Be placed near the Start position
          textCoords = {
            x: handleStartCanvas.x - textWidth / 2 - distance,
            y: handleStartCanvas.y - textHeight / 2
          };
        }

        var transform = cornerstone.internal.getTransform(enabledElement);

        transform.invert();

        var coords = transform.transformPoint(textCoords.x, textCoords.y);

        data.handles.textBox.x = coords.x;
        data.handles.textBox.y = coords.y;
      }

      textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);

      var boundingBox = (0, _drawTextBox2.default)(context, data.text, textCoords.x, textCoords.y, color);

      data.handles.textBox.boundingBox = boundingBox;

      if (data.handles.textBox.hasMoved) {
        // Draw dashed link line between tool and text
        var link = {
          start: {},
          end: {}
        };

        var midpointCanvas = {
          x: (handleStartCanvas.x + handleEndCanvas.x) / 2,
          y: (handleStartCanvas.y + handleEndCanvas.y) / 2
        };

        var points = [handleStartCanvas, handleEndCanvas, midpointCanvas];

        link.end.x = textCoords.x;
        link.end.y = textCoords.y;

        link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(points, link.end);

        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}
// ---- Touch tool ----

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurementTouch(touchEventData) {
  var element = touchEventData.element;
  var measurementData = createNewMeasurement(touchEventData);
  var cornerstone = _externalModules2.default.cornerstone;

  function doneChangingTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);

    element.addEventListener(_events2.default.TOUCH_PRESS, arrowAnnotateTouch.pressCallback);
    element.addEventListener(_events2.default.TOUCH_START_ACTIVE, arrowAnnotateTouch.touchDownActivateCallback);
    element.addEventListener(_events2.default.TAP, arrowAnnotateTouch.tapCallback);
  }

  (0, _toolState.addToolState)(element, toolType, measurementData);
  element.removeEventListener(_events2.default.TOUCH_PRESS, arrowAnnotateTouch.pressCallback);
  element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, arrowAnnotateTouch.touchDownActivateCallback);
  element.removeEventListener(_events2.default.TAP, arrowAnnotateTouch.tapCallback);
  cornerstone.updateImage(element);

  (0, _moveNewHandleTouch2.default)(touchEventData, toolType, measurementData, measurementData.handles.end, function () {
    cornerstone.updateImage(element);

    if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    var config = arrowAnnotate.getConfiguration();

    if (measurementData.text === undefined) {
      config.getTextCallback(doneChangingTextCallback);
    }
  });
}

function doubleClickCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var cornerstone = _externalModules2.default.cornerstone;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);
  var data = void 0;

  if (!(0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    return;
  }

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);
  }

  var config = arrowAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {
      data.active = true;
      cornerstone.updateImage(element);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }
}

function pressCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var cornerstone = _externalModules2.default.cornerstone;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    console.log('pressCallback doneChangingTextCallback');
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    element.addEventListener(_events2.default.TOUCH_START, arrowAnnotateTouch.touchStartCallback);
    element.addEventListener(_events2.default.TOUCH_START_ACTIVE, arrowAnnotateTouch.touchDownActivateCallback);
    element.addEventListener(_events2.default.TAP, arrowAnnotateTouch.tapCallback);
  }

  var config = arrowAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  if (eventData.handlePressed) {
    element.removeEventListener(_events2.default.TOUCH_START, arrowAnnotateTouch.touchStartCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, arrowAnnotateTouch.touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, arrowAnnotateTouch.tapCallback);

    // Allow relabelling via a callback
    config.changeTextCallback(eventData.handlePressed, eventData, doneChangingTextCallback);

    e.stopImmediatePropagation();

    return false;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      element.removeEventListener(_events2.default.TOUCH_START, arrowAnnotateTouch.touchStartCallback);
      element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, arrowAnnotateTouch.touchDownActivateCallback);
      element.removeEventListener(_events2.default.TAP, arrowAnnotateTouch.tapCallback);

      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  e.preventDefault();
  e.stopPropagation();
}

var arrowAnnotate = (0, _mouseButtonTool2.default)({
  addNewMeasurement: addNewMeasurement,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  mouseDoubleClickCallback: doubleClickCallback
});

arrowAnnotate.setConfiguration(configuration);

var arrowAnnotateTouch = (0, _touchTool2.default)({
  addNewMeasurement: addNewMeasurementTouch,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  pressCallback: pressCallback
});

exports.arrowAnnotate = arrowAnnotate;
exports.arrowAnnotateTouch = arrowAnnotateTouch;

/***/ }),

/***/ "./imageTools/crosshairs.js":
/*!**********************************!*\
  !*** ./imageTools/crosshairs.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crosshairsTouch = exports.crosshairs = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _pointProjector = __webpack_require__(/*! ../util/pointProjector.js */ "./util/pointProjector.js");

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'crosshairs';

function chooseLocation(e) {
  var eventData = e.detail;

  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  // Get current element target information
  var cornerstone = _externalModules2.default.cornerstone;
  var sourceElement = e.currentTarget;
  var sourceEnabledElement = cornerstone.getEnabledElement(sourceElement);
  var sourceImageId = sourceEnabledElement.image.imageId;
  var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImageId);

  if (!sourceImagePlane) {
    return;
  }

  // Get currentPoints from mouse cursor on selected element
  var sourceImagePoint = eventData.currentPoints.image;

  // Transfer this to a patientPoint given imagePlane metadata
  var patientPoint = (0, _pointProjector.imagePointToPatientPoint)(sourceImagePoint, sourceImagePlane);

  // Get the enabled elements associated with this synchronization context
  var syncContext = toolData.data[0].synchronizationContext;
  var enabledElements = syncContext.getSourceElements();

  // Iterate over each synchronized element
  enabledElements.forEach(function (targetElement) {
    // Don't do anything if the target is the same as the source
    if (targetElement === sourceElement) {
      return;
    }

    var minDistance = Number.MAX_VALUE;
    var newImageIdIndex = -1;

    var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');

    if (stackToolDataSource === undefined) {
      return;
    }

    var stackData = stackToolDataSource.data[0];

    // Find within the element's stack the closest image plane to selected location
    stackData.imageIds.forEach(function (imageId, index) {
      var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);

      // Skip if the image plane is not ready
      if (!imagePlane || !imagePlane.imagePositionPatient || !imagePlane.rowCosines || !imagePlane.columnCosines) {
        return;
      }

      var imagePosition = (0, _convertToVector2.default)(imagePlane.imagePositionPatient);
      var row = (0, _convertToVector2.default)(imagePlane.rowCosines);
      var column = (0, _convertToVector2.default)(imagePlane.columnCosines);
      var normal = column.clone().cross(row.clone());
      var distance = Math.abs(normal.clone().dot(imagePosition) - normal.clone().dot(patientPoint));
      // Console.log(index + '=' + distance);

      if (distance < minDistance) {
        minDistance = distance;
        newImageIdIndex = index;
      }
    });

    if (newImageIdIndex === stackData.currentImageIdIndex) {
      return;
    }

    // Switch the loaded image to the required image
    if (newImageIdIndex !== -1 && stackData.imageIds[newImageIdIndex] !== undefined) {
      var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
      var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
      var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

      if (startLoadingHandler) {
        startLoadingHandler(targetElement);
      }

      var loader = void 0;

      if (stackData.preventCache === true) {
        loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
      } else {
        loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
      }

      loader.then(function (image) {
        var viewport = cornerstone.getViewport(targetElement);

        stackData.currentImageIdIndex = newImageIdIndex;
        cornerstone.displayImage(targetElement, image, viewport);
        if (endLoadingHandler) {
          endLoadingHandler(targetElement, image);
        }
      }, function (error) {
        var imageId = stackData.imageIds[newImageIdIndex];

        if (errorLoadingHandler) {
          errorLoadingHandler(targetElement, imageId, error);
        }
      });
    }
  });
}

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    chooseLocation(e);

    e.preventDefault();
    e.stopPropagation();
  }
}

function mouseDragCallback(e) {
  chooseLocation(e);

  e.preventDefault();
  e.stopPropagation();
}

function enable(element, mouseButtonMask, synchronizationContext) {
  (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

  // Clear any currently existing toolData
  (0, _toolState.clearToolState)(element, toolType);

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext
  });

  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);

  element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
}

// Disables the reference line tool for the given element
function disable(element) {
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
}

// Module/private exports
var crosshairs = {
  activate: enable,
  deactivate: disable,
  enable: enable,
  disable: disable
};

function dragEndCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.TOUCH_DRAG, dragCallback);
  element.removeEventListener(_events2.default.TOUCH_DRAG_END, dragEndCallback);
}

function dragStartCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.addEventListener(_events2.default.TOUCH_DRAG, dragCallback);
  element.addEventListener(_events2.default.TOUCH_DRAG_END, dragEndCallback);
  chooseLocation(e);

  return false;
}

function dragCallback(e) {
  chooseLocation(e);

  e.preventDefault();
  e.stopPropagation();
}

function enableTouch(element, synchronizationContext) {
  // Clear any currently existing toolData
  (0, _toolState.clearToolState)(element, toolType);

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext
  });

  element.removeEventListener(_events2.default.TOUCH_START, dragStartCallback);

  element.addEventListener(_events2.default.TOUCH_START, dragStartCallback);
}

// Disables the reference line tool for the given element
function disableTouch(element) {
  element.removeEventListener(_events2.default.TOUCH_START, dragStartCallback);
}

var crosshairsTouch = {
  activate: enableTouch,
  deactivate: disableTouch,
  enable: enableTouch,
  disable: disableTouch
};

exports.crosshairs = crosshairs;
exports.crosshairsTouch = crosshairsTouch;

/***/ }),

/***/ "./imageTools/displayTool.js":
/*!***********************************!*\
  !*** ./imageTools/displayTool.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (onImageRendered) {
  var configuration = {};

  return {
    disable: function disable(element) {
      element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
      element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
      _externalModules2.default.cornerstone.updateImage(element);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/doubleTapTool.js":
/*!*************************************!*\
  !*** ./imageTools/doubleTapTool.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doubleTapCallback) {
  return {
    activate: function activate(element) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, doubleTapCallback);
      element.addEventListener(_events2.default.DOUBLE_TAP, doubleTapCallback);
    },
    disable: function disable(element) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, doubleTapCallback);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, doubleTapCallback);
    },
    deactivate: function deactivate(element) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, doubleTapCallback);
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/doubleTapZoom.js":
/*!*************************************!*\
  !*** ./imageTools/doubleTapZoom.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _doubleTapTool = __webpack_require__(/*! ./doubleTapTool.js */ "./imageTools/doubleTapTool.js");

var _doubleTapTool2 = _interopRequireDefault(_doubleTapTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fitToWindowStrategy(eventData) {
  _externalModules2.default.cornerstone.fitToWindow(eventData.element);
}

function doubleTapCallback(e) {
  var eventData = e.detail;

  doubleTapZoom.strategy(eventData);

  e.preventDefault();
  e.stopPropagation();
}

var doubleTapZoom = (0, _doubleTapTool2.default)(doubleTapCallback);

doubleTapZoom.strategies = {
  default: fitToWindowStrategy
};

doubleTapZoom.strategy = fitToWindowStrategy;

exports.default = doubleTapZoom;

/***/ }),

/***/ "./imageTools/dragProbe.js":
/*!*********************************!*\
  !*** ./imageTools/dragProbe.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragProbeTouch = exports.dragProbe = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _simpleMouseButtonTool = __webpack_require__(/*! ./simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(/*! ./touchDragTool.js */ "./imageTools/touchDragTool.js");

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _getRGBPixels = __webpack_require__(/*! ../util/getRGBPixels.js */ "./util/getRGBPixels.js");

var _getRGBPixels2 = _interopRequireDefault(_getRGBPixels);

var _calculateSUV = __webpack_require__(/*! ../util/calculateSUV.js */ "./util/calculateSUV.js");

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'dragProbe';

var dragEventData = void 0;

function defaultStrategy(eventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var enabledElement = cornerstone.getEnabledElement(eventData.element);

  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = _toolColors2.default.getActiveColor();
  var font = _textStyle2.default.getFont();
  var fontHeight = _textStyle2.default.getFontSize();
  var config = dragProbe.getConfiguration();

  context.save();

  if (config && config.shadow) {
    context.shadowColor = config.shadowColor || '#000000';
    context.shadowOffsetX = config.shadowOffsetX || 1;
    context.shadowOffsetY = config.shadowOffsetY || 1;
  }

  var x = Math.round(eventData.currentPoints.image.x);
  var y = Math.round(eventData.currentPoints.image.y);

  var storedPixels = void 0;
  var text = void 0,
      str = void 0;

  if (x < 0 || y < 0 || x >= eventData.image.columns || y >= eventData.image.rows) {
    return;
  }

  if (eventData.image.color) {
    storedPixels = (0, _getRGBPixels2.default)(eventData.element, x, y, 1, 1);
    text = x + ', ' + y;
    str = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2] + ' A: ' + storedPixels[3];
  } else {
    storedPixels = cornerstone.getStoredPixels(eventData.element, x, y, 1, 1);
    var sp = storedPixels[0];
    var mo = sp * eventData.image.slope + eventData.image.intercept;
    var suv = (0, _calculateSUV2.default)(eventData.image, sp);

    // Draw text
    text = x + ', ' + y;
    str = 'SP: ' + sp + ' MO: ' + parseFloat(mo.toFixed(3));
    if (suv) {
      str += ' SUV: ' + parseFloat(suv.toFixed(3));
    }
  }

  // Draw text
  var coords = {
    // Translate the x/y away from the cursor
    x: eventData.currentPoints.image.x + 3,
    y: eventData.currentPoints.image.y - 3
  };
  var textCoords = cornerstone.pixelToCanvas(eventData.element, coords);

  context.font = font;
  context.fillStyle = color;

  (0, _drawTextBox2.default)(context, str, textCoords.x, textCoords.y + fontHeight + 5, color);
  (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color);
  context.restore();
}

function minimalStrategy(eventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;
  var enabledElement = cornerstone.getEnabledElement(element);
  var image = enabledElement.image;

  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = _toolColors2.default.getActiveColor();
  var font = _textStyle2.default.getFont();
  var config = dragProbe.getConfiguration();

  context.save();

  if (config && config.shadow) {
    context.shadowColor = config.shadowColor || '#000000';
    context.shadowOffsetX = config.shadowOffsetX || 1;
    context.shadowOffsetY = config.shadowOffsetY || 1;
  }

  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var modality = void 0;

  if (seriesModule) {
    modality = seriesModule.modality;
  }

  var toolCoords = void 0;

  if (eventData.isTouchEvent === true) {
    toolCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x, eventData.currentPoints.page.y - _textStyle2.default.getFontSize() * 4);
  } else {
    toolCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x, eventData.currentPoints.page.y - _textStyle2.default.getFontSize() / 2);
  }

  var storedPixels = void 0;
  var text = '';

  if (toolCoords.x < 0 || toolCoords.y < 0 || toolCoords.x >= image.columns || toolCoords.y >= image.rows) {
    return;
  }

  if (image.color) {
    storedPixels = (0, _getRGBPixels2.default)(element, toolCoords.x, toolCoords.y, 1, 1);
    text = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2];
  } else {
    storedPixels = cornerstone.getStoredPixels(element, toolCoords.x, toolCoords.y, 1, 1);
    var sp = storedPixels[0];
    var mo = sp * eventData.image.slope + eventData.image.intercept;

    var modalityPixelValueText = parseFloat(mo.toFixed(2));

    if (modality === 'CT') {
      text += 'HU: ' + modalityPixelValueText;
    } else if (modality === 'PT') {
      text += modalityPixelValueText;
      var suv = (0, _calculateSUV2.default)(eventData.image, sp);

      if (suv) {
        text += ' SUV: ' + parseFloat(suv.toFixed(2));
      }
    } else {
      text += modalityPixelValueText;
    }
  }

  // Prepare text
  var textCoords = cornerstone.pixelToCanvas(element, toolCoords);

  context.font = font;
  context.fillStyle = color;

  // Translate the x/y away from the cursor
  var translation = void 0;
  var handleRadius = 6;
  var width = context.measureText(text).width;

  if (eventData.isTouchEvent === true) {
    translation = {
      x: -width / 2 - 5,
      y: -_textStyle2.default.getFontSize() - 10 - 2 * handleRadius
    };
  } else {
    translation = {
      x: 12,
      y: -(_textStyle2.default.getFontSize() + 10) / 2
    };
  }

  context.beginPath();
  context.strokeStyle = color;
  context.arc(textCoords.x, textCoords.y, handleRadius, 0, 2 * Math.PI);
  context.stroke();

  (0, _drawTextBox2.default)(context, text, textCoords.x + translation.x, textCoords.y + translation.y, color);
  context.restore();
}

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.IMAGE_RENDERED, imageRenderedCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    element.addEventListener(_events2.default.IMAGE_RENDERED, imageRenderedCallback);
    element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
    dragProbe.strategy(eventData);

    e.preventDefault();
    e.stopPropagation();
  }
}

function imageRenderedCallback() {
  if (dragEventData) {
    dragProbe.strategy(dragEventData);
    dragEventData = null;
  }
}

// The strategy can't be execute at this moment because the image is rendered asynchronously
// (requestAnimationFrame). Then the eventData that contains all information needed is being
// Cached and the strategy will be executed once cornerstoneimagerendered is triggered.
function dragCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  dragEventData = eventData;
  _externalModules2.default.cornerstone.updateImage(element);

  e.preventDefault();
  e.stopPropagation();
}

var dragProbe = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);

dragProbe.strategies = {
  default: defaultStrategy,
  minimal: minimalStrategy
};

dragProbe.strategy = defaultStrategy;

var options = {
  fireOnTouchStart: true
};

var dragProbeTouch = (0, _touchDragTool2.default)(dragCallback, toolType, options);

exports.dragProbe = dragProbe;
exports.dragProbeTouch = dragProbeTouch;

/***/ }),

/***/ "./imageTools/ellipticalRoi.js":
/*!*************************************!*\
  !*** ./imageTools/ellipticalRoi.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ellipticalRoiTouch = exports.ellipticalRoi = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _drawEllipse = __webpack_require__(/*! ../util/drawEllipse.js */ "./util/drawEllipse.js");

var _drawEllipse2 = _interopRequireDefault(_drawEllipse);

var _pointInEllipse = __webpack_require__(/*! ../util/pointInEllipse.js */ "./util/pointInEllipse.js");

var _pointInEllipse2 = _interopRequireDefault(_pointInEllipse);

var _calculateEllipseStatistics = __webpack_require__(/*! ../util/calculateEllipseStatistics.js */ "./util/calculateEllipseStatistics.js");

var _calculateEllipseStatistics2 = _interopRequireDefault(_calculateEllipseStatistics);

var _calculateSUV = __webpack_require__(/*! ../util/calculateSUV.js */ "./util/calculateSUV.js");

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'ellipticalRoi';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    invalidated: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function pointNearEllipse(element, data, coords, distance) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var minorEllipse = {
    left: Math.min(startCanvas.x, endCanvas.x) + distance / 2,
    top: Math.min(startCanvas.y, endCanvas.y) + distance / 2,
    width: Math.abs(startCanvas.x - endCanvas.x) - distance,
    height: Math.abs(startCanvas.y - endCanvas.y) - distance
  };

  var majorEllipse = {
    left: Math.min(startCanvas.x, endCanvas.x) - distance / 2,
    top: Math.min(startCanvas.y, endCanvas.y) - distance / 2,
    width: Math.abs(startCanvas.x - endCanvas.x) + distance,
    height: Math.abs(startCanvas.y - endCanvas.y) + distance
  };

  var pointInMinorEllipse = (0, _pointInEllipse2.default)(minorEllipse, coords);
  var pointInMajorEllipse = (0, _pointInEllipse2.default)(majorEllipse, coords);

  if (pointInMajorEllipse && !pointInMinorEllipse) {
    return true;
  }

  return false;
}

function pointNearTool(element, data, coords) {
  return pointNearEllipse(element, data, coords, 15);
}

function pointNearToolTouch(element, data, coords) {
  return pointNearEllipse(element, data, coords, 25);
}

function numberWithCommas(x) {
  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  var parts = x.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var image = eventData.image;
  var element = eventData.element;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = ellipticalRoi.getConfiguration();
  var context = eventData.canvasContext.canvas.getContext('2d');
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var imagePlane = cornerstone.metaData.get('imagePlaneModule', image.imageId);
  var modality = void 0;
  var rowPixelSpacing = void 0;
  var colPixelSpacing = void 0;

  if (imagePlane) {
    if(isNaN(imagePlane.rowPixelSpacing) || isNaN(imagePlane.columnPixelSpacing)){
	  rowPixelSpacing = image.rowPixelSpacing;
	  colPixelSpacing = image.columnPixelSpacing;
	}else{
	  rowPixelSpacing = imagePlane.rowPixelSpacing || imagePlane.rowImagePixelSpacing;
	  colPixelSpacing = imagePlane.columnPixelSpacing || imagePlane.colImagePixelSpacing;
	} 
  } else {
	  rowPixelSpacing = image.rowPixelSpacing;
	  colPixelSpacing = image.columnPixelSpacing;
  }


  if (seriesModule) {
    modality = seriesModule.modality;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);

  // If we have tool data for this element - iterate over each set and draw it
  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    // Apply any shadow settings defined in the tool configuration
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    // Check which color the rendered tool should be
    var color = _toolColors2.default.getColorIfActive(data.active);

    // Convert Image coordinates to Canvas coordinates given the element
    var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

    // Retrieve the bounds of the ellipse (left, top, width, and height)
    // In Canvas coordinates
    var leftCanvas = Math.min(handleStartCanvas.x, handleEndCanvas.x);
    var topCanvas = Math.min(handleStartCanvas.y, handleEndCanvas.y);
    var widthCanvas = Math.abs(handleStartCanvas.x - handleEndCanvas.x);
    var heightCanvas = Math.abs(handleStartCanvas.y - handleEndCanvas.y);

    // Draw the ellipse on the canvas
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    (0, _drawEllipse2.default)(context, leftCanvas, topCanvas, widthCanvas, heightCanvas);
    context.closePath();

    // If the tool configuration specifies to only draw the handles on hover / active,
    // Follow this logic
    if (config && config.drawHandlesOnHover) {
      // Draw the handles if the tool is active
      if (data.active === true) {
        (0, _drawHandles2.default)(context, eventData, data.handles, color);
      } else {
        // If the tool is inactive, draw the handles only if each specific handle is being
        // Hovered over
        var handleOptions = {
          drawHandlesIfActive: true
        };

        (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);
      }
    } else {
      // If the tool has no configuration settings, always draw the handles
      (0, _drawHandles2.default)(context, eventData, data.handles, color);
    }

    // Define variables for the area and mean/standard deviation
    var area = void 0,
        meanStdDev = void 0,
        meanStdDevSUV = void 0;

    // Perform a check to see if the tool has been invalidated. This is to prevent
    // Unnecessary re-calculation of the area, mean, and standard deviation if the
    // Image is re-rendered but the tool has not moved (e.g. during a zoom)
    if (data.invalidated === false) {
      // If the data is not invalidated, retrieve it from the toolData
      meanStdDev = data.meanStdDev;
      meanStdDevSUV = data.meanStdDevSUV;
      area = data.area;
    } else {
      // If the data has been invalidated, we need to calculate it again

      // Retrieve the bounds of the ellipse in image coordinates
      var ellipse = {
        left: Math.round(Math.min(data.handles.start.x, data.handles.end.x)),
        top: Math.round(Math.min(data.handles.start.y, data.handles.end.y)),
        width: Math.round(Math.abs(data.handles.start.x - data.handles.end.x)),
        height: Math.round(Math.abs(data.handles.start.y - data.handles.end.y))
      };

      // First, make sure this is not a color image, since no mean / standard
      // Deviation will be calculated for color images.
      if (!image.color) {
        // Retrieve the array of pixels that the ellipse bounds cover
        var pixels = cornerstone.getPixels(element, ellipse.left, ellipse.top, ellipse.width, ellipse.height);

        // Calculate the mean & standard deviation from the pixels and the ellipse details
        meanStdDev = (0, _calculateEllipseStatistics2.default)(pixels, ellipse);

        if (modality === 'PT') {
          // If the image is from a PET scan, use the DICOM tags to
          // Calculate the SUV from the mean and standard deviation.

          // Note that because we are using modality pixel values from getPixels, and
          // The calculateSUV routine also rescales to modality pixel values, we are first
          // Returning the values to storedPixel values before calcuating SUV with them.
          // TODO: Clean this up? Should we add an option to not scale in calculateSUV?
          meanStdDevSUV = {
            mean: (0, _calculateSUV2.default)(image, (meanStdDev.mean - image.intercept) / image.slope),
            stdDev: (0, _calculateSUV2.default)(image, (meanStdDev.stdDev - image.intercept) / image.slope)
          };
        }

        // If the mean and standard deviation values are sane, store them for later retrieval
        if (meanStdDev && !isNaN(meanStdDev.mean)) {
          data.meanStdDev = meanStdDev;
          data.meanStdDevSUV = meanStdDevSUV;
        }
      }

      // Calculate the image area from the ellipse dimensions and pixel spacing
      area = Math.PI * (ellipse.width * (colPixelSpacing || 1) / 2) * (ellipse.height * (rowPixelSpacing || 1) / 2);

      // If the area value is sane, store it for later retrieval
      if (!isNaN(area)) {
        data.area = area;
      }

      // Set the invalidated flag to false so that this data won't automatically be recalculated
      data.invalidated = false;
    }

    // Define an array to store the rows of text for the textbox
    var textLines = [];

    // If the mean and standard deviation values are present, display them
    if (meanStdDev && meanStdDev.mean !== undefined) {
      // If the modality is CT, add HU to denote Hounsfield Units
      var moSuffix = '';

      if (modality === 'CT') {
        moSuffix = ' HU';
      }

      // Create a line of text to display the mean and any units that were specified (i.e. HU)
      var meanText = 'Mean: ' + numberWithCommas(meanStdDev.mean.toFixed(2)) + moSuffix;
      // Create a line of text to display the standard deviation and any units that were specified (i.e. HU)
      var stdDevText = 'StdDev: ' + numberWithCommas(meanStdDev.stdDev.toFixed(2)) + moSuffix;

      // If this image has SUV values to display, concatenate them to the text line
      if (meanStdDevSUV && meanStdDevSUV.mean !== undefined) {
        var SUVtext = ' SUV: ';

        meanText += SUVtext + numberWithCommas(meanStdDevSUV.mean.toFixed(2));
        stdDevText += SUVtext + numberWithCommas(meanStdDevSUV.stdDev.toFixed(2));
      }

      // Add these text lines to the array to be displayed in the textbox
      textLines.push(meanText);
      textLines.push(stdDevText);
    }

    // If the area is a sane value, display it
    if (area) {
      // Determine the area suffix based on the pixel spacing in the image.
      // If pixel spacing is present, use millimeters. Otherwise, use pixels.
      // This uses Char code 178 for a superscript 2
      var suffix = ' mm' + String.fromCharCode(178);

      if (!rowPixelSpacing || !colPixelSpacing) {
        suffix = ' pixels' + String.fromCharCode(178);
      }

      // Create a line of text to display the area and its units
      var areaText = 'Area: ' + numberWithCommas(area.toFixed(2)) + suffix;

      // Add this text line to the array to be displayed in the textbox
      textLines.push(areaText);
    }

    // If the textbox has not been moved by the user, it should be displayed on the right-most
    // Side of the tool.
    if (!data.handles.textBox.hasMoved) {
      // Find the rightmost side of the ellipse at its vertical center, and place the textbox here
      // Note that this calculates it in image coordinates
      data.handles.textBox.x = Math.max(data.handles.start.x, data.handles.end.x);
      data.handles.textBox.y = (data.handles.start.y + data.handles.end.y) / 2;
    }

    // Convert the textbox Image coordinates into Canvas coordinates
    var textCoords = cornerstone.pixelToCanvas(element, data.handles.textBox);

    // Set options for the textbox drawing function
    var options = {
      centering: {
        x: false,
        y: true
      }
    };

    // Draw the textbox and retrieves it's bounding box for mouse-dragging and highlighting
    var boundingBox = (0, _drawTextBox2.default)(context, textLines, textCoords.x, textCoords.y, color, options);

    // Store the bounding box data in the handle for mouse-dragging and highlighting
    data.handles.textBox.boundingBox = boundingBox;

    // If the textbox has moved, we would like to draw a line linking it with the tool
    // This section decides where to draw this line to on the Ellipse based on the location
    // Of the textbox relative to the ellipse.
    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between tool and text

      // The initial link position is at the center of the
      // Textbox.
      var link = {
        start: {},
        end: {
          x: textCoords.x,
          y: textCoords.y
        }
      };

      // First we calculate the ellipse points (top, left, right, and bottom)
      var ellipsePoints = [{
        // Top middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas
      }, {
        // Left middle point of ellipse
        x: leftCanvas,
        y: topCanvas + heightCanvas / 2
      }, {
        // Bottom middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas + heightCanvas
      }, {
        // Right middle point of ellipse
        x: leftCanvas + widthCanvas,
        y: topCanvas + heightCanvas / 2
      }];

      // We obtain the link starting point by finding the closest point on the ellipse to the
      // Center of the textbox
      link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(ellipsePoints, link.end);

      // Next we calculate the corners of the textbox bounding box
      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      // Now we recalculate the link endpoint by identifying which corner of the bounding box
      // Is closest to the start point we just calculated.
      link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      // Finally we draw the dashed linking line
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var ellipticalRoi = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var ellipticalRoiTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearToolTouch,
  toolType: toolType
});

exports.ellipticalRoi = ellipticalRoi;
exports.ellipticalRoiTouch = ellipticalRoiTouch;

/***/ }),

/***/ "./imageTools/freehand.js":
/*!********************************!*\
  !*** ./imageTools/freehand.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.freehand = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _handleActivator = __webpack_require__(/*! ../manipulators/handleActivator.js */ "./manipulators/handleActivator.js");

var _handleActivator2 = _interopRequireDefault(_handleActivator);

var _pointInsideBoundingBox = __webpack_require__(/*! ../util/pointInsideBoundingBox.js */ "./util/pointInsideBoundingBox.js");

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _freeHandArea = __webpack_require__(/*! ../util/freeHandArea.js */ "./util/freeHandArea.js");

var _freeHandArea2 = _interopRequireDefault(_freeHandArea);

var _calculateFreehandStatistics = __webpack_require__(/*! ../util/calculateFreehandStatistics.js */ "./util/calculateFreehandStatistics.js");

var _calculateFreehandStatistics2 = _interopRequireDefault(_calculateFreehandStatistics);

var _freeHandIntersect = __webpack_require__(/*! ../util/freeHandIntersect.js */ "./util/freeHandIntersect.js");

var _calculateSUV = __webpack_require__(/*! ../util/calculateSUV.js */ "./util/calculateSUV.js");

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'freehand';
var configuration = {
  mouseLocation: {
    handles: {
      start: {
        highlight: true,
        active: true
      }
    }
  },
  freehand: false,
  modifying: false,
  movingTextBox: false,
  textboxHasMoved: false,
  currentHandle: 0,
  currentTool: -1
};

function createNewMeasurement() {
  // Create the measurement data for this tool
  var measurementData = {
    visible: true,
    active: true,
    invalidated: true,
    handles: [],
    textBox: {
      active: false,
      hasMoved: false,
      movesIndependently: false,
      drawnIndependently: true,
      allowedOutsideImage: true,
      hasBoundingBox: true
    }
  };

  return measurementData;
}

// /////// BEGIN ACTIVE TOOL ///////
function addPoint(eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData === undefined) {
    return;
  }

  var config = freehand.getConfiguration();

  // Get the toolData from the last-drawn drawing
  // (this should change when modification is added)
  var data = toolData.data[config.currentTool];

  var handleData = {
    x: eventData.currentPoints.image.x,
    y: eventData.currentPoints.image.y,
    highlight: true,
    active: true,
    lines: []
  };

  // If this is not the first handle
  if (data.handles.length) {
    if (isValidNode(handleData, data.handles)) {
    	console.log(config,data,21212121);
      // Add the line from the current handle to the new handle
      data.handles[config.currentHandle - 1].lines.push(eventData.currentPoints.image);
    } else {
      return false;
    }
  }

  // Add the new handle
  data.handles.push(handleData);

  // Increment the current handle value
  config.currentHandle += 1;

  // Reset freehand value
  config.freehand = false;

  // Force onImageRendered to fire
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}
function pointNearLine(eventData, toolData, toolIndex){
//	console.log("lineCheck-pointNearLine",toolData);
	if (toolData.visible === false) {
    return false;
  }
	var cornerstone = _externalModules2.default.cornerstone;
	var element = eventData.element;
	var dataArr = toolData.data[toolIndex];
	var coords = eventData.currentPoints.canvas;
//	console.log(dataArr, coords, 1212);
	// TODO 循环点点进行判断是不是相交于线
//	for (var i = 0; i < dataArr.length; i++) {
		var data = dataArr;
		var linesArr = [];
		var pointToLineArr = [];
		for (var j = 0; j < data.handles.length; j++) {
			if(j == data.handles.length-1){
				var startPoint = data.handles[data.handles.length-1];
				var endPoint = data.handles[0]
			}else{
				var startPoint = data.handles[j];
				var endPoint = data.handles[j+1]
			}
			var line = {
				start: cornerstone.pixelToCanvas(element, startPoint),
				end: cornerstone.pixelToCanvas(element, endPoint)
			}
			linesArr.push(line);
		}
		//console.log(linesArr, 123123123);
		for (var k = 0; k < linesArr.length; k++) {
			var distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(linesArr[k],coords);
			pointToLineArr.push(distanceToPoint);
		}
		var minDistance = Math.min.apply(Math, pointToLineArr);
		if(minDistance < 5){
			console.log("hoverLine")
			return {
				handleNearby: data,
				toolIndex: toolIndex
			}
		}
//		console.log(minDistance,"minDistance",data);
//	}
	return undefined;
}
function pointNearLineActive(eventData, toolData){
//	console.log("lineCheck-pointNearLineActive",toolData);
	let imageNeedsUpdate = false; 
	if (toolData.visible === false) {
    return false;
  }
	var cornerstone = _externalModules2.default.cornerstone;
	var element = eventData.element;
	var dataArr = toolData.data;
	var coords = eventData.currentPoints.canvas;
//	console.log(dataArr, coords, 1212);
	// TODO 循环点点进行判断是不是相交于线
	for (var i = 0; i < dataArr.length; i++) {
		var data = dataArr[i];
		var linesArr = [];
		var pointToLineArr = [];
		for (var j = 0; j < data.handles.length; j++) {
			if(j == data.handles.length-1){
				var startPoint = data.handles[data.handles.length-1];
				var endPoint = data.handles[0]
			}else{
				var startPoint = data.handles[j];
				var endPoint = data.handles[j+1]
			}
			var line = {
				start: cornerstone.pixelToCanvas(element, startPoint),
				end: cornerstone.pixelToCanvas(element, endPoint)
			}
			linesArr.push(line);
		}
		//console.log(linesArr, 123123123);
		for (var k = 0; k < linesArr.length; k++) {
			var distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(linesArr[k],coords);
			pointToLineArr.push(distanceToPoint);
		}
		var minDistance = Math.min.apply(Math, pointToLineArr);
		if(((minDistance < 5) && !data.active) || (!(minDistance < 5) && data.active)){
        data.active = !data.active;
        imageNeedsUpdate = true;
		}
//		console.log(minDistance,"minDistance",data);
	}
	return imageNeedsUpdate;
}
function pointNearTool(eventData, toolIndex) {
  var isPointNearTool = pointNearHandle(eventData, toolIndex);
//	console.log(isPointNearTool,11111);
  // JPETTS - if returns index 0, set true (fails first condition as 0 is falsy).
  if (isPointNearTool || isPointNearTool === 0) {
    return true;
  }

  return false;
}

function pointNearHandle(eventData, toolIndex) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData === undefined) {
    return;
  }

  var data = toolData.data[toolIndex];

  if (data.handles === undefined) {
    return;
  }

  if (data.visible === false) {
    return false;
  }

  var mousePoint = eventData.currentPoints.canvas;
//console.log(toolIndex,"pointNearHandle");
  for (var i = 0; i < data.handles.length; i++) {
    var handleCanvas = _externalModules2.default.cornerstone.pixelToCanvas(eventData.element, data.handles[i]);

    if (_externalModules2.default.cornerstoneMath.point.distance(handleCanvas, mousePoint) < 5) {
      return i;
    }
  }
	var lineNearBy = pointNearLine(eventData,toolData,toolIndex)
	if(lineNearBy !== undefined){
//		console.log("nearLine",12340000);
		return lineNearBy;
	}
  // Check to see if mouse in bounding box of textbox
  if (data.textBox) {
    if ((0, _pointInsideBoundingBox2.default)(data.textBox, mousePoint)) {
      return data.textBox;
    }
  }

  return;
}

function pointNearHandleAllTools(eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  var handleNearby = void 0;
	
  for (var toolIndex = 0; toolIndex < toolData.data.length; toolIndex++) {
    handleNearby = pointNearHandle(eventData, toolIndex);
//  console.log(handleNearby,"check what status",123123);
    if (handleNearby !== undefined) {
      if(handleNearby.hasOwnProperty("toolIndex")){
      	//边
      	console.log("line");
      	return handleNearby;
      }else{
      	console.log("dot or textBox");
      	return {
	        handleNearby: handleNearby,
	        toolIndex: toolIndex
	      };
      }
    }
  }
}

// --- Drawing loop ---
// On first click, add point
// After first click, on mouse move, record location
// If mouse comes close to previous point, snap to it
// On next click, add another point -- continuously
// On each click, if it intersects with a current point, end drawing loop

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);

  // Check if drawing is finished
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData === undefined) {
    return;
  }

  var config = freehand.getConfiguration();
//	console.log(config,"1212121212");
  if (config.movingTextBox === true) {
    // Place textBox
    config.movingTextBox = false;
    config.textboxHasMoved = false;
    // Reset the current handle
    toolData.data[config.currentTool].invalidated = false;
    config.currentHandle = 0;
    config.currentTool = -1;
    element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);

    return;
  }

  if (!eventData.event.shiftKey) {
    config.freehand = false;
  }

  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function mouseMoveCallback(e) {
  var eventData = e.detail;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);
  if (!toolData) {
    return;
  }
  var config = freehand.getConfiguration();
  var currentTool = config.currentTool;

//	console.log("mousemove",config);
  // Tool inactive and passively watching for mouse over
  if (currentTool < 0) {
//	console.log("mousemove121212");
  	// 检查边是否存在交集
  	var imageNeedsUpdateLine = pointNearLineActive(eventData,toolData);

    if (!imageNeedsUpdateLine) {
    	return;
    }
//  console.log("12312313");
  } else {
	    // Tool active
	    var data = toolData.data[currentTool];
	    var currentHandle = config.currentHandle;
	
	    // Set the mouseLocation handle
	    getMouseLocation(eventData);
	
	    if (config.modifying) {
	      // Move the handle
	      data.active = true;
	      data.highlight = true;
	      data.handles[currentHandle].x = config.mouseLocation.handles.start.x;
	      data.handles[currentHandle].y = config.mouseLocation.handles.start.y;
	      var neighbourIndex = currentHandle === 0 ? data.handles.length - 1 : currentHandle - 1;
	      var lastLineIndex = data.handles[neighbourIndex].lines.length - 1;
	      var lastLine = data.handles[neighbourIndex].lines[lastLineIndex];
	
	      lastLine.x = config.mouseLocation.handles.start.x;
	      lastLine.y = config.mouseLocation.handles.start.y;
	    }
	
	    if (config.freehand) {
	      // JPETTS - Note: currently disabled
	      data.handles[currentHandle - 1].lines.push(eventData.currentPoints.image);
	    } else {
	      // No snapping in freehand mode
	      var handleNearby = pointNearHandle(eventData, config.currentTool);
	
	      // If there is a handle nearby to snap to
	      // (and it's not the actual mouse handle)
	      if (handleNearby !== undefined && !handleNearby.hasBoundingBox && handleNearby < data.handles.length - 1) {
	        config.mouseLocation.handles.start.x = data.handles[handleNearby].x;
	        config.mouseLocation.handles.start.y = data.handles[handleNearby].y;
	      }
	    }
	    if(config.movingTextBox && !config.textboxHasMoved){
	    	data.active = false;
		    // Place textBox
		    config.movingTextBox = false;
		    config.textboxHasMoved = false;
		    // Reset the current handle
		    toolData.data[config.currentTool].invalidated = false;
		    config.currentHandle = 0;
		    config.currentTool = -1;
		    eventData.element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
	    }
  }

  // Force onImageRendered
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function mouseDragCallback(e) {
  var eventData = e.detail;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  var config = freehand.getConfiguration();
  var currentTool = config.currentTool;

  // Check if the tool is active
  if (currentTool >= 0) {
    // Set the mouseLocation handle
    getMouseLocation(eventData);

    var currentHandle = config.currentHandle;

    if (config.movingTextBox) {
      // Move the textBox
      currentHandle.hasMoved = true;
      currentHandle.movingTextBox = true;
      currentHandle.x = config.mouseLocation.handles.start.x;
      currentHandle.y = config.mouseLocation.handles.start.y;
    }
  }

  // Update the image
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function startDrawing(eventData) {
  var element = eventData.element;

  element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
  element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);

  var measurementData = createNewMeasurement();

  var config = freehand.getConfiguration();

  config.mouseLocation.handles.start.x = eventData.currentPoints.image.x;
  config.mouseLocation.handles.start.y = eventData.currentPoints.image.y;

  (0, _toolState.addToolState)(eventData.element, toolType, measurementData);

  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  config.currentTool = toolData.data.length - 1;
}

function endDrawing(eventData, handleNearby) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);
//	console.log(1212,toolData)
  if (!toolData) {
    return;
  }

  var config = freehand.getConfiguration();
  
  var data = toolData.data[config.currentTool];

  data.active = false;
  data.highlight = false;

  // Connect the end node to the origin node
  if (handleNearby !== undefined) {
    data.handles[config.currentHandle - 1].lines.push(data.handles[0]);
  }

  if (config.modifying) {
    config.modifying = false;
    data.invalidated = true;
  }

  // Reset the current handle
  config.currentHandle = 0;
  config.currentTool = -1;

  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function isValidNode(newHandle, dataHandles) {
  return !(0, _freeHandIntersect.freeHandIntersect)(newHandle, dataHandles);
}

function mouseHover(eventData, toolData) {
  // Check if user is mousing over a point
  var imageNeedsUpdate = false;
  for (var i = 0; i < toolData.data.length; i++) {
    // Get the cursor position in canvas coordinates
    var coords = eventData.currentPoints.canvas;
    var data = toolData.data[i];

    if ((0, _handleActivator2.default)(eventData.element, data.handles, coords) === true) {
      imageNeedsUpdate = true;
    }

    if (pointNearTool(eventData, i) && !data.active || !pointNearTool(eventData, i) && data.active) {
      if (!data.lockedForEditing) {
        data.active = !data.active;
        imageNeedsUpdate = true;
      }
    }

    if (data.textBox === true) {
      if ((0, _pointInsideBoundingBox2.default)(data.textBox, coords)) {
        data.active = !data.active;
        data.highlight = !data.highlight;
        imageNeedsUpdate = true;
      }
    }
  }

  return imageNeedsUpdate;
}

function getMouseLocation(eventData) {
  // Set the mouseLocation handle
  var config = freehand.getConfiguration();
  var x = Math.max(eventData.currentPoints.image.x, 0);
  var y = Math.max(eventData.currentPoints.image.y, 0);

  x = Math.min(x, eventData.image.width);
  config.mouseLocation.handles.start.x = x;

  y = Math.min(y, eventData.image.height);
  config.mouseLocation.handles.start.y = y;
}

function freeHandMoveAllHandles(e, data, toolData, toolType, options, doneMovingCallback){
  const cornerstone = _externalModules2.default.cornerstone;
  const mouseEventData = e.detail;
  const element = mouseEventData.element;
	const image = e.detail.image;
  function mouseDragCallback (e) {
    const eventData = e.detail;

    data.active = true;

    Object.keys(data.handles).forEach(function (name) {
      const handle = data.handles[name];

      if (handle.movesIndependently === true) {
        return;
      }

      handle.x += eventData.deltaPoints.image.x;
      handle.y += eventData.deltaPoints.image.y;

      if (options.preventHandleOutsideImage === true) {
        handle.x = Math.max(handle.x, 0);
        handle.x = Math.min(handle.x, eventData.image.width);

        handle.y = Math.max(handle.y, 0);
        handle.y = Math.min(handle.y, eventData.image.height);
      }
    });
    
    //重新计算线段的位置
    for (var i = 0; i < data.handles.length; i++) {
    	if(i == data.handles.length - 1){
    		data.handles[i].lines = [{x: data.handles[0].x, y: data.handles[0].y}];
    	}else{
    		data.handles[i].lines = [{x: data.handles[i+1].x, y: data.handles[i+1].y}];
    	}
    	
    }
//  data.invalidated = true;
//  data.freehandUp = false;


///////////
		  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
		  var modality = void 0;
		
		  if (seriesModule) {
		    modality = seriesModule.modality;
		  }
			var area = void 0,
        meanStdDev = void 0,
        meanStdDevSUV = void 0;
      var bounds = {
        left: data.handles[0].x,
        right: data.handles[0].x,
        bottom: data.handles[0].y,
        top: data.handles[0].x
      };

      for (var _i = 0; _i < data.handles.length; _i++) {
        bounds.left = Math.min(bounds.left, data.handles[_i].x);
        bounds.right = Math.max(bounds.right, data.handles[_i].x);
        bounds.bottom = Math.min(bounds.bottom, data.handles[_i].y);
        bounds.top = Math.max(bounds.top, data.handles[_i].y);
      }

      var polyBoundingBox = {
        left: bounds.left,
        top: bounds.bottom,
        width: Math.abs(bounds.right - bounds.left),
        height: Math.abs(bounds.top - bounds.bottom)
      };

      // Store the bounding box information for the text box
      data.polyBoundingBox = polyBoundingBox;
      // First, make sure this is not a color image, since no mean / standard
      // Deviation will be calculated for color images.
      if (!image.color) {
        // Retrieve the array of pixels that the ROI bounds cover
        var pixels = cornerstone.getPixels(element, polyBoundingBox.left, polyBoundingBox.top, polyBoundingBox.width, polyBoundingBox.height);
				console.log(pixels.length,"pixels");
        // Calculate the mean & standard deviation from the pixels and the object shape
        meanStdDev = (0, _calculateFreehandStatistics2.default)(pixels, polyBoundingBox, data.handles);
				console.log(meanStdDev,"meanStdDev");
        if (modality === 'PT') {
          meanStdDevSUV = {
            mean: (0, _calculateSUV2.default)(image, (meanStdDev.mean - image.intercept) / image.slope),
            stdDev: (0, _calculateSUV2.default)(image, (meanStdDev.stdDev - image.intercept) / image.slope)
          };
        }


        if (meanStdDev && !isNaN(meanStdDev.mean)) {
          var meanStdDevTemp = JSON.stringify(meanStdDev);
          var meanStdDevSUVTemp = meanStdDevSUV ? JSON.stringify(meanStdDevSUV) : meanStdDevSUV;
          data.meanStdDev = JSON.parse(meanStdDevTemp);
          data.meanStdDevSUV = meanStdDevSUVTemp ? JSON.parse(meanStdDevSUVTemp) : meanStdDevSUVTemp;
        }
      }
///////////
    cornerstone.updateImage(element);

    const eventType = _events2.default.MEASUREMENT_MODIFIED;
//  const modifiedEventData = {
//    toolType,
//    element,
//    measurementData: data
//  };

//  (0, _triggerEvent2.default)(element, eventType, modifiedEventData);

    e.preventDefault();
    e.stopPropagation();
  }

  element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);

  function mouseUpCallback (e) {
    const eventData = e.detail;

    data.invalidated = true;
    element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
    element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);

    // If any handle is outside the image, delete the tool data
    if (options.deleteIfHandleOutsideImage === true && (0, _anyHandlesOutsideImage.default)(eventData, data.handles)) {
      (0, _toolState.removeToolState)(element, toolType, data);
    }

//  cornerstone.updateImage(element);
		console.log(111111111222222);
    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback(data);
    }
  }

  element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  return true;
}
function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    var toolData = (0, _toolState.getToolState)(eventData.element, toolType);
    var handleNearby = void 0,
        toolIndex = void 0;
    var config = freehand.getConfiguration();
    var currentTool = config.currentTool;

    function freeHandMoveAllHandlesCallback(data){
//  	element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    	console.log('dddddd',data);
    	data.invalidated = true;
    	data.freehandUp = true;
			_externalModules2.default.cornerstone.updateImage(element);
    }
    if (config.modifying) {
      // Don't allow the line being modified to intersect other lines
      if (!(0, _freeHandIntersect.freeHandIntersectModify)(toolData.data[currentTool].handles, config.currentHandle)) {
        endDrawing(eventData);
      }

      return;
    }

    if (currentTool < 0) {
      var nearby = pointNearHandleAllTools(eventData);
      if (nearby) {
//    	console.log(nearby.handleNearby,"00000000");
        handleNearby = nearby.handleNearby;
        toolIndex = nearby.toolIndex;
        // This means the user clicked on the textBox
        if (handleNearby.hasBoundingBox) {
        	console.log("clicked on the textBox",toolData.data[nearby.toolIndex]);
          element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
          element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
          config.movingTextBox = true;
          config.currentHandle = handleNearby;
          config.currentTool = toolIndex;
					toolData.data[nearby.toolIndex]["active"] = true;
					_externalModules2.default.cornerstone.updateImage(element);
          return false;
        }
        // This means the user is trying to modify a point or move lines
        if (handleNearby !== undefined) {
          if(handleNearby.handles){
          	console.log(handleNearby.handles,"lineMove");
          	var opt = {
				      deleteIfHandleOutsideImage: true,
				      preventHandleOutsideImage: false
				    };
          	freeHandMoveAllHandles(e, handleNearby, toolData, "freehand", opt, freeHandMoveAllHandlesCallback);
          	return;
          }else{
          	element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
	          element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
	          config.modifying = true;
	          config.currentHandle = handleNearby;
	          config.currentTool = toolIndex;
          }
        }
      } else {
      	console.log("1111111111");
        startDrawing(eventData);
        addPoint(eventData);
      }
    } else if (currentTool >= 0 && toolData.data[currentTool].active) {
      handleNearby = pointNearHandle(eventData, currentTool);
      var lastNodeID = toolData.data[currentTool].handles.length - 1;

      // Snap if click registered on origin node or on last node placed
      if ((handleNearby === 0 || handleNearby === lastNodeID) && !(0, _freeHandIntersect.freeHandIntersectEnd)(toolData.data[currentTool].handles)) {
		if(config.currentHandle <= 2){
		  return;
		}
        endDrawing(eventData, handleNearby);
      } else if (eventData.event.shiftKey) {
        config.freehand = true;
        toolData.data[currentTool].textBox.freehand = true;
      } else if (handleNearby === undefined) {
        addPoint(eventData);
      } else {
        // Do not allow user to add point to previous point if not origin node.
        return false;
      }
    }

    // JPETTS Note: removed freehand shiftclick pencil mode, as it is not
    // Useful for accurate ROI outlining and cannot easily generalise to calculate the statistics.

    e.preventDefault();
    e.stopPropagation();
  }
}

// /////// END ACTIVE TOOL ///////

function numberWithCommas(x) {
  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  var parts = x.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var image = eventData.image;
  var element = eventData.element;
  var config = freehand.getConfiguration();
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var modality = void 0;

  if (seriesModule) {
    modality = seriesModule.modality;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var fillColor = _toolColors2.default.getFillColor();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }
//		console.log(data.active,"23230002323000");
    if (data.active) {
      color = _toolColors2.default.getActiveColor();
      fillColor = _toolColors2.default.getFillColor();
    } else {
      color = _toolColors2.default.getToolColor();
      fillColor = _toolColors2.default.getToolColor();
    }

    var handleStart = void 0;
//		console.log("11111111111111",data.handles);
    if (data.handles.length) {
      for (var j = 0; j < data.handles.length; j++) {
        // Draw a line between handle j and j+1
        handleStart = data.handles[j];
        var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, handleStart);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.moveTo(handleStartCanvas.x, handleStartCanvas.y);

        for (var k = 0; k < data.handles[j].lines.length; k++) {
          var lineCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles[j].lines[k]);

          context.lineTo(lineCanvas.x, lineCanvas.y);
          context.stroke();
        }

        var mouseLocationCanvas = cornerstone.pixelToCanvas(eventData.element, config.mouseLocation.handles.start);

        if (j === data.handles.length - 1) {
          if (!data.polyBoundingBox) {
            // If it's still being actively drawn, keep the last line to
            // The mouse location
            context.lineTo(mouseLocationCanvas.x, mouseLocationCanvas.y);
            context.stroke();
          }
        }
      }
    }

    // If the tool is active, draw a handle at the cursor location
    var options = {
      fill: fillColor,
      freehandHandleRadius : 1
    };

    if (data.active && !data.polyBoundingBox) {
      (0, _drawHandles2.default)(context, eventData, config.mouseLocation.handles, color, options);
    }
    // Draw the handles
    (0, _drawHandles2.default)(context, eventData, data.handles, color, options);

    // Define variables for the area and mean/standard deviation
    var area = void 0,
        meanStdDev = void 0,
        meanStdDevSUV = void 0;

    // Perform a check to see if the tool has been invalidated. This is to prevent
    // Unnecessary re-calculation of the area, mean, and standard deviation if the
    // Image is re-rendered but the tool has not moved (e.g. during a zoom)
    console.log(data.invalidated,!data.active,data.freehandUp,"invalidated");
    if (data.invalidated === false || data.freehandUp) {
      // If the data is not invalidated, retrieve it from the toolData
      meanStdDev = data.meanStdDev;
      meanStdDevSUV = data.meanStdDevSUV;
      area = data.area;
      data.freehandUp = false;
    } else if (!data.active) {
      // If the data has been invalidated, and the tool is not currently active,
      // We need to calculate it again.

      // Retrieve the bounds of the ROI in image coordinates
      var bounds = {
        left: data.handles[0].x,
        right: data.handles[0].x,
        bottom: data.handles[0].y,
        top: data.handles[0].x
      };

      for (var _i = 0; _i < data.handles.length; _i++) {
        bounds.left = Math.min(bounds.left, data.handles[_i].x);
        bounds.right = Math.max(bounds.right, data.handles[_i].x);
        bounds.bottom = Math.min(bounds.bottom, data.handles[_i].y);
        bounds.top = Math.max(bounds.top, data.handles[_i].y);
      }

      var polyBoundingBox = {
        left: bounds.left,
        top: bounds.bottom,
        width: Math.abs(bounds.right - bounds.left),
        height: Math.abs(bounds.top - bounds.bottom)
      };
      console.log('2222222meanStdDev',meanStdDev)

      // Store the bounding box information for the text box
      data.polyBoundingBox = polyBoundingBox;
			console.log(data.polyBoundingBox,"polyBoundingBox");
      // First, make sure this is not a color image, since no mean / standard
      // Deviation will be calculated for color images.
      if (!image.color) {
        // Retrieve the array of pixels that the ROI bounds cover
        var pixels = cornerstone.getPixels(element, polyBoundingBox.left, polyBoundingBox.top, polyBoundingBox.width, polyBoundingBox.height);
				console.log(pixels.length,"pixels");
        // Calculate the mean & standard deviation from the pixels and the object shape
        meanStdDev = (0, _calculateFreehandStatistics2.default)(pixels, polyBoundingBox, data.handles);
				console.log(meanStdDev,"meanStdDev");
        if (modality === 'PT') {
          // If the image is from a PET scan, use the DICOM tags to
          // Calculate the SUV from the mean and standard deviation.

          // Note that because we are using modality pixel values from getPixels, and
          // The calculateSUV routine also rescales to modality pixel values, we are first
          // Returning the values to storedPixel values before calcuating SUV with them.
          // TODO: Clean this up? Should we add an option to not scale in calculateSUV?
          meanStdDevSUV = {
            mean: (0, _calculateSUV2.default)(image, (meanStdDev.mean - image.intercept) / image.slope),
            stdDev: (0, _calculateSUV2.default)(image, (meanStdDev.stdDev - image.intercept) / image.slope)
          };
        }

        // If the mean and standard deviation values are sane, store them for later retrieval
//      if (meanStdDev && !isNaN(meanStdDev.mean)) {
//        data.meanStdDev = meanStdDev;
//        data.meanStdDevSUV = meanStdDevSUV;
//      }
        if (meanStdDev && !isNaN(meanStdDev.mean)) {
          var meanStdDevTemp = JSON.stringify(meanStdDev);
          var meanStdDevSUVTemp = meanStdDevSUV ? JSON.stringify(meanStdDevSUV) : meanStdDevSUV;
          data.meanStdDev = JSON.parse(meanStdDevTemp);
          data.meanStdDevSUV = meanStdDevSUVTemp ? JSON.parse(meanStdDevSUVTemp) : meanStdDevSUVTemp;
        }
      }

      // Retrieve the pixel spacing values, and if they are not
      // Real non-zero values, set them to 1
      var columnPixelSpacing = image.columnPixelSpacing || 1;
      var rowPixelSpacing = image.rowPixelSpacing || 1;
      var scaling = columnPixelSpacing * rowPixelSpacing;

      area = (0, _freeHandArea2.default)(data.handles, scaling);

      // If the area value is sane, store it for later retrieval
      if (!isNaN(area)) {
        data.area = area;
      }

      // Set the invalidated flag to false so that this data won't automatically be recalculated
      data.invalidated = false;
    }

    // Define an array to store the rows of text for the textbox
    var textLines = [];

    // If the mean and standard deviation values are present, display them
    console.log("meanStdDev22222",meanStdDev);
    if (meanStdDev && meanStdDev.mean !== undefined) {
      // If the modality is CT, add HU to denote Hounsfield Units
      var moSuffix = '';

      if (modality === 'CT') {
        moSuffix = ' HU';
      }

      // Create a line of text to display the mean and any units that were specified (i.e. HU)
      var meanText = 'Mean: ' + numberWithCommas(meanStdDev.mean.toFixed(2)) + moSuffix;
      // Create a line of text to display the standard deviation and any units that were specified (i.e. HU)
      var stdDevText = 'StdDev: ' + numberWithCommas(meanStdDev.stdDev.toFixed(2)) + moSuffix;

      // If this image has SUV values to display, concatenate them to the text line
      if (meanStdDevSUV && meanStdDevSUV.mean !== undefined) {
        var SUVtext = ' SUV: ';

        meanText += SUVtext + numberWithCommas(meanStdDevSUV.mean.toFixed(2));
        stdDevText += SUVtext + numberWithCommas(meanStdDevSUV.stdDev.toFixed(2));
      }

      // Add these text lines to the array to be displayed in the textbox
      textLines.push(meanText);
      textLines.push(stdDevText);
    }

    // If the area is a sane value, display it
    if (area) {
      // Determine the area suffix based on the pixel spacing in the image.
      // If pixel spacing is present, use millimeters. Otherwise, use pixels.
      // This uses Char code 178 for a superscript 2
      var suffix = ' mm' + String.fromCharCode(178);

      if (!image.rowPixelSpacing || !image.columnPixelSpacing) {
      	if(image.rowPixelSpacing || image.columnPixelSpacing){
      		rowPixelSpacing = image.rowPixelSpacing;
    	    colPixelSpacing = image.columnPixelSpacing;
      	}else{
      		suffix = ' pixels' + String.fromCharCode(178);
      	}
      }

      // Create a line of text to display the area and its units
      var areaText = 'Area: ' + numberWithCommas(area.toFixed(2)) + suffix;

      // Add this text line to the array to be displayed in the textbox
      textLines.push(areaText);
    }
		console.log(textLines,213213213);
    // Only render text if polygon ROI has been completed and freehand 'shiftKey' mode was not used:
    if (data.polyBoundingBox && !data.textBox.freehand) {
      // If the textbox has not been moved by the user, it should be displayed on the right-most
      // Side of the tool.
      if (!data.textBox.hasMoved) {
        // Find the rightmost side of the polyBoundingBox at its vertical center, and place the textbox here
        // Note that this calculates it in image coordinates
        data.textBox.x = data.polyBoundingBox.left + data.polyBoundingBox.width;
        data.textBox.y = data.polyBoundingBox.top + data.polyBoundingBox.height / 2;
      }

      // Convert the textbox Image coordinates into Canvas coordinates
      var textCoords = cornerstone.pixelToCanvas(element, data.textBox);

      // Set options for the textbox drawing function
      var textOptions = {
        centering: {
          x: false,
          y: true
        }
      };

      // Draw the textbox and retrieves it's bounding box for mouse-dragging and highlighting
      var boundingBox = (0, _drawTextBox2.default)(context, textLines, textCoords.x, textCoords.y, color, textOptions);

      // Store the bounding box data in the handle for mouse-dragging and highlighting
      data.textBox.boundingBox = boundingBox;

      // If the textbox has moved, we would like to draw a line linking it with the tool
      // This section decides where to draw this line to on the polyBoundingBox based on the location
      // Of the textbox relative to it.
      if (data.textBox.hasMoved) {
        // Draw dashed link line between tool and text

        // The initial link position is at the center of the
        // Textbox.
        var link = {
          start: {},
          end: {
            x: textCoords.x,
            y: textCoords.y
          }
        };

        var polyNodesCanvas = [];

        // Get the nodes of the ROI in canvas coordinates
        for (var _i2 = 0; _i2 < data.handles.length; _i2++) {
          polyNodesCanvas.push(cornerstone.pixelToCanvas(element, data.handles[_i2]));
        }

        // We obtain the link starting point by finding the closest point on
        // The polyNodesCanvas to the center of the textbox
        link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(polyNodesCanvas, link.end);

        // Next we calculate the corners of the textbox bounding box
        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        // Now we recalculate the link endpoint by identifying which corner of the bounding box
        // Is closest to the start point we just calculated.
        link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        // Finally we draw the dashed linking line
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}

// /////// END IMAGE RENDERING ///////
function enable(element) {
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Disables the reference line tool for the given element
function disable(element) {
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Visible and interactive
function activate(element, mouseButtonMask) {
  (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });
	
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
	
  _externalModules2.default.cornerstone.updateImage(element);
}

// Visible, but not interactive
function deactivate(element) {
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

  _externalModules2.default.cornerstone.updateImage(element);
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module/private exports
var freehand = {
  enable: enable,
  disable: disable,
  activate: activate,
  deactivate: deactivate,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

exports.freehand = freehand;

/***/ }),

/***/ "./imageTools/highlight.js":
/*!*********************************!*\
  !*** ./imageTools/highlight.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlightTouch = exports.highlight = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonRectangleTool = __webpack_require__(/*! ./mouseButtonRectangleTool.js */ "./imageTools/mouseButtonRectangleTool.js");

var _mouseButtonRectangleTool2 = _interopRequireDefault(_mouseButtonRectangleTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'highlight';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // If already a highlight measurement, creating a new one will be useless
  var existingToolData = (0, _toolState.getToolState)(mouseEventData.event.currentTarget, toolType);

  if (existingToolData && existingToolData.data && existingToolData.data.length > 0) {
    return;
  }

  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointInsideRect(element, data, coords) {
  var cornerstone = _externalModules2.default.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var rect = {
    left: Math.min(startCanvas.x, endCanvas.x),
    top: Math.min(startCanvas.y, endCanvas.y),
    width: Math.abs(startCanvas.x - endCanvas.x),
    height: Math.abs(startCanvas.y - endCanvas.y)
  };

  var insideBox = false;

  if (coords.x >= rect.left && coords.x <= rect.left + rect.width && coords.y >= rect.top && coords.y <= rect.top + rect.height) {
    insideBox = true;
  }

  return insideBox;
}

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var rect = {
    left: Math.min(startCanvas.x, endCanvas.x),
    top: Math.min(startCanvas.y, endCanvas.y),
    width: Math.abs(startCanvas.x - endCanvas.x),
    height: Math.abs(startCanvas.y - endCanvas.y)
  };

  var distanceToPoint = _externalModules2.default.cornerstoneMath.rect.distanceToPoint(rect, coords);

  return distanceToPoint < 5;
}

// /////// BEGIN IMAGE RENDERING ///////

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // We have tool data for this elemen
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();

  context.save();

  var data = toolData.data[0];

  if (data.visible === false) {
    return;
  }

  if (!data) {
    return;
  }

  if (data.active) {
    color = _toolColors2.default.getActiveColor();
  } else {
    color = _toolColors2.default.getToolColor();
  }

  var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
  var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

  var rect = {
    left: Math.min(handleStartCanvas.x, handleEndCanvas.x),
    top: Math.min(handleStartCanvas.y, handleEndCanvas.y),
    width: Math.abs(handleStartCanvas.x - handleEndCanvas.x),
    height: Math.abs(handleStartCanvas.y - handleEndCanvas.y)
  };

  // Draw dark fill outside the rectangle
  context.beginPath();
  context.strokeStyle = 'transparent';

  context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

  context.rect(rect.width + rect.left, rect.top, -rect.width, rect.height);
  context.stroke();
  context.fillStyle = 'rgba(0,0,0,0.7)';
  context.fill();
  context.closePath();

  // Draw dashed stroke rectangle
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.setLineDash([4]);
  context.strokeRect(rect.left, rect.top, rect.width, rect.height);

  // Strange fix, but restore doesn't seem to reset the line dashes?
  context.setLineDash([]);

  // Draw the handles last, so they will be on top of the overlay
  (0, _drawHandles2.default)(context, eventData, data.handles, color);
  context.restore();
}
// /////// END IMAGE RENDERING ///////

// Module exports
var preventHandleOutsideImage = true;

var highlight = (0, _mouseButtonRectangleTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  pointInsideRect: pointInsideRect,
  toolType: toolType
}, preventHandleOutsideImage);

var highlightTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  pointInsideRect: pointInsideRect,
  toolType: toolType
}, preventHandleOutsideImage);

exports.highlight = highlight;
exports.highlightTouch = highlightTouch;

/***/ }),

/***/ "./imageTools/imageStats.js":
/*!**********************************!*\
  !*** ./imageTools/imageStats.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _displayTool = __webpack_require__(/*! ./displayTool.js */ "./imageTools/displayTool.js");

var _displayTool2 = _interopRequireDefault(_displayTool);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onImageRendered(e) {
  var eventData = e.detail;
  var image = eventData.image;
  var stats = image.stats;

  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var textLines = [];

  Object.keys(stats).forEach(function (key) {
    var text = key + ' : ' + stats[key];

    textLines.push(text);
  });

  (0, _drawTextBox2.default)(context, textLines, 0, 0, 'orange');

  textLines.forEach(function (text) {
    console.log(text);
  });
}

var imageStats = (0, _displayTool2.default)(onImageRendered);

exports.default = imageStats;

/***/ }),

/***/ "./imageTools/keyboardTool.js":
/*!************************************!*\
  !*** ./imageTools/keyboardTool.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (keyDownCallback) {
  var configuration = {};

  return {
    activate: function activate(element) {
      element.removeEventListener(_events2.default.KEY_DOWN, keyDownCallback);
      element.addEventListener(_events2.default.KEY_DOWN, keyDownCallback);
    },
    disable: function disable(element) {
      element.removeEventListener(_events2.default.KEY_DOWN, keyDownCallback);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.KEY_DOWN, keyDownCallback);
    },
    deactivate: function deactivate(element) {
      element.removeEventListener(_events2.default.KEY_DOWN, keyDownCallback);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/length.js":
/*!******************************!*\
  !*** ./imageTools/length.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lengthTouch = exports.length = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'length';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.end)
  };
  var distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 25;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');
  var image = eventData.image,
      element = eventData.element;


  context.setTransform(1, 0, 0, 1, 0, 0);

  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = length.getConfiguration();
  var imagePlane = cornerstone.metaData.get('imagePlaneModule', image.imageId);
  var rowPixelSpacing = void 0;
  var colPixelSpacing = void 0;

  if (imagePlane) {
  	if(isNaN(imagePlane.rowPixelSpacing) || isNaN(imagePlane.columnPixelSpacing)){
  		rowPixelSpacing = image.rowPixelSpacing;
    	colPixelSpacing = image.columnPixelSpacing;
  	}else{
  		rowPixelSpacing = imagePlane.rowPixelSpacing || imagePlane.rowImagePixelSpacing;
    	colPixelSpacing = imagePlane.columnPixelSpacing || imagePlane.colImagePixelSpacing;
  	} 
  } else {
    rowPixelSpacing = image.rowPixelSpacing;
    colPixelSpacing = image.columnPixelSpacing;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    // Configurable shadow
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    var color = _toolColors2.default.getColorIfActive(data.active);

    // Get the handle positions in canvas coordinates
    var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

    // Draw the measurement line
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);
    context.stroke();

    // Draw the handles
    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);

    // Draw the text
    context.fillStyle = color;

    // Set rowPixelSpacing and columnPixelSpacing to 1 if they are undefined (or zero)
    var dx = (data.handles.end.x - data.handles.start.x) * (rowPixelSpacing || 1);
    var dy = (data.handles.end.y - data.handles.start.y) * (colPixelSpacing || 1);

    // Calculate the length, and create the text variable with the millimeters or pixels suffix
    var _length = Math.sqrt(dx * dx + dy * dy);

    // Store the length inside the tool for outside access
    data.length = _length;

    // Set the length text suffix depending on whether or not pixelSpacing is available
    var suffix = ' mm';

    if (!rowPixelSpacing || !colPixelSpacing) {
      suffix = ' pixels';
    }

    // Store the length measurement text
    var text = '' + _length.toFixed(2) + suffix;

    if (!data.handles.textBox.hasMoved) {
      var coords = {
        x: Math.max(data.handles.start.x, data.handles.end.x)
      };

      // Depending on which handle has the largest x-value,
      // Set the y-value for the text box
      if (coords.x === data.handles.start.x) {
        coords.y = data.handles.start.y;
      } else {
        coords.y = data.handles.end.y;
      }

      data.handles.textBox.x = coords.x;
      data.handles.textBox.y = coords.y;
    }

    var textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);

    // Move the textbox slightly to the right and upwards
    // So that it sits beside the length tool handle
    textCoords.x += 10;

    var options = {
      centering: {
        x: false,
        y: true
      }
    };

    // Draw the textbox
    var boundingBox = (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color, options);

    data.handles.textBox.boundingBox = boundingBox;

    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between ellipse and text
      var link = {
        start: {},
        end: {}
      };

      var midpointCanvas = {
        x: (handleStartCanvas.x + handleEndCanvas.x) / 2,
        y: (handleStartCanvas.y + handleEndCanvas.y) / 2
      };

      var points = [handleStartCanvas, handleEndCanvas, midpointCanvas];

      link.end.x = textCoords.x;
      link.end.y = textCoords.y;

      link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(points, link.end);

      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var length = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var lengthTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.length = length;
exports.lengthTouch = lengthTouch;

/***/ }),

/***/ "./imageTools/magnify.js":
/*!*******************************!*\
  !*** ./imageTools/magnify.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.magnifyTouchDrag = exports.magnify = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _getMaxSimultaneousRequests = __webpack_require__(/*! ../util/getMaxSimultaneousRequests.js */ "./util/getMaxSimultaneousRequests.js");

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'magnify';

var configuration = {
  magnifySize: 300,
  magnificationLevel: 5
};

var browserName = void 0;
var currentPoints = void 0;
var zoomCanvas = void 0;
var zoomElement = void 0;

/** Remove the magnifying glass when the mouse event ends */
function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
  hideTool(eventData);
}

function hideTool(eventData) {
  var element = eventData.element;

  element.querySelector('.magnifyTool').style.display = 'none';
  // Re-enable the mouse cursor
  document.body.style.cursor = 'default';
  removeZoomElement();
}

/** Draw the magnifying glass on mouseDown, and begin tracking mouse movements */
function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if (e.isTouchEvent || (0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);
    element.addEventListener(_events2.default.TOUCH_DRAG, dragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.TOUCH_END, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

    element.addEventListener(_events2.default.NEW_IMAGE, newImageCallback);

    // Ignore until next event
    drawZoomedElement(eventData);
    // On next frame
    window.requestAnimationFrame(function () {
      return drawMagnificationTool(eventData);
    });

    e.preventDefault();
    e.stopPropagation();
  }
}

function newImageCallback(e, eventData) {
  eventData.currentPoints = currentPoints;
  drawMagnificationTool(eventData);
}

function dragEndCallback(e, eventData) {
  var element = eventData.element;

  element.removeEventListener(_events2.default.TOUCH_DRAG_END, dragEndCallback);
  element.removeEventListener(_events2.default.TOUCH_END, dragEndCallback);
  element.removeEventListener(_events2.default.NEW_IMAGE, newImageCallback);
  hideTool(eventData);
}

/** Drag callback is triggered by both the touch and mouse magnify tools */
function dragCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  drawMagnificationTool(eventData);
  if (eventData.isTouchEvent === true) {
    element.addEventListener(_events2.default.TOUCH_DRAG_END, dragEndCallback);
    element.addEventListener(_events2.default.TOUCH_END, dragEndCallback);
  }

  e.preventDefault();
  e.stopPropagation();
}

function drawMagnificationTool(eventData) {
  var element = eventData.element;
  var magnifyCanvas = element.querySelector('.magnifyTool');

  if (!magnifyCanvas) {
    createMagnificationCanvas(eventData.element);
  }

  if (zoomCanvas === undefined) {
    return;
  }

  var config = magnify.getConfiguration();

  var magnifySize = config.magnifySize;
  var magnificationLevel = config.magnificationLevel;

  // The 'not' magnifyTool class here is necessary because cornerstone places
  // No classes of it's own on the canvas we want to select
  var canvas = element.querySelector('canvas:not(.magnifyTool)');
  var context = canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var zoomCtx = magnifyCanvas.getContext('2d');

  zoomCtx.setTransform(1, 0, 0, 1, 0, 0);

  var getSize = magnifySize;

  // Calculate the on-canvas location of the mouse pointer / touch
  var canvasLocation = _externalModules2.default.cornerstone.pixelToCanvas(eventData.element, eventData.currentPoints.image);

  canvasLocation.x = Math.max(canvasLocation.x, 0);
  canvasLocation.x = Math.min(canvasLocation.x, canvas.width);

  canvasLocation.y = Math.max(canvasLocation.y, 0);
  canvasLocation.y = Math.min(canvasLocation.y, canvas.height);

  // Clear the rectangle
  zoomCtx.clearRect(0, 0, magnifySize, magnifySize);
  zoomCtx.fillStyle = 'transparent';

  // Fill it with the pixels that the mouse is clicking on
  zoomCtx.fillRect(0, 0, magnifySize, magnifySize);

  var copyFrom = {
    x: canvasLocation.x * magnificationLevel - 0.5 * getSize,
    y: canvasLocation.y * magnificationLevel - 0.5 * getSize
  };

  if (browserName === 'Safari') {
    // Safari breaks when trying to copy pixels with negative indices
    // This prevents proper Magnify usage
    copyFrom.x = Math.max(copyFrom.x, 0);
    copyFrom.y = Math.max(copyFrom.y, 0);
  }

  copyFrom.x = Math.min(copyFrom.x, zoomCanvas.width);
  copyFrom.y = Math.min(copyFrom.y, zoomCanvas.height);

  zoomCtx.drawImage(zoomCanvas, copyFrom.x, copyFrom.y, getSize, getSize, 0, 0, getSize, getSize);

  // Place the magnification tool at the same location as the pointer
  magnifyCanvas.style.top = canvasLocation.y - 0.5 * magnifySize + 'px';
  magnifyCanvas.style.left = canvasLocation.x - 0.5 * magnifySize + 'px';

  if (eventData.isTouchEvent) {
    magnifyCanvas.style.top = canvasLocation.y - 0.5 * magnifySize - 120 + 'px';
  }

  magnifyCanvas.style.display = 'block';

  // Hide the mouse cursor, so the user can see better
  document.body.style.cursor = 'none';
}

/** Creates the magnifying glass canvas */
function createMagnificationCanvas(element) {
  // If the magnifying glass canvas doesn't already exist
  if (element.querySelector('.magnifyTool') === null) {
    // Create a canvas and append it as a child to the element
    var magnifyCanvas = document.createElement('canvas');

    // The magnifyTool class is used to find the canvas later on
    magnifyCanvas.classList.add('magnifyTool');

    var config = magnify.getConfiguration();

    magnifyCanvas.width = config.magnifySize;
    magnifyCanvas.height = config.magnifySize;

    // Make sure position is absolute so the canvas can follow the mouse / touch
    magnifyCanvas.style.position = 'absolute';
    magnifyCanvas.style.display = 'none';
    element.appendChild(magnifyCanvas);
  }
}

/** Find the magnifying glass canvas and remove it */
function removeMagnificationCanvas(element) {
  var magnifyCanvas = element.querySelector('.magnifyTool');

  if (magnifyCanvas) {
    element.removeChild(magnifyCanvas);
  }
}

function drawZoomedElement(eventData) {
  removeZoomElement();
  var enabledElement = eventData.enabledElement;

  if (enabledElement === undefined) {
    enabledElement = _externalModules2.default.cornerstone.getEnabledElement(eventData.element);
  }
  var config = magnify.getConfiguration();

  var magnificationLevel = config.magnificationLevel;
  var origCanvas = enabledElement.canvas;
  var image = enabledElement.image;

  zoomElement = document.createElement('div');

  zoomElement.width = origCanvas.width * magnificationLevel;
  zoomElement.height = origCanvas.height * magnificationLevel;
  _externalModules2.default.cornerstone.enable(zoomElement);

  var zoomEnabledElement = _externalModules2.default.cornerstone.getEnabledElement(zoomElement);
  var viewport = _externalModules2.default.cornerstone.getViewport(enabledElement.element);

  zoomCanvas = zoomEnabledElement.canvas;
  zoomCanvas.width = origCanvas.width * magnificationLevel;
  zoomCanvas.height = origCanvas.height * magnificationLevel;

  zoomEnabledElement.viewport = Object.assign({}, viewport);

  viewport.scale *= magnificationLevel;
  _externalModules2.default.cornerstone.displayImage(zoomElement, image);
  _externalModules2.default.cornerstone.setViewport(zoomElement, viewport);
}

function removeZoomElement() {
  if (zoomElement !== undefined) {
    _externalModules2.default.cornerstone.disable(zoomElement);
    zoomElement = undefined;
    zoomCanvas = undefined;
  }
}

// --- Mouse tool activate / disable --- //
function disable(element) {
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  removeMagnificationCanvas(element);
}

function enable(element) {
  var config = magnify.getConfiguration(config);

  if (!browserName) {
    var infoString = (0, _getMaxSimultaneousRequests.getBrowserInfo)();
    var info = infoString.split(' ');

    browserName = info[0];
  }

  createMagnificationCanvas(element);
}

function activate(element, mouseButtonMask) {
  (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);

  element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  createMagnificationCanvas(element);
}

// --- Touch tool activate / disable --- //
function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module exports
var magnify = {
  enable: enable,
  activate: activate,
  deactivate: disable,
  disable: disable,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

function enableTouch(element) {
  element.removeEventListener(_events2.default.TOUCH_START, mouseDownCallback);
  element.addEventListener(_events2.default.TOUCH_START, mouseDownCallback);
}

// Disables the reference line tool for the given element
function disableTouch(element) {
  element.removeEventListener(_events2.default.TOUCH_START, mouseDownCallback);
}

var magnifyTouchDrag = {
  activate: enableTouch,
  deactivate: disableTouch,
  enable: enableTouch,
  disable: disableTouch
};

exports.magnify = magnify;
exports.magnifyTouchDrag = magnifyTouchDrag;

/***/ }),

/***/ "./imageTools/mouseButtonRectangleTool.js":
/*!************************************************!*\
  !*** ./imageTools/mouseButtonRectangleTool.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseToolInterface, preventHandleOutsideImage) {
  var toolType = mouseToolInterface.toolType;

  // /////// BEGIN ACTIVE TOOL ///////
  function addNewMeasurement(mouseEventData) {
    var element = mouseEventData.element;
    var measurementData = mouseToolInterface.createNewMeasurement(mouseEventData);

    // Prevent adding new measurement if tool returns nill
    if (!measurementData) {
      return;
    }

    // Associate this data with this imageId so we can render it and manipulate it
    (0, _toolState.addToolState)(mouseEventData.element, toolType, measurementData);

    // Since we are dragging to another place to drop the end point, we can just activate
    // The end point and let the moveHandle move it for us.
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    (0, _moveHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(mouseEventData.element, toolType, measurementData);
      }

      element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    }, preventHandleOutsideImage);
  }

  function mouseDownActivateCallback(e) {
    var eventData = e.detail;
    var element = eventData.element;
    var options = (0, _toolOptions.getToolOptions)(toolType, element);

    if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
      addNewMeasurement(eventData);

      return false;
    }
  }
  // /////// END ACTIVE TOOL ///////

  // /////// BEGIN DEACTIVE TOOL ///////

  function mouseMoveCallback(e) {
    var eventData = e.detail;

    _toolCoordinates2.default.setCoords(eventData);

    // If we have no tool data for this element, do nothing
    var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

    if (toolData === undefined) {
      return;
    }

    // We have tool data, search through all data
    // And see if we can activate a handle
    var imageNeedsUpdate = false;
    var coords = eventData.currentPoints.canvas;

    for (var i = 0; i < toolData.data.length; i++) {
      // Get the cursor position in image coordinates
      var data = toolData.data[i];

      if ((0, _handleActivator2.default)(eventData.element, data.handles, coords) === true) {
        imageNeedsUpdate = true;
      }

      if (mouseToolInterface.pointInsideRect(eventData.element, data, coords) && !data.active || !mouseToolInterface.pointInsideRect(eventData.element, data, coords) && data.active) {
        data.active = !data.active;
        imageNeedsUpdate = true;
      }
    }

    // Handle activation status changed, redraw the image
    if (imageNeedsUpdate === true) {
      _externalModules2.default.cornerstone.updateImage(eventData.element);
    }
  }

  function mouseDownCallback(e) {
    var eventData = e.detail;
    var element = eventData.element;
    var cornerstone = _externalModules2.default.cornerstone;
    var data = void 0;
    var options = (0, _toolOptions.getToolOptions)(toolType, element);

    if (!(0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
      return;
    }

    function handleDoneMove() {
      data.active = false;
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(eventData.element, toolType, data);
      }

      cornerstone.updateImage(eventData.element);
      element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    }

    var coords = eventData.startPoints.canvas;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

    var i = void 0;

    // Now check to see if there is a handle we can move
    var distanceSq = 25;

    if (toolData !== undefined) {
      for (i = 0; i < toolData.data.length; i++) {
        data = toolData.data[i];
        var handle = (0, _getHandleNearImagePoint2.default)(eventData.element, data.handles, coords, distanceSq);

        if (handle !== undefined) {
          element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
          data.active = true;
          (0, _moveHandle2.default)(eventData, toolType, data, handle, handleDoneMove, preventHandleOutsideImage);
          e.stopImmediatePropagation();

          return false;
        }
      }
    }

    // Now check to see if there is a line we can move
    // Now check to see if we have a tool that we can move
    var opt = {
      deleteIfHandleOutsideImage: true,
      preventHandleOutsideImage: preventHandleOutsideImage
    };

    if (toolData !== undefined && mouseToolInterface.pointInsideRect !== undefined) {
      for (i = 0; i < toolData.data.length; i++) {
        data = toolData.data[i];
        if (mouseToolInterface.pointInsideRect(eventData.element, data, coords)) {
          element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
          (0, _moveAllHandles2.default)(e, data, toolData, toolType, opt, handleDoneMove);
          element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
          e.stopImmediatePropagation();

          return false;
        }
      }
    }
  }
  // /////// END DEACTIVE TOOL ///////

  // Not visible, not interactive
  function disable(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible but not interactive
  function enable(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);

    element.addEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible, interactive and can create
  function activate(element, mouseButtonMask) {
    (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);

    element.addEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible, interactive
  function deactivate(element, mouseButtonMask) {
    (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);

    element.addEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);

    _externalModules2.default.cornerstone.updateImage(element);
  }

  var toolInterface = {
    enable: enable,
    disable: disable,
    activate: activate,
    deactivate: deactivate
  };

  return toolInterface;
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolCoordinates = __webpack_require__(/*! ../stateManagement/toolCoordinates.js */ "./stateManagement/toolCoordinates.js");

var _toolCoordinates2 = _interopRequireDefault(_toolCoordinates);

var _getHandleNearImagePoint = __webpack_require__(/*! ../manipulators/getHandleNearImagePoint.js */ "./manipulators/getHandleNearImagePoint.js");

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

var _handleActivator = __webpack_require__(/*! ../manipulators/handleActivator.js */ "./manipulators/handleActivator.js");

var _handleActivator2 = _interopRequireDefault(_handleActivator);

var _moveHandle = __webpack_require__(/*! ../manipulators/moveHandle.js */ "./manipulators/moveHandle.js");

var _moveHandle2 = _interopRequireDefault(_moveHandle);

var _moveAllHandles = __webpack_require__(/*! ../manipulators/moveAllHandles.js */ "./manipulators/moveAllHandles.js");

var _moveAllHandles2 = _interopRequireDefault(_moveAllHandles);

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/mouseButtonTool.js":
/*!***************************************!*\
  !*** ./imageTools/mouseButtonTool.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseToolInterface) {
  var configuration = {};
  var toolType = mouseToolInterface.toolType;

  function mouseDownActivateCallback(e) {
    var eventData = e.detail;
    var element = eventData.element;
    var options = (0, _toolOptions.getToolOptions)(toolType, element);

    if (!(0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
      return;
    }

    if (mouseToolInterface.addNewMeasurement) {
      mouseToolInterface.addNewMeasurement(eventData);
    } else {
      addNewMeasurement(eventData);
    }

    e.preventDefault();
    e.stopPropagation();
  }

  // /////// END ACTIVE TOOL ///////

  // /////// BEGIN DEACTIVE TOOL ///////

  function mouseMoveCallback(e) {
    var eventData = e.detail;
    _toolCoordinates2.default.setCoords(eventData);

    // If we have no tool data for this element, do nothing
    var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

    if (!toolData) {
      return;
    }

    // We have tool data, search through all data
    // And see if we can activate a handle
    var imageNeedsUpdate = false;
		
    for (var i = 0; i < toolData.data.length; i++) {
      // Get the cursor position in canvas coordinates
      var coords = eventData.currentPoints.canvas;

      var data = toolData.data[i];

      if ((0, _handleActivator2.default)(eventData.element, data.handles, coords) === true) {
//      console.log("mouseMove",11111);
        imageNeedsUpdate = true;
      }

      if (mouseToolInterface.pointNearTool(eventData.element, data, coords) && !data.active || !mouseToolInterface.pointNearTool(eventData.element, data, coords) && data.active) {
        data.active = !data.active;
//      console.log("mouseMove",22222);
        imageNeedsUpdate = true;
      }
    }

    // Handle activation status changed, redraw the image
    if (imageNeedsUpdate === true) {
      _externalModules2.default.cornerstone.updateImage(eventData.element);
    }
  }

  function mouseDownCallback(e) {
    var eventData = e.detail;
    var data = void 0;
    var element = eventData.element;
    var options = (0, _toolOptions.getToolOptions)(toolType, element);

    if (!(0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
      return;
    }

    function handleDoneMove() {
      data.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, toolType, data);
      }

      _externalModules2.default.cornerstone.updateImage(element);
      element.addEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    }

    var coords = eventData.startPoints.canvas;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

    if (!toolData) {
      return;
    }

    var i = void 0;

    // Now check to see if there is a handle we can move

    var preventHandleOutsideImage = void 0;

    if (mouseToolInterface.options && mouseToolInterface.options.preventHandleOutsideImage !== undefined) {
      preventHandleOutsideImage = mouseToolInterface.options.preventHandleOutsideImage;
    } else {
      preventHandleOutsideImage = false;
    }

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];
      console.log(data);
      var distance = 6;
      if(data.toolType && data.toolType == 'probe'){
      	if(data.active){
      		break;
      	}
      }
      var handle = (0, _getHandleNearImagePoint2.default)(element, data.handles, coords, distance);
      console.log('handle',data);
      
      if (handle) {
        element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
        data.active = true;
        (0, _moveHandle2.default)(eventData, toolType, data, handle, handleDoneMove, preventHandleOutsideImage);
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        return;
      }
    }
		console.log("test");
    // Now check to see if there is a line we can move
    // Now check to see if we have a tool that we can move
    if (!mouseToolInterface.pointNearTool) {
      return;
    }

    var opt = mouseToolInterface.options || {
      deleteIfHandleOutsideImage: true,
      preventHandleOutsideImage: false
    };

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];
      data.active = false;
      if (mouseToolInterface.pointNearTool(element, data, coords)) {
        data.active = true;
        element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
        (0, _moveAllHandles2.default)(e, data, toolData, toolType, opt, handleDoneMove);
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        return;
      }
    }
  }
  // /////// END DEACTIVE TOOL ///////


  var mouseMove = mouseToolInterface.mouseMoveCallback || mouseMoveCallback;
  var mouseDown = mouseToolInterface.mouseDownCallback || mouseDownCallback;
  var mouseDownActivate = mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback;
  var mouseDoubleClick = mouseToolInterface.mouseDoubleClickCallback;

  // /////// BEGIN ACTIVE TOOL ///////
  function addNewMeasurement(mouseEventData) {
    var cornerstone = _externalModules2.default.cornerstone;
    var element = mouseEventData.element;

    var measurementData = mouseToolInterface.createNewMeasurement(mouseEventData);

    if (!measurementData) {
      return;
    }

    // Associate this data with this imageId so we can render it and manipulate it
    (0, _toolState.addToolState)(mouseEventData.element, toolType, measurementData);

    // Since we are dragging to another place to drop the end point, we can just activate
    // The end point and let the moveHandle move it for us.
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDown);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    if (mouseDoubleClick) {
      element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }

    cornerstone.updateImage(element);

    var handleMover = void 0;

    if (Object.keys(measurementData.handles).length === 2) {
      handleMover = _moveHandle2.default;
    } else {
      handleMover = _moveNewHandle2.default;
    }

    var preventHandleOutsideImage = void 0;

    if (mouseToolInterface.options && mouseToolInterface.options.preventHandleOutsideImage !== undefined) {
      preventHandleOutsideImage = mouseToolInterface.options.preventHandleOutsideImage;
    } else {
      preventHandleOutsideImage = false;
    }

    handleMover(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      measurementData.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, toolType, measurementData);
      }

      element.addEventListener(_events2.default.MOUSE_MOVE, mouseMove);
      element.addEventListener(_events2.default.MOUSE_DOWN, mouseDown);
      element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

      if (mouseDoubleClick) {
        element.addEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
      }

      cornerstone.updateImage(element);
    }, preventHandleOutsideImage);
  }

  // Not visible, not interactive
  function disable(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDown);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    if (mouseDoubleClick) {
      element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible but not interactive
  function enable(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDown);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    if (mouseDoubleClick) {
      element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }

    element.addEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible, interactive and can create
  function activate(element, mouseButtonMask) {
    (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDown);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    element.addEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.addEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.addEventListener(_events2.default.MOUSE_DOWN, mouseDown);
    element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    if (mouseDoubleClick) {
      element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
      element.addEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible, interactive
  function deactivate(element, mouseButtonMask) {
    (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

    var eventType = _events2.default.TOOL_DEACTIVATED;
    var statusChangeEventData = {
      mouseButtonMask: mouseButtonMask,
      toolType: toolType,
      type: eventType
    };

    (0, _triggerEvent2.default)(element, eventType, statusChangeEventData);

    element.removeEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDown);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    element.addEventListener(_events2.default.IMAGE_RENDERED, mouseToolInterface.onImageRendered);
    element.addEventListener(_events2.default.MOUSE_MOVE, mouseMove);
    element.addEventListener(_events2.default.MOUSE_DOWN, mouseDown);

    if (mouseDoubleClick) {
      element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
      element.addEventListener(_events2.default.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }

    if (mouseToolInterface.deactivate) {
      mouseToolInterface.deactivate(element, mouseButtonMask);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  function getConfiguration() {
    return configuration;
  }

  function setConfiguration(config) {
    configuration = config;
  }

  var toolInterface = {
    enable: enable,
    disable: disable,
    activate: activate,
    deactivate: deactivate,
    getConfiguration: getConfiguration,
    setConfiguration: setConfiguration,
    mouseDownCallback: mouseDownCallback,
    mouseMoveCallback: mouseMoveCallback,
    mouseDownActivateCallback: mouseDownActivateCallback
  };

  // Expose pointNearTool if available
  if (mouseToolInterface.pointNearTool) {
    toolInterface.pointNearTool = mouseToolInterface.pointNearTool;
  }

  if (mouseDoubleClick) {
    toolInterface.mouseDoubleClickCallback = mouseDoubleClick;
  }

  if (mouseToolInterface.addNewMeasurement) {
    toolInterface.addNewMeasurement = mouseToolInterface.addNewMeasurement;
  }

  return toolInterface;
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolCoordinates = __webpack_require__(/*! ../stateManagement/toolCoordinates.js */ "./stateManagement/toolCoordinates.js");

var _toolCoordinates2 = _interopRequireDefault(_toolCoordinates);

var _getHandleNearImagePoint = __webpack_require__(/*! ../manipulators/getHandleNearImagePoint.js */ "./manipulators/getHandleNearImagePoint.js");

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

var _handleActivator = __webpack_require__(/*! ../manipulators/handleActivator.js */ "./manipulators/handleActivator.js");

var _handleActivator2 = _interopRequireDefault(_handleActivator);

var _moveHandle = __webpack_require__(/*! ../manipulators/moveHandle.js */ "./manipulators/moveHandle.js");

var _moveHandle2 = _interopRequireDefault(_moveHandle);

var _moveNewHandle = __webpack_require__(/*! ../manipulators/moveNewHandle.js */ "./manipulators/moveNewHandle.js");

var _moveNewHandle2 = _interopRequireDefault(_moveNewHandle);

var _moveAllHandles = __webpack_require__(/*! ../manipulators/moveAllHandles.js */ "./manipulators/moveAllHandles.js");

var _moveAllHandles2 = _interopRequireDefault(_moveAllHandles);

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/mouseWheelTool.js":
/*!**************************************!*\
  !*** ./imageTools/mouseWheelTool.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseWheelCallback) {
  return {
    activate: function activate(element) {
      element.removeEventListener(_events2.default.MOUSE_WHEEL, mouseWheelCallback);
      element.addEventListener(_events2.default.MOUSE_WHEEL, mouseWheelCallback);
    },
    disable: function disable(element) {
      element.removeEventListener(_events2.default.MOUSE_WHEEL, mouseWheelCallback);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.MOUSE_WHEEL, mouseWheelCallback);
    },
    deactivate: function deactivate(element) {
      element.removeEventListener(_events2.default.MOUSE_WHEEL, mouseWheelCallback);
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/multiTouchDragTool.js":
/*!******************************************!*\
  !*** ./imageTools/multiTouchDragTool.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchDragCallback, options) {
  var configuration = {};
  var events = [_events2.default.MULTI_TOUCH_DRAG];

  if (options && options.fireOnTouchStart === true) {
    events.push(_events2.default.MULTI_TOUCH_START);
  }

  return {
    activate: function activate(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
        element.addEventListener(eventType, touchDragCallback);
      });

      if (options && options.activateCallback) {
        options.activateCallback(element);
      }
    },
    disable: function disable(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
      });

      if (options && options.disableCallback) {
        options.disableCallback(element);
      }
    },
    enable: function enable(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
      });

      if (options && options.enableCallback) {
        options.enableCallback(element);
      }
    },
    deactivate: function deactivate(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
      });

      if (options && options.deactivateCallback) {
        options.deactivateCallback(element);
      }
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/orientationMarkers.js":
/*!******************************************!*\
  !*** ./imageTools/orientationMarkers.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _index = __webpack_require__(/*! ../orientation/index.js */ "./orientation/index.js");

var _index2 = _interopRequireDefault(_index);

var _displayTool = __webpack_require__(/*! ./displayTool.js */ "./imageTools/displayTool.js");

var _displayTool2 = _interopRequireDefault(_displayTool);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOrientationMarkers(element) {
  var cornerstone = _externalModules2.default.cornerstone;
  var enabledElement = cornerstone.getEnabledElement(element);
  var imagePlaneMetaData = cornerstone.metaData.get('imagePlaneModule', enabledElement.image.imageId);

  if (!imagePlaneMetaData || !imagePlaneMetaData.rowCosines || !imagePlaneMetaData.columnCosines) {
    return;
  }
  var rowString = _index2.default.getOrientationString(imagePlaneMetaData.rowCosines);
  var columnString = _index2.default.getOrientationString(imagePlaneMetaData.columnCosines);

  var oppositeRowString = _index2.default.invertOrientationString(rowString);
  var oppositeColumnString = _index2.default.invertOrientationString(columnString);

  return {
    top: oppositeColumnString,
    bottom: columnString,
    left: oppositeRowString,
    right: rowString
  };
}

function getOrientationMarkerPositions(element) {
  var cornerstone = _externalModules2.default.cornerstone;
  var enabledElement = cornerstone.getEnabledElement(element);
  var coords = void 0;

  coords = {
    x: enabledElement.image.width / 2,
    y: 5
  };
  var top = cornerstone.pixelToCanvas(element, coords);

  coords = {
    x: enabledElement.image.width / 2,
    y: enabledElement.image.height - 5
  };
  var bottom = cornerstone.pixelToCanvas(element, coords);

  coords = {
    x: 5,
    y: enabledElement.image.height / 2
  };
  var left = cornerstone.pixelToCanvas(element, coords);

  coords = {
    x: enabledElement.image.width - 10,
    y: enabledElement.image.height / 2
  };
  var right = cornerstone.pixelToCanvas(element, coords);

  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  };
}

function onImageRendered(e) {
  var eventData = e.detail;
  var element = eventData.element;

  var markers = getOrientationMarkers(element);

  if (!markers) {
    return;
  }

  var coords = getOrientationMarkerPositions(element, markers);

  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = _toolColors2.default.getToolColor();

  var textWidths = {
    top: context.measureText(markers.top).width,
    left: context.measureText(markers.left).width,
    right: context.measureText(markers.right).width,
    bottom: context.measureText(markers.bottom).width
  };

  (0, _drawTextBox2.default)(context, markers.top, coords.top.x - textWidths.top / 2, coords.top.y, color);
  (0, _drawTextBox2.default)(context, markers.left, coords.left.x - textWidths.left / 2, coords.left.y, color);

  var config = orientationMarkers.getConfiguration();

  if (config && config.drawAllMarkers) {
    (0, _drawTextBox2.default)(context, markers.right, coords.right.x - textWidths.right / 2, coords.right.y, color);
    (0, _drawTextBox2.default)(context, markers.bottom, coords.bottom.x - textWidths.bottom / 2, coords.bottom.y, color);
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var orientationMarkers = (0, _displayTool2.default)(onImageRendered);

exports.default = orientationMarkers;

/***/ }),

/***/ "./imageTools/pan.js":
/*!***************************!*\
  !*** ./imageTools/pan.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panTouchDrag = exports.pan = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _simpleMouseButtonTool = __webpack_require__(/*! ./simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(/*! ./touchDragTool.js */ "./imageTools/touchDragTool.js");

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'pan';

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

    e.preventDefault();
    e.stopPropagation();
  }
}

function dragCallback(e) {
  var eventData = e.detail;

  // FIXME: Copied from Cornerstone src/internal/calculateTransform.js, should be exposed from there.
  var widthScale = eventData.viewport.scale;
  var heightScale = eventData.viewport.scale;

  if (eventData.image.rowPixelSpacing < eventData.image.columnPixelSpacing) {
    widthScale *= eventData.image.columnPixelSpacing / eventData.image.rowPixelSpacing;
  } else if (eventData.image.columnPixelSpacing < eventData.image.rowPixelSpacing) {
    heightScale *= eventData.image.rowPixelSpacing / eventData.image.columnPixelSpacing;
  }

  eventData.viewport.translation.x += eventData.deltaPoints.page.x / widthScale;
  eventData.viewport.translation.y += eventData.deltaPoints.page.y / heightScale;
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);

  e.preventDefault();
  e.stopPropagation();
}

var pan = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);
var panTouchDrag = (0, _touchDragTool2.default)(dragCallback, toolType);

exports.pan = pan;
exports.panTouchDrag = panTouchDrag;

/***/ }),

/***/ "./imageTools/panMultiTouch.js":
/*!*************************************!*\
  !*** ./imageTools/panMultiTouch.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _multiTouchDragTool = __webpack_require__(/*! ./multiTouchDragTool.js */ "./imageTools/multiTouchDragTool.js");

var _multiTouchDragTool2 = _interopRequireDefault(_multiTouchDragTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function touchPanCallback(e) {
  var eventData = e.detail;
  var config = panMultiTouch.getConfiguration();

  if (config && config.testPointers(eventData)) {
    eventData.viewport.translation.x += eventData.deltaPoints.page.x / eventData.viewport.scale;
    eventData.viewport.translation.y += eventData.deltaPoints.page.y / eventData.viewport.scale;
    _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);

    e.preventDefault();
    e.stopPropagation();
  }
}

var configuration = {
  testPointers: function testPointers(eventData) {
    return eventData.numPointers >= 2;
  }
};

var panMultiTouch = (0, _multiTouchDragTool2.default)(touchPanCallback);

panMultiTouch.setConfiguration(configuration);

exports.default = panMultiTouch;

/***/ }),

/***/ "./imageTools/probe.js":
/*!*****************************!*\
  !*** ./imageTools/probe.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.probeTouch = exports.probe = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _getRGBPixels = __webpack_require__(/*! ../util/getRGBPixels.js */ "./util/getRGBPixels.js");

var _getRGBPixels2 = _interopRequireDefault(_getRGBPixels);

var _calculateSUV = __webpack_require__(/*! ../util/calculateSUV.js */ "./util/calculateSUV.js");

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'probe';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    },
    toolType:'probe'
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var endCanvas = _externalModules2.default.cornerstone.pixelToCanvas(element, data.handles.end);

  return _externalModules2.default.cornerstoneMath.point.distance(endCanvas, coords) < 5;
}

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var font = _textStyle2.default.getFont();
  var fontHeight = _textStyle2.default.getFontSize();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();
    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }
    // Get the handle positions in canvas coordinates
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);
    
    // Draw the handles
    (0, _drawHandles2.default)(context, eventData, data.handles, color);

    var x = Math.round(data.handles.end.x);
    var y = Math.round(data.handles.end.y);
    var storedPixels = void 0;

    var text = void 0,
        str = void 0;

    if (x < 0 || y < 0 || x >= eventData.image.columns || y >= eventData.image.rows) {
      return;
    }

    if (eventData.image.color) {
      text = 'X: ' + x + ', Y: ' + y;
      storedPixels = (0, _getRGBPixels2.default)(eventData.element, x, y, 1, 1);
      str = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2];
    } else {
      storedPixels = cornerstone.getStoredPixels(eventData.element, x, y, 1, 1);
      var sp = storedPixels[0];
      var mo = sp * eventData.image.slope + eventData.image.intercept;
//    console.log(storedPixels,eventData.image)
      var suv = (0, _calculateSUV2.default)(eventData.image, sp);

      // Draw text
      text = 'X: ' + x + ', Y: ' + y;
      str = 'SP: ' + sp + ' VAL: ' + parseFloat(mo.toFixed(3)) + 'HU';
      if (suv) {
        str += ' SUV: ' + parseFloat(suv.toFixed(3));
      }
    }
    data.textBox = [text,str];
    
    if (!data.handles.textBox.hasMoved) {
//    var coords = {
//      x: Math.max(data.handles.end.x, data.handles.end.x)
//    };

      // Depending on which handle has the largest x-value,
      // Set the y-value for the text box
//    if (coords.x === data.handles.end.x) {
//      coords.y = data.handles.end.y;
//    }

      data.handles.textBox.x = data.handles.end.x;
      data.handles.textBox.y = data.handles.end.y;
    }
//  var coords = {
//    // Translate the x/y away from the cursor
//    x: data.handles.end.x + 3,
//    y: data.handles.end.y - 3
//  };
//  console.log(data.handles.textBox.hasMoved)
//  console.log('data',data.handles.textBox.x,data.handles.textBox.y)
	var textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);
//	console.log('textCoords',textCoords)
//  var textCoords = cornerstone.pixelToCanvas(eventData.element, coords);
    textCoords.x += 10;
    var options = {
      centering: {
        x: false,
        y: true
      }
    };
    
    context.font = font;
    context.fillStyle = color;

//  (0, _drawTextBox2.default)(context, str, textCoords.x, textCoords.y + fontHeight - 2, color);
//  (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color);
    var boundingBox = (0, _drawTextBox2.default)(context, data.textBox, textCoords.x, textCoords.y, color, options);
//  console.log(22,textCoords)
    data.handles.textBox.boundingBox = boundingBox;
    if (data.handles.textBox.hasMoved) {
      var link = {
        start: {
        	x:data.handles.end.x,
        	y:data.handles.end.y
        },
        end: {
        	x:textCoords.x,
        	y:textCoords.y
        }
      };

      var midpointCanvas = {
        x: handleEndCanvas.x,
        y: handleEndCanvas.y
      };

      var points = [handleEndCanvas, midpointCanvas];

      link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(points, link.end);
      
      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);
//    console.log('end',link.end)

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }
    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var probe = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var probeTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.probe = probe;
exports.probeTouch = probeTouch;

/***/ }),

/***/ "./imageTools/rectangleRoi.js":
/*!************************************!*\
  !*** ./imageTools/rectangleRoi.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rectangleRoiTouch = exports.rectangleRoi = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _calculateSUV = __webpack_require__(/*! ../util/calculateSUV.js */ "./util/calculateSUV.js");

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'rectangleRoi';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    invalidated: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var rect = {
    left: Math.min(startCanvas.x, endCanvas.x),
    top: Math.min(startCanvas.y, endCanvas.y),
    width: Math.abs(startCanvas.x - endCanvas.x),
    height: Math.abs(startCanvas.y - endCanvas.y)
  };
//	console.log(_externalModules2.default.cornerstoneMath);
  var distanceToPoint = _externalModules2.default.cornerstoneMath.rect.distanceToPoint(rect, coords);
//	console.log(distanceToPoint,"distanceToPoint");
  return distanceToPoint < 5;
}

// /////// BEGIN IMAGE RENDERING ///////

function calculateMeanStdDev(sp, ellipse) {
  // TODO: Get a real statistics library here that supports large counts

  var sum = 0;
  var sumSquared = 0;
  var count = 0;
  var index = 0;

  for (var y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
    for (var x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
      sum += sp[index];
      sumSquared += sp[index] * sp[index];
      count++;
      index++;
    }
  }

  if (count === 0) {
    return {
      count: count,
      mean: 0.0,
      variance: 0.0,
      stdDev: 0.0
    };
  }

  var mean = sum / count;
  var variance = sumSquared / count - mean * mean;

  return {
    count: count,
    mean: mean,
    variance: variance,
    stdDev: Math.sqrt(variance)
  };
}

function numberWithCommas(x) {
  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  var parts = x.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var image = eventData.image;
  var element = eventData.element;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = rectangleRoi.getConfiguration();
  var context = eventData.canvasContext.canvas.getContext('2d');
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var imagePlane = cornerstone.metaData.get('imagePlaneModule', image.imageId);
  var modality = void 0;
  var rowPixelSpacing = void 0;
  var colPixelSpacing = void 0;
  //console.log(88888,imagePlane,image);
  if (imagePlane) {
    if(isNaN(imagePlane.rowPixelSpacing) || isNaN(imagePlane.columnPixelSpacing)){
	  rowPixelSpacing = image.rowPixelSpacing;
	  colPixelSpacing = image.columnPixelSpacing;
	}else{
	  rowPixelSpacing = imagePlane.rowPixelSpacing || imagePlane.rowImagePixelSpacing;
	  colPixelSpacing = imagePlane.columnPixelSpacing || imagePlane.colImagePixelSpacing;
	} 
  } else {
	  rowPixelSpacing = image.rowPixelSpacing;
	  colPixelSpacing = image.columnPixelSpacing;
  }
  

  if (seriesModule) {
    modality = seriesModule.modality;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);

  // If we have tool data for this element - iterate over each set and draw it
  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    // Apply any shadow settings defined in the tool configuration
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    // Check which color the rendered tool should be
    var color = _toolColors2.default.getColorIfActive(data.active);

    // Convert Image coordinates to Canvas coordinates given the element
    var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

    // Retrieve the bounds of the ellipse (left, top, width, and height)
    // In Canvas coordinates
    var leftCanvas = Math.min(handleStartCanvas.x, handleEndCanvas.x);
    var topCanvas = Math.min(handleStartCanvas.y, handleEndCanvas.y);
    var widthCanvas = Math.abs(handleStartCanvas.x - handleEndCanvas.x);
    var heightCanvas = Math.abs(handleStartCanvas.y - handleEndCanvas.y);

    // Draw the rectangle on the canvas
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.rect(leftCanvas, topCanvas, widthCanvas, heightCanvas);
    context.stroke();

    // If the tool configuration specifies to only draw the handles on hover / active,
    // Follow this logic
    if (config && config.drawHandlesOnHover) {
      // Draw the handles if the tool is active
      if (data.active === true) {
        (0, _drawHandles2.default)(context, eventData, data.handles, color);
      } else {
        // If the tool is inactive, draw the handles only if each specific handle is being
        // Hovered over
        var handleOptions = {
          drawHandlesIfActive: true
        };

        (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);
      }
    } else {
      // If the tool has no configuration settings, always draw the handles
      (0, _drawHandles2.default)(context, eventData, data.handles, color);
    }

    // Define variables for the area and mean/standard deviation
    var area = void 0,
        meanStdDev = void 0,
        meanStdDevSUV = void 0;

    // Perform a check to see if the tool has been invalidated. This is to prevent
    // Unnecessary re-calculation of the area, mean, and standard deviation if the
    // Image is re-rendered but the tool has not moved (e.g. during a zoom)
    if (data.invalidated === false) {
      // If the data is not invalidated, retrieve it from the toolData
      meanStdDev = data.meanStdDev;
      meanStdDevSUV = data.meanStdDevSUV;
      area = data.area;
    } else {
      // If the data has been invalidated, we need to calculate it again

      // Retrieve the bounds of the ellipse in image coordinates
      var ellipse = {
        left: Math.min(data.handles.start.x, data.handles.end.x),
        top: Math.min(data.handles.start.y, data.handles.end.y),
        width: Math.abs(data.handles.start.x - data.handles.end.x),
        height: Math.abs(data.handles.start.y - data.handles.end.y)
      };

      // First, make sure this is not a color image, since no mean / standard
      // Deviation will be calculated for color images.
      if (!image.color) {
        // Retrieve the array of pixels that the ellipse bounds cover
        var pixels = cornerstone.getPixels(element, ellipse.left, ellipse.top, ellipse.width, ellipse.height);

        // Calculate the mean & standard deviation from the pixels and the ellipse details
        meanStdDev = calculateMeanStdDev(pixels, ellipse);

        if (modality === 'PT') {
          // If the image is from a PET scan, use the DICOM tags to
          // Calculate the SUV from the mean and standard deviation.

          // Note that because we are using modality pixel values from getPixels, and
          // The calculateSUV routine also rescales to modality pixel values, we are first
          // Returning the values to storedPixel values before calcuating SUV with them.
          // TODO: Clean this up? Should we add an option to not scale in calculateSUV?
          meanStdDevSUV = {
            mean: (0, _calculateSUV2.default)(image, (meanStdDev.mean - image.intercept) / image.slope),
            stdDev: (0, _calculateSUV2.default)(image, (meanStdDev.stdDev - image.intercept) / image.slope)
          };
        }

        // If the mean and standard deviation values are sane, store them for later retrieval
        if (meanStdDev && !isNaN(meanStdDev.mean)) {
          data.meanStdDev = meanStdDev;
          data.meanStdDevSUV = meanStdDevSUV;
        }
      }

      // Calculate the image area from the ellipse dimensions and pixel spacing
      area = ellipse.width * (colPixelSpacing || 1) * (ellipse.height * (rowPixelSpacing || 1));

      // If the area value is sane, store it for later retrieval
      if (!isNaN(area)) {
        data.area = area;
      }

      // Set the invalidated flag to false so that this data won't automatically be recalculated
      data.invalidated = false;
    }

    // Define an array to store the rows of text for the textbox
    var textLines = [];

    // If the mean and standard deviation values are present, display them
    if (meanStdDev && meanStdDev.mean) {
      // If the modality is CT, add HU to denote Hounsfield Units
      var moSuffix = '';

      if (modality === 'CT') {
        moSuffix = ' HU';
      }

      // Create a line of text to display the mean and any units that were specified (i.e. HU)
      var meanText = 'Mean: ' + numberWithCommas(meanStdDev.mean.toFixed(2)) + moSuffix;
      // Create a line of text to display the standard deviation and any units that were specified (i.e. HU)
      var stdDevText = 'StdDev: ' + numberWithCommas(meanStdDev.stdDev.toFixed(2)) + moSuffix;

      // If this image has SUV values to display, concatenate them to the text line
      if (meanStdDevSUV && meanStdDevSUV.mean !== undefined) {
        var SUVtext = ' SUV: ';

        meanText += SUVtext + numberWithCommas(meanStdDevSUV.mean.toFixed(2));
        stdDevText += SUVtext + numberWithCommas(meanStdDevSUV.stdDev.toFixed(2));
      }

      // Add these text lines to the array to be displayed in the textbox
      textLines.push(meanText);
      textLines.push(stdDevText);
    }

    // If the area is a sane value, display it
    if (area) {
      // Determine the area suffix based on the pixel spacing in the image.
      // If pixel spacing is present, use millimeters. Otherwise, use pixels.
      // This uses Char code 178 for a superscript 2
      var suffix = ' mm' + String.fromCharCode(178);

      if (!rowPixelSpacing || !colPixelSpacing) {
        suffix = ' pixels' + String.fromCharCode(178);
      }

      // Create a line of text to display the area and its units
      var areaText = 'Area: ' + numberWithCommas(area.toFixed(2)) + suffix;

      // Add this text line to the array to be displayed in the textbox
      textLines.push(areaText);
    }

    // If the textbox has not been moved by the user, it should be displayed on the right-most
    // Side of the tool.
    if (!data.handles.textBox.hasMoved) {
      // Find the rightmost side of the ellipse at its vertical center, and place the textbox here
      // Note that this calculates it in image coordinates
      data.handles.textBox.x = Math.max(data.handles.start.x, data.handles.end.x);
      data.handles.textBox.y = (data.handles.start.y + data.handles.end.y) / 2;
    }

    // Convert the textbox Image coordinates into Canvas coordinates
    var textCoords = cornerstone.pixelToCanvas(element, data.handles.textBox);

    // Set options for the textbox drawing function
    var options = {
      centering: {
        x: false,
        y: true
      }
    };

    // Draw the textbox and retrieves it's bounding box for mouse-dragging and highlighting
    var boundingBox = (0, _drawTextBox2.default)(context, textLines, textCoords.x, textCoords.y, color, options);

    // Store the bounding box data in the handle for mouse-dragging and highlighting
    data.handles.textBox.boundingBox = boundingBox;

    // If the textbox has moved, we would like to draw a line linking it with the tool
    // This section decides where to draw this line to on the Ellipse based on the location
    // Of the textbox relative to the ellipse.
    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between tool and text

      // The initial link position is at the center of the
      // Textbox.
      var link = {
        start: {},
        end: {
          x: textCoords.x,
          y: textCoords.y
        }
      };

      // First we calculate the ellipse points (top, left, right, and bottom)
      var ellipsePoints = [{
        // Top middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas
      }, {
        // Left middle point of ellipse
        x: leftCanvas,
        y: topCanvas + heightCanvas / 2
      }, {
        // Bottom middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas + heightCanvas
      }, {
        // Right middle point of ellipse
        x: leftCanvas + widthCanvas,
        y: topCanvas + heightCanvas / 2
      }];

      // We obtain the link starting point by finding the closest point on the ellipse to the
      // Center of the textbox
      link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(ellipsePoints, link.end);

      // Next we calculate the corners of the textbox bounding box
      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      // Now we recalculate the link endpoint by identifying which corner of the bounding box
      // Is closest to the start point we just calculated.
      link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      // Finally we draw the dashed linking line
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var rectangleRoi = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var rectangleRoiTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.rectangleRoi = rectangleRoi;
exports.rectangleRoiTouch = rectangleRoiTouch;

/***/ }),

/***/ "./imageTools/rotate.js":
/*!******************************!*\
  !*** ./imageTools/rotate.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateTouchDrag = exports.rotate = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _simpleMouseButtonTool = __webpack_require__(/*! ./simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _simpleTouchTool = __webpack_require__(/*! ./simpleTouchTool.js */ "./imageTools/simpleTouchTool.js");

var _simpleTouchTool2 = _interopRequireDefault(_simpleTouchTool);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'rotate';

function defaultStrategy(eventData, initialPoints, initialRotation) {
  // Calculate the center of the image
  var rect = eventData.element.getBoundingClientRect(eventData.element);
  var width = eventData.element.clientWidth;
  var height = eventData.element.clientHeight;

  var centerPoints = {
    x: rect.left + width / 2,
    y: rect.top + height / 2
  };

  var currentPoints = {
    x: eventData.currentPoints.client.x,
    y: eventData.currentPoints.client.y
  };

  var p0 = centerPoints;
  var p1 = initialPoints;
  var p2 = currentPoints;

  // Calculate the (interior) angle in degrees from the initial mouse location
  // To the current mouse location in relation to the center point
  var p12 = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
  var p13 = Math.sqrt(Math.pow(p0.x - p2.x, 2) + Math.pow(p0.y - p2.y, 2));
  var p23 = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  var r = Math.acos((Math.pow(p12, 2) + Math.pow(p13, 2) - Math.pow(p23, 2)) / (2 * p12 * p13)) * 180 / Math.PI;

  // The direction of the angle (> 0 clockwise, < 0 anti-clockwise)
  var d = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);

  if (d < 0) {
    r = -r;
  }

  eventData.viewport.rotation = initialRotation + r;
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);
}

function horizontalStrategy(eventData) {
  eventData.viewport.rotation += eventData.deltaPoints.page.x / eventData.viewport.scale;
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);
}

function verticalStrategy(eventData) {
  eventData.viewport.rotation += eventData.deltaPoints.page.y / eventData.viewport.scale;
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  var initialPoints = {
    x: eventData.currentPoints.client.x,
    y: eventData.currentPoints.client.y
  };

  var initialRotation = eventData.viewport.rotation;

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    var boundDragCallback = dragCallback.bind({}, initialPoints, initialRotation);

    var mouseUpCallback = function mouseUpCallback(e) {
      var eventData = e.detail;
      var element = eventData.element;

      element.removeEventListener(_events2.default.MOUSE_DRAG, boundDragCallback);
      element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
      element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
    };

    element.addEventListener(_events2.default.MOUSE_DRAG, boundDragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

    e.preventDefault();
    e.stopPropagation();
  }
}

function touchStartCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  var initialPoints = {
    x: eventData.currentPoints.client.x,
    y: eventData.currentPoints.client.y
  };

  var initialRotation = eventData.viewport.rotation;

  var boundDragCallback = dragCallback.bind({}, initialPoints, initialRotation);

  var touchEndCallback = function touchEndCallback(e) {
    var eventData = e.detail;
    var element = eventData.element;

    element.removeEventListener(_events2.default.TOUCH_DRAG, boundDragCallback);
    element.removeEventListener(_events2.default.TOUCH_END, touchEndCallback);
  };

  element.addEventListener(_events2.default.TOUCH_DRAG, boundDragCallback);
  element.addEventListener(_events2.default.TOUCH_END, touchEndCallback);

  e.preventDefault();
  e.stopPropagation();
}

function dragCallback(initialPoints, initialRotation, e) {
  var eventData = e.detail;

  rotate.strategy(eventData, initialPoints, initialRotation);
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);

  e.preventDefault();
  e.stopPropagation();
}

var rotate = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);

rotate.strategies = {
  default: defaultStrategy,
  horizontal: horizontalStrategy,
  vertical: verticalStrategy
};

rotate.strategy = defaultStrategy;

var rotateTouchDrag = (0, _simpleTouchTool2.default)(touchStartCallback, toolType);

exports.rotate = rotate;
exports.rotateTouchDrag = rotateTouchDrag;

/***/ }),

/***/ "./imageTools/rotateTouch.js":
/*!***********************************!*\
  !*** ./imageTools/rotateTouch.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function touchRotateCallback(e) {
  var eventData = e.detail;

  eventData.viewport.rotation += eventData.rotation;
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);

  return false;
}

function disable(element) {
  element.removeEventListener(_events2.default.TOUCH_ROTATE, touchRotateCallback);
}

function activate(element) {
  element.removeEventListener(_events2.default.TOUCH_ROTATE, touchRotateCallback);
  element.addEventListener(_events2.default.TOUCH_ROTATE, touchRotateCallback);
}

var rotateTouch = {
  activate: activate,
  disable: disable
};

exports.default = rotateTouch;

/***/ }),

/***/ "./imageTools/saveAs.js":
/*!******************************!*\
  !*** ./imageTools/saveAs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveAs;
function saveAs(element, filename) {
  var mimetype = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/png';

  // Setting the default value for mimetype to image/png
  var canvas = element.querySelector('canvas');

  // Thanks to Ken Fyrstenber
  // http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
  var lnk = document.createElement('a');

  // The key here is to set the download attribute of the a tag
  lnk.download = filename;

  // Convert canvas content to data-uri for link. When download
  // Attribute is set the content pointed to by link will be
  // Pushed as 'download' in HTML5 capable browsers
  lnk.href = canvas.toDataURL(mimetype, 1);

  // / create a 'fake' click-event to trigger the download
  if (document.createEvent) {
    var e = document.createEvent('MouseEvents');

    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent('onclick');
  }
}

/***/ }),

/***/ "./imageTools/scaleOverlayTool.js":
/*!****************************************!*\
  !*** ./imageTools/scaleOverlayTool.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _displayTool = __webpack_require__(/*! ./displayTool.js */ "./imageTools/displayTool.js");

var _displayTool2 = _interopRequireDefault(_displayTool);

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scaleOverlaySettings = {
  color: 'white',
  lineWidth: 2,
  shadowColor: 'black',
  shadowBlur: 4
};

function drawLine(context, startPoint, endPoint) {
  context.moveTo(startPoint.x, startPoint.y);
  context.lineTo(endPoint.x, endPoint.y);
}

function drawVerticalScalebarIntervals(context, config) {
  var i = 0;

  while (config.verticalLine.start.y + i * config.verticalMinorTick <= config.vscaleBounds.bottomRight.y) {

    var startPoint = {
      x: config.verticalLine.start.x,
      y: config.verticalLine.start.y + i * config.verticalMinorTick
    };

    var endPoint = {
      x: 0,
      y: config.verticalLine.start.y + i * config.verticalMinorTick
    };

    if (i % 5 === 0) {

      endPoint.x = config.verticalLine.start.x - config.majorTickLength;
    } else {

      endPoint.x = config.verticalLine.start.x - config.minorTickLength;
    }

    drawLine(context, startPoint, endPoint);

    i++;
  }
}

function drawHorizontalScalebarIntervals(context, config) {
  var i = 0;

  while (config.horizontalLine.start.x + i * config.horizontalMinorTick <= config.hscaleBounds.bottomRight.x) {

    var startPoint = {
      x: config.horizontalLine.start.x + i * config.horizontalMinorTick,
      y: config.horizontalLine.start.y
    };

    var endPoint = {
      x: config.horizontalLine.start.x + i * config.horizontalMinorTick,
      y: 0
    };

    if (i % 5 === 0) {
      endPoint.y = config.horizontalLine.start.y - config.majorTickLength;
    } else {
      endPoint.y = config.horizontalLine.start.y - config.minorTickLength;
    }

    drawLine(context, startPoint, endPoint);

    i++;
  }
}

function drawVerticalScalebar(context, config) {
  var startPoint = {
    x: config.verticalLine.start.x,
    y: config.verticalLine.start.y
  };
  var endPoint = {
    x: config.verticalLine.end.x,
    y: config.verticalLine.end.y
  };

  context.beginPath();
  context.strokeStyle = config.color;
  context.lineWidth = config.lineWidth;

  drawLine(context, startPoint, endPoint);
  drawVerticalScalebarIntervals(context, config);

  context.stroke();
}

function drawHorizontalScalebar(context, config) {
  var startPoint = {
    x: config.horizontalLine.start.x,
    y: config.horizontalLine.start.y
  };
  var endPoint = {
    x: config.horizontalLine.end.x,
    y: config.horizontalLine.end.y
  };

  drawLine(context, startPoint, endPoint);
  drawHorizontalScalebarIntervals(context, config);
}

function drawScalebars(context, config) {
  context.shadowColor = config.shadowColor;
  context.shadowBlur = config.shadowBlur;
  context.strokeStyle = config.color;
  context.lineWidth = config.lineWidth;

  context.beginPath();
  drawVerticalScalebar(context, config);
  drawHorizontalScalebar(context, config);
  context.stroke();
}

// Computes the max bound for scales on the image
function computeScaleBounds(eventData, canvasSize, imageSize, horizontalReduction, verticalReduction) {

  var canvasBounds = {
    left: 0,
    top: 0,
    width: canvasSize.width,
    height: canvasSize.height
  };

  var hReduction = horizontalReduction * Math.min(1000, canvasSize.width);
  var vReduction = verticalReduction * Math.min(1000, canvasSize.height);

  canvasBounds = {
    left: canvasBounds.left + hReduction,
    top: canvasBounds.top + vReduction,
    width: canvasBounds.width - 2 * hReduction,
    height: canvasBounds.height - 2 * vReduction
  };

  return {
    topLeft: {
      x: canvasBounds.left,
      y: canvasBounds.top
    },
    bottomRight: {
      x: canvasBounds.left + canvasBounds.width,
      y: canvasBounds.top + canvasBounds.height
    }
  };
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;

  var context = eventData.canvasContext.canvas.getContext('2d');
  var image = eventData.image,
      viewport = eventData.viewport;

  var cornerstone = _externalModules2.default.cornerstone;

  var imagePlane = cornerstone.metaData.get('imagePlaneModule', image.imageId);
  var rowPixelSpacing = void 0;
  var colPixelSpacing = void 0;

  if (imagePlane) {
    rowPixelSpacing = imagePlane.rowPixelSpacing || imagePlane.rowImagePixelSpacing;
    colPixelSpacing = imagePlane.columnPixelSpacing || imagePlane.colImagePixelSpacing;
  } else {
    rowPixelSpacing = image.rowPixelSpacing;
    colPixelSpacing = image.columnPixelSpacing;
  }

  // Check whether pixel spacing is defined
  if (!rowPixelSpacing || !colPixelSpacing) {
    return;
  }

  var canvasSize = {
    width: context.canvas.width,
    height: context.canvas.height
  };
  var imageSize = {
    width: image.width,
    height: image.height
  };

  // Distance between intervals is 10mm
  var verticalIntervalScale = 10.0 / rowPixelSpacing * viewport.scale;
  var horizontalIntervalScale = 10.0 / colPixelSpacing * viewport.scale;

  // 0.1 and 0.05 gives margin to horizontal and vertical lines
  var hscaleBounds = computeScaleBounds(eventData, canvasSize, imageSize, 0.25, 0.05);
  var vscaleBounds = computeScaleBounds(eventData, canvasSize, imageSize, 0.05, 0.15);

  if (!canvasSize.width || !canvasSize.height || !imageSize.width || !imageSize.height || !hscaleBounds || !vscaleBounds) {
    return;
  }

  var config = Object.assign({}, {
    hscaleBounds: hscaleBounds,
    vscaleBounds: vscaleBounds,
    verticalMinorTick: verticalIntervalScale,
    horizontalMinorTick: horizontalIntervalScale,
    minorTickLength: 12.5,
    majorTickLength: 25,
    verticalLine: {
      start: {
        x: vscaleBounds.bottomRight.x,
        y: vscaleBounds.topLeft.y
      },
      end: {
        x: vscaleBounds.bottomRight.x,
        y: vscaleBounds.bottomRight.y
      }
    },
    horizontalLine: {
      start: {
        x: hscaleBounds.topLeft.x,
        y: hscaleBounds.bottomRight.y
      },
      end: {
        x: hscaleBounds.bottomRight.x,
        y: hscaleBounds.bottomRight.y
      }
    }
  }, scaleOverlaySettings);

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.save();

  drawScalebars(context, config);
  context.restore();
}
// /////// END IMAGE RENDERING ///////

function disable(element) {
  // TODO: displayTool does not have cornerstone.updateImage(element) method to hide tool
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Module exports
var scaleOverlayTool = (0, _displayTool2.default)(onImageRendered);

scaleOverlayTool.disable = disable;

exports.default = scaleOverlayTool;

/***/ }),

/***/ "./imageTools/seedAnnotate.js":
/*!************************************!*\
  !*** ./imageTools/seedAnnotate.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedAnnotateTouch = exports.seedAnnotate = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _moveHandle = __webpack_require__(/*! ../manipulators/moveHandle.js */ "./manipulators/moveHandle.js");

var _moveHandle2 = _interopRequireDefault(_moveHandle);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawCircle = __webpack_require__(/*! ../util/drawCircle.js */ "./util/drawCircle.js");

var _drawCircle2 = _interopRequireDefault(_drawCircle);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _pointInsideBoundingBox = __webpack_require__(/*! ../util/pointInsideBoundingBox.js */ "./util/pointInsideBoundingBox.js");

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-alert:0 */
var toolType = 'seedAnnotate';

// Define a callback to get your text annotation
// This could be used, e.g. to open a modal
function getTextCallback(doneGetTextCallback) {
  doneGetTextCallback(prompt('Enter your annotation:'));
}

function changeTextCallback(data, eventData, doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Change your annotation:'));
}

var configuration = {
  getTextCallback: getTextCallback,
  changeTextCallback: changeTextCallback,
  drawHandles: false,
  drawHandlesOnHover: true,
  currentLetter: 'A',
  currentNumber: 0,
  showCoordinates: true,
  countUp: true
};
// / --- Mouse Tool --- ///

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurement(mouseEventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = mouseEventData.element;
  var config = seedAnnotate.getConfiguration();
  var measurementData = createNewMeasurement(mouseEventData);

  function doneGetTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);
  }

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  cornerstone.updateImage(element);
  (0, _moveHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
    if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    if (measurementData.text === undefined) {
      config.getTextCallback(doneGetTextCallback);
    }

    cornerstone.updateImage(element);
  });
}

function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  if (!data.handles.end) {
    return;
  }

  var realCoords = _externalModules2.default.cornerstone.pixelToCanvas(element, data.handles.end);
  var distanceToPoint = _externalModules2.default.cornerstoneMath.point.distance(realCoords, coords);

  return distanceToPoint < 25;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var enabledElement = eventData.enabledElement;

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // We need the canvas width
  var canvasWidth = eventData.canvasContext.canvas.width;

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = seedAnnotate.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw
    var handleCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    // Draw the circle always at the end of the handle
    (0, _drawCircle2.default)(context, handleCanvas, color, lineWidth);

    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    if (config.drawHandles) {
      (0, _drawHandles2.default)(context, eventData, handleCanvas, color, handleOptions);
    }

    // Draw the text
    if (data.text && data.text !== '') {
      context.font = font;

      var textPlusCoords = '';

      if (config.showCoordinates) {
        textPlusCoords = data.text + ' x: ' + Math.round(data.handles.end.x) + ' y: ' + Math.round(data.handles.end.y);
      } else {
        textPlusCoords = data.text;
      }

      // Calculate the text coordinates.
      var textWidth = context.measureText(textPlusCoords).width + 10;
      var textHeight = _textStyle2.default.getFontSize() + 10;

      var distance = Math.max(textWidth, textHeight) / 2 + 5;

      if (handleCanvas.x > canvasWidth / 2) {
        distance = -distance;
      }

      var textCoords = void 0;

      if (!data.handles.textBox.hasMoved) {
        textCoords = {
          x: handleCanvas.x - textWidth / 2 + distance,
          y: handleCanvas.y - textHeight / 2
        };

        var transform = cornerstone.internal.getTransform(enabledElement);

        transform.invert();

        var coords = transform.transformPoint(textCoords.x, textCoords.y);

        data.handles.textBox.x = coords.x;
        data.handles.textBox.y = coords.y;
      }

      textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);

      var boundingBox = (0, _drawTextBox2.default)(context, textPlusCoords, textCoords.x, textCoords.y, color);

      data.handles.textBox.boundingBox = boundingBox;

      if (data.handles.textBox.hasMoved) {
        // Draw dashed link line between tool and text
        var link = {
          start: {},
          end: {}
        };

        link.end.x = textCoords.x;
        link.end.y = textCoords.y;

        link.start = handleCanvas;

        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}
// ---- Touch tool ----

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurementTouch(touchEventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = touchEventData.element;
  var config = seedAnnotate.getConfiguration();
  var measurementData = createNewMeasurement(touchEventData);

  function doneGetTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);
  }

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  cornerstone.updateImage(element);
  (0, _moveHandle2.default)(touchEventData, toolType, measurementData, measurementData.handles.end, function () {
    if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    if (measurementData.text === undefined) {
      config.getTextCallback(doneGetTextCallback);
    }

    cornerstone.updateImage(element);
  });
}

function doubleClickCallback(e) {
  var eventData = e.detail;
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;
  var data = void 0;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if (!(0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    return;
  }

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);
  }

  var config = seedAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {

      data.active = true;
      cornerstone.updateImage(element);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  e.preventDefault();
  e.stopPropagation();
}

function pressCallback(e) {
  var eventData = e.detail;
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    console.log('pressCallback doneChangingTextCallback');
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    element.addEventListener(_events2.default.TOUCH_START, seedAnnotateTouch.touchStartCallback);
    element.addEventListener(_events2.default.TOUCH_START_ACTIVE, seedAnnotateTouch.touchDownActivateCallback);
    element.addEventListener(_events2.default.TAP, seedAnnotateTouch.tapCallback);
  }

  var config = seedAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return false;
  }

  if (eventData.handlePressed) {
    element.removeEventListener(_events2.default.TOUCH_START, seedAnnotateTouch.touchStartCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, seedAnnotateTouch.touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, seedAnnotateTouch.tapCallback);

    // Allow relabelling via a callback
    config.changeTextCallback(eventData.handlePressed, eventData, doneChangingTextCallback);

    e.stopImmediatePropagation();

    return false;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      element.removeEventListener(_events2.default.TOUCH_START, seedAnnotateTouch.touchStartCallback);
      element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, seedAnnotateTouch.touchDownActivateCallback);
      element.removeEventListener(_events2.default.TAP, seedAnnotateTouch.tapCallback);

      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  e.preventDefault();
  e.stopPropagation();
}

var seedAnnotate = (0, _mouseButtonTool2.default)({
  addNewMeasurement: addNewMeasurement,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  mouseDoubleClickCallback: doubleClickCallback
});

seedAnnotate.setConfiguration(configuration);

var seedAnnotateTouch = (0, _touchTool2.default)({
  addNewMeasurement: addNewMeasurementTouch,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  pressCallback: pressCallback
});

exports.seedAnnotate = seedAnnotate;
exports.seedAnnotateTouch = seedAnnotateTouch;

/***/ }),

/***/ "./imageTools/simpleAngle.js":
/*!***********************************!*\
  !*** ./imageTools/simpleAngle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleAngleTouch = exports.simpleAngle = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _roundToDecimal = __webpack_require__(/*! ../util/roundToDecimal.js */ "./util/roundToDecimal.js");

var _roundToDecimal2 = _interopRequireDefault(_roundToDecimal);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _moveNewHandle = __webpack_require__(/*! ../manipulators/moveNewHandle.js */ "./manipulators/moveNewHandle.js");

var _moveNewHandle2 = _interopRequireDefault(_moveNewHandle);

var _moveNewHandleTouch = __webpack_require__(/*! ../manipulators/moveNewHandleTouch.js */ "./manipulators/moveNewHandleTouch.js");

var _moveNewHandleTouch2 = _interopRequireDefault(_moveNewHandleTouch);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'simpleAngle';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var angleData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      middle: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return angleData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.middle)
  };

  var distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  if (distanceToPoint < 25) {
    return true;
  }

  lineSegment.start = cornerstone.pixelToCanvas(element, data.handles.middle);
  lineSegment.end = cornerstone.pixelToCanvas(element, data.handles.end);

  distanceToPoint = _externalModules2.default.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 25;
}

function length(vector) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var enabledElement = eventData.enabledElement;

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Activation color
  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = simpleAngle.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    // Differentiate the color of activation tool
    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
    var handleMiddleCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.middle);
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    // Draw the line
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleMiddleCanvas.x, handleMiddleCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);
    context.stroke();

    // Draw the handles
    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);

    // Draw the text
    context.fillStyle = color;

    // Default to isotropic pixel size, update suffix to reflect this
    var columnPixelSpacing = eventData.image.columnPixelSpacing || 1;
    var rowPixelSpacing = eventData.image.rowPixelSpacing || 1;
    var suffix = '';

    if (!eventData.image.rowPixelSpacing || !eventData.image.columnPixelSpacing) {
      suffix = ' (isotropic)';
    }

    var sideA = {
      x: (Math.ceil(data.handles.middle.x) - Math.ceil(data.handles.start.x)) * columnPixelSpacing,
      y: (Math.ceil(data.handles.middle.y) - Math.ceil(data.handles.start.y)) * rowPixelSpacing
    };

    var sideB = {
      x: (Math.ceil(data.handles.end.x) - Math.ceil(data.handles.middle.x)) * columnPixelSpacing,
      y: (Math.ceil(data.handles.end.y) - Math.ceil(data.handles.middle.y)) * rowPixelSpacing
    };

    var sideC = {
      x: (Math.ceil(data.handles.end.x) - Math.ceil(data.handles.start.x)) * columnPixelSpacing,
      y: (Math.ceil(data.handles.end.y) - Math.ceil(data.handles.start.y)) * rowPixelSpacing
    };

    var sideALength = length(sideA);
    var sideBLength = length(sideB);
    var sideCLength = length(sideC);

    // Cosine law
    var angle = Math.acos((Math.pow(sideALength, 2) + Math.pow(sideBLength, 2) - Math.pow(sideCLength, 2)) / (2 * sideALength * sideBLength));

    angle *= 180 / Math.PI;

    var rAngle = (0, _roundToDecimal2.default)(angle, 2);

    if (rAngle) {
      var str = '00B0'; // Degrees symbol
      var text = rAngle.toString() + String.fromCharCode(parseInt(str, 16)) + suffix;

      var distance = 15;

      var textCoords = void 0;

      if (data.handles.textBox.hasMoved) {
        textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);
      } else {
        textCoords = {
          x: handleMiddleCanvas.x,
          y: handleMiddleCanvas.y
        };

        context.font = font;
        var textWidth = context.measureText(text).width;

        if (handleMiddleCanvas.x < handleStartCanvas.x) {
          textCoords.x -= distance + textWidth + 10;
        } else {
          textCoords.x += distance;
        }

        var transform = cornerstone.internal.getTransform(enabledElement);

        transform.invert();

        var coords = transform.transformPoint(textCoords.x, textCoords.y);

        data.handles.textBox.x = coords.x;
        data.handles.textBox.y = coords.y;
      }

      var options = {
        centering: {
          x: false,
          y: true
        }
      };

      var boundingBox = (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color, options);

      data.handles.textBox.boundingBox = boundingBox;

      if (data.handles.textBox.hasMoved) {
        // Draw dashed link line between tool and text
        var link = {
          start: {},
          end: {}
        };

        var points = [handleStartCanvas, handleEndCanvas, handleMiddleCanvas];

        link.end.x = textCoords.x;
        link.end.y = textCoords.y;

        link.start = _externalModules2.default.cornerstoneMath.point.findClosestPoint(points, link.end);

        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        link.end = _externalModules2.default.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurement(mouseEventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var measurementData = createNewMeasurement(mouseEventData);
  var element = mouseEventData.element;

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  // Since we are dragging to another place to drop the end point, we can just activate
  // The end point and let the moveHandle move it for us.
  element.removeEventListener(_events2.default.MOUSE_MOVE, simpleAngle.mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, simpleAngle.mouseMoveCallback);
  element.removeEventListener(_events2.default.MOUSE_DOWN, simpleAngle.mouseDownCallback);
  element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, simpleAngle.mouseDownActivateCallback);
  cornerstone.updateImage(element);

  (0, _moveNewHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.middle, function () {
    measurementData.active = false;
    if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);

      element.addEventListener(_events2.default.MOUSE_MOVE, simpleAngle.mouseMoveCallback);
      element.addEventListener(_events2.default.MOUSE_DRAG, simpleAngle.mouseMoveCallback);
      element.addEventListener(_events2.default.MOUSE_DOWN, simpleAngle.mouseDownCallback);
      element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, simpleAngle.mouseDownActivateCallback);
      cornerstone.updateImage(element);

      return;
    }

    measurementData.handles.end.active = true;
    cornerstone.updateImage(element);

    (0, _moveNewHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, toolType, measurementData);
      }

      element.addEventListener(_events2.default.MOUSE_MOVE, simpleAngle.mouseMoveCallback);
      element.addEventListener(_events2.default.MOUSE_DRAG, simpleAngle.mouseMoveCallback);
      element.addEventListener(_events2.default.MOUSE_DOWN, simpleAngle.mouseDownCallback);
      element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, simpleAngle.mouseDownActivateCallback);
      cornerstone.updateImage(element);
    });
  });
}

function addNewMeasurementTouch(touchEventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var measurementData = createNewMeasurement(touchEventData);
  var element = touchEventData.element;

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  // Since we are dragging to another place to drop the end point, we can just activate
  // The end point and let the moveHandle move it for us.
  element.removeEventListener(_events2.default.TOUCH_DRAG, simpleAngleTouch.touchMoveCallback);
  element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, simpleAngleTouch.touchDownActivateCallback);
  element.removeEventListener(_events2.default.TOUCH_START, simpleAngleTouch.touchStartCallback);
  element.removeEventListener(_events2.default.TAP, simpleAngleTouch.tapCallback);
  cornerstone.updateImage(element);

  (0, _moveNewHandleTouch2.default)(touchEventData, toolType, measurementData, measurementData.handles.middle, function () {
    if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
      element.addEventListener(_events2.default.TOUCH_DRAG, simpleAngleTouch.touchMoveCallback);
      element.addEventListener(_events2.default.TOUCH_START, simpleAngleTouch.touchStartCallback);
      element.addEventListener(_events2.default.TOUCH_START_ACTIVE, simpleAngleTouch.touchDownActivateCallback);
      element.addEventListener(_events2.default.TAP, simpleAngleTouch.tapCallback);
      cornerstone.updateImage(element);

      return;
    }

    (0, _moveNewHandleTouch2.default)(touchEventData, toolType, measurementData, measurementData.handles.end, function () {
      if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, toolType, measurementData);
        cornerstone.updateImage(element);
      }

      element.addEventListener(_events2.default.TOUCH_DRAG, simpleAngleTouch.touchMoveCallback);
      element.addEventListener(_events2.default.TOUCH_START, simpleAngleTouch.touchStartCallback);
      element.addEventListener(_events2.default.TOUCH_START_ACTIVE, simpleAngleTouch.touchDownActivateCallback);
      element.addEventListener(_events2.default.TAP, simpleAngleTouch.tapCallback);
    });
  });
}

var simpleAngle = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  addNewMeasurement: addNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var simpleAngleTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  addNewMeasurement: addNewMeasurementTouch,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.simpleAngle = simpleAngle;
exports.simpleAngleTouch = simpleAngleTouch;

/***/ }),

/***/ "./imageTools/simpleMouseButtonTool.js":
/*!*********************************************!*\
  !*** ./imageTools/simpleMouseButtonTool.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseDownCallback, toolType) {
  if (!toolType) {
    throw new Error('simpleMouseButtonTool: toolType is required');
  }

  var configuration = {};

  return {
    activate: function activate(element, mouseButtonMask) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options.mouseButtonMask = mouseButtonMask;
      (0, _toolOptions.setToolOptions)(toolType, element, options);

      element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownCallback);
      element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownCallback);
    },
    disable: function disable(element) {
      element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownCallback);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownCallback);
    },
    deactivate: function deactivate(element) {
      element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownCallback);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/simpleTouchTool.js":
/*!***************************************!*\
  !*** ./imageTools/simpleTouchTool.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchStartCallback, toolType) {
  if (!toolType) {
    throw new Error('simpleTouchTool: toolType is required');
  }

  var configuration = {};

  return {
    activate: function activate(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _toolOptions.setToolOptions)(toolType, element, options);

      element.removeEventListener(_events2.default.TOUCH_START, touchStartCallback);
      element.addEventListener(_events2.default.TOUCH_START, touchStartCallback);
    },
    disable: function disable(element) {
      element.removeEventListener(_events2.default.TOUCH_START, touchStartCallback);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.TOUCH_START, touchStartCallback);
    },
    deactivate: function deactivate(element) {
      element.removeEventListener(_events2.default.TOUCH_START, touchStartCallback);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/textMarker.js":
/*!**********************************!*\
  !*** ./imageTools/textMarker.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textMarkerTouch = exports.textMarker = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ./mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(/*! ./touchTool.js */ "./imageTools/touchTool.js");

var _touchTool2 = _interopRequireDefault(_touchTool);

var _pointInsideBoundingBox = __webpack_require__(/*! ../util/pointInsideBoundingBox.js */ "./util/pointInsideBoundingBox.js");

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'textMarker';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  var config = textMarker.getConfiguration();

  if (!config.current) {
    return;
  }

  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    text: config.current,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true,
        hasBoundingBox: true
      }
    }
  };

  // Create a rectangle representing the image
  var imageRect = {
    left: 0,
    top: 0,
    width: mouseEventData.image.width,
    height: mouseEventData.image.height
  };

  // Check if the current handle is outside the image,
  // If it is, prevent the handle creation
  if (!_externalModules2.default.cornerstoneMath.point.insideRect(measurementData.handles.end, imageRect)) {
    return;
  }

  // Update the current marker for the next marker
  var currentIndex = config.markers.indexOf(config.current);

  if (config.ascending) {
    currentIndex += 1;
    if (currentIndex >= config.markers.length) {
      if (config.loop) {
        currentIndex -= config.markers.length;
      } else {
        currentIndex = -1;
      }
    }
  } else {
    currentIndex -= 1;
    if (currentIndex < 0) {
      if (config.loop) {
        currentIndex += config.markers.length;
      } else {
        currentIndex = -1;
      }
    }
  }

  config.current = config.markers[currentIndex];

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function pointNearTool(element, data, coords) {
  if (data.visible === false) {
    return false;
  }

  if (!data.handles.end.boundingBox) {
    return;
  }

  var distanceToPoint = _externalModules2.default.cornerstoneMath.rect.distanceToPoint(data.handles.end.boundingBox, coords);
  var insideBoundingBox = (0, _pointInsideBoundingBox2.default)(data.handles.end, coords);

  return distanceToPoint < 10 || insideBoundingBox;
}

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var config = textMarker.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    var data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    var color = _toolColors2.default.getToolColor();

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    }

    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    // Draw text
    context.fillStyle = color;
    var measureText = context.measureText(data.text);

    data.textWidth = measureText.width + 10;

    var textCoords = _externalModules2.default.cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    var options = {
      centering: {
        x: true,
        y: true
      }
    };

    data.handles.end.boundingBox = (0, _drawTextBox2.default)(context, data.text, textCoords.x, textCoords.y - 10, color, options);

    context.restore();
  }
}

function doubleClickCallback(e) {
  var eventData = e.detail;
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;
  var data = void 0;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if (!(0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    return;
  }

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    element.addEventListener(_events2.default.MOUSE_MOVE, textMarker.mouseMoveCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN, textMarker.mouseDownCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, textMarker.mouseDownActivateCallback);
    element.addEventListener(_events2.default.MOUSE_DOUBLE_CLICK, textMarker.mouseDoubleClickCallback);
  }

  var config = textMarker.getConfiguration();
  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      element.removeEventListener(_events2.default.MOUSE_MOVE, textMarker.mouseMoveCallback);
      element.removeEventListener(_events2.default.MOUSE_DOWN, textMarker.mouseDownCallback);
      element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, textMarker.mouseDownActivateCallback);
      element.removeEventListener(_events2.default.MOUSE_DOUBLE_CLICK, textMarker.mouseDoubleClickCallback);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();
      e.preventDefault();
      e.stopPropagation();

      return;
    }
  }

  e.preventDefault();
  e.stopPropagation();
}

function touchPressCallback(e) {
  var eventData = e.detail;
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    element.addEventListener(_events2.default.TOUCH_DRAG, textMarkerTouch.touchMoveCallback);
    element.addEventListener(_events2.default.TOUCH_START_ACTIVE, textMarkerTouch.touchDownActivateCallback);
    element.addEventListener(_events2.default.TOUCH_START, textMarkerTouch.touchStartCallback);
    element.addEventListener(_events2.default.TAP, textMarkerTouch.tapCallback);
    element.addEventListener(_events2.default.TOUCH_PRESS, textMarkerTouch.pressCallback);
  }

  var config = textMarker.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return false;
  }

  if (eventData.handlePressed) {
    eventData.handlePressed.active = true;
    cornerstone.updateImage(element);

    element.removeEventListener(_events2.default.TOUCH_DRAG, textMarkerTouch.touchMoveCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, textMarkerTouch.touchDownActivateCallback);
    element.removeEventListener(_events2.default.TOUCH_START, textMarkerTouch.touchStartCallback);
    element.removeEventListener(_events2.default.TAP, textMarkerTouch.tapCallback);
    element.removeEventListener(_events2.default.TOUCH_PRESS, textMarkerTouch.pressCallback);

    // Allow relabelling via a callback
    config.changeTextCallback(eventData.handlePressed, eventData, doneChangingTextCallback);

    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      element.removeEventListener(_events2.default.TOUCH_DRAG, textMarkerTouch.touchMoveCallback);
      element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, textMarkerTouch.touchDownActivateCallback);
      element.removeEventListener(_events2.default.TOUCH_START, textMarkerTouch.touchStartCallback);
      element.removeEventListener(_events2.default.TAP, textMarkerTouch.tapCallback);
      element.removeEventListener(_events2.default.TOUCH_PRESS, textMarkerTouch.pressCallback);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();
      e.preventDefault();
      e.stopPropagation();

      return;
    }
  }

  e.preventDefault();
  e.stopPropagation();
}

var textMarker = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  mouseDoubleClickCallback: doubleClickCallback
});

var textMarkerTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  pressCallback: touchPressCallback
});

exports.textMarker = textMarker;
exports.textMarkerTouch = textMarkerTouch;

/***/ }),

/***/ "./imageTools/touchDragTool.js":
/*!*************************************!*\
  !*** ./imageTools/touchDragTool.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchDragCallback, toolType, options) {
  var events = [_events2.default.TOUCH_DRAG];

  if (options && options.fireOnTouchStart === true) {
    events.push(_events2.default.TOUCH_START);
  }

  return {
    activate: function activate(element) {
      if (options && options.eventData) {
        (0, _toolOptions.setToolOptions)(toolType, element, options.eventData);
      }

      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
        element.addEventListener(eventType, touchDragCallback);
      });

      if (options && options.activateCallback) {
        options.activateCallback(element);
      }
    },
    disable: function disable(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
      });

      if (options && options.disableCallback) {
        options.disableCallback(element);
      }
    },
    enable: function enable(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
      });

      if (options && options.enableCallback) {
        options.enableCallback(element);
      }
    },
    deactivate: function deactivate(element) {
      events.forEach(function (eventType) {
        element.removeEventListener(eventType, touchDragCallback);
      });

      if (options && options.deactivateCallback) {
        options.deactivateCallback(element);
      }
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/touchPinchTool.js":
/*!**************************************!*\
  !*** ./imageTools/touchPinchTool.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchPinchCallback) {
  return {
    activate: function activate(element) {
      element.removeEventListener(_events2.default.TOUCH_PINCH, touchPinchCallback);
      element.addEventListener(_events2.default.TOUCH_PINCH, touchPinchCallback);
    },
    disable: function disable(element) {
      element.removeEventListener(_events2.default.TOUCH_PINCH, touchPinchCallback);
    },
    enable: function enable(element) {
      element.removeEventListener(_events2.default.TOUCH_PINCH, touchPinchCallback);
    },
    deactivate: function deactivate(element) {
      element.removeEventListener(_events2.default.TOUCH_PINCH, touchPinchCallback);
    }
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./imageTools/touchTool.js":
/*!*********************************!*\
  !*** ./imageTools/touchTool.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _anyHandlesOutsideImage = __webpack_require__(/*! ../manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _getHandleNearImagePoint = __webpack_require__(/*! ../manipulators/getHandleNearImagePoint.js */ "./manipulators/getHandleNearImagePoint.js");

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

var _touchMoveHandle = __webpack_require__(/*! ../manipulators/touchMoveHandle.js */ "./manipulators/touchMoveHandle.js");

var _touchMoveHandle2 = _interopRequireDefault(_touchMoveHandle);

var _moveNewHandleTouch = __webpack_require__(/*! ../manipulators/moveNewHandleTouch.js */ "./manipulators/moveNewHandleTouch.js");

var _moveNewHandleTouch2 = _interopRequireDefault(_moveNewHandleTouch);

var _touchMoveAllHandles = __webpack_require__(/*! ../manipulators/touchMoveAllHandles.js */ "./manipulators/touchMoveAllHandles.js");

var _touchMoveAllHandles2 = _interopRequireDefault(_touchMoveAllHandles);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deactivateAllHandles(handles) {
  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    handle.active = false;
  });
}

function deactivateAllToolInstances(toolData) {
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    var data = toolData.data[i];

    data.active = false;
    if (!data.handles) {
      continue;
    }

    deactivateAllHandles(data.handles);
  }
}

function touchTool(touchToolInterface) {
  // /////// BEGIN ACTIVE TOOL ///////
  function addNewMeasurement(touchEventData) {
    // Console.log('touchTool addNewMeasurement');
    var cornerstone = _externalModules2.default.cornerstone;
    var element = touchEventData.element;

    var measurementData = touchToolInterface.createNewMeasurement(touchEventData);

    if (!measurementData) {
      return;
    }

    (0, _toolState.addToolState)(element, touchToolInterface.toolType, measurementData);

    if (Object.keys(measurementData.handles).length === 1 && touchEventData.type === _events2.default.TAP) {
      measurementData.active = false;
      measurementData.handles.end.active = false;
      measurementData.handles.end.highlight = false;
      measurementData.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, touchToolInterface.toolType, measurementData);
      }

      cornerstone.updateImage(element);

      return;
    }

    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
    element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);

    cornerstone.updateImage(element);
    (0, _moveNewHandleTouch2.default)(touchEventData, touchToolInterface.toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      measurementData.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, touchToolInterface.toolType, measurementData);
      }

      element.addEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
      element.addEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
      element.addEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
      cornerstone.updateImage(element);
    });
  }

  function touchDownActivateCallback(e) {
    var eventData = e.detail;

    // Console.log('touchTool touchDownActivateCallback');
    if (touchToolInterface.addNewMeasurement) {
      touchToolInterface.addNewMeasurement(eventData);
    } else {
      addNewMeasurement(eventData);
    }

    e.stopImmediatePropagation();
    e.preventDefault();
  }
  // /////// END ACTIVE TOOL ///////

  // /////// BEGIN INACTIVE TOOL ///////
  function tapCallback(e) {
    var eventData = e.detail;

    // Console.log('touchTool tapCallback');
    var cornerstone = _externalModules2.default.cornerstone;
    var element = eventData.element;
    var coords = eventData.currentPoints.canvas;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, touchToolInterface.toolType);
    var data = void 0;
    var i = void 0;

    // Deactivate everything
    deactivateAllToolInstances(toolData);

    function doneMovingCallback() {
      // Console.log('touchTool tapCallback doneMovingCallback');
      deactivateAllToolInstances(toolData);
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, touchToolInterface.toolType, data);
      }

      cornerstone.updateImage(element);
      element.addEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
      element.addEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
    }

    // Now check to see if there is a handle we can move
    if (toolData) {
      for (i = 0; i < toolData.data.length; i++) {
        data = toolData.data[i];
        var distanceSq = 25; // Should probably make this a settable property later
        var handle = (0, _getHandleNearImagePoint2.default)(element, data.handles, coords, distanceSq);

        if (handle) {
          element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
          element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
          data.active = true;
          handle.active = true;
          cornerstone.updateImage(element);
          (0, _touchMoveHandle2.default)(e, touchToolInterface.toolType, data, handle, doneMovingCallback);
          e.stopImmediatePropagation();
          e.preventDefault();

          return;
        }
      }
    }

    // Now check to see if we have a tool that we can move
    if (toolData && touchToolInterface.pointNearTool) {
      for (i = 0; i < toolData.data.length; i++) {
        data = toolData.data[i];
        if (touchToolInterface.pointNearTool(element, data, coords)) {
          element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
          element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
          data.active = true;
          cornerstone.updateImage(element);
          (0, _touchMoveAllHandles2.default)(e, data, toolData, touchToolInterface.toolType, true, doneMovingCallback);
          e.stopImmediatePropagation();
          e.preventDefault();

          return;
        }
      }
    }

    // If there is nothing to move, add a new instance of the tool
    // Need to check here to see if activation is allowed!
    if (touchToolInterface.touchDownActivateCallback) {
      touchToolInterface.touchDownActivateCallback(e);
    } else {
      touchDownActivateCallback(e);
    }

    return false;
  }

  function touchStartCallback(e) {
    var eventData = e.detail;

    // Console.log('touchTool touchStartCallback');
    var cornerstone = _externalModules2.default.cornerstone;
    var element = eventData.element;
    var coords = eventData.startPoints.canvas;
    var data = void 0;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, touchToolInterface.toolType);
    var i = void 0;

    function doneMovingCallback(lastEvent, lastEventData) {
      // Console.log('touchTool touchStartCallback doneMovingCallback');
      data.active = false;
      data.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(eventData.element, touchToolInterface.toolType, data);
      }

      cornerstone.updateImage(eventData.element);
      element.addEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
      element.addEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);

      if (touchToolInterface.pressCallback) {
        element.addEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
      }

      if (lastEvent && lastEvent.type === _events2.default.TOUCH_PRESS) {
        (0, _triggerEvent2.default)(element, lastEvent.type, lastEventData);
      }
    }

    // Now check to see if there is a handle we can move

    // Average pixel width of index finger is 45-57 pixels
    // https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/
    var distance = 28;

    if (!toolData) {
      return;
    }

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];

      var handle = (0, _getHandleNearImagePoint2.default)(eventData.element, data.handles, coords, distance);

      if (handle) {
        element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
        element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
        if (touchToolInterface.pressCallback) {
          element.removeEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
        }

        data.active = true;
        (0, _touchMoveHandle2.default)(e, touchToolInterface.toolType, data, handle, doneMovingCallback);
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        return;
      }
    }

    // Now check to see if we have a tool that we can move
    if (!touchToolInterface.pointNearTool) {
      return;
    }

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];

      if (touchToolInterface.pointNearTool(eventData.element, data, coords)) {
        element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
        element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);
        if (touchToolInterface.pressCallback) {
          element.removeEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
        }

        (0, _touchMoveAllHandles2.default)(e, data, toolData, touchToolInterface.toolType, true, doneMovingCallback);
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        return;
      }
    }
  }
  // /////// END INACTIVE TOOL ///////

  // Not visible, not interactive
  function disable(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);

    if (touchToolInterface.doubleTapCallback) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      element.removeEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible but not interactive
  function enable(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);

    element.addEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);

    if (touchToolInterface.doubleTapCallback) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      element.removeEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible, interactive and can create
  function activate(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);

    element.addEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);
    element.addEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
    element.addEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    element.addEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);

    if (touchToolInterface.doubleTapCallback) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, touchToolInterface.doubleTapCallback);
      element.addEventListener(_events2.default.DOUBLE_TAP, touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      element.removeEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
      element.addEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  // Visible, interactive
  function deactivate(element) {
    var eventType = _events2.default.TOOL_DEACTIVATED;
    var statusChangeEventData = {
      toolType: touchToolInterface.toolType,
      type: eventType
    };

    (0, _triggerEvent2.default)(element, eventType, statusChangeEventData);

    element.removeEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);
    element.removeEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);
    element.removeEventListener(_events2.default.TOUCH_START_ACTIVE, touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    element.removeEventListener(_events2.default.TAP, touchToolInterface.tapCallback || tapCallback);

    element.addEventListener(_events2.default.IMAGE_RENDERED, touchToolInterface.onImageRendered);
    element.addEventListener(_events2.default.TOUCH_START, touchToolInterface.touchStartCallback || touchStartCallback);

    if (touchToolInterface.doubleTapCallback) {
      element.removeEventListener(_events2.default.DOUBLE_TAP, touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      element.removeEventListener(_events2.default.TOUCH_PRESS, touchToolInterface.pressCallback);
    }

    _externalModules2.default.cornerstone.updateImage(element);
  }

  var toolInterface = {
    enable: enable,
    disable: disable,
    activate: activate,
    deactivate: deactivate,
    touchStartCallback: touchToolInterface.touchStartCallback || touchStartCallback,
    touchDownActivateCallback: touchToolInterface.touchDownActivateCallback || touchDownActivateCallback,
    tapCallback: touchToolInterface.tapCallback || tapCallback
  };

  // Expose pointNearTool if available
  if (touchToolInterface.pointNearTool) {
    toolInterface.pointNearTool = touchToolInterface.pointNearTool;
  }

  if (touchToolInterface.doubleTapCallback) {
    toolInterface.doubleTapCallback = touchToolInterface.doubleTapCallback;
  }

  if (touchToolInterface.pressCallback) {
    toolInterface.pressCallback = touchToolInterface.pressCallback;
  }

  if (touchToolInterface.addNewMeasurement) {
    toolInterface.addNewMeasurement = touchToolInterface.addNewMeasurement;
  }

  return toolInterface;
}

exports.default = touchTool;

/***/ }),

/***/ "./imageTools/wwwc.js":
/*!****************************!*\
  !*** ./imageTools/wwwc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wwwcTouchDrag = exports.wwwc = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _simpleMouseButtonTool = __webpack_require__(/*! ./simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(/*! ./touchDragTool.js */ "./imageTools/touchDragTool.js");

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'wwwc';

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

    e.preventDefault();
    e.stopPropagation();
  }
}

function defaultStrategy(eventData) {
  // Here we normalize the ww/wc adjustments so the same number of on screen pixels
  // Adjusts the same percentage of the dynamic range of the image.  This is needed to
  // Provide consistency for the ww/wc tool regardless of the dynamic range (e.g. an 8 bit
  // Image will feel the same as a 16 bit image would)
  var maxVOI = eventData.image.maxPixelValue * eventData.image.slope + eventData.image.intercept;
  var minVOI = eventData.image.minPixelValue * eventData.image.slope + eventData.image.intercept;
  var imageDynamicRange = maxVOI - minVOI;
  var multiplier = imageDynamicRange / 1024;

  var deltaX = eventData.deltaPoints.page.x * multiplier;
  var deltaY = eventData.deltaPoints.page.y * multiplier;

  eventData.viewport.voi.windowWidth += deltaX;
  eventData.viewport.voi.windowCenter += deltaY;
}

function mouseDragCallback(e) {
  var eventData = e.detail;

  wwwc.strategy(eventData);
  _externalModules2.default.cornerstone.setViewport(eventData.element, eventData.viewport);
}

function touchDragCallback(e) {
  var eventData = e.detail;

  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events
  var dragData = eventData;

  var maxVOI = dragData.image.maxPixelValue * dragData.image.slope + dragData.image.intercept;
  var minVOI = dragData.image.minPixelValue * dragData.image.slope + dragData.image.intercept;
  var imageDynamicRange = maxVOI - minVOI;
  var multiplier = imageDynamicRange / 1024;
  var deltaX = dragData.deltaPoints.page.x * multiplier;
  var deltaY = dragData.deltaPoints.page.y * multiplier;

  var config = wwwc.getConfiguration();

  if (config.orientation) {
    if (config.orientation === 0) {
      dragData.viewport.voi.windowWidth += deltaX;
      dragData.viewport.voi.windowCenter += deltaY;
    } else {
      dragData.viewport.voi.windowWidth += deltaY;
      dragData.viewport.voi.windowCenter += deltaX;
    }
  } else {
    dragData.viewport.voi.windowWidth += deltaX;
    dragData.viewport.voi.windowCenter += deltaY;
  }

  _externalModules2.default.cornerstone.setViewport(dragData.element, dragData.viewport);
}

var wwwc = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);

wwwc.strategies = {
  default: defaultStrategy
};

wwwc.strategy = defaultStrategy;

var wwwcTouchDrag = (0, _touchDragTool2.default)(touchDragCallback);

exports.wwwc = wwwc;
exports.wwwcTouchDrag = wwwcTouchDrag;

/***/ }),

/***/ "./imageTools/wwwcRegion.js":
/*!**********************************!*\
  !*** ./imageTools/wwwcRegion.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wwwcRegionTouch = exports.wwwcRegion = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _getLuminance = __webpack_require__(/*! ../util/getLuminance.js */ "./util/getLuminance.js");

var _getLuminance2 = _interopRequireDefault(_getLuminance);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'wwwcRegion';

var configuration = {
  minWindowWidth: 10
};

/** Calculates the minimum, maximum, and mean value in the given pixel array */
function calculateMinMaxMean(storedPixelLuminanceData, globalMin, globalMax) {
  var numPixels = storedPixelLuminanceData.length;

  if (numPixels < 2) {
    return {
      min: globalMin,
      max: globalMax,
      mean: (globalMin + globalMax) / 2
    };
  }

  var min = globalMax;
  var max = globalMin;
  var sum = 0;

  for (var index = 0; index < numPixels; index++) {
    var spv = storedPixelLuminanceData[index];

    min = Math.min(min, spv);
    max = Math.max(max, spv);
    sum += spv;
  }

  return {
    min: min,
    max: max,
    mean: sum / numPixels
  };
}

/* Erases the toolData and rebinds the handlers when the image changes */
function newImageCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  if (toolData && toolData.data) {
    toolData.data = [];
  }

  element.removeEventListener(_events2.default.MOUSE_MOVE, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);

  element.removeEventListener(_events2.default.MOUSE_UP, dragEndCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, dragEndCallback);

  element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
}

/* Applies the windowing procedure when the mouse drag ends */
function dragEndCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_MOVE, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);

  element.removeEventListener(_events2.default.MOUSE_UP, dragEndCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, dragEndCallback);

  element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);

  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  // Update the endpoint as the mouse/touch is dragged
  toolData.data[0].endPoint = {
    x: eventData.currentPoints.image.x,
    y: eventData.currentPoints.image.y
  };

  applyWWWCRegion(eventData);
}

/** Calculates the minimum and maximum value in the given pixel array */
function applyWWWCRegion(eventData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var startPoint = toolData.data[0].startPoint;
  var endPoint = toolData.data[0].endPoint;

  // Get the rectangular region defined by the handles
  var width = Math.abs(startPoint.x - endPoint.x);
  var height = Math.abs(startPoint.y - endPoint.y);

  var left = Math.min(startPoint.x, endPoint.x);
  var top = Math.min(startPoint.y, endPoint.y);

  // Bound the rectangle so we don't get undefined pixels
  left = Math.max(left, 0);
  left = Math.min(left, eventData.image.width);
  top = Math.max(top, 0);
  top = Math.min(top, eventData.image.height);
  width = Math.floor(Math.min(width, Math.abs(eventData.image.width - left)));
  height = Math.floor(Math.min(height, Math.abs(eventData.image.height - top)));

  // Get the pixel data in the rectangular region
  var pixelLuminanceData = (0, _getLuminance2.default)(eventData.element, left, top, width, height);

  // Calculate the minimum and maximum pixel values
  var minMaxMean = calculateMinMaxMean(pixelLuminanceData, eventData.image.minPixelValue, eventData.image.maxPixelValue);

  // Adjust the viewport window width and center based on the calculated values
  var config = wwwcRegion.getConfiguration();
  var viewport = cornerstone.getViewport(eventData.element);

  if (config.minWindowWidth === undefined) {
    config.minWindowWidth = 10;
  }

  viewport.voi.windowWidth = Math.max(Math.abs(minMaxMean.max - minMaxMean.min), config.minWindowWidth);
  viewport.voi.windowCenter = minMaxMean.mean;
  cornerstone.setViewport(eventData.element, viewport);

  // Clear the toolData
  toolData.data = [];

  cornerstone.updateImage(eventData.element);
}

function whichMovement(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_MOVE, whichMovement);
  element.removeEventListener(_events2.default.MOUSE_DRAG, whichMovement);

  element.addEventListener(_events2.default.MOUSE_MOVE, dragCallback);
  element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);

  element.addEventListener(_events2.default.MOUSE_CLICK, dragEndCallback);
  if (e.type === _events2.default.MOUSE_DRAG) {
    element.addEventListener(_events2.default.MOUSE_UP, dragEndCallback);
  }
}

/** Records the start point and attaches the drag event handler */
function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    element.addEventListener(_events2.default.MOUSE_DRAG, whichMovement);
    element.addEventListener(_events2.default.MOUSE_MOVE, whichMovement);

    element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
    recordStartPoint(eventData);

    return false;
  }
}

/** Records the start point of the click or touch */
function recordStartPoint(eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData && toolData.data) {
    toolData.data = [];
  }

  var measurementData = {
    startPoint: {
      x: eventData.currentPoints.image.x,
      y: eventData.currentPoints.image.y
    }
  };

  (0, _toolState.addToolState)(eventData.element, toolType, measurementData);
}

/** Draws the rectangular region while the touch or mouse event drag occurs */
function dragCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  // Update the endpoint as the mouse/touch is dragged
  toolData.data[0].endPoint = {
    x: eventData.currentPoints.image.x,
    y: eventData.currentPoints.image.y
  };

  _externalModules2.default.cornerstone.updateImage(element);
}

function onImageRendered(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var context = eventData.canvasContext;
  var cornerstone = _externalModules2.default.cornerstone;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var startPoint = toolData.data[0].startPoint;
  var endPoint = toolData.data[0].endPoint;

  if (!startPoint || !endPoint) {
    return;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Set to the active tool color
  var color = _toolColors2.default.getActiveColor();

  // Calculate the rectangle parameters
  var startPointCanvas = cornerstone.pixelToCanvas(element, startPoint);
  var endPointCanvas = cornerstone.pixelToCanvas(element, endPoint);

  var left = Math.min(startPointCanvas.x, endPointCanvas.x);
  var top = Math.min(startPointCanvas.y, endPointCanvas.y);
  var width = Math.abs(startPointCanvas.x - endPointCanvas.x);
  var height = Math.abs(startPointCanvas.y - endPointCanvas.y);

  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = wwwcRegion.getConfiguration();

  // Draw the rectangle
  context.save();

  if (config && config.shadow) {
    context.shadowColor = config.shadowColor || '#000000';
    context.shadowOffsetX = config.shadowOffsetX || 1;
    context.shadowOffsetY = config.shadowOffsetY || 1;
  }

  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.rect(left, top, width, height);
  context.stroke();

  context.restore();
}

// --- Mouse tool enable / disable --- ///
function disable(element) {
  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);

  element.removeEventListener(_events2.default.MOUSE_UP, dragEndCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, dragEndCallback);

  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_MOVE, dragCallback);

  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  element.removeEventListener(_events2.default.NEW_IMAGE, newImageCallback);

  _externalModules2.default.cornerstone.updateImage(element);
}

function activate(element, mouseButtonMask) {
  (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

  var toolData = (0, _toolState.getToolState)(element, toolType);

  if (!toolData) {
    var data = [];

    (0, _toolState.addToolState)(element, toolType, data);
  }

  element.removeEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);

  element.removeEventListener(_events2.default.MOUSE_UP, dragEndCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, dragEndCallback);

  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_MOVE, dragCallback);

  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  element.removeEventListener(_events2.default.NEW_IMAGE, newImageCallback);

  element.addEventListener(_events2.default.MOUSE_DOWN, mouseDownCallback);
  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

  // If the displayed image changes after the user has started clicking, we should
  // Cancel the handlers and prepare for another click
  element.addEventListener(_events2.default.NEW_IMAGE, newImageCallback);

  _externalModules2.default.cornerstone.updateImage(element);
}

// --- Touch tool enable / disable --- //
function disableTouchDrag(element) {
  element.removeEventListener(_events2.default.TOUCH_DRAG, dragCallback);
  element.removeEventListener(_events2.default.TOUCH_START, recordStartPoint);
  element.removeEventListener(_events2.default.TOUCH_DRAG_END, applyWWWCRegion);
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
}

function activateTouchDrag(element) {
  var toolData = (0, _toolState.getToolState)(element, toolType);

  if (!toolData) {
    var data = [];

    (0, _toolState.addToolState)(element, toolType, data);
  }

  element.removeEventListener(_events2.default.TOUCH_DRAG, dragCallback);
  element.removeEventListener(_events2.default.TOUCH_START, recordStartPoint);
  element.removeEventListener(_events2.default.TOUCH_DRAG_END, applyWWWCRegion);
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

  element.addEventListener(_events2.default.TOUCH_DRAG, dragCallback);
  element.addEventListener(_events2.default.TOUCH_START, recordStartPoint);
  element.addEventListener(_events2.default.TOUCH_DRAG_END, applyWWWCRegion);
  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module exports
var wwwcRegion = {
  activate: activate,
  deactivate: disable,
  disable: disable,
  setConfiguration: setConfiguration,
  getConfiguration: getConfiguration
};

var wwwcRegionTouch = {
  activate: activateTouchDrag,
  deactivate: disableTouchDrag,
  disable: disableTouchDrag
};

exports.wwwcRegion = wwwcRegion;
exports.wwwcRegionTouch = wwwcRegionTouch;

/***/ }),

/***/ "./imageTools/zoom.js":
/*!****************************!*\
  !*** ./imageTools/zoom.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoomTouchDrag = exports.zoomTouchPinch = exports.zoomWheel = exports.zoom = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _simpleMouseButtonTool = __webpack_require__(/*! ./simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _mouseWheelTool = __webpack_require__(/*! ./mouseWheelTool.js */ "./imageTools/mouseWheelTool.js");

var _mouseWheelTool2 = _interopRequireDefault(_mouseWheelTool);

var _touchPinchTool = __webpack_require__(/*! ./touchPinchTool.js */ "./imageTools/touchPinchTool.js");

var _touchPinchTool2 = _interopRequireDefault(_touchPinchTool);

var _touchDragTool = __webpack_require__(/*! ./touchDragTool.js */ "./imageTools/touchDragTool.js");

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'zoom';
var startPoints = void 0;

function changeViewportScale(viewport, ticks) {
  var config = zoom.getConfiguration();
  var pow = 1.7;

  var oldFactor = Math.log(viewport.scale) / Math.log(pow);
  var factor = oldFactor + ticks;

  var scale = Math.pow(pow, factor);

  if (config.maxScale && scale > config.maxScale) {
    viewport.scale = config.maxScale;
  } else if (config.minScale && scale < config.minScale) {
    viewport.scale = config.minScale;
  } else {
    viewport.scale = scale;
  }

  return viewport;
}

function boundPosition(position, width, height) {
  position.x = Math.max(position.x, 0);
  position.y = Math.max(position.y, 0);
  position.x = Math.min(position.x, width);
  position.y = Math.min(position.y, height);

  return position;
}

function correctShift(shift, viewport) {
  // Apply Flips
  if (viewport.hflip) {
    shift.x *= -1;
  }

  if (viewport.vflip) {
    shift.y *= -1;
  }

  // Apply rotations
  if (viewport.rotation !== 0) {
    var angle = viewport.rotation * Math.PI / 180;

    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);

    var newX = shift.x * cosA - shift.y * sinA;
    var newY = shift.x * sinA + shift.y * cosA;

    shift.x = newX;
    shift.y = newY;
  }

  return shift;
}

function defaultStrategy(eventData, ticks) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;

  // Calculate the new scale factor based on how far the mouse has changed
  var viewport = changeViewportScale(eventData.viewport, ticks);

  cornerstone.setViewport(element, viewport);

  // Now that the scale has been updated, determine the offset we need to apply to the center so we can
  // Keep the original start location in the same position
  var newCoords = cornerstone.pageToPixel(element, eventData.startPoints.page.x, eventData.startPoints.page.y);

  // The shift we will use is the difference between the original image coordinates of the point we've selected
  // And the image coordinates of the same point on the page after the viewport scaling above has been performed
  // This shift is in image coordinates, and is designed to keep the target location fixed on the page.
  var shift = {
    x: eventData.startPoints.image.x - newCoords.x,
    y: eventData.startPoints.image.y - newCoords.y
  };

  // Correct the required shift using the viewport rotation and flip parameters
  shift = correctShift(shift, viewport);

  // Apply the shift to the Viewport's translation setting
  viewport.translation.x -= shift.x;
  viewport.translation.y -= shift.y;

  // Update the Viewport with the new translation value
  cornerstone.setViewport(element, viewport);
}

function translateStrategy(eventData, ticks) {
  var element = eventData.element;
  var image = eventData.image;
  var config = zoom.getConfiguration();

  // Calculate the new scale factor based on how far the mouse has changed
  // Note that in this case we don't need to update the viewport after the initial
  // Zoom step since we aren't don't intend to keep the target position static on
  // The page
  var viewport = changeViewportScale(eventData.viewport, ticks);

  // Define the default shift to take place during this zoom step
  var shift = {
    x: 0,
    y: 0
  };

  // Define the parameters for the translate strategy
  var translateSpeed = 8;
  var outwardsMinScaleToTranslate = 3;
  var minTranslation = 0.01;

  if (ticks < 0) {
    // Zoom outwards from the image center
    if (viewport.scale < outwardsMinScaleToTranslate) {
      // If the current translation is smaller than the minimum desired translation,
      // Set the translation to zero
      if (Math.abs(viewport.translation.x) < minTranslation) {
        viewport.translation.x = 0;
      } else {
        shift.x = viewport.translation.x / translateSpeed;
      }

      // If the current translation is smaller than the minimum desired translation,
      // Set the translation to zero
      if (Math.abs(viewport.translation.y) < minTranslation) {
        viewport.translation.y = 0;
      } else {
        shift.y = viewport.translation.y / translateSpeed;
      }
    }
  } else {
    // Zoom inwards to the current image point

    // Identify the coordinates of the point the user is trying to zoom into
    // If we are not allowed to zoom outside the image, bound the user-selected position to
    // A point inside the image
    if (config && config.preventZoomOutsideImage) {
      startPoints.image = boundPosition(startPoints.image, image.width, image.height);
    }

    // Calculate the translation value that would place the desired image point in the center
    // Of the viewport
    var desiredTranslation = {
      x: image.width / 2 - startPoints.image.x,
      y: image.height / 2 - startPoints.image.y
    };

    // Correct the target location using the viewport rotation and flip parameters
    desiredTranslation = correctShift(desiredTranslation, viewport);

    // Calculate the difference between the current viewport translation value and the
    // Final desired translation values
    var distanceToDesired = {
      x: viewport.translation.x - desiredTranslation.x,
      y: viewport.translation.y - desiredTranslation.y
    };

    // If the current translation is smaller than the minimum desired translation,
    // Stop translating in the x-direction
    if (Math.abs(distanceToDesired.x) < minTranslation) {
      viewport.translation.x = desiredTranslation.x;
    } else {
      // Otherwise, shift the viewport by one step
      shift.x = distanceToDesired.x / translateSpeed;
    }

    // If the current translation is smaller than the minimum desired translation,
    // Stop translating in the y-direction
    if (Math.abs(distanceToDesired.y) < minTranslation) {
      viewport.translation.y = desiredTranslation.y;
    } else {
      // Otherwise, shift the viewport by one step
      shift.y = distanceToDesired.y / translateSpeed;
    }
  }

  // Apply the shift to the Viewport's translation setting
  viewport.translation.x -= shift.x;
  viewport.translation.y -= shift.y;

  // Update the Viewport with the new translation value
  _externalModules2.default.cornerstone.setViewport(element, viewport);
}

function zoomToCenterStrategy(eventData, ticks) {
  var element = eventData.element;

  // Calculate the new scale factor based on how far the mouse has changed
  var viewport = changeViewportScale(eventData.viewport, ticks);

  _externalModules2.default.cornerstone.setViewport(element, viewport);
}

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    startPoints = eventData.startPoints; // Used for translateStrategy
    element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

    e.preventDefault();
    e.stopPropagation();
  }
}

function dragCallback(e) {
  var eventData = e.detail;

  if (!eventData.deltaPoints.page.y) {
    return false;
  }

  var ticks = eventData.deltaPoints.page.y / 100;

  zoom.strategy(eventData, ticks);

  e.preventDefault();
  e.stopPropagation();
}

function mouseWheelCallback(e) {
  var eventData = e.detail;
  var ticks = -eventData.direction / 4;

  // Allow inversion of the mouse wheel scroll via a configuration option
  var config = zoom.getConfiguration();

  if (config && config.invert) {
    ticks *= -1;
  }

  var viewport = changeViewportScale(eventData.viewport, ticks);

  _externalModules2.default.cornerstone.setViewport(eventData.element, viewport);
}

function touchPinchCallback(e) {
  var eventData = e.detail;
  var cornerstone = _externalModules2.default.cornerstone;
  var config = zoom.getConfiguration();
  var viewport = eventData.viewport;
  var element = eventData.element;

  // Change the scale based on the pinch gesture's scale change
  viewport.scale += eventData.scaleChange * viewport.scale;
  if (config.maxScale && viewport.scale > config.maxScale) {
    viewport.scale = config.maxScale;
  } else if (config.minScale && viewport.scale < config.minScale) {
    viewport.scale = config.minScale;
  }

  cornerstone.setViewport(element, viewport);

  // Now that the scale has been updated, determine the offset we need to apply to the center so we can
  // Keep the original start location in the same position
  var newCoords = cornerstone.pageToPixel(element, eventData.startPoints.page.x, eventData.startPoints.page.y);
  var shift = {
    x: eventData.startPoints.image.x - newCoords.x,
    y: eventData.startPoints.image.y - newCoords.y
  };

  shift = correctShift(shift, viewport);
  viewport.translation.x -= shift.x;
  viewport.translation.y -= shift.y;
  cornerstone.setViewport(element, viewport);
}

var zoom = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);

zoom.strategies = {
  default: defaultStrategy,
  translate: translateStrategy,
  zoomToCenter: zoomToCenterStrategy
};

zoom.strategy = defaultStrategy;

var zoomWheel = (0, _mouseWheelTool2.default)(mouseWheelCallback);
var zoomTouchPinch = (0, _touchPinchTool2.default)(touchPinchCallback);
var zoomTouchDrag = (0, _touchDragTool2.default)(dragCallback, toolType);

exports.zoom = zoom;
exports.zoomWheel = zoomWheel;
exports.zoomTouchPinch = zoomTouchPinch;
exports.zoomTouchDrag = zoomTouchDrag;

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ./externalModules.js */ "./externalModules.js");

Object.defineProperty(exports, 'external', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_externalModules).default;
  }
});

var _events = __webpack_require__(/*! ./events.js */ "./events.js");

Object.defineProperty(exports, 'EVENTS', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_events).default;
  }
});

var _index = __webpack_require__(/*! ./referenceLines/index.js */ "./referenceLines/index.js");

Object.defineProperty(exports, 'referenceLines', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = __webpack_require__(/*! ./orientation/index.js */ "./orientation/index.js");

Object.defineProperty(exports, 'orientation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _requestPoolManager = __webpack_require__(/*! ./requestPool/requestPoolManager.js */ "./requestPool/requestPoolManager.js");

Object.defineProperty(exports, 'requestPoolManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_requestPoolManager).default;
  }
});

var _setContextToDisplayFontSize = __webpack_require__(/*! ./util/setContextToDisplayFontSize.js */ "./util/setContextToDisplayFontSize.js");

Object.defineProperty(exports, 'setContextToDisplayFontSize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setContextToDisplayFontSize).default;
  }
});

var _scrollToIndex = __webpack_require__(/*! ./util/scrollToIndex.js */ "./util/scrollToIndex.js");

Object.defineProperty(exports, 'scrollToIndex', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scrollToIndex).default;
  }
});

var _scroll = __webpack_require__(/*! ./util/scroll.js */ "./util/scroll.js");

Object.defineProperty(exports, 'scroll', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scroll).default;
  }
});

var _roundToDecimal = __webpack_require__(/*! ./util/roundToDecimal.js */ "./util/roundToDecimal.js");

Object.defineProperty(exports, 'roundToDecimal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_roundToDecimal).default;
  }
});

var _pointProjector = __webpack_require__(/*! ./util/pointProjector.js */ "./util/pointProjector.js");

Object.defineProperty(exports, 'projectPatientPointToImagePlane', {
  enumerable: true,
  get: function get() {
    return _pointProjector.projectPatientPointToImagePlane;
  }
});
Object.defineProperty(exports, 'imagePointToPatientPoint', {
  enumerable: true,
  get: function get() {
    return _pointProjector.imagePointToPatientPoint;
  }
});
Object.defineProperty(exports, 'planePlaneIntersection', {
  enumerable: true,
  get: function get() {
    return _pointProjector.planePlaneIntersection;
  }
});

var _pointInsideBoundingBox = __webpack_require__(/*! ./util/pointInsideBoundingBox.js */ "./util/pointInsideBoundingBox.js");

Object.defineProperty(exports, 'pointInsideBoundingBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointInsideBoundingBox).default;
  }
});

var _pointInEllipse = __webpack_require__(/*! ./util/pointInEllipse.js */ "./util/pointInEllipse.js");

Object.defineProperty(exports, 'pointInEllipse', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointInEllipse).default;
  }
});

var _makeUnselectable = __webpack_require__(/*! ./util/makeUnselectable.js */ "./util/makeUnselectable.js");

Object.defineProperty(exports, 'makeUnselectable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_makeUnselectable).default;
  }
});

var _isMouseButtonEnabled = __webpack_require__(/*! ./util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

Object.defineProperty(exports, 'isMouseButtonEnabled', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isMouseButtonEnabled).default;
  }
});

var _getRGBPixels = __webpack_require__(/*! ./util/getRGBPixels.js */ "./util/getRGBPixels.js");

Object.defineProperty(exports, 'getRGBPixels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getRGBPixels).default;
  }
});

var _getMaxSimultaneousRequests = __webpack_require__(/*! ./util/getMaxSimultaneousRequests.js */ "./util/getMaxSimultaneousRequests.js");

Object.defineProperty(exports, 'getDefaultSimultaneousRequests', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.getDefaultSimultaneousRequests;
  }
});
Object.defineProperty(exports, 'getMaxSimultaneousRequests', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.getMaxSimultaneousRequests;
  }
});
Object.defineProperty(exports, 'getBrowserInfo', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.getBrowserInfo;
  }
});
Object.defineProperty(exports, 'isMobileDevice', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.isMobileDevice;
  }
});

var _getLuminance = __webpack_require__(/*! ./util/getLuminance.js */ "./util/getLuminance.js");

Object.defineProperty(exports, 'getLuminance', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLuminance).default;
  }
});

var _drawTextBox = __webpack_require__(/*! ./util/drawTextBox.js */ "./util/drawTextBox.js");

Object.defineProperty(exports, 'drawTextBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawTextBox).default;
  }
});

var _drawEllipse = __webpack_require__(/*! ./util/drawEllipse.js */ "./util/drawEllipse.js");

Object.defineProperty(exports, 'drawEllipse', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawEllipse).default;
  }
});

var _drawCircle = __webpack_require__(/*! ./util/drawCircle.js */ "./util/drawCircle.js");

Object.defineProperty(exports, 'drawCircle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawCircle).default;
  }
});

var _drawArrow = __webpack_require__(/*! ./util/drawArrow.js */ "./util/drawArrow.js");

Object.defineProperty(exports, 'drawArrow', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawArrow).default;
  }
});

var _copyPoints = __webpack_require__(/*! ./util/copyPoints.js */ "./util/copyPoints.js");

Object.defineProperty(exports, 'copyPoints', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_copyPoints).default;
  }
});

var _calculateSUV = __webpack_require__(/*! ./util/calculateSUV.js */ "./util/calculateSUV.js");

Object.defineProperty(exports, 'calculateSUV', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_calculateSUV).default;
  }
});

var _calculateEllipseStatistics = __webpack_require__(/*! ./util/calculateEllipseStatistics.js */ "./util/calculateEllipseStatistics.js");

Object.defineProperty(exports, 'calculateEllipseStatistics', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_calculateEllipseStatistics).default;
  }
});

var _probeTool4D = __webpack_require__(/*! ./timeSeriesTools/probeTool4D.js */ "./timeSeriesTools/probeTool4D.js");

Object.defineProperty(exports, 'probeTool4D', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_probeTool4D).default;
  }
});

var _incrementTimePoint = __webpack_require__(/*! ./timeSeriesTools/incrementTimePoint.js */ "./timeSeriesTools/incrementTimePoint.js");

Object.defineProperty(exports, 'incrementTimePoint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_incrementTimePoint).default;
  }
});

var _timeSeriesPlayer = __webpack_require__(/*! ./timeSeriesTools/timeSeriesPlayer.js */ "./timeSeriesTools/timeSeriesPlayer.js");

Object.defineProperty(exports, 'timeSeriesPlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeSeriesPlayer).default;
  }
});

var _timeSeriesScroll = __webpack_require__(/*! ./timeSeriesTools/timeSeriesScroll.js */ "./timeSeriesTools/timeSeriesScroll.js");

Object.defineProperty(exports, 'timeSeriesScroll', {
  enumerable: true,
  get: function get() {
    return _timeSeriesScroll.timeSeriesScroll;
  }
});
Object.defineProperty(exports, 'timeSeriesScrollWheel', {
  enumerable: true,
  get: function get() {
    return _timeSeriesScroll.timeSeriesScrollWheel;
  }
});
Object.defineProperty(exports, 'timeSeriesScrollTouchDrag', {
  enumerable: true,
  get: function get() {
    return _timeSeriesScroll.timeSeriesScrollTouchDrag;
  }
});

var _wwwcSynchronizer = __webpack_require__(/*! ./synchronization/wwwcSynchronizer.js */ "./synchronization/wwwcSynchronizer.js");

Object.defineProperty(exports, 'wwwcSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wwwcSynchronizer).default;
  }
});

var _updateImageSynchronizer = __webpack_require__(/*! ./synchronization/updateImageSynchronizer.js */ "./synchronization/updateImageSynchronizer.js");

Object.defineProperty(exports, 'updateImageSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_updateImageSynchronizer).default;
  }
});

var _Synchronizer = __webpack_require__(/*! ./synchronization/Synchronizer.js */ "./synchronization/Synchronizer.js");

Object.defineProperty(exports, 'Synchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Synchronizer).default;
  }
});

var _stackScrollSynchronizer = __webpack_require__(/*! ./synchronization/stackScrollSynchronizer.js */ "./synchronization/stackScrollSynchronizer.js");

Object.defineProperty(exports, 'stackScrollSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackScrollSynchronizer).default;
  }
});

var _stackImagePositionSynchronizer = __webpack_require__(/*! ./synchronization/stackImagePositionSynchronizer.js */ "./synchronization/stackImagePositionSynchronizer.js");

Object.defineProperty(exports, 'stackImagePositionSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackImagePositionSynchronizer).default;
  }
});

var _stackImagePositionOffsetSynchronizer = __webpack_require__(/*! ./synchronization/stackImagePositionOffsetSynchronizer.js */ "./synchronization/stackImagePositionOffsetSynchronizer.js");

Object.defineProperty(exports, 'stackImagePositionOffsetSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackImagePositionOffsetSynchronizer).default;
  }
});

var _stackImageIndexSynchronizer = __webpack_require__(/*! ./synchronization/stackImageIndexSynchronizer.js */ "./synchronization/stackImageIndexSynchronizer.js");

Object.defineProperty(exports, 'stackImageIndexSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackImageIndexSynchronizer).default;
  }
});

var _panZoomSynchronizer = __webpack_require__(/*! ./synchronization/panZoomSynchronizer.js */ "./synchronization/panZoomSynchronizer.js");

Object.defineProperty(exports, 'panZoomSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_panZoomSynchronizer).default;
  }
});

var _toolStyle = __webpack_require__(/*! ./stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

Object.defineProperty(exports, 'toolStyle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolStyle).default;
  }
});

var _toolState = __webpack_require__(/*! ./stateManagement/toolState.js */ "./stateManagement/toolState.js");

Object.defineProperty(exports, 'addToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.addToolState;
  }
});
Object.defineProperty(exports, 'getToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.getToolState;
  }
});
Object.defineProperty(exports, 'removeToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.removeToolState;
  }
});
Object.defineProperty(exports, 'clearToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.clearToolState;
  }
});
Object.defineProperty(exports, 'setElementToolStateManager', {
  enumerable: true,
  get: function get() {
    return _toolState.setElementToolStateManager;
  }
});
Object.defineProperty(exports, 'getElementToolStateManager', {
  enumerable: true,
  get: function get() {
    return _toolState.getElementToolStateManager;
  }
});

var _toolCoordinates = __webpack_require__(/*! ./stateManagement/toolCoordinates.js */ "./stateManagement/toolCoordinates.js");

Object.defineProperty(exports, 'toolCoordinates', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolCoordinates).default;
  }
});

var _toolColors = __webpack_require__(/*! ./stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

Object.defineProperty(exports, 'toolColors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolColors).default;
  }
});

var _timeSeriesSpecificStateManager = __webpack_require__(/*! ./stateManagement/timeSeriesSpecificStateManager.js */ "./stateManagement/timeSeriesSpecificStateManager.js");

Object.defineProperty(exports, 'addTimeSeriesStateManager', {
  enumerable: true,
  get: function get() {
    return _timeSeriesSpecificStateManager.addTimeSeriesStateManager;
  }
});
Object.defineProperty(exports, 'newTimeSeriesSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _timeSeriesSpecificStateManager.newTimeSeriesSpecificToolStateManager;
  }
});

var _textStyle = __webpack_require__(/*! ./stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

Object.defineProperty(exports, 'textStyle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_textStyle).default;
  }
});

var _stackSpecificStateManager = __webpack_require__(/*! ./stateManagement/stackSpecificStateManager.js */ "./stateManagement/stackSpecificStateManager.js");

Object.defineProperty(exports, 'stackSpecificStateManager', {
  enumerable: true,
  get: function get() {
    return _stackSpecificStateManager.stackSpecificStateManager;
  }
});
Object.defineProperty(exports, 'newStackSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _stackSpecificStateManager.newStackSpecificToolStateManager;
  }
});
Object.defineProperty(exports, 'addStackStateManager', {
  enumerable: true,
  get: function get() {
    return _stackSpecificStateManager.addStackStateManager;
  }
});

var _loadHandlerManager = __webpack_require__(/*! ./stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

Object.defineProperty(exports, 'loadHandlerManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loadHandlerManager).default;
  }
});

var _imageIdSpecificStateManager = __webpack_require__(/*! ./stateManagement/imageIdSpecificStateManager.js */ "./stateManagement/imageIdSpecificStateManager.js");

Object.defineProperty(exports, 'newImageIdSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _imageIdSpecificStateManager.newImageIdSpecificToolStateManager;
  }
});
Object.defineProperty(exports, 'globalImageIdSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }
});

var _frameOfReferenceStateManager = __webpack_require__(/*! ./stateManagement/frameOfReferenceStateManager.js */ "./stateManagement/frameOfReferenceStateManager.js");

Object.defineProperty(exports, 'newFrameOfReferenceSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _frameOfReferenceStateManager.newFrameOfReferenceSpecificToolStateManager;
  }
});
Object.defineProperty(exports, 'globalFrameOfReferenceSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _frameOfReferenceStateManager.globalFrameOfReferenceSpecificToolStateManager;
  }
});

var _appState = __webpack_require__(/*! ./stateManagement/appState.js */ "./stateManagement/appState.js");

Object.defineProperty(exports, 'appState', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_appState).default;
  }
});

var _stackScrollKeyboard = __webpack_require__(/*! ./stackTools/stackScrollKeyboard.js */ "./stackTools/stackScrollKeyboard.js");

Object.defineProperty(exports, 'stackScrollKeyboard', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackScrollKeyboard).default;
  }
});

var _stackScroll = __webpack_require__(/*! ./stackTools/stackScroll.js */ "./stackTools/stackScroll.js");

Object.defineProperty(exports, 'stackScroll', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScroll;
  }
});
Object.defineProperty(exports, 'stackScrollWheel', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScrollWheel;
  }
});
Object.defineProperty(exports, 'stackScrollTouchDrag', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScrollTouchDrag;
  }
});
Object.defineProperty(exports, 'stackScrollMultiTouch', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScrollMultiTouch;
  }
});

var _stackPrefetch = __webpack_require__(/*! ./stackTools/stackPrefetch.js */ "./stackTools/stackPrefetch.js");

Object.defineProperty(exports, 'stackPrefetch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackPrefetch).default;
  }
});

var _scrollIndicator = __webpack_require__(/*! ./stackTools/scrollIndicator.js */ "./stackTools/scrollIndicator.js");

Object.defineProperty(exports, 'scrollIndicator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scrollIndicator).default;
  }
});

var _stackRenderers = __webpack_require__(/*! ./stackTools/stackRenderers.js */ "./stackTools/stackRenderers.js");

Object.defineProperty(exports, 'stackRenderers', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackRenderers).default;
  }
});

var _playClip = __webpack_require__(/*! ./stackTools/playClip.js */ "./stackTools/playClip.js");

Object.defineProperty(exports, 'playClip', {
  enumerable: true,
  get: function get() {
    return _playClip.playClip;
  }
});
Object.defineProperty(exports, 'stopClip', {
  enumerable: true,
  get: function get() {
    return _playClip.stopClip;
  }
});

var _anyHandlesOutsideImage = __webpack_require__(/*! ./manipulators/anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

Object.defineProperty(exports, 'anyHandlesOutsideImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_anyHandlesOutsideImage).default;
  }
});

var _drawHandles = __webpack_require__(/*! ./manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

Object.defineProperty(exports, 'drawHandles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawHandles).default;
  }
});

var _getHandleNearImagePoint = __webpack_require__(/*! ./manipulators/getHandleNearImagePoint.js */ "./manipulators/getHandleNearImagePoint.js");

Object.defineProperty(exports, 'getHandleNearImagePoint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getHandleNearImagePoint).default;
  }
});

var _handleActivator = __webpack_require__(/*! ./manipulators/handleActivator.js */ "./manipulators/handleActivator.js");

Object.defineProperty(exports, 'handleActivator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_handleActivator).default;
  }
});

var _moveAllHandles = __webpack_require__(/*! ./manipulators/moveAllHandles.js */ "./manipulators/moveAllHandles.js");

Object.defineProperty(exports, 'moveAllHandles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveAllHandles).default;
  }
});

var _moveHandle = __webpack_require__(/*! ./manipulators/moveHandle.js */ "./manipulators/moveHandle.js");

Object.defineProperty(exports, 'moveHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveHandle).default;
  }
});

var _moveNewHandle = __webpack_require__(/*! ./manipulators/moveNewHandle.js */ "./manipulators/moveNewHandle.js");

Object.defineProperty(exports, 'moveNewHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveNewHandle).default;
  }
});

var _moveNewHandleTouch = __webpack_require__(/*! ./manipulators/moveNewHandleTouch.js */ "./manipulators/moveNewHandleTouch.js");

Object.defineProperty(exports, 'moveNewHandleTouch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveNewHandleTouch).default;
  }
});

var _touchMoveAllHandles = __webpack_require__(/*! ./manipulators/touchMoveAllHandles.js */ "./manipulators/touchMoveAllHandles.js");

Object.defineProperty(exports, 'touchMoveAllHandles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchMoveAllHandles).default;
  }
});

var _touchMoveHandle = __webpack_require__(/*! ./manipulators/touchMoveHandle.js */ "./manipulators/touchMoveHandle.js");

Object.defineProperty(exports, 'touchMoveHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchMoveHandle).default;
  }
});

var _keyboardInput = __webpack_require__(/*! ./inputSources/keyboardInput.js */ "./inputSources/keyboardInput.js");

Object.defineProperty(exports, 'keyboardInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_keyboardInput).default;
  }
});

var _mouseInput = __webpack_require__(/*! ./inputSources/mouseInput.js */ "./inputSources/mouseInput.js");

Object.defineProperty(exports, 'mouseInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseInput).default;
  }
});

var _mouseWheelInput = __webpack_require__(/*! ./inputSources/mouseWheelInput.js */ "./inputSources/mouseWheelInput.js");

Object.defineProperty(exports, 'mouseWheelInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseWheelInput).default;
  }
});

var _preventGhostClick = __webpack_require__(/*! ./inputSources/preventGhostClick.js */ "./inputSources/preventGhostClick.js");

Object.defineProperty(exports, 'preventGhostClick', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preventGhostClick).default;
  }
});

var _touchInput = __webpack_require__(/*! ./inputSources/touchInput.js */ "./inputSources/touchInput.js");

Object.defineProperty(exports, 'touchInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchInput).default;
  }
});

var _angleTool = __webpack_require__(/*! ./imageTools/angleTool.js */ "./imageTools/angleTool.js");

Object.defineProperty(exports, 'angle', {
  enumerable: true,
  get: function get() {
    return _angleTool.angle;
  }
});
Object.defineProperty(exports, 'angleTouch', {
  enumerable: true,
  get: function get() {
    return _angleTool.angleTouch;
  }
});

var _arrowAnnotate = __webpack_require__(/*! ./imageTools/arrowAnnotate.js */ "./imageTools/arrowAnnotate.js");

Object.defineProperty(exports, 'arrowAnnotate', {
  enumerable: true,
  get: function get() {
    return _arrowAnnotate.arrowAnnotate;
  }
});
Object.defineProperty(exports, 'arrowAnnotateTouch', {
  enumerable: true,
  get: function get() {
    return _arrowAnnotate.arrowAnnotateTouch;
  }
});

var _crosshairs = __webpack_require__(/*! ./imageTools/crosshairs.js */ "./imageTools/crosshairs.js");

Object.defineProperty(exports, 'crosshairs', {
  enumerable: true,
  get: function get() {
    return _crosshairs.crosshairs;
  }
});
Object.defineProperty(exports, 'crosshairsTouch', {
  enumerable: true,
  get: function get() {
    return _crosshairs.crosshairsTouch;
  }
});

var _displayTool = __webpack_require__(/*! ./imageTools/displayTool.js */ "./imageTools/displayTool.js");

Object.defineProperty(exports, 'displayTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_displayTool).default;
  }
});

var _doubleTapTool = __webpack_require__(/*! ./imageTools/doubleTapTool.js */ "./imageTools/doubleTapTool.js");

Object.defineProperty(exports, 'doubleTapTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doubleTapTool).default;
  }
});

var _doubleTapZoom = __webpack_require__(/*! ./imageTools/doubleTapZoom.js */ "./imageTools/doubleTapZoom.js");

Object.defineProperty(exports, 'doubleTapZoom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doubleTapZoom).default;
  }
});

var _dragProbe = __webpack_require__(/*! ./imageTools/dragProbe.js */ "./imageTools/dragProbe.js");

Object.defineProperty(exports, 'dragProbe', {
  enumerable: true,
  get: function get() {
    return _dragProbe.dragProbe;
  }
});
Object.defineProperty(exports, 'dragProbeTouch', {
  enumerable: true,
  get: function get() {
    return _dragProbe.dragProbeTouch;
  }
});

var _ellipticalRoi = __webpack_require__(/*! ./imageTools/ellipticalRoi.js */ "./imageTools/ellipticalRoi.js");

Object.defineProperty(exports, 'ellipticalRoi', {
  enumerable: true,
  get: function get() {
    return _ellipticalRoi.ellipticalRoi;
  }
});
Object.defineProperty(exports, 'ellipticalRoiTouch', {
  enumerable: true,
  get: function get() {
    return _ellipticalRoi.ellipticalRoiTouch;
  }
});

var _freehand = __webpack_require__(/*! ./imageTools/freehand.js */ "./imageTools/freehand.js");

Object.defineProperty(exports, 'freehand', {
  enumerable: true,
  get: function get() {
    return _freehand.freehand;
  }
});

var _highlight = __webpack_require__(/*! ./imageTools/highlight.js */ "./imageTools/highlight.js");

Object.defineProperty(exports, 'highlight', {
  enumerable: true,
  get: function get() {
    return _highlight.highlight;
  }
});
Object.defineProperty(exports, 'highlightTouch', {
  enumerable: true,
  get: function get() {
    return _highlight.highlightTouch;
  }
});

var _imageStats = __webpack_require__(/*! ./imageTools/imageStats.js */ "./imageTools/imageStats.js");

Object.defineProperty(exports, 'imageStats', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_imageStats).default;
  }
});

var _keyboardTool = __webpack_require__(/*! ./imageTools/keyboardTool.js */ "./imageTools/keyboardTool.js");

Object.defineProperty(exports, 'keyboardTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_keyboardTool).default;
  }
});

var _length = __webpack_require__(/*! ./imageTools/length.js */ "./imageTools/length.js");

Object.defineProperty(exports, 'length', {
  enumerable: true,
  get: function get() {
    return _length.length;
  }
});
Object.defineProperty(exports, 'lengthTouch', {
  enumerable: true,
  get: function get() {
    return _length.lengthTouch;
  }
});

var _magnify = __webpack_require__(/*! ./imageTools/magnify.js */ "./imageTools/magnify.js");

Object.defineProperty(exports, 'magnify', {
  enumerable: true,
  get: function get() {
    return _magnify.magnify;
  }
});
Object.defineProperty(exports, 'magnifyTouchDrag', {
  enumerable: true,
  get: function get() {
    return _magnify.magnifyTouchDrag;
  }
});

var _mouseButtonRectangleTool = __webpack_require__(/*! ./imageTools/mouseButtonRectangleTool.js */ "./imageTools/mouseButtonRectangleTool.js");

Object.defineProperty(exports, 'mouseButtonRectangleTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseButtonRectangleTool).default;
  }
});

var _mouseButtonTool = __webpack_require__(/*! ./imageTools/mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

Object.defineProperty(exports, 'mouseButtonTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseButtonTool).default;
  }
});

var _mouseWheelTool = __webpack_require__(/*! ./imageTools/mouseWheelTool.js */ "./imageTools/mouseWheelTool.js");

Object.defineProperty(exports, 'mouseWheelTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseWheelTool).default;
  }
});

var _multiTouchDragTool = __webpack_require__(/*! ./imageTools/multiTouchDragTool.js */ "./imageTools/multiTouchDragTool.js");

Object.defineProperty(exports, 'multiTouchDragTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_multiTouchDragTool).default;
  }
});

var _orientationMarkers = __webpack_require__(/*! ./imageTools/orientationMarkers.js */ "./imageTools/orientationMarkers.js");

Object.defineProperty(exports, 'orientationMarkers', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_orientationMarkers).default;
  }
});

var _pan = __webpack_require__(/*! ./imageTools/pan.js */ "./imageTools/pan.js");

Object.defineProperty(exports, 'pan', {
  enumerable: true,
  get: function get() {
    return _pan.pan;
  }
});
Object.defineProperty(exports, 'panTouchDrag', {
  enumerable: true,
  get: function get() {
    return _pan.panTouchDrag;
  }
});

var _panMultiTouch = __webpack_require__(/*! ./imageTools/panMultiTouch.js */ "./imageTools/panMultiTouch.js");

Object.defineProperty(exports, 'panMultiTouch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_panMultiTouch).default;
  }
});

var _probe = __webpack_require__(/*! ./imageTools/probe.js */ "./imageTools/probe.js");

Object.defineProperty(exports, 'probe', {
  enumerable: true,
  get: function get() {
    return _probe.probe;
  }
});
Object.defineProperty(exports, 'probeTouch', {
  enumerable: true,
  get: function get() {
    return _probe.probeTouch;
  }
});

var _rectangleRoi = __webpack_require__(/*! ./imageTools/rectangleRoi.js */ "./imageTools/rectangleRoi.js");

Object.defineProperty(exports, 'rectangleRoi', {
  enumerable: true,
  get: function get() {
    return _rectangleRoi.rectangleRoi;
  }
});
Object.defineProperty(exports, 'rectangleRoiTouch', {
  enumerable: true,
  get: function get() {
    return _rectangleRoi.rectangleRoiTouch;
  }
});

var _rotate = __webpack_require__(/*! ./imageTools/rotate.js */ "./imageTools/rotate.js");

Object.defineProperty(exports, 'rotate', {
  enumerable: true,
  get: function get() {
    return _rotate.rotate;
  }
});
Object.defineProperty(exports, 'rotateTouchDrag', {
  enumerable: true,
  get: function get() {
    return _rotate.rotateTouchDrag;
  }
});

var _rotateTouch = __webpack_require__(/*! ./imageTools/rotateTouch.js */ "./imageTools/rotateTouch.js");

Object.defineProperty(exports, 'rotateTouch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_rotateTouch).default;
  }
});

var _saveAs = __webpack_require__(/*! ./imageTools/saveAs.js */ "./imageTools/saveAs.js");

Object.defineProperty(exports, 'saveAs', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_saveAs).default;
  }
});

var _scaleOverlayTool = __webpack_require__(/*! ./imageTools/scaleOverlayTool.js */ "./imageTools/scaleOverlayTool.js");

Object.defineProperty(exports, 'scaleOverlayTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scaleOverlayTool).default;
  }
});

var _seedAnnotate = __webpack_require__(/*! ./imageTools/seedAnnotate.js */ "./imageTools/seedAnnotate.js");

Object.defineProperty(exports, 'seedAnnotate', {
  enumerable: true,
  get: function get() {
    return _seedAnnotate.seedAnnotate;
  }
});
Object.defineProperty(exports, 'seedAnnotateTouch', {
  enumerable: true,
  get: function get() {
    return _seedAnnotate.seedAnnotateTouch;
  }
});

var _simpleAngle = __webpack_require__(/*! ./imageTools/simpleAngle.js */ "./imageTools/simpleAngle.js");

Object.defineProperty(exports, 'simpleAngle', {
  enumerable: true,
  get: function get() {
    return _simpleAngle.simpleAngle;
  }
});
Object.defineProperty(exports, 'simpleAngleTouch', {
  enumerable: true,
  get: function get() {
    return _simpleAngle.simpleAngleTouch;
  }
});

var _simpleMouseButtonTool = __webpack_require__(/*! ./imageTools/simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

Object.defineProperty(exports, 'simpleMouseButtonTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_simpleMouseButtonTool).default;
  }
});

var _textMarker = __webpack_require__(/*! ./imageTools/textMarker.js */ "./imageTools/textMarker.js");

Object.defineProperty(exports, 'textMarker', {
  enumerable: true,
  get: function get() {
    return _textMarker.textMarker;
  }
});
Object.defineProperty(exports, 'textMarkerTouch', {
  enumerable: true,
  get: function get() {
    return _textMarker.textMarkerTouch;
  }
});

var _touchDragTool = __webpack_require__(/*! ./imageTools/touchDragTool.js */ "./imageTools/touchDragTool.js");

Object.defineProperty(exports, 'touchDragTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchDragTool).default;
  }
});

var _touchPinchTool = __webpack_require__(/*! ./imageTools/touchPinchTool.js */ "./imageTools/touchPinchTool.js");

Object.defineProperty(exports, 'touchPinchTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchPinchTool).default;
  }
});

var _touchTool = __webpack_require__(/*! ./imageTools/touchTool.js */ "./imageTools/touchTool.js");

Object.defineProperty(exports, 'touchTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchTool).default;
  }
});

var _wwwc = __webpack_require__(/*! ./imageTools/wwwc.js */ "./imageTools/wwwc.js");

Object.defineProperty(exports, 'wwwc', {
  enumerable: true,
  get: function get() {
    return _wwwc.wwwc;
  }
});
Object.defineProperty(exports, 'wwwcTouchDrag', {
  enumerable: true,
  get: function get() {
    return _wwwc.wwwcTouchDrag;
  }
});

var _wwwcRegion = __webpack_require__(/*! ./imageTools/wwwcRegion.js */ "./imageTools/wwwcRegion.js");

Object.defineProperty(exports, 'wwwcRegion', {
  enumerable: true,
  get: function get() {
    return _wwwcRegion.wwwcRegion;
  }
});
Object.defineProperty(exports, 'wwwcRegionTouch', {
  enumerable: true,
  get: function get() {
    return _wwwcRegion.wwwcRegionTouch;
  }
});

var _zoom = __webpack_require__(/*! ./imageTools/zoom.js */ "./imageTools/zoom.js");

Object.defineProperty(exports, 'zoom', {
  enumerable: true,
  get: function get() {
    return _zoom.zoom;
  }
});
Object.defineProperty(exports, 'zoomWheel', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomWheel;
  }
});
Object.defineProperty(exports, 'zoomTouchPinch', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomTouchPinch;
  }
});
Object.defineProperty(exports, 'zoomTouchDrag', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomTouchDrag;
  }
});

var _brush = __webpack_require__(/*! ./paintingTools/brush.js */ "./paintingTools/brush.js");

Object.defineProperty(exports, 'brush', {
  enumerable: true,
  get: function get() {
    return _brush.brush;
  }
});

var _adaptiveBrush = __webpack_require__(/*! ./paintingTools/adaptiveBrush.js */ "./paintingTools/adaptiveBrush.js");

Object.defineProperty(exports, 'adaptiveBrush', {
  enumerable: true,
  get: function get() {
    return _adaptiveBrush.adaptiveBrush;
  }
});

var _version = __webpack_require__(/*! ./version.js */ "./version.js");

Object.defineProperty(exports, 'version', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_version).default;
  }
});

var _toolOptions = __webpack_require__(/*! ./toolOptions.js */ "./toolOptions.js");

Object.defineProperty(exports, 'setToolOptions', {
  enumerable: true,
  get: function get() {
    return _toolOptions.setToolOptions;
  }
});
Object.defineProperty(exports, 'getToolOptions', {
  enumerable: true,
  get: function get() {
    return _toolOptions.getToolOptions;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./inputSources/keyboardInput.js":
/*!***************************************!*\
  !*** ./inputSources/keyboardInput.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseX = void 0;
var mouseY = void 0;

function keyPress(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = e.currentTarget;
  var enabledElement = cornerstone.getEnabledElement(element);

  if (!enabledElement.image) {
    return;
  }

  var keyPressData = {
    event: window.event || e, // Old IE support
    element: element,
    viewport: cornerstone.getViewport(element),
    image: enabledElement.image,
    currentPoints: {
      page: {
        x: mouseX,
        y: mouseY
      },
      image: cornerstone.pageToPixel(element, mouseX, mouseY)
    },
    keyCode: e.keyCode,
    which: e.which
  };

  keyPressData.currentPoints.canvas = cornerstone.pixelToCanvas(element, keyPressData.currentPoints.image);

  var keyPressEvents = {
    keydown: _events2.default.KEY_DOWN,
    keypress: _events2.default.KEY_PRESS,
    keyup: _events2.default.KEY_UP
  };

  (0, _triggerEvent2.default)(element, keyPressEvents[e.type], keyPressData);
}

function mouseMove(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

var keyboardEvents = ['keydown', 'keypress', 'keyup'];

function enable(element) {
  keyboardEvents.forEach(function (eventType) {
    element.removeEventListener(eventType, keyPress);
    element.addEventListener(eventType, keyPress);
  });

  element.removeEventListener('mousemove', mouseMove);
  element.addEventListener('mousemove', mouseMove);
}

function disable(element) {
  keyboardEvents.forEach(function (eventType) {
    element.removeEventListener(eventType, keyPress);
  });

  element.removeEventListener('mousemove', mouseMove);
}

// Module exports
var keyboardInput = {
  enable: enable,
  disable: disable
};

exports.default = keyboardInput;

/***/ }),

/***/ "./inputSources/mouseInput.js":
/*!************************************!*\
  !*** ./inputSources/mouseInput.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _copyPoints = __webpack_require__(/*! ../util/copyPoints.js */ "./util/copyPoints.js");

var _copyPoints2 = _interopRequireDefault(_copyPoints);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isClickEvent = true;
var preventClickTimeout = void 0;
var clickDelay = 200;

function getEventWhich(event) {
  if (typeof event.buttons !== 'number') {
    return event.which;
  }

  if (event.buttons === 0) {
    return 0;
  } else if (event.buttons % 2 === 1) {
    return 1;
  } else if (event.buttons % 4 === 2) {
    return 3;
  } else if (event.buttons % 8 === 4) {
    return 2;
  }

  return 0;
}

function preventClickHandler() {
  isClickEvent = false;
}

function mouseDoubleClick(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = e.currentTarget;
  var enabledElement = cornerstone.getEnabledElement(element);

  if (!enabledElement.image) {
    return;
  }

  var eventType = _events2.default.MOUSE_DOUBLE_CLICK;

  var startPoints = {
    page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

  var lastPoints = (0, _copyPoints2.default)(startPoints);

  /* Note: It seems we can't trust MouseEvent.buttons for dblclick events?
     For some reason they are always firing with e.buttons = 0
    so we have to use e.which for now instead.
     Might be related to using preventDefault on the original mousedown or click events?
  */
  var eventData = {
    event: e,
    which: e.which,
    viewport: cornerstone.getViewport(element),
    image: enabledElement.image,
    element: element,
    startPoints: startPoints,
    lastPoints: lastPoints,
    currentPoints: startPoints,
    deltaPoints: {
      x: 0,
      y: 0
    },
    type: eventType
  };

  (0, _triggerEvent2.default)(element, eventType, eventData);
}

function mouseDown(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = e.currentTarget;
  var enabledElement = cornerstone.getEnabledElement(element);

  if (!enabledElement.image) {
    return;
  }

  preventClickTimeout = setTimeout(preventClickHandler, clickDelay);

  var eventType = _events2.default.MOUSE_DOWN;

  // Prevent CornerstoneToolsMouseMove while mouse is down
  element.removeEventListener('mousemove', mouseMove);

  var startPoints = {
    page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

  var lastPoints = (0, _copyPoints2.default)(startPoints);
  var eventData = {
    event: e,
    which: getEventWhich(e),
    viewport: cornerstone.getViewport(element),
    image: enabledElement.image,
    element: element,
    startPoints: startPoints,
    lastPoints: lastPoints,
    currentPoints: startPoints,
    deltaPoints: {
      x: 0,
      y: 0
    },
    type: eventType
  };

  var eventPropagated = (0, _triggerEvent2.default)(eventData.element, eventType, eventData);

  if (eventPropagated) {
    // No tools responded to this event, create a new tool
    eventData.type = _events2.default.MOUSE_DOWN_ACTIVATE;
    (0, _triggerEvent2.default)(eventData.element, _events2.default.MOUSE_DOWN_ACTIVATE, eventData);
  }

  var whichMouseButton = getEventWhich(e);

  function onMouseMove(e) {
    // Calculate our current points in page and image coordinates
    var eventType = _events2.default.MOUSE_DRAG;
    var currentPoints = {
      page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e),
      image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
      client: {
        x: e.clientX,
        y: e.clientY
      }
    };

    currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

    // Calculate delta values in page and image coordinates
    var deltaPoints = {
      page: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
      image: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
      client: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
      canvas: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
    };

    var eventData = {
      which: whichMouseButton,
      viewport: cornerstone.getViewport(element),
      image: enabledElement.image,
      element: element,
      startPoints: startPoints,
      lastPoints: lastPoints,
      currentPoints: currentPoints,
      deltaPoints: deltaPoints,
      type: eventType,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey
    };

    (0, _triggerEvent2.default)(eventData.element, eventType, eventData);

    // Update the last points
    lastPoints = (0, _copyPoints2.default)(currentPoints);
  }

  // Hook mouseup so we can unbind our event listeners
  // When they stop dragging
  function onMouseUp(e) {
    // Cancel the timeout preventing the click event from triggering
    clearTimeout(preventClickTimeout);

    var eventType = _events2.default.MOUSE_UP;

    if (isClickEvent) {
      eventType = _events2.default.MOUSE_CLICK;
    }

    // Calculate our current points in page and image coordinates
    var currentPoints = {
      page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e),
      image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
      client: {
        x: e.clientX,
        y: e.clientY
      }
    };

    currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

    // Calculate delta values in page and image coordinates
    var deltaPoints = {
      page: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
      image: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
      client: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
      canvas: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
    };

    var eventData = {
      event: e,
      which: whichMouseButton,
      viewport: cornerstone.getViewport(element),
      image: enabledElement.image,
      element: element,
      startPoints: startPoints,
      lastPoints: lastPoints,
      currentPoints: currentPoints,
      deltaPoints: deltaPoints,
      type: eventType
    };

    (0, _triggerEvent2.default)(eventData.element, eventType, eventData);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    element.addEventListener('mousemove', mouseMove);

    isClickEvent = true;
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function mouseMove(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = e.currentTarget;
  var enabledElement = cornerstone.getEnabledElement(element);

  if (!enabledElement.image) {
    return;
  }

  var eventType = _events2.default.MOUSE_MOVE;

  var startPoints = {
    page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

  var lastPoints = (0, _copyPoints2.default)(startPoints);

  // Calculate our current points in page and image coordinates
  var currentPoints = {
    page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

  // Calculate delta values in page and image coordinates
  var deltaPoints = {
    page: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
    image: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
    client: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
    canvas: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
  };

  var eventData = {
    viewport: cornerstone.getViewport(element),
    image: enabledElement.image,
    element: element,
    startPoints: startPoints,
    lastPoints: lastPoints,
    currentPoints: currentPoints,
    deltaPoints: deltaPoints,
    type: eventType
  };

  (0, _triggerEvent2.default)(element, eventType, eventData);

  // Update the last points
  lastPoints = (0, _copyPoints2.default)(currentPoints);
}

function disable(element) {
  element.removeEventListener('mousedown', mouseDown);
  element.removeEventListener('mousemove', mouseMove);
  element.removeEventListener('dblclick', mouseDoubleClick);
}

function enable(element) {
  // Prevent handlers from being attached multiple times
  disable(element);

  element.addEventListener('mousedown', mouseDown);
  element.addEventListener('mousemove', mouseMove);
  element.addEventListener('dblclick', mouseDoubleClick);
}

// Module exports
var mouseInput = {
  enable: enable,
  disable: disable
};

exports.default = mouseInput;

/***/ }),

/***/ "./inputSources/mouseWheelInput.js":
/*!*****************************************!*\
  !*** ./inputSources/mouseWheelInput.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseWheel(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = e.currentTarget;
  var enabledElement = cornerstone.getEnabledElement(element);

  if (!enabledElement.image) {
    return;
  }

  // !!!HACK/NOTE/WARNING!!!
  // For some reason I am getting mousewheel and DOMMouseScroll events on my
  // Mac os x mavericks system when middle mouse button dragging.
  // I couldn't find any info about this so this might break other systems
  // Webkit hack
  if (e.type === 'mousewheel' && e.wheelDeltaY === 0) {
    return;
  }
  // Firefox hack
  if (e.type === 'DOMMouseScroll' && e.axis === 1) {
    return;
  }

  e.preventDefault();

  var x = void 0;
  var y = void 0;

  if (e.pageX !== undefined && e.pageY !== undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    // IE9 & IE10
    x = e.x;
    y = e.y;
  }

  var startingCoords = cornerstone.pageToPixel(element, x, y);

  e = window.event && window.event.wheelDelta ? window.event : e; // Old IE support

  var wheelDelta = void 0;

  if (e.wheelDelta) {
    wheelDelta = e.wheelDelta;
  } else if (e.deltaY) {
    wheelDelta = -e.deltaY;
  } else if (e.detail) {
    wheelDelta = -e.detail;
  } else {
    wheelDelta = e.wheelDelta;
  }

  var direction = wheelDelta < 0 ? -1 : 1;

  var mouseWheelData = {
    element: element,
    viewport: cornerstone.getViewport(element),
    image: enabledElement.image,
    direction: direction,
    pageX: x,
    pageY: y,
    imageX: startingCoords.x,
    imageY: startingCoords.y
  };

  (0, _triggerEvent2.default)(element, _events2.default.MOUSE_WHEEL, mouseWheelData);
}

var mouseWheelEvents = ['mousewheel', 'DOMMouseScroll'];

function enable(element) {
  // Prevent handlers from being attached multiple times
  disable(element);

  mouseWheelEvents.forEach(function (eventType) {
    element.addEventListener(eventType, mouseWheel);
  });
}

function disable(element) {
  mouseWheelEvents.forEach(function (eventType) {
    element.removeEventListener(eventType, mouseWheel);
  });
}

// Module exports
var mouseWheelInput = {
  enable: enable,
  disable: disable
};

exports.default = mouseWheelInput;

/***/ }),

/***/ "./inputSources/preventGhostClick.js":
/*!*******************************************!*\
  !*** ./inputSources/preventGhostClick.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Functions to prevent ghost clicks following a touch
// All credit to @kosich
// https://gist.github.com/kosich/23188dd86633b6c2efb7

var antiGhostDelay = 2000,
    pointerType = {
  mouse: 0,
  touch: 1
};

var lastInteractionType = void 0,
    lastInteractionTime = void 0;

function handleTap(type, e) {
  var now = Date.now();

  if (type !== lastInteractionType) {
    if (now - lastInteractionTime <= antiGhostDelay) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      return false;
    }

    lastInteractionType = type;
  }

  lastInteractionTime = now;
}

// Cacheing the function references
// Necessary because a new function reference is created after .bind() is called
// http://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
var handleTapMouse = handleTap.bind(null, pointerType.mouse);
var handleTapTouch = handleTap.bind(null, pointerType.touch);

function attachEvents(element, eventList, interactionType) {
  var tapHandler = interactionType ? handleTapMouse : handleTapTouch;

  eventList.forEach(function (eventName) {
    element.addEventListener(eventName, tapHandler);
  });
}

function removeEvents(element, eventList, interactionType) {
  var tapHandler = interactionType ? handleTapMouse : handleTapTouch;

  eventList.forEach(function (eventName) {
    element.removeEventListener(eventName, tapHandler);
  });
}

var mouseEvents = ['mousedown', 'mouseup'];
var touchEvents = ['touchstart', 'touchend'];

function disable(element) {
  removeEvents(element, mouseEvents, pointerType.mouse);
  removeEvents(element, touchEvents, pointerType.touch);
}

function enable(element) {
  disable(element);
  attachEvents(element, mouseEvents, pointerType.mouse);
  attachEvents(element, touchEvents, pointerType.touch);
}

var preventGhostClick = {
  enable: enable,
  disable: disable
};

exports.default = preventGhostClick;

/***/ }),

/***/ "./inputSources/touchInput.js":
/*!************************************!*\
  !*** ./inputSources/touchInput.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _copyPoints = __webpack_require__(/*! ../util/copyPoints.js */ "./util/copyPoints.js");

var _copyPoints2 = _interopRequireDefault(_copyPoints);

var _preventGhostClick = __webpack_require__(/*! ../inputSources/preventGhostClick.js */ "./inputSources/preventGhostClick.js");

var _preventGhostClick2 = _interopRequireDefault(_preventGhostClick);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startPoints = void 0,
    currentPoints = void 0,
    lastPoints = void 0,
    deltaPoints = void 0,
    eventData = void 0,
    touchStartDelay = void 0,
    pressTimeout = void 0,
    pageDistanceMoved = void 0;

var lastScale = 1.0,
    lastRotation = 0.0,
    preventNextPinch = false,
    isPress = false,
    lastDelta = void 0;

var pressDelay = 700,
    pressMaxDistance = 5;

var toolType = 'touchInput';

function onTouch(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = e.currentTarget || e.srcEvent.currentTarget;
  var enabledElement = cornerstone.getEnabledElement(element);

  if (!enabledElement.image) {
    return;
  }

  var eventType = void 0,
      scaleChange = void 0,
      delta = void 0,
      remainingPointers = void 0,
      rotation = void 0;

  // Prevent mouse events from occurring alongside touch events
  e.preventDefault();

  // If more than one finger is placed on the element, stop the press timeout
  if (e.pointers && e.pointers.length > 1 || e.touches && e.touches.length > 1) {
    isPress = false;
    clearTimeout(pressTimeout);
  }

  switch (e.type) {
    case 'tap':
      isPress = false;
      clearTimeout(pressTimeout);

      // Calculate our current points in page and image coordinates
      currentPoints = {
        page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      eventType = _events2.default.TAP;
      eventData = {
        event: e,
        viewport: cornerstone.getViewport(element),
        image: enabledElement.image,
        element: element,
        currentPoints: currentPoints,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);
      break;

    case 'doubletap':
      isPress = false;
      clearTimeout(pressTimeout);

      // Calculate our current points in page and image coordinates
      currentPoints = {
        page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      eventType = _events2.default.DOUBLE_TAP;
      eventData = {
        event: e,
        viewport: cornerstone.getViewport(element),
        image: enabledElement.image,
        element: element,
        currentPoints: currentPoints,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);
      break;

    case 'pinchstart':
      isPress = false;
      clearTimeout(pressTimeout);

      lastScale = 1.0;
      break;

    case 'pinchmove':
      isPress = false;
      clearTimeout(pressTimeout);

      if (preventNextPinch === true) {
        lastScale = e.scale;
        preventNextPinch = false;
        break;
      }

      scaleChange = (e.scale - lastScale) / lastScale;

      startPoints = {
        page: e.center,
        image: cornerstone.pageToPixel(element, e.center.x, e.center.y)
      };
      startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

      eventType = _events2.default.TOUCH_PINCH;
      eventData = {
        event: e,
        startPoints: startPoints,
        viewport: cornerstone.getViewport(element),
        image: enabledElement.image,
        element: element,
        direction: e.scale < 1 ? 1 : -1,
        scaleChange: scaleChange,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);

      lastScale = e.scale;
      break;

    case 'touchstart':
      lastScale = 1.0;

      clearTimeout(pressTimeout);

      clearTimeout(touchStartDelay);
      touchStartDelay = setTimeout(function () {
        startPoints = {
          page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.touches[0]),
          image: cornerstone.pageToPixel(element, e.touches[0].pageX, e.touches[0].pageY),
          client: {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          }
        };
        startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

        eventType = _events2.default.TOUCH_START;
        if (e.touches.length > 1) {
          eventType = _events2.default.MULTI_TOUCH_START;
        }

        eventData = {
          event: e,
          viewport: cornerstone.getViewport(element),
          image: enabledElement.image,
          element: element,
          startPoints: startPoints,
          currentPoints: startPoints,
          type: eventType,
          isTouchEvent: true
        };

        var eventPropagated = (0, _triggerEvent2.default)(element, eventType, eventData);

        if (eventPropagated === true) {
          // IsPress = false;
          // ClearTimeout(pressTimeout);

          // No current tools responded to the drag action.
          // Create new tool measurement
          eventType = _events2.default.TOUCH_START_ACTIVE;
          if (e.touches.length > 1) {
            eventType = _events2.default.MULTI_TOUCH_START_ACTIVE;
          }

          eventData.type = eventType;
          (0, _triggerEvent2.default)(element, eventType, eventData);
        }

        // Console.log(eventType);
        lastPoints = (0, _copyPoints2.default)(startPoints);
      }, 50);

      isPress = true;
      pageDistanceMoved = 0;
      pressTimeout = setTimeout(function () {
        if (!isPress) {
          return;
        }

        currentPoints = {
          page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.touches[0]),
          image: cornerstone.pageToPixel(element, e.touches[0].pageX, e.touches[0].pageY),
          client: {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          }
        };
        currentPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

        eventType = _events2.default.TOUCH_PRESS;
        eventData = {
          event: e,
          viewport: cornerstone.getViewport(element),
          image: enabledElement.image,
          element: element,
          currentPoints: currentPoints,
          type: eventType,
          isTouchEvent: true
        };

        (0, _triggerEvent2.default)(element, eventType, eventData);

        // Console.log(eventType);
      }, pressDelay);
      break;

    case 'touchend':
      lastScale = 1.0;

      isPress = false;
      clearTimeout(pressTimeout);

      setTimeout(function () {
        startPoints = {
          page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.changedTouches[0]),
          image: cornerstone.pageToPixel(element, e.changedTouches[0].pageX, e.changedTouches[0].pageY),
          client: {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
          }
        };
        startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

        eventType = _events2.default.TOUCH_END;

        eventData = {
          event: e,
          viewport: cornerstone.getViewport(element),
          image: enabledElement.image,
          element: element,
          startPoints: startPoints,
          currentPoints: startPoints,
          type: eventType,
          isTouchEvent: true
        };

        (0, _triggerEvent2.default)(element, eventType, eventData);
      }, 50);
      break;

    case 'panmove':
      // Using the delta-value of HammerJS, because it takes all pointers into account
      // This is very important when using panning in combination with pinch-zooming
      // But HammerJS' delta is relative to the start of the pan event
      // So it needs to be converted to a per-event-delta for CornerstoneTools
      delta = {
        x: e.deltaX - lastDelta.x,
        y: e.deltaY - lastDelta.y
      };

      lastDelta = {
        x: e.deltaX,
        y: e.deltaY
      };

      // Calculate our current points in page and image coordinates
      currentPoints = {
        page: {
          x: lastPoints.page.x + delta.x,
          y: lastPoints.page.y + delta.y
        },
        image: cornerstone.pageToPixel(element, lastPoints.page.x + delta.x, lastPoints.page.y + delta.y),
        client: {
          x: lastPoints.client.x + delta.x,
          y: lastPoints.client.y + delta.y
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      // Calculate delta values in page and image coordinates
      deltaPoints = {
        page: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
        image: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
        client: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
        canvas: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
      };

      pageDistanceMoved += Math.sqrt(deltaPoints.page.x * deltaPoints.page.x + deltaPoints.page.y * deltaPoints.page.y);
      // Console.log("pageDistanceMoved: " + pageDistanceMoved);
      if (pageDistanceMoved > pressMaxDistance) {
        // Console.log('Press event aborted due to movement');
        isPress = false;
        clearTimeout(pressTimeout);
      }

      eventType = _events2.default.TOUCH_DRAG;
      if (e.pointers.length > 1) {
        eventType = _events2.default.MULTI_TOUCH_DRAG;
      }

      eventData = {
        viewport: cornerstone.getViewport(element),
        image: enabledElement.image,
        element: element,
        startPoints: startPoints,
        lastPoints: lastPoints,
        currentPoints: currentPoints,
        deltaPoints: deltaPoints,
        numPointers: e.pointers.length,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);

      lastPoints = (0, _copyPoints2.default)(currentPoints);
      break;

    case 'panstart':
      lastDelta = {
        x: e.deltaX,
        y: e.deltaY
      };

      currentPoints = {
        page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);
      lastPoints = (0, _copyPoints2.default)(currentPoints);
      break;

    case 'panend':
      isPress = false;
      clearTimeout(pressTimeout);

      // If lastPoints is not yet set, it means panend fired without panstart or pan,
      // So we can ignore this event
      if (!lastPoints) {
        return false;
      }

      currentPoints = {
        page: _externalModules2.default.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      // Calculate delta values in page and image coordinates
      deltaPoints = {
        page: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
        image: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
        client: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
        canvas: _externalModules2.default.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
      };

      eventType = _events2.default.TOUCH_DRAG_END;

      eventData = {
        event: e.srcEvent,
        viewport: cornerstone.getViewport(element),
        image: enabledElement.image,
        element: element,
        startPoints: startPoints,
        lastPoints: lastPoints,
        currentPoints: currentPoints,
        deltaPoints: deltaPoints,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);

      remainingPointers = e.pointers.length - e.changedPointers.length;

      if (remainingPointers === 2) {
        preventNextPinch = true;
      }
      break;

    case 'rotatemove':
      isPress = false;
      clearTimeout(pressTimeout);

      rotation = e.rotation - lastRotation;

      lastRotation = e.rotation;

      eventType = _events2.default.TOUCH_ROTATE;
      eventData = {
        event: e.srcEvent,
        viewport: cornerstone.getViewport(element),
        image: enabledElement.image,
        element: element,
        rotation: rotation,
        type: eventType
      };
      (0, _triggerEvent2.default)(element, eventType, eventData);
      break;
  }

  return false;
}

function enable(element) {
  disable(element);
  var Hammer = _externalModules2.default.Hammer;

  var hammerOptions = {
    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
  };

  var mc = new Hammer.Manager(element, hammerOptions);

  var panOptions = {
    pointers: 0,
    direction: Hammer.DIRECTION_ALL,
    threshold: 0
  };

  var pan = new Hammer.Pan(panOptions);
  var pinch = new Hammer.Pinch({
    threshold: 0
  });
  var rotate = new Hammer.Rotate({
    threshold: 0
  });

  pinch.recognizeWith(pan);
  pinch.recognizeWith(rotate);
  rotate.recognizeWith(pan);

  var doubleTap = new Hammer.Tap({
    event: 'doubletap',
    taps: 2,
    interval: 1500,
    threshold: 50,
    posThreshold: 50
  });

  doubleTap.recognizeWith(pan);

  // Add to the Manager
  mc.add([doubleTap, pan, rotate, pinch]);
  mc.on('tap doubletap panstart panmove panend pinchstart pinchmove rotatemove', onTouch);

  _preventGhostClick2.default.enable(element);

  var touchEvents = ['touchstart', 'touchend'];

  touchEvents.forEach(function (eventType) {
    element.addEventListener(eventType, onTouch);
  });

  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  options.hammer = mc;

  (0, _toolOptions.setToolOptions)(toolType, element, options);
}

function disable(element) {
  _preventGhostClick2.default.disable(element);

  var touchEvents = ['touchstart', 'touchend'];

  touchEvents.forEach(function (eventType) {
    element.removeEventListener(eventType, onTouch);
  });

  var options = (0, _toolOptions.getToolOptions)(toolType, element);
  var mc = options.hammer;

  if (mc) {
    mc.off('tap doubletap panstart panmove panend pinchstart pinchmove rotatemove', onTouch);
  }
}

// Module exports
var touchInput = {
  enable: enable,
  disable: disable
};

exports.default = touchInput;

/***/ }),

/***/ "./manipulators/anyHandlesOutsideImage.js":
/*!************************************************!*\
  !*** ./manipulators/anyHandlesOutsideImage.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (renderData, handles) {
  var image = renderData.image;
  var imageRect = {
    left: 0,
    top: 0,
    width: image.width,
    height: image.height
  };

  var handleOutsideImage = false;

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.allowedOutsideImage === true) {
      return;
    }
//  console.log(12181,handle, imageRect);
    if (_externalModules2.default.cornerstoneMath.point.insideRect(handle, imageRect) === false) {
      handleOutsideImage = true;
    }
  });

  return handleOutsideImage;
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/drawHandles.js":
/*!*************************************!*\
  !*** ./manipulators/drawHandles.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, renderData, handles, color, options) {
  context.strokeStyle = color;

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.drawnIndependently === true) {
      return;
    }

    if (options && options.drawHandlesIfActive === true && !handle.active) {
      return;
    }

    context.beginPath();

    if (handle.active) {
      context.lineWidth = _toolStyle2.default.getActiveWidth();
    } else {
      context.lineWidth = _toolStyle2.default.getToolWidth();
    }

    var handleCanvasCoords = _externalModules2.default.cornerstone.pixelToCanvas(renderData.element, handle);
    if(options){
    	if("freehandHandleRadius" in options){
	    	context.arc(handleCanvasCoords.x, handleCanvasCoords.y, options["freehandHandleRadius"], 0, 2 * Math.PI);
	    }else{
	    	context.arc(handleCanvasCoords.x, handleCanvasCoords.y, handleRadius, 0, 2 * Math.PI);
	    }
    }else{
    	context.arc(handleCanvasCoords.x, handleCanvasCoords.y, handleRadius, 0, 2 * Math.PI);
    }
//  context.arc(handleCanvasCoords.x, handleCanvasCoords.y, handleRadius, 0, 2 * Math.PI);

    if (options && options.fill) {
      context.fillStyle = options.fill;
      context.fill();
    }

    context.stroke();
  });
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleRadius = 6;

/***/ }),

/***/ "./manipulators/getHandleNearImagePoint.js":
/*!*************************************************!*\
  !*** ./manipulators/getHandleNearImagePoint.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, handles, coords, distanceThreshold) {
  var nearbyHandle = void 0;

  if (!handles) {
    return;
  }

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.hasOwnProperty('pointNearHandle')) {
      if (handle.pointNearHandle(element, handle, coords)) {
        nearbyHandle = handle;
//      console.log(11)
        return;
      }
    } else if (handle.hasBoundingBox === true) {
      if ((0, _pointInsideBoundingBox2.default)(handle, coords)) {
        nearbyHandle = handle;
//      console.log(22)
        return;
      }
    } else {
      var handleCanvas = _externalModules2.default.cornerstone.pixelToCanvas(element, handle);
      var distance = _externalModules2.default.cornerstoneMath.point.distance(handleCanvas, coords);

      if (distance <= distanceThreshold) {
        nearbyHandle = handle;
//      console.log(33)
        return;
      }
    }
  });

  return nearbyHandle;
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _pointInsideBoundingBox = __webpack_require__(/*! ../util/pointInsideBoundingBox.js */ "./util/pointInsideBoundingBox.js");

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/handleActivator.js":
/*!*****************************************!*\
  !*** ./manipulators/handleActivator.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, handles, canvasPoint, distanceThreshold) {
  if (!distanceThreshold) {
    distanceThreshold = 6;
  }

  var activeHandle = getActiveHandle(handles);
  var nearbyHandle = (0, _getHandleNearImagePoint2.default)(element, handles, canvasPoint, distanceThreshold);

  if (activeHandle !== nearbyHandle) {
    if (nearbyHandle !== undefined) {
      nearbyHandle.active = true;
    }

    if (activeHandle !== undefined) {
      activeHandle.active = false;
    }

    return true;
  }

  return false;
};

var _getHandleNearImagePoint = __webpack_require__(/*! ./getHandleNearImagePoint.js */ "./manipulators/getHandleNearImagePoint.js");

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getActiveHandle(handles) {
  var activeHandle = void 0;

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.active === true) {
      activeHandle = handle;

      return;
    }
  });

  return activeHandle;
}

/***/ }),

/***/ "./manipulators/moveAllHandles.js":
/*!****************************************!*\
  !*** ./manipulators/moveAllHandles.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (e, data, toolData, toolType, options, doneMovingCallback) {
  var cornerstone = _externalModules2.default.cornerstone;
  var mouseEventData = e.detail;
  var element = mouseEventData.element;

  function mouseDragCallback(e) {
    var eventData = e.detail;

    data.active = true;

    Object.keys(data.handles).forEach(function (name) {
      var handle = data.handles[name];

      if (handle.movesIndependently === true) {
        return;
      }

      handle.x += eventData.deltaPoints.image.x;
      handle.y += eventData.deltaPoints.image.y;

      if (options.preventHandleOutsideImage === true) {
        handle.x = Math.max(handle.x, 0);
        handle.x = Math.min(handle.x, eventData.image.width);

        handle.y = Math.max(handle.y, 0);
        handle.y = Math.min(handle.y, eventData.image.height);
      }
    });

    cornerstone.updateImage(element);

    var eventType = _events2.default.MEASUREMENT_MODIFIED;
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);

    e.preventDefault();
    e.stopPropagation();
  }

  element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);

  function mouseUpCallback(e) {
    var eventData = e.detail;

    data.invalidated = true;

    element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
    element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

    // If any handle is outside the image, delete the tool data
    if (options.deleteIfHandleOutsideImage === true && (0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
      (0, _toolState.removeToolState)(element, toolType, data);
    }

    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }

  element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);

  return true;
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _anyHandlesOutsideImage = __webpack_require__(/*! ./anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/moveHandle.js":
/*!************************************!*\
  !*** ./manipulators/moveHandle.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseEventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = mouseEventData.element;
  var distanceFromTool = {
    x: handle.x - mouseEventData.currentPoints.image.x,
    y: handle.y - mouseEventData.currentPoints.image.y
  };

  function mouseDragCallback(e) {
    var eventData = e.detail;

    if (handle.hasMoved === false) {
      handle.hasMoved = true;
    }

    handle.active = true;
    handle.x = eventData.currentPoints.image.x + distanceFromTool.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTool.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    var eventType = _events2.default.MEASUREMENT_MODIFIED;
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);

  function mouseUpCallback() {
    handle.active = false;
    element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
    element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }

  element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/moveNewHandle.js":
/*!***************************************!*\
  !*** ./manipulators/moveNewHandle.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseEventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
  var cornerstone = _externalModules2.default.cornerstone;
  var element = mouseEventData.element;

  function moveCallback(e) {
    var eventData = e.detail;

    handle.active = true;
    handle.x = eventData.currentPoints.image.x;
    handle.y = eventData.currentPoints.image.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    var eventType = _events2.default.MEASUREMENT_MODIFIED;
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  function whichMovement(e) {
    element.removeEventListener(_events2.default.MOUSE_MOVE, whichMovement);
    element.removeEventListener(_events2.default.MOUSE_DRAG, whichMovement);

    element.addEventListener(_events2.default.MOUSE_MOVE, moveCallback);
    element.addEventListener(_events2.default.MOUSE_DRAG, moveCallback);

    element.addEventListener(_events2.default.MOUSE_CLICK, moveEndCallback);
    if (e.type === _events2.default.MOUSE_DRAG) {
      element.addEventListener(_events2.default.MOUSE_UP, moveEndCallback);
    }
  }

  function measurementRemovedCallback(e) {
    var eventData = e.detail;

    if (eventData.measurementData === data) {
      moveEndCallback();
    }
  }

  function toolDeactivatedCallback(e) {
    var eventData = e.detail;

    if (eventData.toolType === toolType) {
      element.removeEventListener(_events2.default.MOUSE_MOVE, moveCallback);
      element.removeEventListener(_events2.default.MOUSE_DRAG, moveCallback);
      element.removeEventListener(_events2.default.MOUSE_CLICK, moveEndCallback);
      element.removeEventListener(_events2.default.MOUSE_UP, moveEndCallback);
      element.removeEventListener(_events2.default.MEASUREMENT_REMOVED, measurementRemovedCallback);
      element.removeEventListener(_events2.default.TOOL_DEACTIVATED, toolDeactivatedCallback);

      handle.active = false;
      cornerstone.updateImage(element);
    }
  }

  element.addEventListener(_events2.default.MOUSE_DRAG, whichMovement);
  element.addEventListener(_events2.default.MOUSE_MOVE, whichMovement);
  element.addEventListener(_events2.default.MEASUREMENT_REMOVED, measurementRemovedCallback);
  element.addEventListener(_events2.default.TOOL_DEACTIVATED, toolDeactivatedCallback);

  function moveEndCallback() {
    element.removeEventListener(_events2.default.MOUSE_MOVE, moveCallback);
    element.removeEventListener(_events2.default.MOUSE_DRAG, moveCallback);
    element.removeEventListener(_events2.default.MOUSE_CLICK, moveEndCallback);
    element.removeEventListener(_events2.default.MOUSE_UP, moveEndCallback);
    element.removeEventListener(_events2.default.MEASUREMENT_REMOVED, measurementRemovedCallback);
    element.removeEventListener(_events2.default.TOOL_DEACTIVATED, toolDeactivatedCallback);

    handle.active = false;
    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/moveNewHandleTouch.js":
/*!********************************************!*\
  !*** ./manipulators/moveNewHandleTouch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (eventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
  // Console.log('moveNewHandleTouch');
  var cornerstone = _externalModules2.default.cornerstone;
  var element = eventData.element;
  var imageCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x, eventData.currentPoints.page.y + 50);
  var distanceFromTouch = {
    x: handle.x - imageCoords.x,
    y: handle.y - imageCoords.y
  };

  handle.active = true;
  data.active = true;

  function moveCallback(e) {
    var eventData = e.detail;

    handle.x = eventData.currentPoints.image.x + distanceFromTouch.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTouch.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    var eventType = _events2.default.MEASUREMENT_MODIFIED;
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  function moveEndCallback(e) {
    var eventData = e.detail;

    element.removeEventListener(_events2.default.TOUCH_DRAG, moveCallback);
    element.removeEventListener(_events2.default.TOUCH_PINCH, moveEndCallback);
    element.removeEventListener(_events2.default.TOUCH_END, moveEndCallback);
    element.removeEventListener(_events2.default.TAP, moveEndCallback);
    element.removeEventListener(_events2.default.TOUCH_START, stopImmediatePropagation);
    element.removeEventListener(_events2.default.TOOL_DEACTIVATED, toolDeactivatedCallback);

    if (e.type === _events2.default.TOUCH_PINCH || e.type === _events2.default.TOUCH_PRESS) {
      handle.active = false;
      cornerstone.updateImage(element);
      doneMovingCallback();

      return;
    }

    handle.active = false;
    data.active = false;
    handle.x = eventData.currentPoints.image.x + distanceFromTouch.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTouch.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }

  function stopImmediatePropagation(e) {
    // Stop the CornerstoneToolsTouchStart event from
    // Become a CornerstoneToolsTouchStartActive event when
    // MoveNewHandleTouch ends
    e.stopImmediatePropagation();

    return false;
  }

  element.addEventListener(_events2.default.TOUCH_DRAG, moveCallback);
  element.addEventListener(_events2.default.TOUCH_PINCH, moveEndCallback);
  element.addEventListener(_events2.default.TOUCH_END, moveEndCallback);
  element.addEventListener(_events2.default.TAP, moveEndCallback);
  element.addEventListener(_events2.default.TOUCH_START, stopImmediatePropagation);

  function toolDeactivatedCallback() {
    element.removeEventListener(_events2.default.TOUCH_DRAG, moveCallback);
    element.removeEventListener(_events2.default.TOUCH_PINCH, moveEndCallback);
    element.removeEventListener(_events2.default.TOUCH_END, moveEndCallback);
    element.removeEventListener(_events2.default.TAP, moveEndCallback);
    element.removeEventListener(_events2.default.TOUCH_START, stopImmediatePropagation);
    element.removeEventListener(_events2.default.TOOL_DEACTIVATED, toolDeactivatedCallback);

    handle.active = false;
    data.active = false;
    handle.x = eventData.currentPoints.image.x + distanceFromTouch.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTouch.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);
  }

  element.addEventListener(_events2.default.TOOL_DEACTIVATED, toolDeactivatedCallback);
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/touchMoveAllHandles.js":
/*!*********************************************!*\
  !*** ./manipulators/touchMoveAllHandles.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (event, data, toolData, toolType, deleteIfHandleOutsideImage, doneMovingCallback) {
  var touchEventData = event.detail;
  var element = touchEventData.element;
  var cornerstone = _externalModules2.default.cornerstone;

  function touchDragCallback(e) {
    var eventData = e.detail;

    data.active = true;

    Object.keys(data.handles).forEach(function (name) {
      var handle = data.handles[name];

      if (handle.movesIndependently === true) {
        return;
      }

      handle.x += eventData.deltaPoints.image.x;
      handle.y += eventData.deltaPoints.image.y;
    });
    cornerstone.updateImage(element);

    var eventType = _events2.default.MEASUREMENT_MODIFIED;
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);

    e.preventDefault();
    e.stopPropagation();
  }

  element.addEventListener(_events2.default.TOUCH_DRAG, touchDragCallback);

  function touchEndCallback(e) {
    var eventData = e.detail;

    // Console.log('touchMoveAllHandles touchEndCallback: ' + e.type);
    data.active = false;
    data.invalidated = false;

    element.removeEventListener(_events2.default.TOUCH_DRAG, touchDragCallback);

    element.removeEventListener(_events2.default.TOUCH_PINCH, touchEndCallback);
    element.removeEventListener(_events2.default.TOUCH_PRESS, touchEndCallback);
    element.removeEventListener(_events2.default.TOUCH_END, touchEndCallback);
    element.removeEventListener(_events2.default.TOUCH_DRAG_END, touchEndCallback);
    element.removeEventListener(_events2.default.TAP, touchEndCallback);

    // If any handle is outside the image, delete the tool data
    var handlesOutsideImage = (0, _anyHandlesOutsideImage2.default)(eventData, data.handles);

    if (deleteIfHandleOutsideImage === true && handlesOutsideImage === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    }

    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback(e);
    }
  }

  element.addEventListener(_events2.default.TOUCH_PINCH, touchEndCallback);
  element.addEventListener(_events2.default.TOUCH_PRESS, touchEndCallback);
  element.addEventListener(_events2.default.TOUCH_END, touchEndCallback);
  element.addEventListener(_events2.default.TOUCH_DRAG_END, touchEndCallback);
  element.addEventListener(_events2.default.TAP, touchEndCallback);

  return true;
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _anyHandlesOutsideImage = __webpack_require__(/*! ./anyHandlesOutsideImage.js */ "./manipulators/anyHandlesOutsideImage.js");

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./manipulators/touchMoveHandle.js":
/*!*****************************************!*\
  !*** ./manipulators/touchMoveHandle.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (event, toolType, data, handle, doneMovingCallback) {
  // Console.log('touchMoveHandle');
  runAnimation.value = true;

  var touchEventData = event.detail;
  var cornerstone = _externalModules2.default.cornerstone;
  var element = touchEventData.element;
  var enabledElement = cornerstone.getEnabledElement(element);

  var time = new Date().getTime();

  // Average pixel width of index finger is 45-57 pixels
  // https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/
  var fingerDistance = -57;

  var aboveFinger = {
    x: touchEventData.currentPoints.page.x,
    y: touchEventData.currentPoints.page.y + fingerDistance
  };

  var targetLocation = cornerstone.pageToPixel(element, aboveFinger.x, aboveFinger.y);

  function touchDragCallback(e) {
    var eventData = e.detail;

    // Console.log('touchMoveHandle touchDragCallback: ' + e.type);
    runAnimation.value = false;

    if (handle.hasMoved === false) {
      handle.hasMoved = true;
    }

    handle.active = true;

    var currentPoints = eventData.currentPoints;
    var aboveFinger = {
      x: currentPoints.page.x,
      y: currentPoints.page.y + fingerDistance
    };

    targetLocation = cornerstone.pageToPixel(element, aboveFinger.x, aboveFinger.y);
    handle.x = targetLocation.x;
    handle.y = targetLocation.y;

    cornerstone.updateImage(element);

    var eventType = _events2.default.MEASUREMENT_MODIFIED;
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  element.addEventListener(_events2.default.TOUCH_DRAG, touchDragCallback);

  function touchEndCallback(e) {
    var eventData = e.detail;
    // Console.log('touchMoveHandle touchEndCallback: ' + e.type);

    runAnimation.value = false;

    handle.active = false;
    element.removeEventListener(_events2.default.TOUCH_DRAG, touchDragCallback);
    touchEndEvents.forEach(function (eventType) {
      element.removeEventListener(eventType, touchEndCallback);
    });

    cornerstone.updateImage(element);

    if (e.type === _events2.default.TOUCH_PRESS) {
      eventData.handlePressed = data;

      handle.x = touchEventData.currentPoints.image.x;
      handle.y = touchEventData.currentPoints.image.y;
    }

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback(e);
    }
  }

  touchEndEvents.forEach(function (eventType) {
    element.addEventListener(eventType, touchEndCallback);
  });

  animate(time, handle, runAnimation, enabledElement, targetLocation);
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Define the runAnimation boolean as an object
 * so that it can be modified by reference
 */
var runAnimation = {
  value: false
};

var touchEndEvents = [_events2.default.TOUCH_END, _events2.default.TOUCH_DRAG_END, _events2.default.TOUCH_PINCH, _events2.default.TOUCH_PRESS, _events2.default.TAP];

function animate(lastTime, handle, runAnimation, enabledElement, targetLocation) {
  // See http://www.html5canvastutorials.com/advanced/html5-canvas-start-and-stop-an-animation/
  if (!runAnimation.value) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // Update
  var time = new Date().getTime();
  // Var timeDiff = time - lastTime;

  // Pixels / second
  var distanceRemaining = Math.abs(handle.y - targetLocation.y);
  var linearDistEachFrame = distanceRemaining / 10;

  if (distanceRemaining < 1) {
    handle.y = targetLocation.y;
    runAnimation.value = false;

    return;
  }

  if (handle.y > targetLocation.y) {
    handle.y -= linearDistEachFrame;
  } else if (handle.y < targetLocation.y) {
    handle.y += linearDistEachFrame;
  }

  // Update the image
  cornerstone.updateImage(enabledElement.element);

  // Request a new frame
  cornerstone.requestAnimationFrame(function () {
    animate(time, handle, runAnimation, enabledElement, targetLocation);
  });
}

/***/ }),

/***/ "./measurementManager/lineSampleMeasurement.js":
/*!*****************************************************!*\
  !*** ./measurementManager/lineSampleMeasurement.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var cornerstone = _externalModules2.default.cornerstone;
  var that = this;

  that.samples = [];

  this.set = function (samples) {
    that.samples = samples;
    // Fire event
    (0, _triggerEvent2.default)(cornerstone.events, _events2.default.LINE_SAMPLE_UPDATED);
  };
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./measurementManager/measurementManager.js":
/*!**************************************************!*\
  !*** ./measurementManager/measurementManager.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This object manages a collection of measurements
function MeasurementManager() {
  var cornerstone = _externalModules2.default.cornerstone;
  var that = this;

  that.measurements = [];

  // Adds an element as both a source and a target
  this.add = function (measurement) {
    var index = that.measurements.push(measurement);
    // Fire event
    var eventDetail = {
      index: index,
      measurement: measurement
    };

    (0, _triggerEvent2.default)(cornerstone.events, _events2.default.MEASUREMENT_ADDED, eventDetail);
  };

  this.remove = function (index) {
    var measurement = that.measurements[index];

    that.measurements.splice(index, 1);
    // Fire event
    var eventDetail = {
      index: index,
      measurement: measurement
    };

    (0, _triggerEvent2.default)(cornerstone.events, _events2.default.MEASUREMENT_REMOVED, eventDetail);
  };
}

// Module/private exports
var manager = new MeasurementManager();

exports.default = manager;

/***/ }),

/***/ "./orientation/getOrientationString.js":
/*!*********************************************!*\
  !*** ./orientation/getOrientationString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vector) {
  var vec3 = (0, _convertToVector2.default)(vector);

  // Thanks to David Clunie
  // https://sites.google.com/site/dicomnotes/

  var orientation = '';
  var orientationX = vec3.x < 0 ? 'R' : 'L';
  var orientationY = vec3.y < 0 ? 'A' : 'P';
  var orientationZ = vec3.z < 0 ? 'F' : 'H';

  // Should probably make this a function vector3.abs
  var abs = new _externalModules2.default.cornerstoneMath.Vector3(Math.abs(vec3.x), Math.abs(vec3.y), Math.abs(vec3.z));

  for (var i = 0; i < 3; i++) {
    if (abs.x > 0.0001 && abs.x > abs.y && abs.x > abs.z) {
      orientation += orientationX;
      abs.x = 0;
    } else if (abs.y > 0.0001 && abs.y > abs.x && abs.y > abs.z) {
      orientation += orientationY;
      abs.y = 0;
    } else if (abs.z > 0.0001 && abs.z > abs.x && abs.z > abs.y) {
      orientation += orientationZ;
      abs.z = 0;
    } else {
      break;
    }
  }

  return orientation;
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./orientation/index.js":
/*!******************************!*\
  !*** ./orientation/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOrientationString = __webpack_require__(/*! ./getOrientationString.js */ "./orientation/getOrientationString.js");

var _getOrientationString2 = _interopRequireDefault(_getOrientationString);

var _invertOrientationString = __webpack_require__(/*! ./invertOrientationString.js */ "./orientation/invertOrientationString.js");

var _invertOrientationString2 = _interopRequireDefault(_invertOrientationString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orientation = {
  getOrientationString: _getOrientationString2.default,
  invertOrientationString: _invertOrientationString2.default
};

exports.default = orientation;

/***/ }),

/***/ "./orientation/invertOrientationString.js":
/*!************************************************!*\
  !*** ./orientation/invertOrientationString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var inverted = string.replace('H', 'f');

  inverted = inverted.replace('F', 'h');
  inverted = inverted.replace('R', 'l');
  inverted = inverted.replace('L', 'r');
  inverted = inverted.replace('A', 'p');
  inverted = inverted.replace('P', 'a');
  inverted = inverted.toUpperCase();

  return inverted;
};

/***/ }),

/***/ "./paintingTools/adaptiveBrush.js":
/*!****************************************!*\
  !*** ./paintingTools/adaptiveBrush.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptiveBrush = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _brushTool = __webpack_require__(/*! ./brushTool.js */ "./paintingTools/brushTool.js");

var _brushTool2 = _interopRequireDefault(_brushTool);

var _getCircle = __webpack_require__(/*! ./getCircle.js */ "./paintingTools/getCircle.js");

var _getCircle2 = _interopRequireDefault(_getCircle);

var _drawBrush = __webpack_require__(/*! ./drawBrush.js */ "./paintingTools/drawBrush.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module is for creating segmentation overlays
var TOOL_STATE_TOOL_TYPE = 'brush';
var toolType = 'adaptiveBrush';
var configuration = {
  draw: 1,
  radius: 3,
  tolerance: 5,
  minRadius: 1,
  hoverColor: 'green',
  dragColor: 'yellow'
};

var lastImageCoords = void 0;
var thrMax = void 0;
var thrMin = void 0;
var currentRadius = void 0;
var dragging = void 0;

function getGreyValues(pointerArray, pixelData, imageColumns) {
  var configuration = adaptiveBrush.getConfiguration();
  var tolerance = configuration.tolerance;
  var minValue = Number.MAX_VALUE;
  var maxValue = -Number.MAX_VALUE;

  pointerArray.forEach(function (point) {
    var pixelIndex = point[1] * imageColumns + point[0];
    var greyValue = pixelData[pixelIndex];

    minValue = Math.min(greyValue, minValue);
    maxValue = Math.max(greyValue, maxValue);
  });

  thrMin = minValue - tolerance;
  thrMax = maxValue + tolerance;
}

// Draws the pointer with overlap calculation - Used on mouse clicked
function paintAdaptiveBrush(imagePixelData, brushPixelData, rows, columns) {
  var configuration = adaptiveBrush.getConfiguration();
  var brushPixelValue = configuration.draw;
  var mouseX = Math.round(lastImageCoords.x);
  var mouseY = Math.round(lastImageCoords.y);
  var numPixelsOutsideThresholdWindow = null;
  var pointerArray = [];
  var radius = configuration.radius;

  /*
   * Find pixels within the brush area. If within the brush area there are pixels outside the threshold min / max,
   * decrease the brush radius until there are no sub/supra threshold pixels left (or until you reach the minimum radius).
   */
  while (numPixelsOutsideThresholdWindow !== 0 && radius > configuration.minRadius) {
    numPixelsOutsideThresholdWindow = 0;
    pointerArray = (0, _getCircle2.default)(radius, rows, columns, mouseX, mouseY);

    // Loop through each of the relative pixel coordinates for the brush
    for (var j = 0; j < pointerArray.length; j++) {
      // Calculate the x / y image coordinates using the brush and the current mouse position
      var xCoord = pointerArray[j][0];
      var yCoord = pointerArray[j][1];

      // Otherwise, retrieve the image pixel value in this location
      var pixelIndex = yCoord * columns + xCoord;
      var pixelValue = imagePixelData[pixelIndex];

      /*
        If the image pixel value is outside of the thresholds,
        increase the numPixelsOutsideThresholdWindow counter
      */
      if (pixelValue > thrMax || pixelValue < thrMin) {
        numPixelsOutsideThresholdWindow++;
        break;
      }
    }

    radius--;
  }

  if (numPixelsOutsideThresholdWindow === 0) {
    (0, _drawBrush.drawBrushPixels)(pointerArray, brushPixelData, brushPixelValue, columns);
  }

  return radius;
}

function paint(eventData) {
  var configuration = adaptiveBrush.getConfiguration();
  var element = eventData.element;
  var layer = _externalModules2.default.cornerstone.getLayer(element, configuration.brushLayerId);
  var baseLayer = _externalModules2.default.cornerstone.getLayers(element)[0];
  var _layer$image = layer.image,
      rows = _layer$image.rows,
      columns = _layer$image.columns;

  var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
  var brushData = toolData.data[0];

  currentRadius = paintAdaptiveBrush(baseLayer.image.getPixelData(), brushData.pixelData, rows, columns);
  layer.invalid = true;

  _externalModules2.default.cornerstone.updateImage(element);
}

function erase(eventData) {
  var configuration = adaptiveBrush.getConfiguration();
  var element = eventData.element;
  var layer = _externalModules2.default.cornerstone.getLayer(element, configuration.brushLayerId);
  var _layer$image2 = layer.image,
      rows = _layer$image2.rows,
      columns = _layer$image2.columns;
  var _eventData$currentPoi = eventData.currentPoints.image,
      x = _eventData$currentPoi.x,
      y = _eventData$currentPoi.y;

  var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
  var pixelData = toolData.data[0].pixelData;
  var brushPixelValue = configuration.draw;
  var radius = configuration.radius;

  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  var pointerArray = (0, _getCircle2.default)(radius, rows, columns, x, y);

  (0, _drawBrush.drawBrushPixels)(pointerArray, pixelData, brushPixelValue, columns);

  layer.invalid = true;

  _externalModules2.default.cornerstone.updateImage(element);
}

function onMouseUp(e) {
  var eventData = e.detail;

  lastImageCoords = eventData.currentPoints.image;
  var configuration = adaptiveBrush.getConfiguration();

  dragging = false;
  currentRadius = configuration.radius;
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function onMouseDown(e) {
  var eventData = e.detail;

  var element = eventData.element;
  var configuration = adaptiveBrush.getConfiguration();
  var layer = _externalModules2.default.cornerstone.getLayer(element, configuration.brushLayerId);
  var baseLayer = _externalModules2.default.cornerstone.getLayers(element)[0];
  var _eventData$currentPoi2 = eventData.currentPoints.image,
      x = _eventData$currentPoi2.x,
      y = _eventData$currentPoi2.y;
  var _layer$image3 = layer.image,
      rows = _layer$image3.rows,
      columns = _layer$image3.columns;

  var pointerArray = (0, _getCircle2.default)(configuration.radius, rows, columns, x, y);

  if (configuration.draw === 0) {
    erase(eventData);
  } else {
    getGreyValues(pointerArray, baseLayer.image.getPixelData(), columns);
    paint(eventData);
  }

  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onMouseMove(e) {
  var eventData = e.detail;

  lastImageCoords = eventData.currentPoints.image;
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function onDrag(e) {
  var eventData = e.detail;

  if (configuration.draw === 0) {
    erase(eventData);
  } else {
    paint(eventData);
  }

  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onImageRendered(e) {
  var eventData = e.detail;

  if (!lastImageCoords) {
    return;
  }

  var _eventData$image = eventData.image,
      rows = _eventData$image.rows,
      columns = _eventData$image.columns;
  var _lastImageCoords = lastImageCoords,
      x = _lastImageCoords.x,
      y = _lastImageCoords.y;


  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  // Draw the hover overlay on top of the pixel data
  var configuration = adaptiveBrush.getConfiguration();
  var context = eventData.canvasContext;
  var color = dragging ? configuration.dragColor : configuration.hoverColor;
  var element = eventData.element;

  currentRadius = currentRadius || configuration.radius;

  context.setTransform(1, 0, 0, 1, 0, 0);

  var pointerArray = (0, _getCircle2.default)(currentRadius, rows, columns, x, y);

  (0, _drawBrush.drawBrushOnCanvas)(pointerArray, context, color, element);
}

var adaptiveBrush = (0, _brushTool2.default)({
  onMouseMove: onMouseMove,
  onMouseDown: onMouseDown,
  onMouseUp: onMouseUp,
  onDrag: onDrag,
  toolType: toolType,
  onImageRendered: onImageRendered
});

adaptiveBrush.setConfiguration(configuration);

exports.adaptiveBrush = adaptiveBrush;

/***/ }),

/***/ "./paintingTools/brush.js":
/*!********************************!*\
  !*** ./paintingTools/brush.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.brush = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _brushTool = __webpack_require__(/*! ./brushTool.js */ "./paintingTools/brushTool.js");

var _brushTool2 = _interopRequireDefault(_brushTool);

var _getCircle = __webpack_require__(/*! ./getCircle.js */ "./paintingTools/getCircle.js");

var _getCircle2 = _interopRequireDefault(_getCircle);

var _drawBrush = __webpack_require__(/*! ./drawBrush.js */ "./paintingTools/drawBrush.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module is for creating segmentation overlays
var TOOL_STATE_TOOL_TYPE = 'brush';
var toolType = 'brush';
var configuration = {
  draw: 1,
  radius: 3,
  hoverColor: 'green',
  dragColor: 'yellow'
};

var lastImageCoords = void 0;
var dragging = false;

function paint(eventData) {
  var configuration = brush.getConfiguration();
  var element = eventData.element;
  var layer = _externalModules2.default.cornerstone.getLayer(element, configuration.brushLayerId);
  var _layer$image = layer.image,
      rows = _layer$image.rows,
      columns = _layer$image.columns;
  var _eventData$currentPoi = eventData.currentPoints.image,
      x = _eventData$currentPoi.x,
      y = _eventData$currentPoi.y;

  var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
  var pixelData = toolData.data[0].pixelData;
  var brushPixelValue = configuration.draw;
  var radius = configuration.radius;

  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  var pointerArray = (0, _getCircle2.default)(radius, rows, columns, x, y);

  (0, _drawBrush.drawBrushPixels)(pointerArray, pixelData, brushPixelValue, columns);

  layer.invalid = true;

  _externalModules2.default.cornerstone.updateImage(element);
}

function onMouseUp(e) {
  var eventData = e.detail;

  lastImageCoords = eventData.currentPoints.image;
  dragging = false;
}

function onMouseDown(e) {
  var eventData = e.detail;

  paint(eventData);
  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onMouseMove(e) {
  var eventData = e.detail;

  lastImageCoords = eventData.currentPoints.image;
  _externalModules2.default.cornerstone.updateImage(eventData.element);
}

function onDrag(e) {
  var eventData = e.detail;

  paint(eventData);
  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onImageRendered(e) {
  var eventData = e.detail;

  if (!lastImageCoords) {
    return;
  }

  var _eventData$image = eventData.image,
      rows = _eventData$image.rows,
      columns = _eventData$image.columns;
  var _lastImageCoords = lastImageCoords,
      x = _lastImageCoords.x,
      y = _lastImageCoords.y;


  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  // Draw the hover overlay on top of the pixel data
  var configuration = brush.getConfiguration();
  var radius = configuration.radius;
  var context = eventData.canvasContext;
  var color = dragging ? configuration.dragColor : configuration.hoverColor;
  var element = eventData.element;

  context.setTransform(1, 0, 0, 1, 0, 0);
  var pointerArray = (0, _getCircle2.default)(radius, rows, columns, x, y);

  (0, _drawBrush.drawBrushOnCanvas)(pointerArray, context, color, element);
}

var brush = (0, _brushTool2.default)({
  onMouseMove: onMouseMove,
  onMouseDown: onMouseDown,
  onMouseUp: onMouseUp,
  onDrag: onDrag,
  toolType: toolType,
  onImageRendered: onImageRendered
});

brush.setConfiguration(configuration);

exports.brush = brush;

/***/ }),

/***/ "./paintingTools/brushTool.js":
/*!************************************!*\
  !*** ./paintingTools/brushTool.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = brushTool;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _mouseButtonTool = __webpack_require__(/*! ../imageTools/mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOOL_STATE_TOOL_TYPE = 'brush';
var brushLayerId = void 0;

function brushTool(brushToolInterface) {
  var toolType = brushToolInterface.toolType;

  function mouseMoveCallback(e) {
    brushToolInterface.onMouseMove(e);
  }

  function mouseUpCallback(e) {
    var eventData = e.detail;
    var element = eventData.element;

    brushToolInterface.onMouseUp(e);

    element.removeEventListener(_events2.default.MOUSE_DRAG, mouseMoveCallback);
    element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
    element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
  }

  function dragCallback(e) {
    brushToolInterface.onDrag(e);

    return false;
  }

  function mouseDownActivateCallback(e) {
    var eventData = e.detail;
    var element = eventData.element;
    var options = (0, _toolOptions.getToolOptions)(toolType, element);

    if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
      element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);
      element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
      element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
      brushToolInterface.onMouseDown(e);

      return false;
    }

    element.addEventListener(_events2.default.MOUSE_DRAG, mouseMoveCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  }

  function onImageRendered(e) {
    var eventData = e.detail;
    var element = eventData.element;
    var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
    var pixelData = void 0;

    if (toolData) {
      pixelData = toolData.data[0].pixelData;
    } else {
      pixelData = new Uint8ClampedArray(eventData.image.width * eventData.image.height);
      (0, _toolState.addToolState)(element, TOOL_STATE_TOOL_TYPE, { pixelData: pixelData });
    }

    var layer = _externalModules2.default.cornerstone.getLayer(eventData.element, brushLayerId);

    layer.image.setPixelData(pixelData);
    layer.invalid = true;

    _externalModules2.default.cornerstone.updateImage(element);

    brushToolInterface.onImageRendered(e);
  }

  function activate(element, mouseButtonMask) {
    (0, _toolOptions.setToolOptions)(toolType, element, { mouseButtonMask: mouseButtonMask });

    element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
    element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);

    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);
    element.addEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);

    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
    element.addEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);

    var enabledElement = _externalModules2.default.cornerstone.getEnabledElement(element);
    var _enabledElement$image = enabledElement.image,
        width = _enabledElement$image.width,
        height = _enabledElement$image.height;

    var pixelData = new Uint8ClampedArray(width * height);

    var configuration = brushTool.getConfiguration();
    var colormapId = configuration.colormapId;

    if (!colormapId) {
      colormapId = 'BrushColorMap';

      var colormap = _externalModules2.default.cornerstone.colors.getColormap(colormapId);

      colormap.setNumberOfColors(2);
      colormap.setColor(0, [0, 0, 0, 0]);
      colormap.setColor(1, [255, 0, 0, 255]);
    }

    var labelMapImage = {
      minPixelValue: 0,
      maxPixelValue: 1,
      slope: 1.0,
      intercept: 0,
      getPixelData: function getPixelData() {
        return pixelData;
      },
      rows: enabledElement.image.height,
      columns: enabledElement.image.width,
      height: height,
      width: width,
      pixelData: pixelData,
      setPixelData: function setPixelData(data) {
        pixelData = data;
      },
      colormap: colormapId,
      color: false,
      rgba: false,
      labelmap: true,
      invert: false,
      columnPixelSpacing: 1.0,
      rowPixelSpacing: 1.0,
      sizeInBytes: enabledElement.image.width * enabledElement.image.height
    };

    var layer = void 0;
    var options = {
      viewport: {
        pixelReplication: true
      }
    };

    if (brushLayerId) {
      layer = _externalModules2.default.cornerstone.getLayer(element, brushLayerId);
    }

    if (!layer) {
      brushLayerId = _externalModules2.default.cornerstone.addLayer(element, labelMapImage, options);
    }

    (0, _toolState.addToolState)(element, TOOL_STATE_TOOL_TYPE, { pixelData: pixelData });

    configuration.brushLayerId = brushLayerId;
    brushTool.setConfiguration(configuration);

    _externalModules2.default.cornerstone.updateImage(element);
  }

  function deactivate(element) {
    element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
    element.removeEventListener(_events2.default.MOUSE_DOWN_ACTIVATE, mouseDownActivateCallback);
    element.removeEventListener(_events2.default.MOUSE_MOVE, mouseMoveCallback);
  }

  var brushTool = (0, _mouseButtonTool2.default)({
    mouseMoveCallback: mouseMoveCallback,
    mouseDownActivateCallback: mouseDownActivateCallback,
    onImageRendered: onImageRendered,
    deactivate: deactivate
  });

  brushTool.activate = activate;

  return brushTool;
}

/***/ }),

/***/ "./paintingTools/drawBrush.js":
/*!************************************!*\
  !*** ./paintingTools/drawBrush.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBrushOnCanvas = exports.drawBrushPixels = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function drawBrushPixels(pointerArray, storedPixels, brushPixelValue, columns) {
  var getPixelIndex = function getPixelIndex(x, y) {
    return y * columns + x;
  };

  pointerArray.forEach(function (point) {
    var spIndex = getPixelIndex(point[0], point[1]);

    storedPixels[spIndex] = brushPixelValue;
  });
}

function drawBrushOnCanvas(pointerArray, canvasContext, color, element) {
  var canvasPtTL = _externalModules2.default.cornerstone.pixelToCanvas(element, { x: 0,
    y: 0 });
  var canvasPtBR = _externalModules2.default.cornerstone.pixelToCanvas(element, { x: 1,
    y: 1 });
  var sizeX = canvasPtBR.x - canvasPtTL.x;
  var sizeY = canvasPtBR.y - canvasPtTL.y;

  canvasContext.save();
  canvasContext.fillStyle = color;

  pointerArray.forEach(function (point) {
    var canvasPt = _externalModules2.default.cornerstone.pixelToCanvas(element, {
      x: point[0],
      y: point[1]
    });

    canvasContext.fillRect(canvasPt.x, canvasPt.y, sizeX, sizeY);
  });

  canvasContext.restore();
}

exports.drawBrushPixels = drawBrushPixels;
exports.drawBrushOnCanvas = drawBrushOnCanvas;

/***/ }),

/***/ "./paintingTools/getCircle.js":
/*!************************************!*\
  !*** ./paintingTools/getCircle.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCircle;
function getCircle(radius, rows, columns) {
  var xCoord = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var yCoord = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var x0 = Math.round(xCoord);
  var y0 = Math.round(yCoord);

  if (radius === 1) {
    return [[x0, y0]];
  }

  var circleArray = [];
  var index = 0;

  for (var y = -radius; y <= radius; y++) {
    var _yCoord = y0 + y;

    if (_yCoord > rows || _yCoord < 0) {
      continue;
    }

    for (var x = -radius; x <= radius; x++) {
      var _xCoord = x0 + x;

      if (_xCoord > columns || _xCoord < 0) {
        continue;
      }

      if (x * x + y * y < radius * radius) {
        circleArray[index++] = [x0 + x, y0 + y];
      }
    }
  }

  return circleArray;
}

/***/ }),

/***/ "./referenceLines/calculateReferenceLine.js":
/*!**************************************************!*\
  !*** ./referenceLines/calculateReferenceLine.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (targetImagePlane, referenceImagePlane) {
  var points = (0, _pointProjector.planePlaneIntersection)(targetImagePlane, referenceImagePlane);

  if (!points) {
    return;
  }

  return {
    start: (0, _pointProjector.projectPatientPointToImagePlane)(points.start, targetImagePlane),
    end: (0, _pointProjector.projectPatientPointToImagePlane)(points.end, targetImagePlane)
  };
};

var _pointProjector = __webpack_require__(/*! ../util/pointProjector.js */ "./util/pointProjector.js");

/***/ }),

/***/ "./referenceLines/index.js":
/*!*********************************!*\
  !*** ./referenceLines/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calculateReferenceLine = __webpack_require__(/*! ./calculateReferenceLine.js */ "./referenceLines/calculateReferenceLine.js");

var _calculateReferenceLine2 = _interopRequireDefault(_calculateReferenceLine);

var _referenceLinesTool = __webpack_require__(/*! ./referenceLinesTool.js */ "./referenceLines/referenceLinesTool.js");

var _referenceLinesTool2 = _interopRequireDefault(_referenceLinesTool);

var _renderActiveReferenceLine = __webpack_require__(/*! ./renderActiveReferenceLine.js */ "./referenceLines/renderActiveReferenceLine.js");

var _renderActiveReferenceLine2 = _interopRequireDefault(_renderActiveReferenceLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var referenceLines = {
  calculateReferenceLine: _calculateReferenceLine2.default,
  tool: _referenceLinesTool2.default,
  renderActiveReferenceLine: _renderActiveReferenceLine2.default
};

exports.default = referenceLines;

/***/ }),

/***/ "./referenceLines/referenceLinesTool.js":
/*!**********************************************!*\
  !*** ./referenceLines/referenceLinesTool.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _renderActiveReferenceLine = __webpack_require__(/*! ./renderActiveReferenceLine.js */ "./referenceLines/renderActiveReferenceLine.js");

var _renderActiveReferenceLine2 = _interopRequireDefault(_renderActiveReferenceLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'referenceLines';

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  // Get the enabled elements associated with this synchronization context and draw them
  var syncContext = toolData.data[0].synchronizationContext;
  var enabledElements = syncContext.getSourceElements();

  var renderer = toolData.data[0].renderer;

  // Create the canvas context and reset it to the pixel coordinate system
  var context = eventData.canvasContext.canvas.getContext('2d');

  _externalModules2.default.cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);

  // Iterate over each referenced element
  enabledElements.forEach(function (referenceEnabledElement) {

    // Don't draw ourselves
    if (referenceEnabledElement === e.currentTarget) {
      return;
    }

    // Render it
    renderer(context, eventData, e.currentTarget, referenceEnabledElement);
  });
}

// Enables the reference line tool for a given element.  Note that a custom renderer
// Can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
function enable(element, synchronizationContext, renderer) {
  renderer = renderer || _renderActiveReferenceLine2.default;

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext,
    renderer: renderer
  });

  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Disables the reference line tool for the given element
function disable(element) {
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Module/private exports
var tool = {
  enable: enable,
  disable: disable
};

exports.default = tool;

/***/ }),

/***/ "./referenceLines/renderActiveReferenceLine.js":
/*!*****************************************************!*\
  !*** ./referenceLines/renderActiveReferenceLine.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, eventData, targetElement, referenceElement) {
  var cornerstone = _externalModules2.default.cornerstone;
  var targetImage = cornerstone.getEnabledElement(targetElement).image;
  var referenceImage = cornerstone.getEnabledElement(referenceElement).image;

  // Make sure the images are actually loaded for the target and reference
  if (!targetImage || !referenceImage) {
    return;
  }

  var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);
  var referenceImagePlane = cornerstone.metaData.get('imagePlaneModule', referenceImage.imageId);

  // Make sure the target and reference actually have image plane metadata
  if (!targetImagePlane || !referenceImagePlane || !targetImagePlane.rowCosines || !targetImagePlane.columnCosines || !targetImagePlane.imagePositionPatient || !referenceImagePlane.rowCosines || !referenceImagePlane.columnCosines || !referenceImagePlane.imagePositionPatient) {
    return;
  }

  // The image planes must be in the same frame of reference
  if (targetImagePlane.frameOfReferenceUID !== referenceImagePlane.frameOfReferenceUID) {
    return;
  }

  targetImagePlane.rowCosines = (0, _convertToVector2.default)(targetImagePlane.rowCosines);
  targetImagePlane.columnCosines = (0, _convertToVector2.default)(targetImagePlane.columnCosines);
  targetImagePlane.imagePositionPatient = (0, _convertToVector2.default)(targetImagePlane.imagePositionPatient);
  referenceImagePlane.rowCosines = (0, _convertToVector2.default)(referenceImagePlane.rowCosines);
  referenceImagePlane.columnCosines = (0, _convertToVector2.default)(referenceImagePlane.columnCosines);
  referenceImagePlane.imagePositionPatient = (0, _convertToVector2.default)(referenceImagePlane.imagePositionPatient);

  // The image plane normals must be > 30 degrees apart
  var targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
  var referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
  var angleInRadians = targetNormal.angleTo(referenceNormal);

  angleInRadians = Math.abs(angleInRadians);
  if (angleInRadians < 0.5) {
    // 0.5 radians = ~30 degrees
    return;
  }

  var referenceLine = (0, _calculateReferenceLine2.default)(targetImagePlane, referenceImagePlane);

  if (!referenceLine) {
    return;
  }

  var refLineStartCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.start);
  var refLineEndCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.end);

  var color = _toolColors2.default.getActiveColor();
  var lineWidth = _toolStyle2.default.getToolWidth();

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
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _calculateReferenceLine = __webpack_require__(/*! ./calculateReferenceLine.js */ "./referenceLines/calculateReferenceLine.js");

var _calculateReferenceLine2 = _interopRequireDefault(_calculateReferenceLine);

var _toolColors = __webpack_require__(/*! ../stateManagement/toolColors.js */ "./stateManagement/toolColors.js");

var _toolColors2 = _interopRequireDefault(_toolColors);

var _toolStyle = __webpack_require__(/*! ../stateManagement/toolStyle.js */ "./stateManagement/toolStyle.js");

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./requestPool/requestPoolManager.js":
/*!*******************************************!*\
  !*** ./requestPool/requestPoolManager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _getMaxSimultaneousRequests = __webpack_require__(/*! ../util/getMaxSimultaneousRequests.js */ "./util/getMaxSimultaneousRequests.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestPool = {
  interaction: [],
  thumbnail: [],
  prefetch: []
};

var numRequests = {
  interaction: 0,
  thumbnail: 0,
  prefetch: 0
};

var maxNumRequests = {
  interaction: 6,
  thumbnail: 6,
  prefetch: 5
};

var awake = false;
var grabDelay = 20;

function addRequest(element, imageId, type, preventCache, doneCallback, failCallback, addToBeginning) {
  if (!requestPool.hasOwnProperty(type)) {
    throw new Error('Request type must be one of interaction, thumbnail, or prefetch');
  }

  if (!element || !imageId) {
    return;
  }

  // Describe the request
  var requestDetails = {
    type: type,
    imageId: imageId,
    preventCache: preventCache,
    doneCallback: doneCallback,
    failCallback: failCallback
  };

  // If this imageId is in the cache, resolve it immediately
  var imageLoadObject = _externalModules2.default.cornerstone.imageCache.getImageLoadObject(imageId);

  if (imageLoadObject) {
    imageLoadObject.promise.then(function (image) {
      doneCallback(image);
    }, function (error) {
      failCallback(error);
    });

    return;
  }

  if (addToBeginning) {
    // Add it to the beginning of the stack
    requestPool[type].unshift(requestDetails);
  } else {
    // Add it to the end of the stack
    requestPool[type].push(requestDetails);
  }

  // Wake up
  awake = true;
}

function clearRequestStack(type) {
  // Console.log('clearRequestStack');
  if (!requestPool.hasOwnProperty(type)) {
    throw new Error('Request type must be one of interaction, thumbnail, or prefetch');
  }

  requestPool[type] = [];
}

function startAgain() {
  if (!awake) {
    return;
  }

  setTimeout(function () {
    startGrabbing();
  }, grabDelay);
}

function sendRequest(requestDetails) {
  var cornerstone = _externalModules2.default.cornerstone;
  // Increment the number of current requests of this type
  var type = requestDetails.type;

  numRequests[type]++;

  awake = true;
  var imageId = requestDetails.imageId;
  var doneCallback = requestDetails.doneCallback;
  var failCallback = requestDetails.failCallback;

  // Check if we already have this image promise in the cache
  var imageLoadObject = cornerstone.imageCache.getImageLoadObject(imageId);

  if (imageLoadObject) {
    // If we do, remove from list (when resolved, as we could have
    // Pending prefetch requests) and stop processing this iteration
    imageLoadObject.promise.then(function (image) {
      numRequests[type]--;
      // Console.log(numRequests);

      doneCallback(image);
      startAgain();
    }, function (error) {
      numRequests[type]--;
      // Console.log(numRequests);
      failCallback(error);
      startAgain();
    });

    return;
  }

  function requestTypeToLoadPriority(requestDetails) {
    if (requestDetails.type === 'prefetch') {
      return -5;
    } else if (requestDetails.type === 'interactive') {
      return 0;
    } else if (requestDetails.type === 'thumbnail') {
      return 5;
    }
  }

  var priority = requestTypeToLoadPriority(requestDetails);

  var loader = void 0;

  if (requestDetails.preventCache === true) {
    loader = cornerstone.loadImage(imageId, {
      priority: priority,
      type: requestDetails.type
    });
  } else {
    loader = cornerstone.loadAndCacheImage(imageId, {
      priority: priority,
      type: requestDetails.type
    });
  }

  // Load and cache the image
  loader.then(function (image) {
    numRequests[type]--;
    // Console.log(numRequests);
    doneCallback(image);
    startAgain();
  }, function (error) {
    numRequests[type]--;
    // Console.log(numRequests);
    failCallback(error);
    startAgain();
  });
}

function startGrabbing() {
  // Begin by grabbing X images
  var maxSimultaneousRequests = (0, _getMaxSimultaneousRequests.getMaxSimultaneousRequests)();

  maxNumRequests = {
    interaction: Math.max(maxSimultaneousRequests, 1),
    thumbnail: Math.max(maxSimultaneousRequests - 2, 1),
    prefetch: Math.max(maxSimultaneousRequests - 1, 1)
  };

  var currentRequests = numRequests.interaction + numRequests.thumbnail + numRequests.prefetch;
  var requestsToSend = maxSimultaneousRequests - currentRequests;

  for (var i = 0; i < requestsToSend; i++) {
    var requestDetails = getNextRequest();

    if (requestDetails) {
      sendRequest(requestDetails);
    }
  }
}

function getNextRequest() {
  if (requestPool.interaction.length && numRequests.interaction < maxNumRequests.interaction) {
    return requestPool.interaction.shift();
  }

  if (requestPool.thumbnail.length && numRequests.thumbnail < maxNumRequests.thumbnail) {
    return requestPool.thumbnail.shift();
  }

  if (requestPool.prefetch.length && numRequests.prefetch < maxNumRequests.prefetch) {
    return requestPool.prefetch.shift();
  }

  if (!requestPool.interaction.length && !requestPool.thumbnail.length && !requestPool.prefetch.length) {
    awake = false;
  }

  return false;
}

function getRequestPool() {
  return requestPool;
}

exports.default = {
  addRequest: addRequest,
  clearRequestStack: clearRequestStack,
  startGrabbing: startGrabbing,
  getRequestPool: getRequestPool
};

/***/ }),

/***/ "./stackTools/fusionRenderer.js":
/*!**************************************!*\
  !*** ./stackTools/fusionRenderer.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FusionRenderer = function () {
  function FusionRenderer() {
    _classCallCheck(this, FusionRenderer);

    this.currentImageIdIndex = 0;
    this.layerIds = [];
    this.findImageFn = undefined;
  }

  _createClass(FusionRenderer, [{
    key: 'render',
    value: function render(element, imageStacks) {
      var _this = this;

      // Move this to base Renderer class
      if (!Number.isInteger(this.currentImageIdIndex)) {
        throw new Error('FusionRenderer: render - Image ID Index is not an integer');
      }

      if (!this.findImageFn) {
        throw new Error('No findImage function has been defined');
      }

      if (!imageStacks) {
        var toolData = (0, _toolState.getToolState)(element, 'stack');

        imageStacks = toolData.data;
      }
      // TODO: Figure out what to do with LoadHandlers in this scenario...

      var cornerstone = _externalModules2.default.cornerstone;

      // For the base layer, go to the currentImageIdIndex
      var baseImageObject = imageStacks[0];
      var currentImageId = baseImageObject.imageIds[this.currentImageIdIndex];
      var overlayImageStacks = imageStacks.slice(1, imageStacks.length);

      cornerstone.loadAndCacheImage(currentImageId).then(function (baseImage) {
        var baseLayerId = _this.layerIds[0];

        // Get the base layer if one exists
        if (baseLayerId) {
          cornerstone.setLayerImage(element, baseImage, baseLayerId);
        } else {
          // Otherwise, create a new layer with the base layer's image
          baseLayerId = cornerstone.addLayer(element, baseImage, baseImageObject.options);
          _this.layerIds.push(baseLayerId);
        }

        // Display the image immediately while the overlay images are identified
        cornerstone.displayImage(element, baseImage);

        // Loop through the remaining 'overlay' image stacks
        overlayImageStacks.forEach(function (imgObj, overlayLayerIndex) {
          var imageId = _this.findImageFn(imgObj.imageIds, currentImageId);
          var layerIndex = overlayLayerIndex + 1;
          var currentLayerId = _this.layerIds[layerIndex];

          // If no layer exists yet for this overlaid stack, create
          // One and add it to the layerIds property for this instance
          // Of the fusion renderer.
          if (!currentLayerId) {
            currentLayerId = cornerstone.addLayer(element, undefined, imgObj.options);
            _this.layerIds.push(currentLayerId);
          }

          if (imageId) {
            // If an imageId was returned from the findImage function,
            // Load it, make sure it's visible and update the layer
            // With the new image object.
            cornerstone.loadAndCacheImage(imageId).then(function (image) {
              cornerstone.setLayerImage(element, image, currentLayerId);
              cornerstone.updateImage(element);
            });
          } else {
            // If no imageId was returned from the findImage function.
            // This means that there is no relevant image to display.
            cornerstone.setLayerImage(element, undefined, currentLayerId);
            cornerstone.setActiveLayer(element, baseLayerId);
            cornerstone.updateImage(element);
          }
        });
      });
    }
  }]);

  return FusionRenderer;
}();

exports.default = FusionRenderer;

/***/ }),

/***/ "./stackTools/playClip.js":
/*!********************************!*\
  !*** ./stackTools/playClip.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopClip = exports.playClip = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'playClip';

/**
 * [private] Turns a Frame Time Vector (0018,1065) array into a normalized array of timeouts. Each element
 * ... of the resulting array represents the amount of time each frame will remain on the screen.
 * @param {Array} vector A Frame Time Vector (0018,1065) as specified in section C.7.6.5.1.2 of DICOM standard.
 * @param {Number} speed A speed factor which will be applied to each element of the resulting array.
 * @return {Array} An array with timeouts for each animation frame.
 */
/* eslint no-bitwise:0 */
function getPlayClipTimeouts(vector, speed) {

  var i = void 0;
  var sample = void 0;
  var delay = void 0;
  var sum = 0;
  var limit = vector.length;
  var timeouts = [];

  // Initialize time varying to false
  timeouts.isTimeVarying = false;

  if (typeof speed !== 'number' || speed <= 0) {
    speed = 1;
  }

  // First element of a frame time vector must be discarded
  for (i = 1; i < limit; i++) {
    delay = Number(vector[i]) / speed | 0; // Integral part only
    timeouts.push(delay);
    if (i === 1) {
      // Use first item as a sample for comparison
      sample = delay;
    } else if (delay !== sample) {
      timeouts.isTimeVarying = true;
    }

    sum += delay;
  }

  if (timeouts.length > 0) {
    if (timeouts.isTimeVarying) {
      // If it's a time varying vector, make the last item an average...
      delay = sum / timeouts.length | 0;
    } else {
      delay = timeouts[0];
    }

    timeouts.push(delay);
  }

  return timeouts;
}

/**
 * [private] Performs the heavy lifting of stopping an ongoing animation.
 * @param {Object} playClipData The data from playClip that needs to be stopped.
 * @return void
 */
function stopClipWithData(playClipData) {
  var id = playClipData.intervalId;

  if (typeof id !== 'undefined') {
    playClipData.intervalId = undefined;
    if (playClipData.usingFrameTimeVector) {
      clearTimeout(id);
    } else {
      clearInterval(id);
    }
  }
}

/**
 * [private] Trigger playClip tool stop event.
 * @param element
 * @return void
 */
function triggerStopEvent(element) {
  var eventDetail = {
    element: element
  };

  (0, _triggerEvent2.default)(element, _events2.default.CLIP_STOPPED, eventDetail);
}

/**
 * Starts playing a clip or adjusts the frame rate of an already playing clip.  framesPerSecond is
 * optional and defaults to 30 if not specified.  A negative framesPerSecond will play the clip in reverse.
 * The element must be a stack of images
 * @param element
 * @param framesPerSecond
 */
function playClip(element, framesPerSecond) {
  var playClipData = void 0;
  var playClipTimeouts = void 0;

  if (element === undefined) {
    throw new Error('playClip: element must not be undefined');
  }

  var stackToolData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackToolData || !stackToolData.data || !stackToolData.data.length) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // If we have more than one stack, check if we have a stack renderer defined
  var stackRenderer = void 0;

  if (stackToolData.data.length > 1) {
    var stackRendererData = (0, _toolState.getToolState)(element, 'stackRenderer');

    if (stackRendererData && stackRendererData.data && stackRendererData.data.length) {
      stackRenderer = stackRendererData.data[0];
    }
  }

  var stackData = stackToolData.data[0];

  var playClipToolData = (0, _toolState.getToolState)(element, toolType);

  if (!playClipToolData || !playClipToolData.data || !playClipToolData.data.length) {
    playClipData = {
      intervalId: undefined,
      framesPerSecond: 30,
      lastFrameTimeStamp: undefined,
      frameRate: 0,
      frameTimeVector: undefined,
      ignoreFrameTimeVector: false,
      usingFrameTimeVector: false,
      speed: 1,
      reverse: false,
      loop: true
    };
    (0, _toolState.addToolState)(element, toolType, playClipData);
  } else {
    playClipData = playClipToolData.data[0];
    // Make sure the specified clip is not running before any property update
    stopClipWithData(playClipData);
  }

  // If a framesPerSecond is specified and is valid, update the playClipData now
  if (framesPerSecond < 0 || framesPerSecond > 0) {
    playClipData.framesPerSecond = Number(framesPerSecond);
    playClipData.reverse = playClipData.framesPerSecond < 0;
    // If framesPerSecond is given, frameTimeVector will be ignored...
    playClipData.ignoreFrameTimeVector = true;
  }

  // Determine if frame time vector should be used instead of a fixed frame rate...
  if (playClipData.ignoreFrameTimeVector !== true && playClipData.frameTimeVector && playClipData.frameTimeVector.length === stackData.imageIds.length) {
    playClipTimeouts = getPlayClipTimeouts(playClipData.frameTimeVector, playClipData.speed);
  }

  // This function encapsulates the frame rendering logic...
  var playClipAction = function playClipAction() {

    // Hoisting of context variables
    var loader = void 0,
        startLoadingHandler = void 0,
        endLoadingHandler = void 0,
        errorLoadingHandler = void 0,
        newImageIdIndex = stackData.currentImageIdIndex;

    var imageCount = stackData.imageIds.length;

    if (playClipData.reverse) {
      newImageIdIndex--;
    } else {
      newImageIdIndex++;
    }

    if (!playClipData.loop && (newImageIdIndex < 0 || newImageIdIndex >= imageCount)) {
      stopClipWithData(playClipData);
      triggerStopEvent(element);

      return;
    }

    // Loop around if we go outside the stack
    if (newImageIdIndex >= imageCount) {
      newImageIdIndex = 0;
    }

    if (newImageIdIndex < 0) {
      newImageIdIndex = imageCount - 1;
    }

    if (newImageIdIndex !== stackData.currentImageIdIndex) {

      startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
      endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
      errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

      if (startLoadingHandler) {
        startLoadingHandler(element);
      }

      if (stackData.preventCache === true) {
        loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
      } else {
        loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
      }

      loader.then(function (image) {
        try {
          stackData.currentImageIdIndex = newImageIdIndex;
          if (stackRenderer) {
            stackRenderer.currentImageIdIndex = newImageIdIndex;
            stackRenderer.render(element, stackToolData.data);
          } else {
            cornerstone.displayImage(element, image);
          }
          if (endLoadingHandler) {
            endLoadingHandler(element, image);
          }
        } catch (error) {
          return;
        }
      }, function (error) {
        var imageId = stackData.imageIds[newImageIdIndex];

        if (errorLoadingHandler) {
          errorLoadingHandler(element, imageId, error);
        }
      });
    }
  };

  // If playClipTimeouts array is available, not empty and its elements are NOT uniform ...
  // ... (at least one timeout is different from the others), use alternate setTimeout implementation
  if (playClipTimeouts && playClipTimeouts.length > 0 && playClipTimeouts.isTimeVarying) {
    playClipData.usingFrameTimeVector = true;
    playClipData.intervalId = setTimeout(function playClipTimeoutHandler() {
      playClipData.intervalId = setTimeout(playClipTimeoutHandler, playClipTimeouts[stackData.currentImageIdIndex]);
      playClipAction();
    }, 0);
  } else {
    // ... otherwise user setInterval implementation which is much more efficient.
    playClipData.usingFrameTimeVector = false;
    playClipData.intervalId = setInterval(playClipAction, 1000 / Math.abs(playClipData.framesPerSecond));
  }
}

/**
 * Stops an already playing clip.
 * * @param element
 */
function stopClip(element) {

  var playClipToolData = (0, _toolState.getToolState)(element, toolType);

  if (!playClipToolData || !playClipToolData.data || !playClipToolData.data.length) {
    return;
  }

  stopClipWithData(playClipToolData.data[0]);
}

exports.playClip = playClip;
exports.stopClip = stopClip;

/***/ }),

/***/ "./stackTools/scrollIndicator.js":
/*!***************************************!*\
  !*** ./stackTools/scrollIndicator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _displayTool = __webpack_require__(/*! ../imageTools/displayTool.js */ "./imageTools/displayTool.js");

var _displayTool2 = _interopRequireDefault(_displayTool);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Display scroll progress bar across bottom of image.
 */
var scrollBarHeight = 6;

var configuration = {
  backgroundColor: 'rgb(19, 63, 141)',
  fillColor: 'white',
  orientation: 'horizontal'
};

function onImageRendered(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var width = eventData.enabledElement.canvas.width;
  var height = eventData.enabledElement.canvas.height;

  if (!width || !height) {
    return false;
  }

  var context = eventData.enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.save();

  var config = scrollIndicator.getConfiguration();

  // Draw indicator background
  context.fillStyle = config.backgroundColor;
  if (config.orientation === 'horizontal') {
    context.fillRect(0, height - scrollBarHeight, width, scrollBarHeight);
  } else {
    context.fillRect(0, 0, scrollBarHeight, height);
  }

  // Get current image index
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var imageIds = stackData.data[0].imageIds;
  var currentImageIdIndex = stackData.data[0].currentImageIdIndex;

  // Draw current image cursor
  var cursorWidth = width / imageIds.length;
  var cursorHeight = height / imageIds.length;
  var xPosition = cursorWidth * currentImageIdIndex;
  var yPosition = cursorHeight * currentImageIdIndex;

  context.fillStyle = config.fillColor;
  if (config.orientation === 'horizontal') {
    context.fillRect(xPosition, height - scrollBarHeight, cursorWidth, scrollBarHeight);
  } else {
    context.fillRect(0, yPosition, scrollBarHeight, cursorHeight);
  }

  context.restore();
}

var scrollIndicator = (0, _displayTool2.default)(onImageRendered);

scrollIndicator.setConfiguration(configuration);

exports.default = scrollIndicator;

/***/ }),

/***/ "./stackTools/stackPrefetch.js":
/*!*************************************!*\
  !*** ./stackTools/stackPrefetch.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _requestPoolManager = __webpack_require__(/*! ../requestPool/requestPoolManager.js */ "./requestPool/requestPoolManager.js");

var _requestPoolManager2 = _interopRequireDefault(_requestPoolManager);

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _getMaxSimultaneousRequests = __webpack_require__(/*! ../util/getMaxSimultaneousRequests.js */ "./util/getMaxSimultaneousRequests.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'stackPrefetch';
var requestType = 'prefetch';

var configuration = {
  maxImagesToPrefetch: Infinity
};

var resetPrefetchTimeout = void 0;
var resetPrefetchDelay = 10;

function range(lowEnd, highEnd) {
  // Javascript version of Python's range function
  // http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
  lowEnd = Math.round(lowEnd) || 0;
  highEnd = Math.round(highEnd) || 0;

  var arr = [];
  var c = highEnd - lowEnd + 1;

  if (c <= 0) {
    return arr;
  }

  while (c--) {
    arr[c] = highEnd--;
  }

  return arr;
}

var max = function max(arr) {
  return Math.max.apply(null, arr);
};

var min = function min(arr) {
  return Math.min.apply(null, arr);
};

function nearestIndex(arr, x) {
  // Return index of nearest values in array
  // http://stackoverflow.com/questions/25854212/return-index-of-nearest-values-in-an-array
  var l = [];
  var h = [];

  arr.forEach(function (v) {
    if (v < x) {
      l.push(v);
    } else if (v > x) {
      h.push(v);
    }
  });

  return {
    low: arr.indexOf(max(l)),
    high: arr.indexOf(min(h))
  };
}

function prefetch(element) {
  // Check to make sure stack data exists
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var stack = stackData.data[0];

  // Get the stackPrefetch tool data
  var stackPrefetchData = (0, _toolState.getToolState)(element, toolType);

  if (!stackPrefetchData) {
    return;
  }

  var stackPrefetch = stackPrefetchData.data[0] || {};

  // If all the requests are complete, disable the stackPrefetch tool
  if (!stackPrefetch.indicesToRequest || !stackPrefetch.indicesToRequest.length) {
    stackPrefetch.enabled = false;
  }

  // Make sure the tool is still enabled
  if (stackPrefetch.enabled === false) {
    return;
  }

  // Remove an imageIdIndex from the list of indices to request
  // This fires when the individual image loading deferred is resolved
  function removeFromList(imageIdIndex) {
    var index = stackPrefetch.indicesToRequest.indexOf(imageIdIndex);

    if (index > -1) {
      // Don't remove last element if imageIdIndex not found
      stackPrefetch.indicesToRequest.splice(index, 1);
    }
  }

  // Remove all already cached images from the
  // IndicesToRequest array
  stackPrefetchData.data[0].indicesToRequest.sort(function (a, b) {
    return a - b;
  });
  var indicesToRequestCopy = stackPrefetch.indicesToRequest.slice();

  indicesToRequestCopy.forEach(function (imageIdIndex) {
    var imageId = stack.imageIds[imageIdIndex];

    if (!imageId) {
      return;
    }

    var imageLoadObject = _externalModules2.default.cornerstone.imageCache.getImageLoadObject(imageId);

    if (imageLoadObject) {
      removeFromList(imageIdIndex);
    }
  });

  // Stop here if there are no images left to request
  // After those in the cache have been removed
  if (!stackPrefetch.indicesToRequest.length) {
    return;
  }

  // Clear the requestPool of prefetch requests
  _requestPoolManager2.default.clearRequestStack(requestType);

  // Identify the nearest imageIdIndex to the currentImageIdIndex
  var nearest = nearestIndex(stackPrefetch.indicesToRequest, stack.currentImageIdIndex);

  var imageId = void 0;
  var nextImageIdIndex = void 0;
  var preventCache = false;

  function doneCallback(image) {
    // Console.log('prefetch done: ' + image.imageId);
    var imageIdIndex = stack.imageIds.indexOf(image.imageId);

    removeFromList(imageIdIndex);
  }

  // Retrieve the errorLoadingHandler if one exists
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  function failCallback(error) {
    console.log('prefetch errored: ' + error);
    if (errorLoadingHandler) {
      errorLoadingHandler(element, imageId, error, 'stackPrefetch');
    }
  }

  // Prefetch images around the current image (before and after)
  var lowerIndex = nearest.low;
  var higherIndex = nearest.high;

  while (lowerIndex >= 0 || higherIndex < stackPrefetch.indicesToRequest.length) {
    var currentIndex = stack.currentImageIdIndex;
    var shouldSkipLower = currentIndex - stackPrefetch.indicesToRequest[lowerIndex] > configuration.maxImagesToPrefetch;
    var shouldSkipHigher = stackPrefetch.indicesToRequest[higherIndex] - currentIndex > configuration.maxImagesToPrefetch;

    var shouldLoadLower = !shouldSkipLower && lowerIndex >= 0;
    var shouldLoadHigher = !shouldSkipHigher && higherIndex < stackPrefetch.indicesToRequest.length;

    if (!shouldLoadHigher && !shouldLoadLower) {
      break;
    }

    if (shouldLoadLower) {
      nextImageIdIndex = stackPrefetch.indicesToRequest[lowerIndex--];
      imageId = stack.imageIds[nextImageIdIndex];
      _requestPoolManager2.default.addRequest(element, imageId, requestType, preventCache, doneCallback, failCallback);
    }

    if (shouldLoadHigher) {
      nextImageIdIndex = stackPrefetch.indicesToRequest[higherIndex++];
      imageId = stack.imageIds[nextImageIdIndex];
      _requestPoolManager2.default.addRequest(element, imageId, requestType, preventCache, doneCallback, failCallback);
    }
  }

  // Try to start the requestPool's grabbing procedure
  // In case it isn't already running
  _requestPoolManager2.default.startGrabbing();
}

function getPromiseRemovedHandler(element) {
  return function (e) {
    var eventData = e.detail;

    // When an imagePromise has been pushed out of the cache, re-add its index
    // It to the indicesToRequest list so that it will be retrieved later if the
    // CurrentImageIdIndex is changed to an image nearby
    var stackData = void 0;

    try {
      // It will throw an exception in some cases (eg: thumbnails)
      stackData = (0, _toolState.getToolState)(element, 'stack');
    } catch (error) {
      return;
    }

    if (!stackData || !stackData.data || !stackData.data.length) {
      return;
    }

    var stack = stackData.data[0];
    var imageIdIndex = stack.imageIds.indexOf(eventData.imageId);

    // Make sure the image that was removed is actually in this stack
    // Before adding it to the indicesToRequest array
    if (imageIdIndex < 0) {
      return;
    }

    var stackPrefetchData = (0, _toolState.getToolState)(element, toolType);

    if (!stackPrefetchData || !stackPrefetchData.data || !stackPrefetchData.data.length) {
      return;
    }

    stackPrefetchData.data[0].indicesToRequest.push(imageIdIndex);
  };
}

function onImageUpdated(e) {
  // Start prefetching again (after a delay)
  // When the user has scrolled to a new image
  clearTimeout(resetPrefetchTimeout);
  resetPrefetchTimeout = setTimeout(function () {
    var element = e.target;

    // If playClip is enabled and the user loads a different series in the viewport
    // An exception will be thrown because the element will not be enabled anymore
    try {
      prefetch(element);
    } catch (error) {
      return;
    }
  }, resetPrefetchDelay);
}

function enable(element) {
  // Clear old prefetch data. Skipping this can cause problems when changing the series inside an element
  var stackPrefetchDataArray = (0, _toolState.getToolState)(element, toolType);

  stackPrefetchDataArray.data = [];

  // First check that there is stack data available
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var stack = stackData.data[0];

  // Check if we are allowed to cache images in this stack
  if (stack.preventCache === true) {
    console.warn('A stack that should not be cached was given the stackPrefetch');

    return;
  }

  // Use the currentImageIdIndex from the stack as the initalImageIdIndex
  var stackPrefetchData = {
    indicesToRequest: range(0, stack.imageIds.length - 1),
    enabled: true,
    direction: 1
  };

  // Remove the currentImageIdIndex from the list to request
  var indexOfCurrentImage = stackPrefetchData.indicesToRequest.indexOf(stack.currentImageIdIndex);

  stackPrefetchData.indicesToRequest.splice(indexOfCurrentImage, 1);

  (0, _toolState.addToolState)(element, toolType, stackPrefetchData);

  prefetch(element);

  element.removeEventListener(_events2.default.NEW_IMAGE, onImageUpdated);
  element.addEventListener(_events2.default.NEW_IMAGE, onImageUpdated);

  var promiseRemovedHandler = getPromiseRemovedHandler(element);

  _externalModules2.default.cornerstone.events.removeEventListener(_events2.default.IMAGE_CACHE_PROMISE_REMOVED, promiseRemovedHandler);
  _externalModules2.default.cornerstone.events.addEventListener(_events2.default.IMAGE_CACHE_PROMISE_REMOVED, promiseRemovedHandler);
}

function disable(element) {
  clearTimeout(resetPrefetchTimeout);
  element.removeEventListener(_events2.default.NEW_IMAGE, onImageUpdated);

  var promiseRemovedHandler = getPromiseRemovedHandler(element);

  _externalModules2.default.cornerstone.events.removeEventListener(_events2.default.IMAGE_CACHE_PROMISE_REMOVED, promiseRemovedHandler);

  var stackPrefetchData = (0, _toolState.getToolState)(element, toolType);
  // If there is actually something to disable, disable it

  if (stackPrefetchData && stackPrefetchData.data.length) {
    stackPrefetchData.data[0].enabled = false;

    // Clear current prefetch requests from the requestPool
    _requestPoolManager2.default.clearRequestStack(requestType);
  }
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;

  if (config.maxSimultaneousRequests) {
    (0, _getMaxSimultaneousRequests.setMaxSimultaneousRequests)(config.maxSimultaneousRequests);
  }
}

// Module/private exports
var stackPrefetch = {
  enable: enable,
  disable: disable,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

exports.default = stackPrefetch;

/***/ }),

/***/ "./stackTools/stackRenderers.js":
/*!**************************************!*\
  !*** ./stackTools/stackRenderers.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fusionRenderer = __webpack_require__(/*! ./fusionRenderer.js */ "./stackTools/fusionRenderer.js");

var _fusionRenderer2 = _interopRequireDefault(_fusionRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stackRenderers = {};

stackRenderers.FusionRenderer = _fusionRenderer2.default;

exports.default = stackRenderers;

/***/ }),

/***/ "./stackTools/stackScroll.js":
/*!***********************************!*\
  !*** ./stackTools/stackScroll.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stackScrollMultiTouch = exports.stackScrollTouchDrag = exports.stackScrollWheel = exports.stackScroll = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _touchDragTool = __webpack_require__(/*! ../imageTools/touchDragTool.js */ "./imageTools/touchDragTool.js");

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _multiTouchDragTool = __webpack_require__(/*! ../imageTools/multiTouchDragTool.js */ "./imageTools/multiTouchDragTool.js");

var _multiTouchDragTool2 = _interopRequireDefault(_multiTouchDragTool);

var _simpleMouseButtonTool = __webpack_require__(/*! ../imageTools/simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _mouseWheelTool = __webpack_require__(/*! ../imageTools/mouseWheelTool.js */ "./imageTools/mouseWheelTool.js");

var _mouseWheelTool2 = _interopRequireDefault(_mouseWheelTool);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _scroll = __webpack_require__(/*! ../util/scroll.js */ "./util/scroll.js");

var _scroll2 = _interopRequireDefault(_scroll);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'stackScroll';
var toolTypeTouchDrag = 'stackScrollTouchDrag';

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, dragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    options.deltaY = 0;

    (0, _toolOptions.setToolOptions)(toolType, element, options);

    element.addEventListener(_events2.default.MOUSE_DRAG, dragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
    e.stopImmediatePropagation();

    return false;
  }
}

function mouseWheelCallback(e) {
  var eventData = e.detail;
  var images = -eventData.direction;

  var config = stackScroll.getConfiguration();

  var loop = false;
  var allowSkipping = true;

  if (config) {
    loop = config.loop === undefined ? false : config.loop;
    allowSkipping = config.allowSkipping === undefined ? true : config.allowSkipping;
  }

  (0, _scroll2.default)(eventData.element, images, loop, allowSkipping);
}

function dragCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  var toolData = (0, _toolState.getToolState)(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var stackData = toolData.data[0];

  var config = stackScroll.getConfiguration();

  var allowSkipping = true;

  if (config && config.allowSkipping !== undefined) {
    allowSkipping = config.allowSkipping;
  }

  // The Math.max here makes it easier to mouseDrag-scroll small or really large image stacks
  var pixelsPerImage = Math.max(2, element.offsetHeight / Math.max(stackData.imageIds.length, 8));

  if (config && config.stackScrollSpeed) {
    pixelsPerImage = config.stackScrollSpeed;
  }

  var options = (0, _toolOptions.getToolOptions)(toolType, element);
  var deltaY = options.deltaY || 0;

  deltaY += eventData.deltaPoints.page.y;

  if (Math.abs(deltaY) >= pixelsPerImage) {
    var imageIdIndexOffset = Math.round(deltaY / pixelsPerImage);

    (0, _scroll2.default)(element, imageIdIndexOffset, false, allowSkipping);

    options.deltaY = deltaY % pixelsPerImage;
  } else {
    options.deltaY = deltaY;
  }

  (0, _toolOptions.setToolOptions)(toolType, element, options);

  e.preventDefault();
  e.stopPropagation();
}

// Module/private exports
var stackScroll = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);
var stackScrollWheel = (0, _mouseWheelTool2.default)(mouseWheelCallback);

var options = {
  eventData: {
    deltaY: 0
  }
};
var stackScrollTouchDrag = (0, _touchDragTool2.default)(dragCallback, toolTypeTouchDrag, options);

function multiTouchDragCallback(e) {
  var eventData = e.detail;
  var config = stackScrollMultiTouch.getConfiguration();

  if (config && config.testPointers(eventData)) {
    dragCallback(e);
  }
}

var configuration = {
  testPointers: function testPointers(eventData) {
    return eventData.numPointers >= 3;
  }
};

var stackScrollMultiTouch = (0, _multiTouchDragTool2.default)(multiTouchDragCallback, options);

stackScrollMultiTouch.setConfiguration(configuration);

exports.stackScroll = stackScroll;
exports.stackScrollWheel = stackScrollWheel;
exports.stackScrollTouchDrag = stackScrollTouchDrag;
exports.stackScrollMultiTouch = stackScrollMultiTouch;

/***/ }),

/***/ "./stackTools/stackScrollKeyboard.js":
/*!*******************************************!*\
  !*** ./stackTools/stackScrollKeyboard.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scroll = __webpack_require__(/*! ../util/scroll.js */ "./util/scroll.js");

var _scroll2 = _interopRequireDefault(_scroll);

var _keyboardTool = __webpack_require__(/*! ../imageTools/keyboardTool.js */ "./imageTools/keyboardTool.js");

var _keyboardTool2 = _interopRequireDefault(_keyboardTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = {
  UP: 38,
  DOWN: 40
};

function keyDownCallback(e) {
  var eventData = e.detail;
  var keyCode = eventData.keyCode;

  if (keyCode !== keys.UP && keyCode !== keys.DOWN) {
    return;
  }

  var images = 1;

  if (keyCode === keys.DOWN) {
    images = -1;
  }

  (0, _scroll2.default)(eventData.element, images);
}

// Module/private exports
var stackScrollKeyboard = (0, _keyboardTool2.default)(keyDownCallback);

exports.default = stackScrollKeyboard;

/***/ }),

/***/ "./stateManagement/appState.js":
/*!*************************************!*\
  !*** ./stateManagement/appState.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _imageIdSpecificStateManager = __webpack_require__(/*! ./imageIdSpecificStateManager.js */ "./stateManagement/imageIdSpecificStateManager.js");

var _toolState = __webpack_require__(/*! ./toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveApplicationState(elements) {
  // Save imageId-specific tool state data
  var appState = {
    imageIdToolState: _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager.saveToolState(),
    elementToolState: {},
    elementViewport: {}
  };

  // For each of the given elements, save the viewport and any stack-specific tool data
  elements.forEach(function (element) {
    var toolStateManager = (0, _toolState.getElementToolStateManager)(element);

    if (toolStateManager === _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager) {
      return;
    }

    appState.elementToolState[element.id] = toolStateManager.saveToolState();

    appState.elementViewport[element.id] = _externalModules2.default.cornerstone.getViewport(element);
    console.log()
  });

  return appState;
}

//原来的
function restoreApplicationState_no(appState) {
	if (!appState.hasOwnProperty('imageIdToolState') || !appState.hasOwnProperty('elementToolState') || !appState.hasOwnProperty('elementViewport')) {
	    return;
	}
	var cornerstone = _externalModules2.default.cornerstone;
	//imageIdToolState
	_imageIdSpecificStateManager.globalImageIdSpecificToolStateManager.restoreToolState(appState.imageIdToolState);
	//elementToolState  //elementViewport
	Object.keys(appState.elementViewport).forEach(function (elementId) {
	    var element = document.getElementById(elementId);
	    if (!element) {
	      return;
	    }
	    if (!appState.elementToolState.hasOwnProperty(elementId)) {
	      return;
	    }
	    var toolStateManager = (0, _toolState.getElementToolStateManager)(element);
	    if (toolStateManager === _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager) {
	      return;
	    }
	    toolStateManager.restoreToolState(appState.elementToolState[elementId]);
	    var savedViewport = appState.elementViewport[elementId];
	    cornerstone.setViewport(element, savedViewport);
	    cornerstone.updateImage(element);
	});
	return appState;
}
//后写的
function restoreApplicationState(appState) {
  if (!appState.hasOwnProperty('imageIdToolState')) {
    return;
  }
  var cornerstone = _externalModules2.default.cornerstone;
  _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager.restoreToolState(appState.imageIdToolState);
  return appState;
}

var appState = {
  save: saveApplicationState,
  restore: restoreApplicationState
};

exports.default = appState;

/***/ }),

/***/ "./stateManagement/frameOfReferenceStateManager.js":
/*!*********************************************************!*\
  !*** ./stateManagement/frameOfReferenceStateManager.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// This implements a frame-of-reference specific tool state management strategy.  This means that
// Measurement data are tied to a specific frame of reference UID and only visible to objects using
// That frame-of-reference UID

function newFrameOfReferenceSpecificToolStateManager() {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addFrameOfReferenceSpecificToolState(frameOfReference, toolType, data) {
    // If we don't have any tool state for this frameOfReference, add an empty object
    if (toolState.hasOwnProperty(frameOfReference) === false) {
      toolState[frameOfReference] = {};
    }

    var frameOfReferenceToolState = toolState[frameOfReference];

    // If we don't have tool state for this type of tool, add an empty object
    if (frameOfReferenceToolState.hasOwnProperty(toolType) === false) {
      frameOfReferenceToolState[toolType] = {
        data: []
      };
    }

    var toolData = frameOfReferenceToolState[toolType];

    // Finally, add this new tool to the state
    toolData.data.push(data);
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getFrameOfReferenceSpecificToolState(frameOfReference, toolType) {
    // If we don't have any tool state for this frame of reference, return undefined
    if (toolState.hasOwnProperty(frameOfReference) === false) {
      return;
    }

    var frameOfReferenceToolState = toolState[frameOfReference];

    // If we don't have tool state for this type of tool, return undefined
    if (frameOfReferenceToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = frameOfReferenceToolState[toolType];

    return toolData;
  }

  function removeFrameOfReferenceSpecificToolState(frameOfReference, toolType, data) {
    // If we don't have any tool state for this frame of reference, return undefined
    if (toolState.hasOwnProperty(frameOfReference) === false) {
      return;
    }

    var frameOfReferenceToolState = toolState[frameOfReference];

    // If we don't have tool state for this type of tool, return undefined
    if (frameOfReferenceToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = frameOfReferenceToolState[toolType];
    // Find this tool data
    var indexOfData = -1;

    for (var i = 0; i < toolData.data.length; i++) {
      if (toolData.data[i] === data) {
        indexOfData = i;
      }
    }

    if (indexOfData !== -1) {
      toolData.data.splice(indexOfData, 1);
    }
  }

  return {
    get: getFrameOfReferenceSpecificToolState,
    add: addFrameOfReferenceSpecificToolState,
    remove: removeFrameOfReferenceSpecificToolState
  };
}

// A global frameOfReferenceSpecificToolStateManager - the most common case is to share 3d information
// Between stacks of images
var globalFrameOfReferenceSpecificToolStateManager = newFrameOfReferenceSpecificToolStateManager();

exports.newFrameOfReferenceSpecificToolStateManager = newFrameOfReferenceSpecificToolStateManager;
exports.globalFrameOfReferenceSpecificToolStateManager = globalFrameOfReferenceSpecificToolStateManager;

/***/ }),

/***/ "./stateManagement/imageIdSpecificStateManager.js":
/*!********************************************************!*\
  !*** ./stateManagement/imageIdSpecificStateManager.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalImageIdSpecificToolStateManager = exports.newImageIdSpecificToolStateManager = undefined;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This implements an imageId specific tool state management strategy.  This means that
// Measurements data is tied to a specific imageId and only visible for enabled elements
// That are displaying that imageId.

function newImageIdSpecificToolStateManager() {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state

  function saveImageIdToolState(imageId) {
    return toolState[imageId];
  }

  function restoreImageIdToolState(imageId, imageIdToolState) {
    toolState[imageId] = imageIdToolState;
  }

  function saveToolState() {
    return toolState;
  }

  function restoreToolState(savedToolState) {
    toolState = savedToolState;
  }

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addImageIdSpecificToolState(element, toolType, data) {
    var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);
    // If we don't have any tool state for this imageId, add an empty object

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      toolState[enabledImage.image.imageId] = {};
    }
    var imageIdToolState = toolState[enabledImage.image.imageId];
    // If we don't have tool state for this type of tool, add an empty object
    if (imageIdToolState.hasOwnProperty(toolType) === false) {
      imageIdToolState[toolType] = {
        data: []
      };
    }
    var toolData = imageIdToolState[toolType];
    // 获取当前保存标记的时间
    let dateTime = new Date();
    let date_Year = dateTime.getFullYear();
    let date_month = dateTime.getMonth();
    let date_date = dateTime.getDate();
    let date_hour = dateTime.getHours();
    let date_minute = dateTime.getMinutes();
    let date_s = dateTime.getSeconds();
    //let date_ms = dateTime.getMilliseconds();
    data['markTime'] = date_Year+'-'+date_month+'-'+date_date+ ' ' +date_hour+':'+date_minute+':'+date_s;
    // Finally, add this new tool to the state
    toolData.data.push(data);
    if(enabledImage.image.data){   	
    	let numframes = enabledImage.image.data.string('x00280008');
    	if(numframes){
    		let nowFrameID = Number(enabledImage.image.imageId.substr(enabledImage.image.imageId.indexOf('=') + 1));
    		imageIdToolState['frameID'] = nowFrameID;
    	}
    	imageIdToolState['sopInstanceUID'] = enabledImage.image.data.string('x00080018');
    	imageIdToolState['seriesID'] = enabledImage.image.data.string('x00200011');
    }
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getImageIdSpecificToolState(element, toolType) {
    var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);
    // If we don't have any tool state for this imageId, return undefined

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      return;
    }

    var imageIdToolState = toolState[enabledImage.image.imageId];

    // If we don't have tool state for this type of tool, return undefined
    if (imageIdToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = imageIdToolState[toolType];

    return toolData;
  }

  // Clears all tool data from this toolStateManager.
  function clearImageIdSpecificToolStateManager(element) {
    var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      return;
    }

    delete toolState[enabledImage.image.imageId];
  }

  return {
    get: getImageIdSpecificToolState,
    add: addImageIdSpecificToolState,
    clear: clearImageIdSpecificToolStateManager,
    saveImageIdToolState: saveImageIdToolState,
    restoreImageIdToolState: restoreImageIdToolState,
    saveToolState: saveToolState,
    restoreToolState: restoreToolState,
    toolState: toolState
  };
}

// A global imageIdSpecificToolStateManager - the most common case is to share state between all
// Visible enabled images
var globalImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager();

exports.newImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager;
exports.globalImageIdSpecificToolStateManager = globalImageIdSpecificToolStateManager;

/***/ }),

/***/ "./stateManagement/loadHandlerManager.js":
/*!***********************************************!*\
  !*** ./stateManagement/loadHandlerManager.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultStartLoadHandler = void 0;
var defaultEndLoadHandler = void 0;
var defaultErrorLoadingHandler = void 0;

function setStartLoadHandler(handler) {
  defaultStartLoadHandler = handler;
}

function getStartLoadHandler() {
  return defaultStartLoadHandler;
}

function setEndLoadHandler(handler) {
  defaultEndLoadHandler = handler;
}

function getEndLoadHandler() {
  return defaultEndLoadHandler;
}

function setErrorLoadingHandler(handler) {
  defaultErrorLoadingHandler = handler;
}

function getErrorLoadingHandler() {
  return defaultErrorLoadingHandler;
}

var loadHandlerManager = {
  setStartLoadHandler: setStartLoadHandler,
  getStartLoadHandler: getStartLoadHandler,
  setEndLoadHandler: setEndLoadHandler,
  getEndLoadHandler: getEndLoadHandler,
  setErrorLoadingHandler: setErrorLoadingHandler,
  getErrorLoadingHandler: getErrorLoadingHandler
};

exports.default = loadHandlerManager;

/***/ }),

/***/ "./stateManagement/stackSpecificStateManager.js":
/*!******************************************************!*\
  !*** ./stateManagement/stackSpecificStateManager.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStackStateManager = exports.newStackSpecificToolStateManager = exports.stackSpecificStateManager = undefined;

var _imageIdSpecificStateManager = __webpack_require__(/*! ./imageIdSpecificStateManager.js */ "./stateManagement/imageIdSpecificStateManager.js");

var _toolState = __webpack_require__(/*! ./toolState.js */ "./stateManagement/toolState.js");

// This implements an Stack specific tool state management strategy.  This means
// That tool data is shared between all imageIds in a given stack
function newStackSpecificToolStateManager(toolTypes, oldStateManager) {
  var toolState = {};

  function saveToolState() {
    return toolState;
  }

  function restoreToolState(stackToolState) {
    toolState = stackToolState;
  }

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addStackSpecificToolState(element, toolType, data) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {

      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      var toolData = toolState[toolType];

      // Finally, add this new tool to the state
      toolData.data.push(data);
    } else {
      // Call the imageId specific tool state manager
      return oldStateManager.add(element, toolType, data);
    }
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getStackSpecificToolState(element, toolType) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {
      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      return toolState[toolType];
    }

    // Call the imageId specific tool state manager
    return oldStateManager.get(element, toolType);
  }

  var stackSpecificToolStateManager = {
    get: getStackSpecificToolState,
    add: addStackSpecificToolState,
    saveToolState: saveToolState,
    restoreToolState: restoreToolState,
    toolState: toolState
  };

  return stackSpecificToolStateManager;
}

var stackStateManagers = [];

function addStackStateManager(element, otherTools) {
  var oldStateManager = (0, _toolState.getElementToolStateManager)(element);

  if (!oldStateManager) {
    oldStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  var stackTools = ['stack', 'stackPrefetch', 'playClip', 'volume', 'slab', 'referenceLines', 'crosshairs', 'stackRenderer'];

  if (otherTools) {
    stackTools = stackTools.concat(otherTools);
  }

  var stackSpecificStateManager = newStackSpecificToolStateManager(stackTools, oldStateManager);

  stackStateManagers.push(stackSpecificStateManager);
  (0, _toolState.setElementToolStateManager)(element, stackSpecificStateManager);
}

var stackSpecificStateManager = {
  newStackSpecificToolStateManager: newStackSpecificToolStateManager,
  addStackStateManager: addStackStateManager
};

exports.stackSpecificStateManager = stackSpecificStateManager;
exports.newStackSpecificToolStateManager = newStackSpecificToolStateManager;
exports.addStackStateManager = addStackStateManager;

/***/ }),

/***/ "./stateManagement/textStyle.js":
/*!**************************************!*\
  !*** ./stateManagement/textStyle.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultFontSize = 15,
    defaultFont = defaultFontSize + 'px Arial',
    defaultBackgroundColor = 'transparent';

function setFont(font) {
  defaultFont = font;
}

function getFont() {
  return defaultFont;
}

function setFontSize(fontSize) {
  defaultFontSize = fontSize;
}

function getFontSize() {
  return defaultFontSize;
}

function setBackgroundColor(backgroundColor) {
  defaultBackgroundColor = backgroundColor;
}

function getBackgroundColor() {
  return defaultBackgroundColor;
}

var textStyle = {
  setFont: setFont,
  getFont: getFont,
  setFontSize: setFontSize,
  getFontSize: getFontSize,
  setBackgroundColor: setBackgroundColor,
  getBackgroundColor: getBackgroundColor
};

exports.default = textStyle;

/***/ }),

/***/ "./stateManagement/timeSeriesSpecificStateManager.js":
/*!***********************************************************!*\
  !*** ./stateManagement/timeSeriesSpecificStateManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newTimeSeriesSpecificToolStateManager = exports.addTimeSeriesStateManager = undefined;

var _imageIdSpecificStateManager = __webpack_require__(/*! ./imageIdSpecificStateManager.js */ "./stateManagement/imageIdSpecificStateManager.js");

var _toolState = __webpack_require__(/*! ./toolState.js */ "./stateManagement/toolState.js");

// This implements an Stack specific tool state management strategy.  This means
// That tool data is shared between all imageIds in a given stack
function newTimeSeriesSpecificToolStateManager(toolTypes, oldStateManager) {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addStackSpecificToolState(element, toolType, data) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {

      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      var toolData = toolState[toolType];

      // Finally, add this new tool to the state
      toolData.data.push(data);
    } else {
      // Call the imageId specific tool state manager
      return oldStateManager.add(element, toolType, data);
    }
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getStackSpecificToolState(element, toolType) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {
      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      return toolState[toolType];
    }

    // Call the imageId specific tool state manager
    return oldStateManager.get(element, toolType);
  }

  var imageIdToolStateManager = {
    get: getStackSpecificToolState,
    add: addStackSpecificToolState
  };

  return imageIdToolStateManager;
}

var timeSeriesStateManagers = [];

function addTimeSeriesStateManager(element, tools) {
  tools = tools || ['timeSeries'];
  var oldStateManager = (0, _toolState.getElementToolStateManager)(element);

  if (oldStateManager === undefined) {
    oldStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  var timeSeriesSpecificStateManager = newTimeSeriesSpecificToolStateManager(tools, oldStateManager);

  timeSeriesStateManagers.push(timeSeriesSpecificStateManager);
  (0, _toolState.setElementToolStateManager)(element, timeSeriesSpecificStateManager);
}

exports.addTimeSeriesStateManager = addTimeSeriesStateManager;
exports.newTimeSeriesSpecificToolStateManager = newTimeSeriesSpecificToolStateManager;

/***/ }),

/***/ "./stateManagement/toolColors.js":
/*!***************************************!*\
  !*** ./stateManagement/toolColors.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultColor = 'white',
    activeColor = 'greenyellow',
    fillColor = 'transparent';

function setFillColor(color) {
  fillColor = color;
}

function getFillColor() {
  return fillColor;
}

function setToolColor(color) {
  defaultColor = color;
}

function getToolColor() {
  return defaultColor;
}

function setActiveColor(color) {
  activeColor = color;
}

function getActiveColor() {
  return activeColor;
}

function getColorIfActive(active) {
  return active ? activeColor : defaultColor;
}

var toolColors = {
  setFillColor: setFillColor,
  getFillColor: getFillColor,
  setToolColor: setToolColor,
  getToolColor: getToolColor,
  setActiveColor: setActiveColor,
  getActiveColor: getActiveColor,
  getColorIfActive: getColorIfActive
};

exports.default = toolColors;

/***/ }),

/***/ "./stateManagement/toolCoordinates.js":
/*!********************************************!*\
  !*** ./stateManagement/toolCoordinates.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var coordsData = void 0;

function setCoords(eventData) {
  coordsData = eventData.currentPoints.canvas;
}

function getCoords() {
  return coordsData;
}

var toolCoordinates = {
  setCoords: setCoords,
  getCoords: getCoords
};

exports.default = toolCoordinates;

/***/ }),

/***/ "./stateManagement/toolState.js":
/*!**************************************!*\
  !*** ./stateManagement/toolState.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementToolStateManager = exports.setElementToolStateManager = exports.clearToolState = exports.removeToolState = exports.getToolState = exports.addToolState = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _imageIdSpecificStateManager = __webpack_require__(/*! ./imageIdSpecificStateManager.js */ "./stateManagement/imageIdSpecificStateManager.js");

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementToolStateManager(element) {
  var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);
  // If the enabledImage has no toolStateManager, create a default one for it
  // NOTE: This makes state management element specific

  if (enabledImage.toolStateManager === undefined) {
    enabledImage.toolStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  return enabledImage.toolStateManager;
}

// Here we add tool state, this is done by tools as well
// As modules that restore saved state
function addToolState(element, toolType, measurementData) {
  var toolStateManager = getElementToolStateManager(element);

  toolStateManager.add(element, toolType, measurementData);

  var eventType = _events2.default.MEASUREMENT_ADDED;
  var eventData = {
    toolType: toolType,
    element: element,
    measurementData: measurementData
  };

  (0, _triggerEvent2.default)(element, eventType, eventData);
}

// Here you can get state - used by tools as well as modules
// That save state persistently
function getToolState(element, toolType) {
  var toolStateManager = getElementToolStateManager(element);

  return toolStateManager.get(element, toolType);
}

function removeToolState(element, toolType, data) {
  var toolStateManager = getElementToolStateManager(element);
  var toolData = toolStateManager.get(element, toolType);
  // Find this tool data
  var indexOfData = -1;

  for (var i = 0; i < toolData.data.length; i++) {
    if (toolData.data[i] === data) {
      indexOfData = i;
    }
  }

  if (indexOfData !== -1) {
    toolData.data.splice(indexOfData, 1);
    var eventType = _events2.default.MEASUREMENT_REMOVED;
    var eventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, eventData);
  }
}

function clearToolState(element, toolType) {
  var toolStateManager = getElementToolStateManager(element);
  var toolData = toolStateManager.get(element, toolType);

  // If any toolData actually exists, clear it
  if (toolData !== undefined) {
    toolData.data = [];
  }
}

// Sets the tool state manager for an element
function setElementToolStateManager(element, toolStateManager) {
  var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);

  enabledImage.toolStateManager = toolStateManager;
}

exports.addToolState = addToolState;
exports.getToolState = getToolState;
exports.removeToolState = removeToolState;
exports.clearToolState = clearToolState;
exports.setElementToolStateManager = setElementToolStateManager;
exports.getElementToolStateManager = getElementToolStateManager;

/***/ }),

/***/ "./stateManagement/toolStyle.js":
/*!**************************************!*\
  !*** ./stateManagement/toolStyle.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultWidth = 1,
    activeWidth = 2;

function setToolWidth(width) {
  defaultWidth = width;
}

function getToolWidth() {
  return defaultWidth;
}

function setActiveWidth(width) {
  activeWidth = width;
}

function getActiveWidth() {
  return activeWidth;
}

var toolStyle = {
  setToolWidth: setToolWidth,
  getToolWidth: getToolWidth,
  setActiveWidth: setActiveWidth,
  getActiveWidth: getActiveWidth
};

exports.default = toolStyle;

/***/ }),

/***/ "./synchronization/Synchronizer.js":
/*!*****************************************!*\
  !*** ./synchronization/Synchronizer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unique(array) {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

// This object is responsible for synchronizing target elements when an event fires on a source
// Element
// @param event can contain more than one event, separated by a space
function Synchronizer(event, handler) {
  var cornerstone = _externalModules2.default.cornerstone;
  var that = this;
  var sourceElements = []; // Source elements fire the events we want to synchronize to
  var targetElements = []; // Target elements we want to synchronize to source elements

  var ignoreFiredEvents = false;
  var initialData = {};
  var eventHandler = handler;

  this.setHandler = function (handler) {
    eventHandler = handler;
  };

  this.getHandler = function () {
    return eventHandler;
  };

  this.getDistances = function () {
    if (!sourceElements.length || !targetElements.length) {
      return;
    }

    initialData.distances = {};
    initialData.imageIds = {
      sourceElements: [],
      targetElements: []
    };

    sourceElements.forEach(function (sourceElement) {
      var sourceEnabledElement = cornerstone.getEnabledElement(sourceElement);

      if (!sourceEnabledElement || !sourceEnabledElement.image) {
        return;
      }

      var sourceImageId = sourceEnabledElement.image.imageId;
      var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImageId);

      if (!sourceImagePlane || !sourceImagePlane.imagePositionPatient) {
        return;
      }

      var sourceImagePosition = (0, _convertToVector2.default)(sourceImagePlane.imagePositionPatient);

      if (initialData.hasOwnProperty(sourceEnabledElement)) {
        return;
      }
      initialData.distances[sourceImageId] = {};

      initialData.imageIds.sourceElements.push(sourceImageId);

      targetElements.forEach(function (targetElement) {
        var targetEnabledElement = cornerstone.getEnabledElement(targetElement);

        if (!targetEnabledElement || !targetEnabledElement.image) {
          return;
        }

        var targetImageId = targetEnabledElement.image.imageId;

        initialData.imageIds.targetElements.push(targetImageId);

        if (sourceElement === targetElement) {
          return;
        }

        if (sourceImageId === targetImageId) {
          return;
        }

        if (initialData.distances[sourceImageId].hasOwnProperty(targetImageId)) {
          return;
        }

        var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImageId);

        if (!targetImagePlane || !targetImagePlane.imagePositionPatient) {
          return;
        }

        var targetImagePosition = (0, _convertToVector2.default)(targetImagePlane.imagePositionPatient);

        initialData.distances[sourceImageId][targetImageId] = targetImagePosition.clone().sub(sourceImagePosition);
      });

      if (!Object.keys(initialData.distances[sourceImageId]).length) {
        delete initialData.distances[sourceImageId];
      }
    });
  };

  function fireEvent(sourceElement, eventData) {
    // Broadcast an event that something changed
    if (!sourceElements.length || !targetElements.length) {
      return;
    }

    ignoreFiredEvents = true;
    targetElements.forEach(function (targetElement) {
      var targetIndex = targetElements.indexOf(targetElement);

      if (targetIndex === -1) {
        return;
      }

      var targetImageId = initialData.imageIds.targetElements[targetIndex];
      var sourceIndex = sourceElements.indexOf(sourceElement);

      if (sourceIndex === -1) {
        return;
      }

      var sourceImageId = initialData.imageIds.sourceElements[sourceIndex];

      var positionDifference = void 0;

      if (sourceImageId === targetImageId) {
        positionDifference = 0;
      } else if (initialData.distances[sourceImageId] !== undefined) {
        positionDifference = initialData.distances[sourceImageId][targetImageId];
      }

      eventHandler(that, sourceElement, targetElement, eventData, positionDifference);
    });
    ignoreFiredEvents = false;
  }

  function onEvent(e) {
    var eventData = e.detail;

    if (ignoreFiredEvents === true) {
      return;
    }

    fireEvent(e.currentTarget, eventData);
  }

  // Adds an element as a source
  this.addSource = function (element) {
    // Return if this element was previously added
    var index = sourceElements.indexOf(element);

    if (index !== -1) {
      return;
    }

    // Add to our list of enabled elements
    sourceElements.push(element);

    // Subscribe to the event
    event.split(' ').forEach(function (oneEvent) {
      element.addEventListener(oneEvent, onEvent);
    });

    // Update the initial distances between elements
    that.getDistances();

    that.updateDisableHandlers();
  };

  // Adds an element as a target
  this.addTarget = function (element) {
    // Return if this element was previously added
    var index = targetElements.indexOf(element);

    if (index !== -1) {
      return;
    }

    // Add to our list of enabled elements
    targetElements.push(element);

    // Update the initial distances between elements
    that.getDistances();

    // Invoke the handler for this new target element
    eventHandler(that, element, element, 0);

    that.updateDisableHandlers();
  };

  // Adds an element as both a source and a target
  this.add = function (element) {
    that.addSource(element);
    that.addTarget(element);
  };

  // Removes an element as a source
  this.removeSource = function (element) {
    // Find the index of this element
    var index = sourceElements.indexOf(element);

    if (index === -1) {
      return;
    }

    // Remove this element from the array
    sourceElements.splice(index, 1);

    // Stop listening for the event
    event.split(' ').forEach(function (oneEvent) {
      element.removeEventListener(oneEvent, onEvent);
    });

    // Update the initial distances between elements
    that.getDistances();

    // Update everyone listening for events
    fireEvent(element);
    that.updateDisableHandlers();
  };

  // Removes an element as a target
  this.removeTarget = function (element) {
    // Find the index of this element
    var index = targetElements.indexOf(element);

    if (index === -1) {
      return;
    }

    // Remove this element from the array
    targetElements.splice(index, 1);

    // Update the initial distances between elements
    that.getDistances();

    // Invoke the handler for the removed target
    eventHandler(that, element, element, 0);
    that.updateDisableHandlers();
  };

  // Removes an element as both a source and target
  this.remove = function (element) {
    that.removeTarget(element);
    that.removeSource(element);
  };

  // Returns the source elements
  this.getSourceElements = function () {
    return sourceElements;
  };

  // Returns the target elements
  this.getTargetElements = function () {
    return targetElements;
  };

  this.displayImage = function (element, image, viewport) {
    ignoreFiredEvents = true;
    cornerstone.displayImage(element, image, viewport);
    ignoreFiredEvents = false;
  };

  this.setViewport = function (element, viewport) {
    ignoreFiredEvents = true;
    cornerstone.setViewport(element, viewport);
    ignoreFiredEvents = false;
  };

  function disableHandler(e) {
    var element = e.detail.element;

    that.remove(element);
    (0, _toolOptions.clearToolOptionsByElement)(element);
  }

  this.updateDisableHandlers = function () {
    var elements = unique(sourceElements.concat(targetElements));

    elements.forEach(function (element) {
      element.removeEventListener(_events2.default.ELEMENT_DISABLED, disableHandler);
      element.addEventListener(_events2.default.ELEMENT_DISABLED, disableHandler);
    });
  };

  this.destroy = function () {
    var elements = unique(sourceElements.concat(targetElements));

    elements.forEach(function (element) {
      that.remove(element);
    });
  };
}

exports.default = Synchronizer;

/***/ }),

/***/ "./synchronization/panZoomSynchronizer.js":
/*!************************************************!*\
  !*** ./synchronization/panZoomSynchronizer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // Get the source and target viewports
  var sourceViewport = cornerstone.getViewport(sourceElement);
  var targetViewport = cornerstone.getViewport(targetElement);

  // Do nothing if the scale and translation are the same
  if (targetViewport.scale === sourceViewport.scale && targetViewport.translation.x === sourceViewport.translation.x && targetViewport.translation.y === sourceViewport.translation.y) {
    return;
  }

  // Scale and/or translation are different, sync them
  targetViewport.scale = sourceViewport.scale;
  targetViewport.translation.x = sourceViewport.translation.x;
  targetViewport.translation.y = sourceViewport.translation.y;
  synchronizer.setViewport(targetElement, targetViewport);
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./synchronization/stackImageIndexSynchronizer.js":
/*!********************************************************!*\
  !*** ./synchronization/stackImageIndexSynchronizer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var sourceStackToolDataSource = (0, _toolState.getToolState)(sourceElement, 'stack');
  var sourceStackData = sourceStackToolDataSource.data[0];
  var targetStackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var targetStackData = targetStackToolDataSource.data[0];

  var newImageIdIndex = sourceStackData.currentImageIdIndex;

  // Clamp the index
  newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), targetStackData.imageIds.length - 1);

  // Do nothing if the index has not changed
  if (newImageIdIndex === targetStackData.currentImageIdIndex) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  var loader = void 0;

  if (targetStackData.preventCache === true) {
    loader = cornerstone.loadImage(targetStackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(targetStackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    var viewport = cornerstone.getViewport(targetElement);

    targetStackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    var imageId = targetStackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./synchronization/stackImagePositionOffsetSynchronizer.js":
/*!*****************************************************************!*\
  !*** ./synchronization/stackImagePositionOffsetSynchronizer.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement, eventData, positionDifference) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var sourceEnabledElement = cornerstone.getEnabledElement(sourceElement);
  var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceEnabledElement.image.imageId);
  var sourceImagePosition = (0, _convertToVector2.default)(sourceImagePlane.imagePositionPatient);

  var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var stackData = stackToolDataSource.data[0];

  var minDistance = Number.MAX_VALUE;
  var newImageIdIndex = -1;

  if (!positionDifference) {
    return;
  }

  var finalPosition = sourceImagePosition.clone().add(positionDifference);

  stackData.imageIds.forEach(function (imageId, index) {
    var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);
    var imagePosition = (0, _convertToVector2.default)(imagePlane.imagePositionPatient);
    var distance = finalPosition.distanceToSquared(imagePosition);

    if (distance < minDistance) {
      minDistance = distance;
      newImageIdIndex = index;
    }
  });

  if (newImageIdIndex === stackData.currentImageIdIndex || newImageIdIndex === -1) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  var loader = void 0;

  if (stackData.preventCache === true) {
    loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    var viewport = cornerstone.getViewport(targetElement);

    stackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    var imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./synchronization/stackImagePositionSynchronizer.js":
/*!***********************************************************!*\
  !*** ./synchronization/stackImagePositionSynchronizer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var sourceImage = cornerstone.getEnabledElement(sourceElement).image;
  var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImage.imageId);

  if (sourceImagePlane === undefined || sourceImagePlane.imagePositionPatient === undefined) {
    // Console.log('No position found for image ' + sourceImage.imageId);

    return;
  }

  var sourceImagePosition = (0, _convertToVector2.default)(sourceImagePlane.imagePositionPatient);
  var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var stackData = stackToolDataSource.data[0];

  var minDistance = Number.MAX_VALUE;
  var newImageIdIndex = -1;

  stackData.imageIds.forEach(function (imageId, index) {
    var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);

    if (imagePlane === undefined || imagePlane.imagePositionPatient === undefined) {
      // Console.log('No position found for image ' + imageId);

      return;
    }

    var imagePosition = (0, _convertToVector2.default)(imagePlane.imagePositionPatient);
    var distance = imagePosition.distanceToSquared(sourceImagePosition);
    // Console.log(index + '=' + distance);

    if (distance < minDistance) {
      minDistance = distance;
      newImageIdIndex = index;
    }
  });

  if (newImageIdIndex === stackData.currentImageIdIndex) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  if (newImageIdIndex !== -1) {
    var loader = void 0;

    if (stackData.preventCache === true) {
      loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
    } else {
      loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
    }

    loader.then(function (image) {
      var viewport = cornerstone.getViewport(targetElement);

      stackData.currentImageIdIndex = newImageIdIndex;
      synchronizer.displayImage(targetElement, image, viewport);
      if (endLoadingHandler) {
        endLoadingHandler(targetElement, image);
      }
    }, function (error) {
      var imageId = stackData.imageIds[newImageIdIndex];

      if (errorLoadingHandler) {
        errorLoadingHandler(targetElement, imageId, error);
      }
    });
  }
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./synchronization/stackScrollSynchronizer.js":
/*!****************************************************!*\
  !*** ./synchronization/stackScrollSynchronizer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement, eventData) {
  // If the target and source are the same, stop
  if (sourceElement === targetElement) {
    return;
  }

  // If there is no event, or direction is 0, stop
  if (!eventData || !eventData.direction) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // Get the stack of the target viewport
  var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var stackData = stackToolDataSource.data[0];

  // Get the new index for the stack
  var newImageIdIndex = stackData.currentImageIdIndex + eventData.direction;

  // Ensure the index does not exceed the bounds of the stack
  newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), stackData.imageIds.length - 1);

  // If the index has not changed, stop here
  if (stackData.currentImageIdIndex === newImageIdIndex) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  var loader = void 0;

  if (stackData.preventCache === true) {
    loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    var viewport = cornerstone.getViewport(targetElement);

    stackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    var imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./synchronization/updateImageSynchronizer.js":
/*!****************************************************!*\
  !*** ./synchronization/updateImageSynchronizer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  _externalModules2.default.cornerstone.updateImage(targetElement);
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./synchronization/wwwcSynchronizer.js":
/*!*********************************************!*\
  !*** ./synchronization/wwwcSynchronizer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // Get the source and target viewports
  var sourceViewport = cornerstone.getViewport(sourceElement);
  var targetViewport = cornerstone.getViewport(targetElement);

  // Do nothing if the ww/wc already match
  if (targetViewport.voi.windowWidth === sourceViewport.voi.windowWidth && targetViewport.voi.windowCenter === sourceViewport.voi.windowCenter && targetViewport.invert === sourceViewport.invert) {
    return;
  }

  // Www/wc are different, sync them
  targetViewport.voi.windowWidth = sourceViewport.voi.windowWidth;
  targetViewport.voi.windowCenter = sourceViewport.voi.windowCenter;
  targetViewport.invert = sourceViewport.invert;
  synchronizer.setViewport(targetElement, targetViewport);
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./timeSeriesTools/incrementTimePoint.js":
/*!***********************************************!*\
  !*** ./timeSeriesTools/incrementTimePoint.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, timePoints, wrap) {
  var toolData = (0, _toolState.getToolState)(element, 'timeSeries');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  var timeSeriesData = toolData.data[0];
  var currentStack = timeSeriesData.stacks[timeSeriesData.currentStackIndex];
  var currentImageIdIndex = currentStack.currentImageIdIndex;
  var newStackIndex = timeSeriesData.currentStackIndex + timePoints;

  // Loop around if we go outside the stack
  if (wrap) {
    if (newStackIndex >= timeSeriesData.stacks.length) {
      newStackIndex = 0;
    }

    if (newStackIndex < 0) {
      newStackIndex = timeSeriesData.stacks.length - 1;
    }
  } else {
    newStackIndex = Math.min(timeSeriesData.stacks.length - 1, newStackIndex);
    newStackIndex = Math.max(0, newStackIndex);
  }

  if (newStackIndex !== timeSeriesData.currentStackIndex) {
    var viewport = cornerstone.getViewport(element);
    var newStack = timeSeriesData.stacks[newStackIndex];

    var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
    var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
    var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

    if (startLoadingHandler) {
      startLoadingHandler(element);
    }

    var loader = void 0;

    if (newStack.preventCache === true) {
      loader = cornerstone.loadImage(newStack.imageIds[currentImageIdIndex]);
    } else {
      loader = cornerstone.loadAndCacheImage(newStack.imageIds[currentImageIdIndex]);
    }

    loader.then(function (image) {
      if (timeSeriesData.currentImageIdIndex !== currentImageIdIndex) {
        newStack.currentImageIdIndex = currentImageIdIndex;
        timeSeriesData.currentStackIndex = newStackIndex;
        cornerstone.displayImage(element, image, viewport);
        if (endLoadingHandler) {
          endLoadingHandler(element, image);
        }
      }
    }, function (error) {
      var imageId = newStack.imageIds[currentImageIdIndex];

      if (errorLoadingHandler) {
        errorLoadingHandler(element, imageId, error);
      }
    });
  }
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./timeSeriesTools/probeTool4D.js":
/*!****************************************!*\
  !*** ./timeSeriesTools/probeTool4D.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _mouseButtonTool = __webpack_require__(/*! ../imageTools/mouseButtonTool.js */ "./imageTools/mouseButtonTool.js");

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _drawHandles = __webpack_require__(/*! ../manipulators/drawHandles.js */ "./manipulators/drawHandles.js");

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _measurementManager = __webpack_require__(/*! ../measurementManager/measurementManager.js */ "./measurementManager/measurementManager.js");

var _measurementManager2 = _interopRequireDefault(_measurementManager);

var _lineSampleMeasurement = __webpack_require__(/*! ../measurementManager/lineSampleMeasurement.js */ "./measurementManager/lineSampleMeasurement.js");

var _lineSampleMeasurement2 = _interopRequireDefault(_lineSampleMeasurement);

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

var _drawTextBox = __webpack_require__(/*! ../util/drawTextBox.js */ "./util/drawTextBox.js");

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'probe4D';

function updateLineSample(measurementData) {
  var cornerstone = _externalModules2.default.cornerstone;
  var samples = [];

  measurementData.timeSeries.stacks.forEach(function (stack) {
    var loader = void 0;

    if (stack.preventCache === true) {
      loader = cornerstone.loadImage(stack.imageIds[measurementData.imageIdIndex]);
    } else {
      loader = cornerstone.loadAndCacheImage(stack.imageIds[measurementData.imageIdIndex]);
    }

    loader.then(function (image) {
      var offset = Math.round(measurementData.handles.end.x) + Math.round(measurementData.handles.end.y) * image.width;
      var sample = image.getPixelData()[offset];

      samples.push(sample);
    });
  });
  measurementData.lineSample.set(samples);
}

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  var timeSeriestoolData = (0, _toolState.getToolState)(mouseEventData.element, 'timeSeries');

  if (timeSeriestoolData === undefined || timeSeriestoolData.data === undefined || timeSeriestoolData.data.length === 0) {
    return;
  }

  var timeSeries = timeSeriestoolData.data[0];

  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    timeSeries: timeSeries,
    lineSample: new _lineSampleMeasurement2.default(),
    imageIdIndex: timeSeries.stacks[timeSeries.currentStackIndex].currentImageIdIndex,
    visible: true,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      }
    }
  };

  updateLineSample(measurementData);
  _measurementManager2.default.add(measurementData);

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////

function onImageRendered(e) {
  var cornerstone = _externalModules2.default.cornerstone;
  var eventData = e.detail;
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext;

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = 'white';
  var font = _textStyle2.default.getFont();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();
    var data = toolData.data[i];

    // Draw the handles
    context.beginPath();
    (0, _drawHandles2.default)(context, eventData, data.handles, color);
    context.stroke();

    context.font = font;

    var coords = {
      // Translate the x/y away from the cursor
      x: data.handles.end.x + 3,
      y: data.handles.end.y - 3
    };

    var textCoords = cornerstone.pixelToCanvas(eventData.element, coords);

    context.fillStyle = color;

    (0, _drawTextBox2.default)(context, data.handles.end.x + ', ' + data.handles.end.y, textCoords.x, textCoords.y, color);

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var probeTool4D = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  toolType: toolType
});

exports.default = probeTool4D;

/***/ }),

/***/ "./timeSeriesTools/timeSeriesPlayer.js":
/*!*********************************************!*\
  !*** ./timeSeriesTools/timeSeriesPlayer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _incrementTimePoint = __webpack_require__(/*! ./incrementTimePoint.js */ "./timeSeriesTools/incrementTimePoint.js");

var _incrementTimePoint2 = _interopRequireDefault(_incrementTimePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'timeSeriesPlayer';

/**
 * Starts playing a clip of different time series of the same image or adjusts the frame rate of an
 * already playing clip. framesPerSecond is optional and defaults to 30 if not specified. A negative
 * framesPerSecond will play the clip in reverse.
 * The element must have time series
 * @param element
 * @param framesPerSecond
 */
function playClip(element, framesPerSecond) {
  if (element === undefined) {
    throw new Error('playClip: element must not be undefined');
  }

  if (framesPerSecond === undefined) {
    framesPerSecond = 30;
  }

  var timeSeriesToolData = (0, _toolState.getToolState)(element, 'timeSeries');

  if (timeSeriesToolData === undefined || timeSeriesToolData.data === undefined || timeSeriesToolData.data.length === 0) {
    return;
  }

  var playClipToolData = (0, _toolState.getToolState)(element, toolType);
  var playClipData = void 0;

  if (playClipToolData === undefined || playClipToolData.data.length === 0) {
    playClipData = {
      intervalId: undefined,
      framesPerSecond: framesPerSecond,
      lastFrameTimeStamp: undefined,
      frameRate: 0
    };
    (0, _toolState.addToolState)(element, toolType, playClipData);
  } else {
    playClipData = playClipToolData.data[0];
    playClipData.framesPerSecond = framesPerSecond;
  }

  // If already playing, do not set a new interval
  if (playClipData.intervalId !== undefined) {
    return;
  }

  playClipData.intervalId = setInterval(function () {
    if (playClipData.framesPerSecond > 0) {
      (0, _incrementTimePoint2.default)(element, 1, true);
    } else {
      (0, _incrementTimePoint2.default)(element, -1, true);
    }
  }, 1000 / Math.abs(playClipData.framesPerSecond));
}

/**
 * Stops an already playing clip.
 * * @param element
 */
function stopClip(element) {
  var playClipToolData = (0, _toolState.getToolState)(element, toolType);

  if (!playClipToolData || !playClipToolData.data || !playClipToolData.data.length) {
    return;
  }
  var playClipData = playClipToolData.data[0];

  clearInterval(playClipData.intervalId);
  playClipData.intervalId = undefined;
}

// Module/private exports
var timeSeriesPlayer = {
  start: playClip,
  stop: stopClip
};

exports.default = timeSeriesPlayer;

/***/ }),

/***/ "./timeSeriesTools/timeSeriesScroll.js":
/*!*********************************************!*\
  !*** ./timeSeriesTools/timeSeriesScroll.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeSeriesScrollTouchDrag = exports.timeSeriesScrollWheel = exports.timeSeriesScroll = undefined;

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _simpleMouseButtonTool = __webpack_require__(/*! ../imageTools/simpleMouseButtonTool.js */ "./imageTools/simpleMouseButtonTool.js");

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(/*! ../imageTools/touchDragTool.js */ "./imageTools/touchDragTool.js");

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _mouseWheelTool = __webpack_require__(/*! ../imageTools/mouseWheelTool.js */ "./imageTools/mouseWheelTool.js");

var _mouseWheelTool2 = _interopRequireDefault(_mouseWheelTool);

var _incrementTimePoint = __webpack_require__(/*! ./incrementTimePoint.js */ "./timeSeriesTools/incrementTimePoint.js");

var _incrementTimePoint2 = _interopRequireDefault(_incrementTimePoint);

var _isMouseButtonEnabled = __webpack_require__(/*! ../util/isMouseButtonEnabled.js */ "./util/isMouseButtonEnabled.js");

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _toolOptions = __webpack_require__(/*! ../toolOptions.js */ "./toolOptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'timeSeriesScroll';

function mouseUpCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  element.removeEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
  element.removeEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
  element.removeEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
}

function mouseDownCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;
  var options = (0, _toolOptions.getToolOptions)(toolType, element);

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, options.mouseButtonMask)) {
    options.deltaY = 0;

    (0, _toolOptions.setToolOptions)(toolType, element, options);

    element.addEventListener(_events2.default.MOUSE_DRAG, mouseDragCallback);
    element.addEventListener(_events2.default.MOUSE_UP, mouseUpCallback);
    element.addEventListener(_events2.default.MOUSE_CLICK, mouseUpCallback);
    e.stopImmediatePropagation();

    return false;
  }
}

function mouseDragCallback(e) {
  var eventData = e.detail;
  var element = eventData.element;

  e.data.deltaY += eventData.deltaPoints.page.y;

  var toolData = (0, _toolState.getToolState)(eventData.element, 'timeSeries');

  if (toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
    return;
  }

  var timeSeriesData = toolData.data[0];

  var pixelsPerTimeSeries = element.offsetHeight / timeSeriesData.stacks.length;

  if (e.data.options !== undefined && e.data.options.timeSeriesScrollSpeed !== undefined) {
    pixelsPerTimeSeries = e.data.options.timeSeriesScrollSpeed;
  }

  if (e.data.deltaY >= pixelsPerTimeSeries || e.data.deltaY <= -pixelsPerTimeSeries) {
    var timeSeriesDelta = Math.round(e.data.deltaY / pixelsPerTimeSeries);
    var timeSeriesDeltaMod = e.data.deltaY % pixelsPerTimeSeries;

    (0, _incrementTimePoint2.default)(eventData.element, timeSeriesDelta);
    e.data.deltaY = timeSeriesDeltaMod;
  }

  return false;
}

function mouseWheelCallback(e) {
  var eventData = e.detail;
  var images = -eventData.direction;

  (0, _incrementTimePoint2.default)(eventData.element, images);
}

function dragCallback(e) {
  var mouseMoveData = e.originalEvent.detail;
  var eventData = {
    deltaY: 0
  };

  eventData.deltaY += mouseMoveData.deltaPoints.page.y;

  var toolData = (0, _toolState.getToolState)(mouseMoveData.element, 'stack');

  if (toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
    return;
  }

  if (eventData.deltaY >= 3 || eventData.deltaY <= -3) {
    var timeSeriesDelta = eventData.deltaY / 3;
    var timeSeriesDeltaMod = eventData.deltaY % 3;

    (0, _incrementTimePoint2.default)(eventData.element, timeSeriesDelta);
    eventData.deltaY = timeSeriesDeltaMod;
  }

  return false;
}

// Module/private exports
var timeSeriesScroll = (0, _simpleMouseButtonTool2.default)(mouseDownCallback, toolType);
var timeSeriesScrollWheel = (0, _mouseWheelTool2.default)(mouseWheelCallback);
var timeSeriesScrollTouchDrag = (0, _touchDragTool2.default)(dragCallback);

exports.timeSeriesScroll = timeSeriesScroll;
exports.timeSeriesScrollWheel = timeSeriesScrollWheel;
exports.timeSeriesScrollTouchDrag = timeSeriesScrollTouchDrag;

/***/ }),

/***/ "./toolOptions.js":
/*!************************!*\
  !*** ./toolOptions.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var elementToolOptions = {};

/**
 * Retrieve the options object associated with a particular toolType and element
 *
 * @param {string} toolType Tool type identifier of the target options object
 * @param {HTMLElement} element Element of the target options object
 *
 * @return {Object} Target options object (empty if not yet set)
 */
function getToolOptions(toolType, element) {
  if (!elementToolOptions[toolType]) {
    return {};
  }

  var toolOptions = elementToolOptions[toolType];
  var optionsObject = toolOptions.find(function (toolOptionObject) {
    return toolOptionObject.element === element;
  });

  if (!optionsObject) {
    return {};
  }

  return optionsObject.options;
}

/**
 * Set the options object associated with a particular toolType and element
 *
 * @param {string} toolType Tool type identifier of the target options object
 * @param {HTMLElement} element Element of the target options object
 * @param {Object} options Options object to store at target
 *
 * @return {void}
 */
function setToolOptions(toolType, element, options) {
  if (!elementToolOptions[toolType]) {
    elementToolOptions[toolType] = [{
      element: element,
      options: options
    }];

    return;
  }

  var toolOptions = elementToolOptions[toolType];
  var index = toolOptions.findIndex(function (toolOptionObject) {
    return toolOptionObject.element === element;
  });

  if (index === -1) {
    elementToolOptions[toolType].push({
      element: element,
      options: options
    });
  } else {
    var elementOptions = elementToolOptions[toolType][index].options || {};

    elementToolOptions[toolType][index].options = Object.assign(elementOptions, options);
  }
}

/**
 * Clear the options object associated with a particular toolType and element
 *
 * @param {string} toolType Tool type identifier of the target options object
 * @param {HTMLElement} element Element of the target options object
 *
 * @return {void}
 */
function clearToolOptions(toolType, element) {
  var toolOptions = elementToolOptions[toolType];

  if (toolOptions) {
    elementToolOptions[toolType] = toolOptions.filter(function (toolOptionObject) {
      return toolOptionObject.element !== element;
    });
  }
}

/**
 * Clear the options objects associated with a particular toolType
 *
 * @param {string} toolType Tool type identifier of the target options objects
 *
 * @return {void}
 */
function clearToolOptionsByToolType(toolType) {
  delete elementToolOptions[toolType];
}

/**
 * Clear the options objects associated with a particular element
 *
 * @param {HTMLElement} element Element of the target options objects
 *
 * @return {void}
 */
function clearToolOptionsByElement(element) {
  for (var toolType in elementToolOptions) {
    elementToolOptions[toolType] = elementToolOptions[toolType].filter(function (toolOptionObject) {
      return toolOptionObject.element !== element;
    });
  }
}

exports.getToolOptions = getToolOptions;
exports.setToolOptions = setToolOptions;
exports.clearToolOptions = clearToolOptions;
exports.clearToolOptionsByToolType = clearToolOptionsByToolType;
exports.clearToolOptionsByElement = clearToolOptionsByElement;

/***/ }),

/***/ "./util/calculateEllipseStatistics.js":
/*!********************************************!*\
  !*** ./util/calculateEllipseStatistics.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sp, ellipse) {
  // TODO: Get a real statistics library here that supports large counts

  var sum = 0;
  var sumSquared = 0;
  var count = 0;
  var index = 0;

  for (var y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
    for (var x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
      var point = {
        x: x,
        y: y
      };

      if ((0, _pointInEllipse2.default)(ellipse, point)) {
        sum += sp[index];
        sumSquared += sp[index] * sp[index];
        count++;
      }

      index++;
    }
  }

  if (count === 0) {
    return {
      count: count,
      mean: 0.0,
      variance: 0.0,
      stdDev: 0.0
    };
  }

  var mean = sum / count;
  var variance = sumSquared / count - mean * mean;

  return {
    count: count,
    mean: mean,
    variance: variance,
    stdDev: Math.sqrt(variance)
  };
};

var _pointInEllipse = __webpack_require__(/*! ./pointInEllipse.js */ "./util/pointInEllipse.js");

var _pointInEllipse2 = _interopRequireDefault(_pointInEllipse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/calculateFreehandStatistics.js":
/*!*********************************************!*\
  !*** ./util/calculateFreehandStatistics.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sp, boundingBox, dataHandles) {
	var statisticsObj = {
	  count: 0,
	  mean: 0.0,
	  variance: 0.0,
	  stdDev: 0.0
	};
  var sum = 0;
  var sumSquared = 0;
  var index = 0;

  for (var y = boundingBox.top; y < boundingBox.top + boundingBox.height; y++) {
    for (var x = boundingBox.left; x < boundingBox.left + boundingBox.width; x++) {
      if ((0, _pointInFreehandROI2.default)(dataHandles, {
        x: x,
        y: y
      })) {
        sum += sp[index];
        sumSquared += sp[index] * sp[index];
        statisticsObj.count++;
      }
      index++;
    }
  }

  if (statisticsObj.count === 0) {
    return statisticsObj;
  }

  statisticsObj.mean = sum / statisticsObj.count;
  statisticsObj.variance = sumSquared / statisticsObj.count - statisticsObj.mean * statisticsObj.mean;
  statisticsObj.stdDev = Math.sqrt(statisticsObj.variance);

  return statisticsObj;
};

var _pointInFreehandROI = __webpack_require__(/*! ./pointInFreehandROI.js */ "./util/pointInFreehandROI.js");

var _pointInFreehandROI2 = _interopRequireDefault(_pointInFreehandROI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/calculateSUV.js":
/*!******************************!*\
  !*** ./util/calculateSUV.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, storedPixelValue) {
  var cornerstone = _externalModules2.default.cornerstone;
  var patientStudyModule = cornerstone.metaData.get('patientStudyModule', image.imageId);
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);

  if (!patientStudyModule || !seriesModule) {
    return;
  }

  var modality = seriesModule.modality;

  // Image must be PET
  if (modality !== 'PT') {
    return;
  }

  var modalityPixelValue = storedPixelValue * image.slope + image.intercept;

  var patientWeight = patientStudyModule.patientWeight; // In kg

  if (!patientWeight) {
    return;
  }

  var petSequenceModule = cornerstone.metaData.get('petIsotopeModule', image.imageId);

  if (!petSequenceModule) {
    return;
  }

  var radiopharmaceuticalInfo = petSequenceModule.radiopharmaceuticalInfo;
  var startTime = radiopharmaceuticalInfo.radiopharmaceuticalStartTime;
  var totalDose = radiopharmaceuticalInfo.radionuclideTotalDose;
  var halfLife = radiopharmaceuticalInfo.radionuclideHalfLife;
  var seriesAcquisitionTime = seriesModule.seriesTime;

  if (!startTime || !totalDose || !halfLife || !seriesAcquisitionTime) {
    return;
  }

  var acquisitionTimeInSeconds = fracToDec(seriesAcquisitionTime.fractionalSeconds || 0) + seriesAcquisitionTime.seconds + seriesAcquisitionTime.minutes * 60 + seriesAcquisitionTime.hours * 60 * 60;
  var injectionStartTimeInSeconds = fracToDec(startTime.fractionalSeconds) + startTime.seconds + startTime.minutes * 60 + startTime.hours * 60 * 60;
  var durationInSeconds = acquisitionTimeInSeconds - injectionStartTimeInSeconds;
  var correctedDose = totalDose * Math.exp(-durationInSeconds * Math.log(2) / halfLife);
  var suv = modalityPixelValue * patientWeight / correctedDose * 1000;

  return suv;
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a decimal value given a fractional value
function fracToDec(fractionalValue) {
  return parseFloat('.' + fractionalValue);
}

/***/ }),

/***/ "./util/convertToVector3.js":
/*!**********************************!*\
  !*** ./util/convertToVector3.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertToVector3;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert an Array to a cornerstoneMath.Vector3
 *
 * @param {Array|cornerstoneMath.Vector3} arrayOrVector3 Input array or Vector3
 * @return {cornerstoneMath.Vector3}
 */
function convertToVector3(arrayOrVector3) {
  var cornerstoneMath = _externalModules2.default.cornerstoneMath;

  if (arrayOrVector3 instanceof cornerstoneMath.Vector3) {
    return arrayOrVector3;
  }

  return new cornerstoneMath.Vector3(arrayOrVector3[0], arrayOrVector3[1], arrayOrVector3[2]);
}

/***/ }),

/***/ "./util/copyPoints.js":
/*!****************************!*\
  !*** ./util/copyPoints.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (points) {
  var page = _externalModules2.default.cornerstoneMath.point.copy(points.page);
  var image = _externalModules2.default.cornerstoneMath.point.copy(points.image);
  var client = _externalModules2.default.cornerstoneMath.point.copy(points.client);
  var canvas = _externalModules2.default.cornerstoneMath.point.copy(points.canvas);

  return {
    page: page,
    image: image,
    client: client,
    canvas: canvas
  };
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/drawArrow.js":
/*!***************************!*\
  !*** ./util/drawArrow.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, start, end, color, lineWidth) {
  // Variables to be used when creating the arrow
  var headLength = 10;

  var angle = Math.atan2(end.y - start.y, end.x - start.x);

  // Starting path of the arrow from the start square to the end square and drawing the stroke
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();

  // Starting a new path from the head of the arrow to one of the sides of the point
  context.beginPath();
  context.moveTo(end.x, end.y);
  context.lineTo(end.x - headLength * Math.cos(angle - Math.PI / 7), end.y - headLength * Math.sin(angle - Math.PI / 7));

  // Path from the side point of the arrow, to the other side point
  context.lineTo(end.x - headLength * Math.cos(angle + Math.PI / 7), end.y - headLength * Math.sin(angle + Math.PI / 7));

  // Path from the side point back to the tip of the arrow, and then again to the opposite side point
  context.lineTo(end.x, end.y);
  context.lineTo(end.x - headLength * Math.cos(angle - Math.PI / 7), end.y - headLength * Math.sin(angle - Math.PI / 7));

  // Draws the paths created above
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
  context.fillStyle = color;
  context.fill();
};

/***/ }),

/***/ "./util/drawCircle.js":
/*!****************************!*\
  !*** ./util/drawCircle.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, start, color, lineWidth) {
  var handleRadius = 6;

  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.arc(start.x, start.y, handleRadius, 0, 2 * Math.PI);
  context.stroke();
};

/***/ }),

/***/ "./util/drawEllipse.js":
/*!*****************************!*\
  !*** ./util/drawEllipse.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, x, y, w, h) {
  var kappa = 0.5522848,
      ox = w / 2 * kappa,
      // Control point offset horizontal
  oy = h / 2 * kappa,
      // Control point offset vertical
  xe = x + w,
      // X-end
  ye = y + h,
      // Y-end
  xm = x + w / 2,
      // X-middle
  ym = y + h / 2; // Y-middle

  context.beginPath();
  context.moveTo(x, ym);
  context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  context.closePath();
  context.stroke();
};

/***/ }),

/***/ "./util/drawTextBox.js":
/*!*****************************!*\
  !*** ./util/drawTextBox.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, textLines, x, y, color, options) {
  if (Object.prototype.toString.call(textLines) !== '[object Array]') {
    textLines = [textLines];
  }

  var padding = 5;
  var font = _textStyle2.default.getFont();
  var fontSize = _textStyle2.default.getFontSize();
  var backgroundColor = _textStyle2.default.getBackgroundColor();

  context.save();
  context.font = font;
  context.textBaseline = 'top';
  context.strokeStyle = color;

  // Find the longest text width in the array of text data
  var maxWidth = 0;

  textLines.forEach(function (text) {
    // Get the text width in the current font
    var width = context.measureText(text).width;

    // Find the maximum with for all the text rows;
    maxWidth = Math.max(maxWidth, width);
  });

  // Draw the background box with padding
  context.fillStyle = backgroundColor;

  // Calculate the bounding box for this text box
  var boundingBox = {
    width: maxWidth + padding * 2,
    height: padding + textLines.length * (fontSize + padding)
  };

  if (options && options.centering && options.centering.x === true) {
    x -= boundingBox.width / 2;
  }

  if (options && options.centering && options.centering.y === true) {
    y -= boundingBox.height / 2;
  }

  boundingBox.left = x;
  boundingBox.top = y;

  if (options && options.debug === true) {
    context.fillStyle = '#FF0000';
  }

  context.fillRect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height);

  // Draw each of the text lines on top of the background box
  textLines.forEach(function (text, index) {
    context.fillStyle = color;

    /* Var ypos;
        if (index === 0) {
            ypos = y + index * (fontSize + padding);
        } else {
            ypos = y + index * (fontSize + padding * 2);
        }*/

    context.fillText(text, x + padding, y + padding + index * (fontSize + padding));
  });

  context.restore();

  // Return the bounding box so it can be used for pointNearHandle
  return boundingBox;
};

var _textStyle = __webpack_require__(/*! ../stateManagement/textStyle.js */ "./stateManagement/textStyle.js");

var _textStyle2 = _interopRequireDefault(_textStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/freeHandArea.js":
/*!******************************!*\
  !*** ./util/freeHandArea.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dataHandles, scaling) {
  var freeHandArea = 0;
  var j = dataHandles.length - 1; // The last vertex is the previous one to the first

  scaling = scaling || 1; // If scaling is falsy, set scaling to 1

  for (var i = 0; i < dataHandles.length; i++) {
    freeHandArea += (dataHandles[j].x + dataHandles[i].x) * (dataHandles[j].y - dataHandles[i].y);
    j = i; // Here j is previous vertex to i
  }

  return Math.abs(freeHandArea * scaling / 2.0);
};

/***/ }),

/***/ "./util/freeHandIntersect.js":
/*!***********************************!*\
  !*** ./util/freeHandIntersect.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// JPETTS orientation algoritm to determine if two lines cross.
// Credit and details: geeksforgeeks.org/check-if-two-given-line-segments-intersect/

function freeHandIntersect(newHandle, dataHandles) {
  // Check if the proposed line will intersect any existent line
  var lastHandleId = dataHandles.length - 1;
  var lastNode = getCoords(dataHandles[lastHandleId]);
  var newNode = getCoords(newHandle);

  return doesIntersectOtherLines(dataHandles, lastNode, newNode, [lastHandleId]);
}

function freeHandIntersectEnd(dataHandles) {
  // Check if the last line will overlap another line.
  var lastHandleId = dataHandles.length - 1;
  var lastNode = getCoords(dataHandles[lastHandleId]);
  var firstNode = getCoords(dataHandles[0]);

  return doesIntersectOtherLines(dataHandles, lastNode, firstNode, [lastHandleId, 0]);
}

function freeHandIntersectModify(dataHandles, modifiedHandleId) {
  // Check if the modifiedHandle's previous and next lines will intersect any other line in the polygon
  var modifiedNode = getCoords(dataHandles[modifiedHandleId]);

  // Previous neightbor handle
  var neighborHandleId = modifiedHandleId - 1;

  if (modifiedHandleId === 0) {
    neighborHandleId = dataHandles.length - 1;
  }

  var neighborNode = getCoords(dataHandles[neighborHandleId]);

  if (doesIntersectOtherLines(dataHandles, modifiedNode, neighborNode, [modifiedHandleId, neighborHandleId])) {
    return true;
  }

  // Next neightbor handle
  if (modifiedHandleId === dataHandles.length - 1) {
    neighborHandleId = 0;
  } else {
    neighborHandleId = modifiedHandleId + 1;
  }

  neighborNode = getCoords(dataHandles[neighborHandleId]);

  return doesIntersectOtherLines(dataHandles, modifiedNode, neighborNode, [modifiedHandleId, neighborHandleId]);
}

function doesIntersectOtherLines(dataHandles, p1, q1, ignoredHandleIds) {
  var j = dataHandles.length - 1;

  for (var i = 0; i < dataHandles.length; i++) {

    if (ignoredHandleIds.indexOf(i) !== -1 || ignoredHandleIds.indexOf(j) !== -1) {
      j = i;
      continue;
    }

    var p2 = getCoords(dataHandles[j]);
    var q2 = getCoords(dataHandles[i]);

    if (doesIntersect(p1, q1, p2, q2)) {
      return true;
    }

    j = i;
  }

  return false;
}

function doesIntersect(p1, q1, p2, q2) {
  // Check orientation of points in order to determine
  // If (p1,q1) and (p2,q2) intersect
  var result = false;

  var orient = [orientation(p1, q1, p2), orientation(p1, q1, q2), orientation(p2, q2, p1), orientation(p2, q2, q1)];

  // General Case
  if (orient[0] !== orient[1] && orient[2] !== orient[3]) {
    return true;
  }

  // Special Cases
  if (orient[0] === 0 && onSegment(p1, p2, q1)) {
    // If p1, q1 and p2 are colinear and p2 lies on segment p1q1
    result = true;
  } else if (orient[1] === 0 && onSegment(p1, q2, q1)) {
    // If p1, q1 and p2 are colinear and q2 lies on segment p1q1
    result = true;
  } else if (orient[2] === 0 && onSegment(p2, p1, q2)) {
    // If p2, q2 and p1 are colinear and p1 lies on segment p2q2
    result = true;
  } else if (orient[3] === 0 && onSegment(p2, q1, q2)) {
    // If p2, q2 and q1 are colinear and q1 lies on segment p2q2
    result = true;
  }

  return result;
}

function getCoords(dataHandle) {
  return {
    x: dataHandle.x,
    y: dataHandle.y
  };
}

function orientation(p, q, r) {
  var orientationValue = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (orientationValue === 0) {
    return 0; // Colinear
  }

  return orientationValue > 0 ? 1 : 2; // Clockwise or anticlockwise
}

function onSegment(p, q, r) {

  if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) {
    return true;
  }

  return false;
}

exports.freeHandIntersect = freeHandIntersect;
exports.freeHandIntersectEnd = freeHandIntersectEnd;
exports.freeHandIntersectModify = freeHandIntersectModify;

/***/ }),

/***/ "./util/getLuminance.js":
/*!******************************!*\
  !*** ./util/getLuminance.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, x, y, width, height) {
  if (!element) {
    throw new Error('getLuminance: parameter element must not be undefined');
  }

  x = Math.round(x);
  y = Math.round(y);
  var enabledElement = _externalModules2.default.cornerstone.getEnabledElement(element);
  var image = enabledElement.image;
  var luminance = [];
  var index = 0;
  var pixelData = image.getPixelData();
  var spIndex = void 0,
      row = void 0,
      column = void 0;

  if (image.color) {
    for (row = 0; row < height; row++) {
      for (column = 0; column < width; column++) {
        spIndex = ((row + y) * image.columns + (column + x)) * 4;
        var red = pixelData[spIndex];
        var green = pixelData[spIndex + 1];
        var blue = pixelData[spIndex + 2];

        luminance[index++] = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      }
    }
  } else {
    for (row = 0; row < height; row++) {
      for (column = 0; column < width; column++) {
        spIndex = (row + y) * image.columns + (column + x);
        luminance[index++] = pixelData[spIndex] * image.slope + image.intercept;
      }
    }
  }

  return luminance;
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/getMaxSimultaneousRequests.js":
/*!********************************************!*\
  !*** ./util/getMaxSimultaneousRequests.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var configMaxSimultaneousRequests = void 0;

// Maximum concurrent connections to the same server
// Information from http://sgdev-blog.blogspot.fr/2014/01/maximum-concurrent-connection-to-same.html
var maxSimultaneousRequests = {
  default: 6,
  IE: {
    9: 6,
    10: 8,
    default: 8
  },
  Firefox: {
    default: 6
  },
  Opera: {
    10: 8,
    11: 6,
    12: 6,
    default: 6
  },
  Chrome: {
    default: 6
  },
  Safari: {
    default: 6
  }
};

// Browser name / version detection
// http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
function getBrowserInfo() {
  var ua = navigator.userAgent;
  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  var tem = void 0;

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

    return 'IE ' + (tem[1] || '');
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem !== null) {
      return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1]);
  }

  return M.join(' ');
}

function setMaxSimultaneousRequests(newMaxSimultaneousRequests) {
  configMaxSimultaneousRequests = newMaxSimultaneousRequests;
}

function getMaxSimultaneousRequests() {
  if (configMaxSimultaneousRequests) {
    return configMaxSimultaneousRequests;
  }

  return getDefaultSimultaneousRequests();
}

function getDefaultSimultaneousRequests() {
  var infoString = getBrowserInfo();
  var info = infoString.split(' ');
  var browserName = info[0];
  var browserVersion = info[1];
  var browserData = maxSimultaneousRequests[browserName];

  if (!browserData) {
    return maxSimultaneousRequests.default;
  }

  if (!browserData[browserVersion]) {
    return browserData.default;
  }

  return browserData[browserVersion];
}

function isMobileDevice() {
  var pattern = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini');

  return pattern.test(navigator.userAgent);
}

exports.getDefaultSimultaneousRequests = getDefaultSimultaneousRequests;
exports.getMaxSimultaneousRequests = getMaxSimultaneousRequests;
exports.setMaxSimultaneousRequests = setMaxSimultaneousRequests;
exports.getBrowserInfo = getBrowserInfo;
exports.isMobileDevice = isMobileDevice;

/***/ }),

/***/ "./util/getRGBPixels.js":
/*!******************************!*\
  !*** ./util/getRGBPixels.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, x, y, width, height) {
  if (!element) {
    throw new Error('getRGBPixels: parameter element must not be undefined');
  }

  x = Math.round(x);
  y = Math.round(y);
  var enabledElement = _externalModules2.default.cornerstone.getEnabledElement(element);
  var storedPixelData = [];
  var index = 0;
  var pixelData = enabledElement.image.getPixelData();
  var spIndex = void 0,
      row = void 0,
      column = void 0;

  if (enabledElement.image.color) {
    for (row = 0; row < height; row++) {
      for (column = 0; column < width; column++) {
        spIndex = ((row + y) * enabledElement.image.columns + (column + x)) * 4;
        var red = pixelData[spIndex];
        var green = pixelData[spIndex + 1];
        var blue = pixelData[spIndex + 2];
        var alpha = pixelData[spIndex + 3];

        storedPixelData[index++] = red;
        storedPixelData[index++] = green;
        storedPixelData[index++] = blue;
        storedPixelData[index++] = alpha;
      }
    }
  }

  return storedPixelData;
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/isMouseButtonEnabled.js":
/*!**************************************!*\
  !*** ./util/isMouseButtonEnabled.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (which, mouseButtonMask) {
  var mouseButton = 1 << which - 1;

  return (mouseButtonMask & mouseButton) !== 0;
};

/***/ }),

/***/ "./util/makeUnselectable.js":
/*!**********************************!*\
  !*** ./util/makeUnselectable.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, ignorePointerEvents) {
  element.style.webkitUserSelect = 'none';
  element.style.webkitTouchCallout = 'none';
  element.style.mozUserSelect = 'none';
  element.style.msUserSelect = 'none';
  element.style.oUserSelect = 'none';
  element.style.khtmlUserSelect = 'none';
  element.style.userSelect = 'none';

  element.unselectable = 'on';
  element.oncontextmenu = function () {
    return false;
  };

  if (ignorePointerEvents === true) {
    element.style.pointerEvents = 'none';
  }
};

/***/ }),

/***/ "./util/pointInEllipse.js":
/*!********************************!*\
  !*** ./util/pointInEllipse.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ellipse, location) {
  var xRadius = ellipse.width / 2;
  var yRadius = ellipse.height / 2;

  if (xRadius <= 0.0 || yRadius <= 0.0) {
    return false;
  }

  var center = {
    x: ellipse.left + xRadius,
    y: ellipse.top + yRadius
  };

  /* This is a more general form of the circle equation
   *
   * X^2/a^2 + Y^2/b^2 <= 1
   */

  var normalized = {
    x: location.x - center.x,
    y: location.y - center.y
  };

  var inEllipse = normalized.x * normalized.x / (xRadius * xRadius) + normalized.y * normalized.y / (yRadius * yRadius) <= 1.0;

  return inEllipse;
};

/***/ }),

/***/ "./util/pointInFreehandROI.js":
/*!************************************!*\
  !*** ./util/pointInFreehandROI.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dataHandles, location) {
  // JPETTS - Calculates if "point" is inside the polygon defined by dataHandles by
  // Counting the number of times a ray originating from "point" crosses the
  // Edges of the polygon. Odd === inside, Even === outside.

  // The bool "inROI" flips every time ray originating from location and
  // Pointing to the right crosses a linesegment.
  var inROI = false;

  // Cycle round pairs of points
  var j = dataHandles.length - 1; // The last vertex is the previous one to the first

  for (var i = 0; i < dataHandles.length; i++) {
    // Check if y values of line encapsulate location.y
    if (isEnclosedY(location.y, dataHandles[i].y, dataHandles[j].y)) {
      if (isLineRightOfPoint(location, dataHandles[i], dataHandles[j])) {
        inROI = !inROI;
      }
    }

    j = i; // Here j is previous vertex to i
  }

  return inROI;
};

function isEnclosedY(yp, y1, y2) {
  if (y1 < yp && yp < y2 || y2 < yp && yp < y1) {
    return true;
  }

  return false;
}

function isLineRightOfPoint(point, lp1, lp2) {
  // If both right of point return true
  if (lp1.x > point.x && lp2.x > point.x) {
    return true;
  }
  // Put leftmost point in lp1
  if (lp1.x > lp2.x) {
    var lptemp = lp1;

    lp1 = lp2;
    lp2 = lptemp;
  }
  var lPointY = lineSegmentAtPoint(point, lp1, lp2);

  // If the lp1.x and lp2.x enclose point.x check gradient of line and see if
  // Point is above or below the line to calculate if it inside.
  if (Math.sign(lPointY.gradient) * point.y > lPointY.value) {
    return true;
  }

  return false;
}

function lineSegmentAtPoint(point, lp1, lp2) {
  var dydx = (lp2.y - lp1.y) / (lp2.x - lp1.x);
  var fx = {
    value: lp1.x + dydx * (point.x - lp1.x),
    gradient: dydx
  };

  return fx;
}

/***/ }),

/***/ "./util/pointInsideBoundingBox.js":
/*!****************************************!*\
  !*** ./util/pointInsideBoundingBox.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (handle, coords) {
  if (!handle.boundingBox) {
    return;
  }

  return _externalModules2.default.cornerstoneMath.point.insideRect(coords, handle.boundingBox);
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/pointProjector.js":
/*!********************************!*\
  !*** ./util/pointProjector.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectPatientPointToImagePlane = projectPatientPointToImagePlane;
exports.imagePointToPatientPoint = imagePointToPatientPoint;
exports.planePlaneIntersection = planePlaneIntersection;

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _convertToVector = __webpack_require__(/*! ../util/convertToVector3.js */ "./util/convertToVector3.js");

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Projects a patient point to an image point
function projectPatientPointToImagePlane(patientPoint, imagePlane) {
  var rowCosines = (0, _convertToVector2.default)(imagePlane.rowCosines);
  var columnCosines = (0, _convertToVector2.default)(imagePlane.columnCosines);
  var imagePositionPatient = (0, _convertToVector2.default)(imagePlane.imagePositionPatient);
  var point = patientPoint.clone().sub(imagePositionPatient);
  var x = rowCosines.dot(point) / imagePlane.columnPixelSpacing;
  var y = columnCosines.dot(point) / imagePlane.rowPixelSpacing;

  return {
    x: x,
    y: y
  };
}

// Projects an image point to a patient point
function imagePointToPatientPoint(imagePoint, imagePlane) {
  var rowCosines = (0, _convertToVector2.default)(imagePlane.rowCosines);
  var columnCosines = (0, _convertToVector2.default)(imagePlane.columnCosines);
  var imagePositionPatient = (0, _convertToVector2.default)(imagePlane.imagePositionPatient);

  var x = rowCosines.clone().multiplyScalar(imagePoint.x);

  x.multiplyScalar(imagePlane.columnPixelSpacing);
  var y = columnCosines.clone().multiplyScalar(imagePoint.y);

  y.multiplyScalar(imagePlane.rowPixelSpacing);
  var patientPoint = x.add(y);

  patientPoint.add(imagePositionPatient);

  return patientPoint;
}

function getRectangleFromImagePlane(imagePlane) {
  // Get the points
  var topLeft = imagePointToPatientPoint({
    x: 0,
    y: 0
  }, imagePlane);
  var topRight = imagePointToPatientPoint({
    x: imagePlane.columns,
    y: 0
  }, imagePlane);
  var bottomLeft = imagePointToPatientPoint({
    x: 0,
    y: imagePlane.rows
  }, imagePlane);
  var bottomRight = imagePointToPatientPoint({
    x: imagePlane.columns,
    y: imagePlane.rows
  }, imagePlane);

  // Get each side as a vector
  var rect = {
    top: new _externalModules2.default.cornerstoneMath.Line3(topLeft, topRight),
    left: new _externalModules2.default.cornerstoneMath.Line3(topLeft, bottomLeft),
    right: new _externalModules2.default.cornerstoneMath.Line3(topRight, bottomRight),
    bottom: new _externalModules2.default.cornerstoneMath.Line3(bottomLeft, bottomRight)
  };

  return rect;
}

function lineRectangleIntersection(line, rect) {
  var intersections = [];

  Object.keys(rect).forEach(function (side) {
    var segment = rect[side];
    var intersection = line.intersectLine(segment);

    if (intersection) {
      intersections.push(intersection);
    }
  });

  return intersections;
}

// Gets the line of intersection between two planes in patient space
function planePlaneIntersection(targetImagePlane, referenceImagePlane) {
  var targetRowCosines = (0, _convertToVector2.default)(targetImagePlane.rowCosines);
  var targetColumnCosines = (0, _convertToVector2.default)(targetImagePlane.columnCosines);
  var targetImagePositionPatient = (0, _convertToVector2.default)(targetImagePlane.imagePositionPatient);
  var referenceRowCosines = (0, _convertToVector2.default)(referenceImagePlane.rowCosines);
  var referenceColumnCosines = (0, _convertToVector2.default)(referenceImagePlane.columnCosines);
  var referenceImagePositionPatient = (0, _convertToVector2.default)(referenceImagePlane.imagePositionPatient);

  // First, get the normals of each image plane
  var targetNormal = targetRowCosines.clone().cross(targetColumnCosines);
  var targetPlane = new _externalModules2.default.cornerstoneMath.Plane();

  targetPlane.setFromNormalAndCoplanarPoint(targetNormal, targetImagePositionPatient);

  var referenceNormal = referenceRowCosines.clone().cross(referenceColumnCosines);
  var referencePlane = new _externalModules2.default.cornerstoneMath.Plane();

  referencePlane.setFromNormalAndCoplanarPoint(referenceNormal, referenceImagePositionPatient);

  var originDirection = referencePlane.clone().intersectPlane(targetPlane);
  var origin = originDirection.origin;
  var direction = originDirection.direction;

  // Calculate the longest possible length in the reference image plane (the length of the diagonal)
  var bottomRight = imagePointToPatientPoint({
    x: referenceImagePlane.columns,
    y: referenceImagePlane.rows
  }, referenceImagePlane);
  var distance = referenceImagePositionPatient.distanceTo(bottomRight);

  // Use this distance to bound the ray intersecting the two planes
  var line = new _externalModules2.default.cornerstoneMath.Line3();

  line.start = origin;
  line.end = origin.clone().add(direction.multiplyScalar(distance));

  // Find the intersections between this line and the reference image plane's four sides
  var rect = getRectangleFromImagePlane(referenceImagePlane);
  var intersections = lineRectangleIntersection(line, rect);

  // Return the intersections between this line and the reference image plane's sides
  // In order to draw the reference line from the target image.
  if (intersections.length !== 2) {
    return;
  }

  return {
    start: intersections[0],
    end: intersections[1]
  };
}

/***/ }),

/***/ "./util/roundToDecimal.js":
/*!********************************!*\
  !*** ./util/roundToDecimal.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value, precision) {
  var multiplier = Math.pow(10, precision);

  return Math.round(value * multiplier) / multiplier;
};

/***/ }),

/***/ "./util/scroll.js":
/*!************************!*\
  !*** ./util/scroll.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, images) {
  var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var allowSkipping = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var toolData = (0, _toolState.getToolState)(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var stackData = toolData.data[0];

  if (!stackData.pending) {
    stackData.pending = [];
  }

  var newImageIdIndex = stackData.currentImageIdIndex + images;

  if (loop) {
    var nbImages = stackData.imageIds.length;

    newImageIdIndex %= nbImages;
  } else {
    newImageIdIndex = Math.min(stackData.imageIds.length - 1, newImageIdIndex);
    newImageIdIndex = Math.max(0, newImageIdIndex);
  }

  if (allowSkipping) {
    (0, _scrollToIndex2.default)(element, newImageIdIndex);
  } else {
    var pendingEvent = {
      index: newImageIdIndex
    };

    stackData.pending.push(pendingEvent);
    scrollWithoutSkipping(stackData, pendingEvent, element);
  }
};

var _scrollToIndex = __webpack_require__(/*! ./scrollToIndex.js */ "./util/scrollToIndex.js");

var _scrollToIndex2 = _interopRequireDefault(_scrollToIndex);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollWithoutSkipping(stackData, pendingEvent, element) {
  if (stackData.pending[0] === pendingEvent) {
    if (stackData.currentImageIdIndex === pendingEvent.index) {
      stackData.pending.splice(stackData.pending.indexOf(pendingEvent), 1);

      if (stackData.pending.length > 0) {
        scrollWithoutSkipping(stackData, stackData.pending[0], element);
      }

      return;
    }

    var newImageHandler = function newImageHandler(event) {
      var index = stackData.imageIds.indexOf(event.detail.image.imageId);

      if (index === pendingEvent.index) {
        stackData.pending.splice(stackData.pending.indexOf(pendingEvent), 1);
        element.removeEventListener('cornerstonenewimage', newImageHandler);

        if (stackData.pending.length > 0) {
          scrollWithoutSkipping(stackData, stackData.pending[0], element);
        }
      }
    };

    element.addEventListener('cornerstonenewimage', newImageHandler);

    (0, _scrollToIndex2.default)(element, pendingEvent.index);
  }
}

/***/ }),

/***/ "./util/scrollToIndex.js":
/*!*******************************!*\
  !*** ./util/scrollToIndex.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, newImageIdIndex) {
  var toolData = (0, _toolState.getToolState)(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var cornerstone = _externalModules2.default.cornerstone;
  // If we have more than one stack, check if we have a stack renderer defined
  var stackRenderer = void 0;

  if (toolData.data.length > 1) {
    var stackRendererData = (0, _toolState.getToolState)(element, 'stackRenderer');

    if (stackRendererData && stackRendererData.data && stackRendererData.data.length) {
      stackRenderer = stackRendererData.data[0];
    }
  }

  var stackData = toolData.data[0];

  // Allow for negative indexing
  if (newImageIdIndex < 0) {
    newImageIdIndex += stackData.imageIds.length;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  function doneCallback(image) {
    if (stackData.currentImageIdIndex !== newImageIdIndex) {
      return;
    }

    // Check if the element is still enabled in Cornerstone,
    // If an error is thrown, stop here.
    try {
      // TODO: Add 'isElementEnabled' to Cornerstone?
      cornerstone.getEnabledElement(element);
    } catch (error) {
      return;
    }

    if (stackRenderer) {
      stackRenderer.currentImageIdIndex = newImageIdIndex;
      stackRenderer.render(element, toolData.data);
    } else {
      cornerstone.displayImage(element, image);
    }

    if (endLoadingHandler) {
      endLoadingHandler(element, image);
    }
  }

  function failCallback(error) {
    var imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(element, imageId, error);
    }
  }

  if (newImageIdIndex === stackData.currentImageIdIndex) {
    return;
  }

  if (startLoadingHandler) {
    startLoadingHandler(element);
  }

  var eventData = {
    newImageIdIndex: newImageIdIndex,
    direction: newImageIdIndex - stackData.currentImageIdIndex
  };

  stackData.currentImageIdIndex = newImageIdIndex;
  var newImageId = stackData.imageIds[newImageIdIndex];

  // Retry image loading in cases where previous image promise
  // Was rejected, if the option is set
  /*
     Const config = stackScroll.getConfiguration();
     TODO: Revisit this. It appears that Core's imageCache is not
    keeping rejected promises anywhere, so we have no way to know
    if something was previously rejected.
     if (config && config.retryLoadOnScroll === true) {
    }
  */

  // Convert the preventCache value in stack data to a boolean
  var preventCache = Boolean(stackData.preventCache);

  var imagePromise = void 0;

  if (preventCache) {
    imagePromise = cornerstone.loadImage(newImageId);
  } else {
    imagePromise = cornerstone.loadAndCacheImage(newImageId);
  }

  imagePromise.then(doneCallback, failCallback);
  // Make sure we kick off any changed download request pools
  _requestPoolManager2.default.startGrabbing();

  (0, _triggerEvent2.default)(element, _events2.default.STACK_SCROLL, eventData);
};

var _events = __webpack_require__(/*! ../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(/*! ../stateManagement/toolState.js */ "./stateManagement/toolState.js");

var _requestPoolManager = __webpack_require__(/*! ../requestPool/requestPoolManager.js */ "./requestPool/requestPoolManager.js");

var _requestPoolManager2 = _interopRequireDefault(_requestPoolManager);

var _loadHandlerManager = __webpack_require__(/*! ../stateManagement/loadHandlerManager.js */ "./stateManagement/loadHandlerManager.js");

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _triggerEvent = __webpack_require__(/*! ../util/triggerEvent.js */ "./util/triggerEvent.js");

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/setContextToDisplayFontSize.js":
/*!*********************************************!*\
  !*** ./util/setContextToDisplayFontSize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (enabledElement, context, fontSize) {
  var fontScale = 0.1;

  _externalModules2.default.cornerstone.setToPixelCoordinateSystem(enabledElement, context, fontScale);
  // Return the font size to use
  var scaledFontSize = fontSize / enabledElement.viewport.scale / fontScale;
  // TODO: actually calculate this?
  var lineHeight = fontSize / enabledElement.viewport.scale / fontScale;

  return {
    fontSize: scaledFontSize,
    lineHeight: lineHeight,
    fontScale: fontScale
  };
};

var _externalModules = __webpack_require__(/*! ../externalModules.js */ "./externalModules.js");

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./util/triggerEvent.js":
/*!******************************!*\
  !*** ./util/triggerEvent.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerEvent;
/**
 * Trigger a CustomEvent
 *
 * @param {EventTarget} el The element or EventTarget to trigger the event upon
 * @param {String} type The event type name
 * @param {Object|null} detail=null The event data to be sent
 * @returns {Boolean} The return value is false if at least one event listener called preventDefault(). Otherwise it returns true.
 */
function triggerEvent(el, type) {
  var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var event = void 0;

  // This check is needed to polyfill CustomEvent on IE11-
  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(type, {
      detail: detail,
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, detail);
  }

  return el.dispatchEvent(event);
}

/***/ }),

/***/ "./version.js":
/*!********************!*\
  !*** ./version.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '2.3.2';

/***/ })

/******/ });
});
//# sourceMappingURL=cornerstoneTools.js.map