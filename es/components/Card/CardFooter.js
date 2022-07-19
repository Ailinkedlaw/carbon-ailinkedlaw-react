/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import cx from 'classnames';
import { Button } from '@carbon/react';
import PropTypes from 'prop-types';
import { pkg } from '../../settings.js';

var componentName = 'CardFooter';
var defaults = {
  actions: Object.freeze([]),
  primaryButtonKind: 'primary',
  productive: false,
  secondaryButtonKind: 'secondary'
};
var CardFooter = function CardFooter(_ref) {
  var _ref$actions = _ref.actions,
      actions = _ref$actions === void 0 ? defaults.actions : _ref$actions,
      hasActions = _ref.hasActions,
      hasButton = _ref.hasButton,
      onPrimaryButtonClick = _ref.onPrimaryButtonClick,
      onSecondaryButtonClick = _ref.onSecondaryButtonClick,
      primaryButtonHref = _ref.primaryButtonHref,
      primaryButtonIcon = _ref.primaryButtonIcon,
      _ref$primaryButtonKin = _ref.primaryButtonKind,
      primaryButtonKind = _ref$primaryButtonKin === void 0 ? defaults.primaryButtonKind : _ref$primaryButtonKin,
      primaryButtonText = _ref.primaryButtonText,
      _ref$productive = _ref.productive,
      productive = _ref$productive === void 0 ? defaults.productive : _ref$productive,
      secondaryButtonHref = _ref.secondaryButtonHref,
      secondaryButtonIcon = _ref.secondaryButtonIcon,
      _ref$secondaryButtonK = _ref.secondaryButtonKind,
      secondaryButtonKind = _ref$secondaryButtonK === void 0 ? defaults.secondaryButtonKind : _ref$secondaryButtonK,
      secondaryButtonText = _ref.secondaryButtonText;
  var blockClass = "".concat(pkg.prefix, "--card");
  var footerClass = "".concat(pkg.prefix, "--card__footer");
  var footerClasses = cx(footerClass, _defineProperty({}, "".concat(footerClass, "-no-button"), !hasButton));
  return /*#__PURE__*/React.createElement("div", {
    className: footerClasses
  }, secondaryButtonText && /*#__PURE__*/React.createElement(Button, {
    kind: secondaryButtonKind,
    onClick: onSecondaryButtonClick,
    size: "md",
    renderIcon: secondaryButtonIcon,
    href: secondaryButtonHref
  }, secondaryButtonText), primaryButtonText && /*#__PURE__*/React.createElement(Button, {
    kind: productive ? 'ghost' : primaryButtonKind,
    onClick: onPrimaryButtonClick,
    size: "md",
    renderIcon: primaryButtonIcon,
    href: primaryButtonHref
  }, primaryButtonText), hasActions && /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__actions")
  }, actions));
};
CardFooter.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  hasActions: PropTypes.bool,
  hasButton: PropTypes.bool,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  primaryButtonHref: PropTypes.string,
  primaryButtonIcon: PropTypes.string,
  primaryButtonKind: PropTypes.oneOf(['primary', 'ghost']),
  primaryButtonText: PropTypes.string,
  productive: PropTypes.bool,
  secondaryButtonHref: PropTypes.string,
  secondaryButtonIcon: PropTypes.string,
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  secondaryButtonText: PropTypes.string
};
CardFooter.displayName = componentName;

export { CardFooter };
