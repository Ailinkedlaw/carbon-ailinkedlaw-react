/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, objectSpread2 as _objectSpread2, asyncToGenerator as _asyncToGenerator, regeneratorRuntime as _regeneratorRuntime } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ComposedModal, ModalHeader, ModalBody, PasswordInput, TextInput, Form, InlineLoading, ModalFooter, Button } from '@carbon/react';
import { ErrorFilled, InformationFilled, Copy } from '@carbon/icons-react';
import { APIKeyDownloader } from './APIKeyDownloader.js';
import { pkg } from '../../settings.js';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { isRequiredIf } from '../../global/js/utils/props-helper.js';
import uuidv4 from '../../global/js/utils/uuidv4.js';

var _ErrorFilled, _InformationFilled;

var _excluded = ["apiKey", "apiKeyLabel", "apiKeyName", "body", "className", "closeButtonText", "copyButtonText", "copyErrorText", "copyIconDescription", "customSteps", "downloadBodyText", "downloadFileName", "downloadFileType", "downloadLinkText", "editButtonText", "editSuccess", "editSuccessTitle", "editing", "error", "errorText", "generateButtonText", "generateSuccessBody", "generateSuccessTitle", "generateTitle", "hasAPIKeyVisibilityToggle", "hasDownloadLink", "hideAPIKeyLabel", "loading", "loadingText", "modalLabel", "nameHelperText", "nameLabel", "namePlaceholder", "nameRequired", "nextStepButtonText", "onClose", "onCopy", "onRequestEdit", "onRequestGenerate", "open", "previousStepButtonText", "showAPIKeyLabel"];
var componentName = 'APIKeyModal'; // Default values for props

