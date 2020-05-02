import React from "react";
import { Timer } from "../components/timer";

export const App = () => {
  const hours = 0;
  const minutes = 0;
  const seconds = 5;

  return (
    <Timer
      title='My first Title'
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
}