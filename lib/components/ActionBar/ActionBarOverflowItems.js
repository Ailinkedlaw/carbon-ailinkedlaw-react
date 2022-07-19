/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var cx = require('classnames');
var react = require('@carbon/react');
var uuidv4 = require('../../global/js/utils/uuidv4.js');
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

// Copyright IBM Corp. 2020, 2021
var blockClass = "".concat(settings.pkg.prefix, "--action-bar-overflow-items");
var componentName = 'ActionBar';
var ActionBarOverflowItems = function ActionBarOverflowItems(_ref) {
  var className = _ref.className,
      menuOptionsClass = _ref.menuOptionsClass,
      overflowItems = _ref.overflowItems,
      overflowAriaLabel = _ref.overflowAriaLabel;
  var internalId = React.useRef(uuidv4["default"]());
  return /*#__PURE__*/React__default["default"].createElement(react.OverflowMenu, {
    ariaLabel: overflowAriaLabel,
    className: cx__default["default"](blockClass, className),
    direction: "bottom",
    flipped: true,
    iconDescription: overflowAriaLabel // also needs setting to avoid a11y "Accessible name does not match or contain the visible label text"
    ,
    menuOptionsClass: cx__default["default"]("".concat(blockClass, "__options"), menuOptionsClass)
  }, React__default["default"].Children.map(overflowItems, function (item, index) {
    // This uses a copy of a menu item option
    // NOTE: Cannot use a real Tooltip icon below as it uses a <button /> the
    // div equivalent below is based on Carbon 10.25.0
    var ItemIcon = item.props.renderIcon;
    return /*#__PURE__*/React__default["default"].createElement(react.OverflowMenuItem, {
      className: "".concat(blockClass, "__item"),
      itemText: /*#__PURE__*/React__default["default"].createElement("div", {
        className: "".concat(blockClass, "__item-content"),
        "aria-describedby": "".concat(internalId.current, "-").concat(index, "--item-label")
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: "".concat(blockClass, "__item-label"),
        id: "".concat(internalId.current, "-").concat(index, "--item-label")
      }, item.props.label), typeof item.props.renderIcon === 'function' ? /*#__PURE__*/React__default["default"].createElement(ItemIcon, null) : item.props.renderIcon)
    });
  }));
};
ActionBarOverflowItems.displayName = componentName;
ActionBarOverflowItems.propTypes = {
  // expects action bar item as array or in fragment,

  /**
   * className
   */
  className: PropTypes__default["default"].string,

  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes__default["default"].string,

  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: PropTypes__default["default"].string,

  /**
   * overflowItems: items to bre shown in the ActionBar overflow menu
   */
  overflowItems: PropTypes__default["default"].arrayOf(PropTypes__default["default"].element)
};

exports.ActionBarOverflowItems = ActionBarOverflowItems;
