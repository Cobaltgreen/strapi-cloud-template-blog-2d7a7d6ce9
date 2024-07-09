import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["prefixCls", "src", "alt", "onClose", "visible", "icons", "rootClassName", "getContainer", "countRender", "scaleStep", "transitionName", "maskTransitionName"];
import classnames from 'classnames';
import Dialog from 'rc-dialog';
import addEventListener from "rc-util/es/Dom/addEventListener";
import KeyCode from "rc-util/es/KeyCode";
import { warning } from "rc-util/es/warning";
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import getFixScaleEleTransPosition from "./getFixScaleEleTransPosition";
import useImageTransform from "./hooks/useImageTransform";
import Operations from "./Operations";
import { BASE_SCALE_RATIO, WHEEL_MAX_SCALE_RATIO } from "./previewConfig";
import { context } from "./PreviewGroup";
var Preview = function Preview(props) {
  var prefixCls = props.prefixCls,
    src = props.src,
    alt = props.alt,
    onClose = props.onClose,
    visible = props.visible,
    _props$icons = props.icons,
    icons = _props$icons === void 0 ? {} : _props$icons,
    rootClassName = props.rootClassName,
    getContainer = props.getContainer,
    countRender = props.countRender,
    _props$scaleStep = props.scaleStep,
    scaleStep = _props$scaleStep === void 0 ? 0.5 : _props$scaleStep,
    _props$transitionName = props.transitionName,
    transitionName = _props$transitionName === void 0 ? 'zoom' : _props$transitionName,
    _props$maskTransition = props.maskTransitionName,
    maskTransitionName = _props$maskTransition === void 0 ? 'fade' : _props$maskTransition,
    restProps = _objectWithoutProperties(props, _excluded);
  var imgRef = useRef();
  var downPositionRef = useRef({
    deltaX: 0,
    deltaY: 0,
    transformX: 0,
    transformY: 0
  });
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMoving = _useState2[0],
    setMoving = _useState2[1];
  var _useContext = useContext(context),
    previewUrls = _useContext.previewUrls,
    current = _useContext.current,
    isPreviewGroup = _useContext.isPreviewGroup,
    setCurrent = _useContext.setCurrent;
  var previewGroupCount = previewUrls.size;
  var previewUrlsKeys = Array.from(previewUrls.keys());
  var currentPreviewIndex = previewUrlsKeys.indexOf(current);
  var combinationSrc = isPreviewGroup ? previewUrls.get(current) : src;
  var showLeftOrRightSwitches = isPreviewGroup && previewGroupCount > 1;
  var showOperationsProgress = isPreviewGroup && previewGroupCount >= 1;
  var _useImageTransform = useImageTransform(imgRef),
    transform = _useImageTransform.transform,
    resetTransform = _useImageTransform.resetTransform,
    updateTransform = _useImageTransform.updateTransform,
    dispatchZoomChange = _useImageTransform.dispatchZoomChange;
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    enableTransition = _useState4[0],
    setEnableTransition = _useState4[1];
  var rotate = transform.rotate,
    scale = transform.scale;
  var wrapClassName = classnames(_defineProperty({}, "".concat(prefixCls, "-moving"), isMoving));
  useEffect(function () {
    if (!enableTransition) {
      setEnableTransition(true);
    }
  }, [enableTransition]);
  var onAfterClose = function onAfterClose() {
    resetTransform();
  };
  var onZoomIn = function onZoomIn() {
    dispatchZoomChange(BASE_SCALE_RATIO + scaleStep);
  };
  var onZoomOut = function onZoomOut() {
    dispatchZoomChange(BASE_SCALE_RATIO - scaleStep);
  };
  var onRotateRight = function onRotateRight() {
    updateTransform({
      rotate: rotate + 90
    });
  };
  var onRotateLeft = function onRotateLeft() {
    updateTransform({
      rotate: rotate - 90
    });
  };
  var onFlipX = function onFlipX() {
    updateTransform({
      flipX: !transform.flipX
    });
  };
  var onFlipY = function onFlipY() {
    updateTransform({
      flipY: !transform.flipY
    });
  };
  var onSwitchLeft = function onSwitchLeft(event) {
    event.preventDefault();
    event.stopPropagation();
    if (currentPreviewIndex > 0) {
      setEnableTransition(false);
      resetTransform();
      setCurrent(previewUrlsKeys[currentPreviewIndex - 1]);
    }
  };
  var onSwitchRight = function onSwitchRight(event) {
    event.preventDefault();
    event.stopPropagation();
    if (currentPreviewIndex < previewGroupCount - 1) {
      setEnableTransition(false);
      resetTransform();
      setCurrent(previewUrlsKeys[currentPreviewIndex + 1]);
    }
  };
  var onMouseUp = function onMouseUp() {
    if (visible && isMoving) {
      setMoving(false);

      /** No need to restore the position when the picture is not moved, So as not to interfere with the click */
      var _downPositionRef$curr = downPositionRef.current,
        transformX = _downPositionRef$curr.transformX,
        transformY = _downPositionRef$curr.transformY;
      var hasChangedPosition = transform.x !== transformX && transform.y !== transformY;
      if (!hasChangedPosition) {
        return;
      }
      var width = imgRef.current.offsetWidth * scale;
      var height = imgRef.current.offsetHeight * scale;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      var _imgRef$current$getBo = imgRef.current.getBoundingClientRect(),
        left = _imgRef$current$getBo.left,
        top = _imgRef$current$getBo.top;
      var isRotate = rotate % 180 !== 0;
      var fixState = getFixScaleEleTransPosition(isRotate ? height : width, isRotate ? width : height, left, top);
      if (fixState) {
        updateTransform(_objectSpread({}, fixState));
      }
    }
  };
  var onMouseDown = function onMouseDown(event) {
    // Only allow main button
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    downPositionRef.current = {
      deltaX: event.pageX - transform.x,
      deltaY: event.pageY - transform.y,
      transformX: transform.x,
      transformY: transform.y
    };
    setMoving(true);
  };
  var onMouseMove = function onMouseMove(event) {
    if (visible && isMoving) {
      updateTransform({
        x: event.pageX - downPositionRef.current.deltaX,
        y: event.pageY - downPositionRef.current.deltaY
      });
    }
  };
  var onWheel = function onWheel(event) {
    if (!visible || event.deltaY == 0) return;
    // Scale ratio depends on the deltaY size
    var scaleRatio = Math.abs(event.deltaY / 100);
    // Limit the maximum scale ratio
    var mergedScaleRatio = Math.min(scaleRatio, WHEEL_MAX_SCALE_RATIO);
    // Scale the ratio each time
    var ratio = BASE_SCALE_RATIO + mergedScaleRatio * scaleStep;
    if (event.deltaY > 0) {
      ratio = BASE_SCALE_RATIO / ratio;
    }
    dispatchZoomChange(ratio, event.clientX, event.clientY);
  };
  var onKeyDown = useCallback(function (event) {
    if (!visible || !showLeftOrRightSwitches) return;
    if (event.keyCode === KeyCode.LEFT) {
      if (currentPreviewIndex > 0) {
        setCurrent(previewUrlsKeys[currentPreviewIndex - 1]);
      }
    } else if (event.keyCode === KeyCode.RIGHT) {
      if (currentPreviewIndex < previewGroupCount - 1) {
        setCurrent(previewUrlsKeys[currentPreviewIndex + 1]);
      }
    }
  }, [currentPreviewIndex, previewGroupCount, previewUrlsKeys, setCurrent, showLeftOrRightSwitches, visible]);
  var onDoubleClick = function onDoubleClick(event) {
    if (visible) {
      if (scale !== 1) {
        updateTransform({
          x: 0,
          y: 0,
          scale: 1
        });
      } else {
        dispatchZoomChange(BASE_SCALE_RATIO + scaleStep, event.clientX, event.clientY);
      }
    }
  };
  useEffect(function () {
    var onTopMouseUpListener;
    var onTopMouseMoveListener;
    var onMouseUpListener = addEventListener(window, 'mouseup', onMouseUp, false);
    var onMouseMoveListener = addEventListener(window, 'mousemove', onMouseMove, false);
    var onKeyDownListener = addEventListener(window, 'keydown', onKeyDown, false);
    try {
      // Resolve if in iframe lost event
      /* istanbul ignore next */
      if (window.top !== window.self) {
        onTopMouseUpListener = addEventListener(window.top, 'mouseup', onMouseUp, false);
        onTopMouseMoveListener = addEventListener(window.top, 'mousemove', onMouseMove, false);
      }
    } catch (error) {
      /* istanbul ignore next */
      warning(false, "[rc-image] ".concat(error));
    }
    return function () {
      var _onTopMouseUpListener, _onTopMouseMoveListen;
      onMouseUpListener.remove();
      onMouseMoveListener.remove();
      onKeyDownListener.remove();
      /* istanbul ignore next */
      (_onTopMouseUpListener = onTopMouseUpListener) === null || _onTopMouseUpListener === void 0 ? void 0 : _onTopMouseUpListener.remove();
      /* istanbul ignore next */
      (_onTopMouseMoveListen = onTopMouseMoveListener) === null || _onTopMouseMoveListen === void 0 ? void 0 : _onTopMouseMoveListen.remove();
    };
  }, [visible, isMoving, onKeyDown]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dialog, _extends({
    transitionName: transitionName,
    maskTransitionName: maskTransitionName,
    closable: false,
    keyboard: true,
    prefixCls: prefixCls,
    onClose: onClose,
    visible: visible,
    wrapClassName: wrapClassName,
    rootClassName: rootClassName,
    getContainer: getContainer
  }, restProps, {
    afterClose: onAfterClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-img-wrapper")
  }, /*#__PURE__*/React.createElement("img", {
    width: props.width,
    height: props.height,
    onWheel: onWheel,
    onMouseDown: onMouseDown,
    onDoubleClick: onDoubleClick,
    ref: imgRef,
    className: "".concat(prefixCls, "-img"),
    src: combinationSrc,
    alt: alt,
    style: {
      transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0) scale3d(").concat(transform.flipX ? '-' : '').concat(scale, ", ").concat(transform.flipY ? '-' : '').concat(scale, ", 1) rotate(").concat(rotate, "deg)"),
      transitionDuration: !enableTransition && '0s'
    }
  }))), /*#__PURE__*/React.createElement(Operations, {
    visible: visible,
    maskTransitionName: maskTransitionName,
    getContainer: getContainer,
    prefixCls: prefixCls,
    rootClassName: rootClassName,
    icons: icons,
    countRender: countRender,
    showSwitch: showLeftOrRightSwitches,
    showProgress: showOperationsProgress,
    current: currentPreviewIndex,
    count: previewGroupCount,
    scale: scale,
    onSwitchLeft: onSwitchLeft,
    onSwitchRight: onSwitchRight,
    onZoomIn: onZoomIn,
    onZoomOut: onZoomOut,
    onRotateRight: onRotateRight,
    onRotateLeft: onRotateLeft,
    onFlipX: onFlipX,
    onFlipY: onFlipY,
    onClose: onClose
  }));
};
export default Preview;