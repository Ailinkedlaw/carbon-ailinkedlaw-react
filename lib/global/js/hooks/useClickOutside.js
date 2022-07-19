/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var useClickOutside = function useClickOutside(ref, callback) {
  var handleClick = function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  React.useEffect(function () {
    document.addEventListener('click', handleClick);
    return function () {
      document.removeEventListener('click', handleClick);
    };
  });
};

exports.useClickOutside = useClickOutside;
