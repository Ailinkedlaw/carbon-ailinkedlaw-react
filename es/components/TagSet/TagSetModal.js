/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ComposedModal, ModalHeader, Search, ModalBody, Tag } from '@carbon/react';
import { pkg } from '../../settings.js';
import { prepareProps } from '../../global/js/utils/props-helper.js';

var _excluded = ["allTags", "className", "title", "onClose", "open", "searchLabel", "searchPlaceholder"],
    _excluded2 = ["label"];
var componentName = 'TagSetModal';
var blockClass = "".concat(pkg.prefix, "--tag-set-modal"); // Default values for props

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
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      filteredModalTags = _useState2[0],
      setFilteredModalTags = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      search = _useState4[0],
      setSearch = _useState4[1];

  useEffect(function () {
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

  return /*#__PURE__*/React.createElement(ComposedModal, _extends({}, rest, {
    containerClassName: "".concat(blockClass, "__container"),
    className: cx(className, "".concat(blockClass)),
    size: "sm",
    open: open,
    onClose: onClose
  }), /*#__PURE__*/React.createElement(ModalHeader, {
    className: "".concat(blockClass, "__header"),
    closeModal: onClose,
    title: title
  }, /*#__PURE__*/React.createElement(Search, {
    "data-modal-primary-focus": true,
    className: "".concat(blockClass, "__search"),
    labelText: searchLabel,
    placeholder: searchPlaceholder,
    onChange: handleSearch,
    size: "lg"
  })), /*#__PURE__*/React.createElement(ModalBody, {
    className: "".concat(blockClass, "__body"),
    hasForm: true
  }, filteredModalTags.map(function (_ref2, index) {
    var label = _ref2.label,
        other = _objectWithoutProperties(_ref2, _excluded2);

    return /*#__PURE__*/React.createElement(Tag, _extends({}, other, {
      filter: false,
      key: "all-tags-".concat(index)
    }), label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__fade")
  }));
};
TagSetModal.propTypes = {
  allTags: PropTypes.arrayOf(PropTypes.shape(_objectSpread2(_objectSpread2({}, prepareProps(Tag.propTypes, 'filter')), {}, {
    label: PropTypes.string.isRequired
  }))),
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  searchLabel: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  title: PropTypes.string
};
TagSetModal.displayName = componentName;

export { TagSetModal };
