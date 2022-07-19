/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, objectSpread2 as _objectSpread2, defineProperty as _defineProperty, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { breakpoints, spacing10, baseFontSize } from '@carbon/layout';
import cx from 'classnames';
import { useResizeDetector } from 'react-resize-detector';
import { FlexGrid, Row, Column, Button, Tag } from '@carbon/react';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { deprecateProp, prepareProps } from '../../global/js/utils/props-helper.js';
import { pkg } from '../../settings.js';
import { TagSet, string_required_if_more_than_10_tags } from '../TagSet/TagSet.js';
import { ChevronUp } from '@carbon/icons-react';
import { blockClass, utilCheckUpdateVerticalSpace, utilSetCollapsed, utilGetBreadcrumbItemForTitle } from './PageHeaderUtils.js';
import { PageHeaderTitle } from './PageHeaderTitle.js';
import { useNearestScroll } from '../../global/js/hooks/useWindowScroll.js';
import { useWindowResize } from '../../global/js/hooks/useWindowResize.js';
import { BreadcrumbWithOverflow } from '../BreadcrumbWithOverflow/BreadcrumbWithOverflow.js';
import { ActionBar } from '../ActionBar/ActionBar.js';
import { ButtonSetWithOverflow } from '../ButtonSetWithOverflow/ButtonSetWithOverflow.js';

var _excluded = ["actionBarItems", "actionBarMenuOptionsClass", "actionBarOverflowAriaLabel", "allTagsModalSearchLabel", "allTagsModalSearchPlaceholderText", "allTagsModalTitle", "hasBackgroundAlways", "breadcrumbOverflowAriaLabel", "breadcrumbs", "children", "className", "collapseHeader", "collapseHeaderIconDescription", "collapseTitle", "disableBreadcrumbScroll", "enableBreadcrumbScroll", "expandHeaderIconDescription", "fullWidthGrid", "hasCollapseHeaderToggle", "narrowGrid", "navigation", "pageActions", "pageActionsOverflowLabel", "pageActionsMenuOptionsClass", "showAllTagsLabel", "subtitle", "tags", "title", "withoutBackground"];
var componentName = 'PageHeader';

