/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import { ComposedModal, ModalHeader, ModalBody, Form, ModalFooter, Button } from '@carbon/react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { pkg } from '../../settings.js';

var _excluded = ["className", "children", "onRequestClose", "onRequestSubmit", "open", "title", "subtitle", "description", "secondaryButtonText", "primaryButtonText", "disableSubmit", "selectorPrimaryFocus"];
var componentName = 'CreateModal';
var blockClass = "".concat(pkg.prefix, "--create-modal"); // Custom PropType validator which checks and ensures that the children property has no more than 4 nodes

var isValidChildren = function isValidChildren() {
  return function (_ref) {
    var children = _ref.children;

    if (children && children.length > 4) {
      throw new Error('\'\'CreateModal\' 组件不会将超过 4 个节点作为子节点。' + '这是为了确保模态不会溢出。 请删除 1 个或多个节点。');
    }

    return;
  };
};

var CreateModal = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var className = _ref2.className,
      children = _ref2.children,
      onRequestClose = _ref2.onRequestClose,
      onRequestSubmit = _ref2.onRequestSubmit,
      open = _ref2.open,
      title = _ref2.title,
      subtitle = _ref2.subtitle,
      description = _ref2.description,
      secondaryButtonText = _ref2.secondaryButtonText,
      primaryButtonText = _ref2.primaryButtonText,
      disableSubmit = _ref2.disableSubmit,
      selectorPrimaryFocus = _ref2.selectorPrimaryFocus,
      rest = _objectWithoutProperties(_ref2, _excluded);

  return /*#__PURE__*/React.createElement(ComposedModal, _extends({}, rest, {
    selectorPrimaryFocus: selectorPrimaryFocus,
    className: cx(blockClass, className),
    open: open,
    ref: ref,
    "aria-label": title,
    size: "sm",
    preventCloseOnClickOutside: true,
    onClose: function onClose() {
      onRequestClose === null || onRequestClose === void 0 ? void 0 : onRequestClose();
      return false;
    }
  }, getDevtoolsProps(componentName)), /*#__PURE__*/React.createElement(ModalHeader, {
    title: title,
    titleClassName: "".concat(blockClass, "__title")
  }, subtitle && /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__subtitle")
  }, subtitle)), /*#__PURE__*/React.createElement(ModalBody, {
    hasForm: true
  }, description && /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__description")
  }, description), /*#__PURE__*/React.createElement(Form, {
    className: "".concat(blockClass, "__form")
  }, children)), /*#__PURE__*/React.createElement(ModalFooter, null, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    kind: "secondary",
    onClick: onRequestClose
  }, secondaryButtonText), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    kind: "primary",
    onClick: onRequestSubmit,
    disabled: disableSubmit
  }, primaryButtonText)));
}); // Return a placeholder if not released and not enabled by feature flag

CreateModal = pkg.checkComponentEnabled(CreateModal, componentName);
CreateModal.propTypes = {
  /**
   * 子项是指模态体内表单内的所有表单项。
   */
  children: isValidChildren(),

  /**
   * 指定要应用于模态根节点的可选类名
   */
  className: PropTypes.string,

  /**
   * CreateModal 的描述用于提供有关模式的更多信息。
   */
  description: PropTypes.node.isRequired,

  /**
   * 指定用于禁用或启用主按钮的布尔值。
   * 这对于表单验证很重要返回 `true` 可防止在完成必填字段之前单击主按钮。
   */
  disableSubmit: PropTypes.bool,

  /**
   * 指定在 CreateModal 关闭时调用的可选处理程序。
   */
  onRequestClose: PropTypes.func,

  /**
   * 指定按下 CreateModal 主按钮时调用的可选处理程序。
   */
  onRequestSubmit: PropTypes.func,

  /**
   * 指定 CreateModal 是否打开。
   */
  open: PropTypes.bool,

  /**
   * 指定模式中主按钮的文本。
   */
  primaryButtonText: PropTypes.string.isRequired,

  /**
   * 指定模式中辅助按钮的文本。
   */
  secondaryButtonText: PropTypes.string.isRequired,

  /**
   * 指定模式中辅助按钮的文本。
   */
  selectorPrimaryFocus: PropTypes.node.isRequired,

  /**
   * CreateModal 的副标题是可选的，用于提供有关模式的更多信息。
   */
  subtitle: PropTypes.node,

  /**
   * CreateModal 的标题通常是产品或服务名称。
   */
  title: PropTypes.node.isRequired
};
CreateModal.displayName = componentName;

export { CreateModal };
