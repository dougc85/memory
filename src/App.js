import './App.css';
import { useState } from 'react';
import Rules from "./components/Rules/Rules";
import Cards from "./components/Cards/Cards";

function App() {

  const [startScreen, setStartScreen] = useState(true);

  const startGame = (e) => {
    if (e.target === document.querySelector(".Rules")) {
      setStartScreen(false);
    }
  }

  return (
    <div className="App">
      <h1>Memory Clickeroo</h1>
      <Cards />
      {startScreen && <Rules startGame={startGame} />}
    </div>
  );
}

export default App;


//"https://picsum.photos/id/227/140/160"