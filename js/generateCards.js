const generateCards = (baseEmojis, pairCount) => {
  const selectedEmojis = getRandomEmojis(baseEmojis, pairCount);
  return [...selectedEmojis, ...selectedEmojis]; // Duplica las cartas
};
