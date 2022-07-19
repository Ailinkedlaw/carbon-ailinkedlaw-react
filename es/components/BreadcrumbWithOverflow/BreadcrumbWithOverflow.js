/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, defineProperty as _defineProperty, createForOfIteratorHelper as _createForOfIteratorHelper } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix, Breadcrumb, BreadcrumbItem, OverflowMenu, Link, IconButton, OverflowMenuItem } from '@carbon/react';
import { pkg } from '../../settings.js';
import { useResizeDetector } from 'react-resize-detector';
import { OverflowMenuHorizontal, ArrowLeft } from '@carbon/icons-react';
import uuidv4 from '../../global/js/utils/uuidv4.js';
import '../../global/js/utils/props-helper.js';

var _ArrowLeft;

var _excluded = ["breadcrumbs", "className", "maxVisible", "noTrailingSlash", "overflowAriaLabel"],
    _excluded2 = ["label", "key", "title", "id"],
    _excluded3 = ["className", "key", "label", "title"];

var blockClass = "".concat(pkg.prefix, "--breadcrumb-with-overflow");
var componentName = 'BreadcrumbWithOverflow'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The BreadcrumbWithOverflow is used internally by the PageHeader to wrap BreadcrumbItems.
 */

var BreadcrumbWithOverflow = function BreadcrumbWithOverflow(_ref) {
  var _backItem, _backItem2, _backItem3;

  var breadcrumbs = _ref.breadcrumbs,
      className = _ref.className,
      maxVisible = _ref.maxVisible,
      noTrailingSlash = _ref.noTrailingSlash,
      overflowAriaLabel = _ref.overflowAriaLabel,
      other = _objectWithoutProperties(_ref, _excluded);

  var carbonPrefix = usePrefix();

  var _useState = useState(3),
      _useState2 = _slicedToArray(_useState, 2),
      displayCount = _useState2[0],
      setDisplayCount = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      displayedBreadcrumbItems = _useState4[0],
      setDisplayedBreadcrumbItems = _useState4[1];

  var breadcrumbItemWithOverflow = useRef(null);
  var sizingContainerRef = useRef(null);
  var internalId = useRef(uuidv4());

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      hiddenSizingItems = _useState6[0],
      setHiddenSizingItems = _useState6[1]; // eslint-disable-next-line react/prop-types


  var BreadcrumbOverflowMenu = function BreadcrumbOverflowMenu(_ref2) {
    var overflowItems = _ref2.overflowItems;
    return /*#__PURE__*/React.createElement(BreadcrumbItem, {
      key: "breadcrumb-overflow-".concat(internalId.current)
    }, /*#__PURE__*/React.createElement(OverflowMenu, {
      ariaLabel: overflowAriaLabel,
      iconDescription: overflowAriaLabel // also needs setting to avoid a11y "Accessible name does not match or contain the visible label text"
      ,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React.createElement(OverflowMenuHorizontal, _extends({
          size: 32
        }, props));
      },
      className: "".concat(blockClass, "__overflow-menu"),
      menuOptionsClass: "".concat(blockClass, "__overflow-menu-options")
    }, // eslint-disable-next-line react/prop-types
    overflowItems.map(function (item, index) {
      return /*#__PURE__*/React.createElement(OverflowMenuItem, {
        key: "breadcrumb-overflow-menu-item-".concat(internalId.current, "-").concat(index),
        href: item.props.href,
        onClick: item.props.onClick,
        itemText: item.props.children
      });
    })));
  }; // create hidden sizing items


  useEffect(function () {
    // Hidden action bar and items used to calculate sizes
    setHiddenSizingItems( /*#__PURE__*/React.createElement("div", {
      className: "".concat(blockClass, "__breadcrumb-container ").concat(blockClass, "__breadcrumb-container--hidden"),
      "aria-hidden": true,
      ref: sizingContainerRef
    }, /*#__PURE__*/React.createElement(Breadcrumb, null, /*#__PURE__*/React.createElement(BreadcrumbItem, {
      key: "".concat(blockClass, "-hidden-overflow-").concat(internalId)
    }, /*#__PURE__*/React.createElement(OverflowMenu, {
      ariaLabel: overflowAriaLabel,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React.createElement(OverflowMenuHorizontal, _extends({
          size: 32
        }, props));
      }
    })), breadcrumbs.map(function (_ref3) {
      var label = _ref3.label,
          key = _ref3.key,
          title = _ref3.title,
          id = _ref3.id,
          rest = _objectWithoutProperties(_ref3, _excluded2);

      return /*#__PURE__*/React.createElement(BreadcrumbItem, _extends({
        key: key
      }, rest, {
        // ensure id is not duplicated
        "data-original-id": id,
        title: title !== null && title !== void 0 ? title : label
      }), label);
    }))));
  }, [breadcrumbs, overflowAriaLabel]);
  useEffect(function () {
    // updates displayedBreadcrumbItems and overflowBreadcrumbItems based on displayCount and breadcrumbs

    /* istanbul ignore if */
    if (breadcrumbs.length === 0) {
      setDisplayedBreadcrumbItems([]);
      return;
    }

    var newDisplayedBreadcrumbItems = breadcrumbs.map(function (_ref4, index) {
      var className = _ref4.className,
          key = _ref4.key,
          label = _ref4.label,
          title = _ref4.title,
          rest = _objectWithoutProperties(_ref4, _excluded3);

      return /*#__PURE__*/React.createElement(BreadcrumbItem, _extends({
        key: key,
        className: index > 0 || displayCount > 1 ? cx([className, "".concat(blockClass, "__displayed-breadcrumb")]) : className,
        title: index + 1 === breadcrumbs.length ? title : null
      }, rest), label);
    }); // The breadcrumb has the form [first item] [overflow] [items 2...(n-1)] [last item].
    // The overflow is only shown if there isn't space to display all the items, and in that case:
    //  * the last item is always displayed (even if there isn't really space for it -- it can contract to an ellipsis);
    //  * the first item is the next to be displayed, if there's space once the last item and overflow are shown;
    //  * any remaining space after the first item, last item and overflow are shown is used to show items (n-1),
    //  (n-2), (n-3), ..., until the space is used up ;
    // Note that displayCount (min 1) has been computed based on the available space and the above sequence.

    var overflowPosition = displayCount > 1 ? 1 : 0;
    var newOverflowBreadcrumbItems = newDisplayedBreadcrumbItems.splice(overflowPosition, breadcrumbs.length - displayCount); // if needed add overflow menu

    if (newOverflowBreadcrumbItems.length) {
      newDisplayedBreadcrumbItems.splice(overflowPosition, 0, /*#__PURE__*/React.createElement(BreadcrumbOverflowMenu, {
        overflowItems: newOverflowBreadcrumbItems,
        key: "displayed-breadcrumb-".concat(internalId, "-overflow")
      }));
    }

    setDisplayedBreadcrumbItems(newDisplayedBreadcrumbItems);
  }, [breadcrumbs, displayCount]);

  var checkFullyVisibleBreadcrumbItems = function checkFullyVisibleBreadcrumbItems() {
    var displayItemIndex = function displayItemIndex(itemCount, index) {
      // In this data set the overflow measuring item is [0]
      // so the first displayItem in the list is [1]
      // we never return 0;
      if (index === 0) {
        return itemCount - 1; // the last item in the list
      } else if (index === 1) {
        return 1; // the first item in the list
      } else {
        return itemCount - index; // count down from itemCount - 2 to 1
      }
    };

    if (maxVisible <= 1) {
      setDisplayCount(1);
    } else {
      // how many will fit?
      var willFit = 0;
      var spaceAvailable = breadcrumbItemWithOverflow.current.offsetWidth; // not sure how to test resize

      /* istanbul ignore next */

      if (sizingContainerRef.current) {
        var sizingBreadcrumbItems = sizingContainerRef.current.querySelectorAll(".".concat(carbonPrefix, "--breadcrumb-item"));
        var breadcrumbWidthsIncludingMargin = [];

        var _iterator = _createForOfIteratorHelper(sizingBreadcrumbItems),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var computedStyle = window ? window.getComputedStyle(sizingBreadcrumbItems[0]) : null;
            var marginWidths = computedStyle ? parseFloat(computedStyle.marginLeft || 0, 10) + parseFloat(computedStyle.marginRight || 0, 10) : 0;
            breadcrumbWidthsIncludingMargin.push(item.offsetWidth + marginWidths);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var overflowWidth = breadcrumbWidthsIncludingMargin[0];

        for (var i = 0; i < breadcrumbWidthsIncludingMargin.length - 1; i++) {
          // count used one less than length to account for the included overflow item
          var index = displayItemIndex(breadcrumbWidthsIncludingMargin.length, i);

          if (spaceAvailable >= breadcrumbWidthsIncludingMargin[index]) {
            spaceAvailable -= breadcrumbWidthsIncludingMargin[index];
            willFit += 1;
          } else {
            break;
          }
        } // if not enough space for all breadcrumb items


        if (willFit < breadcrumbWidthsIncludingMargin.length - 1) {
          // -1 for overflow item
          while (willFit > 0 && spaceAvailable < overflowWidth) {
            willFit -= 1; // Highly unlikely any useful breadcrumb-item is smaller than the overflow menu, but we loop anyway just in case
            // item removed is based on last item added which is the current value of willFit

            var itemToRemove = displayItemIndex(breadcrumbWidthsIncludingMargin.length, willFit);
            spaceAvailable += breadcrumbWidthsIncludingMargin[itemToRemove];
          }
        }
      }

      if (willFit <= 1) {
        setDisplayCount(1);
      } else {
        setDisplayCount(maxVisible ? Math.min(willFit, maxVisible) : willFit);
      }
    }
  };

  useEffect(function () {
    checkFullyVisibleBreadcrumbItems(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiddenSizingItems, maxVisible]);
  /* istanbul ignore next */
  // not sure how to test resize

  var handleResize = function handleResize() {
    /* istanbul ignore next */
    // not sure how to test resize
    checkFullyVisibleBreadcrumbItems();
  };
  /* istanbul ignore next */
  // not sure how to test resize


  var handleBreadcrumbItemsResize = function handleBreadcrumbItemsResize() {
    /* istanbul ignore next */
    // not sure how to test resize
    checkFullyVisibleBreadcrumbItems();
  };

  var backItem = breadcrumbs[breadcrumbs.length - 1];
  /* istanbul ignore if */
  // not sure how to test media queries

  if (backItem.isCurrentPage) {
    backItem = breadcrumbs[breadcrumbs.length - 2];
  }

  useResizeDetector({
    onResize: handleBreadcrumbItemsResize,
    targetRef: sizingContainerRef
  });
  useResizeDetector({
    onResize: handleResize,
    targetRef: breadcrumbItemWithOverflow
  });
  return /*#__PURE__*/React.createElement("div", {
    className: cx(blockClass, className, _defineProperty({}, "".concat(blockClass, "__with-items"), displayedBreadcrumbItems.length > 1)),
    ref: breadcrumbItemWithOverflow
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(["".concat(blockClass, "__space")])
  }, hiddenSizingItems, /*#__PURE__*/React.createElement(Breadcrumb, _extends({
    className: cx("".concat(blockClass, "__breadcrumb-container"), _defineProperty({}, "".concat(blockClass, "__breadcrumb-container-with-items"), displayedBreadcrumbItems.length > 1)),
    noTrailingSlash: noTrailingSlash
  }, other), ((_backItem = backItem) === null || _backItem === void 0 ? void 0 : _backItem.href) && (((_backItem2 = backItem) === null || _backItem2 === void 0 ? void 0 : _backItem2.label) || ((_backItem3 = backItem) === null || _backItem3 === void 0 ? void 0 : _backItem3.title)) && /*#__PURE__*/React.createElement(BreadcrumbItem, {
    className: cx("".concat(blockClass, "__breadcrumb-back"))
  }, /*#__PURE__*/React.createElement(Link, {
    href: backItem.href,
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement(IconButton, {
        label: backItem.title || backItem.label,
        align: "right"
      }, _ArrowLeft || (_ArrowLeft = /*#__PURE__*/React.createElement(ArrowLeft, {
        size: 16
      })));
    }
  })), displayedBreadcrumbItems)));
}; // Return a placeholder if not released and not enabled by feature flag

