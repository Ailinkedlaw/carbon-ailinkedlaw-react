/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CategoryGroup from './CategoryGroup';
import CategoryLink from './CategoryLink';
import LeftNavigation from './LeftNavigation';
import NavigationGroup from './NavigationGroup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// import RightNavigation from './RightNavigation';


const prefix = 'c4p'

/**
 * Masthead megamenu component.
 */
const MegaMenu = React.forwardRef(function MegaMenu (props, ref) {
  const { data, Menuicon, closeAction, openWay = 'click', ...rest } = props;
  let highlightedItems = [];
  let viewAllLink;
  const [activeIndex, setActiveIndex] = useState(0)
  // const navitage = useNavigate()
  // data.menuSections[0].menuItems.forEach(item => {
  //   item.megaPanelViewAll = undefined
  //   if (item.highlighted) {
  //     return highlightedItems.push(item);
  //   }
  //   if (item.megaPanelViewAll) {
  //     return (viewAllLink = item);
  //   }
  //   else {
  //     return menuItems.push(item);
  //   }
  // });


  const hasHighlights = highlightedItems.length !== 0;

  // const heading = data.menuSections[0]?.heading;

  return (
    <NavigationGroup ref={ref}
      onMouseLeave={() => { closeAction() }}
    >
      <div className="mageMenu-box" >
        <div className="mageMenu-box-left">
          <div className="mageMenu-left-container" >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={index === activeIndex ? 'mageMenu-left-items-active' : 'mageMenu-left-items'}
                  onMouseOver={() => {
                    setActiveIndex(index)
                    if (openWay === 'mouseOver') {

                    }
                  }}
                >
                  <span
                    onClick={() => {
                      if (openWay === 'click') {
                        //  setActiveIndex(index)
                      }
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mageMenu-box-right" >
          <div>
            <h1 className="right-title" > {props.menutitle} </h1>
            <div className="right-menus" >
              {
                data[activeIndex].children.map((item, index) => {
                  return <div
                    key={index}
                    style={{ height: '34px', width: '460px', lineHeight: '34px', position: 'relative' }}
                    onClick={() => {
                      props.gotourl(item.url)
                      props.closeAction()
                    }}>
                    <div style={{ display: 'inline-block', position: 'relative' }}>
                      {item.title}
                      <div className="text"> </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
          <div style={{ alignSelf: 'center' }}>
            {<Menuicon size={100} />}
          </div>
        </div>
      </div>
    </NavigationGroup >
  );
});

MegaMenu.propTypes = {
  /**
   * Object containing megamenu nav data
   */
  data: PropTypes.shape({
    hasMenupanel: PropTypes.bool,
    title: PropTypes.string,
    url: PropTypes.string,
    menuSections: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string,
        menuItems: PropTypes.arrayOf(
          PropTypes.shape({
            highlighted: PropTypes.bool,
            title: PropTypes.string,
            url: PropTypes.string,
            megapanelContent: PropTypes.shape({
              quickLinks: PropTypes.shape({
                links: PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    url: PropTypes.string,
                  })
                ),
              }),
            }),
          })
        ),
      })
    ),
  }),
};

export default MegaMenu;
