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
var reactResizeDetector = require('react-resize-detector');
var iconsReact = require('@carbon/icons-react');
var uuidv4 = require('../../global/js/utils/uuidv4.js');
require('../../global/js/utils/props-helper.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _ArrowLeft;

var _excluded = ["breadcrumbs", "className", "maxVisible", "noTrailingSlash", "overflowAriaLabel"],
    _excluded2 = ["label", "key", "title", "id"],
    _excluded3 = ["className", "key", "label", "title"];

var blockClass = "".concat(settings.pkg.prefix, "--breadcrumb-with-overflow");
var componentName = 'BreadcrumbWithOverflow'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The BreadcrumbWithOverflow is used internally by the PageHeader to wrap BreadcrumbItems.
 */

exports.BreadcrumbWithOverflow = function BreadcrumbWithOverflow(_ref) {
  var _backItem, _backItem2, _backItem3;

  var breadcrumbs = _ref.breadcrumbs,
      className = _ref.className,
      maxVisible = _ref.maxVisible,
      noTrailingSlash = _ref.noTrailingSlash,
      overflowAriaLabel = _ref.overflowAriaLabel,
      other = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var carbonPrefix = react.usePrefix();

  var _useState = React.useState(3),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      displayCount = _useState2[0],
      setDisplayCount = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      displayedBreadcrumbItems = _useState4[0],
      setDisplayedBreadcrumbItems = _useState4[1];

  var breadcrumbItemWithOverflow = React.useRef(null);
  var sizingContainerRef = React.useRef(null);
  var internalId = React.useRef(uuidv4["default"]());

  var _useState5 = React.useState([]),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      hiddenSizingItems = _useState6[0],
      setHiddenSizingItems = _useState6[1]; // eslint-disable-next-line react/prop-types


  var BreadcrumbOverflowMenu = function BreadcrumbOverflowMenu(_ref2) {
    var overflowItems = _ref2.overflowItems;
    return /*#__PURE__*/React__default["default"].createElement(react.BreadcrumbItem, {
      key: "breadcrumb-overflow-".concat(internalId.current)
    }, /*#__PURE__*/React__default["default"].createElement(react.OverflowMenu, {
      ariaLabel: overflowAriaLabel,
      iconDescription: overflowAriaLabel // also needs setting to avoid a11y "Accessible name does not match or contain the visible label text"
      ,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.OverflowMenuHorizontal, _rollupPluginBabelHelpers["extends"]({
          size: 32
        }, props));
      },
      className: "".concat(blockClass, "__overflow-menu"),
      menuOptionsClass: "".concat(blockClass, "__overflow-menu-options")
    }, // eslint-disable-next-line react/prop-types
    overflowItems.map(function (item, index) {
      return /*#__PURE__*/React__default["default"].createElement(react.OverflowMenuItem, {
        key: "breadcrumb-overflow-menu-item-".concat(internalId.current, "-").concat(index),
        href: item.props.href,
        onClick: item.props.onClick,
        itemText: item.props.children
      });
    })));
  }; // create hidden sizing items


  React.useEffect(function () {
    // Hidden action bar and items used to calculate sizes
    setHiddenSizingItems( /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(blockClass, "__breadcrumb-container ").concat(blockClass, "__breadcrumb-container--hidden"),
      "aria-hidden": true,
      ref: sizingContainerRef
    }, /*#__PURE__*/React__default["default"].createElement(react.Breadcrumb, null, /*#__PURE__*/React__default["default"].createElement(react.BreadcrumbItem, {
      key: "".concat(blockClass, "-hidden-overflow-").concat(internalId)
    }, /*#__PURE__*/React__default["default"].createElement(react.OverflowMenu, {
      ariaLabel: overflowAriaLabel,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.OverflowMenuHorizontal, _rollupPluginBabelHelpers["extends"]({
          size: 32
        }, props));
      }
    })), breadcrumbs.map(function (_ref3) {
      var label = _ref3.label,
          key = _ref3.key,
          title = _ref3.title,
          id = _ref3.id,
          rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref3, _excluded2);

      return /*#__PURE__*/React__default["default"].createElement(react.BreadcrumbItem, _rollupPluginBabelHelpers["extends"]({
        key: key
      }, rest, {
        // ensure id is not duplicated
        "data-original-id": id,
        title: title !== null && title !== void 0 ? title : label
      }), label);
    }))));
  }, [breadcrumbs, overflowAriaLabel]);
  React.useEffect(function () {
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
          rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref4, _excluded3);

      return /*#__PURE__*/React__default["default"].createElement(react.BreadcrumbItem, _rollupPluginBabelHelpers["extends"]({
        key: key,
        className: index > 0 || displayCount > 1 ? cx__default["default"]([className, "".concat(blockClass, "__displayed-breadcrumb")]) : className,
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
      newDisplayedBreadcrumbItems.splice(overflowPosition, 0, /*#__PURE__*/React__default["default"].createElement(BreadcrumbOverflowMenu, {
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

        var _iterator = _rollupPluginBabelHelpers.createForOfIteratorHelper(sizingBreadcrumbItems),
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

  React.useEffect(function () {
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

  reactResizeDetector.useResizeDetector({
    onResize: handleBreadcrumbItemsResize,
    targetRef: sizingContainerRef
  });
  reactResizeDetector.useResizeDetector({
    onResize: handleResize,
    targetRef: breadcrumbItemWithOverflow
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"](blockClass, className, _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "__with-items"), displayedBreadcrumbItems.length > 1)),
    ref: breadcrumbItemWithOverflow
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"](["".concat(blockClass, "__space")])
  }, hiddenSizingItems, /*#__PURE__*/React__default["default"].createElement(react.Breadcrumb, _rollupPluginBabelHelpers["extends"]({
    className: cx__default["default"]("".concat(blockClass, "__breadcrumb-container"), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "__breadcrumb-container-with-items"), displayedBreadcrumbItems.length > 1)),
    noTrailingSlash: noTrailingSlash
  }, other), ((_backItem = backItem) === null || _backItem === void 0 ? void 0 : _backItem.href) && (((_backItem2 = backItem) === null || _backItem2 === void 0 ? void 0 : _backItem2.label) || ((_backItem3 = backItem) === null || _backItem3 === void 0 ? void 0 : _backItem3.title)) && /*#__PURE__*/React__default["default"].createElement(react.BreadcrumbItem, {
    className: cx__default["default"]("".concat(blockClass, "__breadcrumb-back"))
  }, /*#__PURE__*/React__default["default"].createElement(react.Link, {
    href: backItem.href,
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React__default["default"].createElement(react.IconButton, {
        label: backItem.title || backItem.label,
        align: "right"
      }, _ArrowLeft || (_ArrowLeft = /*#__PURE__*/React__default["default"].createElement(iconsReact.ArrowLeft, {
        size: 16
      })));
    }
  })), displayedBreadcrumbItems)));
}; // Return a placeholder if not released and not enabled by feature flag

exports.BreadcrumbWithOverflow = settings.pkg.checkComponentEnabled(exports.BreadcrumbWithOverflow, componentName);
exports.BreadcrumbWithOverflow.propTypes = {
  breadcrumbs: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    /**
     * Optional string representing the link location for the BreadcrumbItem
     */
    href: PropTypes__default["default"].string,

    /**
     * Provide if this breadcrumb item represents the current page
     */
    isCurrentPage: PropTypes__default["default"].bool,

    /**
     * Key required to render array efficiently
     */
    key: PropTypes__default["default"].string.isRequired,

    /**
     * Pass in content that will be inside of the BreadcrumbItem
     */
    label: PropTypes__default["default"].node,

    /**
     * A string based alternative to the children, required only if children is not of type string.
     */
    title: PropTypes__default["default"].string.isRequired.if(function (_ref5) {
      var label = _ref5.label;
      return typeof label !== 'string';
    })
  })),

  /**
   * className
   */
  className: PropTypes__default["default"].string,

  /**
   * maxVisible: maximum visible breadcrumb-items before overflow is used (values less than 1 are treated as 1)
   */
  maxVisible: PropTypes__default["default"].number,

  /**
   * noTrailing slash - same as for Carbon
   */
  noTrailingSlash: PropTypes__default["default"].bool,

  /**
   * overflowAriaLabel label for open close button overflow used for breadcrumb items that do not fit.
   */
  overflowAriaLabel: PropTypes__default["default"].string.isRequired.if(function (_ref6) {
    var breadcrumbs = _ref6.breadcrumbs;
    return breadcrumbs.length > 1;
  })
};
exports.BreadcrumbWithOverflow.displayName = componentName;
