/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * This utility will return the index of the last instance of an
 * item in the given array of objects whose key is equal to the value
 * parameter. If there are no matches, -1 is returned as similar to findIndex
 * @param {Array<Object.*>} array
 * @param {string} key
 * @param {string|boolean|number} value
 */
var lastIndexInArray = function lastIndexInArray(array, key, value) {
  for (var i = array.length - 1; i >= 0; i--) {
    var _array$i;

    if (((_array$i = array[i]) === null || _array$i === void 0 ? void 0 : _array$i[key]) === value) {
      return i + 1;
    }
  }

  return -1;
};

exports.lastIndexInArray = lastIndexInArray;
