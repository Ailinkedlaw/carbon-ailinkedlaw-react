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
var PropTypes = require('prop-types');
var cx = require('classnames');
var TagSetOverflow = require('./TagSetOverflow.js');
var TagSetModal = require('./TagSetModal.js');
var react = require('@carbon/react');
var reactResizeDetector = require('react-resize-detector');
var devtools = require('../../global/js/utils/devtools.js');
var propsHelper = require('../../global/js/utils/props-helper.js');
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["align", "allTagsModalTarget", "className", "maxVisible", "multiline", "overflowAlign", "overflowClassName", "allTagsModalTitle", "allTagsModalSearchLabel", "allTagsModalSearchPlaceholderText", "showAllTagsLabel", "tags"],
    _excluded2 = ["label", "id"],
    _excluded3 = ["label"];
var componentName = 'TagSet';
var blockClass = "".concat(settings.pkg.prefix, "--tag-set");
var allTagsModalSearchThreshold = 10; // Default values for props

var defaults = {
  align: 'start',
  // allTagsModalTarget: document.body,
  overflowAlign: 'bottom'
};
exports.TagSet = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
  var _ref$align = _ref.align,
      align = _ref$align === void 0 ? defaults.align : _ref$align,
      allTagsModalTargetIn = _ref.allTagsModalTarget,
      className = _ref.className,
      maxVisible = _ref.maxVisible,
      multiline = _ref.multiline,
      _ref$overflowAlign = _ref.overflowAlign,
      overflowAlign = _ref$overflowAlign === void 0 ? defaults.overflowAlign : _ref$overflowAlign,
      overflowClassName = _ref.overflowClassName,
      allTagsModalTitle = _ref.allTagsModalTitle,
      allTagsModalSearchLabel = _ref.allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText = _ref.allTagsModalSearchPlaceholderText,
      showAllTagsLabel = _ref.showAllTagsLabel,
      tags = _ref.tags,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState(3),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      displayCount = _useState2[0],
      setDisplayCount = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      displayedTags = _useState4[0],
      setDisplayedTags = _useState4[1];

  var _useState5 = React.useState([]),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      hiddenSizingTags = _useState6[0],
      setHiddenSizingTags = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _rollupPluginBabelHelpers.slicedToArray(_useState7, 2),
      showAllModalOpen = _useState8[0],
      setShowAllModalOpen = _useState8[1];

  var localTagSetRef = React.useRef(null);
  var tagSetRef = ref || localTagSetRef;
  var sizingContainerRef = React.useRef();
  var displayedArea = React.useRef(null);

  var _useState9 = React.useState([]),
      _useState10 = _rollupPluginBabelHelpers.slicedToArray(_useState9, 2),
      sizingTags = _useState10[0],
      setSizingTags = _useState10[1];

  var overflowTag = React.useRef(null);

  var _useState11 = React.useState(null),
      _useState12 = _rollupPluginBabelHelpers.slicedToArray(_useState11, 2),
      allTagsModalTarget = _useState12[0],
      setAllTagsModalTarget = _useState12[1];

  var handleShowAllClick = function handleShowAllClick() {
    setShowAllModalOpen(true);
  };

  React.useEffect(function () {
    if (allTagsModalTargetIn) {
      setAllTagsModalTarget(allTagsModalTargetIn);
    } else {
      if (settings.pkg.isFeatureEnabled('default-portal-target-body')) {
        setAllTagsModalTarget(document.body);
      }
    }
  }, [allTagsModalTargetIn]);
  React.useEffect(function () {
    var newSizingTags = []; // create sizing tags

    setHiddenSizingTags(tags && tags.length > 0 ? tags.map(function (_ref2, index) {
      var label = _ref2.label,
          id = _ref2.id,
          other = _rollupPluginBabelHelpers.objectWithoutProperties(_ref2, _excluded2);

      return /*#__PURE__*/React__default["default"].createElement("div", {
        key: index,
        className: "".concat(blockClass, "__sizing-tag"),
        ref: function ref(el) {
          return newSizingTags[index] = el;
        }
      }, /*#__PURE__*/React__default["default"].createElement(react.Tag, _rollupPluginBabelHelpers["extends"]({}, other, {
        // ensure id is not duplicated
        "data-original-id": id,
        filter: false
      }), label));
    }) : []);
    setSizingTags(newSizingTags);
  }, [tags]);
  React.useEffect(function () {
    // create visible and overflow tags
    var newDisplayedTags = tags && tags.length > 0 ? tags.map(function (_ref3, index) {
      var label = _ref3.label,
          other = _rollupPluginBabelHelpers.objectWithoutProperties(_ref3, _excluded3);

      return /*#__PURE__*/React__default["default"].createElement(react.Tag, _rollupPluginBabelHelpers["extends"]({}, other, {
        filter: false,
        key: "displayed-tag-".concat(index)
      }), label);
    }) : []; // separate out tags for the overflow

    var newOverflowTags = newDisplayedTags.splice(displayCount, newDisplayedTags.length - displayCount); // add wrapper around displayed tags

    newDisplayedTags = newDisplayedTags.map(function (tag, index) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        key: index,
        className: "".concat(blockClass, "__displayed-tag")
      }, tag);
    });
    newDisplayedTags.push( /*#__PURE__*/React__default["default"].createElement(TagSetOverflow.TagSetOverflow, {
      allTagsModalSearchThreshold: allTagsModalSearchThreshold,
      className: overflowClassName,
      onShowAllClick: handleShowAllClick,
      overflowTags: newOverflowTags,
      overflowAlign: overflowAlign,
      showAllTagsLabel: showAllTagsLabel,
      key: "displayed-tag-overflow",
      ref: overflowTag
    }));
    setDisplayedTags(newDisplayedTags);
  }, [displayCount, overflowAlign, overflowClassName, showAllTagsLabel, tags]);
  var checkFullyVisibleTags = React.useCallback(function () {
    if (multiline) {
      return setDisplayCount(maxVisible);
    } // how many will fit?


    var willFit = 0;

    if (sizingTags.length > 0) {
      var spaceAvailable = tagSetRef.current.offsetWidth;

      for (var i in sizingTags) {
        var tagWidth = sizingTags[i].offsetWidth;

        if (spaceAvailable >= tagWidth) {
          spaceAvailable -= tagWidth;
          willFit += 1;
        } else {
          break;
        }
      }

      if (willFit < sizingTags.length) {
        while (willFit > 0 && spaceAvailable < overflowTag.current.offsetWidth) {
          // Highly unlikely any useful tag is smaller
          willFit -= 1; // remove one tag

          spaceAvailable += sizingTags[willFit].offsetWidth;
        }
      }
    }

    if (willFit < 1) {
      setDisplayCount(0);
    } else {
      setDisplayCount(maxVisible ? Math.min(willFit, maxVisible) : willFit);
    }
  }, [maxVisible, multiline, sizingTags, tagSetRef]);
  React.useEffect(function () {
    checkFullyVisibleTags();
  }, [checkFullyVisibleTags, maxVisible, multiline, sizingTags]);
  /* don't know how to test resize */

  /* istanbul ignore next */

  var handleResize = function handleResize() {
    /* istanbul ignore next */
    // not sure how to test resize
    checkFullyVisibleTags();
  };
  /* don't know how to test resize */

  /* istanbul ignore next */


  var handleSizerTagsResize = function handleSizerTagsResize() {
    /* istanbul ignore next */
    // not sure how to test resize
    checkFullyVisibleTags();
  };

  var handleModalClose = function handleModalClose() {
    setShowAllModalOpen(false);
  };

  reactResizeDetector.useResizeDetector({
    onResize: handleSizerTagsResize,
    targetRef: sizingContainerRef
  });
  reactResizeDetector.useResizeDetector({
    onResize: handleResize,
    targetRef: tagSetRef
  });
  return /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({}, rest, {
    className: cx__default["default"]([blockClass, className]),
    ref: tagSetRef
  }, devtools.getDevtoolsProps(componentName)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"](["".concat(blockClass, "__space"), "".concat(blockClass, "__space--align-").concat(align)])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__tag-container ").concat(blockClass, "__tag-container--hidden"),
    "aria-hidden": true,
    ref: sizingContainerRef
  }, hiddenSizingTags), /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"](["".concat(blockClass, "__tag-container"), multiline && "".concat(blockClass, "__tag-container--multiline")]),
    ref: displayedArea
  }, displayedTags)), (allTagsModalTarget ? reactDom.createPortal : function (children) {
    return children;
  })( /*#__PURE__*/React__default["default"].createElement(TagSetModal.TagSetModal, {
    allTags: tags,
    open: showAllModalOpen,
    title: allTagsModalTitle,
    onClose: handleModalClose,
    searchLabel: allTagsModalSearchLabel,
    searchPlaceholder: allTagsModalSearchPlaceholderText
  }), allTagsModalTarget));
}); // Return a placeholder if not released and not enabled by feature flag

