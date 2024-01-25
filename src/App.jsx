import { useState, useEffect } from 'react';

import '../styles/app.css';

import images from './images';
import Card from '../components/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCardOne, setSelectedCardOne] = useState(null);
  const [selectedCardTwo, setSelectedCardTwo] = useState(null);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    shuffle();
  }, []);

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

  function shuffle() {
    const cards = [];
    const usedIndexes = [];
    while (cards.length < 12) {
      const index = Math.floor(Math.random() * cards.length);
      if (!usedIndexes.includes(index)) {
        cards.push({ ...images[index], id: Math.random(), matched: false });
        cards.push({ ...images[index], id: Math.random(), matched: false });
        usedIndexes.push(index);
      }
    }
    cards.sort(() => Math.random() - 0.5);

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
        <button className="start-game-button" onClick={shuffle}>New Game</button>
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