var defaults = {
  apiKeyName: '',
  customSteps: Object.freeze([])
};
var APIKeyModal = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var apiKey = _ref.apiKey,
      apiKeyLabel = _ref.apiKeyLabel,
      _ref$apiKeyName = _ref.apiKeyName,
      apiKeyName = _ref$apiKeyName === void 0 ? defaults.apiKeyName : _ref$apiKeyName,
      body = _ref.body,
      className = _ref.className,
      closeButtonText = _ref.closeButtonText,
      copyButtonText = _ref.copyButtonText,
      copyErrorText = _ref.copyErrorText,
      copyIconDescription = _ref.copyIconDescription,
      _ref$customSteps = _ref.customSteps,
      customSteps = _ref$customSteps === void 0 ? defaults.customSteps : _ref$customSteps,
      downloadBodyText = _ref.downloadBodyText,
      downloadFileName = _ref.downloadFileName,
      downloadFileType = _ref.downloadFileType,
      downloadLinkText = _ref.downloadLinkText,
      editButtonText = _ref.editButtonText,
      editSuccess = _ref.editSuccess,
      editSuccessTitle = _ref.editSuccessTitle,
      editing = _ref.editing,
      error = _ref.error,
      errorText = _ref.errorText,
      generateButtonText = _ref.generateButtonText,
      generateSuccessBody = _ref.generateSuccessBody,
      generateSuccessTitle = _ref.generateSuccessTitle,
      generateTitle = _ref.generateTitle,
      hasAPIKeyVisibilityToggle = _ref.hasAPIKeyVisibilityToggle,
      hasDownloadLink = _ref.hasDownloadLink,
      hideAPIKeyLabel = _ref.hideAPIKeyLabel,
      loading = _ref.loading,
      loadingText = _ref.loadingText,
      modalLabel = _ref.modalLabel,
      nameHelperText = _ref.nameHelperText,
      nameLabel = _ref.nameLabel,
      namePlaceholder = _ref.namePlaceholder,
      nameRequired = _ref.nameRequired,
      nextStepButtonText = _ref.nextStepButtonText,
      onClose = _ref.onClose,
      onCopy = _ref.onCopy,
      onRequestEdit = _ref.onRequestEdit,
      onRequestGenerate = _ref.onRequestGenerate,
      open = _ref.open,
      previousStepButtonText = _ref.previousStepButtonText,
      showAPIKeyLabel = _ref.showAPIKeyLabel,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      copyError = _useState2[0],
      setCopyError = _useState2[1];

  var _useState3 = useState(apiKeyName),
      _useState4 = _slicedToArray(_useState3, 2),
      name = _useState4[0],
      setName = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      currentStep = _useState6[0],
      setCurrentStep = _useState6[1];

  var copyRef = useRef();
  var apiKeyInputId = useRef(uuidv4());
  var nameInputId = useRef(uuidv4());
  var hasSteps = Boolean(customSteps.length);
  var apiKeyLoaded = apiKey && !loading;
  var hasNextStep = hasSteps && currentStep < customSteps.length - 1;
  var hasPreviousStep = hasSteps && currentStep !== 0;
  var copyButtonProps = {
    renderIcon: function renderIcon(props) {
      return /*#__PURE__*/React.createElement(Copy, _extends({
        size: 16
      }, props));
    },
    iconDescription: copyIconDescription,
    ref: copyRef
  };
  var blockClass = "".concat(pkg.prefix, "--apikey-modal");
  useEffect(function () {
    if (copyRef.current && open && apiKeyLoaded) {
      copyRef.current.focus();
    }
  }, [open, apiKeyLoaded]);

  var isPrimaryButtonDisabled = function isPrimaryButtonDisabled() {
    if (loading) {
      return true;
    }

    if (hasSteps && 'valid' in customSteps[currentStep]) {
      return !customSteps[currentStep].valid;
    }

    if (!hasSteps && nameRequired && !name) {
      return true;
    }

    return false;
  };

  var getPrimaryButtonText = function getPrimaryButtonText() {
    if (hasNextStep) {
      return nextStepButtonText;
    }

    if (apiKeyLoaded) {
      return copyButtonText;
    }

    if (editing) {
      return editButtonText;
    }

    return generateButtonText;
  };

  var getSecondaryButtonText = function getSecondaryButtonText() {
    if (hasPreviousStep && !apiKeyLoaded) {
      return previousStepButtonText;
    }

    return closeButtonText;
  };

  var getTitle = function getTitle() {
    if (editing && editSuccess) {
      return editSuccessTitle;
    }

    if (apiKeyLoaded) {
      return generateSuccessTitle;
    }

    if (hasSteps) {
      return customSteps[currentStep].title;
    }

    return generateTitle;
  };

  var setNameHandler = function setNameHandler(evt) {
    setName(evt.target.value);
  };

  var onCloseHandler = function onCloseHandler() {
    setName('');
    setCurrentStep(0);
    onClose();
  };

  var submitHandler = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();

              if (!hasNextStep) {
                _context.next = 5;
                break;
              }

              setCurrentStep(currentStep + 1);
              _context.next = 22;
              break;

            case 5:
              if (!apiKeyLoaded) {
                _context.next = 21;
                break;
              }

              if (!onCopy) {
                _context.next = 10;
                break;
              }

              onCopy(apiKey);
              _context.next = 19;
              break;

            case 10:
              _context.prev = 10;
              _context.next = 13;
              return navigator.clipboard.writeText(apiKey);

            case 13:
              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](10);
              console.error(_context.t0);
              setCopyError(true);

            case 19:
              _context.next = 22;
              break;

            case 21:
              if (editing) {
                onRequestEdit(name);
              } else {
                onRequestGenerate(name);
              }

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 15]]);
    }));

    return function submitHandler(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var onBackHandler = function onBackHandler() {
    if (hasPreviousStep && !apiKeyLoaded) {
      setCurrentStep(currentStep - 1);
    } else {
      onCloseHandler();
    }
  };

  return /*#__PURE__*/React.createElement(ComposedModal, _extends({}, rest, _objectSpread2({
    open: open,
    ref: ref
  }, getDevtoolsProps(componentName)), {
    className: cx(className, blockClass),
    onClose: onCloseHandler,
    size: "sm",
    "aria-label": modalLabel,
    preventCloseOnClickOutside: true
  }), /*#__PURE__*/React.createElement(ModalHeader, {
    className: "".concat(blockClass, "__header"),
    title: getTitle(),
    label: modalLabel
  }), /*#__PURE__*/React.createElement(ModalBody, {
    className: "".concat(blockClass, "__body-container")
  }, hasSteps && !apiKeyLoaded ? customSteps[currentStep].content : /*#__PURE__*/React.createElement(React.Fragment, null, body && /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__body")
  }, body), !editing && apiKey && hasAPIKeyVisibilityToggle && /*#__PURE__*/React.createElement(PasswordInput, {
    value: apiKey,
    labelText: apiKeyLabel,
    id: apiKeyInputId.current,
    showPasswordLabel: showAPIKeyLabel,
    hidePasswordLabel: hideAPIKeyLabel,
    tooltipPosition: "left"
  }), !editing && apiKey && !hasAPIKeyVisibilityToggle && /*#__PURE__*/React.createElement(TextInput, {
    value: apiKey,
    labelText: apiKeyLabel,
    id: apiKeyInputId.current
  }), (editing || !apiKeyLoaded && nameRequired) && /*#__PURE__*/React.createElement(Form, {
    onSubmit: submitHandler
  }, /*#__PURE__*/React.createElement(TextInput, {
    helperText: nameHelperText,
    placeholder: namePlaceholder,
    labelText: nameLabel,
    onChange: setNameHandler,
    value: name,
    id: nameInputId.current,
    disabled: loading,
    required: nameRequired,
    "data-modal-primary-focus": true
  })), loading && /*#__PURE__*/React.createElement(InlineLoading, {
    description: loadingText,
    className: "".concat(blockClass, "__loader")
  }), (copyError || error) && /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__messaging")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__error-icon")
  }, _ErrorFilled || (_ErrorFilled = /*#__PURE__*/React.createElement(ErrorFilled, {
    size: 16
  }))), /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "__messaging-text")
  }, copyError ? copyErrorText : errorText)), apiKeyLoaded && /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__messaging")
  }, _InformationFilled || (_InformationFilled = /*#__PURE__*/React.createElement(InformationFilled, {
    size: 16
  })), hasDownloadLink ? /*#__PURE__*/React.createElement(APIKeyDownloader, {
    apiKey: apiKey,
    body: downloadBodyText,
    fileName: downloadFileName,
    linkText: downloadLinkText,
    fileType: downloadFileType
  }) : /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__messaging-text")
  }, generateSuccessBody)))), /*#__PURE__*/React.createElement(ModalFooter, {
    className: "".concat(blockClass, "__footer")
  }, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    kind: "secondary",
    onClick: onBackHandler
  }, getSecondaryButtonText()), /*#__PURE__*/React.createElement(Button, _extends({}, apiKeyLoaded ? copyButtonProps : {}, {
    type: "submit",
    kind: "primary",
    onClick: submitHandler,
    disabled: isPrimaryButtonDisabled()
  }), getPrimaryButtonText())));
});

