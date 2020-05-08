import React from "react";
import { Timer } from "../components/timer";
import { mock } from "../mock/index";

export const App = () => {
  return (
    <Timer
      data={mock}
    />
  );
}