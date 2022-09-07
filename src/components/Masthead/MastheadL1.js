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
// import './styles/_selectmenu.scss'
// 内部组件
import HeaderNavContainer from './HeaderNavContainer';
import MegaMenu from './MastheadMegaMenu/MegaMenu';

const stablePrefix = 'dds'
const prefix = 'cds'

/**
 * 标头 L1 组件.
 */
const MastheadL1 = ({ navigationL1, gotourl, openWay = 'click', menuLocation = 'left', ...rest }) => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
  });
  const childLinkChecker = rest.hasCurrentUrl();

  const [overlay, setOverlay] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1)
  const [paddingVal, setPaddingVal] = useState(0)


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

    // const paddingVal = (document.body.scrollWidth - document.getElementById('masthead__l1-nav').clientWidth) / 2

    // menuLocation === 'center' && setPaddingVal(paddingVal)
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
          <HeaderMenu
            aria-label={link.title}
            menuLinkName={link.title}
            exStatus={index === openIndex}
            handleClick={(e) => {
              if (openWay === 'click') {
                if (!(index === openIndex)) {
                  setOpenIndex(index)
                  setOverlay(true)
                }
              }
              if (index === openIndex) {
                if (e.target.tagName === 'A' || e.target.tagName === 'svg') {
                  setOpenIndex(-1)
                  setOverlay(false)
                }
              }
            }}
            handleMouseOver={() => {
              if (openWay === 'mouseOver') {
                if (!(index === openIndex)) {
                  setOpenIndex(index)
                  setOverlay(true)
                }
              }
            }}
          // handleMouseLeave={() => { setOpenIndex(-1) }}
          >
            <div>
              <SelectMenu data={link.children} gotourl={gotourl} closeAction={() => { setOpenIndex(-1); setOverlay(false) }} />
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

          exStatus={index === openIndex}
          handleClick={(e) => {
            if (openWay === 'click') {
              if (!(index === openIndex)) {
                setOpenIndex(index)
                setOverlay(true)
              }
            }
            if (index === openIndex) {
              if (e.target.tagName === 'A' || e.target.tagName === 'svg') {
                setOpenIndex(-1)
                setOverlay(false)
              }
            }
          }}
          handleMouseOver={() => {
            if (openWay === 'mouseOver') {
              if (!(index === openIndex)) {
                setOpenIndex(index)
                setOverlay(true)
              }

            }
          }}
          handleMouseLeave={() => {
            // setOpenIndex(-1)
            // setOverlay(false)
          }}
          itemhandleClick={() => { }}
          selected={selected}
          autoId={autoid}
          key={index}
          disableScroll={true}
          setOverlay={setOverlay}
          dataTitle={'dataTitle'}
        >
          {/* {renderNav(link, autoid, gotourl)} */}
          {renderNav(link, autoid, () => { setOpenIndex(-1); setOverlay(false); }, gotourl)}
        </HeaderMenu>
      );
    }

    return (
      <HeaderMenuItem
        data-selected={`${!!selected}`}
        href={link.url}
        data-autoid={autoid}
        key={index}>
        {link.title}
      </HeaderMenuItem>
    )
  });



  return (
    <>
      <div className={className}>
        <div className={`${prefix}--masthead__l1-inner-container`}>
          {/* <div
            className={`${prefix}--masthead__l1-name`}
            data-selected={!rest.selectedMenuItem}>
            <span className={`${prefix}--masthead__l1-name-title`}>
              <a href={rest.platform.url}>{rest.platform.name}</a>
            </span>
          </div> */}
          <HeaderNavContainer location={menuLocation}>
            <HeaderNavigation
              id="masthead__l1-nav"
              className={`${prefix}--masthead__l1-nav`}
              // style={{ paddingLeft: paddingVal + 'px' }}
              // style={{ paddingLeft: 'calc(1920px - 100%)' }}
              aria-label="">
              {mastheadL1Links}
            </HeaderNavigation>
          </HeaderNavContainer>
        </div>
      </div>

      <div className={classnames(`${prefix}--masthead__overlay`, {
        [`${prefix}--masthead__overlay-show`]: overlay,
      })}></div>

    </>
  );
}



const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}
const SelectMenu = ({ data, clickAction, LabelIcon, isHide, closeAction, gotourl }) => {
  // const layoutSettings = useSelector(
  //   (state) => state.globalSetting
  // ).layoutBuilder
  // const navitage = useNavigate()
  //  const { fontSizeMode } = layoutSettings.basic
  const arr = deepClone(data)
  const liArr = arr.sort((a, b) => {
    return a.title.length - b.title.length;
  });
  const liLenth = liArr[liArr.length - 1].title.length;

  return (
    <div className="select-menu-box2" onMouseLeave={() => { closeAction() }}>
      <ul
        className="menu-ul"
        style={{}}
      >
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className="menu-li"
              onClick={() => { closeAction(); gotourl(item.url) }}
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

function renderNav (link, autoid, closeAction, gotourl) {

  const navItems = [];
  if (link.children && link.children[0].children) {
    navItems.push(<MegaMenu
      key={link.title}
      data={link.children} autoid={autoid} Menuicon={link.icon} menutitle={link.title}
      closeAction={closeAction}
      gotourl={gotourl} />
    );
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
