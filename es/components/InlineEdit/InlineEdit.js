/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, typeof as _typeof, defineProperty as _defineProperty, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { pkg } from '../../settings.js';
import { usePrefix, Button, IconButton } from '@carbon/react';
import { Close, Checkmark, EditOff, Edit, WarningFilled } from '@carbon/icons-react';

var _WarningFilled, _EditOff, _Edit;

var _excluded = ["buttonTooltipAlignment", "buttonTooltipPosition", "cancelDescription", "className", "disabled", "editAlwaysVisible", "editDescription", "id", "invalid", "invalidText", "labelText", "light", "onCancel", "onSave", "onChange", "placeholder", "saveDescription", "size", "value"];

var blockClass = "".concat(pkg.prefix, "--inline-edit");
var componentName = 'InlineEdit'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

var defaults = {
  buttonTooltipAlignment: 'center',
  buttonTooltipPosition: 'top',
  light: true,
  // defaults to true to reflect design
  size: 'md'
};
var buttons = ['cancel', 'edit', 'save'];
/**
 * TODO: A description of the component.
 */

var InlineEdit = /*#__PURE__*/React.forwardRef(function (_ref, refIn) {
  var _cx, _refInput$current, _refInput$current$inn, _cx3;

  var buttonTooltipAlignment = _ref.buttonTooltipAlignment,
      buttonTooltipPosition = _ref.buttonTooltipPosition,
      cancelDescription = _ref.cancelDescription,
      className = _ref.className,
      disabled = _ref.disabled,
      editAlwaysVisible = _ref.editAlwaysVisible,
      editDescription = _ref.editDescription,
      id = _ref.id,
      invalid = _ref.invalid,
      invalidText = _ref.invalidText,
      labelText = _ref.labelText,
      _ref$light = _ref.light,
      light = _ref$light === void 0 ? defaults.light : _ref$light,
      onCancel = _ref.onCancel,
      onSave = _ref.onSave,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      saveDescription = _ref.saveDescription,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? defaults.size : _ref$size,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, _excluded);

  var carbonPrefix = usePrefix();
  var refInput = useRef(null);
  var localRef = useRef(null);
  var ref = refIn || localRef;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      editing = _useState2[0],
      setEditing = _useState2[1];

  var _useState3 = useState(value),
      _useState4 = _slicedToArray(_useState3, 2),
      internalValue = _useState4[0],
      setInternalValue = _useState4[1];

  var showValidation = invalid; // || warn;

  var validationText = invalidText; // || warnText;

  var validationIcon = showValidation ? _WarningFilled || (_WarningFilled = /*#__PURE__*/React.createElement(WarningFilled, {
    size: 16
  })) : null; // sanitize the tooltip values

  var alignIsObject = _typeof(buttonTooltipAlignment) === 'object';
  var directionIsObject = _typeof(buttonTooltipPosition) === 'object';
  var tipPositions = buttons.reduce(function (acc, button) {
    var _ref2, _ref3;

    var tooltipAlignment = (_ref2 = alignIsObject ? buttonTooltipAlignment[button] : buttonTooltipAlignment) !== null && _ref2 !== void 0 ? _ref2 : defaults.buttonTooltipAlignment;
    var tooltipPosition = (_ref3 = directionIsObject ? buttonTooltipPosition[button] : buttonTooltipPosition) !== null && _ref3 !== void 0 ? _ref3 : defaults.buttonTooltipPosition;
    acc[button] = {
      tooltipAlignment: tooltipAlignment,
      tooltipPosition: tooltipPosition
    };
    return acc;
  }, {});

  var doSetEditing = function doSetEditing(value) {
    if (value === false) {
      // move scroll to start
      refInput.current.scrollLeft = 0;
    }

    setEditing(!disabled && value);
  };

  var handleEdit = function handleEdit(ev) {
    /* istanbul ignore else */
    if (!disabled) {
      var rightOfInput = ev.currentTarget.classList.contains("".concat(blockClass, "__edit")) || ev.target.classList.contains("".concat(blockClass, "__after-input-elements"));
      var leftOfInput = ev.currentTarget = ev.target.classList.contains("".concat(blockClass)); // clicking on the content editable element should not set either of these to true

      if (rightOfInput || leftOfInput) {
        doSetEditing(true);
        setTimeout(function () {
          refInput.current.focus(); // select all the content

          document.getSelection().selectAllChildren(refInput.current);

          if (rightOfInput) {
            document.getSelection().collapseToEnd();
            refInput.current.scrollLeft = 9999; // never going to get there but ensures at end.
          } else {
            document.getSelection().collapseToStart();
            refInput.current.scrollLeft = 0; // scroll to start
          }
        }, 0);
      }
    }
  };

  var handleFocus = function handleFocus(ev) {
    ev.preventDefault();

    if (!editing && ev.target.classList.contains("".concat(blockClass, "__input"))) {
      doSetEditing(true);
    }
  };

  var handleSave = function handleSave() {
    doSetEditing(false);
    document.getSelection().removeAllRanges();

    if (onSave) {
      onSave(refInput.current.innerText);
    }
  };

  var handleInput = function handleInput() {
    setInternalValue(refInput.current.innerText);

    if (onChange) {
      onChange(refInput.current.innerText);
    }
  }; // pasting into contentEditable not supported by userEvent


  var handlePaste =
  /* istanbul ignore next */
  function handlePaste(ev) {
    ev.preventDefault(); // Get clipboard as plain text

    var text = (ev.clipboardData || window.clipboardData).getData('text/plain'); // remove \n

    var sanitizedText = text.replaceAll(/\n/g, '') // remove carriage returns
    .replaceAll(/\t/g, '  '); // replace tab with two spaces

    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, sanitizedText);
    } else {
      // Insert text at the current position of caret
      var range = document.getSelection().getRangeAt(0);
      range.deleteContents();
      var textNode = document.createTextNode(sanitizedText);
      range.insertNode(textNode); // move selection end of textNode

      range.selectNodeContents(textNode);
      range.collapse(false); // remove existing range

      var selection = document.getSelection();
      selection.removeAllRanges(); // set the new range

      selection.addRange(range);
    }
  };

  var handleCancel = function handleCancel() {
    refInput.current.innerText = value;
    handleInput();
    doSetEditing(false);
    document.getSelection().removeAllRanges();

    if (onCancel) {
      onCancel(value);
    }
  };

  var handleBlur = function handleBlur(ev) {
    if (!ref.current.contains(ev.relatedTarget)) {
      handleSave();
    }
  };

  var handleKeyDown = function handleKeyDown(ev) {
    switch (ev.key) {
      case 'Enter':
        ev.preventDefault();
        refInput.current.blur(); // will cause save

        break;

      case 'Escape':
        handleCancel();
        break;
    }
  };
  /*
    The HTML is structured as follows:
   <container>
    <!-- margin left of input to match Carbon -->
    <content-editable>
    <-- margin right of input space for after-input-elements -->
    <after-input-elements>
  </container>
    NOTE:
   - An input is not used as this would not permit a heading tag e.g. <h2>.
   - Some padding is added to the left 16px standard for a Carbon text input
   - The after-input-elements are position absolute with a margin to on the input to reserve space. Using inline-flex
   - does not measure space properly for the input otherwise.
   - The content editable is not expected to change size when buttons are added, to ensure the text does not move space
    is reserved up front for buttons and invalid icon. Mostly this is only noticed if the width of the component is not 100%.
    which can be shown by setting inlineEditFullWidth to false in storybook.
    In making content-editable behave like an input of type text we have to account for.
   - Enforcing a single line
   - Pasting of non-text e.g. html or text with carriage returns
   - The padding and border not hiding typed in text.
   - Placing the cursor at the start or end depending on area clicked (before for left-padding)
  */


  var toolbarAnimation = true;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line
    React.createElement("div", {
      className: cx(blockClass, // Apply the block class to the main HTML element
      className, // Apply any supplied class names to the main HTML element.
      "".concat(blockClass, "--").concat(size), (_cx = {}, _defineProperty(_cx, "".concat(blockClass, "--disabled"), disabled), _defineProperty(_cx, "".concat(blockClass, "--editing"), editing), _defineProperty(_cx, "".concat(blockClass, "--invalid"), invalid), _defineProperty(_cx, "".concat(blockClass, "--light"), light), _defineProperty(_cx, "".concat(blockClass, "--overflows"), refInput.current && refInput.current.scrollWidth > refInput.current.offsetWidth), _cx)),
      onClick: handleEdit // disabled eslint for click handler
      ,
      onBlur: handleBlur,
      ref: ref
    }, /*#__PURE__*/React.createElement("div", _extends({}, rest, getDevtoolsProps(componentName), {
      id: id,
      size: size,
      className: cx("".concat(blockClass, "__input"), _defineProperty({}, "".concat(blockClass, "__input--empty"), ((_refInput$current = refInput.current) === null || _refInput$current === void 0 ? void 0 : (_refInput$current$inn = _refInput$current.innerText) === null || _refInput$current$inn === void 0 ? void 0 : _refInput$current$inn.length) === 0)),
      contentEditable: true,
      "aria-label": labelText,
      role: "textbox",
      tabIndex: disabled ? -1 : 0,
      onFocus: handleFocus,
      onInput: handleInput,
      onKeyDown: handleKeyDown,
      onPaste: handlePaste,
      suppressContentEditableWarning: true,
      ref: refInput,
      "data-placeholder": placeholder !== null && placeholder !== void 0 ? placeholder : labelText
    }), value), /*#__PURE__*/React.createElement("div", {
      className: cx("".concat(blockClass, "__after-input-elements")) // tabindex -1 fixes blur target test when clicking on after-input-elements background
      ,
      tabIndex: "-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(blockClass, "__ellipsis"),
      "aria-hidden": !editing
    }, "\u2026"), /*#__PURE__*/React.createElement("div", {
      className: cx("".concat(blockClass, "__toolbar"), (_cx3 = {}, _defineProperty(_cx3, "".concat(blockClass, "__toolbar--animation"), toolbarAnimation), _defineProperty(_cx3, "".concat(blockClass, "__toolbar--saveable"), refInput.current && value !== internalValue), _cx3))
    }, showValidation && /*#__PURE__*/React.createElement("div", {
      className: "".concat(blockClass, "__validation-icon")
    }, validationIcon), editing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, _extends({
      className: "".concat(blockClass, "__cancel"),
      kind: "ghost",
      hasIconOnly: true,
      iconDescription: cancelDescription,
      onClick: handleCancel,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React.createElement(Close, _extends({
          size: 16
        }, props));
      }
    }, tipPositions.cancel)), /*#__PURE__*/React.createElement(Button, _extends({
      className: "".concat(blockClass, "__save"),
      kind: "ghost",
      hasIconOnly: true,
      iconDescription: saveDescription,
      onClick: handleSave,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React.createElement(Checkmark, _extends({
          size: 16
        }, props));
      },
      disabled: value === internalValue
    }, tipPositions.save))) : /*#__PURE__*/React.createElement(IconButton, _extends({
      className: cx("".concat(blockClass, "__edit"), _defineProperty({}, "".concat(blockClass, "__edit--always-visible"), editAlwaysVisible)),
      kind: "ghost",
      label: editDescription,
      onClick: handleEdit,
      disabled: disabled
    }, tipPositions.edit), disabled ? _EditOff || (_EditOff = /*#__PURE__*/React.createElement(EditOff, {
      size: 16
    })) : _Edit || (_Edit = /*#__PURE__*/React.createElement(Edit, {
      size: 16
    }))))), /*#__PURE__*/React.createElement("div", {
      className: cx("".concat(blockClass, "__disabled-cover"))
    }), showValidation && validationText && validationText.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "".concat(blockClass, "__validation-text ").concat(carbonPrefix, "--form-requirement")
    }, validationText))
  );
}); // Return a placeholder if not released and not enabled by feature flag

