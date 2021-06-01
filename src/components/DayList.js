import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const {days, setDay} = props;
  
  return (
    <ul>
      {
        days.map((day) => {
          return <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={props.day === day.name}
            setDay={setDay}
          >   
          </DayListItem>
        })
      }
    </ul>
  );
}