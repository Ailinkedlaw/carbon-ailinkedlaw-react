/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineProperty as _defineProperty } from '../../../_virtual/_rollupPluginBabelHelpers.js';
import pkgSettings from '../package-settings.js';

var devtoolsAttribute = 'data-carbon-devtools-id';

function getDevtoolsId(componentName) {
  return "".concat(pkgSettings.prefix, "--").concat(componentName);
}

function getDevtoolsProps(componentName) {
  return _defineProperty({}, devtoolsAttribute, getDevtoolsId(componentName));
}

export { devtoolsAttribute, getDevtoolsId, getDevtoolsProps };
