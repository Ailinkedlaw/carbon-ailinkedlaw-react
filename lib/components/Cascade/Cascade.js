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
var react = require('@carbon/react');
var cx = require('classnames');
var PropTypes = require('prop-types');
var settings = require('../../settings.js');
var devtools = require('../../global/js/utils/devtools.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var _excluded = ["children", "className", "grid"];
var blockClass = "".concat(settings.pkg.prefix, "--cascade");
var componentName = 'Cascade';
var defaults = {
  grid: false
};
exports.Cascade = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$grid = _ref.grid,
      grid = _ref$grid === void 0 ? defaults.grid : _ref$grid,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var props = _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, rest), {}, {
    className: cx__default["default"](blockClass, className),
    ref: ref
  }, devtools.getDevtoolsProps(componentName));

  var modifyChildren = function modifyChildren(child) {
    var className = cx__default["default"](child.props.className, "".concat(blockClass, "__element"));
    return /*#__PURE__*/React__default["default"].cloneElement(child, {
      className: className
    });
  };

  var getModifiedChildren = function getModifiedChildren() {
    return React__default["default"].Children.map(children, function (child) {
      return modifyChildren(child);
    });
  };

  if (grid) {
    var colIdx = 0;
    var gridElm = React__default["default"].Children.map(children, function (row) {
      var cols = React__default["default"].Children.map(row.props.children, function (col) {
        colIdx = colIdx + 1;
        var colClassnames = cx__default["default"](col.props.className, "".concat(blockClass, "__col"), "".concat(blockClass, "__col-").concat(colIdx));
        return /*#__PURE__*/React__default["default"].cloneElement(col, {
          className: colClassnames
        });
      });
      return /*#__PURE__*/React__default["default"].cloneElement(row, {
        children: cols
      });
    });
    return /*#__PURE__*/React__default["default"].createElement("div", props, /*#__PURE__*/React__default["default"].createElement(react.Grid, null, gridElm));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", props, getModifiedChildren());
});
exports.Cascade = settings.pkg.checkComponentEnabled(exports.Cascade, componentName);
exports.Cascade.displayName = componentName;
exports.Cascade.propTypes = {
  /**
   * Main content that is shown.
   */
  children: PropTypes__default["default"].node,

  /**
   * Optional class name.
   */
  className: PropTypes__default["default"].string,

  /**
   * Specifies whether or not to wrap the child content in a <Grid />.
   * If this is set to true it's important that the children are being wrapped in rows in columns.
   * Check the documentation for additional clarification.
   */
  grid: PropTypes__default["default"].bool
};
