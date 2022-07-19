/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';

var useClickOutside = function useClickOutside(ref, callback) {
  var handleClick = function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(function () {
    document.addEventListener('click', handleClick);
    return function () {
      document.removeEventListener('click', handleClick);
    };
  });
};

export { useClickOutside };
