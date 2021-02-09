import React from "react";
import "./square.css";
import { inject, observer } from "mobx-react";

// const Square = observer((props) => {
//   return (
    
//   );
// });

@inject("GameStore")
@observer
class Square extends React.Component {
  componentWillMount() {
    console.log("I will re-render, since the todo has changed!");
  }
  render() {
    return (
      <button
      className="square"
      onClick={this.props.onClick}
      style={this.props.winnerStyle}
      >
        {this.props.value}
      </button>
    )
  }
}

export default Square;
