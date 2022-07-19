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
import { Form } from '@carbon/react';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { pkg } from '../../settings.js';
import { TearsheetNarrow } from '../Tearsheet/TearsheetNarrow.js';

var _excluded = ["children", "className", "description", "disableSubmit", "formDescription", "formTitle", "label", "open", "onRequestClose", "onRequestSubmit", "primaryButtonText", "secondaryButtonText", "selectorPrimaryFocus", "title", "verticalPosition"];

var blockClass = "".concat(pkg.prefix, "--create-tearsheet-narrow");
var componentName = 'CreateTearsheetNarrow'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * Use a narrow tearsheet as an alternative to a modal when there is scrolling.
 * Use when the form fields can be broken down into sections using section headers.
 */

var CreateTearsheetNarrow = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      description = _ref.description,
      disableSubmit = _ref.disableSubmit,
      formDescription = _ref.formDescription,
      formTitle = _ref.formTitle,
      label = _ref.label,
      open = _ref.open,
      onRequestClose = _ref.onRequestClose,
      onRequestSubmit = _ref.onRequestSubmit,
      primaryButtonText = _ref.primaryButtonText,
      secondaryButtonText = _ref.secondaryButtonText,
      selectorPrimaryFocus = _ref.selectorPrimaryFocus,
      title = _ref.title,
      verticalPosition = _ref.verticalPosition,
      rest = _objectWithoutProperties(_ref, _excluded);

  var actions = [{
    label: primaryButtonText,
    onClick: onRequestSubmit,
    kind: 'primary',
    disabled: disableSubmit
  }, {
    label: secondaryButtonText,
    onClick: onRequestClose,
    kind: 'secondary'
  }];
  var formTextClass = "".concat(blockClass, "__content-text");
  return /*#__PURE__*/React.createElement(TearsheetNarrow, _extends({}, rest, {
    title: title,
    description: description,
    className: cx(blockClass, className),
    actions: actions,
    open: open,
    ref: ref,
    onClose: function onClose() {
      onRequestClose === null || onRequestClose === void 0 ? void 0 : onRequestClose();
      return false;
    },
    label: label,
    selectorPrimaryFocus: selectorPrimaryFocus,
    verticalPosition: verticalPosition,
    role: "presentation"
  }, getDevtoolsProps(componentName)), /*#__PURE__*/React.createElement("h3", {
    className: cx("".concat(blockClass, "__form-title-text"), formTextClass)
  }, formTitle), /*#__PURE__*/React.createElement("p", {
    className: cx("".concat(blockClass, "__form-description-text"), formTextClass)
  }, formDescription), /*#__PURE__*/React.createElement(Form, {
    className: "".concat(blockClass, "__form")
  }, children));
}); // Return a placeholder if not released and not enabled by feature flag

CreateTearsheetNarrow = pkg.checkComponentEnabled(CreateTearsheetNarrow, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

CreateTearsheetNarrow.displayName = componentName; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

CreateTearsheetNarrow.propTypes = {
  /**
   * Provide the contents of the CreateTearsheetNarrow.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
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
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specifies an optional handler which is called when the CreateTearsheetNarrow
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes.bool,

  /**
   * Specifies the primary button's text in the CreateTearsheetNarrow.
   */
  primaryButtonText: PropTypes.string.isRequired,

  /**
   * Specifies the secondary button's text in the CreateTearsheetNarrow.
   */
  secondaryButtonText: PropTypes.string.isRequired,

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes.node,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node,

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes.oneOf(['normal', 'lower'])
};

export { CreateTearsheetNarrow };
