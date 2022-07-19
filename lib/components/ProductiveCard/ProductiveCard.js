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
var devtools = require('../../global/js/utils/devtools.js');
var propsHelper = require('../../global/js/utils/props-helper.js');
var settings = require('../../settings.js');
var Card = require('../Card/Card.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var _excluded = ["actionsPlacement"];
var componentName = 'ProductiveCard'; // Default values for props

var defaults = {
  actionsPlacement: 'top'
};
exports.ProductiveCard = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$actionsPlacement = _ref.actionsPlacement,
      actionsPlacement = _ref$actionsPlacement === void 0 ? defaults.actionsPlacement : _ref$actionsPlacement,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var validProps = propsHelper.prepareProps(rest, ['media', 'mediaPosition', 'onSecondaryButtonClick', 'pictogram', 'primaryButtonClick', 'productive', 'secondaryButtonKind', 'secondaryButtonText']);
  return /*#__PURE__*/React__default["default"].createElement(Card.Card, _rollupPluginBabelHelpers["extends"]({}, _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, validProps), {}, {
    actionsPlacement: actionsPlacement,
    ref: ref
  }), {
    productive: true
  }, devtools.getDevtoolsProps(componentName)));
}); // Return a placeholder if not released and not enabled by feature flag

exports.ProductiveCard = settings.pkg.checkComponentEnabled(exports.ProductiveCard, componentName);
exports.ProductiveCard.propTypes = {
  /**
   * Icons that are displayed on card. Refer to design documentation for implementation guidelines
   */
  actionIcons: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    id: PropTypes__default["default"].string,
    icon: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].object]),
    onKeyDown: PropTypes__default["default"].func,
    onClick: PropTypes__default["default"].func,
    iconDescription: PropTypes__default["default"].string,
    href: PropTypes__default["default"].string
  })),

  /**
   * Determines if the action icons are on the top or bottom of the card
   */
  actionsPlacement: PropTypes__default["default"].oneOf(['top', 'bottom']),

  /**
   * Content that shows in the body of the card
   */
  children: PropTypes__default["default"].node,

  /**
   * Optional user provided class
   */
  className: PropTypes__default["default"].string,

  /**
   * Designates which zones of the card are clickable. Refer to design documentation for implementation guidelines
   */
  clickZone: PropTypes__default["default"].oneOf(['one', 'two', 'three']),

  /**
   * Optional header description
   */
  description: PropTypes__default["default"].string,

  /**
   * Optional label for the top of the card
   */
  label: PropTypes__default["default"].string,

  /**
   * Provides the callback for a clickable card
   */
  onClick: PropTypes__default["default"].func,

  /**
   * Function that's called from the primary button or action icon
   */
  onPrimaryButtonClick: PropTypes__default["default"].func,

  /**
   * Use an overflow menu instead of action icons. Refer to design documentation for implementation guidelines
   */
  overflowActions: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    id: PropTypes__default["default"].string,
    itemText: PropTypes__default["default"].string,
    onClick: PropTypes__default["default"].func,
    onKeyDown: PropTypes__default["default"].func
  })),

  /**
   * Aria label prop required for OverflowMenu
   */
  overflowAriaLabel: PropTypes__default["default"].string,

  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  primaryButtonHref: PropTypes__default["default"].string,

  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  primaryButtonIcon: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].object]),

  /**
   * The text that's displayed in the primary button
   */
  primaryButtonText: PropTypes__default["default"].node,

  /**
   * Title that's displayed at the top of the card
   */
  title: PropTypes__default["default"].string,

  /**
   * Determines title size
   */
  titleSize: PropTypes__default["default"].oneOf(['default', 'large'])
};
exports.ProductiveCard.displayName = componentName;
