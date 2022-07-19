/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { slicedToArray as _slicedToArray, defineProperty as _defineProperty, objectSpread2 as _objectSpread2, createForOfIteratorHelper as _createForOfIteratorHelper, objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useResizeDetector } from 'react-resize-detector';
import { usePrefix, Button, ButtonSet } from '@carbon/react';
import { pkg } from '../../settings.js';
import { prepareProps } from '../../global/js/utils/props-helper.js';
import { ButtonMenu } from '../ButtonMenu/ButtonMenu.js';
import { ButtonMenuItem } from '../ButtonMenu/ButtonMenuItem.js';

var _excluded = ["buttons"],
    _excluded2 = ["label", "key", "kind"],
    _excluded3 = ["buttons"],
    _excluded4 = ["label", "key", "kind"];
var blockClass = "".concat(pkg.prefix, "--button-set-with-overflow");
var componentName = 'ButtonSetWithOverflow';
var buttonSize = 'md';
var ButtonSetWithOverflow = function ButtonSetWithOverflow(_ref) {
  var buttons = _ref.buttons,
      className = _ref.className,
      onWidthChange = _ref.onWidthChange,
      buttonSetOverflowLabel = _ref.buttonSetOverflowLabel,
      menuOptionsClass = _ref.menuOptionsClass,
      rightAlign = _ref.rightAlign;
  var carbonPrefix = usePrefix();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showAsOverflow = _useState2[0],
      setShowAsOverflow = _useState2[1];

  var spaceAvailableRef = useRef(null);
  var sizingContainerRefSet = useRef(null);
  var sizingContainerRefCombo = useRef(null);
  var sizes = useRef({});
  /**
   * checkFullyVisibleItems determines display count based on space available and width of pageActions
   *
   * ButtonSetWithOverflow switches between a Carbon ButtonSet and use of the ButtonMenu component depending
   * on the space available. While there is sufficient space to show all of the buttons side by side the
   * ButtonSet is used, once this is no longer the case it switches to a ButtonMenu.
   *
   */

  var checkFullyVisibleItems = function checkFullyVisibleItems() {
    var _spaceAvailableRef$cu, _sizingContainerRefSe, _sizingContainerRefCo;

    var spaceAvailable = (_spaceAvailableRef$cu = spaceAvailableRef.current) === null || _spaceAvailableRef$cu === void 0 ? void 0 : _spaceAvailableRef$cu.offsetWidth;
    var newShowAsOverflow = true; // get all the hidden sizing buttons

    var sizingSet = (_sizingContainerRefSe = sizingContainerRefSet.current) === null || _sizingContainerRefSe === void 0 ? void 0 : _sizingContainerRefSe.querySelectorAll(".".concat(carbonPrefix, "--btn")); // calculate total width of button set

    var sizingSetTotalSize = 0;

    var _iterator = _createForOfIteratorHelper(sizingSet),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        sizingSetTotalSize += item.offsetWidth;
      } // check ButtonMenu size

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var sizingComboSize = (_sizingContainerRefCo = sizingContainerRefCombo.current) === null || _sizingContainerRefCo === void 0 ? void 0 : _sizingContainerRefCo.offsetWidth;

    if (onWidthChange && (sizes.current.minWidth !== sizingComboSize || sizes.current.maxWidth !== sizingSetTotalSize)) {
      sizes.current.minWidth = sizingComboSize;
      sizes.current.maxWidth = sizingSetTotalSize; // report min and max width required to host

      onWidthChange(_objectSpread2({}, sizes.current));
    } // only if space available use ButtonSet.


    if (sizingSetTotalSize <= spaceAvailable) {
      newShowAsOverflow = false;
    }

    setShowAsOverflow(newShowAsOverflow);
  };

  useEffect(function () {
    checkFullyVisibleItems(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttons]); // eslint-disable-next-line react/display-name

  var AButtonSet = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
    var buttons = _ref2.buttons,
        rest = _objectWithoutProperties(_ref2, _excluded);

    return /*#__PURE__*/React.createElement(ButtonSet, _extends({}, rest, {
      ref: ref
    }), buttons.map(function (_ref3) {
      var label = _ref3.label,
          key = _ref3.key,
          kind = _ref3.kind,
          other = _objectWithoutProperties(_ref3, _excluded2);

      /* istanbul ignore next */
      var usedKind = kind || 'primary';
      return /*#__PURE__*/React.createElement(Button, _extends({
        key: key && "button-set-".concat(key),
        kind: usedKind
      }, other, {
        size: buttonSize,
        type: "button"
      }), label);
    }));
  }); // eslint-disable-next-line react/display-name

  var AButtonMenu = /*#__PURE__*/React.forwardRef(function (_ref4, ref) {
    var buttons = _ref4.buttons,
        rest = _objectWithoutProperties(_ref4, _excluded3);

    return /*#__PURE__*/React.createElement(ButtonMenu, _extends({}, rest, {
      ref: ref,
      label: buttonSetOverflowLabel,
      menuAriaLabel: buttonSetOverflowLabel
    }), buttons.map(function (_ref5) {
      var label = _ref5.label,
          key = _ref5.key,
          kind = _ref5.kind,
          other = _objectWithoutProperties(_ref5, _excluded4);

      return /*#__PURE__*/React.createElement(ButtonMenuItem, _extends({
        key: key && "button-menu-".concat(key),
        isDelete: kind === null || kind === void 0 ? void 0 : kind.startsWith('danger'),
        itemText: label
      }, prepareProps(other, ['iconDescription', 'renderIcon'])));
    }).reverse());
  });
  useResizeDetector({
    onResize: checkFullyVisibleItems,
    targetRef: sizingContainerRefSet
  });
  useResizeDetector({
    onResize: checkFullyVisibleItems,
    targetRef: sizingContainerRefCombo
  });
  useResizeDetector({
    onResize: checkFullyVisibleItems,
    targetRef: spaceAvailableRef,
    handleWidth: true
  });
  return /*#__PURE__*/React.createElement("div", {
    className: cx([blockClass, className, _defineProperty({}, "".concat(blockClass, "--right"), rightAlign)]),
    ref: spaceAvailableRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__button-container ").concat(blockClass, "__button-container--hidden")
  }, /*#__PURE__*/React.createElement(AButtonSet, {
    "aria-hidden": true,
    ref: sizingContainerRefSet,
    size: buttonSize,
    buttons: buttons
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__button-container ").concat(blockClass, "__button-container--hidden"),
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement(AButtonMenu, {
    menuOptionsClass: menuOptionsClass,
    ref: sizingContainerRefCombo,
    buttons: buttons,
    size: buttonSize
  })), showAsOverflow ? /*#__PURE__*/React.createElement(AButtonMenu, {
    buttons: buttons,
    size: buttonSize,
    menuOptionsClass: menuOptionsClass
  }) : /*#__PURE__*/React.createElement(AButtonSet, {
    className: "".concat(blockClass, "__button-container"),
    size: buttonSize,
    buttons: buttons
  }));
};
ButtonSetWithOverflow.propTypes = {
  /**
   *  buttonSetOverflowLabel - used when button set is shown as combo button
   */
  buttonSetOverflowLabel: PropTypes.node.isRequired,

  /**
   * Specifies the buttons for the ButtonSetWithOverflow. Each item is specified as an object
   * with the properties of a Carbon Button plus a label.
   *
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  buttons: PropTypes.arrayOf(PropTypes.shape(_objectSpread2(_objectSpread2({}, Button.propTypes), {}, {
    key: PropTypes.string.isRequired,
    kind: Button.propTypes.kind,
    label: PropTypes.node,
    onClick: PropTypes.func
  }))).isRequired,

  /**
   * className
   */
  className: PropTypes.string,

  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,

  /**
   * onResize reports maxSize on resize
   */
  onWidthChange: PropTypes.func,

  /**
   * align buttons to right of available space
   */
  rightAlign: PropTypes.bool
};
ButtonSetWithOverflow.displayName = componentName;

export { ButtonSetWithOverflow };
