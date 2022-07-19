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
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["className"];
var componentName = 'CreateTearsheetDivider';
var blockClass = "".concat(settings.pkg.prefix, "--tearsheet-create__section--divider"); // eslint-disable-next-line react/display-name

exports.CreateTearsheetDivider = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React__default["default"].createElement("span", _rollupPluginBabelHelpers["extends"]({}, rest, {
    ref: ref,
    className: cx__default["default"](blockClass, className)
  }));
}); // Return a placeholder if not released and not enabled by feature flag

exports.CreateTearsheetDivider = settings.pkg.checkComponentEnabled(exports.CreateTearsheetDivider, componentName);
exports.CreateTearsheetDivider.propTypes = {
  /**
   * Sets an optional className to be added to the tearsheet step
   */
  className: PropTypes__default["default"].string
};
