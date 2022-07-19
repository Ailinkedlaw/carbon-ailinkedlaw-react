/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, defineProperty as _defineProperty, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Misuse, ErrorFilled, WarningAltInvertedFilled, WarningAltFilled, UndefinedFilled, UnknownFilled, CheckmarkFilled, InformationSquareFilled, Renew, Time } from '@carbon/icons-react';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { pkg } from '../../settings.js';

var _excluded = ["kind", "theme", "size", "className", "iconDescription"];
var icons = {
  fatal: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(Misuse, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(Misuse, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(Misuse, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(Misuse, _extends({
        size: 32
      }, props));
    }
  },
  critical: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(ErrorFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(ErrorFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(ErrorFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(ErrorFilled, _extends({
        size: 32
      }, props));
    }
  },
  'major-warning': {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(WarningAltInvertedFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(WarningAltInvertedFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(WarningAltInvertedFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(WarningAltInvertedFilled, _extends({
        size: 32
      }, props));
    }
  },
  'minor-warning': {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(WarningAltFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(WarningAltFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(WarningAltFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(WarningAltFilled, _extends({
        size: 32
      }, props));
    }
  },
  undefined: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(UndefinedFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(UndefinedFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(UndefinedFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(UndefinedFilled, _extends({
        size: 32
      }, props));
    }
  },
  unknown: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(UnknownFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(UnknownFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(UnknownFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(UnknownFilled, _extends({
        size: 32
      }, props));
    }
  },
  normal: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(CheckmarkFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(CheckmarkFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(CheckmarkFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(CheckmarkFilled, _extends({
        size: 32
      }, props));
    }
  },
  info: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(InformationSquareFilled, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(InformationSquareFilled, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(InformationSquareFilled, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(InformationSquareFilled, _extends({
        size: 32
      }, props));
    }
  },
  'in-progress': {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 32
      }, props));
    }
  },
  running: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(Renew, _extends({
        size: 32
      }, props));
    }
  },
  pending: {
    sm: function sm(props) {
      return /*#__PURE__*/React.createElement(Time, _extends({
        size: 16
      }, props));
    },
    md: function md(props) {
      return /*#__PURE__*/React.createElement(Time, _extends({
        size: 20
      }, props));
    },
    lg: function lg(props) {
      return /*#__PURE__*/React.createElement(Time, _extends({
        size: 24
      }, props));
    },
    xl: function xl(props) {
      return /*#__PURE__*/React.createElement(Time, _extends({
        size: 32
      }, props));
    }
  }
};
var blockClass = "".concat(pkg.prefix, "--status-icon");
var componentName = 'StatusIcon';
var StatusIcon = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _icons$kind;

  var kind = _ref.kind,
      theme = _ref.theme,
      size = _ref.size,
      className = _ref.className,
      iconDescription = _ref.iconDescription,
      rest = _objectWithoutProperties(_ref, _excluded);

  var IconComponent = (_icons$kind = icons[kind]) === null || _icons$kind === void 0 ? void 0 : _icons$kind[size];
  var classNames = cx(className, blockClass, "".concat(blockClass, "--").concat(theme), _defineProperty({}, "".concat(blockClass, "--").concat(theme, "-").concat(kind), kind));
  return IconComponent && /*#__PURE__*/React.createElement(IconComponent, _extends({}, rest, {
    className: classNames,
    ref: ref
  }, getDevtoolsProps(componentName)), /*#__PURE__*/React.createElement("title", null, iconDescription));
});
StatusIcon = pkg.checkComponentEnabled(StatusIcon, componentName);
StatusIcon.displayName = componentName;
StatusIcon.propTypes = {
  /**
   * Provide an optional class to be applied to the modal root node.
   */
  className: PropTypes.string,

  /**
   * A required prop that provides a title element and tooltip for the icon for accessibility purposes
   */
  iconDescription: PropTypes.string.isRequired,

  /**
   * A required prop that displays the respective icon associated with the status
   */
  kind: PropTypes.oneOf(['fatal', 'critical', 'major-warning', 'minor-warning', 'undefined', 'unknown', 'normal', 'info', 'in-progress', 'running', 'pending']).isRequired,

  /**
   * A required prop that displays the size of the icon associate with the status
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']).isRequired,

  /**
   * A required prop that displays the theme of the icon associated with the status
   */
  theme: PropTypes.oneOf(['light', 'dark']).isRequired
};

export { StatusIcon };
