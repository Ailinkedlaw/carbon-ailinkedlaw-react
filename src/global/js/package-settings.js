//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { devtoolsAttribute, getDevtoolsId } from './utils/devtools'

const defaults = {
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
}

const warningMessageComponent = (property) =>
  `Carbon for IBM Products (WARNING): Component "${property}" enabled via feature flags. This component has not yet completed its review process.`
const warningMessageFeature = (property) =>
  `Carbon for IBM Products (WARNING): Feature "${property}" enabled via feature flags.`
const warningMessageAllComponents =
  // eslint-disable-next-line max-len
  'Carbon for IBM Products (WARNING): All components enabled through use of setAllComponents. This includes components that have not yet completed their review process.'
const warningMessageAllFeatures =
  'Carbon for IBM Products (WARNING): All features enabled through use of setAllFeatures'

// Values to represent overrides for component or feature settings.
// Each value maps the initial value to the value that should be returned.
const all = { INITIAL: (v) => v, ON: () => true, OFF: () => false }

let allComponents = all.INITIAL
let allFeatures = all.INITIAL
let silent = false

const component = new Proxy(
  { ...defaults.component },
  {
    set (target, property, value) {
      value && !silent && console.warn(warningMessageComponent(property))
      target[property] = value
      return true // value set
    },
    get (target, property) {
      return allComponents(target[property] ?? false)
    }
  }
)

const feature = new Proxy(
  { ...defaults.feature },
  {
    set (target, property, value) {
      value && !silent && console.warn(warningMessageFeature(property))
      target[property] = value
      return true // value set
    },
    
    get (target, property) {
      return allFeatures(target[property] ?? false)
    }
  }
)

export default {
  devtoolsAttribute,
  getDevtoolsId,
  prefix: defaults.prefix,
  component: component,
  feature: feature,
  
  isComponentEnabled: (componentOrName, byDefault = false) => {
    const componentName =
      componentOrName?.displayName || componentOrName?.name || componentOrName
    return byDefault
      ? defaults.component[componentName]
      : component[componentName]
  },
  
  isComponentPublic: (componentOrName, byDefault = false) => {
    const componentName =
      componentOrName?.displayName || componentOrName?.name || componentOrName
    return Object.prototype.hasOwnProperty.call(
      byDefault ? defaults.component : component,
      componentName
    )
  },
  
  isFeatureEnabled: (featureName, byDefault = false) => {
    return byDefault ? defaults.feature[featureName] : feature[featureName]
  },
  
  isFeaturePublic: (featureName, byDefault = false) => {
    return Object.prototype.hasOwnProperty.call(
      byDefault ? defaults.feature : feature,
      featureName
    )
  },
  
  setAllComponents: (enabled) => {
    enabled === true && !silent && console.warn(warningMessageAllComponents)
    allComponents =
      enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL
  },
  
  setAllFeatures: (enabled) => {
    enabled === true && !silent && console.warn(warningMessageAllFeatures)
    allFeatures =
      enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL
  },
  
  _silenceWarnings: (value) => {
    // This will suppress console warnings when components or feature flags
    // are enabled, and should only be used when this is not an issue, such
    // as in internal test suites and storybook builds.
    silent = value
  }
}
