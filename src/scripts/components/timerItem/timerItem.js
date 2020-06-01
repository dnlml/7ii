import React from 'react';

export const TimerItem = ({ title, hours, minutes, seconds, onSubmitFn}) => {
  return (
    <li>
      <form onSubmit={onSubmitFn}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" defaultValue={title} />
        <br />
        <label htmlFor="hours">Hours</label>
        <input type="number" name="hours" id="hours" defaultValue={hours} />
        <br />
        <label htmlFor="minutes">Minutes</label>
        <input type="number" name="minutes" id="minutes" defaultValue={minutes} />
        <br />
        <label htmlFor="seconds">Seconds</label>
        <input type="number" name="seconds" id="seconds" defaultValue={seconds} />
        <br />
        <button type="submit">+</button>
      </form>
    </li>
  );
};
