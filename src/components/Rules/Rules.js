import React from 'react';

function Rules(props) {
  return (
    <div className="Rules">
      <div className="Rules-overlay" onClick={props.startGame}></div>
      <div className="Rules-box">
        <p>These are the rules! You gotta play the Clickeroo before it plays you! Dangerous play awaits even the most cautious traveller!</p>
        <button className="Rules-startbutton" onClick={props.startGame}>Got it!</button>
      </div>
    </div>
  );
}

export default Rules;