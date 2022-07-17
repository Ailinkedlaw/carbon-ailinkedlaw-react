/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { devtoolsAttribute, getDevtoolsId } from './utils/devtools.js';

var defaults = {
  prefix: 'c4p',
  // by default only released components are set to true
  component: {
    // reviewed and released components:
    AboutModal: true,
    APIKeyModal: true,
    Cascade: true,
    CreateModal: true,
    CreateFullPage: true,
    CreateFullPageStep: true,
    CreateSidePanel: true,
    CreateTearsheetNarrow: true,
    CreateTearsheet: true,
    CreateTearsheetStep: true,
    CreateTearsheetDivider: true,
    EmptyState: true,
    ErrorEmptyState: true,
    ExportModal: true,
    ExpressiveCard: true,
    HTTPError403: true,
    HTTPError404: true,
    HTTPErrorOther: true,
    ImportModal: true,
    InlineEdit: true,
    NotificationsPanel: true,
    NoDataEmptyState: true,
    NoTagsEmptyState: true,
    NotFoundEmptyState: true,
    NotificationsEmptyState: true,
    OptionsTile: true,
    PageHeader: true,
    ProductiveCard: true,
    RemoveModal: true,
    Saving: true,
    SidePanel: true,
    StatusIcon: true,
    TagSet: true,
    Tearsheet: true,
    TearsheetNarrow: true,
    UnauthorizedEmptyState: true,
    UserProfileImage: true,
    // other public components not yet reviewed and released:
    MultiAddSelect: false,
    SingleAddSelect: false,
    ModifiedTabs: false,
    Toolbar: false,
    ToolbarButton: false,
    ToolbarGroup: false,
    WebTerminal: false,
    WebTerminalContentWrapper: false,
    EditSidePanel: false,
    CancelableTextEdit: false,
    DataSpreadsheet: false,
    Datagrid: false
    /* new component flags here - comment used by generate CLI */

  },
  // feature level flags
  feature: {
    'a-new-feature': false,
    'default-portal-target-body': true
  }
};

var warningMessageComponent = function warningMessageComponent(property) {
  return "Carbon for IBM Products (WARNING): Component \"".concat(property, "\" enabled via feature flags. This component has not yet completed its review process.");
};

var warningMessageFeature = function warningMessageFeature(property) {
  return "Carbon for IBM Products (WARNING): Feature \"".concat(property, "\" enabled via feature flags.");
};

var warningMessageAllComponents = // eslint-disable-next-line max-len
'Carbon for IBM Products (WARNING): All components enabled through use of setAllComponents. This includes components that have not yet completed their review process.';
var warningMessageAllFeatures = 'Carbon for IBM Products (WARNING): All features enabled through use of setAllFeatures'; // Values to represent overrides for component or feature settings.
// Each value maps the initial value to the value that should be returned.

var all = {
  INITIAL: function INITIAL(v) {
    return v;
  },
  ON: function ON() {
    return true;
  },
  OFF: function OFF() {
    return false;
  }
};
var allComponents = all.INITIAL;
var allFeatures = all.INITIAL;
var silent = false;
var component = new Proxy(_objectSpread2({}, defaults.component), {
  set: function set(target, property, value) {
    value && !silent && console.warn(warningMessageComponent(property));
    target[property] = value;
    return true; // value set
  },
  get: function get(target, property) {
    var _target$property;

    return allComponents((_target$property = target[property]) !== null && _target$property !== void 0 ? _target$property : false);
  }
});
var feature = new Proxy(_objectSpread2({}, defaults.feature), {
  set: function set(target, property, value) {
    value && !silent && console.warn(warningMessageFeature(property));
    target[property] = value;
    return true; // value set
  },
  get: function get(target, property) {
    var _target$property2;

    return allFeatures((_target$property2 = target[property]) !== null && _target$property2 !== void 0 ? _target$property2 : false);
  }
});
var pkgSettings = {
  devtoolsAttribute: devtoolsAttribute,
  getDevtoolsId: getDevtoolsId,
  prefix: defaults.prefix,
  component: component,
  feature: feature,
  isComponentEnabled: function isComponentEnabled(componentOrName) {
    var byDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var componentName = (componentOrName === null || componentOrName === void 0 ? void 0 : componentOrName.displayName) || (componentOrName === null || componentOrName === void 0 ? void 0 : componentOrName.name) || componentOrName;
    return byDefault ? defaults.component[componentName] : component[componentName];
  },
  isComponentPublic: function isComponentPublic(componentOrName) {
    var byDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var componentName = (componentOrName === null || componentOrName === void 0 ? void 0 : componentOrName.displayName) || (componentOrName === null || componentOrName === void 0 ? void 0 : componentOrName.name) || componentOrName;
    return Object.prototype.hasOwnProperty.call(byDefault ? defaults.component : component, componentName);
  },
  isFeatureEnabled: function isFeatureEnabled(featureName) {
    var byDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return byDefault ? defaults.feature[featureName] : feature[featureName];
  },
  isFeaturePublic: function isFeaturePublic(featureName) {
    var byDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return Object.prototype.hasOwnProperty.call(byDefault ? defaults.feature : feature, featureName);
  },
  setAllComponents: function setAllComponents(enabled) {
    enabled === true && !silent && console.warn(warningMessageAllComponents);
    allComponents = enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL;
  },
  setAllFeatures: function setAllFeatures(enabled) {
    enabled === true && !silent && console.warn(warningMessageAllFeatures);
    allFeatures = enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL;
  },
  _silenceWarnings: function _silenceWarnings(value) {
    // This will suppress console warnings when components or feature flags
    // are enabled, and should only be used when this is not an issue, such
    // as in internal test suites and storybook builds.
    silent = value;
  }
};

export { pkgSettings as default };
