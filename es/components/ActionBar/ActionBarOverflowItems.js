/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';
import uuidv4 from '../../global/js/utils/uuidv4.js';
import { pkg } from '../../settings.js';

// Copyright IBM Corp. 2020, 2021
var blockClass = "".concat(pkg.prefix, "--action-bar-overflow-items");
var componentName = 'ActionBar';
var ActionBarOverflowItems = function ActionBarOverflowItems(_ref) {
  var className = _ref.className,
      menuOptionsClass = _ref.menuOptionsClass,
      overflowItems = _ref.overflowItems,
      overflowAriaLabel = _ref.overflowAriaLabel;
  var internalId = useRef(uuidv4());
  return /*#__PURE__*/React.createElement(OverflowMenu, {
    ariaLabel: overflowAriaLabel,
    className: cx(blockClass, className),
    direction: "bottom",
    flipped: true,
    iconDescription: overflowAriaLabel // also needs setting to avoid a11y "Accessible name does not match or contain the visible label text"
    ,
    menuOptionsClass: cx("".concat(blockClass, "__options"), menuOptionsClass)
  }, React.Children.map(overflowItems, function (item, index) {
    // This uses a copy of a menu item option
    // NOTE: Cannot use a real Tooltip icon below as it uses a <button /> the
    // div equivalent below is based on Carbon 10.25.0
    var ItemIcon = item.props.renderIcon;
    return /*#__PURE__*/React.createElement(OverflowMenuItem, {
      className: "".concat(blockClass, "__item"),
      itemText: /*#__PURE__*/React.createElement("div", {
        className: "".concat(blockClass, "__item-content"),
        "aria-describedby": "".concat(internalId.current, "-").concat(index, "--item-label")
      }, /*#__PURE__*/React.createElement("span", {
        className: "".concat(blockClass, "__item-label"),
        id: "".concat(internalId.current, "-").concat(index, "--item-label")
      }, item.props.label), typeof item.props.renderIcon === 'function' ? /*#__PURE__*/React.createElement(ItemIcon, null) : item.props.renderIcon)
    });
  }));
};
ActionBarOverflowItems.displayName = componentName;
ActionBarOverflowItems.propTypes = {
  // expects action bar item as array or in fragment,

  /**
   * className
   */
  className: PropTypes.string,

  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,

  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: PropTypes.string,

  /**
   * overflowItems: items to bre shown in the ActionBar overflow menu
   */
  overflowItems: PropTypes.arrayOf(PropTypes.element)
};

export { ActionBarOverflowItems };
