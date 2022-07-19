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
var reactDom = require('react-dom');
var reactResizeDetector = require('react-resize-detector');
var PropTypes = require('prop-types');
var cx = require('classnames');
var settings = require('../../settings.js');
var pconsole = require('../../global/js/utils/pconsole.js');
var react = require('@carbon/react');
var Wrap = require('../../global/js/utils/Wrap.js');
var ActionSet = require('../ActionSet/ActionSet.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["actions", "children", "className", "closeIconDescription", "description", "hasCloseIcon", "headerActions", "influencer", "influencerPosition", "influencerWidth", "label", "navigation", "onClose", "open", "selectorPrimaryFocus", "size", "portalTarget", "title", "verticalPosition"];

var bc = "".concat(settings.pkg.prefix, "--tearsheet");
var componentName = 'TearsheetShell';
var maxDepth = 3; // NOTE: the component SCSS is not imported here: it is rolled up separately.
// Global data structure to communicate the state of tearsheet stacking
// (i.e. when more than one tearsheet is open). Each tearsheet supplies a
// handler to be called whenever the stacking of the tearsheets changes, which
// happens when a tearsheet opens or closes. The 'open' array contains one
// handler per OPEN tearsheet ordered from lowest to highest in visual z-order.
// The 'all' array contains all the handlers for open and closed tearsheets.

var stack = {
  open: [],
  all: []
}; // these props are only applicable when size='wide'

var tearsheetShellWideProps = ['headerActions', 'influencer', 'influencerPosition', 'influencerWidth', 'navigation'];
var tearsheetIsPassive = function tearsheetIsPassive(actions) {
  return !actions || !(actions !== null && actions !== void 0 && actions.length);
};
var tearsheetHasCloseIcon = function tearsheetHasCloseIcon(actions, hasCloseIcon) {
  return hasCloseIcon !== null && hasCloseIcon !== void 0 ? hasCloseIcon : tearsheetIsPassive(actions);
}; // TearSheetShell is used internally by TearSheet and TearSheetNarrow

var TearsheetShell = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var actions = _ref.actions,
      children = _ref.children,
      className = _ref.className,
      closeIconDescription = _ref.closeIconDescription,
      description = _ref.description,
      hasCloseIcon = _ref.hasCloseIcon,
      headerActions = _ref.headerActions,
      influencer = _ref.influencer,
      influencerPosition = _ref.influencerPosition,
      influencerWidth = _ref.influencerWidth,
      label = _ref.label,
      navigation = _ref.navigation,
      onClose = _ref.onClose,
      open = _ref.open,
      selectorPrimaryFocus = _ref.selectorPrimaryFocus,
      size = _ref.size,
      portalTargetIn = _ref.portalTarget,
      title = _ref.title,
      verticalPosition = _ref.verticalPosition,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var carbonPrefix = react.usePrefix();
  var bcModalHeader = "".concat(carbonPrefix, "--modal-header"); // node the modal tearsheet is hosted in

  var _useState = React.useState(null),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      portalTarget = _useState2[0],
      setPortalTarget = _useState2[1];

  React.useEffect(function () {
    if (portalTargetIn) {
      setPortalTarget(portalTargetIn);
    } else {
      if (settings.pkg.isFeatureEnabled('default-portal-target-body')) {
        setPortalTarget(document.body);
      }
    }
  }, [portalTargetIn]);
  var localRef = React.useRef();
  var modalRef = ref || localRef;

  var _useResizeDetector = reactResizeDetector.useResizeDetector({
    handleHeight: false
  }),
      width = _useResizeDetector.width,
      resizer = _useResizeDetector.ref; // Keep track of the stack depth and our position in it (1-based, 0=closed)


  var _useState3 = React.useState(0),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      depth = _useState4[0],
      setDepth = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      position = _useState6[0],
      setPosition = _useState6[1]; // Keep a record of the previous value of depth.


  var prevDepth = React.useRef();
  React.useEffect(function () {
    prevDepth.current = depth;
  }); // A "passive" tearsheet is one with no navigation actions.

  var isPassive = tearsheetIsPassive(actions);
  var effectiveHasCloseIcon = tearsheetHasCloseIcon(actions, hasCloseIcon); // Callback that will be called whenever the stacking order changes.
  // position is 1-based with 0 indicating closed.

  function handleStackChange(newDepth, newPosition) {
    setDepth(newDepth);
    setPosition(newPosition);
  }

  handleStackChange.checkFocus = function () {
    // if we are now the topmost tearsheet, ensure we have focus
    if (position === depth && modalRef.current && !modalRef.current.innerModal.current.contains(document.activeElement)) {
      handleStackChange.claimFocus();
    }
  }; // Callback to give the tearsheet the opportunity to claim focus


  handleStackChange.claimFocus = function () {
    var element = selectorPrimaryFocus ? modalRef.current.innerModal.current.querySelector(selectorPrimaryFocus) : modalRef.current.startSentinel.current;
    setTimeout(function () {
      return element.focus();
    }, 1);
  };

  React.useEffect(function () {
    var notify = function notify() {
      return stack.all.forEach(function (handler) {
        handler(Math.min(stack.open.length, maxDepth), stack.open.indexOf(handler) + 1);
        handler.checkFocus();
      });
    }; // Register this tearsheet's stack change callback/listener.


    stack.all.push(handleStackChange); // If the tearsheet is mounting with open=true or open is changing from
    // false to true to open it then append its notification callback to
    // the end of the stack array (as its ID), and call all the callbacks
    // to notify all open tearsheets that the stacking has changed.

    if (open) {
      stack.open.push(handleStackChange);
      notify();
    } // Cleanup function called whenever the tearsheet unmounts or the open
    // prop changes value (in which case it is called prior to this hook
    // being called again).


    return function cleanup() {
      // Remove the notification callback from the all handlers array.
      stack.all.splice(stack.all.indexOf(handleStackChange), 1); // Remove the notification callback from the open handlers array, if
      // it's there, and notify all open tearsheets that the stacking has
      // changed (only necessary if this tearsheet was open).

      var openIndex = stack.open.indexOf(handleStackChange);

      if (openIndex >= 0) {
        stack.open.splice(openIndex, 1);
        notify();
      }
    };
  }, [open]);

  function handleFocus() {
    // If something within us is receiving focus but we are not the topmost
    // stacked tearsheet, transfer focus to the topmost tearsheet instead
    if (position < depth) {
      stack.open[stack.open.length - 1].claimFocus();
    }
  }

  if (position <= depth) {
    var _cx, _ref2, _cx3, _cx5, _cx6;

    // Include a modal header if and only if one or more of these is given.
    // We can't use a Wrap for the ModalHeader because ComposedModal requires
    // the direct child to be the ModalHeader instance.
    var includeHeader = label || title || description || headerActions || navigation || effectiveHasCloseIcon; // Include an ActionSet if and only if one or more actions is given.

    var includeActions = actions && (actions === null || actions === void 0 ? void 0 : actions.length) > 0;
    return (portalTarget ? reactDom.createPortal : function (children) {
      return children;
    })( /*#__PURE__*/React__default["default"].createElement(react.ComposedModal, _rollupPluginBabelHelpers["extends"]({}, rest, {
      "aria-label": title,
      className: cx__default["default"](bc, className, (_cx = {}, _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(bc, "--stacked-").concat(position, "-of-").concat(depth), // Don't apply this on the initial open of a single tearsheet.
      depth > 1 || depth === 1 && prevDepth.current > 1), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(bc, "--wide"), size === 'wide'), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(bc, "--narrow"), size !== 'wide'), _cx)),
      style: (_ref2 = {}, _rollupPluginBabelHelpers.defineProperty(_ref2, "--".concat(bc, "--stacking-scale-factor-single"), (width - 32) / width), _rollupPluginBabelHelpers.defineProperty(_ref2, "--".concat(bc, "--stacking-scale-factor-double"), (width - 64) / width), _ref2),
      containerClassName: cx__default["default"]("".concat(bc, "__container"), _rollupPluginBabelHelpers.defineProperty({}, "".concat(bc, "__container--lower"), verticalPosition === 'lower')),
      onClose: onClose,
      open: open,
      selectorPrimaryFocus: selectorPrimaryFocus,
      onFocus: handleFocus,
      preventCloseOnClickOutside: !isPassive,
      ref: modalRef,
      selectorsFloatingMenus: [".".concat(carbonPrefix, "--overflow-menu-options"), ".".concat(carbonPrefix, "--tooltip"), '.flatpickr-calendar', ".".concat(bc, "__container")],
      size: "sm"
    }), includeHeader && /*#__PURE__*/React__default["default"].createElement(react.ModalHeader, {
      className: cx__default["default"]("".concat(bc, "__header"), (_cx3 = {}, _rollupPluginBabelHelpers.defineProperty(_cx3, "".concat(bc, "__header--with-close-icon"), effectiveHasCloseIcon), _rollupPluginBabelHelpers.defineProperty(_cx3, "".concat(bc, "__header--with-nav"), navigation), _cx3)),
      closeClassName: cx__default["default"](_rollupPluginBabelHelpers.defineProperty({}, "".concat(bc, "__header--no-close-icon"), !effectiveHasCloseIcon)),
      closeModal: onClose,
      iconDescription: closeIconDescription
    }, /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__header-content")
    }, /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__header-fields")
    }, /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      element: "h2",
      className: "".concat(bcModalHeader, "__label")
    }, label), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      element: "h3",
      className: cx__default["default"]("".concat(bcModalHeader, "__heading"), "".concat(bc, "__heading"))
    }, title), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__header-description")
    }, description)), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__header-actions")
    }, headerActions)), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__header-navigation")
    }, navigation)), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      element: react.ModalBody,
      className: "".concat(bc, "__body")
    }, /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: cx__default["default"]((_cx5 = {}, _rollupPluginBabelHelpers.defineProperty(_cx5, "".concat(bc, "__influencer"), true), _rollupPluginBabelHelpers.defineProperty(_cx5, "".concat(bc, "__influencer--wide"), influencerWidth === 'wide'), _cx5)),
      neverRender: influencerPosition === 'right'
    }, influencer), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__right")
    }, /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      alwaysRender: includeActions,
      className: "".concat(bc, "__main")
    }, /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      alwaysRender: influencer && influencerPosition === 'right',
      className: "".concat(bc, "__content")
    }, children), /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: cx__default["default"]((_cx6 = {}, _rollupPluginBabelHelpers.defineProperty(_cx6, "".concat(bc, "__influencer"), true), _rollupPluginBabelHelpers.defineProperty(_cx6, "".concat(bc, "__influencer--wide"), influencerWidth === 'wide'), _cx6)),
      neverRender: influencerPosition !== 'right'
    }, influencer)), includeActions && /*#__PURE__*/React__default["default"].createElement(Wrap.Wrap, {
      className: "".concat(bc, "__button-container")
    }, /*#__PURE__*/React__default["default"].createElement(ActionSet.ActionSet, {
      actions: actions,
      buttonSize: size === 'wide' ? 'xl' : null,
      className: "".concat(bc, "__buttons"),
      size: size === 'wide' ? '2xl' : 'lg'
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(bc, "__resize-detector"),
      ref: resizer
    })), portalTarget);
  } else {
    pconsole["default"].warn('Tearsheet not rendered: maximum stacking depth exceeded.');
    return null;
  }
}); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

