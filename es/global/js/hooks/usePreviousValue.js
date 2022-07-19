/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef, useEffect } from 'react';

/**
 * Returns the previous state values included in the param
 * @param {object} value
 */

var usePreviousValue = function usePreviousValue(value) {
  var ref = useRef();
  useEffect(function () {
    ref.current = value;
  });
  return ref.current;
};

export { usePreviousValue };
