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
var InlineEdit = require('../InlineEdit/InlineEdit.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["text", "content", "loading", "icon", "asText", "onChange", "onSave", "editDescription", "editableLabel", "revertDescription", "saveDescription"];
/**
 *
 * Utility component used by Page Header
 */
// eslint-disable-next-line react/prop-types

var PageHeaderTitle = function PageHeaderTitle(_ref) {
  var blockClass = _ref.blockClass,
      hasBreadcrumbRow = _ref.hasBreadcrumbRow,
      title = _ref.title;
  var titleInnards; // eslint-disable-next-line
  // debugger;

  var text = title.text,
      content = title.content,
      loading = title.loading,
      icon = title.icon,
      asText = title.asText,
      onChange = title.onChange,
      onSave = title.onSave,
      editDescription = title.editDescription,
      editableLabel = title.editableLabel,
      revertDescription = title.revertDescription,
      saveDescription = title.saveDescription,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(title, _excluded);

  var titleText;
  var isEditable = !!onSave;

  if (text || !content) {
    if (text === undefined && typeof title === 'string') {
      text = title;
      asText = title;
    }

    var TitleIcon = icon;
    titleInnards = /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, icon && !loading ? /*#__PURE__*/React__default["default"].createElement(TitleIcon, {
      className: "".concat(blockClass, "__title-icon")
    }) : null, loading ? /*#__PURE__*/React__default["default"].createElement(react.SkeletonText, {
      className: "".concat(blockClass, "__title-skeleton")
    }) : isEditable ? /*#__PURE__*/React__default["default"].createElement(InlineEdit.InlineEdit, _rollupPluginBabelHelpers["extends"]({
      hideLabel: true,
      value: text,
      editDescription: editDescription,
      onChange: onChange,
      onSave: onSave,
      labelText: editableLabel,
      revertDescription: revertDescription,
      saveDescription: saveDescription,
      buttonTooltipPosition: "bottom"
    }, rest)) : /*#__PURE__*/React__default["default"].createElement("span", {
      title: !loading ? asText : null
    }, text));
  } else {
    titleInnards = content;
    titleText = asText;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"]("".concat(blockClass, "__title"), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "__title--editable"), isEditable), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "__title--fades"), hasBreadcrumbRow)),
    title: titleText
  }, titleInnards);
};
var inlineEditRequired = function inlineEditRequired(_ref2) {
  var onSave = _ref2.onSave;
  return !!onSave;
};
PageHeaderTitle.propTypes = {
  // passed from page header
  blockClass: PropTypes__default["default"].string.isRequired,

  /**
   * controlled from within page header
   */
  hasBreadcrumbRow: PropTypes__default["default"].bool,

  /**
   * An optional page title supplied as a string or object with the following attributes: text, icon, loading
   *
   * Can be supplied either as:
   * - String
   * - Object containing
   *    - text: title string
   *    - icon: optional icon
   *    - loading: boolean shows loading indicator if true
   *    - onChange: function to process the live value (React change === HTML Input)
   *    - onSave: function to process a confirmed change
   *    - editDescription: description for edit button
   *    - editableLabel: label for edit required if onSave supplied
   *    - revertDescription: description for edit revert button
   *    - saveDescription: description for edit save button
   * - Object containing user defined contents.
   * These must fit within the area defined for the title in both main part of the header and the breadcrumb.
   *    - content: title or name of current location shown in main part of page header
   *    - breadcrumbContent: version of content used in the breadcrumb on scroll. If not supplied
   *    - asText: String based representation of the title
   */
  title: PropTypes__default["default"].oneOfType([PropTypes__default["default"].shape({
    // Update docgen if changed
    text: PropTypes__default["default"].string.isRequired,
    icon: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].object]),
    loading: PropTypes__default["default"].bool,
    // inline edit version properties
    editDescription: PropTypes__default["default"].string.isRequired.if(inlineEditRequired),
    editableLabel: PropTypes__default["default"].string.isRequired.if(inlineEditRequired),
    id: PropTypes__default["default"].string.isRequired.if(inlineEditRequired),
    onChange: PropTypes__default["default"].func,
    onSave: PropTypes__default["default"].func,
    revertDescription: PropTypes__default["default"].string.isRequired.if(inlineEditRequired),
    saveDescription: PropTypes__default["default"].string.isRequired.if(inlineEditRequired) // Update docgen if changed

  }), PropTypes__default["default"].string, PropTypes__default["default"].shape({
    content: PropTypes__default["default"].node.isRequired,
    breadcrumbContent: PropTypes__default["default"].node,
    asText: PropTypes__default["default"].string.isRequired
  })])
};

exports.PageHeaderTitle = PageHeaderTitle;
exports.inlineEditRequired = inlineEditRequired;
