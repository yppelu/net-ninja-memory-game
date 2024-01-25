import images from '../helpers/images';

export default function getCards() {
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
  return cards;
}
