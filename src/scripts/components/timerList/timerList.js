import React, { useState } from 'react';
import { TimerItem } from '../timerItem/timerItem';
import { convertToSeconds } from '../../utils/convertToSeconds';

export const TimerList = () => {
  const [timers, addTimer] = useState([{
    id: Date.now(),
    title: '',
    hours: 0,
    minutes: 0,
    seconds: 0
  }]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const rawData = new FormData(e.target);
    let newTimer = {
      id: Date.now()
    };

    for (const [key, value] of rawData.entries()) {
      newTimer[key] = key !== 'title' ? parseInt(value, 10) : value;
    }

    if (convertToSeconds({ ...newTimer }) > 0) {
      addTimer([...timers, newTimer]);
    } else {
      alert('Please add a timer with at lease 1 second');
    }
  };

  console.log(timers);
  return (
    <ul>
      {timers.map((timer) => {
        const { hours, minutes, seconds, title, id } = timer;

        return (
          <TimerItem
            onSubmitFn={onSubmitHandler}
            key={id}
            title={title}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        );
      })}
    </ul>
  )
};