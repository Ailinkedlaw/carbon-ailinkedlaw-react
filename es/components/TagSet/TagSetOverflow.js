/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popover, Tag, PopoverContent, Link } from '@carbon/react';
import { pkg } from '../../settings.js';
import { useClickOutside } from '../../global/js/hooks/useClickOutside.js';

var _excluded = ["allTagsModalSearchThreshold", "className", "onShowAllClick", "overflowAlign", "overflowTags", "showAllTagsLabel"];
var componentName = 'TagSetOverflow';
var blockClass = "".concat(pkg.prefix, "--tag-set-overflow"); // Default values for props

var defaults = {
  allTagsModalSearchThreshold: 10,
  overflowAlign: 'bottom'
};
var TagSetOverflow = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$allTagsModalSear = _ref.allTagsModalSearchThreshold,
      allTagsModalSearchThreshold = _ref$allTagsModalSear === void 0 ? defaults.allTagsModalSearchThreshold : _ref$allTagsModalSear,
      className = _ref.className,
      onShowAllClick = _ref.onShowAllClick,
      _ref$overflowAlign = _ref.overflowAlign,
      overflowAlign = _ref$overflowAlign === void 0 ? defaults.overflowAlign : _ref$overflowAlign,
      overflowTags = _ref.overflowTags,
      showAllTagsLabel = _ref.showAllTagsLabel,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      popoverOpen = _useState2[0],
      setPopoverOpen = _useState2[1];

  var localRef = useRef();
  var overflowTagContent = useRef(null);
  useClickOutside(ref || localRef, function () {
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

  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    "aria-hidden": overflowTags.length === 0,
    className: cx("".concat(blockClass), _defineProperty({}, "".concat(blockClass, "--hidden"), overflowTags.length === 0)),
    ref: ref || localRef
  }), /*#__PURE__*/React.createElement(Popover, {
    align: overflowAlign,
    className: cx(className, "".concat(blockClass, "__tagset-popover")),
    dropShadow: true,
    highContrast: true,
    onKeyDown: handleEscKeyPress,
    open: popoverOpen
  }, /*#__PURE__*/React.createElement(Tag, {
    onClick: function onClick() {
      return setPopoverOpen(!popoverOpen);
    },
    className: cx("".concat(blockClass, "__popover-trigger"))
  }, "+", overflowTags.length), /*#__PURE__*/React.createElement(PopoverContent, null, /*#__PURE__*/React.createElement("div", {
    ref: overflowTagContent,
    className: "".concat(blockClass, "__content")
  }, /*#__PURE__*/React.createElement("ul", {
    className: "".concat(blockClass, "__tag-list")
  }, overflowTags.filter(function (_, index) {
    return overflowTags.length > allTagsModalSearchThreshold ? index < allTagsModalSearchThreshold : index <= allTagsModalSearchThreshold;
  }).map(function (tag, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: "".concat(blockClass, "__tag-item"),
      key: index
    }, /*#__PURE__*/React.cloneElement(tag, {
      filter: false
    }));
  })), overflowTags.length > allTagsModalSearchThreshold && /*#__PURE__*/React.createElement(Link, {
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
  allTagsModalSearchThreshold: PropTypes.number,

  /**
   * className
   */
  className: PropTypes.string,

  /**
   * function to execute on clicking show all
   */
  onShowAllClick: PropTypes.func.isRequired,

  /**
   * overflowAlign from the standard tooltip
   */
  overflowAlign: PropTypes.oneOf(['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top']),

  /**
   * tags shown in overflow
   */
  overflowTags: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * label for the overflow show all tags link
   */
  showAllTagsLabel: PropTypes.string
};

export { TagSetOverflow };
