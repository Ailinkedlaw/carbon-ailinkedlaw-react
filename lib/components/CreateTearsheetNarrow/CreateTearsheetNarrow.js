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
var cx = require('classnames');
var react = require('@carbon/react');
var devtools = require('../../global/js/utils/devtools.js');
var settings = require('../../settings.js');
var TearsheetNarrow = require('../Tearsheet/TearsheetNarrow.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["children", "className", "description", "disableSubmit", "formDescription", "formTitle", "label", "open", "onRequestClose", "onRequestSubmit", "primaryButtonText", "secondaryButtonText", "selectorPrimaryFocus", "title", "verticalPosition"];

var blockClass = "".concat(settings.pkg.prefix, "--create-tearsheet-narrow");
var componentName = 'CreateTearsheetNarrow'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * Use a narrow tearsheet as an alternative to a modal when there is scrolling.
 * Use when the form fields can be broken down into sections using section headers.
 */

exports.CreateTearsheetNarrow = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
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
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

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
  return /*#__PURE__*/React__default["default"].createElement(TearsheetNarrow.TearsheetNarrow, _rollupPluginBabelHelpers["extends"]({}, rest, {
    title: title,
    description: description,
    className: cx__default["default"](blockClass, className),
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
  }, devtools.getDevtoolsProps(componentName)), /*#__PURE__*/React__default["default"].createElement("h3", {
    className: cx__default["default"]("".concat(blockClass, "__form-title-text"), formTextClass)
  }, formTitle), /*#__PURE__*/React__default["default"].createElement("p", {
    className: cx__default["default"]("".concat(blockClass, "__form-description-text"), formTextClass)
  }, formDescription), /*#__PURE__*/React__default["default"].createElement(react.Form, {
    className: "".concat(blockClass, "__form")
  }, children));
}); // Return a placeholder if not released and not enabled by feature flag

exports.CreateTearsheetNarrow = settings.pkg.checkComponentEnabled(exports.CreateTearsheetNarrow, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

exports.CreateTearsheetNarrow.displayName = componentName; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

exports.CreateTearsheetNarrow.propTypes = {
  /**
   * Provide the contents of the CreateTearsheetNarrow.
   */
  children: PropTypes__default["default"].node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes__default["default"].string,

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes__default["default"].node,

  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit: PropTypes__default["default"].bool,

  /**
   * Specifies an optional field that provides a additional context for a form
   */
  formDescription: PropTypes__default["default"].node,

  /**
   * Specifies a required field that provides a title for a form
   */
  formTitle: PropTypes__default["default"].node.isRequired,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes__default["default"].node,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onRequestClose: PropTypes__default["default"].func,

  /**
   * Specifies an optional handler which is called when the CreateTearsheetNarrow
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes__default["default"].func,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes__default["default"].bool,

  /**
   * Specifies the primary button's text in the CreateTearsheetNarrow.
   */
  primaryButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * Specifies the secondary button's text in the CreateTearsheetNarrow.
   */
  secondaryButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes__default["default"].node,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes__default["default"].node,

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes__default["default"].oneOf(['normal', 'lower'])
};
