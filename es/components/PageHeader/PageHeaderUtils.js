/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectSpread2 as _objectSpread2, defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import cx from 'classnames';
import { pkg } from '../../settings.js';
import { scrollableAncestor } from '../../global/js/utils/scrollableAncestor.js';
import { SkeletonText } from '@carbon/react';

var _SkeletonText;
var blockClass = "".concat(pkg.prefix, "--page-header");
/**
 * Assesses the vertical height of various elements and calls setMetrics with update
 * @param {{}} headerRef
 * @param {{}} offsetTopMeasuringRef
 * @param {{}} navigation
 * @param {boolean} enableBreadcrumbScroll
 * @param {boolean} hasActionBar
 * @param {boolean} widthIsNarrow
 * @param setMetrics
 */

var utilCheckUpdateVerticalSpace = function utilCheckUpdateVerticalSpace(headerRef, offsetTopMeasuringRef, navigation, enableBreadcrumbScroll, hasActionBar, widthIsNarrow, setMetrics) {
  var dynamicRefs = {};

  var getDynamicRef = function getDynamicRef(selector) {
    // would love to do this differently but digging in the dom seems easier
    // than getting a ref to a conditionally rendered item

    /* don't know how to test resize */

    /* istanbul ignore if */
    if (!headerRef.current) {
      return undefined;
    } else {
      var dRef = dynamicRefs[selector];
      /* istanbul ignore else */

      if (!dRef ||
      /* istanbul ignore next */
      dRef.parentNode === null) {
        dynamicRefs[selector] = headerRef.current.querySelector(selector);
      }
    }

    return dynamicRefs[selector];
  };

  setMetrics(function (previous) {
    // Utility function that checks the heights of various elements which are used to determine layout
    var update = {};
    var breadcrumbTitleEl = getDynamicRef(".".concat(blockClass, "__breadcrumb-title"));
    var breadcrumbRowEl = getDynamicRef(".".concat(blockClass, "__breadcrumb-row"));
    var titleRowEl = getDynamicRef(".".concat(blockClass, "__title-row"));
    var subtitleRowEl = getDynamicRef(".".concat(blockClass, "__subtitle-row"));
    var availableRowEl = getDynamicRef(".".concat(blockClass, "__available-row"));
    var navigationRowEl = getDynamicRef(".".concat(blockClass, "__navigation-row"));
    var pageActionsEl = getDynamicRef(".".concat(blockClass, "__page-actions"));
    /* istanbul ignore next */

    update.headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;
    /* istanbul ignore next */

    update.headerWidth = headerRef.current ? headerRef.current.offsetWidth : 0; // The header offset is the vertical distance from the top of the document to
    // the page header, which we obtain using getBoundingClientRect() for robust
    // behavior. We use this offset as the scroll/fixed threshold.

    var scrollableContainer = scrollableAncestor(headerRef.current);
    /* istanbul ignore next */

    var scrollableContainerTop = scrollableContainer ? scrollableContainer.scrollTop - scrollableContainer.offsetTop : 0; // The header offset calculation is either going to work out at 0 if we have no gap between scrolling container
    // top and the measuring ref top, or the difference between. It does not change on scroll or resize.

    update.headerOffset = scrollableContainerTop + offsetTopMeasuringRef.current.getBoundingClientRect().top;
    /* istanbul ignore next */

    update.breadcrumbRowHeight = breadcrumbRowEl ? breadcrumbRowEl.clientHeight : 0;
    /* istanbul ignore next */

    update.breadcrumbRowWidth = breadcrumbRowEl ? breadcrumbRowEl.offsetWidth : 0;
    /* istanbul ignore next */

    update.breadcrumbTitleHeight = breadcrumbTitleEl ? breadcrumbTitleEl.offsetHeight // clientHeight returns 0 when window small
    : 1;
    /* istanbul ignore next */

    update.titleRowHeight = titleRowEl ? titleRowEl.clientHeight : 0;
    /* istanbul ignore next */

    update.subtitleRowHeight = subtitleRowEl ? subtitleRowEl.clientHeight : 0;
    /* istanbul ignore next */

    update.availableRowHeight = availableRowEl ? availableRowEl.clientHeight : 0;
    /* istanbul ignore next */

    update.navigationRowHeight = navigationRowEl ? navigationRowEl.clientHeight : 1; // Base for calculating sticky top

    update.headerTopValue = -update.headerHeight;

    if (navigation) {
      // adjust top for sticky with navigation
      update.headerTopValue += update.navigationRowHeight;
    }

    if (!hasActionBar && !widthIsNarrow) {
      // Add difference between $spacing-08 and $spacing-07 to ensure space below breadcrumb is correct on scroll
      // $spacing-07 is used as size for breadcrumb when no action bar otherwise $spacing-08
      update.headerTopValue += 8;
    }

    if (!enableBreadcrumbScroll || !navigation) {
      // adjust sticky top if no navigation or breadcrumb is to stay on screen
      update.headerTopValue += update.breadcrumbRowHeight;
    }

    if (enableBreadcrumbScroll) {
      // adjust header top value when scroll enabled for breadcrumb
      update.headerTopValue -= navigation ? hasActionBar ? 0 : 10 : update.headerHeight;
    } // if (window) {


    var val;
    /* don't know how to test resize */

    /* istanbul ignore if */

    if (breadcrumbRowEl) {
      val = parseFloat(window.getComputedStyle(breadcrumbRowEl).getPropertyValue('margin-bottom'), 10);
      update.breadcrumbRowSpaceBelow = isNaN(val) ? 0 : val;
    }
    /* don't know how to test resize */

    /* istanbul ignore if */


    if (titleRowEl) {
      val = parseFloat(window.getComputedStyle(titleRowEl).getPropertyValue('margin-top'), 10);
      update.titleRowSpaceAbove = isNaN(val) ? 0 : val;

      if (pageActionsEl) {
        val = parseFloat(window.getComputedStyle(pageActionsEl).getPropertyValue('margin-top'), 10);
        update.pageActionsSpaceAbove = titleRowEl.clientHeight - pageActionsEl.clientHeight + update.titleRowSpaceAbove - (isNaN(val) ? 0 : val);
      }
    }

    return _objectSpread2(_objectSpread2({}, previous), update);
  });
}; // Trigger a window scroll, if necessary, to set the collapsed state.