TearsheetShell.displayName = componentName;
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
// corresponding props for Tearsheet and TearsheetNarrow components.

TearsheetShell.propTypes = _rollupPluginBabelHelpers.objectSpread2({
  /**
   * The actions to be shown as buttons in the action area at the bottom of the
   * tearsheet. Each action is specified as an object with optional fields
   * 'label' to supply the button label, 'kind' to select the button kind (must
   * be 'primary', 'secondary' or 'ghost'), 'loading' to display a loading
   * indicator, and 'onClick' to receive notifications when the button is
   * clicked. Additional fields in the object will be passed to the Button
   * component, and these can include 'disabled', 'ref', 'className', and any
   * other Button props. Any other fields in the object will be passed through
   * to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: PropTypes__default["default"].arrayOf( // NB we don't include the validator here, as the component wrapping this
  // one should ensure appropriate validation is done.
  PropTypes__default["default"].shape(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, react.Button.propTypes), {}, {
    kind: PropTypes__default["default"].oneOf(['ghost', 'danger--ghost', 'secondary', 'danger', 'primary']),
    label: PropTypes__default["default"].string,
    loading: PropTypes__default["default"].bool,
    // we duplicate this Button prop to improve the DocGen here
    onClick: react.Button.propTypes.onClick
  }))),

  /**
   * The main content of the tearsheet.
   */
  children: PropTypes__default["default"].node,

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
  closeIconDescription: PropTypes__default["default"].string.isRequired.if(function (_ref3) {
    var actions = _ref3.actions,
        hasCloseIcon = _ref3.hasCloseIcon;
    return tearsheetHasCloseIcon(actions, hasCloseIcon);
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
   * The content for the header actions area, displayed alongside the title in
   * the header area of the tearsheet. This is typically a drop-down, or a set
   * of small buttons, or similar. NB the headerActions is only applicable for
   * wide tearsheets.
   */
  headerActions: PropTypes__default["default"].element,

  /**
   * The content for the influencer section of the tearsheet, displayed
   * alongside the main content. This is typically a menu, or filter, or
   * progress indicator, or similar. NB the influencer is only applicable for
   * wide tearsheets.
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
   * of the header area of the tearsheet. NB the navigation is only applicable
   * for wide tearsheets.
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
   * portal target for the all tags modal
   */
  portalTarget: PropTypes__default["default"].node,

  /**
   * Specifies the width of the tearsheet, 'narrow' or 'wide'.
   */
  size: PropTypes__default["default"].oneOf(['narrow', 'wide']).isRequired,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes__default["default"].node
}, deprecatedProps);

exports.TearsheetShell = TearsheetShell;
exports.deprecatedProps = deprecatedProps;
exports.tearsheetHasCloseIcon = tearsheetHasCloseIcon;
exports.tearsheetIsPassive = tearsheetIsPassive;
exports.tearsheetShellWideProps = tearsheetShellWideProps;
