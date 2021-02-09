import React from "react";
import ReactDOM from "react-dom";
import Game from "./jggSmallGame";
import { Provider } from "mobx-react";
import GameStore from "./jggSmallGame/store/index.js"

const stores = {
    GameStore,
}

ReactDOM.render(
  <Provider {...stores}>
    <Game />
  </Provider>,
  document.getElementById("root")
);
