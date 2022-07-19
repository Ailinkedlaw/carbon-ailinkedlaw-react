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
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var componentName = 'APIKeyDownloader';
var APIKeyDownloader = function APIKeyDownloader(_ref) {
  var apiKey = _ref.apiKey,
      body = _ref.body,
      fileName = _ref.fileName,
      fileType = _ref.fileType,
      linkText = _ref.linkText;

  var _useState = React.useState({}),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      linkProps = _useState2[0],
      setLinkProps = _useState2[1];

  React.useEffect(function () {
    var generateLinkProps = function generateLinkProps() {
      var data = fileType === 'txt' ? apiKey : JSON.stringify({
        apiKey: apiKey
      });
      var blob = new Blob([data], {
        type: fileType === 'txt' ? 'text/plain' : 'application/json'
      });
      var href = URL.createObjectURL(blob);
      var download = "".concat(fileName || 'apikey', ".").concat(fileType);
      var props = {
        href: href,
        download: download
      };
      setLinkProps(props);
    };

    generateLinkProps();
  }, [apiKey, fileName, fileType]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(settings.pkg.prefix, "--apikey-modal__download-container")
  }, /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(settings.pkg.prefix, "--apikey-modal__messaging-text")
  }, body, ' ', /*#__PURE__*/React__default["default"].createElement("a", _rollupPluginBabelHelpers["extends"]({}, linkProps, {
    className: "".concat(settings.pkg.prefix, "--apikey-modal__download-link")
  }), linkText)));
};
APIKeyDownloader.displayName = componentName;
APIKeyDownloader.propTypes = {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey: PropTypes__default["default"].string.isRequired,

  /**
   * body content for the downloader
   */
  body: PropTypes__default["default"].string.isRequired,

  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  fileName: PropTypes__default["default"].string.isRequired,

  /**
   * designates the file type for the downloadable key
   */
  fileType: PropTypes__default["default"].oneOf(['txt', 'json']).isRequired,

  /**
   * anchor text for the download link
   */
  linkText: PropTypes__default["default"].string.isRequired
};

exports.APIKeyDownloader = APIKeyDownloader;
