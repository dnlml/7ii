import React from 'react';

export const ListItem = () => {
  return (
    <li>
      <div>
        <input type="number" name="Hours" id="Hours" defaultValue='0'/>
        <label htmlFor="Hours">Hours</label>
        <input type="number" name="Minutes" id="Minutes" defaultValue='0' />
        <label htmlFor="Minutes">Minutes</label>
        <input type="number" name="Seconds" id="Seconds" defaultValue='0' />
        <label htmlFor="Seconds">Seconds</label>
        <input type="text" name="Title" id="Title" defaultValue='Title' />
        <label htmlFor="Title">Title</label>
      </div>
    </li>
  );
};