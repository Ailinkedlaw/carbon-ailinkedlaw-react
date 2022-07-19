/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var cx = require('classnames');
var iconsReact = require('@carbon/icons-react');
var devtools = require('../../global/js/utils/devtools.js');
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["kind", "theme", "size", "className", "iconDescription"];
var icons = {
  fatal: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Misuse, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Misuse, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Misuse, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Misuse, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  critical: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.ErrorFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.ErrorFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.ErrorFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.ErrorFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  'major-warning': {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltInvertedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltInvertedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltInvertedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltInvertedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  'minor-warning': {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.WarningAltFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  undefined: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UndefinedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UndefinedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UndefinedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UndefinedFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  unknown: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UnknownFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UnknownFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UnknownFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.UnknownFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  normal: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.CheckmarkFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.CheckmarkFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.CheckmarkFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.CheckmarkFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  info: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.InformationSquareFilled, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.InformationSquareFilled, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.InformationSquareFilled, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.InformationSquareFilled, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  'in-progress': {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  running: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Renew, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  },
  pending: {
    sm: function sm(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Time, _rollupPluginBabelHelpers["extends"]({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Time, _rollupPluginBabelHelpers["extends"]({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Time, _rollupPluginBabelHelpers["extends"]({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React__default["default"].createElement(iconsReact.Time, _rollupPluginBabelHelpers["extends"]({
        size: 32
      }, props));
    }
  }
};
var blockClass = "".concat(settings.pkg.prefix, "--status-icon");
var componentName = 'StatusIcon';
exports.StatusIcon = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _icons$kind;

  var kind = _ref.kind,
      theme = _ref.theme,
      size = _ref.size,
      className = _ref.className,
      iconDescription = _ref.iconDescription,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var IconComponent = (_icons$kind = icons[kind]) === null || _icons$kind === void 0 ? void 0 : _icons$kind[size];
  var classNames = cx__default["default"](className, blockClass, "".concat(blockClass, "--").concat(theme), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "--").concat(theme, "-").concat(kind), kind));
  return IconComponent && /*#__PURE__*/React__default["default"].createElement(IconComponent, _rollupPluginBabelHelpers["extends"]({}, rest, {
    className: classNames,
    ref: ref
  }, devtools.getDevtoolsProps(componentName)), /*#__PURE__*/React__default["default"].createElement("title", null, iconDescription));
});
exports.StatusIcon = settings.pkg.checkComponentEnabled(exports.StatusIcon, componentName);
exports.StatusIcon.displayName = componentName;
exports.StatusIcon.propTypes = {
  /**
   * Provide an optional class to be applied to the modal root node.
   */
  className: PropTypes__default["default"].string,

  /**
   * A required prop that provides a title element and tooltip for the icon for accessibility purposes
   */
  iconDescription: PropTypes__default["default"].string.isRequired,

  /**
   * A required prop that displays the respective icon associated with the status
   */
  kind: PropTypes__default["default"].oneOf(['fatal', 'critical', 'major-warning', 'minor-warning', 'undefined', 'unknown', 'normal', 'info', 'in-progress', 'running', 'pending']).isRequired,

  /**
   * A required prop that displays the size of the icon associate with the status
   */
  size: PropTypes__default["default"].oneOf(['sm', 'md', 'lg', 'xl']).isRequired,

  /**
   * A required prop that displays the theme of the icon associated with the status
   */
  theme: PropTypes__default["default"].oneOf(['light', 'dark']).isRequired
};
