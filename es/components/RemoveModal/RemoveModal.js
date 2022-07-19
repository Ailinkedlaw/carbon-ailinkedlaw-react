/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { ComposedModal, ModalHeader, ModalBody, TextInput, ModalFooter, Button } from '@carbon/react';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import uuidv4 from '../../global/js/utils/uuidv4.js';
import { pkg } from '../../settings.js';
import { usePreviousValue } from '../../global/js/hooks/usePreviousValue.js';

var _excluded = ["body", "className", "iconDescription", "inputInvalidText", "inputLabelText", "inputPlaceholderText", "label", "onClose", "onRequestSubmit", "open", "preventCloseOnClickOutside", "primaryButtonText", "resourceName", "secondaryButtonText", "textConfirmation", "title"];
var componentName = 'RemoveModal';
var RemoveModal = /*#__PURE__*/forwardRef(function (_ref, ref) {
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
      rest = _objectWithoutProperties(_ref, _excluded);

  var previousState = usePreviousValue({
    open: open
  });

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      userInput = _useState2[0],
      setUserInput = _useState2[1];

  var idRef = useRef(uuidv4());

  var onChangeHandler = function onChangeHandler(e) {
    setUserInput(e.target.value);
  };

  var primaryButtonDisabled = textConfirmation && userInput !== resourceName;
  var blockClass = "".concat(pkg.prefix, "--remove-modal"); // Clear the user input this way so that if the onRequestSubmit handler fails for some reason
  // the value of the input will still remain: we only want to empty the input value
  // when open actually changes to false.

  useEffect(function () {
    if (!open && previousState !== null && previousState !== void 0 && previousState.open) {
      setUserInput('');
    }
  }, [open, previousState === null || previousState === void 0 ? void 0 : previousState.open]);
  return /*#__PURE__*/React.createElement(ComposedModal, _extends({}, rest, {
    className: cx(blockClass, className),
    size: "sm"
  }, _objectSpread2({
    open: open,
    ref: ref,
    preventCloseOnClickOutside: preventCloseOnClickOutside,
    onClose: onClose
  }, getDevtoolsProps(componentName))), /*#__PURE__*/React.createElement(ModalHeader, {
    title: title,
    label: label,
    iconDescription: iconDescription
  }), /*#__PURE__*/React.createElement(ModalBody, null, /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__body")
  }, body), textConfirmation && /*#__PURE__*/React.createElement(TextInput, {
    id: "".concat(idRef.current, "-confirmation-input"),
    className: "".concat(blockClass, "__input"),
    invalidText: inputInvalidText,
    labelText: inputLabelText,
    placeholder: inputPlaceholderText,
    onChange: onChangeHandler,
    value: userInput,
    "data-modal-primary-focus": true
  })), /*#__PURE__*/React.createElement(ModalFooter, null, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    kind: "secondary",
    onClick: onClose,
    "data-modal-primary-focus": !textConfirmation
  }, secondaryButtonText), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    kind: "danger",
    onClick: onRequestSubmit,
    disabled: primaryButtonDisabled
  }, primaryButtonText)));
}); // Return a placeholder if not released and not enabled by feature flag

RemoveModal = pkg.checkComponentEnabled(RemoveModal, componentName);
RemoveModal.propTypes = {
  /**
   * The content to be displayed in the body of the modal
   */
  body: PropTypes.string.isRequired,

  /**
   * Optional classname
   */
  className: PropTypes.string,

  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string.isRequired,

  /**
   * Message showed when user input fails validation
   */
  inputInvalidText: PropTypes.string,

  /**
   * Label for text box
   */
  inputLabelText: PropTypes.node,

  /**
   * Placeholder for text box
   */
  inputPlaceholderText: PropTypes.string,

  /**
   * Specify the modal label texts
   */
  label: PropTypes.string,

  /**
   * Callback function that runs when user closes the modal
   */
  onClose: PropTypes.func,

  /**
   * Callback function that runs when user submits the modal
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool.isRequired,

  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,

  /**
   * The name of the resource being acted upon
   */
  resourceName: PropTypes.string.isRequired,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,

  /**
   * Specify whether or not to show the text confirmation input
   */
  textConfirmation: PropTypes.bool,

  /**
   * The text displayed at the top of the modal
   */
  title: PropTypes.string.isRequired
};
RemoveModal.displayName = componentName;

export { RemoveModal };
