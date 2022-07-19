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
var react = require('@carbon/react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["label", "className"];

var componentName = 'ActionBarItem';
var blockClass = "".concat(settings.pkg.prefix, "--action-bar-item"); // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The ActionBarItem is used in the page header to populate the action bar
 */

exports.ActionBarItem = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var label = _ref.label,
      className = _ref.className,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React__default["default"].createElement(react.IconButton, _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, rest), {}, {
    ref: ref,
    className: cx__default["default"](blockClass, className),
    kind: 'ghost',
    size: 'md',
    align: 'bottom-right',
    type: 'button',
    label: label
  }));
}); // Return a placeholder if not released and not enabled by feature flag

exports.ActionBarItem = settings.pkg.checkComponentEnabled(exports.ActionBarItem, componentName); // Props the user cannot change

var reservedProps = ['kind', 'size', 'align', 'type']; // Base props on Carbon Button

var propTypes = _rollupPluginBabelHelpers.objectSpread2({}, react.IconButton.propTypes); // Remove reserved props


reservedProps.forEach(function (prop) {
  delete propTypes[prop];
});
exports.ActionBarItem.displayName = componentName;
exports.ActionBarItem.propTypes = _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, propTypes), {}, {
  /* ***************************************
  /
  /  The declarations below allow storybook & DocGen to produce documentation.
  /  Some or all of them may be inherited from the underlying Carbon component.
  /
  / ****************************************/

  /**
   * Specify an optional className to be added to your Button
   *
   * (inherited from Carbon Button)
   */
  className: PropTypes__default["default"].string,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   *
   * (inherited from Carbon Button)
   */
  label: PropTypes__default["default"].string,

  /**
   * Optional click handler
   *
   * (inherited from Carbon Button)
   */
  onClick: PropTypes__default["default"].func,

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   *
   * (inherited from Carbon Button)
   */
  renderIcon: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].object])
});
