import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// square 组件
function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.winnerStyle}>
      {props.value}
    </button>
  );
}

// board 组件
class Board extends React.Component {
  renderSquare(i) {
    return (
      Array(3).fill(null).map((item, index)=>{
        const winnerStyle = this.props.winnerLines.includes(i+index)? {color: 'red'} : {}
        return (
          <Square
            key={index}
            value={this.props.squares[i+index]}
            winnerStyle={winnerStyle}
            onClick={() => {
              this.props.onClick(i+index);
            }}
          />
        )
      })
    );
  }

  render() {
    return (
      Array(3).fill(null).map((item,index) => {
        return (
          <div className="board-row" key={index}>
            {this.renderSquare(index*3)}
          </div>
        )
      })
    );
  }
}

// game组件
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
      winnerLines: []
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice()
    const winner = calculateWinner(squares)
    if (winner) {
      this.setState({
        winnerLines: winner.lines
      })
      return;
    }
    if(squares[i]) {
      return
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
      winnerLines: []
    });
  }
  reverse() {
    const status = this.state.reverse
    this.setState({
      reverse: !status
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerLines = this.state.winnerLines
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
            className = {move === this.state.stepNumber? 'bold' : ''}
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
    if(history.length === 10) {
      status = 'ping'
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
            <button onClick={()=>{
              this.reverse()
            }}>reverse</button>
          </div>
          <ol>{this.state.reverse? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        name: squares[a],
        lines: lines[i]
      };
    }
  }
  return null;
}
