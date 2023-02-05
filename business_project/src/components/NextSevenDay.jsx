import React, { useState } from "react";
import { useEffect } from "react";

export default  function Next7DaysDropdown(props) {
    function getNext7Days() {
        const next7Days = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
          const nextDay = new Date(today.getTime());
          nextDay.setDate(today.getDate() + i);
          const year = nextDay.getFullYear();
          const month = nextDay.getMonth() + 1;
          const day = nextDay.getDate();
          next7Days.push(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        }
      
        return next7Days;
      } 
      const next7Days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(0);
  
 console.log(next7Days, "juu")
  
 const handleChange = (e) => {
    console.log(e.target.value)
    setSelectedDate(e.target.value);
    console.log(next7Days[selectedDate])
   
    console.log(next7Days[selectedDate])
    
  };
  useEffect(()=>{props.getUpData(next7Days[selectedDate])}, [selectedDate])
    
  return (
    <div>
      <select value={selectedDate} onChange={handleChange}>
        {next7Days.map((date, index) => (
          <option key={date} value={index}>
            {date}
          </option>
        ))}
      </select>
      
    </div>
  );
}