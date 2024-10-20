// Actualizar la tabla de cartas según el nivel
function putCardOnTheTable() {
  level.addEventListener('change', (event) => {
    switch (event.target.value) {
      case 'easy':
        currentCards = shuffleCards([...cardsEasy]);
        break;

      case 'medium':
        currentCards = shuffleCards([...cardsMedium]);
        break;

      case 'hard':
        currentCards = shuffleCards([...cardsHard]);
        break;

      default:
        currentCards = shuffleCards([...cardsEasy]);
        break;
    }
    cardsToLoop(currentCards);
  });
}
