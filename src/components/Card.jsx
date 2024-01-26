import '../styles/card.css';

export default function Card({ card, selectCard, isFlipped }) {
  return (
    <div className={isFlipped ? 'card flipped' : 'card'} onClick={() => selectCard(card)}>
      <img className="card__front" src={card.src} alt="card" />
      <img className="card__back" src="/images/Cover.png" alt="cover" />
    </div>
  );
}