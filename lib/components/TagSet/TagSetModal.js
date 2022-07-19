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
var react = require('@carbon/react');
var settings = require('../../settings.js');
var propsHelper = require('../../global/js/utils/props-helper.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["allTags", "className", "title", "onClose", "open", "searchLabel", "searchPlaceholder"],
    _excluded2 = ["label"];
var componentName = 'TagSetModal';
var blockClass = "".concat(settings.pkg.prefix, "--tag-set-modal"); // Default values for props

var defaults = {
  // marked as required by TagSet if needed, default used to satisfy <Search /> component
  searchLabel: ''
};
var TagSetModal = function TagSetModal(_ref) {
  var allTags = _ref.allTags,
      className = _ref.className,
      title = _ref.title,
      onClose = _ref.onClose,
      open = _ref.open,
      _ref$searchLabel = _ref.searchLabel,
      searchLabel = _ref$searchLabel === void 0 ? defaults.searchLabel : _ref$searchLabel,
      searchPlaceholder = _ref.searchPlaceholder,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState([]),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      filteredModalTags = _useState2[0],
      setFilteredModalTags = _useState2[1];

  var _useState3 = React.useState(''),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      search = _useState4[0],
      setSearch = _useState4[1];

  React.useEffect(function () {
    var newFilteredModalTags = [];

    if (open) {
      if (search === '') {
        newFilteredModalTags = allTags.slice(0);
      } else {
        var lCaseSearch = search.toLocaleLowerCase();
        allTags.forEach(function (tag) {
          var _tag$dataSearch, _tag$dataSearch$toLoc, _tag$label, _tag$label$toLocaleLo;

          var dataSearch = (_tag$dataSearch = tag['data-search']) === null || _tag$dataSearch === void 0 ? void 0 : (_tag$dataSearch$toLoc = _tag$dataSearch.toLocaleLowerCase()) === null || _tag$dataSearch$toLoc === void 0 ? void 0 : _tag$dataSearch$toLoc.indexOf(lCaseSearch);
          var labelSearch = (_tag$label = tag.label) === null || _tag$label === void 0 ? void 0 : (_tag$label$toLocaleLo = _tag$label.toLocaleLowerCase()) === null || _tag$label$toLocaleLo === void 0 ? void 0 : _tag$label$toLocaleLo.indexOf(lCaseSearch);

          if (dataSearch > -1 || labelSearch > -1) {
            newFilteredModalTags.push(tag);
          }
        });
      }
    }

    setFilteredModalTags(newFilteredModalTags);
  }, [allTags, open, search]);

  var handleSearch = function handleSearch(ev) {
    setSearch(ev.target.value || '');
  };

  return /*#__PURE__*/React__default["default"].createElement(react.ComposedModal, _rollupPluginBabelHelpers["extends"]({}, rest, {
    containerClassName: "".concat(blockClass, "__container"),
    className: cx__default["default"](className, "".concat(blockClass)),
    size: "sm",
    open: open,
    onClose: onClose
  }), /*#__PURE__*/React__default["default"].createElement(react.ModalHeader, {
    className: "".concat(blockClass, "__header"),
    closeModal: onClose,
    title: title
  }, /*#__PURE__*/React__default["default"].createElement(react.Search, {
    "data-modal-primary-focus": true,
    className: "".concat(blockClass, "__search"),
    labelText: searchLabel,
    placeholder: searchPlaceholder,
    onChange: handleSearch,
    size: "lg"
  })), /*#__PURE__*/React__default["default"].createElement(react.ModalBody, {
    className: "".concat(blockClass, "__body"),
    hasForm: true
  }, filteredModalTags.map(function (_ref2, index) {
    var label = _ref2.label,
        other = _rollupPluginBabelHelpers.objectWithoutProperties(_ref2, _excluded2);

    return /*#__PURE__*/React__default["default"].createElement(react.Tag, _rollupPluginBabelHelpers["extends"]({}, other, {
      filter: false,
      key: "all-tags-".concat(index)
    }), label);
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__fade")
  }));
};
TagSetModal.propTypes = {
  allTags: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, propsHelper.prepareProps(react.Tag.propTypes, 'filter')), {}, {
    label: PropTypes__default["default"].string.isRequired
  }))),
  className: PropTypes__default["default"].string,
  onClose: PropTypes__default["default"].func,
  open: PropTypes__default["default"].bool,
  searchLabel: PropTypes__default["default"].string,
  searchPlaceholder: PropTypes__default["default"].string,
  title: PropTypes__default["default"].string
};
TagSetModal.displayName = componentName;

exports.TagSetModal = TagSetModal;
