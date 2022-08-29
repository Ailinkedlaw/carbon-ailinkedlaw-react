/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  OverflowMenu,
  OverflowMenuItem
} from '@carbon/react'
import PropTypes from 'prop-types';
import React from 'react';

import { pkg } from '@/settings'

const stablePrefix = 'dds'
const prefix = 'cds'

/**
 * MastHead Profile component.
 */
const MastheadProfile = ({
  overflowMenuProps,
  overflowMenuItemProps,
  profileMenu,
  customProfileLogin,
}) => {
  /**
   * Masthead profile menu
   *
   * @returns {*} Masthead profile menu
   */
  const profileNav = profileMenu.map((item, i) => {
    const loginUrl =
      customProfileLogin && item.id === 'signin'
        ? customProfileLogin
        : item.url;
    
    return (
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText={item.title}
        href={loginUrl}
        hasDivider={i > 0}
        key={i}
      />
    );
  });
  
  return (
    <OverflowMenu
      className={`${prefix}--header__action`}
      {...overflowMenuProps}>
      {profileNav}
    </OverflowMenu>
  );
};

MastheadProfile.propTypes = {
  /**
   * The props for Carbon `<OverflowMenu>`.
   */
  overflowMenuProps: PropTypes.object,
  
  /**
   * The props for Carbon `<OverflowMenuItem>`.
   */
  overflowMenuItemProps: PropTypes.object,
  
  /**
   * The data to generate the Carbon `<OverflowMenuItem>`s from.
   */
  profileMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  
  /**
   * Custom login url in masthead profile menu (experimental)
   */
  customProfileLogin: PropTypes.string,
};

export default MastheadProfile;
