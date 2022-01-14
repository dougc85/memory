import './App.scss';
import { useState, useEffect } from 'react';
import Rules from "./components/Rules/Rules";
import Cards from "./components/Cards/Cards";
import useToggle from './hooks/useToggle';
import axios from "axios";

function App() {

  const INITIAL_NO_OF_CARDS = 4;

  const [startScreen, toggleStartScreen] = useToggle(true);
  const [cardTotal, setCardTotal] = useState(INITIAL_NO_OF_CARDS);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);

  const numArray = [];
  for (let i = 1; i <= INITIAL_NO_OF_CARDS; i++) {
    numArray.push(i);
  }

  const [sequence, setSequence] = useState([...numArray]);

  async function fetchCards() {
    const response = await axios.get("https://picsum.photos/list");
    const cardList = response.data;
    const cardListLength = cardList.length;
    const newCardImages = new Set();

    while (newCardImages.size < cardTotal) {
      const index = Math.floor(Math.random() * cardListLength);
      const id = cardList[index].id;
      newCardImages.add(`https://picsum.photos/id/${id}/140/160`)
    }

    const newCards = {};
    for (const image of newCardImages) {
      newCards[image] = false;
    }
    setCards(newCards);
  }

  const startGame = (e) => {
    if (e.target === document.querySelector(".Rules-startbutton") ||
      e.target === document.querySelector(".Rules-overlay")) {
      toggleStartScreen();
    }
  }

  const resetGame = () => {
    toggleStartScreen();
    setCardTotal(6);
    setScore(0);
  }

  const shuffleSequence = () => {

    const sequenceList = [...sequence];

    for (let i = sequenceList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = sequenceList[i];
      sequenceList[i] = sequenceList[j];
      sequenceList[j] = temp;
    }

    setSequence(sequenceList);
  }

  const nextRound = () => {
    setCardTotal((currentTotal) => currentTotal + 4);
  }

  //Get new cards on reset
  useEffect(() => {
    if (score === 0) {
      fetchCards();
    }
  }, [score])

  //Get new cards on new round
  useEffect(() => {
    fetchCards();

    const numArray = [];
    for (let i = 1; i <= cardTotal; i++) {
      numArray.push(i);
    }
    setSequence([...numArray]);
  }, [cardTotal])

  return (
    <div className="App">
      <h1>Memory Clickeroo</h1>
      <p>Score: {`${score}`}</p>
      <Cards cardTotal={cardTotal}
        setCardTotal={setCardTotal}
        resetGame={resetGame}
        nextRound={nextRound}
        cards={cards}
        setCards={setCards}
        fetchCards={fetchCards}
        setScore={setScore}
        sequence={sequence}
        shuffleSequence={shuffleSequence}
      />
      {startScreen && <Rules startGame={startGame} />}
    </div>
  );
}

export default App;


//"https://picsum.photos/id/227/140/160"