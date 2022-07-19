/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { prepareProps, allPropTypes } from '../../global/js/utils/props-helper.js';
import { pkg } from '../../settings.js';
import { Button } from '@carbon/react';
import { TearsheetShell, tearsheetHasCloseIcon, tearsheetShellWideProps } from './TearsheetShell.js';
import { ActionSet } from '../ActionSet/ActionSet.js';

var _excluded = ["verticalPosition"];
var componentName = 'TearsheetNarrow'; // NOTE: the component SCSS is not imported here: it is rolled up separately.
// Default values for props

var defaults = {
  verticalPosition: 'lower'
};
/**
 * A narrow tearsheet is a slimmer variant of the tearsheet, providing a dialog
 * that keeps users in-context and focused by bringing actionable content front
 * and center while revealing more of the UI behind it.
 *
 * A narrow tearsheet comprises 3 zones: a heading area including a title, the
 * main content area, and a set of action buttons.
 */

var TearsheetNarrow = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$verticalPosition = _ref.verticalPosition,
      verticalPosition = _ref$verticalPosition === void 0 ? defaults.verticalPosition : _ref$verticalPosition,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(TearsheetShell, _objectSpread2(_objectSpread2(_objectSpread2({}, getDevtoolsProps(componentName)), prepareProps(rest, tearsheetShellWideProps)), {}, {
    verticalPosition: verticalPosition,
    ref: ref,
    size: 'narrow'
  }));
}); // Return a placeholder if not released and not enabled by feature flag

TearsheetNarrow = pkg.checkComponentEnabled(TearsheetNarrow, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

TearsheetNarrow.displayName = componentName;
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
  verticalPosition: PropTypes.oneOf(['normal', 'lower'])
}; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
// Note that the descriptions here should be kept in sync with those for the
// corresponding props for Tearsheet and TearsheetShell components.

TearsheetNarrow.propTypes = _objectSpread2({
  /**
   * The navigation actions to be shown as buttons in the action area at the
   * bottom of the tearsheet. Each action is specified as an object with
   * optional fields: 'label' to supply the button label, 'kind' to select the
   * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
   * display a loading indicator, and 'onClick' to receive notifications when
   * the button is clicked. Additional fields in the object will be passed to
   * the Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props. Any other fields in the object will be passed
   * through to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: allPropTypes([ActionSet.validateActions(function () {
    return 'lg';
  }), PropTypes.arrayOf(PropTypes.shape(_objectSpread2(_objectSpread2({}, Button.propTypes), {}, {
    kind: PropTypes.oneOf(['ghost', 'danger--ghost', 'secondary', 'danger', 'primary']),
    label: PropTypes.string,
    loading: PropTypes.bool,
    // we duplicate this Button prop to improve the DocGen here
    onClick: Button.propTypes.onClick
  })))]),

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   * The accessibility title for the close icon (if shown).
   *
   * **Note:** This prop is only required if a close icon is shown, i.e. if
   * there are a no navigation actions and/or hasCloseIcon is true.
   */
  closeIconDescription: PropTypes.string.isRequired.if(function (_ref2) {
    var actions = _ref2.actions,
        hasCloseIcon = _ref2.hasCloseIcon;
    return tearsheetHasCloseIcon(actions, hasCloseIcon);
  }),

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes.node,

  /**
   * Enable a close icon ('x') in the header area of the tearsheet. By default,
   * a tearsheet does not display a close icon, but one should be enabled if
   * the tearsheet is read-only or has no navigation actions (sometimes called
   * a "passive tearsheet").
   */
  hasCloseIcon: PropTypes.bool,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose: PropTypes.func,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes.bool,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node
}, deprecatedProps);

export { TearsheetNarrow, deprecatedProps };
