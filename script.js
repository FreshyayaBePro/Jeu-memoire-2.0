const startForm = document.getElementById('start-form');
const gameSection = document.getElementById('game-section');
const startScreen = document.getElementById('start-screen');
const gameBoard = document.getElementById('game-board');
const clickCountDisplay = document.getElementById('click-count');
const scoreDisplay = document.getElementById('score-value');
const victoryMessage = document.getElementById('victory-message');
const messageText = document.getElementById('message-text');
const playerNameInput = document.getElementById('player-name');
const playerNameDisplay = document.getElementById('player-name-display');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let clickCount = 0;
let score = 0;
let playerName = "";

startForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const difficulty = parseInt(document.getElementById('difficulty').value);
  const imageSet = document.getElementById('image-set').value;

  playerName = playerNameInput.value.trim();
  playerNameDisplay.textContent = playerName;

  document.body.className = '';
  document.body.classList.add(`theme-${imageSet}`);

  startScreen.classList.add('hidden');
  gameSection.classList.remove('hidden');

  initializeGame(difficulty, imageSet);
});

function initializeGame(gridSize, theme) {
  clickCount = 0;
  score = 0;
  matchedPairs = 0;
  totalPairs = (gridSize * gridSize) / 2;
  updateInfo();

  const images = [];
  for (let i = 1; i <= totalPairs; i++) {
    images.push(`assets/${theme}/${i}.jpg`);
  }

  const allImages = [...images, ...images].sort(() => 0.5 - Math.random());

  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  cards = [];

  allImages.forEach((imgSrc) => {
    const card = createCard(imgSrc);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function createCard(imgSrc) {
  const card = document.createElement('div');
  card.classList.add('memory-card');

  const inner = document.createElement('div');
  inner.classList.add('card-inner');

  const front = document.createElement('img');
  front.src = imgSrc;
  front.classList.add('front-face');

  const back = document.createElement('div');
  back.classList.add('back-face');

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener('click', () => flipCard(card));

  return card;
}

function flipCard(card) {
  if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);
  clickCount++;
  updateInfo();

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.front-face').src;
    const img2 = card2.querySelector('.front-face').src;

    if (img1 === img2) {
      matchedPairs++;
      score += 10;
      flippedCards = [];

      if (matchedPairs === totalPairs) {
        showVictory();
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
    updateInfo();
  }
}

function updateInfo() {
  clickCountDisplay.textContent = clickCount;
  scoreDisplay.textContent = score;
}

function showVictory() {
  messageText.textContent = `Félicitations ${playerName} ! Vous avez gagné avec ${score} points en ${clickCount} coups.`;
  victoryMessage.classList.remove('hidden');
  gameSection.classList.add('hidden');
}


function toggleTheme(){
    document.body.classList.toggle("dark");
}