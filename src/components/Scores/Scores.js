import React from "react";
import "./Scores.scss";

function Scores(props) {

  const { score, highScore } = props;
  return (
    <div className="Scores">
      <p className="Scores-high">High Score: {`${highScore}`}</p>
      <p className="Scores-current">Current Score: {`${score}`} </p>
    </div>
  )
}

export default Scores;