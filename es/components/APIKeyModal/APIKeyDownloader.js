/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { slicedToArray as _slicedToArray, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { pkg } from '../../settings.js';

var componentName = 'APIKeyDownloader';
var APIKeyDownloader = function APIKeyDownloader(_ref) {
  var apiKey = _ref.apiKey,
      body = _ref.body,
      fileName = _ref.fileName,
      fileType = _ref.fileType,
      linkText = _ref.linkText;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      linkProps = _useState2[0],
      setLinkProps = _useState2[1];

  useEffect(function () {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(pkg.prefix, "--apikey-modal__download-container")
  }, /*#__PURE__*/React.createElement("p", {
    className: "".concat(pkg.prefix, "--apikey-modal__messaging-text")
  }, body, ' ', /*#__PURE__*/React.createElement("a", _extends({}, linkProps, {
    className: "".concat(pkg.prefix, "--apikey-modal__download-link")
  }), linkText)));
};
APIKeyDownloader.displayName = componentName;
APIKeyDownloader.propTypes = {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey: PropTypes.string.isRequired,

  /**
   * body content for the downloader
   */
  body: PropTypes.string.isRequired,

  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  fileName: PropTypes.string.isRequired,

  /**
   * designates the file type for the downloadable key
   */
  fileType: PropTypes.oneOf(['txt', 'json']).isRequired,

  /**
   * anchor text for the download link
   */
  linkText: PropTypes.string.isRequired
};

export { APIKeyDownloader };
