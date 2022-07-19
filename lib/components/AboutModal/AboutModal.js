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
var reactResizeDetector = require('react-resize-detector');
var PropTypes = require('prop-types');
var cx = require('classnames');
var settings = require('../../settings.js');
var uuidv4 = require('../../global/js/utils/uuidv4.js');
var devtools = require('../../global/js/utils/devtools.js');
var react = require('@carbon/react');
var propsHelper = require('../../global/js/utils/props-helper.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["additionalInfo", "className", "closeIconDescription", "content", "copyrightText", "legalText", "links", "logo", "onClose", "open", "tabListAriaLabel", "title"];

var blockClass = "".concat(settings.pkg.prefix, "--about-modal");
var componentName = 'AboutModal'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The AboutModal component provides a way to communicate product information
 * to users. It is triggered by a user’s action, appears on top of the main
 * page content, and is persistent until dismissed. The purpose of this modal
 * should be immediately apparent to the user, with a clear and obvious path
 * to completion.
 */

exports.AboutModal = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var additionalInfo = _ref.additionalInfo,
      className = _ref.className,
      closeIconDescription = _ref.closeIconDescription,
      content = _ref.content,
      copyrightText = _ref.copyrightText,
      legalText = _ref.legalText,
      links = _ref.links,
      logo = _ref.logo,
      onClose = _ref.onClose,
      open = _ref.open,
      tabListAriaLabel = _ref.tabListAriaLabel,
      title = _ref.title,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState(true),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      hasScrollingContent = _useState2[0],
      setHasScrollingContent = _useState2[1];

  var bodyRef = React.useRef();
  var contentRef = React.useRef();
  var contentId = uuidv4["default"]();

  var handleResize = function handleResize() {
    setHasScrollingContent( // if our scroll height exceeds the client height enable scrolling
    bodyRef.current.clientHeight < (hasScrollingContent ? // Carbon modal adds 32px bottom margin when scrolling content is enabled
    bodyRef.current.scrollHeight - 32 : bodyRef.current.scrollHeight));
  }; // We can't add a ref directly to the ModalBody, so track it in a ref
  // as the parent of the current bodyRef element


  React.useEffect(function () {
    bodyRef.current = contentRef.current.parentElement;
  }, [bodyRef]); // Detect resize of the ModalBody to recalculate whether scrolling is enabled

  reactResizeDetector.useResizeDetector({
    onResize: handleResize,
    targetRef: bodyRef
  });
  return /*#__PURE__*/React__default["default"].createElement(react.ComposedModal, _rollupPluginBabelHelpers["extends"]({}, rest, {
    className: cx__default["default"](blockClass, // Apply the block class to the main HTML element
    className, // Apply any supplied class names to the main HTML element.
    _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "--with-tabs"), additionalInfo && additionalInfo.length > 1))
  }, _rollupPluginBabelHelpers.objectSpread2({
    onClose: onClose,
    open: open,
    ref: ref
  }, devtools.getDevtoolsProps(componentName))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__logo")
  }, logo), /*#__PURE__*/React__default["default"].createElement(react.ModalHeader, {
    className: "".concat(blockClass, "__header"),
    closeModal: onClose,
    iconDescription: closeIconDescription,
    label: title,
    labelClassName: "".concat(blockClass, "__title")
  }), /*#__PURE__*/React__default["default"].createElement(react.ModalBody, {
    "aria-label": hasScrollingContent ? '' : null,
    "aria-labelledby": hasScrollingContent ? contentId : null,
    className: "".concat(blockClass, "__body"),
    hasScrollingContent: hasScrollingContent
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__body-content"),
    ref: contentRef,
    id: contentId
  }, content, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__links-container")
  }, links && links.length > 0 && links.map(function (link, i) {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
      key: i
    }, link);
  })), legalText && /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__legal-text")
  }, legalText), copyrightText && /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__copyright-text")
  }, copyrightText))), /*#__PURE__*/React__default["default"].createElement(react.ModalFooter, {
    className: "".concat(blockClass, "__footer")
  }, additionalInfo && additionalInfo.length > 0 && (additionalInfo.length === 1 ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__version-label")
  }, additionalInfo[0].label), /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "__version-number")
  }, additionalInfo[0].content)) : /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__tab-container")
  }, /*#__PURE__*/React__default["default"].createElement(react.Tabs, null, /*#__PURE__*/React__default["default"].createElement(react.TabList, {
    "aria-label": tabListAriaLabel
  }, additionalInfo.map(function (tab, index) {
    return /*#__PURE__*/React__default["default"].createElement(react.Tab, {
      key: index
    }, tab.label);
  })), /*#__PURE__*/React__default["default"].createElement(react.TabPanels, null, additionalInfo.map(function (tab, index) {
    return /*#__PURE__*/React__default["default"].createElement(react.TabPanel, {
      key: index
    }, tab.content);
  })))))));
}); // Return a placeholder if not released and not enabled by feature flag

exports.AboutModal = settings.pkg.checkComponentEnabled(exports.AboutModal, componentName);
exports.AboutModal.displayName = componentName;

var tabListAriaLabelRequiredProps = function tabListAriaLabelRequiredProps(type) {
  return propsHelper.isRequiredIf(type, function (_ref2) {
    var additionalInfo = _ref2.additionalInfo;
    return additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.length;
  });
}; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.


exports.AboutModal.propTypes = {
  /**
   * Additional information to be displayed in the footer. Can be used for
   * version information and/or a set of tabs with various contents. If only
   * one set of additional information is provided then no tabs are
   * displayed and the label and content are just displayed one above the
   * other in the footer.
   */
  additionalInfo: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string,
    content: PropTypes__default["default"].node
  })),

  /**
   * Provide an optional class to be applied to the modal root node.
   */
  className: PropTypes__default["default"].string,

  /**
   * The accessibility title for the close icon.
   */
  closeIconDescription: PropTypes__default["default"].string.isRequired,

  /**
   * A summary that appears immediately beneath the title, and might
   * include information such as: version name, server name,
   * user name, user role, browser version, browser OS etc.
   */
  content: PropTypes__default["default"].node.isRequired,

  /**
   * Trademark and copyright information. Suggested format for copyright -
   * "Copyright © 2018 Company".
   */
  copyrightText: PropTypes__default["default"].node,

  /**
   * Text providing legal information.
   */
  legalText: PropTypes__default["default"].node,

  /**
   * An array of Carbon `Link` components that contain links to additional
   * information.
   */
  links: PropTypes__default["default"].arrayOf(PropTypes__default["default"].element),

  /**
   * A visual symbol used to represent the product.
   */
  logo: PropTypes__default["default"].node.isRequired,

  /**
   * Specifies an optional handler which is called when the AboutModal
   * is closed. Returning `false` prevents the AboutModal from closing.
   */
  onClose: PropTypes__default["default"].func,

  /**
   * Specifies whether the AboutModal is open or not.
   */
  open: PropTypes__default["default"].bool,

  /**
   * Specifies the tab list aria label
   */
  tabListAriaLabel: tabListAriaLabelRequiredProps(PropTypes__default["default"].string),

  /**
   * The title of the AboutModal is usually the product or service name.
   */
  title: PropTypes__default["default"].node.isRequired
};
