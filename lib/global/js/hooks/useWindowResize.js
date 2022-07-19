/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');

var windowExists = typeof window !== 'undefined';

var getWindowSize = function getWindowSize() {
  if (!windowExists) {
    return {
      innerHeight: 0,
      innerWidth: 0,
      outerHeight: 0,
      outerWidth: 0
    };
  }

  var _window = _rollupPluginBabelHelpers.objectSpread2({}, window),
      innerHeight = _window.innerHeight,
      innerWidth = _window.innerWidth,
      outerHeight = _window.outerHeight,
      outerWidth = _window.outerWidth;

  return {
    innerHeight: innerHeight,
    innerWidth: innerWidth,
    outerHeight: outerHeight,
    outerWidth: outerWidth
  };
};

var useWindowResize = function useWindowResize(effect, deps) {
  var throttleInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var windowSize = React.useRef({});
  var throttleTimeout = React.useRef(null);

  var doGetWindowSize = function doGetWindowSize() {
    var newVal = {
      previous: windowSize.current,
      current: getWindowSize()
    }; // call effect

    effect(newVal);
    windowSize.current = newVal.current;
    throttleTimeout.current = null;
  };

  React.useLayoutEffect(function () {
    var handleResize = function handleResize() {
      if (throttleInterval) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(doGetWindowSize, throttleInterval);
        }
      } else {
        doGetWindowSize();
      }
    };

    window.addEventListener('resize', handleResize);
    doGetWindowSize();
    return function () {
      return window.removeEventListener('resize', handleResize);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

exports.useWindowResize = useWindowResize;
