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
var settings = require('../../settings.js');
var react = require('@carbon/react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var componentName = 'ButtonMenuItem'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * A menu item to include in a button menu component. This component has the
 * same props and behaviors as carbon OverflowMenuItem.
 */
// eslint-disable-next-line react/display-name

exports.ButtonMenuItem = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default["default"].createElement(react.OverflowMenuItem, _rollupPluginBabelHelpers["extends"]({}, props, {
    ref: ref
  }));
}); // Return a placeholder if not released and not enabled by feature flag

exports.ButtonMenuItem = settings.pkg.checkComponentEnabled(exports.ButtonMenuItem, componentName);
exports.ButtonMenuItem.propTypes = react.OverflowMenuItem.propTypes;
