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

  const onChangeHandler = (e, id) =>{
    const { value, id: type } = e.target;
    const currentTimer = timers.filter((item) => item.id === id)[0];
    const mutatingValue = type !== 'title' ? parseInt(value, 10) : value;
    currentTimer[type] = mutatingValue;
  };

  console.log(timers);
  return (
    <ul>
      {timers.map((timer) => {
        const { hours, minutes, seconds, title, id } = timer;

        return (
          <TimerItem
            onSubmitFn={onSubmitHandler}
            onChangeFn={(e) => {
              onChangeHandler(e, id);
            }}
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