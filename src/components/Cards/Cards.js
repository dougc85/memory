import { React, useEffect } from "react";
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
    shuffleSequence,
    cardTotal,
    handleLoad,
    cardsRef,
  } = props;

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
    //create array of Card components
    const cardList = [];
    Object.keys(cards).forEach((image, idx) => {
      cardList.push(<Card image={image} key={image} clickCard={clickCard} order={sequence[idx]} handleLoad={handleLoad} />);
    });

    for (let i = cardList.length - 1; i > 0; i--) {
      let j = Math.floor((Math.random() * (i + 1)));
      let temp = cardList[i];
      cardList[i] = cardList[j];
      cardList[j] = temp;
    }

    //organize those Card components into divs, 4 per
    const numDivs = cardTotal / 4;
    const divList = [];

    for (let i = 0; i < numDivs; i++) {
      const miniCardList = [];
      for (let j = 0; j < 4; j++) {
        miniCardList[j] = cardList.pop();
      }
      divList.push(<div className={`Cards-group`}>{miniCardList}</div>);
    }
    return divList;
  }

  return (
    <div className="Cards" ref={cardsRef} style={{ display: "none" }}>
      {renderCards()}
    </div>
  )
}

export default Cards;