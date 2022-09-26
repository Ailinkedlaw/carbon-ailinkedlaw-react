/* eslint-disable indent */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';
import { SideNavItems, SideNavLink } from '@carbon/react';
import * as dayjs from 'dayjs';

const FlatpickrDate = (props) => {
  const { inputDom, open, start, end, setValue_callBack } = props;
  let picker;

  const handleClose = (selectedDates, dateStr, instance) => {
    const start = dayjs(selectedDates[0]).format('YYYY-MM-DD');
    const end = dayjs(selectedDates[1]).format('YYYY-MM-DD');
    setValue_callBack({ start, end });
  };

  const handleChange = (selectedDates, dateStr, instance) => {
  };

  /**
   * 快捷点击
   * @param {*} type
   */
   const handleFastClick = (type) => {
    let start, end;
    switch (type) {
      case 'current_month':
        start = dayjs().startOf('month').format('YYYY-MM-DD');
        end = dayjs().endOf('month').format('YYYY-MM-DD');
        break;
      case 'last_month':
        start = dayjs().add(-1, 'months').startOf('month').format('YYYY-MM-DD');
        end = dayjs().add(-1, 'months').endOf('month').format('YYYY-MM-DD');
        break;
      case 'current_quarter':
        const {curStart,curEnd} = getQuarter()
        start = curStart;
        end = curEnd;
        break;
      case 'last_quarter':
        const {lastStart,lastEnd} = getQuarter()
        start = lastStart;
        end = lastEnd;
        break;
      case 'current_year':
        start = dayjs().startOf('year').format('YYYY-MM-DD');
        end = dayjs().endOf('year').format('YYYY-MM-DD');
        break;
      case 'last_year':
        start = dayjs().add(-1, 'years').startOf('year').format('YYYY-MM-DD');
        end = dayjs().add(-1, 'years').endOf('year').format('YYYY-MM-DD');
        break;
      case 'before_year':
        start = dayjs().add(-2, 'years').startOf('year').format('YYYY-MM-DD');
        end = dayjs().add(-2, 'years').endOf('year').format('YYYY-MM-DD');
        break;
      default:
        break;
    }

    picker.setDate([start, end]);
    setValue_callBack({ start, end });
  };

  /**
   * 获取本季度与上一季度
   */
  const getQuarter = () => {
    let ret = {
      curStart: '',
      curEnd: '',
      lastStart: '',
      lastEnd: '',
    };

    let curMonth = dayjs().month() + 1;
    if (curMonth <= 3) {
      ret.curStart = dayjs().month(0).format('YYYY-MM-DD');
      ret.curEnd = dayjs().month(2).endOf('month').format('YYYY-MM-DD');
      ret.lastStart = dayjs().add(-1, 'year').month(9).format('YYYY-MM-DD');
      ret.lastEnd = dayjs().add(-1, 'year').month(11).endOf('month').format('YYYY-MM-DD');
    } else if (curMonth <= 6) {
      ret.curStart = dayjs().month(3).format('YYYY-MM-DD');
      ret.curEnd = dayjs().month(5).endOf('month').format('YYYY-MM-DD');
      ret.lastStart = dayjs().month(0).format('YYYY-MM-DD');
      ret.lastEnd = dayjs().month(2).endOf('month').format('YYYY-MM-DD');
    } else if (curMonth <= 9) {
      ret.curStart = dayjs().month(6).format('YYYY-MM-DD');
      ret.curEnd = dayjs().month(8).endOf('month').format('YYYY-MM-DD');
      ret.lastStart = dayjs().month(3).format('YYYY-MM-DD');
      ret.lastEnd = dayjs().month(5).endOf('month').format('YYYY-MM-DD');
    } else if (curMonth <= 12) {
      ret.curStart = dayjs().month(9).format('YYYY-MM-DD');
      ret.curEnd = dayjs().month(11).endOf('month').format('YYYY-MM-DD');
      ret.lastStart = dayjs().month(6).format('YYYY-MM-DD');
      ret.lastEnd = dayjs().month(8).endOf('month').format('YYYY-MM-DD');
    }

    return ret;
  };

  useEffect(() => {
    picker = flatpickr(inputDom, {
      appendTo: picker01,
      clickOpens: false,
      mode: 'range',
      dateFormat: 'Y-m-d',
      defaultDate: [start, end],
      onClose: handleClose,
      onChange: handleChange,
    });
    picker.open();
  }, [open]);

  return (
    <div id="picker01" className="picker-div">
      <div className="sider-box">
        <SideNavItems>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('current_month')}>
            这个月
          </SideNavLink>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('last_month')}>
            上个月
          </SideNavLink>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('current_quarter')}>
            当季
          </SideNavLink>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('last_quarter')}>
            上季度
          </SideNavLink>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('current_year')}>
            今年
          </SideNavLink>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('last_year')}>
            去年
          </SideNavLink>
          <SideNavLink className="p-nav" onClick={() => handleFastClick('before_year')}>
            前年
          </SideNavLink>
        </SideNavItems>
      </div>
    </div>
  );
};

export default FlatpickrDate;