InlineEdit = pkg.checkComponentEnabled(InlineEdit, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

InlineEdit.displayName = componentName; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

InlineEdit.propTypes = {
  /**
   * buttonTooltipAlignment from the standard tooltip. Default center.
   *
   * Can be passed either as one of tooltip options or as an object specifying cancel, edit and save separately
   */
  buttonTooltipAlignment: PropTypes.oneOfType([PropTypes.oneOf(['start', 'center', 'end']), PropTypes.shape({
    cancel: PropTypes.oneOf(['start', 'center', 'end']),
    edit: PropTypes.oneOf(['start', 'center', 'end']),
    save: PropTypes.oneOf(['start', 'center', 'end'])
  })]),

  /**
   * buttonTooltipPosition from the standard tooltip
   *
   * Can be passed either as one of tooltip options or as an object specifying cancel, edit and save separately
   */
  buttonTooltipPosition: PropTypes.oneOfType([PropTypes.oneOf(['top', 'right', 'bottom', 'left']), PropTypes.shape({
    cancel: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    edit: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    save: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
  })]),

  /**
   * label for cancel button
   */
  cancelDescription: PropTypes.string.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * disable edit
   */
  disabled: PropTypes.bool,

  /**
   * By default the edit icon is shown on hover only.
   */
  editAlwaysVisible: PropTypes.bool,

  /**
   * Label for the edit button
   */
  editDescription: PropTypes.string.isRequired,

  /**
   * ID for inline edit
   */
  id: PropTypes.string,

  /**
   * set invalid state for input
   */
  invalid: PropTypes.bool,

  /**
   * text shown when invalid is true
   */
  invalidText: PropTypes.string,

  /**
   * label for text input
   */
  labelText: PropTypes.string,

  /**
   * change background to light version (mimic React TextInput)
   */
  light: PropTypes.bool,

  /**
   * method called on cancel event
   */
  onCancel: PropTypes.func,

  /**
   * method called on input event (it's a React thing onChange behaves like on input).
   *
   * NOTE: caller to handle invalid states and associated text
   */
  onChange: PropTypes.func,

  /**
   * method called on change event
   *
   * NOTE: caller to handle invalid states and associated text
   */
  onSave: PropTypes.func,

  /**
   * placeholder for text input
   */
  placeholder: PropTypes.string,

  /**
   * label for save button
   */
  saveDescription: PropTypes.string.isRequired,

  /**
   * vertical size of control
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * initial/unedited value
   */
  value: PropTypes.string
};

export { InlineEdit };
