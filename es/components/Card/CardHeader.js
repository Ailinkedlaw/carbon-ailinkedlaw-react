/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pkg } from '../../settings.js';

var componentName = 'CardHeader';
var defaults = {
  hasActions: false,
  titleSize: 'default'
};
var CardHeader = function CardHeader(_ref) {
  var _cx;

  var actions = _ref.actions,
      description = _ref.description,
      _ref$hasActions = _ref.hasActions,
      hasActions = _ref$hasActions === void 0 ? defaults.hasActions : _ref$hasActions,
      label = _ref.label,
      title = _ref.title,
      _ref$titleSize = _ref.titleSize,
      titleSize = _ref$titleSize === void 0 ? defaults.titleSize : _ref$titleSize;
  var blockClass = "".concat(pkg.prefix, "--card");
  var headerClass = "".concat(blockClass, "__header");
  var headerClasses = cx(headerClass, (_cx = {}, _defineProperty(_cx, "".concat(headerClass, "-label-only"), label && !title && !description), _defineProperty(_cx, "".concat(headerClass, "-has-label"), !!label), _defineProperty(_cx, "".concat(blockClass, "__title-lg"), titleSize === 'large'), _cx));
  return /*#__PURE__*/React.createElement("div", {
    className: headerClasses
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(headerClass, "-container")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__title-container")
  }, label && /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__label")
  }, label), title && /*#__PURE__*/React.createElement("h6", {
    className: "".concat(blockClass, "__title")
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__description")
  }, description)), hasActions && /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__actions ").concat(blockClass, "__actions-header")
  }, actions)));
};
CardHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  description: PropTypes.string,
  hasActions: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  titleSize: PropTypes.oneOf(['default', 'large'])
};
CardHeader.displayName = componentName;

export { CardHeader };
