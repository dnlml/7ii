import React from "react";
import { Timer } from "../components/timer/timer";
import { TimerList } from "../components/timerList/timerList";
import { mock } from "../mock/index";

export const App = () => {
  return (
    <ul>
      <TimerList />
      {/* <Timer
        data={mock}
      /> */}
    </ul>
  );
}