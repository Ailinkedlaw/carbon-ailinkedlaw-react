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
var cx = require('classnames');
var react = require('@carbon/react');
var PropTypes = require('prop-types');
var devtools = require('../../global/js/utils/devtools.js');
var uuidv4 = require('../../global/js/utils/uuidv4.js');
var settings = require('../../settings.js');
var usePreviousValue = require('../../global/js/hooks/usePreviousValue.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var _excluded = ["body", "className", "iconDescription", "inputInvalidText", "inputLabelText", "inputPlaceholderText", "label", "onClose", "onRequestSubmit", "open", "preventCloseOnClickOutside", "primaryButtonText", "resourceName", "secondaryButtonText", "textConfirmation", "title"];
var componentName = 'RemoveModal';
exports.RemoveModal = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var body = _ref.body,
      className = _ref.className,
      iconDescription = _ref.iconDescription,
      inputInvalidText = _ref.inputInvalidText,
      inputLabelText = _ref.inputLabelText,
      inputPlaceholderText = _ref.inputPlaceholderText,
      label = _ref.label,
      onClose = _ref.onClose,
      onRequestSubmit = _ref.onRequestSubmit,
      open = _ref.open,
      preventCloseOnClickOutside = _ref.preventCloseOnClickOutside,
      primaryButtonText = _ref.primaryButtonText,
      resourceName = _ref.resourceName,
      secondaryButtonText = _ref.secondaryButtonText,
      textConfirmation = _ref.textConfirmation,
      title = _ref.title,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var previousState = usePreviousValue.usePreviousValue({
    open: open
  });

  var _useState = React.useState(''),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      userInput = _useState2[0],
      setUserInput = _useState2[1];

  var idRef = React.useRef(uuidv4["default"]());

  var onChangeHandler = function onChangeHandler(e) {
    setUserInput(e.target.value);
  };

  var primaryButtonDisabled = textConfirmation && userInput !== resourceName;
  var blockClass = "".concat(settings.pkg.prefix, "--remove-modal"); // Clear the user input this way so that if the onRequestSubmit handler fails for some reason
  // the value of the input will still remain: we only want to empty the input value
  // when open actually changes to false.

  React.useEffect(function () {
    if (!open && previousState !== null && previousState !== void 0 && previousState.open) {
      setUserInput('');
    }
  }, [open, previousState === null || previousState === void 0 ? void 0 : previousState.open]);
  return /*#__PURE__*/React__default["default"].createElement(react.ComposedModal, _rollupPluginBabelHelpers["extends"]({}, rest, {
    className: cx__default["default"](blockClass, className),
    size: "sm"
  }, _rollupPluginBabelHelpers.objectSpread2({
    open: open,
    ref: ref,
    preventCloseOnClickOutside: preventCloseOnClickOutside,
    onClose: onClose
  }, devtools.getDevtoolsProps(componentName))), /*#__PURE__*/React__default["default"].createElement(react.ModalHeader, {
    title: title,
    label: label,
    iconDescription: iconDescription
  }), /*#__PURE__*/React__default["default"].createElement(react.ModalBody, null, /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__body")
  }, body), textConfirmation && /*#__PURE__*/React__default["default"].createElement(react.TextInput, {
    id: "".concat(idRef.current, "-confirmation-input"),
    className: "".concat(blockClass, "__input"),
    invalidText: inputInvalidText,
    labelText: inputLabelText,
    placeholder: inputPlaceholderText,
    onChange: onChangeHandler,
    value: userInput,
    "data-modal-primary-focus": true
  })), /*#__PURE__*/React__default["default"].createElement(react.ModalFooter, null, /*#__PURE__*/React__default["default"].createElement(react.Button, {
    type: "button",
    kind: "secondary",
    onClick: onClose,
    "data-modal-primary-focus": !textConfirmation
  }, secondaryButtonText), /*#__PURE__*/React__default["default"].createElement(react.Button, {
    type: "submit",
    kind: "danger",
    onClick: onRequestSubmit,
    disabled: primaryButtonDisabled
  }, primaryButtonText)));
}); // Return a placeholder if not released and not enabled by feature flag

exports.RemoveModal = settings.pkg.checkComponentEnabled(exports.RemoveModal, componentName);
exports.RemoveModal.propTypes = {
  /**
   * The content to be displayed in the body of the modal
   */
  body: PropTypes__default["default"].string.isRequired,

  /**
   * Optional classname
   */
  className: PropTypes__default["default"].string,

  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes__default["default"].string.isRequired,

  /**
   * Message showed when user input fails validation
   */
  inputInvalidText: PropTypes__default["default"].string,

  /**
   * Label for text box
   */
  inputLabelText: PropTypes__default["default"].node,

  /**
   * Placeholder for text box
   */
  inputPlaceholderText: PropTypes__default["default"].string,

  /**
   * Specify the modal label texts
   */
  label: PropTypes__default["default"].string,

  /**
   * Callback function that runs when user closes the modal
   */
  onClose: PropTypes__default["default"].func,

  /**
   * Callback function that runs when user submits the modal
   */
  onRequestSubmit: PropTypes__default["default"].func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes__default["default"].bool.isRequired,

  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside: PropTypes__default["default"].bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes__default["default"].string,

  /**
   * The name of the resource being acted upon
   */
  resourceName: PropTypes__default["default"].string.isRequired,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes__default["default"].string,

  /**
   * Specify whether or not to show the text confirmation input
   */
  textConfirmation: PropTypes__default["default"].bool,

  /**
   * The text displayed at the top of the modal
   */
  title: PropTypes__default["default"].string.isRequired
};
exports.RemoveModal.displayName = componentName;