exports.TagSet = settings.pkg.checkComponentEnabled(exports.TagSet, componentName);
/**
 * The strings shown in the showAllModal are only shown if we have more than allTagsModalSearchLThreshold
 * @returns null if no problems
 */

var string_required_if_more_than_10_tags = propsHelper.isRequiredIf(PropTypes__default["default"].string, function (_ref4) {
  var tags = _ref4.tags;
  return tags && tags.length > allTagsModalSearchThreshold;
}); // copied from carbon-components-react/src/components/Tag/Tag.js for DocGen

var TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  'high-contrast': 'High-Contrast',
  outline: 'Outline'
};
var tagTypes = Object.keys(TYPES);
exports.TagSet.types = tagTypes;
exports.TagSet.propTypes = {
  /**
   * align the Tags displayed by the TagSet. Default start.
   */
  align: PropTypes__default["default"].oneOf(['start', 'center', 'end']),

  /**
   * label text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel: string_required_if_more_than_10_tags,

  /**
   * placeholder text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText: string_required_if_more_than_10_tags,

  /**
   * portal target for the all tags modal
   */
  allTagsModalTarget: PropTypes__default["default"].node,

  /**
   * title for the show all modal. **Note: Required if more than 10 tags**
   */
  allTagsModalTitle: string_required_if_more_than_10_tags,

  /**
   * className
   */
  className: PropTypes__default["default"].string,

  /**
   * maximum visible tags
   */
  maxVisible: PropTypes__default["default"].number,

  /**
   * display tags in multiple lines
   */
  multiline: PropTypes__default["default"].bool,

  /**
   * overflowAlign from the standard tooltip. Default center.
   */
  overflowAlign: PropTypes__default["default"].oneOf(['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top']),

  /**
   * overflowClassName for the tooltip popup
   */
  overflowClassName: PropTypes__default["default"].string,

  /**
   * label for the overflow show all tags link.
   *
   * **Note:** Required if more than 10 tags
   */
  showAllTagsLabel: string_required_if_more_than_10_tags,

  /**
   * The tags to be shown in the TagSet. Each tag is specified as an object
   * with properties: **label**\* (required) to supply the tag content, and
   * other properties will be passed to the Carbon Tag component, such as
   * **type**, **disabled**, **ref**, **className** , and any other Tag props.
   * NOTE: **filter** is not supported. Any other fields in the object will be passed through to the HTML element
   * as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  tags: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, propsHelper.prepareProps(react.Tag.propTypes, 'filter')), {}, {
    label: PropTypes__default["default"].string.isRequired,
    // we duplicate this prop to improve the DocGen
    type: PropTypes__default["default"].oneOf(tagTypes)
  })))
};
exports.TagSet.displayName = componentName;

exports.string_required_if_more_than_10_tags = string_required_if_more_than_10_tags;
