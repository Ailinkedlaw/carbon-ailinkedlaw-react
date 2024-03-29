/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChevronLeft } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import React from 'react';

const stablePrefix = 'dds'
const prefix = 'cds';

/**
 * SideNavMenu BackButton component
 */
const SideNavMenuBackButton = React.forwardRef(function SideNavMenuBackButton (
  props,
  ref
) {
  const { onBackClick, backButtonText, ...rest } = props;

  const handleBackButtonClick = event => {
    event.preventDefault();
    onBackClick();
  };

  const handleBackButtonKeyPress = event => {
    if (event.key === 'Enter' || event.charCode === ' ') {
      event.preventDefault();
      onBackClick();
    }
  };

  return (
    <li
      className={`${prefix}--side-nav__menu-item ${prefix}--masthead__side-nav--submemu-back`}>
      <button
        ref={ref}
        onClick={handleBackButtonClick}
        onKeyPress={handleBackButtonKeyPress}
        className={`${prefix}--side-nav__link`}
        data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-back`}
        isbackbutton="true"
      >
        <span className={`${prefix}--side-nav__link-text`}>
          <ChevronLeft size={20} />
          {backButtonText}
        </span>
      </button>
    </li>
  );
});

SideNavMenuBackButton.propTypes = {
  /**
   * action on back click
   */
  onBackClick: PropTypes.func,

  /**
   * back button text
   */
  backButtonText: PropTypes.string,
};

SideNavMenuBackButton.defaultProps = {
  backButtonText: 'Back',
  onBackClick: () => {},
};

export default SideNavMenuBackButton;
