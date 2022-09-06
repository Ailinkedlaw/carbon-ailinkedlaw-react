import { Tab } from '@carbon/react/es/internal/keyboard/keys'
import { matches } from '@carbon/react/es/internal/keyboard/match'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@carbon/icons-react'
import PropTypes from 'prop-types';
import root from 'window-or-global';

const prefix = 'cds'

const HeaderNavContainer = ({ children, location }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const contentLeftRef = useRef(null);
  const contentRightRef = useRef(null);
  const caretLeftRef = useRef(null);
  const caretRightRef = useRef(null);
  const [io, setIO] = useState(null);
  const [position, setPosition] = useState(0);
  const [paddingVal, setPaddingVal] = useState(0)
  const buttonSize = 48; // 40px(width) + 8px(gradient)
  const pageIsRTL = root.document?.dir === 'rtl';

  const paginateLeft = useCallback(() => {
    let menuItems = contentRef.current.querySelectorAll('.cds--header__menu-bar > li');
    if (pageIsRTL) {
      for (let i = 0; i < menuItems.length; i++) {
        if (
          contentRef.current.offsetWidth -
          menuItems[i].offsetLeft -
          buttonSize >
          -parseFloat(window.getComputedStyle(contentRef.current).right)
        ) {
          setPosition(
            Math.min(
              -contentRef.current.offsetWidth +
              containerRef.current.offsetWidth +
              menuItems[i].offsetLeft -
              buttonSize,
              0
            )
          );
          contentRef.current.style.right =
            String(
              Math.min(
                -contentRef.current.offsetWidth +
                containerRef.current.offsetWidth +
                menuItems[i].offsetLeft -
                buttonSize,
                0
              )
            ) + 'px';
          break;
        }
      }
    } else {
      for (let i = 0; i < menuItems.length; i++) {
        // checks if first visible item is partially hidden
        if (
          menuItems[i].offsetLeft + menuItems[i].offsetWidth + position >=
          buttonSize
        ) {
          // checks if there is space for remaining menuItems
          if (
            menuItems[i].offsetLeft + menuItems[i].offsetWidth >
            containerRef.current.offsetWidth - buttonSize
          ) {
            setPosition(
              containerRef.current.offsetWidth -
              menuItems[i].offsetLeft -
              menuItems[i].offsetWidth -
              buttonSize
            );
            contentRef.current.style.left =
              String(
                containerRef.current.offsetWidth -
                menuItems[i].offsetLeft -
                menuItems[i].offsetWidth -
                buttonSize
              ) + 'px';
          } else {
            setPosition(0);
            contentRef.current.style.left = '0px';
          }
          break;
        }
      }
    }
  }, [position, pageIsRTL]);

  const paginateRight = useCallback(() => {
    let menuItems = contentRef.current.querySelectorAll('.cds--header__menu-bar > li');
    if (pageIsRTL) {
      for (let i = 0; i < menuItems.length; i++) {
        // checks if the right most visible element is partially hidden
        if (
          contentRef.current.offsetWidth - menuItems[i].offsetLeft >
          containerRef.current.offsetWidth - buttonSize - position
        ) {
          setPosition(
            Math.max(
              -contentRef.current.offsetWidth +
              menuItems[i].offsetLeft +
              menuItems[i].offsetWidth +
              buttonSize,
              containerRef.current.offsetWidth - contentRef.current.offsetWidth
            )
          );
          contentRef.current.style.right =
            String(
              Math.max(
                -contentRef.current.offsetWidth +
                menuItems[i].offsetLeft +
                menuItems[i].offsetWidth +
                buttonSize,
                containerRef.current.offsetWidth -
                contentRef.current.offsetWidth
              )
            ) + 'px';
          break;
        }
      }
    } else {
      for (let i = 0; i < menuItems.length; i++) {
        if (
          menuItems[i].offsetLeft + menuItems[i].offsetWidth + position >
          containerRef.current.offsetWidth - buttonSize
        ) {
          // checks if there is space for remaining menuItems
          if (
            contentRef.current.offsetWidth - menuItems[i].offsetLeft <
            containerRef.current.offsetWidth - buttonSize
          ) {
            setPosition(
              containerRef.current.offsetWidth - contentRef.current.offsetWidth
            );
            contentRef.current.style.left =
              String(
                containerRef.current.offsetWidth -
                contentRef.current.offsetWidth
              ) + 'px';
          } else {
            setPosition(buttonSize - menuItems[i].offsetLeft);
            contentRef.current.style.left =
              String(buttonSize - menuItems[i].offsetLeft) + 'px';
          }
          break;
        }
      }
    }
  }, [position, pageIsRTL]);

  useEffect(() => {
    if (window.IntersectionObserver) {
      setIO(
        new IntersectionObserver(
          records => {
            records.forEach(record => {
              if (
                contentLeftRef.current &&
                record.target.classList.contains(
                  contentLeftRef.current.className
                )
              ) {
                caretLeftRef.current.hidden = record.isIntersecting;
              }
              if (
                contentRightRef.current &&
                record.target.classList.contains(
                  contentRightRef.current.className
                )
              ) {
                caretRightRef.current.hidden = record.isIntersecting;
              }
            });
          },
          {
            root: containerRef.current,
            threshold: 1,
          }
        )
      );
    }
  }, [setIO]);

  useEffect(() => {
    const navContent = contentRef.current;

    if (io) {
      navContent.addEventListener('keydown', handleOnKeyDown);
      io.observe(contentLeftRef.current);
      io.observe(contentRightRef.current);
    } else {
      return () => {
        if (io) {
          navContent.removeEventListener('keydown', handleOnKeyDown);
          io.disconnect();
        }
      };
    }
  });


  /**
   * 菜单项的键盘事件处理程序.
   */
  const handleOnKeyDown = event => {
    if (matches(event, [Tab])) {
      if (pageIsRTL) {
        if (event.shiftKey) {
          if (
            document.activeElement?.parentElement?.previousSibling &&
            document.activeElement?.parentElement?.previousSibling?.offsetLeft +
            document.activeElement?.parentElement?.previousSibling
              ?.offsetWidth -
            parseFloat(window.getComputedStyle(contentRef.current).right) +
            buttonSize >
            contentRef.current.offsetWidth
          ) {
            paginateLeft();
          }
        } else {
          if (
            document.activeElement?.parentElement?.nextSibling &&
            contentRef.current.offsetWidth -
            document.activeElement?.parentElement?.nextSibling?.offsetLeft >
            containerRef.current.offsetWidth - buttonSize - position
          ) {
            paginateRight();
          }
        }
      } else {
        if (event.shiftKey) {
          // Focus previous input
          if (
            document.activeElement.parentElement.previousSibling &&
            document.activeElement.parentElement.previousSibling.offsetLeft +
            position <=
            buttonSize
          ) {
            paginateLeft();
          }
        } else {
          // Focus next input
          if (
            document.activeElement.parentElement.nextSibling &&
            document.activeElement.parentElement.nextSibling.offsetLeft +
            document.activeElement.parentElement.nextSibling.offsetWidth >=
            containerRef.current.offsetWidth - buttonSize
          ) {
            paginateRight();
          }
        }
      }
    }
  };

  const leftStyle = {
    left: 0
  }
  const centerStyle = {
    left: '50%',
    transform: 'translateX(-50%)'
  }
  // style={location === 'center' ? centerStyle : leftStyle}

  useEffect(() => {

    const p1 = (containerRef.current.clientWidth - contentRef.current.clientWidth) / 2
    const p2 = (containerRef.current.clientWidth - contentRef.current.clientWidth) - 90
    location === 'center' && setPaddingVal(p1)
    location === 'right' && setPaddingVal(p2)
  }, [])
  return (
    <>
      <div className={`${prefix}--header__nav-container`} ref={containerRef} >
        <div className={`${prefix}--header__nav-content`} ref={contentRef} style={{ paddingLeft: paddingVal + 'px' }} >
          <div className={`${prefix}--sub-content-left`} ref={contentLeftRef} />
          <div
            className={`${prefix}--sub-content-right`}
            ref={contentRightRef}
          />
          {children}
        </div>
        <div
          ref={caretLeftRef}
          className={`${prefix}--header__nav-caret-left-container`}
          hidden>
          <button
            className={`${prefix}--header__nav-caret-left`}
            aria-label="Masthead left caret"
            onClick={paginateLeft}
            tabIndex="-1"
            aria-hidden="true">
            {pageIsRTL ? <CaretRight size={20} /> : <CaretLeft size={20} />}
          </button>
          <div className={`${prefix}--header__nav-caret-left-gradient`} />
        </div>
        <div
          ref={caretRightRef}
          className={`${prefix}--header__nav-caret-right-container`}
          hidden>
          <div className={`${prefix}--header__nav-caret-right-gradient`} />
          <button
            className={`${prefix}--header__nav-caret-right`}
            aria-label="Masthead right caret"
            onClick={paginateRight}
            tabIndex="-1"
            aria-hidden="true">
            {pageIsRTL ? <CaretLeft size={20} /> : <CaretRight size={20} />}
          </button>
        </div>
      </div>
    </>
  );
};

HeaderNavContainer.propTypes = {
  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default HeaderNavContainer;
