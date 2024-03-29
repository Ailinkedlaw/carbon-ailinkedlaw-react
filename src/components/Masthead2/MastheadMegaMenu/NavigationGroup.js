/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

import { pkg } from '@/settings'
const stablePrefix = 'dds'
const prefix = 'cds'

/**
 * MegaMenu panel
 */
const NavigationGroup = React.forwardRef(function NavigationGroup(props, ref) {
  const { children, ...rest } = props;
  return (
    <section
      className={`${prefix}--masthead__megamenu`}
      data-autoid={`${stablePrefix}--masthead__megamenu`}
      ref={ref}
      {...rest}>
      <div className={`${prefix}--masthead__megamenu__container`}>
        <div className={`${prefix}--masthead__megamenu__container--row`}>
          {children}
        </div>
      </div>
    </section>
  );
});

NavigationGroup.propTypes = {
  /**
   * children elements
   */
  children: PropTypes.node,
};

export default NavigationGroup;
