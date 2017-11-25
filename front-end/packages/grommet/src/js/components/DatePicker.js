import React, { Component, PropTypes } from 'react';
import Calendar from 'rc-calendar';
import Picker from 'rc-calendar/lib/Picker';
import enUS from 'rc-calendar/lib/locale/en_US';
import CSSClassnames from '../utils/CSSClassnames';

import Button from './Button';
import CalendarIcon from './icons/magneto/Calendar';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const CLASS_ROOT = CSSClassnames.DATE_PICKER;
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    // this.clearSelectedDate = this.clearSelectedDate.bind(this)
  }

  onChange(value) {
    this.props.onSelect(value);
  }

  getDefaultValue(value) {
    if (value) {
      if (typeof value === 'string') {
        const splittedValue = value.split('/');
        const result = moment();
        result.year(Number(splittedValue[2]));
        result.month(Number(splittedValue[1]) - 1);
        result.date(Number(splittedValue[0]));
        return result;
      } else {
        return moment(value);
      }
    } else {
      return null;
    }
  }

  disabledDate(current) {
    if (!current) {
      // allow empty select
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.unix() < date.unix(); // can not select days before today
  }

  // clearSelectedDate(event) {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   this.onChange(null)
  // }

  render() {
    const { name, value, id, placeHolder, format } = this.props;
    let defaultValue = this.getDefaultValue(value);

    const calendar = (
      <Calendar
        locale={enUS}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder="please input"
        formatter="D/M/YYYY"
        showDateInput={false}
        disabledDate={this.disabledDate}
      />
    );

    return (
      <div className={CLASS_ROOT}>
        <div
          style={{
            boxSizing: 'border-box',
            position: 'relative',
            display: 'block',
            lineHeight: 1.5
          }}
        >
          <Picker
            animation="slide-up"
            disabled={false}
            calendar={calendar}
            value={defaultValue}
            onChange={this.onChange}
          >
            {({ value }) => {
              return (
                <span tabIndex="0">
                  <input
                    id={id}
                    name={name}
                    disabled={false}
                    readOnly
                    placeholder={placeHolder}
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={(value && value.format(format)) || ''}
                  />
                  <Button icon={<CalendarIcon size="small" />} onClick={() => {}} />
                </span>
              );
            }}
          </Picker>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  format: PropTypes.string,
  onSelect: PropTypes.func
};

DatePicker.defaultProps = {
  format: 'D/M/YYYY'
};

export default DatePicker;
