import React from "react";
import { Timer } from "../components/timer/timer";
import { ListItem } from "../components/listitem/listitem";
import { mock } from "../mock/index";

export const App = () => {
  return (
    <>
      <ListItem />
      <Timer
        data={mock}
      />
    </>
  );
}