var defaults = {
  fullWidthGrid: false,
  narrowGrid: false
};
var PageHeader = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _withoutBackground, _enableBreadcrumbScro, _ref6, _cx2, _ref7, _cx4, _cx7;

  var actionBarItems = _ref.actionBarItems,
      actionBarMenuOptionsClass = _ref.actionBarMenuOptionsClass,
      actionBarOverflowAriaLabel = _ref.actionBarOverflowAriaLabel,
      allTagsModalSearchLabel = _ref.allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText = _ref.allTagsModalSearchPlaceholderText,
      allTagsModalTitle = _ref.allTagsModalTitle,
      deprecated_hasBackgroundAlways = _ref.hasBackgroundAlways,
      breadcrumbOverflowAriaLabel = _ref.breadcrumbOverflowAriaLabel,
      breadcrumbs = _ref.breadcrumbs,
      children = _ref.children,
      className = _ref.className,
      collapseHeader = _ref.collapseHeader,
      collapseHeaderIconDescription = _ref.collapseHeaderIconDescription,
      collapseTitle = _ref.collapseTitle,
      deprecated_disableBreadcrumbScroll = _ref.disableBreadcrumbScroll,
      enableBreadcrumbScroll = _ref.enableBreadcrumbScroll,
      expandHeaderIconDescription = _ref.expandHeaderIconDescription,
      _ref$fullWidthGrid = _ref.fullWidthGrid,
      fullWidthGrid = _ref$fullWidthGrid === void 0 ? defaults.fullWidthGrid : _ref$fullWidthGrid,
      hasCollapseHeaderToggle = _ref.hasCollapseHeaderToggle,
      _ref$narrowGrid = _ref.narrowGrid,
      narrowGrid = _ref$narrowGrid === void 0 ? defaults.narrowGrid : _ref$narrowGrid,
      navigation = _ref.navigation,
      pageActions = _ref.pageActions,
      pageActionsOverflowLabel = _ref.pageActionsOverflowLabel,
      pageActionsMenuOptionsClass = _ref.pageActionsMenuOptionsClass,
      showAllTagsLabel = _ref.showAllTagsLabel,
      subtitle = _ref.subtitle,
      tags = _ref.tags,
      title = _ref.title,
      withoutBackground = _ref.withoutBackground,
      rest = _objectWithoutProperties(_ref, _excluded);

  // handle deprecated props - START
  // if withoutBackground is nullish check deprecated_hasBackgroundAlways and default false
  (_withoutBackground = withoutBackground) !== null && _withoutBackground !== void 0 ? _withoutBackground : withoutBackground = !(deprecated_hasBackgroundAlways !== null && deprecated_hasBackgroundAlways !== void 0 ? deprecated_hasBackgroundAlways : true); // prefer enabled if nullish check deprecated_disableBreadcrumbScroll and default false

  (_enableBreadcrumbScro = enableBreadcrumbScroll) !== null && _enableBreadcrumbScro !== void 0 ? _enableBreadcrumbScro : enableBreadcrumbScroll = !(deprecated_disableBreadcrumbScroll !== null && deprecated_disableBreadcrumbScroll !== void 0 ? deprecated_disableBreadcrumbScroll : true); // handle deprecated props - END

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      metrics = _useState2[0],
      setMetrics = _useState2[1];

  var _useState3 = useState(_objectSpread2({}, rest.style)),
      _useState4 = _slicedToArray(_useState3, 2),
      pageHeaderStyles = _useState4[0],
      setPageHeaderStyles = _useState4[1]; // refs


  var localHeaderRef = useRef(null);
  var headerRef = ref || localHeaderRef;
  var sizingContainerRef = useRef();
  var offsetTopMeasuringRef = useRef(null); // state based on props only

  var hasActionBar = actionBarItems && actionBarItems.length > 0;
  var hasBreadcrumbRow = !!breadcrumbs || !!actionBarItems; // utility functions

  var checkUpdateVerticalSpace = function checkUpdateVerticalSpace() {
    return utilCheckUpdateVerticalSpace(headerRef, offsetTopMeasuringRef, navigation, enableBreadcrumbScroll, hasActionBar, widthIsNarrow, setMetrics);
  }; // NOTE: The buffer is used to add space between the bottom of the header and the last content
  // Not pre-collapsed and (subtitle or children)


  var lastRowBufferActive = (title || pageActions) && !collapseTitle || subtitle || children; // state based on scroll/resize based effects

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      pageActionsInBreadcrumbRow = _useState6[0],
      setPageActionsInBreadcrumbRow = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      scrollYValue = _useState8[0],
      setScrollYValue = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      hasCollapseButton = _useState10[0],
      setHasCollapseButton = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      spaceForCollapseButton = _useState12[0],
      setSpaceForCollapseButton = _useState12[1];

  var _useState13 = useState(0),
      _useState14 = _slicedToArray(_useState13, 2),
      actionBarMaxWidth = _useState14[0],
      setActionBarMaxWidth = _useState14[1];

  var _useState15 = useState(0),
      _useState16 = _slicedToArray(_useState15, 2),
      actionBarMinWidth = _useState16[0],
      setActionBarMinWidth = _useState16[1];

  var _useState17 = useState(0),
      _useState18 = _slicedToArray(_useState17, 2),
      pageActionInBreadcrumbMaxWidth = _useState18[0],
      setPageActionInBreadcrumbMaxWidth = _useState18[1];

  var _useState19 = useState(0),
      _useState20 = _slicedToArray(_useState19, 2),
      pageActionInBreadcrumbMinWidth = _useState20[0],
      setPageActionInBreadcrumbMinWidth = _useState20[1];

  var _useState21 = useState(0),
      _useState22 = _slicedToArray(_useState21, 2),
      actionBarColumnWidth = _useState22[0],
      setActionBarColumnWidth = _useState22[1];

  var _useState23 = useState(false),
      _useState24 = _slicedToArray(_useState23, 2),
      fullyCollapsed = _useState24[0],
      setFullyCollapsed = _useState24[1];

  var _useState25 = useState(false),
      _useState26 = _slicedToArray(_useState25, 2),
      widthIsNarrow = _useState26[0],
      setWidthIsNarrow = _useState26[1]; // handlers


  var handleActionBarWidthChange = function handleActionBarWidthChange(_ref2) {
    var minWidth = _ref2.minWidth,
        maxWidth = _ref2.maxWidth;

    /* don't know how to test resize */

    /* istanbul ignore next */
    setActionBarMaxWidth(maxWidth);
    /* don't know how to test resize */

    /* istanbul ignore next */

    setActionBarMinWidth(minWidth);
  };

  var handlePageActionWidthChange = function handlePageActionWidthChange(_ref3) {
    var minWidth = _ref3.minWidth,
        maxWidth = _ref3.maxWidth;

    /* don't know how to test resize */

    /* istanbul ignore next */
    setPageActionInBreadcrumbMaxWidth(maxWidth);
    /* don't know how to test resize */

    /* istanbul ignore next */

    setPageActionInBreadcrumbMinWidth(minWidth);
  };
  /* istanbul ignore next */


  var handleResizeActionBarColumn = function handleResizeActionBarColumn(width) {
    /* don't know how to test resize */

    /* istanbul ignore next */
    setActionBarColumnWidth(width);
  };
  /* istanbul ignore next */


  var handleResize = function handleResize() {
    // receives width and height parameters if needed

    /* don't know how to test resize */

    /* istanbul ignore next */
    checkUpdateVerticalSpace();
  };

  var handleCollapseToggle = function handleCollapseToggle() {
    utilSetCollapsed(!fullyCollapsed, metrics.headerOffset, metrics.headerTopValue);
  }; // use effects


  useEffect(function () {
    /* istanbul ignore else */
    if (pageActions !== null && pageActions !== void 0 && pageActions.content) {
      var minWidth = pageActions.minWidth,
          maxWidth = pageActions.maxWidth;
      handlePageActionWidthChange({
        minWidth: minWidth,
        maxWidth: maxWidth
      });
    }
  }, [pageActions]);
  useEffect(function () {
    // Determine the location of the pageAction buttons

    /* istanbul ignore next */
    setPageActionsInBreadcrumbRow(collapseTitle || hasActionBar && scrollYValue > metrics.titleRowSpaceAbove || widthIsNarrow && scrollYValue > metrics.pageActionsSpaceAbove);
  }, [hasActionBar, metrics.breadcrumbRowSpaceBelow, metrics.titleRowSpaceAbove, metrics.pageActionsSpaceAbove, collapseTitle, scrollYValue, widthIsNarrow]);
  useEffect(function () {
    // Assesses the size of the action bar and page action area and their required
    // space before setting their sizes
    //
    var newActionBarWidth = 'initial';
    var newPageActionInBreadcrumbWidth = 'initial';
    /* don't know how to test resize */

    /* istanbul ignore if */

    if (actionBarColumnWidth > 0) {
      if (pageActionInBreadcrumbMaxWidth > 0 && actionBarColumnWidth > actionBarMaxWidth + pageActionInBreadcrumbMaxWidth) {
        newPageActionInBreadcrumbWidth = "".concat(pageActionInBreadcrumbMaxWidth, "px");
      } else if (pageActionInBreadcrumbMinWidth > 0) {
        newPageActionInBreadcrumbWidth = "".concat(pageActionInBreadcrumbMinWidth, "px");
      }

      if (actionBarMaxWidth > 0 && actionBarColumnWidth > pageActionInBreadcrumbMinWidth + actionBarMaxWidth) {
        newActionBarWidth = "".concat(actionBarMaxWidth, "px");
      } else {
        if (actionBarMinWidth > 0) {
          newActionBarWidth = "".concat(actionBarColumnWidth - pageActionInBreadcrumbMinWidth, "px");
        }
      }
    }

    setPageHeaderStyles(function (prev) {
      var _objectSpread2$1;

      return _objectSpread2(_objectSpread2({}, prev), {}, (_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, "--".concat(blockClass, "--max-action-bar-width-px"), newActionBarWidth), _defineProperty(_objectSpread2$1, "--".concat(blockClass, "--button-set-in-breadcrumb-width-px"), "".concat(newPageActionInBreadcrumbWidth)), _objectSpread2$1));
    });
  }, [actionBarColumnWidth, actionBarMaxWidth, actionBarMinWidth, pageActionInBreadcrumbMaxWidth, pageActionInBreadcrumbMinWidth, headerRef]);
  useEffect(function () {
    // Updates custom CSS props used to manage scroll behavior

    /* istanbul ignore next */
    setPageHeaderStyles(function (prev) {
      var _objectSpread3;

      return _objectSpread2(_objectSpread2({}, prev), {}, (_objectSpread3 = {}, _defineProperty(_objectSpread3, "--".concat(blockClass, "--height-px"), "".concat(metrics.headerHeight, "px")), _defineProperty(_objectSpread3, "--".concat(blockClass, "--width-px"), "".concat(metrics.headerWidth, "px")), _defineProperty(_objectSpread3, "--".concat(blockClass, "--header-top"), "".concat(metrics.headerTopValue + metrics.headerOffset, "px")), _defineProperty(_objectSpread3, "--".concat(blockClass, "--breadcrumb-title-visibility"), scrollYValue > 0 ? 'visible' : 'hidden'), _defineProperty(_objectSpread3, "--".concat(blockClass, "--scroll"), "".concat(scrollYValue)), _defineProperty(_objectSpread3, "--".concat(blockClass, "--breadcrumb-title-top"), "".concat(Math.max(0, metrics.breadcrumbTitleHeight + metrics.titleRowSpaceAbove - scrollYValue), "px")), _defineProperty(_objectSpread3, "--".concat(blockClass, "--breadcrumb-title-opacity"), "".concat(Math.min(1, Math.max(0, (scrollYValue - (metrics.titleRowSpaceAbove || 0)) / (metrics.breadcrumbTitleHeight || 1) // don't want to divide by zero
      )))), _defineProperty(_objectSpread3, "--".concat(blockClass, "--breadcrumb-row-width-px"), "".concat(metrics.breadcrumbRowWidth, "px")), _objectSpread3));
    });
  }, [headerRef, enableBreadcrumbScroll, metrics, metrics.breadcrumbRowHeight, metrics.breadcrumbRowSpaceBelow, metrics.breadcrumbTitleHeight, metrics.breadcrumbRowWidth, metrics.headerHeight, metrics.headerWidth, metrics.headerOffset, metrics.headerTopValue, metrics.navigationRowHeight, navigation, scrollYValue, tags]);
  useNearestScroll(headerRef, // on scroll or various layout changes check updates if needed
  // istanbul ignore next
  function (_ref4) {
    var current = _ref4.current;
    setPageHeaderStyles(function (prev) {
      return _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, "--".concat(blockClass, "--breadcrumb-top"), "".concat(metrics.headerOffset, "px")));
    });
    var fullyCollapsed = current.scrollY + metrics.headerTopValue + metrics.headerOffset >= 0;
    setFullyCollapsed(fullyCollapsed); // set offset for tagset tooltip

    /* istanbul ignore next */

    var tagsetTooltipOffset = fullyCollapsed ? metrics.headerHeight + metrics.headerTopValue + metrics.headerOffset : metrics.headerHeight + metrics.headerOffset;
    /* istanbul ignore next */

    document.documentElement.style.setProperty("--".concat(blockClass, "--tagset-tooltip-position"), fullyCollapsed ? 'fixed' : 'absolute');
    document.documentElement.style.setProperty("--".concat(blockClass, "--tagset-tooltip-offset"), "".concat(tagsetTooltipOffset, "px"));
    setScrollYValue(current.scrollY);
  }, [metrics.headerHeight, metrics.headerTopValue, metrics.headerOffset, enableBreadcrumbScroll]);
  useWindowResize(function (_ref5) {
    var current = _ref5.current;
    // on window resize and other updates some values may have changed
    checkUpdateVerticalSpace();
    setWidthIsNarrow(current.innerWidth < breakpoints.md.width); // small (below medium) media query
  }, [actionBarItems, children, breadcrumbs, enableBreadcrumbScroll, navigation, pageActions, subtitle, tags, title]);
  useEffect(function () {
    checkUpdateVerticalSpace(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullWidthGrid, narrowGrid]);
  useEffect(function () {
    // Determines the appropriate header background opacity based on the header config/height/scroll and the withoutBackground setting
    var result = withoutBackground ? 0 : 1;

    if (!result && metrics.headerHeight > 0 && (breadcrumbs || actionBarItems || tags || navigation)) {
      var startAddingAt = parseFloat(spacing10, 10) * parseInt(baseFontSize);
      var scrollRemaining = metrics.headerHeight - scrollYValue;
      /* don't know how to test resize */

      /* istanbul ignore if */

      if (scrollRemaining < startAddingAt) {
        var distanceAddingOver = startAddingAt - metrics.breadcrumbRowHeight;
        result = Math.min(1, (startAddingAt - scrollRemaining) / distanceAddingOver);
      }
    }

    setPageHeaderStyles(function (prev) {
      return _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, "--".concat(blockClass, "--background-opacity"), result));
    });
  }, [actionBarItems, withoutBackground, breadcrumbs, headerRef, metrics.breadcrumbRowHeight, metrics.headerHeight, navigation, scrollYValue, hasCollapseHeaderToggle, tags]);
  useEffect(function () {
    // only has toggle if requested and withoutBackground is unset/falsy
    // NOTE: prop-types isRequired.if for the expand and collapse
    // icon descriptions depends on the this.
    setHasCollapseButton(hasCollapseHeaderToggle && !withoutBackground);
  }, [withoutBackground, hasCollapseHeaderToggle]);
  useEffect(function () {
    // Determine if space is needed in the breadcrumb for a collapse button
    setSpaceForCollapseButton(hasCollapseButton && !(navigation || tags) && metrics.headerHeight);
  }, [hasCollapseButton, navigation, tags, metrics.headerHeight]);

  var nextToTabsCheck = function nextToTabsCheck() {
    /* istanbul ignore next */
    return enableBreadcrumbScroll && !actionBarItems && scrollYValue + metrics.headerTopValue >= 0;
  };

  useEffect(function () {
    if (typeof collapseHeader === 'boolean') {
      utilSetCollapsed(collapseHeader, metrics.headerOffset, metrics.headerTopValue);
    }
  }, [collapseHeader, metrics.headerOffset, metrics.headerTopValue]);
  useResizeDetector({
    onResize: handleResizeActionBarColumn,
    targetRef: sizingContainerRef,
    handleWidth: true
  });
  useResizeDetector({
    onResize: handleResize,
    targetRef: headerRef,
    handleHeight: true
  }); // Determine what form of title to display in the breadcrumb

  var breadcrumbItemForTitle = utilGetBreadcrumbItemForTitle(blockClass, collapseTitle, title);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "--offset-top-measuring-element"),
    ref: offsetTopMeasuringRef
  }), /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    className: cx([blockClass, "".concat(blockClass, "--no-margins-below-row"), className, (_ref6 = {}, _defineProperty(_ref6, "".concat(blockClass, "--has-navigation"), navigation || tags), _defineProperty(_ref6, "".concat(blockClass, "--has-navigation-tags-only"), !navigation && tags), _ref6)]),
    style: pageHeaderStyles,
    ref: headerRef
  }, getDevtoolsProps(componentName)), /*#__PURE__*/React.createElement(FlexGrid, {
    fullWidth: fullWidthGrid === true || fullWidthGrid === 'xl',
    narrow: narrowGrid,
    className: cx(_defineProperty({}, "".concat(blockClass, "--width--xl"), fullWidthGrid === 'xl'))
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__non-navigation-row-content")
  }, hasBreadcrumbRow ? /*#__PURE__*/React.createElement(Row, {
    className: cx("".concat(blockClass, "__breadcrumb-row"), (_cx2 = {}, _defineProperty(_cx2, "".concat(blockClass, "__breadcrumb-row--next-to-tabs"), nextToTabsCheck()), _defineProperty(_cx2, "".concat(blockClass, "__breadcrumb-row--has-breadcrumbs"), breadcrumbs || breadcrumbItemForTitle), _defineProperty(_cx2, "".concat(blockClass, "__breadcrumb-row--has-action-bar"), hasActionBar || widthIsNarrow), _defineProperty(_cx2, "".concat(blockClass, "__has-page-actions-without-action-bar"), !hasActionBar && !widthIsNarrow && pageActions), _cx2))
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__breadcrumb-row--container")
  }, /*#__PURE__*/React.createElement(Column, {
    className: cx("".concat(blockClass, "__breadcrumb-column"), _defineProperty({}, "".concat(blockClass, "__breadcrumb-column--background"), !!breadcrumbs || hasActionBar || widthIsNarrow))
  }, breadcrumbs || breadcrumbItemForTitle ? /*#__PURE__*/React.createElement(BreadcrumbWithOverflow, {
    className: "".concat(blockClass, "__breadcrumb"),
    noTrailingSlash: !!title,
    overflowAriaLabel: breadcrumbOverflowAriaLabel,
    breadcrumbs: breadcrumbs && breadcrumbItemForTitle ? breadcrumbs.concat(breadcrumbItemForTitle) : breadcrumbItemForTitle ? [breadcrumbItemForTitle] : breadcrumbs // breadcrumbs may be null or undefined

  }) : null), /*#__PURE__*/React.createElement(Column, {
    className: cx(["".concat(blockClass, "__action-bar-column ").concat(blockClass, "__action-bar-column--background"), (_ref7 = {}, _defineProperty(_ref7, "".concat(blockClass, "__action-bar-column--has-page-actions"), pageActions), _defineProperty(_ref7, "".concat(blockClass, "__action-bar-column--influenced-by-collapse-button"), spaceForCollapseButton), _ref7)])
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__action-bar-column-content"),
    ref: sizingContainerRef
  }, hasActionBar ?
  /*#__PURE__*/
  // Investigate the responsive behavior or this and the title also fix the ActionBar Item and PageAction story css
  React.createElement(React.Fragment, null, thePageActions(true, pageActionsInBreadcrumbRow), /*#__PURE__*/React.createElement(ActionBar, {
    menuOptionsClass: cx(actionBarMenuOptionsClass, "".concat(blockClass, "__action-bar-menu-options")),
    overflowAriaLabel: actionBarOverflowAriaLabel,
    actions: actionBarItems,
    className: "".concat(blockClass, "__action-bar"),
    onWidthChange: handleActionBarWidthChange,
    rightAlign: true
  })) : widthIsNarrow && thePageActions(true, pageActionsInBreadcrumbRow))))) : null, !collapseTitle && (title || pageActions) ? /*#__PURE__*/React.createElement(Row, {
    className: cx("".concat(blockClass, "__title-row"), (_cx4 = {}, _defineProperty(_cx4, "".concat(blockClass, "__title-row--no-breadcrumb-row"), !hasBreadcrumbRow), _defineProperty(_cx4, "".concat(blockClass, "__title-row--under-action-bar"), hasActionBar || widthIsNarrow), _defineProperty(_cx4, "".concat(blockClass, "__title-row--has-page-actions"), !!pageActions), _defineProperty(_cx4, "".concat(blockClass, "__title-row--sticky"), !!pageActions && !actionBarItems && hasBreadcrumbRow), _cx4))
  }, /*#__PURE__*/React.createElement(Column, {
    className: "".concat(blockClass, "__title-column")
  }, title ? /*#__PURE__*/React.createElement(PageHeaderTitle, {
    blockClass: blockClass,
    hasBreadcrumbRow: hasBreadcrumbRow,
    title: title
  }) : null), thePageActions(false, pageActionsInBreadcrumbRow)) : null, subtitle ? /*#__PURE__*/React.createElement(Row, {
    className: "".concat(blockClass, "__subtitle-row")
  }, /*#__PURE__*/React.createElement(Column, {
    className: "".concat(blockClass, "__subtitle")
  }, subtitle)) : null, children ? /*#__PURE__*/React.createElement(Row, {
    className: "".concat(blockClass, "__available-row")
  }, /*#__PURE__*/React.createElement(Column, {
    className: "".concat(blockClass, "__available-column")
  }, children)) : null, (breadcrumbs || actionBarItems || title || pageActions || children || subtitle) && /*#__PURE__*/React.createElement("div", {
    className: cx(["".concat(blockClass, "__last-row-buffer"), _defineProperty({}, "".concat(blockClass, "__last-row-buffer--active"), lastRowBufferActive)])
  }), // this navigation row scrolls under the breadcrumb if there is one
  tags && !navigation ? /*#__PURE__*/React.createElement(Row, {
    className: cx("".concat(blockClass, "__navigation-row"), _defineProperty({}, "".concat(blockClass, "__navigation-row--has-tags"), tags))
  }, /*#__PURE__*/React.createElement(Column, {
    className: cx("".concat(blockClass, "__navigation-tags"), _defineProperty({}, "".concat(blockClass, "__navigation-tags--tags-only"), !navigation))
  }, /*#__PURE__*/React.createElement(TagSet, {
    overflowAlign: "start",
    allTagsModalSearchLabel: allTagsModalSearchLabel,
    allTagsModalSearchPlaceholderText: allTagsModalSearchPlaceholderText,
    allTagsModalTitle: allTagsModalTitle,
    showAllTagsLabel: showAllTagsLabel,
    tags: tags,
    overflowClassName: "".concat(blockClass, "__navigation-tags-overflow")
  }))) : null), // this navigation pushes the breadcrumb off or settles underneath it depending on enableBreadcrumbScroll
  navigation ? /*#__PURE__*/React.createElement(Row, {
    className: cx("".concat(blockClass, "__navigation-row"), (_cx7 = {}, _defineProperty(_cx7, "".concat(blockClass, "__navigation-row--spacing-above-06"), !!navigation), _defineProperty(_cx7, "".concat(blockClass, "__navigation-row--has-tags"), tags), _cx7))
  }, /*#__PURE__*/React.createElement(Column, {
    className: "".concat(blockClass, "__navigation-tabs")
  }, navigation), tags ? /*#__PURE__*/React.createElement(Column, {
    className: cx("".concat(blockClass, "__navigation-tags"), _defineProperty({}, "".concat(blockClass, "__navigation-tags--tags-only"), !navigation))
  }, /*#__PURE__*/React.createElement(TagSet, {
    overflowAlign: "end",
    allTagsModalSearchLabel: allTagsModalSearchLabel,
    allTagsModalSearchPlaceholderText: allTagsModalSearchPlaceholderText,
    allTagsModalTitle: allTagsModalTitle,
    showAllTagsLabel: showAllTagsLabel,
    tags: tags,
    overflowClassName: "".concat(blockClass, "__navigation-tags-overflow")
  })) : null) : null), hasCollapseButton ? /*#__PURE__*/React.createElement(Button, {
    className: cx("".concat(blockClass, "__collapse-expand-toggle"), _defineProperty({}, "".concat(blockClass, "__collapse-expand-toggle--collapsed"), fullyCollapsed)),
    hasIconOnly: true,
    iconDescription:
    /* istanbul ignore next */
    fullyCollapsed ? expandHeaderIconDescription : collapseHeaderIconDescription,
    kind: "ghost",
    onClick: handleCollapseToggle,
    renderIcon: function renderIcon(props) {
      return /*#__PURE__*/React.createElement(ChevronUp, _extends({
        size: 16
      }, props));
    },
    size: "md",
    tooltipPosition: "bottom",
    tooltipAlignment: "end",
    type: "button"
  }) : null));

  function thePageActions(isBreadcrumbRow, inBreadcrumbRow) {
    if (pageActions) {
      var _pageActions$content;

      var _Tag = isBreadcrumbRow ? 'div' : Column; // Only report size change of version action bar is rendered as part of the breadcrumb row.
      // and when there is an actionBar


      var handleWidthChange = isBreadcrumbRow && hasBreadcrumbRow ? handlePageActionWidthChange : function () {};
      return /*#__PURE__*/React.createElement(_Tag, {
        className: cx("".concat(blockClass, "__page-actions"), _defineProperty({}, "".concat(blockClass, "__page-actions--in-breadcrumb"), inBreadcrumbRow))
      }, /*#__PURE__*/React.createElement("div", {
        className: cx("".concat(blockClass, "__page-actions-content"))
      }, (_pageActions$content = pageActions.content) !== null && _pageActions$content !== void 0 ? _pageActions$content : /*#__PURE__*/React.createElement(ButtonSetWithOverflow, {
        classname: "".concat(blockClass, "__button-set-with-overflow"),
        menuOptionsClass: cx(pageActionsMenuOptionsClass, "".concat(blockClass, "__button-set-menu-options")),
        onWidthChange: handleWidthChange,
        buttons: pageActions,
        buttonSetOverflowLabel: pageActionsOverflowLabel,
        rightAlign: true
      })));
    }
  }
}); // Return a placeholder if not released and not enabled by feature flag

