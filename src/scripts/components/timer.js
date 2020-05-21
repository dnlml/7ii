import React, { useState, useEffect, useRef } from "react";
import fitty from "fitty";
import KeyboardEventHandler from 'react-keyboard-event-handler';

export const Timer = ({ data }) => {
  const [currentTimerIndex, setcurrentTimerIndex] = useState(0);
  const currentData = data[currentTimerIndex] || { hours: 0, minutes: 0, seconds: 0, title: 'Finished'};
  const [countdown, setCountdown] = useState(convertToSeconds(currentData));
  const [isRunning, setRunning] = useState(true);
  const [{hours: h, minutes: m, seconds: s}, setTime] = useState(currentData);
  const [title, setTitle] = useState(currentData.title);

  const dataIndex = data.length - 1;
  let status = isRunning ? 'Running...' : 'Paused';
  let audio = new Audio('https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3');

  useEffect(() => {
    fitty('.timer__title');
    fitty('.timer__countdown');
    setTime(convertToReadableTime(countdown));
  }, []);

  useInterval(() => {
    const newCountdown = countdown - 1;
    setCountdown(newCountdown);
    setTime(convertToReadableTime(newCountdown));

    if (newCountdown === 0) {
      // audio.play();
      if (currentTimerIndex <= dataIndex) {
        const newIndex = currentTimerIndex + 1;
        const nextCountdown = data[newIndex];

        setcurrentTimerIndex(newIndex);

        if (nextCountdown) {
          setTitle(nextCountdown.title);
          setCountdown(convertToSeconds(nextCountdown));
        } else {
          setTitle('FINISHED');
          setTime(convertToReadableTime('', true));
          setRunning(false);
        }
      }
    }
  }, (isRunning && (currentTimerIndex <= dataIndex) ) ? 1000 : null);

  const onKeyDown = () => {
    setRunning(!isRunning);
  };

  return (
    <div className='timer' >
      <KeyboardEventHandler
        handleKeys={['space']}
        onKeyEvent={onKeyDown}
      />
      <h2 className='timer__title'>{title}</h2>
      <p className='timer__countdown'>
        {composeTime({ h, m, s })}
      </p>
      <p className='timer__status'>{(currentTimerIndex <= dataIndex) && status}</p>
    </div>
  )
};

const composeTime = ({ h, m, s }) => {
  let output = '';

  if ( h && m && s) {
    output = `${h}:${m}:${s}`;
  }

  return output;
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  });
};

const convertToSeconds = ({ hours, minutes, seconds }) => {
  return (hours * 3600) + (minutes * 60) + seconds;
}

const convertToReadableTime = (time = 0, empty = false) => {
  const { floor } = Math;

  let seconds = floor((time) % 60);
  let minutes = floor((time / 60) % 60);
  let hours = floor((time / (60 * 60)) % 24);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (empty) {
    hours = false;
    minutes = false;
    seconds = false;
  }

  return {
    hours,
    minutes,
    seconds
  }
};