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
var settings = require('../../settings.js');
var useClickOutside = require('../../global/js/hooks/useClickOutside.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["allTagsModalSearchThreshold", "className", "onShowAllClick", "overflowAlign", "overflowTags", "showAllTagsLabel"];
var componentName = 'TagSetOverflow';
var blockClass = "".concat(settings.pkg.prefix, "--tag-set-overflow"); // Default values for props

var defaults = {
  allTagsModalSearchThreshold: 10,
  overflowAlign: 'bottom'
};
var TagSetOverflow = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _ref$allTagsModalSear = _ref.allTagsModalSearchThreshold,
      allTagsModalSearchThreshold = _ref$allTagsModalSear === void 0 ? defaults.allTagsModalSearchThreshold : _ref$allTagsModalSear,
      className = _ref.className,
      onShowAllClick = _ref.onShowAllClick,
      _ref$overflowAlign = _ref.overflowAlign,
      overflowAlign = _ref$overflowAlign === void 0 ? defaults.overflowAlign : _ref$overflowAlign,
      overflowTags = _ref.overflowTags,
      showAllTagsLabel = _ref.showAllTagsLabel,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState(false),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      popoverOpen = _useState2[0],
      setPopoverOpen = _useState2[1];

  var localRef = React.useRef();
  var overflowTagContent = React.useRef(null);
  useClickOutside.useClickOutside(ref || localRef, function () {
    if (popoverOpen) {
      setPopoverOpen(false);
    }
  });

  var handleShowAllTagsClick = function handleShowAllTagsClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    setPopoverOpen(false);
    onShowAllClick();
  };

  var handleEscKeyPress = function handleEscKeyPress(event) {
    var key = event.key;

    if (key === 'Escape') {
      setPopoverOpen(false);
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("span", _rollupPluginBabelHelpers["extends"]({}, rest, {
    "aria-hidden": overflowTags.length === 0,
    className: cx__default["default"]("".concat(blockClass), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "--hidden"), overflowTags.length === 0)),
    ref: ref || localRef
  }), /*#__PURE__*/React__default["default"].createElement(react.Popover, {
    align: overflowAlign,
    className: cx__default["default"](className, "".concat(blockClass, "__tagset-popover")),
    dropShadow: true,
    highContrast: true,
    onKeyDown: handleEscKeyPress,
    open: popoverOpen
  }, /*#__PURE__*/React__default["default"].createElement(react.Tag, {
    onClick: function onClick() {
      return setPopoverOpen(!popoverOpen);
    },
    className: cx__default["default"]("".concat(blockClass, "__popover-trigger"))
  }, "+", overflowTags.length), /*#__PURE__*/React__default["default"].createElement(react.PopoverContent, null, /*#__PURE__*/React__default["default"].createElement("div", {
    ref: overflowTagContent,
    className: "".concat(blockClass, "__content")
  }, /*#__PURE__*/React__default["default"].createElement("ul", {
    className: "".concat(blockClass, "__tag-list")
  }, overflowTags.filter(function (_, index) {
    return overflowTags.length > allTagsModalSearchThreshold ? index < allTagsModalSearchThreshold : index <= allTagsModalSearchThreshold;
  }).map(function (tag, index) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      className: "".concat(blockClass, "__tag-item"),
      key: index
    }, /*#__PURE__*/React__default["default"].cloneElement(tag, {
      filter: false
    }));
  })), overflowTags.length > allTagsModalSearchThreshold && /*#__PURE__*/React__default["default"].createElement(react.Link, {
    className: "".concat(blockClass, "__show-all-tags-link"),
    href: "",
    onClick: handleShowAllTagsClick,
    role: "button"
  }, showAllTagsLabel)))));
});
TagSetOverflow.displayName = componentName;
TagSetOverflow.propTypes = {
  /**
   * count of overflowTags over which a modal is offered
   */
  allTagsModalSearchThreshold: PropTypes__default["default"].number,

  /**
   * className
   */
  className: PropTypes__default["default"].string,

  /**
   * function to execute on clicking show all
   */
  onShowAllClick: PropTypes__default["default"].func.isRequired,

  /**
   * overflowAlign from the standard tooltip
   */
  overflowAlign: PropTypes__default["default"].oneOf(['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top']),

  /**
   * tags shown in overflow
   */
  overflowTags: PropTypes__default["default"].arrayOf(PropTypes__default["default"].object).isRequired,

  /**
   * label for the overflow show all tags link
   */
  showAllTagsLabel: PropTypes__default["default"].string
};

exports.TagSetOverflow = TagSetOverflow;
