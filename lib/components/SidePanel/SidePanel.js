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
var reactResizeDetector = require('react-resize-detector');
var motion = require('@carbon/motion');
var devtools = require('../../global/js/utils/devtools.js');
var propsHelper = require('../../global/js/utils/props-helper.js');
var wrapFocus = require('../../global/js/utils/wrapFocus.js');
var settings = require('../../settings.js');
var constants = require('./constants.js');
var react = require('@carbon/react');
var iconsReact = require('@carbon/icons-react');
var usePreviousValue = require('../../global/js/hooks/usePreviousValue.js');
var ActionSet = require('../ActionSet/ActionSet.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["actionToolbarButtons", "actions", "animateTitle", "children", "className", "closeIconDescription", "condensedActions", "currentStep", "includeOverlay", "labelText", "navigationBackIconDescription", "onNavigationBack", "onRequestClose", "onUnmount", "open", "placement", "preventCloseOnClickOutside", "selectorPageContent", "selectorPrimaryFocus", "size", "slideIn", "subtitle", "title"],
    _excluded2 = ["label", "kind", "icon", "leading", "disabled", "className", "onClick"];
var blockClass = "".concat(settings.pkg.prefix, "--side-panel");
var componentName = 'SidePanel'; // NOTE: the component SCSS is not imported here: it is rolled up separately.
// Default values for props

var defaults = {
  animateTitle: true,
  closeIconDescription: 'Close',
  currentStep: 0,
  navigationBackIconDescription: 'Back',
  placement: 'right',
  size: 'md'
};
/**
 * Side panels keep users in-context of a page while performing tasks like navigating, editing, viewing details, or configuring something new.
 */

exports.SidePanel = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _window, _ref4, _cx4;

  var actionToolbarButtons = _ref.actionToolbarButtons,
      actions = _ref.actions,
      _ref$animateTitle = _ref.animateTitle,
      animateTitle = _ref$animateTitle === void 0 ? defaults.animateTitle : _ref$animateTitle,
      children = _ref.children,
      className = _ref.className,
      _ref$closeIconDescrip = _ref.closeIconDescription,
      closeIconDescription = _ref$closeIconDescrip === void 0 ? defaults.closeIconDescription : _ref$closeIconDescrip,
      condensedActions = _ref.condensedActions,
      _ref$currentStep = _ref.currentStep,
      currentStep = _ref$currentStep === void 0 ? defaults.currentStep : _ref$currentStep,
      includeOverlay = _ref.includeOverlay,
      labelText = _ref.labelText,
      _ref$navigationBackIc = _ref.navigationBackIconDescription,
      navigationBackIconDescription = _ref$navigationBackIc === void 0 ? defaults.navigationBackIconDescription : _ref$navigationBackIc,
      onNavigationBack = _ref.onNavigationBack,
      onRequestClose = _ref.onRequestClose,
      onUnmount = _ref.onUnmount,
      open = _ref.open,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? defaults.placement : _ref$placement,
      preventCloseOnClickOutside = _ref.preventCloseOnClickOutside,
      selectorPageContent = _ref.selectorPageContent,
      selectorPrimaryFocus = _ref.selectorPrimaryFocus,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? defaults.size : _ref$size,
      slideIn = _ref.slideIn,
      subtitle = _ref.subtitle,
      title = _ref.title,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState(open),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      shouldRender = _useState2[0],
      setRender = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      animationComplete = _useState4[0],
      setAnimationComplete = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      panelHeight = _useState6[0],
      setPanelHeight = _useState6[1];

  var sidePanelRef = React.useRef();
  var sidePanelOverlayRef = React.useRef();
  var startTrapRef = React.useRef();
  var endTrapRef = React.useRef();
  var sidePanelInnerRef = React.useRef();
  var sidePanelCloseRef = React.useRef();
  var previousState = usePreviousValue.usePreviousValue({
    size: size,
    open: open
  });
  var reducedMotion = typeof window !== 'undefined' && (_window = window) !== null && _window !== void 0 && _window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : {
    matches: true
  }; // scroll panel to top going between steps

  React.useEffect(function () {
    var panelRef = ref || sidePanelRef;

    if (panelRef && panelRef.current) {
      var _document$querySelect;

      var scrollableSection = panelRef.current.querySelector(".".concat(blockClass, "__inner-content"));
      var sidePanelOuter = document.querySelector("#".concat(blockClass, "-outer"));
      var initialTitleHeight = (_document$querySelect = document.querySelector(".".concat(blockClass, "__title-container"))) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.offsetHeight;
      scrollableSection.scrollTop = 0; // The size of the panel has changed while it is still opened
      // so we need to scroll it to the top and reset the title container
      // height css custom property

      if ((previousState === null || previousState === void 0 ? void 0 : previousState.size) !== size) {
        scrollableSection.scrollTop = 0;
        sidePanelOuter.style.setProperty("--".concat(blockClass, "--title-container-height"), "".concat(Number(initialTitleHeight), "px"));
      }
    }
  }, [currentStep, ref, size, previousState === null || previousState === void 0 ? void 0 : previousState.size]); // set initial focus when side panel opens

  React.useEffect(function () {
    var initialFocus = function initialFocus(focusContainerElement) {
      var containerElement = focusContainerElement;
      var primaryFocusElement = containerElement && containerElement.querySelector(selectorPrimaryFocus);

      if (primaryFocusElement) {
        return primaryFocusElement;
      } else {
        return sidePanelCloseRef && sidePanelCloseRef.current;
      }
    };

    var focusButton = function focusButton(focusContainerElement) {
      var target = initialFocus(focusContainerElement);
      target === null || target === void 0 ? void 0 : target.focus();
    };

    if (open && animationComplete) {
      focusButton(sidePanelInnerRef.current);
    }
  }, [selectorPrimaryFocus, open, animationComplete]);
  React.useEffect(function () {
    if (open && actions && actions.length && animationComplete) {
      var sidePanelOuter = document.querySelector("#".concat(blockClass, "-outer"));
      var actionsContainer = getActionsContainerElement();
      var actionsHeight = (actionsContainer === null || actionsContainer === void 0 ? void 0 : actionsContainer.offsetHeight) + 16; // add additional 1rem spacing to bottom padding

      actionsHeight = "".concat(Math.round(actionsHeight / 16), "rem");
      sidePanelOuter === null || sidePanelOuter === void 0 ? void 0 : sidePanelOuter.style.setProperty("--".concat(blockClass, "--content-bottom-padding"), actionsHeight);
    }
  }, [actions, condensedActions, open, animationComplete]); // Add console warning if labelText is provided without a title.
  // This combination is not allowed.

  React.useEffect(function () {
    if (!title && labelText) {
      console.warn( // eslint-disable-next-line max-len
      "".concat(componentName, ": The prop `labelText` was provided without a `title`. It is required to have a `title` when using the `labelText` prop."));
    }
  }, [labelText, title]);
  /* istanbul ignore next */

  var handleResize = function handleResize(width, height) {
    setPanelHeight(height);
    var sidePanelOuter = document.querySelector("#".concat(blockClass, "-outer"));
    var actionsContainer = getActionsContainerElement();
    var actionsHeight = actionsContainer.offsetHeight + 16; // add additional 1rem spacing to bottom padding

    actionsHeight = "".concat(Math.round(actionsHeight / 16), "rem");
    sidePanelOuter.style.setProperty("--".concat(blockClass, "--content-bottom-padding"), actionsHeight);
  };

  var getActionsContainerElement = function getActionsContainerElement() {
    var sidePanelOuter = document.querySelector("#".concat(blockClass, "-outer"));
    return sidePanelOuter && sidePanelOuter.querySelector(".".concat(blockClass, "__actions-container"));
  }; // Title and subtitle scroll animation


  React.useEffect(function () {
    if (open && animateTitle && animationComplete && title && title.length && !reducedMotion.matches) {
      var _document$querySelect2, _document$querySelect3, _document$querySelect4;

      var sidePanelOuter = document.querySelector("#".concat(blockClass, "-outer"));
      var sidePanelScrollArea = document.querySelector("#".concat(blockClass, "-outer .").concat(blockClass, "__inner-content"));
      var sidePanelTitleElement = document.querySelector(".".concat(blockClass, "__title-text"));
      var sidePanelCollapsedTitleElement = document.querySelector(".".concat(blockClass, "__collapsed-title-text"));
      var sidePanelSubtitleElement = document.querySelector(".".concat("".concat(blockClass, "__subtitle-text")));
      var sidePanelSubtitleElementHeight = (sidePanelSubtitleElement === null || sidePanelSubtitleElement === void 0 ? void 0 : sidePanelSubtitleElement.offsetHeight) || 0; // set default subtitle height if a subtitle is not provided to enable scrolling animation

      var panelOuterHeight = panelHeight;
      var scrollSectionHeight = (_document$querySelect2 = document.querySelector(".".concat(blockClass, "__body-content"))) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.offsetHeight;
      var titleContainerHeight = (_document$querySelect3 = document.querySelector(".".concat(blockClass, "__title-container"))) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.offsetHeight;
      var labelTextHeight = (_document$querySelect4 = document.querySelector(".".concat(blockClass, "__label-text"))) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.offsetHeight;
      var totalScrollingContentHeight = titleContainerHeight + sidePanelSubtitleElementHeight + scrollSectionHeight; // if the difference between the total scrolling height and the panel height is less than
      // the subtitleElement height OR if the subtitle element height is 0, use that difference
      // as the length of the scroll animation (otherwise the animation will not be able to complete
      // because there is not enough scrolling distance to complete it).

      sidePanelSubtitleElementHeight = totalScrollingContentHeight - panelOuterHeight < sidePanelSubtitleElementHeight ? totalScrollingContentHeight - panelOuterHeight : sidePanelSubtitleElementHeight === 0 ? 16 : sidePanelSubtitleElementHeight;
      sidePanelSubtitleElementHeight = sidePanelSubtitleElementHeight < 0 ? (sidePanelScrollArea === null || sidePanelScrollArea === void 0 ? void 0 : sidePanelScrollArea.scrollHeight) - (sidePanelScrollArea === null || sidePanelScrollArea === void 0 ? void 0 : sidePanelScrollArea.clientHeight) : sidePanelSubtitleElementHeight;
      /* istanbul ignore next */

      sidePanelScrollArea && sidePanelScrollArea.addEventListener('scroll', function () {
        var scrollTop = sidePanelScrollArea.scrollTop; // if scrolling has occurred

        if (scrollTop > 0) {
          sidePanelOuter.classList.add("".concat(blockClass, "__with-condensed-header")); // Set subtitle opacity calculation here
          // as scroll progresses

          var titleOpacity = Math.min(1, (sidePanelSubtitleElementHeight - scrollTop) / sidePanelSubtitleElementHeight);
          titleOpacity = titleOpacity < 0 ? 0 : titleOpacity;
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--subtitle-opacity"), titleOpacity); // Calculate divider opacity to avoid border
          // abruptly appearing when scrolling starts.
          // This approach uses a pseudo element and sets
          // the opacity as scroll progresses.

          var dividerOpacity = Math.min(scrollTop / sidePanelSubtitleElementHeight, 1);
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--divider-opacity"), "".concat(Math.min(1, dividerOpacity))); // We need to know the height of the title element
          // so that we know how far to place the action toolbar
          // from the top since it is sticky

          var titleTextHeight = Math.max(sidePanelTitleElement.offsetHeight);
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--title-height"), "".concat(titleTextHeight + 16, "px")); // Set title y positioning

          var titleYPosition = Math.min(scrollTop / sidePanelSubtitleElementHeight, 1);
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--title-y-position"), "".concat(-Math.abs(titleYPosition), "rem")); // mark title with aria-hidden={true} if opacity reaches 0

          if (titleOpacity === 0) {
            sidePanelTitleElement.setAttribute('aria-hidden', 'true');
            sidePanelCollapsedTitleElement.setAttribute('aria-hidden', 'false');
          } // Set collapsed title y positioning


          var collapsedTitleYPosition = Math.min(1, (sidePanelSubtitleElementHeight - scrollTop) / sidePanelSubtitleElementHeight);
          collapsedTitleYPosition = collapsedTitleYPosition < 0 ? 0 : collapsedTitleYPosition;
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--collapsed-title-y-position"), "".concat(collapsedTitleYPosition, "rem")); // Set label text height

          var scrollAnimationProgress = dividerOpacity;
          var reduceTitleContainerHeightAmount = labelTextHeight * scrollAnimationProgress / titleContainerHeight * 100;
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--label-text-height"), "".concat(Math.trunc(reduceTitleContainerHeightAmount), "px"));
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--title-container-height"), "".concat(titleContainerHeight, "px"));
        } else {
          sidePanelTitleElement.setAttribute('aria-hidden', 'false');
          sidePanelCollapsedTitleElement.setAttribute('aria-hidden', 'true');
          sidePanelOuter.classList.remove("".concat(blockClass, "__with-condensed-header"));
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--subtitle-opacity"), 1);
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--title-y-position"), 0);
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--divider-opacity"), 0);
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--collapsed-title-y-position"), '1rem');
          sidePanelOuter.style.setProperty("--".concat(blockClass, "--label-text-height"), '0px');
        }
      });
    }

    if (open && shouldRender && !animateTitle) {
      var _sidePanelOuter = document.querySelector("#".concat(blockClass, "-outer"));

      var _sidePanelTitleElement = document.querySelector(".".concat(blockClass, "__title-container .").concat(blockClass, "__title-text"));

      var _sidePanelSubtitleElement = document.querySelector(".".concat(blockClass, "__subtitle-text"));

      var actionToolbarElement = document.querySelector(".".concat(blockClass, "__action-toolbar"));

      var _labelText = document.querySelector(".".concat(blockClass, "__label-text"));

      var _sidePanelSubtitleElementHeight = (_sidePanelSubtitleElement === null || _sidePanelSubtitleElement === void 0 ? void 0 : _sidePanelSubtitleElement.offsetHeight) || 0;

      var sidePanelActionBarElementHeight = (actionToolbarElement === null || actionToolbarElement === void 0 ? void 0 : actionToolbarElement.offsetHeight) || 0;
      var titleHeight = (_sidePanelTitleElement === null || _sidePanelTitleElement === void 0 ? void 0 : _sidePanelTitleElement.offsetHeight) + 24;
      var labelHeight = (_labelText === null || _labelText === void 0 ? void 0 : _labelText.offsetHeight) || 0;
      _sidePanelOuter === null || _sidePanelOuter === void 0 ? void 0 : _sidePanelOuter.style.setProperty("--".concat(blockClass, "--title-text-height"), "".concat(titleHeight, "px"));
      _sidePanelOuter === null || _sidePanelOuter === void 0 ? void 0 : _sidePanelOuter.style.setProperty("--".concat(blockClass, "--subtitle-container-height"), "".concat(_sidePanelSubtitleElementHeight, "px"));
      _sidePanelOuter === null || _sidePanelOuter === void 0 ? void 0 : _sidePanelOuter.style.setProperty("--".concat(blockClass, "--action-bar-container-height"), "".concat(sidePanelActionBarElementHeight, "px"));
      _sidePanelOuter === null || _sidePanelOuter === void 0 ? void 0 : _sidePanelOuter.style.setProperty("--".concat(blockClass, "--label-text-height"), "".concat(labelHeight, "px"));
    }
  }, [open, animateTitle, animationComplete, shouldRender, panelHeight, title, size, reducedMotion.matches]); // click outside functionality if `includeOverlay` prop is set

  React.useEffect(function () {
    var handleOutsideClick = function handleOutsideClick(event) {
      var panelRef = ref || sidePanelRef;

      if (panelRef.current && sidePanelOverlayRef.current && sidePanelOverlayRef.current.contains(event.target) && onRequestClose) {
        onRequestClose();
      }
    };

    var bodyElement = document.body;

    if (includeOverlay && open) {
      bodyElement.style.overflow = 'hidden';
    } else if (includeOverlay && !open) {
      bodyElement.style.overflow = 'initial';
    }

    if (includeOverlay && !preventCloseOnClickOutside) {
      document.addEventListener('click', handleOutsideClick);
    }

    return function () {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [includeOverlay, onRequestClose, open, preventCloseOnClickOutside, ref, onUnmount]); // initialize the side panel to open

  React.useEffect(function () {
    if (open) {
      setRender(true);
    }
  }, [open]); // initializes the side panel to close

  var onAnimationEnd = function onAnimationEnd() {
    if (!open) {
      onUnmount === null || onUnmount === void 0 ? void 0 : onUnmount();
      setRender(false);
    }

    setAnimationComplete(true);
  }; // Set the internal state `animationComplete` to true if
  // prefers reduced motion is true


  React.useEffect(function () {
    if (reducedMotion.matches) {
      setAnimationComplete(true);
    }
  }, [reducedMotion.matches]); // initializes the side panel to open

  var _onAnimationStart = function onAnimationStart(event) {
    event.persist();
    var isPanelTarget = event.target.id === "".concat(blockClass, "-outer");

    if (isPanelTarget) {
      setAnimationComplete(false);
    }
  }; // used to reset margins of the slide in panel when closed/closing


  React.useEffect(function () {
    if (!open && slideIn) {
      var pageContentElement = document.querySelector(selectorPageContent);

      if (placement && placement === 'right' && pageContentElement) {
        pageContentElement.style.marginRight = 0;
      } else if (pageContentElement) {
        pageContentElement.style.marginLeft = 0;
      }
    }
  }, [open, placement, selectorPageContent, slideIn]);
  React.useEffect(function () {
    if (!open && previousState !== null && previousState !== void 0 && previousState.open && reducedMotion.matches) {
      setRender(false);
      onUnmount === null || onUnmount === void 0 ? void 0 : onUnmount();
    }
  }, [open, onUnmount, reducedMotion.matches, previousState === null || previousState === void 0 ? void 0 : previousState.open]); // used to set margins of content for slide in panel version

  React.useEffect(function () {
    if (shouldRender && slideIn) {
      var pageContentElement = document.querySelector(selectorPageContent);

      if (placement && placement === 'right' && pageContentElement) {
        pageContentElement.style.marginRight = 0;
        pageContentElement.style.transition = !reducedMotion.matches ? "margin-right ".concat(motion.moderate02) : null;
        pageContentElement.style.marginRight = constants.SIDE_PANEL_SIZES[size];
      } else if (pageContentElement) {
        pageContentElement.style.marginLeft = 0;
        pageContentElement.style.transition = !reducedMotion.matches ? "margin-left ".concat(motion.moderate02) : null;
        pageContentElement.style.marginLeft = constants.SIDE_PANEL_SIZES[size];
      }
    }
  }, [slideIn, selectorPageContent, placement, shouldRender, size, reducedMotion.matches]); // adds focus trap functionality

  /* istanbul ignore next */

  var handleBlur = function handleBlur(_ref2) {
    var oldActiveNode = _ref2.target,
        currentActiveNode = _ref2.relatedTarget;

    // focus trap should only be set if the side panel is a `slideOver` type
    if (open && sidePanelInnerRef && !slideIn) {
      wrapFocus["default"]({
        bodyNode: sidePanelInnerRef.current,
        startTrapRef: startTrapRef,
        endTrapRef: endTrapRef,
        currentActiveNode: currentActiveNode,
        oldActiveNode: oldActiveNode
      });
    }
  };

  var primaryActionContainerClassNames = cx__default["default"](["".concat(blockClass, "__actions-container"), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "__actions-container-condensed"), condensedActions)]);
  var mainPanelClassNames = cx__default["default"]([blockClass, className, "".concat(blockClass, "__container"), "".concat(blockClass, "__container--").concat(size), (_ref4 = {}, _rollupPluginBabelHelpers.defineProperty(_ref4, "".concat(blockClass, "__container-right-placement"), placement === 'right'), _rollupPluginBabelHelpers.defineProperty(_ref4, "".concat(blockClass, "__container-left-placement"), placement === 'left'), _rollupPluginBabelHelpers.defineProperty(_ref4, "".concat(blockClass, "__container-with-action-toolbar"), actionToolbarButtons && actionToolbarButtons.length), _rollupPluginBabelHelpers.defineProperty(_ref4, "".concat(blockClass, "__container-without-overlay"), !includeOverlay && !slideIn), _rollupPluginBabelHelpers.defineProperty(_ref4, "".concat(blockClass, "__container-is-animating"), !animationComplete || !open), _ref4)]);

  var renderHeader = function renderHeader() {
    var _cx, _cx2;

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
      className: cx__default["default"]("".concat(blockClass, "__title-container"), (_cx = {}, _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__on-detail-step"), currentStep > 0), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__on-detail-step-without-title"), currentStep > 0 && !title), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__title-container--no-title-animation"), !animateTitle), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__title-container-is-animating"), !animationComplete || !open), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__title-container-without-title"), !title), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__title-container--reduced-motion"), reducedMotion.matches), _cx))
    }, currentStep > 0 && /*#__PURE__*/React__default["default"].createElement(react.Button, {
      "aria-label": navigationBackIconDescription,
      kind: "ghost",
      size: "sm",
      disabled: false,
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.ArrowLeft, _rollupPluginBabelHelpers["extends"]({
          size: 20
        }, props));
      },
      iconDescription: navigationBackIconDescription,
      className: "".concat(blockClass, "__navigation-back-button"),
      onClick: onNavigationBack
    }), title && title.length && labelText && labelText.length && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "".concat(blockClass, "__label-text")
    }, labelText), title && title.length && renderTitle()), /*#__PURE__*/React__default["default"].createElement(react.Button, {
      "aria-label": closeIconDescription,
      kind: "ghost",
      size: "sm",
      renderIcon: function renderIcon(props) {
        return /*#__PURE__*/React__default["default"].createElement(iconsReact.Close, _rollupPluginBabelHelpers["extends"]({
          size: 20
        }, props));
      },
      iconDescription: closeIconDescription,
      className: "".concat(blockClass, "__close-button"),
      onClick: onRequestClose,
      ref: sidePanelCloseRef
    }), subtitle && /*#__PURE__*/React__default["default"].createElement("p", {
      className: cx__default["default"]("".concat(blockClass, "__subtitle-text"), (_cx2 = {}, _rollupPluginBabelHelpers.defineProperty(_cx2, "".concat(blockClass, "__subtitle-text-no-animation"), !animateTitle), _rollupPluginBabelHelpers.defineProperty(_cx2, "".concat(blockClass, "__subtitle-text-no-animation-no-action-toolbar"), !animateTitle && (!actionToolbarButtons || !actionToolbarButtons.length)), _rollupPluginBabelHelpers.defineProperty(_cx2, "".concat(blockClass, "__subtitle-text-is-animating"), !animationComplete && animateTitle), _rollupPluginBabelHelpers.defineProperty(_cx2, "".concat(blockClass, "__subtitle-without-title"), !title), _cx2))
    }, subtitle), actionToolbarButtons && actionToolbarButtons.length && /*#__PURE__*/React__default["default"].createElement("div", {
      className: cx__default["default"]("".concat(blockClass, "__action-toolbar"), _rollupPluginBabelHelpers.defineProperty({}, "".concat(blockClass, "__action-toolbar-no-animation"), !animateTitle))
    }, actionToolbarButtons.map(function (_ref5) {
      var _ref6;

      var label = _ref5.label,
          kind = _ref5.kind,
          icon = _ref5.icon,
          leading = _ref5.leading,
          disabled = _ref5.disabled,
          className = _ref5.className,
          onClick = _ref5.onClick,
          rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref5, _excluded2);

      return /*#__PURE__*/React__default["default"].createElement(react.Button, _rollupPluginBabelHelpers["extends"]({}, rest, {
        key: label,
        kind: kind || 'ghost',
        size: "sm",
        renderIcon: icon,
        iconDescription: label,
        tooltipPosition: "bottom",
        tooltipAlignment: "center",
        hasIconOnly: !leading,
        disabled: disabled,
        className: cx__default["default"](["".concat(blockClass, "__action-toolbar-button"), className, (_ref6 = {}, _rollupPluginBabelHelpers.defineProperty(_ref6, "".concat(blockClass, "__action-toolbar-icon-only-button"), icon && !leading), _rollupPluginBabelHelpers.defineProperty(_ref6, "".concat(blockClass, "__action-toolbar-leading-button"), leading), _ref6)]),
        onClick: onClick
      }), leading && label);
    })));
  };

  var renderTitle = function renderTitle() {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, title && title.length && /*#__PURE__*/React__default["default"].createElement("h2", {
      className: "".concat(blockClass, "__title-text"),
      title: title,
      "aria-hidden": false
    }, title), animateTitle && title && title.length && !reducedMotion.matches && /*#__PURE__*/React__default["default"].createElement("h2", {
      className: "".concat(blockClass, "__collapsed-title-text"),
      title: title,
      "aria-hidden": true
    }, title));
  };

  var contentRef = ref || sidePanelRef;
  reactResizeDetector.useResizeDetector({
    handleHeight: true,
    onResize: handleResize,
    targetRef: contentRef
  });
  return shouldRender && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({}, devtools.getDevtoolsProps(componentName), rest, {
    id: "".concat(blockClass, "-outer"),
    className: mainPanelClassNames,
    style: {
      animation: !reducedMotion.matches ? "".concat(open ? placement === 'right' ? "side-panel-entrance-right ".concat(motion.moderate02) : "side-panel-entrance-left ".concat(motion.moderate02) : placement === 'right' ? "side-panel-exit-right ".concat(motion.moderate02) : "side-panel-exit-left ".concat(motion.moderate02)) : null
    },
    onAnimationEnd: onAnimationEnd,
    onAnimationStart: function onAnimationStart(event) {
      return _onAnimationStart(event);
    },
    onBlur: handleBlur,
    ref: contentRef,
    role: "complementary",
    "aria-label": title
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    ref: startTrapRef,
    tabIndex: "0",
    role: "link",
    className: "".concat(blockClass, "__visually-hidden")
  }, "Focus sentinel"), !animateTitle && renderHeader(), /*#__PURE__*/React__default["default"].createElement("div", {
    ref: sidePanelInnerRef,
    className: cx__default["default"]("".concat(blockClass, "__inner-content"), (_cx4 = {}, _rollupPluginBabelHelpers.defineProperty(_cx4, "".concat(blockClass, "__static-inner-content"), !animateTitle), _rollupPluginBabelHelpers.defineProperty(_cx4, "".concat(blockClass, "__static-inner-content-no-actions"), !animateTitle && !(actions !== null && actions !== void 0 && actions.length)), _rollupPluginBabelHelpers.defineProperty(_cx4, "".concat(blockClass, "__inner-content-with-actions"), actions && actions.length), _cx4))
  }, animateTitle && renderHeader(), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__body-content")
  }, children), /*#__PURE__*/React__default["default"].createElement(ActionSet.ActionSet, {
    actions: actions,
    className: primaryActionContainerClassNames,
    size: size === 'xs' ? 'sm' : size
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    ref: endTrapRef,
    tabIndex: "0",
    role: "link",
    className: "".concat(blockClass, "__visually-hidden")
  }, "Focus sentinel")), includeOverlay && /*#__PURE__*/React__default["default"].createElement("div", {
    ref: sidePanelOverlayRef,
    className: "".concat(blockClass, "__overlay"),
    style: {
      animation: !reducedMotion.matches ? "".concat(open ? "side-panel-overlay-entrance ".concat(motion.moderate02) : "side-panel-overlay-exit ".concat(motion.moderate02)) : null
    }
  }));
}); // Return a placeholder if not released and not enabled by feature flag

