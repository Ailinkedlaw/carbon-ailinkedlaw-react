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
var cx = require('classnames');
var PropTypes = require('prop-types');
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var componentName = 'CardHeader';
var defaults = {
  hasActions: false,
  titleSize: 'default'
};
var CardHeader = function CardHeader(_ref) {
  var _cx;

  var actions = _ref.actions,
      description = _ref.description,
      _ref$hasActions = _ref.hasActions,
      hasActions = _ref$hasActions === void 0 ? defaults.hasActions : _ref$hasActions,
      label = _ref.label,
      title = _ref.title,
      _ref$titleSize = _ref.titleSize,
      titleSize = _ref$titleSize === void 0 ? defaults.titleSize : _ref$titleSize;
  var blockClass = "".concat(settings.pkg.prefix, "--card");
  var headerClass = "".concat(blockClass, "__header");
  var headerClasses = cx__default["default"](headerClass, (_cx = {}, _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(headerClass, "-label-only"), label && !title && !description), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(headerClass, "-has-label"), !!label), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__title-lg"), titleSize === 'large'), _cx));
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: headerClasses
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(headerClass, "-container")
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__title-container")
  }, label && /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__label")
  }, label), title && /*#__PURE__*/React__default["default"].createElement("h6", {
    className: "".concat(blockClass, "__title")
  }, title), description && /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__description")
  }, description)), hasActions && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__actions ").concat(blockClass, "__actions-header")
  }, actions)));
};
CardHeader.propTypes = {
  actions: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].node]),
  description: PropTypes__default["default"].string,
  hasActions: PropTypes__default["default"].bool,
  label: PropTypes__default["default"].string,
  title: PropTypes__default["default"].string,
  titleSize: PropTypes__default["default"].oneOf(['default', 'large'])
};
CardHeader.displayName = componentName;

exports.CardHeader = CardHeader;
