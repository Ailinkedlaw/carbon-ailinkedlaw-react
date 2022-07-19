/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
var isProduction = process.env.NODE_ENV === 'production';
var noop = function noop(tearsheetNotRenderedMaximumStackingDepthExceeded) {
  return undefined;
};
var shimIfProduction = function shimIfProduction(fn) {
  return isProduction ? noop : fn;
};
var log = shimIfProduction(function () {
  var _console;

  return (_console = console).log.apply(_console, arguments);
});
var warn = shimIfProduction(function () {
  var _console2;

  return (_console2 = console).warn.apply(_console2, arguments);
});
var error = shimIfProduction(function () {
  var _console3;

  return (_console3 = console).error.apply(_console3, arguments);
});
var pconsole = {
  isProduction: isProduction,
  noop: noop,
  shimIfProduction: shimIfProduction,
  log: log,
  warn: warn,
  error: error
};

export { pconsole as default, error, isProduction, log, noop, shimIfProduction, warn };
