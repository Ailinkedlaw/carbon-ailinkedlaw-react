/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends, objectSpread2 as _objectSpread2, defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef } from 'react';
import cx from 'classnames';
import { OverflowMenu, OverflowMenuItem, Button, IconButton } from '@carbon/react';
import PropTypes from 'prop-types';
import { CardHeader } from './CardHeader.js';
import { CardFooter } from './CardFooter.js';
import { pkg } from '../../settings.js';

var _excluded = ["actionIcons", "actionsPlacement", "children", "className", "clickZone", "description", "label", "media", "mediaPosition", "onClick", "onKeyDown", "onPrimaryButtonClick", "overflowActions", "overflowAriaLabel", "onSecondaryButtonClick", "pictogram", "primaryButtonHref", "primaryButtonIcon", "primaryButtonKind", "primaryButtonText", "productive", "secondaryButtonHref", "secondaryButtonIcon", "secondaryButtonKind", "secondaryButtonText", "title", "titleSize"],
    _excluded2 = ["id"],
    _excluded3 = ["id", "icon", "onClick", "iconDescription", "href"];
var componentName = 'Card'; // Default values for props

var defaults = {
  actionIcons: Object.freeze([]),
  actionsPlacement: 'bottom',
  clickZone: 'one',
  mediaPosition: 'top',
  overflowActions: Object.freeze([]),
  primaryButtonKind: 'primary',
  productive: false,
  secondaryButtonKind: 'secondary',
  titleSize: 'default'
};
var Card = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$actionIcons = _ref.actionIcons,
      actionIcons = _ref$actionIcons === void 0 ? defaults.actionIcons : _ref$actionIcons,
      _ref$actionsPlacement = _ref.actionsPlacement,
      actionsPlacement = _ref$actionsPlacement === void 0 ? defaults.actionsPlacement : _ref$actionsPlacement,
      children = _ref.children,
      className = _ref.className,
      _ref$clickZone = _ref.clickZone,
      clickZone = _ref$clickZone === void 0 ? defaults.clickZone : _ref$clickZone,
      description = _ref.description,
      label = _ref.label,
      media = _ref.media,
      _ref$mediaPosition = _ref.mediaPosition,
      mediaPosition = _ref$mediaPosition === void 0 ? defaults.mediaPosition : _ref$mediaPosition,
      onClick = _ref.onClick,
      onKeyDown = _ref.onKeyDown,
      onPrimaryButtonClick = _ref.onPrimaryButtonClick,
      _ref$overflowActions = _ref.overflowActions,
      overflowActions = _ref$overflowActions === void 0 ? defaults.overflowActions : _ref$overflowActions,
      overflowAriaLabel = _ref.overflowAriaLabel,
      onSecondaryButtonClick = _ref.onSecondaryButtonClick,
      Pictogram = _ref.pictogram,
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
      secondaryButtonText = _ref.secondaryButtonText,
      title = _ref.title,
      _ref$titleSize = _ref.titleSize,
      titleSize = _ref$titleSize === void 0 ? defaults.titleSize : _ref$titleSize,
      rest = _objectWithoutProperties(_ref, _excluded);

  var blockClass = "".concat(pkg.prefix, "--card");
  var hasActions = actionIcons.length > 0 || overflowActions.length > 0;
  var hasFooterActions = hasActions && actionsPlacement === 'bottom';
  var hasFooterButton = !!secondaryButtonText || !!primaryButtonText;
  var hasBottomBar = hasFooterActions || hasFooterButton;
  var hasClickEvent = !!onClick || !!onKeyDown;
  var clickableProps = {
    onClick: onClick,
    onKeyDown: onKeyDown,
    role: 'button',
    tabIndex: '0'
  }; // actions can either be an overflow menu or series of icons

  var getActions = function getActions() {
    if (overflowActions.length > 0) {
      var pos = actionsPlacement === 'top' ? 'bottom' : 'top';
      var size = actionsPlacement === 'top' ? 'sm' : 'lg';
      return /*#__PURE__*/React.createElement(OverflowMenu, {
        size: size,
        direction: pos,
        flipped: true,
        ariaLabel: overflowAriaLabel
      }, overflowActions.map(function (_ref2) {
        var id = _ref2.id,
            rest = _objectWithoutProperties(_ref2, _excluded2);

        return /*#__PURE__*/React.createElement(OverflowMenuItem, _extends({
          key: id
        }, rest));
      }));
    }

    var icons = actionIcons.map(function (_ref3) {
      var id = _ref3.id,
          Icon = _ref3.icon,
          onClick = _ref3.onClick,
          iconDescription = _ref3.iconDescription,
          href = _ref3.href,
          rest = _objectWithoutProperties(_ref3, _excluded3);

      if (productive) {
        return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
          key: id,
          renderIcon: Icon,
          hasIconOnly: true,
          onClick: onClick,
          size: actionsPlacement === 'top' ? 'sm' : 'md',
          iconDescription: iconDescription,
          kind: "ghost",
          href: href
        }));
      }

      if (href) {
        return /*#__PURE__*/React.createElement("a", {
          key: id,
          className: "".concat(blockClass, "__icon"),
          href: href,
          onClick: onClick
        }, /*#__PURE__*/React.createElement(Icon, {
          "aria-label": iconDescription
        }));
      }

      return /*#__PURE__*/React.createElement(IconButton, {
        key: id,
        label: iconDescription,
        className: "".concat(blockClass, "__icon"),
        onClick: onClick,
        kind: "ghost",
        size: "sm"
      }, /*#__PURE__*/React.createElement(Icon, {
        "aria-label": iconDescription
      }));
    });
    return icons;
  };

  var getCardProps = function getCardProps() {
    var _cx;

    var clickable = hasClickEvent && !productive || hasClickEvent && productive && clickZone === 'one';

    var cardProps = _objectSpread2(_objectSpread2({}, rest), {}, {
      ref: ref,
      className: cx(blockClass, (_cx = {}, _defineProperty(_cx, "".concat(blockClass, "__productive"), productive), _defineProperty(_cx, "".concat(blockClass, "__clickable"), clickable), _defineProperty(_cx, "".concat(blockClass, "__media-left"), mediaPosition === 'left'), _cx), className)
    }, clickable && clickableProps);

    return cardProps;
  }; // the only reason this is necessary is for click zone 2


  var getHeaderBodyProps = function getHeaderBodyProps() {
    var clickable = hasClickEvent && clickZone === 'two';

    var headerBodyProps = _objectSpread2({
      className: cx("".concat(blockClass, "__header-body-container"), _defineProperty({}, "".concat(blockClass, "__clickable"), clickable))
    }, clickable && clickableProps);

    return headerBodyProps;
  };

  var getHeaderProps = function getHeaderProps() {
    return {
      actions: getActions(),
      actionsPlacement: actionsPlacement,
      description: description,
      hasActions: hasActions && actionsPlacement === 'top',
      label: label,
      title: title,
      titleSize: titleSize
    };
  };

  var getBodyProps = function getBodyProps() {
    var clickable = hasClickEvent && clickZone === 'three';

    var bodyProps = _objectSpread2({
      className: cx("".concat(blockClass, "__body"), _defineProperty({}, "".concat(blockClass, "__clickable"), clickable))
    }, clickable && clickableProps);

    return bodyProps;
  };

  var getFooterProps = function getFooterProps() {
    return {
      actions: getActions(),
      actionsPlacement: actionsPlacement,
      hasActions: hasFooterActions,
      hasButton: hasFooterButton,
      onPrimaryButtonClick: onPrimaryButtonClick,
      onSecondaryButtonClick: onSecondaryButtonClick,
      primaryButtonHref: primaryButtonHref,
      primaryButtonIcon: primaryButtonIcon,
      primaryButtonKind: primaryButtonKind,
      primaryButtonText: primaryButtonText,
      productive: productive,
      secondaryButtonHref: secondaryButtonHref,
      secondaryButtonIcon: secondaryButtonIcon,
      secondaryButtonKind: secondaryButtonKind,
      secondaryButtonText: secondaryButtonText
    };
  };

  return /*#__PURE__*/React.createElement("div", getCardProps(), media && /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__media")
  }, media), Pictogram && /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__pictogram")
  }, /*#__PURE__*/React.createElement(Pictogram, null)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__content-container")
  }, /*#__PURE__*/React.createElement("div", getHeaderBodyProps(), /*#__PURE__*/React.createElement(CardHeader, getHeaderProps()), /*#__PURE__*/React.createElement("div", getBodyProps(), children)), hasBottomBar && /*#__PURE__*/React.createElement(CardFooter, getFooterProps())));
});
Card.propTypes = {
  actionIcons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    iconDescription: PropTypes.string,
    href: PropTypes.string
  })),
  actionsPlacement: PropTypes.oneOf(['top', 'bottom']),
  children: PropTypes.node,
  className: PropTypes.string,
  clickZone: PropTypes.oneOf(['one', 'two', 'three']),
  description: PropTypes.string,
  label: PropTypes.string,
  media: PropTypes.node,
  mediaPosition: PropTypes.oneOf(['top', 'left']),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  overflowActions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    itemText: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
  })),
  overflowAriaLabel: PropTypes.string,
  pictogram: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  primaryButtonHref: PropTypes.string,
  primaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  primaryButtonKind: PropTypes.oneOf(['primary', 'ghost']),
  primaryButtonText: PropTypes.node,
  productive: PropTypes.bool,
  secondaryButtonHref: PropTypes.string,
  secondaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  secondaryButtonText: PropTypes.string,
  title: PropTypes.string,
  titleSize: PropTypes.oneOf(['default', 'large'])
};
Card.displayName = componentName;

export { Card };
