import { useState, useEffect } from 'react';
import getCards from './helpers/getCards.js';

import './styles/app.css';

import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCardOne, setSelectedCardOne] = useState(null);
  const [selectedCardTwo, setSelectedCardTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(startGame, [difficulty]);

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
    let numberOfCards;
    switch (difficulty) {
      case 'easy':
        numberOfCards = 6;
        break;
      case 'medium':
        numberOfCards = 10;
        break;
      case 'hard':
        numberOfCards = 15;
        break;
      default:
        numberOfCards = 6;
        break;
    }
    const cards = getCards(numberOfCards);

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
        <div className="set-difficulty-buttons-container">
          <button
            className={`set-difficulty-button ${difficulty === 'easy' ? 'chosen' : ''}`}
            onClick={() => setDifficulty('easy')}
          >
            Easy
          </button>
          <button
            className={`set-difficulty-button ${difficulty === 'medium' ? 'chosen' : ''}`}
            onClick={() => setDifficulty('medium')}
          >
            Medium
          </button>
          <button
            className={`set-difficulty-button ${difficulty === 'hard' ? 'chosen' : ''}`}
            onClick={() => setDifficulty('hard')}
          >
            Hard
          </button>
        </div>
        <button
          className="start-game-button"
          onClick={
            () => {
              const cardOnBoard = document.getElementsByClassName('card');
              for (let i = 0; i < cardOnBoard.length; i++) {
                cardOnBoard[i].classList.remove('flipped');
              }
              setTimeout(startGame, 400);
            }
          }
        >
          New Game
        </button>
      </header>
      <main className={`game-field ${difficulty}`}>
        {cards.map(card =>
          <Card
            key={card.id}
            card={card}
            selectCard={handleSelectCard}
            difficulty={difficulty}
            isFlipped={selectedCardOne === card || selectedCardTwo === card || card.matched}
          />)}
      </main>
      <p className="turns">Turns: {turns}</p>
    </>
  );
}

export default App;
