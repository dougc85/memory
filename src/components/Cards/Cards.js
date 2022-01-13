import { React, useEffect } from "react";
import "./Cards.scss";
import Card from "../Card/Card";

function Cards(props) {


  const { nextRound, resetGame, cards, fetchCards, setCards, setScore } = props;

  //Initialize first time
  useEffect(() => {
    fetchCards()
  }, []);

  const clickCard = (image) => {

    if (cards[image]) {
      resetGame();
    } else {
      setScore((oldScore) => {
        console.log(oldScore);
        return ++oldScore
      })
      setCards((oldCards) => {
        const newCards = {};
        for (const key of Object.keys(oldCards)) {
          if (key === image) {
            newCards[key] = true;
          } else {
            newCards[key] = oldCards[key];
          }
        }
        return newCards;
      })
    }
  }

  //Check for win condition
  useEffect(() => {
    if (cards.length === 0) {
      return;
    }
    for (const card in cards) {
      if (!cards[card]) {
        return
      }
    }
    nextRound();
    fetchCards();
  }, [cards]);

  return (
    <div className="Cards">
      {Object.keys(cards).map((image) => <Card image={image} key={image} clickCard={clickCard} />)}
    </div>
  )
}

export default Cards;