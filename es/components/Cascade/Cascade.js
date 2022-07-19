/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef } from 'react';
import { Grid } from '@carbon/react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pkg } from '../../settings.js';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';

var _excluded = ["children", "className", "grid"];
var blockClass = "".concat(pkg.prefix, "--cascade");
var componentName = 'Cascade';
var defaults = {
  grid: false
};
var Cascade = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$grid = _ref.grid,
      grid = _ref$grid === void 0 ? defaults.grid : _ref$grid,
      rest = _objectWithoutProperties(_ref, _excluded);

  var props = _objectSpread2(_objectSpread2({}, rest), {}, {
    className: cx(blockClass, className),
    ref: ref
  }, getDevtoolsProps(componentName));

  var modifyChildren = function modifyChildren(child) {
    var className = cx(child.props.className, "".concat(blockClass, "__element"));
    return /*#__PURE__*/React.cloneElement(child, {
      className: className
    });
  };

  var getModifiedChildren = function getModifiedChildren() {
    return React.Children.map(children, function (child) {
      return modifyChildren(child);
    });
  };

  if (grid) {
    var colIdx = 0;
    var gridElm = React.Children.map(children, function (row) {
      var cols = React.Children.map(row.props.children, function (col) {
        colIdx = colIdx + 1;
        var colClassnames = cx(col.props.className, "".concat(blockClass, "__col"), "".concat(blockClass, "__col-").concat(colIdx));
        return /*#__PURE__*/React.cloneElement(col, {
          className: colClassnames
        });
      });
      return /*#__PURE__*/React.cloneElement(row, {
        children: cols
      });
    });
    return /*#__PURE__*/React.createElement("div", props, /*#__PURE__*/React.createElement(Grid, null, gridElm));
  }

  return /*#__PURE__*/React.createElement("div", props, getModifiedChildren());
});
Cascade = pkg.checkComponentEnabled(Cascade, componentName);
Cascade.displayName = componentName;
Cascade.propTypes = {
  /**
   * Main content that is shown.
   */
  children: PropTypes.node,

  /**
   * Optional class name.
   */
  className: PropTypes.string,

  /**
   * Specifies whether or not to wrap the child content in a <Grid />.
   * If this is set to true it's important that the children are being wrapped in rows in columns.
   * Check the documentation for additional clarification.
   */
  grid: PropTypes.bool
};

export { Cascade };
