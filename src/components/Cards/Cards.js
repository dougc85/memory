import { React, useEffect, useState } from "react";
import "./Cards.scss";
import Card from "../Card/Card";

function Cards(props) {

  const { nextRound,
    resetGame,
    cards,
    fetchCards,
    setCards,
    setScore,
    sequence,
    shuffleSequence } = props;

  //Initialize first time
  useEffect(() => {
    fetchCards()
  }, []);

  const clickCard = (image) => {

    if (cards[image]) {
      resetGame();
    } else {
      setScore((oldScore) => {
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
        shuffleSequence();
        return
      }
    }
    nextRound();
  }, [cards]);

  const renderCards = () => {
    const cardList = [];
    Object.keys(cards).forEach((image, idx) => {
      cardList.push(<Card image={image} key={image} clickCard={clickCard} order={sequence[idx]} />);
    });

    return cardList;
  }

  return (
    <div className="Cards">
      {renderCards()}
    </div>
  )
}

export default Cards;