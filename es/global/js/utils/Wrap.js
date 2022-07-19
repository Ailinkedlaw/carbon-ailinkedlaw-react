/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';

var _excluded = ["alwaysRender", "children", "element", "neverRender"];
// If there are no children, or all the children are falsy, or all the non-falsy
// children are themselves Wrap components that are empty, then return true.

var isEmpty = function isEmpty(children) {
  var result = true;
  React.Children.forEach(children, function (child) {
    if (child) {
      var _child$type, _child$props;

      result && (result = (child === null || child === void 0 ? void 0 : (_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.displayName) === 'Wrap' && isEmpty(child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.children));
    }
  });
  return result;
}; // Default values for props


var defaults = {
  element: 'div'
};
/**
 * A simple conditional wrapper that encloses its children in a <div> (or other
 * element if specified), passing any supplied attributes to the <div> (or other
 * element). The component renders nothing at all if there are no children or
 * the children are empty/falsy, or if all the non-falsy children are themselves
 * Wrap components that do not wish to render. This behavior can be overridden
 * by setting neverRender or alwaysRender to true. Note that if a ref is passed,
 * the ref.current will be set to the wrapper element if it renders, and will
 * remain undefined if it does not render.
 */

var Wrap = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var alwaysRender = _ref.alwaysRender,
      children = _ref.children,
      _ref$element = _ref.element,
      Wrapper = _ref$element === void 0 ? defaults.element : _ref$element,
      neverRender = _ref.neverRender,
      rest = _objectWithoutProperties(_ref, _excluded);

  return (neverRender || isEmpty(children)) && !alwaysRender ? null : /*#__PURE__*/React.createElement(Wrapper, _extends({}, rest, {
    ref: ref
  }), children);
});
Wrap.displayName = 'Wrap';
Wrap.propTypes = {
  /**
   * Specify whether the wrapper element should render even if there are no
   * children or the children are themselves empty wrappers. Useful if there
   * are some conditions in which the wrapper element is still required. Note
   * that this prop takes precedence over neverRender if both are set to true.
   */
  alwaysRender: PropTypes.bool,

  /**
   * The content of the wrapper element. If no children are supplied, or the
   * resulting value(s) are falsy, or if all the non-falsy children are Wrap
   * components that decide not to render, nothing will be rendered in the DOM.
   */
  children: PropTypes.node,

  /**
   * The element name or component to use as a wrapper for the content.
   */
  element: PropTypes.elementType,

  /**
   * Specify whether nothing should be rendered even if there are children
   * in the content. Useful if there are some circumstances in which the
   * component should not render at all. Note that if alwaysRender is also
   * set to true then it will take precedence and the wrapper element and
   * content will be rendered.
   */
  neverRender: PropTypes.bool
};

export { Wrap };
