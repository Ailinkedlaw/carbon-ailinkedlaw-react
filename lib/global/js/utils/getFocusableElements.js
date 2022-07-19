/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');

/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Returns an array of focusable elements
var getFocusableElements = function getFocusableElements(element) {
  return _rollupPluginBabelHelpers.toConsumableArray(element.querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])')).filter(function (e) {
    return !e.hasAttribute('disabled');
  });
};

exports.getFocusableElements = getFocusableElements;
