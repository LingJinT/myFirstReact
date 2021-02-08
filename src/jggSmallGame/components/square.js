import React from "react";
import "./square.css";

function Square(props) {
    return (
      <button className="square" onClick={props.onClick} style={props.winnerStyle}>
        {props.value}
      </button>
    );
}

export default Square