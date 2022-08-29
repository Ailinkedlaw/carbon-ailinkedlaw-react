/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import {
  // HeaderMenu,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation
} from '@carbon/react'

import { HeaderMenu } from '../carbon-components-react/UIShell'


import HeaderNavContainer from './HeaderNavContainer';
import MegaMenu from './MastheadMegaMenu/MegaMenu';
import PropTypes from 'prop-types';
import root from 'window-or-global';

const stablePrefix = 'dds'
const prefix = 'cds'
// import './styles/_selectmenu.scss'
/**
 * Masthead top nav component.
 */
const MastheadTopNav = ({ navigation, gotourl, ...topNavProps }) => {
  const [overlay, setOverlay] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1)
  const childLinkChecker = topNavProps.hasCurrentUrl();

  useEffect(() => {
    document
      .querySelector(`.${prefix}--header__menu-bar`)
      ?.setAttribute('role', 'menu');
    document.querySelectorAll(`.${prefix}--header__menu-bar li`).forEach(e => {
      e.setAttribute('role', 'menuitem');
      // e.querySelector('a').removeAttribute('role');
    });
  }, []);

  /**
   * Top masthead navigation
   *
   * @returns {*} Top masthead navigation
   */
  // const navigation = menuData
  const mastheadLinks = navigation.map((link, i) => {
    const selectedUrlItem =
      childLinkChecker && childLinkChecker(link, root.location?.href);
    const autoid = `${stablePrefix}--masthead-${topNavProps.navType}__l0-nav${i}`;
    const selected = topNavProps.selectedMenuItem
      ? link.titleEnglish === topNavProps.selectedMenuItem
      : selectedUrlItem;
    const dataTitle = link.titleEnglish
      ? link.titleEnglish
        .replace(/[^-a-zA-Z0-9_ ]/g, '')
        .replace(/ +/g, '-')
        .toLowerCase()
      : null;



    if (link.children) {

      if (!link.children[0].children) {
        return (
          <HeaderMenu
            aria-label={link.title}
            menuLinkName={link.title} exStatus={i === openIndex}
            handleClick={() => { i === openIndex || setOpenIndex(i) }}
            handleMouseLeave={() => { setOpenIndex(-1) }}
          >
            <div>
              <SelectMenu data={link.children}
                gotourl={gotourl}
                closeAction={() => {
                  setOpenIndex(-1)
                }} />
            </div >
          </HeaderMenu >

        )
      }

      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          exStatus={i === openIndex}
          handleClick={() => {
            if (!(i === openIndex)) {
              setOpenIndex(i)
              setOverlay(true)
            }
          }}
          handleMouseLeave={() => {
            setOpenIndex(-1)
            setOverlay(false)
          }}
          style={{ background: 'red' }}
          className={classnames({
            [`${prefix}--masthead__megamenu__l0-nav`]: link.hasMegapanel,
            [`${prefix}--masthead__megamenu__l0-nav`]: true,
          })}
          selected={selected}
          autoId={autoid}
          key={i}
          disableScroll={true}
          setOverlay={setOverlay}
          dataTitle={dataTitle} >
          {renderNav(link, autoid, () => { setOpenIndex(-1); setOverlay(false); }, gotourl)}
        </HeaderMenu >
      );
    }

    return (
      <HeaderMenuItem
        data-selected={`${!!selected}`}
        href={link.url}
        data-autoid={autoid}
        key={i}>
        {link.title}
      </HeaderMenuItem>
    );
  });

  return (
    <>
      {topNavProps.platform && (
        <div className={`${prefix}--masthead__platform-name`}>
          <HeaderName
            prefix=""
            href={topNavProps.platform.url}
            data-autoid={`${stablePrefix}--masthead-${topNavProps.navType}__l0-ecosystemname`}>
            {topNavProps.platform.name}
          </HeaderName>
        </div>
      )}
      <HeaderNavContainer>
        <HeaderNavigation
          aria-label="IBM"
          data-autoid={`${stablePrefix}--masthead__l0-nav`}>
          {mastheadLinks}
        </HeaderNavigation>
      </HeaderNavContainer>
      <div
        className={classnames(`${prefix}--masthead__overlay`, {
          [`${prefix}--masthead__overlay-show`]: overlay,
        })}></div>
    </>
  );
};


const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}
const SelectMenu = ({ data, clickAction, LabelIcon, isHide, closeAction, gotourl }) => {
  // const layoutSettings = useSelector(
  //   (state) => state.globalSetting
  // ).layoutBuilder
  // const navitage = useNavigate()
  // const { fontSizeMode } = layoutSettings.basic
  const arr = deepClone(data)
  const liArr = arr.sort((a, b) => {
    return a.title.length - b.title.length;
  });
  const liLenth = liArr[liArr.length - 1].title.length;

  return (
    <div className="select-menu-box2">
      <ul
        className="menu-ul"
        style={{}}
      >
        {/* <div style={{ height: '20px', background: 'var(--cds-background)', width: `${(liLenth * 18) + 20}px` }}></div> */}
        {/* style={{ top: (!isHide) ? `-${topVal}px` : '3.125rem', width: `${(liLenth * 18) + 20}px`, minWidth: '100%' }}  */}
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className="menu-li"
              onClick={() => {
                // navitage(item.url);
                gotourl(item.url)
                closeAction()
              }}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


/**
 * Loops through and renders a list of links for the masthead nav
 *
 * @param {object} link A list of links to be rendered
 * @param {string} autoid autoid predecessor for megamenu items/menu items data-autoids
 * @returns {object} JSX object
 */
function renderNav (link, autoid, closeAction, gotourl) {

  const navItems = [];
  if (link.children && link.children[0].children) {
    navItems.push(<MegaMenu key={link.title} data={link.children} autoid={autoid} Menuicon={link.icon} menutitle={link.title} closeAction={closeAction} gotourl={gotourl} />);
  }
  return navItems;
}

MastheadTopNav.propTypes = {
  /**
   * Object containing top navigation elements.
   */
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      hasMenu: PropTypes.bool,
      title: PropTypes.string,
      url: PropTypes.string,
      menuSections: PropTypes.arrayOf(
        PropTypes.shape({
          menuItems: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              url: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
};

export default MastheadTopNav;
