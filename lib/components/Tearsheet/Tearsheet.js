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
var devtools = require('../../global/js/utils/devtools.js');
var propsHelper = require('../../global/js/utils/props-helper.js');
var settings = require('../../settings.js');
var react = require('@carbon/react');
var TearsheetShell = require('./TearsheetShell.js');
var ActionSet = require('../ActionSet/ActionSet.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var _excluded = ["influencerPosition", "influencerWidth", "verticalPosition"];
var componentName = 'Tearsheet'; // NOTE: the component SCSS is not imported here: it is rolled up separately.
// Default values for props

var defaults = {
  influencerPosition: 'left',
  influencerWidth: 'narrow',
  verticalPosition: 'lower'
};
/**
 * A tearsheet is a mostly full-screen type of dialog that keeps users
 * in-context and focused by bringing actionable content front and center while
 * revealing parts of the UI behind it. There is also a narrow variant of the
 * tearsheet.
 *
 * A tearsheet comprises up to 5 zones, allowing for flexibility depending on
 * the content: a heading area including a title, an optional navigation area
 * that sits just below the heading, an optional influencer which is a side
 * panel on either the left or right side, the main content area, and a set of
 * action buttons.
 */

exports.Tearsheet = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _ref$influencerPositi = _ref.influencerPosition,
      influencerPosition = _ref$influencerPositi === void 0 ? defaults.influencerPosition : _ref$influencerPositi,
      _ref$influencerWidth = _ref.influencerWidth,
      influencerWidth = _ref$influencerWidth === void 0 ? defaults.influencerWidth : _ref$influencerWidth,
      _ref$verticalPosition = _ref.verticalPosition,
      verticalPosition = _ref$verticalPosition === void 0 ? defaults.verticalPosition : _ref$verticalPosition,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React__default["default"].createElement(TearsheetShell.TearsheetShell, _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, devtools.getDevtoolsProps(componentName)), rest), {}, {
    influencerPosition: influencerPosition,
    influencerWidth: influencerWidth,
    verticalPosition: verticalPosition,
    ref: ref,
    size: 'wide'
  }));
}); // Return a placeholder if not released and not enabled by feature flag

exports.Tearsheet = settings.pkg.checkComponentEnabled(exports.Tearsheet, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

exports.Tearsheet.displayName = componentName;
var deprecatedProps = {
  /**
   * **Deprecated**
   *
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position (the default) provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes__default["default"].oneOf(['normal', 'lower'])
}; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
// Note that the descriptions here should be kept in sync with those for the
// corresponding props for TearsheetNarrow and TearsheetShell components.

exports.Tearsheet.propTypes = _rollupPluginBabelHelpers.objectSpread2({
  /**
   * The navigation actions to be shown as buttons in the action area at the
   * bottom of the tearsheet. Each action is specified as an object with
   * optional fields: 'label' to supply the button label, 'kind' to select the
   * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
   * display a loading indicator, and 'onClick' to receive notifications when
   * the button is clicked. Additional fields in the object will be passed to
   * the Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props. Any other fields in the object will be passed
   * through to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: propsHelper.allPropTypes([ActionSet.ActionSet.validateActions(function () {
    return '2xl';
  }), PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, react.Button.propTypes), {}, {
    kind: PropTypes__default["default"].oneOf(['ghost', 'danger--ghost', 'secondary', 'danger', 'primary']),
    label: PropTypes__default["default"].string,
    loading: PropTypes__default["default"].bool,
    // we duplicate this Button prop to improve the DocGen here
    onClick: react.Button.propTypes.onClick
  })))]),

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes__default["default"].string,

  /**
   * The accessibility title for the close icon (if shown).
   *
   * **Note:** This prop is only required if a close icon is shown, i.e. if
   * there are a no navigation actions and/or hasCloseIcon is true.
   */
  closeIconDescription: PropTypes__default["default"].string.isRequired.if(function (_ref2) {
    var actions = _ref2.actions,
        hasCloseIcon = _ref2.hasCloseIcon;
    return TearsheetShell.tearsheetHasCloseIcon(actions, hasCloseIcon);
  }),

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes__default["default"].node,

  /**
   * Enable a close icon ('x') in the header area of the tearsheet. By default,
   * (when this prop is omitted, or undefined or null) a tearsheet does not
   * display a close icon if there are navigation actions ("transactional
   * tearsheet") and displays one if there are no navigation actions ("passive
   * tearsheet"), and that behavior can be overridden if required by setting
   * this prop to either true or false.
   */
  hasCloseIcon: PropTypes__default["default"].bool,

  /**
   * The content for the influencer section of the tearsheet, displayed
   * alongside the main content. This is typically a menu, or filter, or
   * progress indicator, or similar.
   */
  influencer: PropTypes__default["default"].element,

  /**
   * The position of the influencer section, 'left' or 'right'.
   */
  influencerPosition: PropTypes__default["default"].oneOf(['left', 'right']),

  /**
   * The width of the influencer: 'narrow' (the default) is 256px, and 'wide'
   * is 320px.
   */
  influencerWidth: PropTypes__default["default"].oneOf(['narrow', 'wide']),

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes__default["default"].node,

  /**
   * Navigation content, such as a set of tabs, to be displayed at the bottom
   * of the header area of the tearsheet.
   */
  navigation: PropTypes__default["default"].element,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose: PropTypes__default["default"].func,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes__default["default"].bool,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes__default["default"].node
}, deprecatedProps);

exports.deprecatedProps = deprecatedProps;
