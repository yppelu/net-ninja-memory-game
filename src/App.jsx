import { useState, useEffect } from 'react';
import getCards from '../helpers/getCards';

import '../styles/app.css';

import Card from '../components/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCardOne, setSelectedCardOne] = useState(null);
  const [selectedCardTwo, setSelectedCardTwo] = useState(null);
  const [turns, setTurns] = useState(0);

  useEffect(startGame, []);

  useEffect(() => {
    if (selectedCardOne && selectedCardTwo) {
      if (selectedCardOne.src === selectedCardTwo.src) {
        selectedCardOne.matched = true;
        selectedCardTwo.matched = true;
      }
      setTimeout(() => {
        setSelectedCardOne(null);
        setSelectedCardTwo(null);
        setTurns(turns + 1);
      }, 750);
    }
  }, [selectedCardOne, selectedCardTwo, turns]);

  function startGame() {
    const cards = getCards();

    setSelectedCardOne(null);
    setSelectedCardTwo(null);
    setTurns(0);
    setCards(cards);
  }

  function handleSelectCard(card) {
    if (!selectedCardOne || !selectedCardTwo) {
      if (card !== selectedCardOne && card !== selectedCardTwo && !card.matched) {
        selectedCardOne ? setSelectedCardTwo(card) : setSelectedCardOne(card);
      }
    }
  }

  return (
    <>
      <header className="header">
        <h1 className="game-title">Magic Match</h1>
        <button className="start-game-button" onClick={startGame}>New Game</button>
      </header>
      <main className="game-field">
        {cards.map(card =>
          <Card
            key={card.id}
            card={card}
            selectCard={handleSelectCard}
            isFlipped={selectedCardOne === card || selectedCardTwo === card || card.matched}
          />)}
      </main>
      <p className="turns">Turns: {turns}</p>
    </>
  );
}

export default App;
