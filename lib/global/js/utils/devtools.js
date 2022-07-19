/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var packageSettings = require('../package-settings.js');

var devtoolsAttribute = 'data-carbon-devtools-id';

function getDevtoolsId(componentName) {
  return "".concat(packageSettings["default"].prefix, "--").concat(componentName);
}

function getDevtoolsProps(componentName) {
  return _rollupPluginBabelHelpers.defineProperty({}, devtoolsAttribute, getDevtoolsId(componentName));
}

exports.devtoolsAttribute = devtoolsAttribute;
exports.getDevtoolsId = getDevtoolsId;
exports.getDevtoolsProps = getDevtoolsProps;
