import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

// DayListItem component definition.
//
//    props.name       String:   Day name (e.g. Caturday).
//    props.spots      String:   Number of appointment timeslots available.
//    props.selected   Boolean:  Whether or not this day is selected in the sidebar.
//    props.setDay     Function: Callback that selects the day when it is clicked.

export default function DayListItem(props) {
  const listItemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected === true,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = (spots) => {
    return !spots || spots === 0
      ? 'no spots remaining'
      : `${spots} spot${spots === 1 ? '' : 's'} remaining`;
  };

  return (
    <li
      data-testid='day'
      className={listItemClass}
      onClick={() => props.setDay(props.name)}
    >
      {/* <li className={listItemClass} onClick={props.setDay}> */}
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}
