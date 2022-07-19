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
var settings = require('../../settings.js');
var devtools = require('../../global/js/utils/devtools.js');
var react = require('@carbon/react');
var SidePanel = require('../SidePanel/SidePanel.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["className", "children", "disableSubmit", "formTitle", "formDescription", "onRequestClose", "onRequestSubmit", "open", "primaryButtonText", "secondaryButtonText", "selectorPageContent", "selectorPrimaryFocus", "subtitle", "title"];

var blockClass = "".concat(settings.pkg.prefix, "--create-side-panel");
var componentName = 'CreateSidePanel'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * This is an example component to show relevant conventions and usage.
 */

exports.CreateSidePanel = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
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
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

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
  return selectorPageContent && /*#__PURE__*/React__default["default"].createElement(SidePanel.SidePanel, _rollupPluginBabelHelpers["extends"]({}, rest, _rollupPluginBabelHelpers.objectSpread2({
    open: open,
    ref: ref,
    selectorPageContent: selectorPageContent,
    onRequestClose: onRequestClose,
    title: title,
    subtitle: subtitle,
    selectorPrimaryFocus: selectorPrimaryFocus
  }, devtools.getDevtoolsProps(componentName)), {
    placement: "right",
    slideIn: true,
    animateTitle: false,
    className: cx__default["default"](blockClass, className),
    size: "md",
    actions: actions
  }), /*#__PURE__*/React__default["default"].createElement("h3", {
    className: "".concat(blockClass, "__form-title-text ").concat(blockClass, "__content-text")
  }, formTitle), /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__form-description-text ").concat(blockClass, "__content-text")
  }, formDescription), /*#__PURE__*/React__default["default"].createElement(react.Form, {
    className: "".concat(blockClass, "__form")
  }, children));
});
exports.CreateSidePanel = settings.pkg.checkComponentEnabled(exports.CreateSidePanel, componentName);
exports.CreateSidePanel.displayName = componentName;
exports.CreateSidePanel.propTypes = {
  /**
   * Sets the body content of the create side panel
   */
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]).isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes__default["default"].string,

  /**
   * The description of the CreateSidePanel serves to provide more information about the form within the panel.
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
   * Specifies an optional handler which is called when the CreateSidePanel
   * is closed.
   */
  onRequestClose: PropTypes__default["default"].func,

  /**
   * Specifies an optional handler which is called when the CreateSidePanel
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes__default["default"].func,

  /**
   * Specifies whether the CreateSidePanel is open or not.
   */
  open: PropTypes__default["default"].bool,

  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * This is the selector to the element that contains all of the page content that will shrink if the panel is a slide in.
   * This prop is required when using the `slideIn` variant of the side panel.
   */
  selectorPageContent: PropTypes__default["default"].string.isRequired,

  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes__default["default"].node.isRequired,

  /**
   * The subtitle of the CreateSidePanel is optional and serves to provide more information about the modal.
   */
  subtitle: PropTypes__default["default"].node,

  /**
   * The title of the CreateSidePanel is usually the product or service name.
   */
  title: PropTypes__default["default"].node.isRequired
};
