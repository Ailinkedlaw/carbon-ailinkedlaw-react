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
var devtools = require('../../global/js/utils/devtools.js');
require('../../global/js/utils/props-helper.js');
var settings = require('../../settings.js');
var iconsReact = require('@carbon/icons-react');
var react = require('@carbon/react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["backgroundColor", "className", "kind", "icon", "initials", "image", "imageDescription", "size", "theme", "tooltipText"];

var blockClass = "".concat(settings.pkg.prefix, "--user-profile-image");
var componentName = 'UserProfileImage'; // NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * This is a user profile image component which displays an image, or initials or icon for a user.
 */

exports.UserProfileImage = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _FillItem;

  var backgroundColor = _ref.backgroundColor,
      className = _ref.className,
      kind = _ref.kind,
      icon = _ref.icon,
      initials = _ref.initials,
      image = _ref.image,
      imageDescription = _ref.imageDescription,
      size = _ref.size,
      theme = _ref.theme,
      tooltipText = _ref.tooltipText,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var icons = {
    user: {
      md: function md(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.User, _rollupPluginBabelHelpers["extends"]({
          size: 20
        }, props));
      },
      lg: function lg(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.User, _rollupPluginBabelHelpers["extends"]({
          size: 24
        }, props));
      },
      xl: function xl(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.User, _rollupPluginBabelHelpers["extends"]({
          size: 32
        }, props));
      }
    },
    group: {
      md: function md(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.Group, _rollupPluginBabelHelpers["extends"]({
          size: 20
        }, props));
      },
      lg: function lg(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.Group, _rollupPluginBabelHelpers["extends"]({
          size: 24
        }, props));
      },
      xl: function xl(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.Group, _rollupPluginBabelHelpers["extends"]({
          size: 32
        }, props));
      }
    }
  };

  var formatInitials = function formatInitials() {
    if (initials.length === 2) {
      return initials;
    } // RegEx takes in the display name and returns the first and last initials. Thomas Watson and Thomas J. Watson
    // both return JW.


    return initials.match(/(^\S\S?|\b\S)?/g).join('').match(/(^\S|\S$)?/g).join('').toUpperCase();
  };

  var getFillItem = function getFillItem() {
    if (image) {
      // eslint-disable-next-line react/display-name
      return function () {
        return /*#__PURE__*/React__default["default"].createElement("img", {
          alt: imageDescription,
          src: image,
          className: "".concat(blockClass, "__photo ").concat(blockClass, "__photo--").concat(size)
        });
      };
    }

    if (initials) {
      return formatInitials;
    }

    if (kind && size) {
      return icons[kind][size];
    }

    return icon;
  }; // if user doesn't provide a color just generate a random one


  var getRandomColor = function getRandomColor() {
    var colors = ['light-cyan', 'dark-cyan', 'light-gray', 'dark-gray', 'light-green', 'dark-green', 'light-magenta', 'dark-magenta', 'light-purple', 'dark-purple', 'light-teal', 'dark-teal'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  var FillItem = getFillItem();

  var renderUserProfileImage = function renderUserProfileImage() {
    return /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({}, rest, {
      ref: ref,
      className: cx__default["default"]([blockClass, className, "".concat(blockClass, "--").concat(size), "".concat(blockClass, "--").concat(theme), "".concat(blockClass, "--").concat(backgroundColor || getRandomColor())])
    }, devtools.getDevtoolsProps(componentName)), _FillItem || (_FillItem = /*#__PURE__*/React__default["default"].createElement(FillItem, null)));
  };

  return FillItem && (tooltipText ? /*#__PURE__*/React__default["default"].createElement(react.IconButton, {
    label: tooltipText,
    className: "".concat(blockClass, "__tooltip"),
    kind: "ghost"
  }, renderUserProfileImage()) : renderUserProfileImage());
}); // Return a placeholder if not released and not enabled by feature flag

exports.UserProfileImage = settings.pkg.checkComponentEnabled(exports.UserProfileImage, componentName);
exports.UserProfileImage.displayName = componentName;
exports.UserProfileImage.propTypes = {
  /**
   * The background color passed should match one of the background colors in the library documentation:
   * https://pages.github.ibm.com/cdai-design/pal/patterns/user-profile-images/
   */
  backgroundColor: PropTypes__default["default"].oneOf(['light-cyan', 'dark-cyan', 'light-gray', 'dark-gray', 'light-green', 'dark-green', 'light-magenta', 'dark-magenta', 'light-purple', 'dark-purple', 'light-teal', 'dark-teal']),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes__default["default"].string,

  /**
   * Provide a custom icon to use if you need to use an icon other than the included ones
   */
  icon: PropTypes__default["default"].func,

  /**
   * When passing the image prop, supply a full path to the image to be displayed.
   */
  image: PropTypes__default["default"].string,

  /**
   * When passing the image prop use the imageDescription prop to describe the image for screen reader.
   */
  imageDescription: PropTypes__default["default"].string.isRequired.if(function (_ref2) {
    var image = _ref2.image;
    return !!image;
  }),

  /**
   * When passing the initials prop, either send the initials to be used or the user's display name.
   * The first two capital letters of the display name will be used as the initials.
   */
  initials: PropTypes__default["default"].string,

  /**
   * When passing the kind prop, use either "user" or "group". The values match up to the Carbon Library icons.
   */
  kind: PropTypes__default["default"].oneOf(['user', 'group']),

  /**
   * Set the size of the avatar circle
   */
  size: PropTypes__default["default"].oneOf(['xl', 'lg', 'md']).isRequired,

  /**
   * Set theme in which the component will be rendered
   */
  theme: PropTypes__default["default"].oneOf(['light', 'dark']).isRequired,

  /**
   * Pass in the display name to have it shown on hover
   */
  tooltipText: PropTypes__default["default"].string
};
