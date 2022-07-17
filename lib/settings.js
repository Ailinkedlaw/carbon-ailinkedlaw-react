/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var packageSettings = require('./global/js/package-settings.js');
var React = require('react');
require('@carbon/themes');
var Canary = require('./components/_Canary/Canary.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// the component status on first use and then renders as the component or as
// a Canary placeholder initialized with the name of the replaced component.
// Note that the returned stub carries any other properties which had already
// been assigned (eg propTypes, displayName, etc).

packageSettings["default"].checkComponentEnabled = function (component, name) {
  if (component.render) {
    // The component is a forward-ref, so make a stub forward-ref.
    // eslint-disable-next-line react/display-name
    var forward = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
      return (// Replace the stub's render fn so this test only happens once.
        (forward.render = packageSettings["default"].isComponentEnabled(name) || !packageSettings["default"].isComponentPublic(name) ? // If the component is enabled, or if it's not a public component,
        // replace the stub's render fn with the component's render fn.
        component.render : // Note that Canary is a direct render fn (not a forward-ref) and
        // will ignore the passed props and ref (if any)
        Canary.Canary.bind(undefined, {
          componentName: name
        }))( // Call it now (after this it will be directly called).
        props, ref)
      );
    }); // Transfer object properties already assigned (eg propTypes, displayName)
    // then merge in the stub forward-ref which checks the component status
    // when first used.

    return Object.assign({}, component, forward);
  } else {
    // The component is a direct render fn, so make a stub render fn.
    var _render = function render(props) {
      return (// Replace the stub render fn so this test only happens once.
        (_render = packageSettings["default"].isComponentEnabled(name) || !packageSettings["default"].isComponentPublic(name) ? // If the component is enabled, or if it's not a public component,
        // replace the stub render fn with the component render fn.
        component : // Replace the stub render fn with the Canary render fn, which will
        // ignore the passed props.
        Canary.Canary.bind(undefined, {
          componentName: name
        }))( // Call it now (after this it will be directly called).
        props)
      );
    }; // Transfer object properties already assigned (eg propTypes, displayName)
    // to a function which calls the stub render fn which checks the component
    // status when first used.


    return Object.assign(function (props) {
      return _render(props);
    }, component);
  }
};

var pkg = packageSettings["default"];

exports.pkg = pkg;
