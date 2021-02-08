import React from "react";
import Square from "./square";
import "./board.css";

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

export default Board