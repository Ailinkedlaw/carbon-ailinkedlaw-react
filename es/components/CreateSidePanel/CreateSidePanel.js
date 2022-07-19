/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings.js';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { Form } from '@carbon/react';
import { SidePanel } from '../SidePanel/SidePanel.js';

var _excluded = ["className", "children", "disableSubmit", "formTitle", "formDescription", "onRequestClose", "onRequestSubmit", "open", "primaryButtonText", "secondaryButtonText", "selectorPageContent", "selectorPrimaryFocus", "subtitle", "title"];

var blockClass = "".concat(pkg.prefix, "--create-side-panel");
var componentName = 'CreateSidePanel'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * This is an example component to show relevant conventions and usage.
 */

var CreateSidePanel = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      disableSubmit = _ref.disableSubmit,
      formTitle = _ref.formTitle,
      formDescription = _ref.formDescription,
      onRequestClose = _ref.onRequestClose,
      onRequestSubmit = _ref.onRequestSubmit,
      open = _ref.open,
      primaryButtonText = _ref.primaryButtonText,
      secondaryButtonText = _ref.secondaryButtonText,
      selectorPageContent = _ref.selectorPageContent,
      selectorPrimaryFocus = _ref.selectorPrimaryFocus,
      subtitle = _ref.subtitle,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, _excluded);

  var actions = [{
    label: primaryButtonText,
    onClick: function onClick(event) {
      event.preventDefault();
      onRequestSubmit();
    },
    kind: 'primary',
    disabled: disableSubmit,
    type: 'submit'
  }, {
    label: secondaryButtonText,
    onClick: onRequestClose,
    kind: 'secondary'
  }];
  return selectorPageContent && /*#__PURE__*/React.createElement(SidePanel, _extends({}, rest, _objectSpread2({
    open: open,
    ref: ref,
    selectorPageContent: selectorPageContent,
    onRequestClose: onRequestClose,
    title: title,
    subtitle: subtitle,
    selectorPrimaryFocus: selectorPrimaryFocus
  }, getDevtoolsProps(componentName)), {
    placement: "right",
    slideIn: true,
    animateTitle: false,
    className: cx(blockClass, className),
    size: "md",
    actions: actions
  }), /*#__PURE__*/React.createElement("h3", {
    className: "".concat(blockClass, "__form-title-text ").concat(blockClass, "__content-text")
  }, formTitle), /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__form-description-text ").concat(blockClass, "__content-text")
  }, formDescription), /*#__PURE__*/React.createElement(Form, {
    className: "".concat(blockClass, "__form")
  }, children));
});
CreateSidePanel = pkg.checkComponentEnabled(CreateSidePanel, componentName);
CreateSidePanel.displayName = componentName;
CreateSidePanel.propTypes = {
  /**
   * Sets the body content of the create side panel
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The description of the CreateSidePanel serves to provide more information about the form within the panel.
   */
  description: PropTypes.node,

  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit: PropTypes.bool,

  /**
   * Specifies an optional field that provides a additional context for a form
   */
  formDescription: PropTypes.node,

  /**
   * Specifies a required field that provides a title for a form
   */
  formTitle: PropTypes.node.isRequired,

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * is closed.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specifies whether the CreateSidePanel is open or not.
   */
  open: PropTypes.bool,

  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: PropTypes.string.isRequired,

  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: PropTypes.string.isRequired,

  /**
   * This is the selector to the element that contains all of the page content that will shrink if the panel is a slide in.
   * This prop is required when using the `slideIn` variant of the side panel.
   */
  selectorPageContent: PropTypes.string.isRequired,

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes.node.isRequired,

  /**
   * The subtitle of the CreateSidePanel is optional and serves to provide more information about the modal.
   */
  subtitle: PropTypes.node,

  /**
   * The title of the CreateSidePanel is usually the product or service name.
   */
  title: PropTypes.node.isRequired
};

export { CreateSidePanel };