exports.SidePanel = settings.pkg.checkComponentEnabled(exports.SidePanel, componentName);
exports.SidePanel.propTypes = {
  /**
   * Sets the action toolbar buttons
   */
  actionToolbarButtons: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string,
    leading: PropTypes__default["default"].bool,
    icon: PropTypes__default["default"].oneOfType([PropTypes__default["default"].object, PropTypes__default["default"].func]),
    onClick: PropTypes__default["default"].func,
    kind: PropTypes__default["default"].oneOf(['ghost', 'tertiary', 'secondary', 'primary'])
  })),

  /**
   * The primary actions to be shown in the side panel. Each action is
   * specified as an object with optional fields: 'label' to supply the button
   * label, 'kind' to select the button kind (must be 'primary', 'secondary' or
   * 'ghost'), 'loading' to display a loading indicator, and 'onClick' to
   * receive notifications when the button is clicked. Additional fields in the
   * object will be passed to the Button component, and these can include
   * 'disabled', 'ref', 'className', and any other Button props. Any other
   * fields in the object will be passed through to the button element as HTML
   * attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: propsHelper.allPropTypes([ActionSet.ActionSet.validateActions(), PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, react.Button.propTypes), {}, {
    kind: PropTypes__default["default"].oneOf(['ghost', 'danger--ghost', 'secondary', 'danger', 'primary']),
    label: PropTypes__default["default"].string,
    loading: PropTypes__default["default"].bool,
    // we duplicate this Button prop to improve the DocGen here
    onClick: react.Button.propTypes.onClick
  })))]),

  /**
   * Determines if the title will animate on scroll
   */
  animateTitle: PropTypes__default["default"].bool,

  /**
   * Sets the body content of the side panel
   */
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]).isRequired,

  /**
   * Sets an optional className to be added to the side panel outermost element
   */
  className: PropTypes__default["default"].string,

  /**
   * Sets the close button icon description
   */
  closeIconDescription: PropTypes__default["default"].string,

  /**
   * Determines whether the side panel should render the condensed version (affects action buttons primarily)
   */
  condensedActions: PropTypes__default["default"].bool,

  /**
   * Sets the current step of the side panel
   */
  currentStep: PropTypes__default["default"].number,

  /**
   * Determines whether the side panel should render with an overlay
   */
  includeOverlay: PropTypes__default["default"].bool,

  /**
   * Sets the label text which will display above the title text
   */
  labelText: PropTypes__default["default"].string,

  /**
   * Sets the icon description for the navigation back icon button
   */
  navigationBackIconDescription: PropTypes__default["default"].string,

  /**
   * Changes the current side panel page to the previous page
   */
  onNavigationBack: PropTypes__default["default"].func,

  /**
   * Specify a handler for closing the side panel.
   * This handler closes the modal, e.g. changing `open` prop.
   */
  onRequestClose: PropTypes__default["default"].func,

  /**
   * Optional function called when the side panel exit animation is complete.
   * This handler can be used for any state cleanup needed before the panel is removed from the DOM.
   */
  onUnmount: PropTypes__default["default"].func,

  /**
   * Determines whether the side panel should render or not
   */
  open: PropTypes__default["default"].bool.isRequired,

  /**
   * Determines if the side panel is on the right or left
   */
  placement: PropTypes__default["default"].oneOf(['left', 'right']),

  /**
   * Prevent closing on click outside of the panel
   */
  preventCloseOnClickOutside: PropTypes__default["default"].bool,

  /**
   * This is the selector to the element that contains all of the page content that will shrink if the panel is a slide in.
   * This prop is required when using the `slideIn` variant of the side panel.
   */
  selectorPageContent: PropTypes__default["default"].string.isRequired.if(function (_ref7) {
    var slideIn = _ref7.slideIn;
    return slideIn;
  }),

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the side panel opens
   */
  selectorPrimaryFocus: PropTypes__default["default"].string,

  /**
   * Sets the size of the side panel
   */
  size: PropTypes__default["default"].oneOf(['xs', 'sm', 'md', 'lg', '2xl']),

  /**
   * Determines if this panel slides in
   */
  slideIn: PropTypes__default["default"].bool,

  /**
   * Sets the subtitle text
   */
  subtitle: PropTypes__default["default"].node,

  /**
   * Sets the title text
   */
  title: PropTypes__default["default"].string.isRequired.if(function (_ref8) {
    var labelText = _ref8.labelText;
    return labelText;
  })
};
exports.SidePanel.displayName = componentName;
