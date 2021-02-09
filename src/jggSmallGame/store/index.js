import { observable, action } from "mobx";

class GameStore {
  @observable history = [
    {
      squares: Array(9).fill(null),
      row: null,
      col: null,
      bold: false,
    },
  ];
  @observable xIsNext = true;
  @observable stepNumber = 0;
  @observable reverse = false;
  @observable winnerLines = [];

  @action setHistory(history) {
    this.history = history;
  }

  @action setXIsNext() {
    this.xIsNext = !this.xIsNext;
  }

  @action setStepNumber(stepNumber) {
    this.stepNumber = stepNumber;
  }

  @action setReverse() {
    this.reverse = !this.reverse;
  }

  @action setWinnerLines(winnerLines) {
    this.winnerLines = winnerLines;
  }
}

export default new GameStore();
