import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import classnames from 'classnames';
import {
  // HeaderMenu,
  HeaderMenuItem,
  HeaderNavigation
} from '@carbon/react'

import {
  HeaderMenu
} from '../carbon-components-react/UIShell'

import PropTypes from 'prop-types';
import root from 'window-or-global';

import { pkg } from '@/settings'
import './styles/selectmenu.scss'

// 内部组件
import HeaderNavContainer from './HeaderNavContainer';
import MegaMenu from './MastheadMegaMenu/MegaMenu';

const stablePrefix = 'dds'
const prefix = 'cds'

/**
 * 标头 L1 组件.
 */
const MastheadL1 = ({ navigationL1, ...rest }) => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
  });
  const childLinkChecker = rest.hasCurrentUrl();

  const [overlay, setOverlay] = useState(false);



  // useEffect(() => {
  //   document
  //     .querySelector(`.${prefix}--header__menu-bar`)
  //     ?.setAttribute('role', 'menu');
  //   document.querySelectorAll(`.${prefix}--header__menu-bar li`).forEach(e => {
  //     e.setAttribute('role', 'menuitem');
  //     // e.querySelector('a').removeAttribute('role');
  //   });
  // }, []);

  useEffect(() => {
    document
      .querySelector(`.${prefix}--header__menu-bar`)
      ?.setAttribute('role', 'menu');
    document.querySelectorAll(`.${prefix}--header__menu-bar li`).forEach(e => {
      e.setAttribute('role', 'menuitem');
      // e.querySelector('a').removeAttribute('role');
    });
  }, []);

  const mastheadL1Links = navigationL1.map((link, index) => {
    const selectedUrlItem = childLinkChecker && childLinkChecker(link, root.location?.href);
    const autoid = `${stablePrefix}--masthead-${rest.navType}__l1-nav${index}`;
    const selected = rest.selectedMenuItem
      ? link.titleEnglish === rest.selectedMenuItem
      : selectedUrlItem;

    if (link.children) {
      if (!link.children[0].children) {
        return (
          <HeaderMenu aria-label={link.title} menuLinkName={link.title}>
            <div>
              <SelectMenu data={link.children} />
            </div >
          </HeaderMenu >

        )
      }
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          className={classnames({
            [`${prefix}--masthead__megamenu__l1-nav`]: true,
          })}
          selected={selected}
          autoId={autoid}
          key={'i'}
          disableScroll={true}
          setOverlay={setOverlay}
          dataTitle={'dataTitle'}
        >
          {/* <div style={{ width: '100px', height: '200px', background: 'red' }}> </div> */}
          {renderNav(link, autoid)}
        </HeaderMenu>
      );
    }

    return (
      <HeaderMenuItem
        data-selected={`${!!selected}`}
        href={link.url}
        data-autoid={autoid}
        key={'i'}>
        {link.title}
      </HeaderMenuItem>
    )

  });

  return (
    <>
      <div className={className}>
        <div className={`${prefix}--masthead__l1-inner-container`}>
          <div
            className={`${prefix}--masthead__l1-name`}
            data-selected={!rest.selectedMenuItem}>
            <span className={`${prefix}--masthead__l1-name-title`}>
              <a href={rest.platform.url}>{rest.platform.name}</a>
            </span>
          </div>
          <HeaderNavContainer>
            <HeaderNavigation
              className={`${prefix}--masthead__l1-nav`}
              aria-label="">
              {mastheadL1Links}
            </HeaderNavigation>
          </HeaderNavContainer>
        </div>
      </div>
    </>
  );
}

const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}
const SelectMenu = ({ data, clickAction, LabelIcon, isHide, closeAction }) => {
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
                navitage(item.url);
                closeAction()
              }}
            >
              {' '}
              {item.title}{' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
/**
 * 循环并呈现标头导航的链接列表
 *
 * @param {object} link 要呈现的链接列表
 * @param {string} navType autoids 的导航类型
 * @param {string} autoid megamenu items/menu items data-autoids的autoid前身
 * @returns {object} JSX object
 */


function renderNav (link, autoid) {

  const navItems = [];
  if (link.children && link.children[0].children) {
    navItems.push(<MegaMenu key={link.title} data={link.children} autoid={autoid} Menuicon={link.icon} menutitle={link.title} />);
  }
  return navItems;
}

MastheadL1.propTypes = {
  /**
   * 标题（实验性）。
   */
  title: PropTypes.string,

  /**
   * 可选标题链接（实验性）
   */
  titleLink: PropTypes.string,

  /**
   * 包含标头 l1 导航元素的对象。
   */
  navigationL1: PropTypes.arrayOf(
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

MastheadL1.defaultProps = {
  navigationL1: [],
  titleLink: null,
};

export default MastheadL1
