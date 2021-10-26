import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const listItemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected === true,
    'day-list__item--full': props.spots === 0,
  });
  return (
    <li className={listItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{props.spots} spots remaining</h3>
    </li>
  );
}
