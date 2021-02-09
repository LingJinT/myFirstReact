import { observable, action } from "mobx";
import { calculateWinner } from "../methods/index";

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

  @action handleClick(i) {
    const history = this.history.slice(0, this.stepNumber + 1);
    const current = history[this.stepNumber];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner) {
      this.winnerLines = winner.lines;
      return;
    }
    if (squares[i]) {
      return;
    }
    squares[i] = this.xIsNext ? "X" : "O";
    this.history = history.concat([
      {
        squares: squares,
        row: parseInt(i / 3) + 1,
        col: (i % 3) + 1,
      },
    ]);
    this.stepNumber = history.length;
    this.xIsNext = !this.xIsNext;
  }

  @action jumpTo(step) {
    this.stepNumber = step;
    this.xIsNext = step % 2 === 0;
    this.winnerLines = [];
  }

  @action reverse() {
    const status = this.reverse;
    this.reverse = !status;
  }
}

export default new GameStore();
