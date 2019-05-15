import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPicker } from 'react-dates';


const DayPickerComp = props => (
  <div style={defaultHeight}>
    <DayPicker
      onDayClick={({_d}) => props.getByDate(_d)}
      numberOfMonths={1}
      noBorder={true}
    />
  </div>
)

export default DayPickerComp


const defaultHeight = {
  height: '331px'
}

