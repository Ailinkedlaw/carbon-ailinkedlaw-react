/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends, defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SkeletonText } from '@carbon/react';
import { InlineEdit } from '../InlineEdit/InlineEdit.js';

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
      rest = _objectWithoutProperties(title, _excluded);

  var titleText;
  var isEditable = !!onSave;

  if (text || !content) {
    if (text === undefined && typeof title === 'string') {
      text = title;
      asText = title;
    }

    var TitleIcon = icon;
    titleInnards = /*#__PURE__*/React.createElement(React.Fragment, null, icon && !loading ? /*#__PURE__*/React.createElement(TitleIcon, {
      className: "".concat(blockClass, "__title-icon")
    }) : null, loading ? /*#__PURE__*/React.createElement(SkeletonText, {
      className: "".concat(blockClass, "__title-skeleton")
    }) : isEditable ? /*#__PURE__*/React.createElement(InlineEdit, _extends({
      hideLabel: true,
      value: text,
      editDescription: editDescription,
      onChange: onChange,
      onSave: onSave,
      labelText: editableLabel,
      revertDescription: revertDescription,
      saveDescription: saveDescription,
      buttonTooltipPosition: "bottom"
    }, rest)) : /*#__PURE__*/React.createElement("span", {
      title: !loading ? asText : null
    }, text));
  } else {
    titleInnards = content;
    titleText = asText;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx("".concat(blockClass, "__title"), _defineProperty({}, "".concat(blockClass, "__title--editable"), isEditable), _defineProperty({}, "".concat(blockClass, "__title--fades"), hasBreadcrumbRow)),
    title: titleText
  }, titleInnards);
};
var inlineEditRequired = function inlineEditRequired(_ref2) {
  var onSave = _ref2.onSave;
  return !!onSave;
};
PageHeaderTitle.propTypes = {
  // passed from page header
  blockClass: PropTypes.string.isRequired,

  /**
   * controlled from within page header
   */
  hasBreadcrumbRow: PropTypes.bool,

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
  title: PropTypes.oneOfType([PropTypes.shape({
    // Update docgen if changed
    text: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    loading: PropTypes.bool,
    // inline edit version properties
    editDescription: PropTypes.string.isRequired.if(inlineEditRequired),
    editableLabel: PropTypes.string.isRequired.if(inlineEditRequired),
    id: PropTypes.string.isRequired.if(inlineEditRequired),
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    revertDescription: PropTypes.string.isRequired.if(inlineEditRequired),
    saveDescription: PropTypes.string.isRequired.if(inlineEditRequired) // Update docgen if changed

  }), PropTypes.string, PropTypes.shape({
    content: PropTypes.node.isRequired,
    breadcrumbContent: PropTypes.node,
    asText: PropTypes.string.isRequired
  })])
};

export { PageHeaderTitle, inlineEditRequired };
