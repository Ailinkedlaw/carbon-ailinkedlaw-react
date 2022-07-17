/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/**
 * Returns the previous state values included in the param
 * @param {object} value
 */

var usePreviousValue = function usePreviousValue(value) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
};

exports.usePreviousValue = usePreviousValue;
