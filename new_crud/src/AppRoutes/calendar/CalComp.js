import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calcomp() {
    const [selectedDate, setSelectedDate] = useState(null)
  return (
    <div className='App'>
        <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        monthPlaceholder
        placeholderText='dd/mm/yyyy'
        />      
    </div>
  )
}

export default Calcomp
