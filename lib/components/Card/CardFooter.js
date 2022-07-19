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
var react = require('@carbon/react');
var PropTypes = require('prop-types');
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var componentName = 'CardFooter';
var defaults = {
  actions: Object.freeze([]),
  primaryButtonKind: 'primary',
  productive: false,
  secondaryButtonKind: 'secondary'
};
var CardFooter = function CardFooter(_ref) {
  var _ref$actions = _ref.actions,
      actions = _ref$actions === void 0 ? defaults.actions : _ref$actions,
      hasActions = _ref.hasActions,
      hasButton = _ref.hasButton,
      onPrimaryButtonClick = _ref.onPrimaryButtonClick,
      onSecondaryButtonClick = _ref.onSecondaryButtonClick,
      primaryButtonHref = _ref.primaryButtonHref,
      primaryButtonIcon = _ref.primaryButtonIcon,
      _ref$primaryButtonKin = _ref.primaryButtonKind,
      primaryButtonKind = _ref$primaryButtonKin === void 0 ? defaults.primaryButtonKind : _ref$primaryButtonKin,
      primaryButtonText = _ref.primaryButtonText,
      _ref$productive = _ref.productive,
      productive = _ref$productive === void 0 ? defaults.productive : _ref$productive,
      secondaryButtonHref = _ref.secondaryButtonHref,
      secondaryButtonIcon = _ref.secondaryButtonIcon,
      _ref$secondaryButtonK = _ref.secondaryButtonKind,
      secondaryButtonKind = _ref$secondaryButtonK === void 0 ? defaults.secondaryButtonKind : _ref$secondaryButtonK,
      secondaryButtonText = _ref.secondaryButtonText;
  var blockClass = "".concat(settings.pkg.prefix, "--card");
  var footerClass = "".concat(settings.pkg.prefix, "--card__footer");
  var footerClasses = cx__default["default"](footerClass, _rollupPluginBabelHelpers.defineProperty({}, "".concat(footerClass, "-no-button"), !hasButton));
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: footerClasses
  }, secondaryButtonText && /*#__PURE__*/React__default["default"].createElement(react.Button, {
    kind: secondaryButtonKind,
    onClick: onSecondaryButtonClick,
    size: "md",
    renderIcon: secondaryButtonIcon,
    href: secondaryButtonHref
  }, secondaryButtonText), primaryButtonText && /*#__PURE__*/React__default["default"].createElement(react.Button, {
    kind: productive ? 'ghost' : primaryButtonKind,
    onClick: onPrimaryButtonClick,
    size: "md",
    renderIcon: primaryButtonIcon,
    href: primaryButtonHref
  }, primaryButtonText), hasActions && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__actions")
  }, actions));
};
CardFooter.propTypes = {
  actions: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].node]),
  hasActions: PropTypes__default["default"].bool,
  hasButton: PropTypes__default["default"].bool,
  onPrimaryButtonClick: PropTypes__default["default"].func,
  onSecondaryButtonClick: PropTypes__default["default"].func,
  primaryButtonHref: PropTypes__default["default"].string,
  primaryButtonIcon: PropTypes__default["default"].string,
  primaryButtonKind: PropTypes__default["default"].oneOf(['primary', 'ghost']),
  primaryButtonText: PropTypes__default["default"].string,
  productive: PropTypes__default["default"].bool,
  secondaryButtonHref: PropTypes__default["default"].string,
  secondaryButtonIcon: PropTypes__default["default"].string,
  secondaryButtonKind: PropTypes__default["default"].oneOf(['secondary', 'ghost']),
  secondaryButtonText: PropTypes__default["default"].string
};
CardFooter.displayName = componentName;

exports.CardFooter = CardFooter;
