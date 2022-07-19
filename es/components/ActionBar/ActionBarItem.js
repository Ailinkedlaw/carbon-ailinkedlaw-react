/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings.js';
import { IconButton } from '@carbon/react';

var _excluded = ["label", "className"];

var componentName = 'ActionBarItem';
var blockClass = "".concat(pkg.prefix, "--action-bar-item"); // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The ActionBarItem is used in the page header to populate the action bar
 */

var ActionBarItem = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(IconButton, _objectSpread2(_objectSpread2({}, rest), {}, {
    ref: ref,
    className: cx(blockClass, className),
    kind: 'ghost',
    size: 'md',
    align: 'bottom-right',
    type: 'button',
    label: label
  }));
}); // Return a placeholder if not released and not enabled by feature flag

ActionBarItem = pkg.checkComponentEnabled(ActionBarItem, componentName); // Props the user cannot change

var reservedProps = ['kind', 'size', 'align', 'type']; // Base props on Carbon Button

var propTypes = _objectSpread2({}, IconButton.propTypes); // Remove reserved props


reservedProps.forEach(function (prop) {
  delete propTypes[prop];
});
ActionBarItem.displayName = componentName;
ActionBarItem.propTypes = _objectSpread2(_objectSpread2({}, propTypes), {}, {
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
  className: PropTypes.string,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   *
   * (inherited from Carbon Button)
   */
  label: PropTypes.string,

  /**
   * Optional click handler
   *
   * (inherited from Carbon Button)
   */
  onClick: PropTypes.func,

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   *
   * (inherited from Carbon Button)
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
});

export { ActionBarItem };
