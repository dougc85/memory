import './App.scss';
import { useState, useEffect } from 'react';
import Rules from "./components/Rules/Rules";
import Cards from "./components/Cards/Cards";
import useToggle from './hooks/useToggle';
import axios from "axios";

function App() {

  const [startScreen, toggleStartScreen] = useToggle(true);
  const [cardTotal, setCardTotal] = useState(6);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);

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
  }

  const nextRound = () => {
    setCardTotal((currentTotal) => currentTotal + 4);
  }

  useEffect(() => {
    if (cardTotal === 6) {
      setScore(0);
    }
    fetchCards();
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
      />
      {startScreen && <Rules startGame={startGame} />}
    </div>
  );
}

export default App;


//"https://picsum.photos/id/227/140/160"