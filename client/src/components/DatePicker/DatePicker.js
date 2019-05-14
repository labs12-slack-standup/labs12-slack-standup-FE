import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';


const DayPickerComp = props => (
  <div style={defaultHeight}>
    <SingleDatePicker
      onFocusChange={true}
      numberOfMonths={1}
    />
  </div>
)

export default DayPickerComp


const defaultHeight = {
  height: '331px'
}

