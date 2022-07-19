/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
require('react');
var PropTypes = require('prop-types');
var pconsole = require('./pconsole.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

/**
 * Prepare a set of props, or prop types or default props, merging values
 * from one or more sets and optionally blocking keys which should not be
 * passed. Returns the prepared set of props. Does not modify any of the
 * objects passed.
 *
 * @param {{} | '' | ['']} values One or more sets of keys and values to be
 * merged, or names of keys to be blocked. Each parameter that is an object is
 * treated as keys and values to be merged, and each parameter that is a string
 * or an array of strings is treated as keys to be blocked.
 *
 * Examples:
 *   const props = { a: 3, c: 4, d: 5 };
 *
 *   * prepareProps(props) -> { a: 3, c: 4, d: 5 }
 *   * prepareProps(props, 'c') -> { a: 3, d: 5 }
 *   * prepareProps(props, ['a', 'c', 'e']) -> { d: 5 }
 *
 *   * prepareProps({ a: 1, b: 2 }, props) -> { a: 3, b: 2, c: 4, d: 5 }
 *   * prepareProps({ a: 1, b: 2 }, props, ['a', 'c']) -> { b: 2, d: 5 }
 *
 *   * prepareProps(props, { c: 6 }) -> { a: 3, c: 6, d: 5 }
 *   * prepareProps(props, 'a', { c: 6 }) -> { c: 6, d: 5 }
 */

var prepareProps = function prepareProps() {
  // Convert any string or array arg into an object with nulls as values
  var toNulls = function toNulls(arg) {
    return typeof arg === 'string' ? _rollupPluginBabelHelpers.defineProperty({}, arg, null) : Array.isArray(arg) ? Object.fromEntries(arg.map(function (key) {
      return [key, null];
    })) : arg;
  }; // Merge all the args from left to right


  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  var merged = Object.assign.apply(Object, [{}].concat(_rollupPluginBabelHelpers.toConsumableArray(values.map(toNulls)))); // Now strip any keys whose final value is null

  return Object.entries(merged).reduce(function (result, _ref2) {
    var _ref3 = _rollupPluginBabelHelpers.slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    if (value !== null) {
      result[key] = value;
    }

    return result;
  }, {});
}; // Determine whether a named prop in a set of props has been given a value.
// null and undefined do not count as values, but anything else does. If the
// prop is 'children', then an array of null/undefined also does not count as
// a value, but anything else does.

var propHasValue = function propHasValue(props, propName) {
  var result = props[propName] !== null && props[propName] !== undefined;

  if (result && propName === 'children' && Array.isArray(props[propName])) {
    result = false;

    for (var i = 0; !result && i < props[propName].length; i++) {
      result = props[propName][i] !== null && props[propName][i] !== undefined;
    }
  }

  return result;
};
/**
 * A prop-types type checker that marks a prop as deprecated.
 * @param {} validator The prop-types validator for the prop as it should be
 * used if it weren't deprecated. If this validator produces type checking
 * errors they will be reported as usual.
 * @param {*} additionalInfo One or more sentences to be appended to the
 * deprecation message to explain why the prop is deprecated and/or what should
 * be used instead.
 * @returns Any type checking error reported by the validator, or null.
 */

var deprecateProp = function deprecateProp(validator, additionalInfo) {
  return function (props, propName, comp, loc, propFullName, secret) {
    if (propHasValue(props, propName)) {
      pconsole["default"].warn("The ".concat(loc, " `").concat(propFullName || propName, "` of `").concat(comp, "` has been deprecated and will soon be removed. ").concat(additionalInfo));
    }

    return validator(props, propName, comp, loc, propFullName, secret);
  };
};
/**
 * A prop-types validation function that takes an array of type checkers and
 * requires prop values to satisfy all of the type checkers. This can be useful
 * to combine custom validation functions with regular prop types, or for
 * combining inherited prop-types from another component with tighter
 * requirements.
 *
 * Examples:
 *
 * MyComponent.propTypes = {
 *
 *   foo: allPropTypes([
 *     customValidationFunction,
 *     PropTypes.arrayOf(
 *       PropTypes.shape({
 *         text: PropType.string
 *       })
 *     )
 *   ]),
 *
 *   kind: allPropTypes([
 *     Button.propTypes.kind,
 *     PropTypes.oneOf(['primary', 'secondary'])
 *   ]),
 *
 * }
 */

var allPropTypes = pconsole["default"].shimIfProduction(function (arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    pconsole["default"].error('Warning: Invalid argument supplied to allPropTypes, expected an instance of array.');
    return pconsole["default"].noop;
  }

  for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
    if (typeof arrayOfTypeCheckers[i] !== 'function') {
      pconsole["default"].error("Invalid argument supplied to allPropTypes. Expected an array of check functions, but received ".concat(arrayOfTypeCheckers[i], " at index ").concat(i, "."));
      return pconsole["default"].noop;
    }
  }

  var checkType = function checkType() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var error = null;
    arrayOfTypeCheckers.some(function (checker) {
      return error = checker.apply(void 0, args);
    });
    return error;
  };

  checkType.isRequired = function (props, propName, comp, loc, propFullName, secret) {
    var prop = propFullName || propName;
    return props[prop] == null ? new Error("The ".concat(loc, " `").concat(prop, "` is marked as required in `").concat(comp || '<<anonymous>>', "`, but its value is `").concat(props[prop] === null ? 'null' : 'undefined', "`.")) : checkType(props, prop, comp, loc, propFullName, secret);
  };

  return checkType;
});
/**
 * A prop-types validation function that takes a type checkers and a condition
 * function and invokes either the type checker or the isRequired variant of
 * the type checker according to whether the condition function returns false
 * or true when called with the full set of props. This can be useful to make
 * a prop conditionally required. The function also has a decorate function
 * which can be used to add isRequiredIf to any existing type which already has
 * an isRequired variant, and this is automatically applied to the simple type
 * checkers in PropTypes when this props-helper module is imported. The second
 * example produces better results with DocGen and Storybook.
 *
 * Examples:
 *
 * MyComponent1.propTypes = {
 *   showFoo: PropTypes.bool,
 *   fooLabel: isRequiredIf(PropTypes.string, ({ showFoo }) => showFoo),
 * }
 *
 * MyComponent2.propTypes = {
 *   showBar: PropTypes.bool,
 *   barLabel: PropTypes.string.isRequired.if(({ showBar }) => showBar),
 * }
 *
 */

var isRequiredIf = function isRequiredIf(checker, conditionFn) {
  return function (props, propName, componentName, location, propFullName, secret) {
    return (conditionFn(props) ? checker.isRequired : checker)(props, propName, componentName, location, propFullName, secret);
  };
};

isRequiredIf.decorate = function (checker) {
  checker.isRequired.if = pconsole["default"].isProduction ? pconsole["default"].noop : isRequiredIf.bind(null, checker);
};

for (var checker in PropTypes__default["default"]) {
  if (PropTypes__default["default"][checker].isRequired) {
    isRequiredIf.decorate(PropTypes__default["default"][checker]);
  }
}

exports.allPropTypes = allPropTypes;
exports.deprecateProp = deprecateProp;
exports.isRequiredIf = isRequiredIf;
exports.prepareProps = prepareProps;