BreadcrumbWithOverflow = pkg.checkComponentEnabled(BreadcrumbWithOverflow, componentName);
BreadcrumbWithOverflow.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Optional string representing the link location for the BreadcrumbItem
     */
    href: PropTypes.string,

    /**
     * Provide if this breadcrumb item represents the current page
     */
    isCurrentPage: PropTypes.bool,

    /**
     * Key required to render array efficiently
     */
    key: PropTypes.string.isRequired,

    /**
     * Pass in content that will be inside of the BreadcrumbItem
     */
    label: PropTypes.node,

    /**
     * A string based alternative to the children, required only if children is not of type string.
     */
    title: PropTypes.string.isRequired.if(function (_ref5) {
      var label = _ref5.label;
      return typeof label !== 'string';
    })
  })),

  /**
   * className
   */
  className: PropTypes.string,

  /**
   * maxVisible: maximum visible breadcrumb-items before overflow is used (values less than 1 are treated as 1)
   */
  maxVisible: PropTypes.number,

  /**
   * noTrailing slash - same as for Carbon
   */
  noTrailingSlash: PropTypes.bool,

  /**
   * overflowAriaLabel label for open close button overflow used for breadcrumb items that do not fit.
   */
  overflowAriaLabel: PropTypes.string.isRequired.if(function (_ref6) {
    var breadcrumbs = _ref6.breadcrumbs;
    return breadcrumbs.length > 1;
  })
};
BreadcrumbWithOverflow.displayName = componentName;

export { BreadcrumbWithOverflow };
