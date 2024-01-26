import images from './images';

export default function getCards(numberOfCards) {
  const cards = [];
  const usedIndexes = [];
  while (cards.length < numberOfCards * 2) {
    const index = Math.floor(Math.random() * images.length);
    if (!usedIndexes.includes(index)) {
      cards.push({ ...images[index], id: Math.random(), matched: false });
      cards.push({ ...images[index], id: Math.random(), matched: false });
      usedIndexes.push(index);
    }
  }
  cards.sort(() => Math.random() - 0.5);
  return cards;
}
