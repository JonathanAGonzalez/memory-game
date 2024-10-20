// Generar las cartas por nivel
const cardsEasy = generateCards(emojis, 6);
const cardsMedium = generateCards(emojis, 12);
const cardsHard = generateCards(emojis, 18);

let isChecking = false;
let currentCards = [...cardsEasy];

const table = document.querySelector('#table');
const level = document.querySelector('#level');

// Función para mostrar las cartas en la tabla
function cardsToLoop(cards) {
  table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas cartas

  cards.forEach((emoji) => {
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

  if (rotateCardCount.length < 2) return;

  isChecking = true;

  if (rotateCardCount[0].innerText === rotateCardCount[1].innerText) {
    rotateCardCount[0].classList.add('match-card');
    rotateCardCount[1].classList.add('match-card');
    audio.play();

    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star'],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle'],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);

    checkIfGameFinished();
    isChecking = false;
  } else {
    const listo = document.getElementById('listo');
    listo.play();
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

  if (matchedCards.length === currentCards.length) {
    let button = document.createElement('button');
    const tulo = document.getElementById('tulo');
    button.innerText = 'Volver a jugar';

    tulo.play();
    body.appendChild(button);

    button.addEventListener('click', () => {
      body.removeChild(button);
      resetGame();
    });
  }
}

const resetGame = () => {
  table.innerHTML = '';
  shuffleCards(currentCards);
  cardsToLoop(currentCards);
};

// Iniciar el juego
putCardOnTheTable();