PageHeader = pkg.checkComponentEnabled(PageHeader, componentName); // copied from carbon-components-react/src/components/Tag/Tag.js for DocGen

var TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  'high-contrast': 'High-Contrast',
  outline: 'Outline'
};
var tagTypes = Object.keys(TYPES);
var deprecatedProps = {
  /**
   * **Deprecated** see property `enableBreadcrumbScroll`
   */
  disableBreadcrumbScroll: deprecateProp(PropTypes.bool, 'Property replaced by `enableBreadcrumbScroll`'),

  /**
   * **Deprecated** see property `withoutBackground`
   */
  hasBackgroundAlways: deprecateProp(PropTypes.bool, 'Property replaced by `withoutBackground`')
};
PageHeader.tagTypes = tagTypes;
PageHeader.propTypes = _objectSpread2({
  /**
   * Specifies the action bar items which are the final items in the row top of the PageHeader.
   * Each item is specified as an object with the properties of a Carbon Button in icon only form.
   * Button kind, size, tooltipPosition, tooltipAlignment and type are ignored.
   */
  actionBarItems: PropTypes.arrayOf(PropTypes.shape(_objectSpread2(_objectSpread2({}, prepareProps(Button.propTypes, ['kind', 'size', 'tooltipPosition', 'tooltipAlignment'])), {}, {
    iconDescription: PropTypes.string.isRequired,
    onClick: Button.propTypes.onClick,
    renderIcon: Button.propTypes.renderIcon.isRequired
  }))),

  /**
   * class name applied to the action bar overflow options
   */
  actionBarMenuOptionsClass: PropTypes.string,

  /**
   * When there is insufficient space for all actionBarItems to be displayed this
   * aria label is used for the action bar overflow menu
   *
   * NOTE: This prop is required if actionBarItems are supplied
   */
  actionBarOverflowAriaLabel: PropTypes.string.isRequired.if(function (_ref9) {
    var actionBarItems = _ref9.actionBarItems;
    return actionBarItems && actionBarItems.length > 0;
  }),

  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this label is used in a dialog showing
   * all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel: string_required_if_more_than_10_tags,

  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this placeholder is used in a dialog
   * showing all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText: string_required_if_more_than_10_tags,

  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this title is used in a dialog showing
   * all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalTitle: string_required_if_more_than_10_tags,

  /**
   * If the user supplies breadcrumbs then this property is required.
   * It is used in an overflow menu when there is insufficient space to display all breadcrumbs inline.
   */
  breadcrumbOverflowAriaLabel: PropTypes.string.isRequired.if(function (_ref10) {
    var breadcrumbs = _ref10.breadcrumbs;
    return breadcrumbs && breadcrumbs.length > 0;
  }),

  /**
   * Specifies the breadcrumb components to be shown in the breadcrumb area of
   * the page header. Each item is specified as an object with optional fields
   * 'label' to supply the breadcrumb label, 'href' to supply the link location,
   * and 'isCurrentPage' to specify whether this breadcrumb component represents
   * the current page. Each item should also include a unique 'key' field to
   * enable efficient rendering, and if the label is not a string then a 'title'
   * field is required to provide a text alternative for display. Any other
   * fields in the object will be passed through to the breadcrumb element as
   * HTML attributes.
   */
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
     * A text version of the `label` for display, required if `label` is not a string.
     */
    title: PropTypes.string.isRequired.if(function (_ref11) {
      var label = _ref11.label;
      return typeof label !== 'string';
    })
  })),

  /**
   * A zone for placing high-level, client content above the page tabs.
   * Accepts arbitrary renderable content as a React node. Optional.
   */
  children: PropTypes.node,

  /**
   * Specifies class(es) to be applied to the top-level PageHeader node.
   * Optional.
   */
  className: PropTypes.string,

  /**
   * The header can as a whole be collapsed, expanded or somewhere in between.
   * This setting controls the initial value, but also takes effect on change
   *
   * NOTE: The header is collapsed by setting the scroll position to hide part of the header.
   * Collapsing has no effect if there is insufficient content to scroll.
   */
  collapseHeader: PropTypes.bool,

  /**
   * If `hasCollapseHeaderToggle` is set and `withoutBackground` is unset/falsy then assistive text is
   * required for both the expend and collapse states of the button component used.
   */
  collapseHeaderIconDescription: PropTypes.string.isRequired.if(function (_ref12) {
    var withoutBackground = _ref12.withoutBackground,
        hasCollapseHeaderToggle = _ref12.hasCollapseHeaderToggle;
    return !withoutBackground && hasCollapseHeaderToggle;
  }),

  /**
   * The title row typically starts below the breadcrumb row. This option
   * preCollapses it into the breadcrumb row.
   */
  collapseTitle: PropTypes.bool,

  /**
   * Standard keeps the breadcrumb on the page. This option allows the breadcrumb
   * to scroll off
   */
  enableBreadcrumbScroll: PropTypes.bool,

  /**
   * If `hasCollapseHeaderToggle` is set and `withoutBackground` is unset/falsy then assistive text is
   * required for both the expend and collapse states of the button component used.
   */
  expandHeaderIconDescription: PropTypes.string.isRequired.if(function (_ref13) {
    var withoutBackground = _ref13.withoutBackground,
        hasCollapseHeaderToggle = _ref13.hasCollapseHeaderToggle;
    return !withoutBackground && hasCollapseHeaderToggle;
  }),

  /**
   * The PageHeader is hosted in a Carbon grid, this value is passed through to the Carbon grid fullWidth prop.
   * 'xl' is used to override the grid width setting. Can be used with narrowGrid: true to get the largest size.
   */
  fullWidthGrid: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['xl'])]),

  /**
   * Adds a button as the last element of the bottom row which collapses and expands the header.
   *
   * NOTE: The header is collapsed by setting the scroll position to hide part of the header.
   * Collapsing has no effect if there is insufficient content to scroll.
   */
  hasCollapseHeaderToggle: PropTypes.bool,

  /**
   * The PageHeader is hosted in a Carbon grid, this value is passed through to the Carbon grid narrow prop
   */
  narrowGrid: PropTypes.bool,

  /**
   * Content for the navigation area in the PageHeader. Should
   * be a React element that is normally a Carbon Tabs component. Optional.
   */
  navigation: PropTypes.element,
  // Supports Tabs

  /**
   * Specifies the primary page actions which are placed at the same level in the page as the title.
   *
   * Either a set of actions, each specified as an object with the properties of a Carbon Button plus:
   *
   * - label: node
   *
   * Or a single object
   *
   * - content: content to be rendered. NOTE: must be capable of restricting itself to the space provided. This 2.5rem height ($spacing-08)
   * and the width not used by action bar items when scrolled into toolbar.
   * - minWidth: smallest number of pixel width the content would like. NOTE: This is not guaranteed and may be less on small viewports.
   * - maxWidth: maximum number of pixels the content will grow to
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  pageActions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(_objectSpread2(_objectSpread2({}, Button.propTypes), {}, {
    key: PropTypes.string.isRequired,
    kind: Button.propTypes.kind,
    label: PropTypes.node,
    onClick: PropTypes.func
  }))), PropTypes.shape({
    /**
     * minWidth should not be more than 180
     * The content is expected to adjust itself to fit in
     */
    content: PropTypes.node.isRequired,
    minWidth: PropTypes.number.isRequired,
    maxWidth: PropTypes.number.isRequired
  })]),

  /**
   * class name applied to the page actions overflow options
   */
  pageActionsMenuOptionsClass: PropTypes.string,

  /**
   * When there is insufficient space to display all of hte page actions inline a dropdown button menu is shown,
   * containing the page actions. This label is used as the display content of the dropdown button menu.
   *
   * NOTE: This prop is required if pageActions are supplied
   */
  pageActionsOverflowLabel: PropTypes.node.isRequired.if(function (_ref14) {
    var pageActions = _ref14.pageActions;
    return pageActions && pageActions.length > 0 && !pageActions.content;
  }),

  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this label is used to offer a
   * "View all tags" option.
   *
   * **Note: Required if more than 10 tags**
   */
  showAllTagsLabel: string_required_if_more_than_10_tags,

  /**
   * Sitting just below the title is this optional subtitle that provides additional context to
   * identify the current page.
   */
  subtitle: PropTypes.string,

  /**
   * An array of tags to be shown as the final content in the PageHeader.
   *
   * Each tag is specified as an object with the following properties
   * **label**\* (required) to supply the tag content, and properties of the the Carbon Tag component,
   * such as **type**, **disabled**, **ref**, **className** , and any other Tag props.
   *
   * NOTE: **filter** is not supported. Any remaining fields in the object will be passed through to the HTML element
   * as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  tags: PropTypes.arrayOf(PropTypes.shape(_objectSpread2(_objectSpread2({}, prepareProps(Tag.propTypes, 'filter')), {}, {
    label: PropTypes.string.isRequired,
    // we duplicate this prop to improve the DocGen
    type: PropTypes.oneOf(tagTypes)
  }))),

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
   *    - editableLabel: label for edit required if onChange supplied
   *    - cancelDescription: label for edit cancel button
   *    - saveDescription: label for edit save button
   *    - Object containing user defined contents.
   *      These must fit within the area defined for the title in both main part of the header and the breadcrumb.
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
    editableLabel: PropTypes.string,
    // .isRequired.if(inlineEditRequired),
    id: PropTypes.string,
    // .isRequired.if(inlineEditRequired),
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    cancelDescription: PropTypes.string,
    // .isRequired.if(inlineEditRequired),
    saveDescription: PropTypes.string // .isRequired.if(inlineEditRequired),
    // Update docgen if changed

  }), PropTypes.string, PropTypes.shape({
    content: PropTypes.node.isRequired,
    breadcrumbContent: PropTypes.node,
    asText: PropTypes.string.isRequired
  })]),

  /**
   * Specifies if the PageHeader should appear without a background color, and defaults to the preferred `false` (a background color is shown).
   * Note that when `true` some parts of the header still gain a background if and when they stick to the top of the PageHeader on scroll.
   */
  withoutBackground: PropTypes.bool
}, deprecatedProps);
PageHeader.displayName = componentName;

export { PageHeader, deprecatedProps };
