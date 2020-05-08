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

  const dataLength = data.length;
  let status = isRunning ? 'Running...' : 'Paused';
  let audio = new Audio('https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3');

  useEffect(() => {
    fitty('.timer__title');
    fitty('.timer__countdown');
    setTime(convertToReadableTime(countdown));
  }, []);

  useInterval(() => {
    setCountdown(countdown - 1);
    setTime(convertToReadableTime(countdown));

    if(countdown === 0) {
      // audio.play();
      if (currentTimerIndex < dataLength) {
        const newIndex = currentTimerIndex + 1;
        setcurrentTimerIndex(newIndex);
        setTitle(data[newIndex].title);
        setCountdown(convertToSeconds(data[newIndex]));
      }
    }
  }, (isRunning && (currentTimerIndex < dataLength) ) ? 1000 : null);

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
      <p className='timer__countdown'>{h}:{m}:{s} </p>
      <p className='timer__status'>{status}</p>
    </div>
  )
}

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
  }, [delay]);
};

const convertToSeconds = ({ hours, minutes, seconds }) => {
  return (hours * 3600) + (minutes * 60) + seconds;
}

const convertToReadableTime = (time = 0) => {
  const { floor } = Math;

  let seconds = floor((time) % 60);
  let minutes = floor((time / 60) % 60);
  let hours = floor((time / (60 * 60)) % 24);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  return {
    hours,
    minutes,
    seconds
  }
};