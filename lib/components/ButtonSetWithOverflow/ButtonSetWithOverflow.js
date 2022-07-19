/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var cx = require('classnames');
var reactResizeDetector = require('react-resize-detector');
var react = require('@carbon/react');
var settings = require('../../settings.js');
var propsHelper = require('../../global/js/utils/props-helper.js');
var ButtonMenu = require('../ButtonMenu/ButtonMenu.js');
var ButtonMenuItem = require('../ButtonMenu/ButtonMenuItem.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["buttons"],
    _excluded2 = ["label", "key", "kind"],
    _excluded3 = ["buttons"],
    _excluded4 = ["label", "key", "kind"];
var blockClass = "".concat(settings.pkg.prefix, "--button-set-with-overflow");
var componentName = 'ButtonSetWithOverflow';
var buttonSize = 'md';
var ButtonSetWithOverflow = function ButtonSetWithOverflow(_ref) {
  var buttons = _ref.buttons,
      className = _ref.className,
      onWidthChange = _ref.onWidthChange,
      buttonSetOverflowLabel = _ref.buttonSetOverflowLabel,
      menuOptionsClass = _ref.menuOptionsClass,
      rightAlign = _ref.rightAlign;
  var carbonPrefix = react.usePrefix();

  var _useState = React.useState(false),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      showAsOverflow = _useState2[0],
      setShowAsOverflow = _useState2[1];

  var spaceAvailableRef = React.useRef(null);
  var sizingContainerRefSet = React.useRef(null);
  var sizingContainerRefCombo = React.useRef(null);
  var sizes = React.useRef({});
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

    var _iterator = _rollupPluginBabelHelpers.createForOfIteratorHelper(sizingSet),
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

      onWidthChange(_rollupPluginBabelHelpers.objectSpread2({}, sizes.current));
    } // only if space available use ButtonSet.


    if (sizingSetTotalSize <= spaceAvailable) {
      newShowAsOverflow = false;
    }

    setShowAsOverflow(newShowAsOverflow);
  };

  React.useEffect(function () {
    checkFullyVisibleItems(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttons]); // eslint-disable-next-line react/display-name

  var AButtonSet = /*#__PURE__*/React__default["default"].forwardRef(function (_ref2, ref) {
    var buttons = _ref2.buttons,
        rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref2, _excluded);

    return /*#__PURE__*/React__default["default"].createElement(react.ButtonSet, _rollupPluginBabelHelpers["extends"]({}, rest, {
      ref: ref
    }), buttons.map(function (_ref3) {
      var label = _ref3.label,
          key = _ref3.key,
          kind = _ref3.kind,
          other = _rollupPluginBabelHelpers.objectWithoutProperties(_ref3, _excluded2);

      /* istanbul ignore next */
      var usedKind = kind || 'primary';
      return /*#__PURE__*/React__default["default"].createElement(react.Button, _rollupPluginBabelHelpers["extends"]({
        key: key && "button-set-".concat(key),
        kind: usedKind
      }, other, {
        size: buttonSize,
        type: "button"
      }), label);
    }));
  }); // eslint-disable-next-line react/display-name

  var AButtonMenu = /*#__PURE__*/React__default["default"].forwardRef(function (_ref4, ref) {
    var buttons = _ref4.buttons,
        rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref4, _excluded3);

    return /*#__PURE__*/React__default["default"].createElement(ButtonMenu.ButtonMenu, _rollupPluginBabelHelpers["extends"]({}, rest, {
      ref: ref,
      label: buttonSetOverflowLabel,
      menuAriaLabel: buttonSetOverflowLabel
    }), buttons.map(function (_ref5) {
      var label = _ref5.label,
          key = _ref5.key,
          kind = _ref5.kind,
          other = _rollupPluginBabelHelpers.objectWithoutProperties(_ref5, _excluded4);

      return /*#__PURE__*/React__default["default"].createElement(ButtonMenuItem.ButtonMenuItem, _rollupPluginBabelHelpers["extends"]({
        key: key && "button-menu-".concat(key),
        isDelete: kind === null || kind === void 0 ? void 0 : kind.startsWith('danger'),
        itemText: label
      }, propsHelper.prepareProps(other, ['iconDescription', 'renderIcon'])));
    }).reverse());
  });
  reactResizeDetector.useResizeDetector({
    onResize: checkFullyVisibleItems,
    targetRef: sizingContainerRefSet
  });
  reactResizeDetector.useResizeDetector({
    onResize: checkFullyVisibleItems,
    targetRef: sizingContainerRefCombo
  });
  reactResizeDetector.useResizeDetector({
    onResize: checkFullyVisibleItems,
    targetRef: spaceAvailableRef,
    handleWidth: true
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"]([blockClass, className, _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "--right"), rightAlign)]),
    ref: spaceAvailableRef
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__button-container ").concat(blockClass, "__button-container--hidden")
  }, /*#__PURE__*/React__default["default"].createElement(AButtonSet, {
    "aria-hidden": true,
    ref: sizingContainerRefSet,
    size: buttonSize,
    buttons: buttons
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__button-container ").concat(blockClass, "__button-container--hidden"),
    "aria-hidden": true
  }, /*#__PURE__*/React__default["default"].createElement(AButtonMenu, {
    menuOptionsClass: menuOptionsClass,
    ref: sizingContainerRefCombo,
    buttons: buttons,
    size: buttonSize
  })), showAsOverflow ? /*#__PURE__*/React__default["default"].createElement(AButtonMenu, {
    buttons: buttons,
    size: buttonSize,
    menuOptionsClass: menuOptionsClass
  }) : /*#__PURE__*/React__default["default"].createElement(AButtonSet, {
    className: "".concat(blockClass, "__button-container"),
    size: buttonSize,
    buttons: buttons
  }));
};
ButtonSetWithOverflow.propTypes = {
  /**
   *  buttonSetOverflowLabel - used when button set is shown as combo button
   */
  buttonSetOverflowLabel: PropTypes__default["default"].node.isRequired,

  /**
   * Specifies the buttons for the ButtonSetWithOverflow. Each item is specified as an object
   * with the properties of a Carbon Button plus a label.
   *
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  buttons: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, react.Button.propTypes), {}, {
    key: PropTypes__default["default"].string.isRequired,
    kind: react.Button.propTypes.kind,
    label: PropTypes__default["default"].node,
    onClick: PropTypes__default["default"].func
  }))).isRequired,

  /**
   * className
   */
  className: PropTypes__default["default"].string,

  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes__default["default"].string,

  /**
   * onResize reports maxSize on resize
   */
  onWidthChange: PropTypes__default["default"].func,

  /**
   * align buttons to right of available space
   */
  rightAlign: PropTypes__default["default"].bool
};
ButtonSetWithOverflow.displayName = componentName;

exports.ButtonSetWithOverflow = ButtonSetWithOverflow;
