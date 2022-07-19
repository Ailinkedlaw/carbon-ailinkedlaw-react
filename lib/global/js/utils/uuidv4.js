/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function uuidv4() {
  var randomValues = function randomValues(c) {
    return typeof crypto !== 'undefined' ? crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4 : Math.random() * 16 >> c / 4;
  };

  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ randomValues(c)).toString(16);
  });
}

exports["default"] = uuidv4;
