/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import { pkg } from '../../settings.js';
import { OverflowMenuItem } from '@carbon/react';

var componentName = 'ButtonMenuItem'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * A menu item to include in a button menu component. This component has the
 * same props and behaviors as carbon OverflowMenuItem.
 */
// eslint-disable-next-line react/display-name

var ButtonMenuItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(OverflowMenuItem, _extends({}, props, {
    ref: ref
  }));
}); // Return a placeholder if not released and not enabled by feature flag

ButtonMenuItem = pkg.checkComponentEnabled(ButtonMenuItem, componentName);
ButtonMenuItem.propTypes = OverflowMenuItem.propTypes;

export { ButtonMenuItem };
