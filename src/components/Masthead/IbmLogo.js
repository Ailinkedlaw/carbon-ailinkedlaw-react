import cx from 'classnames';

import ConditionalWrapper from '../ConditionalWrapper'



const prefix = 'cds'

const IbmLogo = ({ autoid, logoData, isSearchActive }) => {
  
  const logoClasses = cx({
    [`${prefix}--header__logo`]: true,
    [`${prefix}--search-active`]: isSearchActive,
  });
  
  return (
    <div className={logoClasses}>
      <ConditionalWrapper
        condition={logoData && logoData.tooltip !== undefined}
        wrapper={children => (
          <div>{children}</div>
        )}>
        <a aria-label="IBM®" data-autoid={autoid} href={'http://www.ibm.com'}>
          logo
        </a>
      </ConditionalWrapper>
    </div>
  )
}

export default IbmLogo
