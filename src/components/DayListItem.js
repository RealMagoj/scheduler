import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const {selected, spots, name,setDay} = props;
  
  const dayClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected": selected,
      "day-list__item--full": spots === 0
    }
  );

  const formatSpots = (spots) => {
    if (spots === 1) {
      return '1 spot remaining';
    } else if (spots > 1) {
      return `${spots} spots remaining`;
    } else {
      return 'no spots remaining';
    }
  };

  return (
    <li
      className={dayClass}
      selected={selected}
      onClick={() => {setDay(name)}}
    >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}