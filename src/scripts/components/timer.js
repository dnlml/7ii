import React, { useState, useEffect } from "react";
import fitty from "fitty";
import KeyboardEventHandler from 'react-keyboard-event-handler';

export const Timer = ({
  hours,
  minutes,
  seconds,
  title
}) => {
  let [countdown, setCountdown] = useState(convertToSeconds({ hours, minutes, seconds }));
  let [isPaused, setPause] = useState(false);
  let [hasPLayed, setPlay] = useState(false);

  let status = isPaused ? 'Paused' : 'Running...';
  let audio = new Audio('https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3');

  useEffect(() => {
    fitty('.timer__title');
    fitty('.timer__countdown');
  }, []);

  useEffect(() => {
    const decreaseCountdown = setInterval(() => {
      if (!isPaused) {
        const newCountdownValue = (countdown) => countdown - 1;
        setCountdown(newCountdownValue);
      }
    }, 1000);

    if (!countdown) {
      clearInterval(decreaseCountdown);

      if(!hasPLayed) {
        audio.play();
        setPlay(true);
      }
    }

    return () => clearInterval(decreaseCountdown);
  }, [countdown, isPaused]);

  const { hours:h, minutes:m, seconds:s } = convertToReadableTime(countdown);

  const onKeyDown = () => {
    setPause(!isPaused);
  };

  return (
    <div className='timer' >
      <KeyboardEventHandler
        handleKeys={['space']}
        onKeyEvent={onKeyDown}
      />
      <h2 className='timer__title'>{title}</h2>
      <p className='timer__countdown'>{h}:{m}:{s} </p>
      <p className='timer__status'>{!countdown ? 'Finished' : status}</p>
    </div>
  )
}

const convertToSeconds = ({
  hours: h,
  minutes: m,
  seconds: s
}) => {
  const hours = h * 3600;
  const minutes = m * 60;
  const seconds = s;

  return hours + minutes + seconds;
};

const convertToReadableTime = (time) => {
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