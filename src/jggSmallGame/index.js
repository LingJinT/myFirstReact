import React from "react";
import Board from "./components/board.js";
import { calculateWinner } from "./methods/index";
import "./index.css";
import { inject, observer } from "mobx-react";

@inject("GameStore")
@observer
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: null,
          col: null,
          bold: false,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      reverse: false,
      winnerLines: [],
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({
        winnerLines: winner.lines,
      });
      return;
    }
    if (squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          row: parseInt(i / 3) + 1,
          col: (i % 3) + 1,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winnerLines: [],
    });
  }
  reverse() {
    const status = this.state.reverse;
    this.setState({
      reverse: !status,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerLines = this.state.winnerLines;
    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move # ${move} (${step.row},${step.col})`
        : "Go to start";
      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}
            className={move === this.state.stepNumber ? "bold" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });
    let status;
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = `winner ${winner.name}`;
    } else {
      status = `next player ${this.state.xIsNext ? "X" : "O"}`;
    }
    console.log(history.length);
    if (history.length === 10) {
      status = "ping";
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerLines={winnerLines}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div className="headerInfo">
            <div className="text">{status}</div>
            <button
              onClick={() => {
                this.reverse();
              }}
            >
              reverse
            </button>
          </div>
          <ol>{this.state.reverse ? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;