var utilSetCollapsed = function utilSetCollapsed(collapse, headerOffset, headerTopValue) {
  /* don't know how to test resize */

  /* istanbul ignore else */
  if (collapse) {
    window.scrollTo({
      top: headerOffset - headerTopValue,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};
var utilGetBreadcrumbItemForTitle = function utilGetBreadcrumbItemForTitle(blockClass, collapseTitle, title) {
  var breadcrumbTitle;

  if (title) {
    if (title.text !== undefined) {
      // Shape title provided
      breadcrumbTitle = {
        label: /*#__PURE__*/React.createElement("span", null, title.loading ? _SkeletonText || (_SkeletonText = /*#__PURE__*/React.createElement(SkeletonText, null)) : title.text),
        title: title.text
      };
    } else if (title.content !== undefined) {
      var _ref, _title$breadcrumbCont;

      // user defined content
      breadcrumbTitle = {
        label: (_ref = (_title$breadcrumbCont = title.breadcrumbContent) !== null && _title$breadcrumbCont !== void 0 ? _title$breadcrumbCont : title.content) !== null && _ref !== void 0 ? _ref : title.asText,
        title: title.asText
      };
    } else {
      breadcrumbTitle = {
        label: title,
        title: title
      };
    }

    if (breadcrumbTitle) {
      breadcrumbTitle.key = 'breadcrumb-title';
      breadcrumbTitle.isCurrentPage = true;
      breadcrumbTitle.className = cx(["".concat(blockClass, "__breadcrumb-title"), _defineProperty({}, "".concat(blockClass, "__breadcrumb-title--pre-collapsed"), collapseTitle)]);
    }

    return breadcrumbTitle;
  }
};

export { blockClass, utilCheckUpdateVerticalSpace, utilGetBreadcrumbItemForTitle, utilSetCollapsed };
