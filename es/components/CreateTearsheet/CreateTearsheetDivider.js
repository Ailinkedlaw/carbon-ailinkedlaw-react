/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings.js';

var _excluded = ["className"];
var componentName = 'CreateTearsheetDivider';
var blockClass = "".concat(pkg.prefix, "--tearsheet-create__section--divider"); // eslint-disable-next-line react/display-name

var CreateTearsheetDivider = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    ref: ref,
    className: cx(blockClass, className)
  }));
}); // Return a placeholder if not released and not enabled by feature flag

CreateTearsheetDivider = pkg.checkComponentEnabled(CreateTearsheetDivider, componentName);
CreateTearsheetDivider.propTypes = {
  /**
   * Sets an optional className to be added to the tearsheet step
   */
  className: PropTypes.string
};

export { CreateTearsheetDivider };
