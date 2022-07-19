/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings.js';
import { usePrefix, OverflowMenu, Button } from '@carbon/react';

var _excluded = ["children", "className", "iconDescription", "kind", "label", "menuAriaLabel", "menuOptionsClass", "renderIcon", "size"];

var blockClass = "".concat(pkg.prefix, "--button-menu");
var componentName = 'ButtonMenu'; // NOTE: the component SCSS is not imported here: it is rolled up separately.
// Default values for props

var defaults = {
  size: 'lg',
  kind: 'primary'
};
/**
 * Combining a standard button with an overflow menu, this component appears
 * as a button and has all the usual carbon Button props and rendering, but
 * acts as an overflow menu when clicked. The ButtonMenu component can contain
 * zero to many ButtonMenuItem, which is identical to the carbon
 * OverflowMenuItem component.
 */

var ButtonMenu = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      iconDescription = _ref.iconDescription,
      _ref$kind = _ref.kind,
      kind = _ref$kind === void 0 ? defaults.kind : _ref$kind,
      label = _ref.label,
      menuAriaLabel = _ref.menuAriaLabel,
      menuOptionsClass = _ref.menuOptionsClass,
      Icon = _ref.renderIcon,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? defaults.size : _ref$size,
      rest = _objectWithoutProperties(_ref, _excluded);

  var carbonPrefix = usePrefix();
  return /*#__PURE__*/React.createElement(OverflowMenu, _extends({}, rest, {
    className: cx(blockClass, // Apply the block class to the main HTML element
    className // Apply any supplied class names to the main HTML element.
    ),
    ariaLabel: menuAriaLabel,
    menuOptionsClass: cx("".concat(blockClass, "__options"), menuOptionsClass),
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement("div", {
        className: cx(["".concat(blockClass, "__trigger"), "".concat(carbonPrefix, "--btn"), "".concat(carbonPrefix, "--btn--").concat(kind), "".concat(carbonPrefix, "--btn--").concat(size)])
      }, label, Icon && /*#__PURE__*/React.createElement(Icon, {
        "aria-hidden": "true",
        "aria-label": iconDescription,
        className: "".concat(carbonPrefix, "--btn__icon")
      }));
    },
    innerRef: ref
  }), children);
}); // Return a placeholder if not released and not enabled by feature flag

ButtonMenu = pkg.checkComponentEnabled(ButtonMenu, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

ButtonMenu.displayName = componentName; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

ButtonMenu.propTypes = {
  /**
   * Provide the contents of the ButtonMenu. This should be one or more
   * ButtonMenuItem components.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: Button.propTypes.iconDescription,

  /**
   * The three types the menu button supports: primary, tertiary and ghost.
   */
  kind: PropTypes.oneOf(['primary', 'tertiary', 'ghost']),

  /**
   * The button label for the menu trigger.
   */
  label: PropTypes.node,

  /**
   * Provide the ariaLabel prop to be passed to the OverflowMenu. This is distinctly
   * separate from `label` to support icon only ButtonMenus
   */
  menuAriaLabel: PropTypes.string.isRequired,

  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: Button.propTypes.renderIcon,

  /**
   * The size of the button for the menu trigger. The values can be any valid
   * value for the carbon Button component 'size' prop.
   */
  size: Button.propTypes.size
};

export { ButtonMenu };
