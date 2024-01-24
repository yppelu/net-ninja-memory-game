import { useState, useEffect } from 'react';

import '../styles/app.css';

import Card from '../components/Card';

const images = [
  { 'src': '/images/helmet-1.png' },
  { 'src': '/images/potion-1.png' },
  { 'src': '/images/ring-1.png' },
  { 'src': '/images/scroll-1.png' },
  { 'src': '/images/shield-1.png' },
  { 'src': '/images/sword-1.png' }
];

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
    for (let i = 0; i < images.length; i++) {
      cards.push({ ...images[i], id: Math.random(), matched: false });
      cards.push({ ...images[i], id: Math.random(), matched: false });
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
      <p className="turns">Turn: {turns}</p>
    </>
  );
}

export default App;
