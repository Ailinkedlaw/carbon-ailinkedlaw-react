/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import pkgSettings from '../../global/js/package-settings.js';
import { CodeSnippet } from '@carbon/react';

var _p, _br, _p2, _br2, _p3;

var _excluded = ["className", "componentName"];

var blockClass = "".concat(pkgSettings.prefix, "--canary");
/**
 *  Canary component used when the component requested is not yet production
 */

var Canary = function Canary(_ref
/* , originalArgs*/
) {
  var className = _ref.className,
      componentName = _ref.componentName,
      rest = _objectWithoutProperties(_ref, _excluded);

  var instructions = "\nimport { pkg } from '@carbon/ibm-products';\n// NOTE: must happen before component is first used\npkg.component.".concat(componentName, " = true;\n");
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: cx(blockClass, className)
  }), /*#__PURE__*/React.createElement("h2", null, "This component ", /*#__PURE__*/React.createElement("strong", null, componentName), " is not ready yet."), _p || (_p = /*#__PURE__*/React.createElement("p", null, "To enable it, initialize package flags before the component is first used.")), _br || (_br = /*#__PURE__*/React.createElement("br", null)), _p2 || (_p2 = /*#__PURE__*/React.createElement("p", null, "e.g. in main.js")), /*#__PURE__*/React.createElement(CodeSnippet, {
    type: "multi"
  }, instructions), _br2 || (_br2 = /*#__PURE__*/React.createElement("br", null)), _p3 || (_p3 = /*#__PURE__*/React.createElement("p", null, "View a live example on", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://codesandbox.io/s/example-component-olif5?file=/src/config.js"
  }, "codesandbox"), ".")));
};
Canary.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: PropTypes.string,

  /** Name of the component that is not ready yet */
  componentName: PropTypes.string.isRequired
};

export { Canary };
