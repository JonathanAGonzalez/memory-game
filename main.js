// const emojis = [
//   '🤡',
//   '👻',
//   '👺',
//   '💩',
//   '☠️',
//   '💨',
//   '🧠',
//   '❤️‍🔥',
//   '🙊',
//   '🙉',
//   '🤠',
//   '👾',
//   '🤖',
//   '🤪',
//   '🥶',
//   '😎',
//   '👿',
//   '😍',
// ];
const emojis = ['🤡', '👻'];
const doubleEmojis = [...emojis, ...emojis];
let isChecking = false;
const table = document.querySelector('#table');

function putCardOnTheTable() {
  doubleEmojis.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.addEventListener('click', (event) => {
      if (
        !isChecking &&
        !card.classList.contains('rotate-card') &&
        !card.classList.contains('match-card')
      ) {
        card.classList.add('rotate-card');
        card.innerText = emoji;
        getCard(event);
      }
    });

    table.appendChild(card);
  });
}

function getCard() {
  const rotateCardCount = document.querySelectorAll(
    '.rotate-card:not(.match-card)'
  );

  const audio = document.getElementById('eh');

  if (rotateCardCount.length < 2) {
    return;
  }

  isChecking = true;

  if (rotateCardCount[0].innerText === rotateCardCount[1].innerText) {
    rotateCardCount[0].classList.add('match-card');
    rotateCardCount[1].classList.add('match-card');
    audio.play();

    checkIfGameFinished();

    isChecking = false;
  } else {
    setTimeout(() => {
      rotateCardCount[0].classList.remove('rotate-card');
      rotateCardCount[1].classList.remove('rotate-card');
      rotateCardCount[0].innerText = '';
      rotateCardCount[1].innerText = '';

      isChecking = false;
    }, 1000);
  }
}

function checkIfGameFinished() {
  const matchedCards = document.querySelectorAll('.match-card');
  const body = document.querySelector('body');
  if (matchedCards.length === doubleEmojis.length) {
    let button = document.createElement('button');
    button.innerText = 'Volver a jugar';

    body.appendChild(button);
    button.addEventListener('click', () => {
      body.removeChild(button);
      resetGame();
    });
  }
}

const resetGame = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.remove();
  });

  shuffleCards();
  putCardOnTheTable();
};

function shuffleCards() {
  doubleEmojis.sort(() => Math.random() - 0.5);
}

shuffleCards();
putCardOnTheTable();
