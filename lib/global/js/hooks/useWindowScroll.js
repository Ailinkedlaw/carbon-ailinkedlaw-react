/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var scrollableAncestor = require('../utils/scrollableAncestor.js');

var windowExists = typeof window !== 'undefined';

var useTargetScroll = function useTargetScroll(target, effect, deps, throttleInterval) {
  var scrollPosition = React.useRef({});
  var throttleTimeout = React.useRef(null);

  var getScrollPosition = function getScrollPosition() {
    if (!target || !windowExists && target === window) {
      return {
        scrollX: -1,
        scrollY: -1
      };
    } //


    var scrollX, scrollY;

    if (target === window) {
      // eslint-disable-next-line prefer-destructuring
      scrollX = window.scrollX; // eslint-disable-next-line prefer-destructuring

      scrollY = window.scrollY;
    } else {
      scrollX = target.scrollLeft;
      scrollY = target.scrollTop;
    }

    return {
      scrollX: scrollX,
      scrollY: scrollY
    };
  };

  var doGetScrollPosition = function doGetScrollPosition() {
    var newVal = {
      previous: scrollPosition.current,
      current: getScrollPosition()
    }; // call effect

    effect(newVal);
    scrollPosition.current = newVal.current;
    throttleTimeout.current = null;
  };

  React.useLayoutEffect(function () {
    var handleScroll = function handleScroll() {
      if (throttleInterval) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(doGetScrollPosition, throttleInterval);
        }
      } else {
        doGetScrollPosition();
      }
    };

    if (target) {
      target.addEventListener('scroll', handleScroll);
      doGetScrollPosition();
    }

    return function () {
      return target && target.removeEventListener('scroll', handleScroll);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
function useNearestScroll(ref, effect, deps) {
  var throttle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var scrollableTarget = scrollableAncestor.scrollableAncestor(ref.current);

  if (scrollableTarget && (document.body === scrollableTarget || scrollableTarget.contains(document.body))) {
    scrollableTarget = window;
  }

  return useTargetScroll(scrollableTarget, effect, deps, throttle);
}

exports.useNearestScroll = useNearestScroll;
