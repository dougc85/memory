import React from 'react';
import './Rules.scss';

function Rules(props) {
  return (
    <div className="Rules">
      <div className="Rules-overlay" onClick={props.startGame}>
        <div className="Rules-box">
          <div className="Rules-box-border">
            <h2 className="Rules-box-title">Mnemonic Clickeroo</h2>
            <p className="Rules-box-rules">You will be shown a set of cards.  Your goal is to click each card one time, without ever clicking the same card twice. If you manage to click every card, the next round will start with more cards. Try to beat the high score.  Good luck!  <span>*Note: you do not have to remember cards you clicked in previous rounds.</span></p>
            <button className="Rules-startbutton" onClick={props.startGame}>Got it!</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Rules;