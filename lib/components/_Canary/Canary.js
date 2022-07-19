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
var packageSettings = require('../../global/js/package-settings.js');
var react = require('@carbon/react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _p, _br, _p2, _br2, _p3;

var _excluded = ["className", "componentName"];

var blockClass = "".concat(packageSettings["default"].prefix, "--canary");
/**
 *  Canary component used when the component requested is not yet production
 */

var Canary = function Canary(_ref
/* , originalArgs*/
) {
  var className = _ref.className,
      componentName = _ref.componentName,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var instructions = "\nimport { pkg } from '@carbon/ibm-products';\n// NOTE: must happen before component is first used\npkg.component.".concat(componentName, " = true;\n");
  return /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({}, rest, {
    className: cx__default["default"](blockClass, className)
  }), /*#__PURE__*/React__default["default"].createElement("h2", null, "This component ", /*#__PURE__*/React__default["default"].createElement("strong", null, componentName), " is not ready yet."), _p || (_p = /*#__PURE__*/React__default["default"].createElement("p", null, "To enable it, initialize package flags before the component is first used.")), _br || (_br = /*#__PURE__*/React__default["default"].createElement("br", null)), _p2 || (_p2 = /*#__PURE__*/React__default["default"].createElement("p", null, "e.g. in main.js")), /*#__PURE__*/React__default["default"].createElement(react.CodeSnippet, {
    type: "multi"
  }, instructions), _br2 || (_br2 = /*#__PURE__*/React__default["default"].createElement("br", null)), _p3 || (_p3 = /*#__PURE__*/React__default["default"].createElement("p", null, "View a live example on", ' ', /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://codesandbox.io/s/example-component-olif5?file=/src/config.js"
  }, "codesandbox"), ".")));
};
Canary.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: PropTypes__default["default"].string,

  /** Name of the component that is not ready yet */
  componentName: PropTypes__default["default"].string.isRequired
};

exports.Canary = Canary;
