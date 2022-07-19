/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var windowExists = typeof window !== 'undefined'; // determine whether the target is scrollable

var scrollable = function scrollable(target) {
  var style = window.getComputedStyle(target);
  return /(auto|scroll|hidden)/.test(style.overflow);
};

var scrollableAncestorInner = function scrollableAncestorInner(target) {
  if (target.parentNode && target.parentNode !== document) {
    if (scrollable(target.parentNode)) {
      return target.parentNode;
    } else {
      return scrollableAncestorInner(target.parentNode);
    }
  } else {
    return document.scrollingElement;
  }
};
/**
 * Walks up the parent nodes to identify the first scrollable ancestor
 *
 * @param {HTMLElement} target
 * @returns {HTMLElement}
 */


var scrollableAncestor = function scrollableAncestor(target) {
  if (!windowExists || !target) {
    return null;
  } // based on https://stackoverflow.com/questions/35939886/find-first-scrollable-parent


  var style = window.getComputedStyle(target);

  if (!target || style.position === 'fixed') {
    return document.scrollingElement;
  }

  return scrollableAncestorInner(target);
};

exports.scrollableAncestor = scrollableAncestor;
