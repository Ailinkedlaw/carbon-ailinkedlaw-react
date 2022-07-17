/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'react';
import PropTypes from 'prop-types';
import pconsole from './pconsole.js';

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

var allPropTypes = pconsole.shimIfProduction(function (arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    pconsole.error('Warning: Invalid argument supplied to allPropTypes, expected an instance of array.');
    return pconsole.noop;
  }

  for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
    if (typeof arrayOfTypeCheckers[i] !== 'function') {
      pconsole.error("Invalid argument supplied to allPropTypes. Expected an array of check functions, but received ".concat(arrayOfTypeCheckers[i], " at index ").concat(i, "."));
      return pconsole.noop;
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
  checker.isRequired.if = pconsole.isProduction ? pconsole.noop : isRequiredIf.bind(null, checker);
};

for (var checker in PropTypes) {
  if (PropTypes[checker].isRequired) {
    isRequiredIf.decorate(PropTypes[checker]);
  }
}

export { allPropTypes, isRequiredIf };
