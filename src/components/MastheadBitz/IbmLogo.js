import React from 'react';
import cx from 'classnames';
import Link, { LinkPropTypes } from './Link'
import PropTypes from 'prop-types';

// import ConditionalWrapper from '../ConditionalWrapper'
// import { Tooltip } from '@carbon/react'
// import { Bee } from '@carbon/icons-react'

const prefix = 'cds'

const IbmLogo = ({ autoid, isSearchActive, linkClassName, children, ...rest  }) => {
  
  const logoClasses = cx({
    [`${prefix}--header__logo`]: true,
    [`${prefix}--search-active`]: isSearchActive,
  });
  
  return (
    <div className={logoClasses}>
      {/* <a aria-label="ailinkedlaw" data-autoid={autoid} href={href}> */}
      {/*   <img src="http://localhost:3000/static/media/logo.0de011d1a6f263367ffa.png" alt="logo" /> */}
      {/* </a> */}
      <Link
        {...rest}
        autoid={autoid}
        className={linkClassName}
      >
        { children }
      </Link>
    </div>
  )
}

IbmLogo.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,
  
  className: PropTypes.string,
  
  autoid: PropTypes.string,
  
  isSearchActive: PropTypes.bool,
  
  linkClassName: PropTypes.string,
  
  children: PropTypes.node,
}

export default IbmLogo
