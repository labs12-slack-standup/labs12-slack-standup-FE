import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';
import { isSameDay } from 'date-fns';

const DayPickerComp = props => (
  <div className="report-results-date-picker">
    <DayPickerSingleDateController
      numberOfMonths={1}
      noBorder={true}
      onDateChange={({_d}) => props.getByDate(_d)}
      isDayHighlighted={({_d}) => isSameDay(props.clickedDate,_d) ? true : false}
    />
  </div>
)

export default DayPickerComp