var customStepsRequiredProps = function customStepsRequiredProps(type) {
  return isRequiredIf(type, function (_ref3) {
    var customSteps = _ref3.customSteps;
    return customSteps && customSteps.length > 1;
  });
};

var editRequiredProps = function editRequiredProps(type) {
  return isRequiredIf(type, function (_ref4) {
    var editing = _ref4.editing;
    return editing;
  });
};

var downloadRequiredProps = function downloadRequiredProps(type) {
  return isRequiredIf(type, function (_ref5) {
    var hasDownloadLink = _ref5.hasDownloadLink;
    return hasDownloadLink;
  });
}; // Return a placeholder if not released and not enabled by feature flag


APIKeyModal = pkg.checkComponentEnabled(APIKeyModal, componentName);
APIKeyModal.propTypes = {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey: PropTypes.string,

  /**
   * label for the text input that holds the api key.
   */
  apiKeyLabel: PropTypes.string,

  /**
   * the name of the api key. should only be supplied in edit mode.
   */
  apiKeyName: PropTypes.string,

  /**
   * body content for the modal
   */
  body: PropTypes.string,

  /**
   * optional class name
   */
  className: PropTypes.string,

  /**
   * text for the close button
   */
  closeButtonText: PropTypes.string,

  /**
   * text for the copy button
   */
  copyButtonText: PropTypes.string,

  /**
   * Error message for when the copy function fails
   */
  copyErrorText: PropTypes.string,

  /**
   * text description for the copy button icon
   */
  copyIconDescription: PropTypes.string,

  /**
   * if you need more options for key creation beyond just the name use custom steps to obtain whatever data is required.
   */
  customSteps: PropTypes.arrayOf(PropTypes.shape({
    /**
     * designates if the step has passed whatever validation rules are in place.
     */
    valid: PropTypes.bool,

    /**
     * designates content is the JSX that holds whatever inputs you need
     */
    content: PropTypes.node,

    /**
     * designates the title that's displayed at the top of the modal for each step
     */
    title: PropTypes.string
  })),

  /**
   * the content that appears that indicates the key is downloadable
   */
  downloadBodyText: downloadRequiredProps(PropTypes.string),

  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  downloadFileName: downloadRequiredProps(PropTypes.string),

  /**
   * designates the file type for the downloadable key
   */
  downloadFileType: downloadRequiredProps(PropTypes.oneOf(['txt', 'json'])),

  /**
   * anchor text for the download link
   */
  downloadLinkText: downloadRequiredProps(PropTypes.string),

  /**
   * text for the edit button
   */
  editButtonText: editRequiredProps(PropTypes.string),

  /**
   * designates if the edit request was successful
   */
  editSuccess: editRequiredProps(PropTypes.bool),

  /**
   * title for a successful edit
   */
  editSuccessTitle: editRequiredProps(PropTypes.string),

  /**
   * designates if the modal is in the edit mode
   */
  editing: PropTypes.bool,

  /**
   * designates if an error has occurred in a request
   */
  error: PropTypes.bool,

  /**
   * text to display if an error has occurred
   */
  errorText: PropTypes.string,

  /**
   * default primary button text for modal in assumed default mode create or generate.
   * in create mode this is the button text prior to supplying an api key, which then
   * uses copyButtonText
   */
  generateButtonText: PropTypes.string,

  /**
   * content to display if generate request was successful
   */
  generateSuccessBody: PropTypes.node,

  /**
   * title for a successful key generation
   */
  generateSuccessTitle: PropTypes.string,

  /**
   * default title for the modal in generate key mode
   */
  generateTitle: PropTypes.string,

  /**
   * designates if the api input has the visibility toggle enabled
   */
  hasAPIKeyVisibilityToggle: PropTypes.bool,

  /**
   * designates if user is able to download the api key
   */
  hasDownloadLink: PropTypes.bool,

  /**
   * label text that's displayed when hovering over visibility toggler to hide key
   */
  hideAPIKeyLabel: PropTypes.string,

  /**
   * designates if the modal is in a loading state via a request or some other in progress operation
   */
  loading: PropTypes.bool,

  /**
   * text that displays while modal is in the loading state
   */
  loadingText: PropTypes.string,

  /**
   * general label text for modal
   */
  modalLabel: PropTypes.string,

  /**
   * helper text for name input
   */
  nameHelperText: PropTypes.string,

  /**
   * label for api key name input
   */
  nameLabel: PropTypes.string,

  /**
   * placeholder text for api key name input
   */
  namePlaceholder: PropTypes.string,

  /**
   * designates if a name is required or not for key generation. NOTE- if using custom steps set this to false since you will be using your own validation
   */
  nameRequired: PropTypes.bool,

  /**
   * text that displays in the primary button when using custom steps to indicate to the user that there is a next step
   */
  nextStepButtonText: customStepsRequiredProps(PropTypes.string),

  /**
   * handler for on modal close
   */
  onClose: PropTypes.func,

  /**
   * Optional callback if you want to use your own copy function instead of the build in one
   * onCopy(apiKey)
   */
  onCopy: PropTypes.func,

  /**
   * handler for api key edit
   */
  onRequestEdit: PropTypes.func,

  /**
   * handler for api key generation
   */
  onRequestGenerate: PropTypes.func,

  /**
   * designates if modal is open or closed
   */
  open: PropTypes.bool.isRequired,

  /**
   * text that displays in the secondary button when using custom steps to indicate to the user that there is a previous step
   */
  previousStepButtonText: customStepsRequiredProps(PropTypes.string),

  /**
   * label text that's displayed when hovering over visibility toggler to show key
   */
  showAPIKeyLabel: PropTypes.string
};
APIKeyModal.displayName = componentName;

export { APIKeyModal };
