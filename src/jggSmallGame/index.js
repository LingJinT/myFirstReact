import React from "react";
import Board from "./components/board.js";
import { calculateWinner } from "./methods/index";
import "./index.css";
import { inject, observer } from "mobx-react";

@inject("GameStore")
@observer
class Game extends React.Component {
  componentWillMount() {
    console.log("I will re-render, since the todo has changed!");
  }
  handleClick(i) {
    const history = this.props.GameStore.history;
    const stepNumber = this.props.GameStore.stepNumber
    console.log(stepNumber);
    const current = history[stepNumber];
    console.log(current);
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner) {
      // this.setState({
      //   winnerLines: winner.lines,
      // });
      this.props.GameStore.setWinnerLines(winner.lines);
      return;
    }
    if (squares[i]) {
      return;
    }
    squares[i] = this.props.GameStore.xIsNext ? "X" : "O";
    const newHistory = history.concat([
      {
        squares: squares,
        row: parseInt(i / 3) + 1,
        col: (i % 3) + 1,
      },
    ]);
    console.log(newHistory);
    this.props.GameStore.setHistory(newHistory);
    this.props.GameStore.setStepNumber(history.length);
    this.props.GameStore.setXIsNext();
    // this.setState({
    //   history: history.concat([
    //     {
    //       squares: squares,
    //       row: parseInt(i / 3) + 1,
    //       col: (i % 3) + 1,
    //     },
    //   ]),
    //   stepNumber: history.length,
    //   xIsNext: !this.state.xIsNext,
    // });
  }
  jumpTo(step) {
    // this.setState({
    //   stepNumber: step,
    //   xIsNext: step % 2 === 0,
    //   winnerLines: [],
    // });

    this.props.GameStore.setStepNumber(step);
    this.props.GameStore.setXIsNext(step % 2 === 0);
    this.props.GameStore.setWinnerLines([]);
  }
  reverse() {
    // const status = this.state.reverse;
    // this.setState({
    //   reverse: !status,
    // });
    this.props.GameStore.setReverse();
  }
  render() {
    const {
      history,
      xIsNext,
      stepNumber,
      winnerLines,
      reverse,
    } = this.props.GameStore;
    const current = history[stepNumber];
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
            className={move === stepNumber ? "bold" : ""}
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
      status = `next player ${xIsNext ? "X" : "O"}`;
    }
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
          <ol>{reverse ? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
