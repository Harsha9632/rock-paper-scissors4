const gameOptions = document.getElementById('game-options');
const gameResult = document.getElementById('game-result');
const hurrayScreen = document.getElementById('hurray-page');

const computerScoreSpan = document.getElementById('computer-score');
const yourScoreSpan = document.getElementById('your-score');

const optionCircles = document.querySelectorAll('.option-circle');

const yourChoiceCircle = document.querySelector('.result-circle.your-choice');
const yourChoiceEmoji = yourChoiceCircle.querySelector('.chosen-emoji');
const computerChoiceCircle = document.querySelector('.result-circle.computer-choice');
const computerChoiceEmoji = computerChoiceCircle.querySelector('.chosen-emoji');

const resultMain = document.querySelector('.result-text .win-main');
const resultSub = document.querySelector('.result-text .win-sub');


const playAgainButton = document.getElementById('play-again-button');
const playAgainFromHurray = document.getElementById('play-again-from-hurray');
const nextButton = document.getElementById('next-button');

const rulesButton = document.getElementById('rules-button');
const rulesDialog = document.getElementById('rules-dialog');
const closeRulesButton = document.getElementById('close-rules-button');

const scoreBoard = document.querySelector('.score-board');

let yourScore = 0;
let computerScore = 0;
let lastResult = "";



const choices = {
  rock: {
    beats: ['scissors'],
    imgSrc: 'assets/rock-svg.svg',
    borderColor: 'var(--circle-border-blue)'
  },
  paper: {
    beats: ['rock'],
    imgSrc: 'assets/paper.svg',
    borderColor: 'var(--circle-border-orange)'
  },
  scissors: {
    beats: ['paper'],
    imgSrc: 'assets/scissor.svg',
    borderColor: 'var(--circle-border-purple)'
  }
};

function saveScores() {
  localStorage.setItem('yourScore', yourScore);
  localStorage.setItem('computerScore', computerScore);
}

function loadScores() {
  const savedYour = localStorage.getItem('yourScore');
  const savedComputer = localStorage.getItem('computerScore');
  if (savedYour !== null) {
    yourScore = parseInt(savedYour, 10);
    yourScoreSpan.textContent = yourScore;
  }
  if (savedComputer !== null) {
    computerScore = parseInt(savedComputer, 10);
    computerScoreSpan.textContent = computerScore;
  }
}

function showGameOptions() {
  gameOptions.classList.remove('hidden');
  gameResult.classList.add('hidden');
  hurrayScreen.classList.add('hidden');
  nextButton.classList.add('hidden');
  rulesButton.style.display = 'block';
  scoreBoard.style.display = 'flex';
  document.querySelector('header').style.display = 'flex';

  ['rock', 'paper', 'scissors', 'winner'].forEach(c => {
    yourChoiceCircle.classList.remove(c);
    computerChoiceCircle.classList.remove(c);
  });
  clearPulses(yourChoiceCircle);
  clearPulses(computerChoiceCircle);
}

function showGameResult() {
  gameOptions.classList.add('hidden');
  gameResult.classList.remove('hidden');
  hurrayScreen.classList.add('hidden');
  rulesButton.style.display = 'block';
  scoreBoard.style.display = 'flex';
  document.querySelector('header').style.display = 'flex';
}

function showHurrayScreen() {
  gameOptions.classList.add('hidden');
  gameResult.classList.add('hidden');
  hurrayScreen.classList.remove('hidden');
  nextButton.classList.add('hidden');
  rulesButton.style.display = 'block';
  scoreBoard.style.display = 'none';
  document.querySelector('header').style.display = 'none';
}

function getComputerChoice() {
  const keys = Object.keys(choices);
  return keys[Math.floor(Math.random() * keys.length)];
}

function determineWinner(player, comp) {
  if (player === comp) return 'tie';
  if (choices[player].beats.includes(comp)) return 'win';
  return 'lose';
}

function updateScores(result) {
  if (result === 'win') {
    yourScore++;
    yourScoreSpan.textContent = yourScore;
  } else if (result === 'lose') {
    computerScore++;
    computerScoreSpan.textContent = computerScore;
  }
  saveScores();
}

function clearPulses(circleEl) {
  const existing = circleEl.querySelectorAll('.pulse');
  existing.forEach(e => e.remove());
}

function addPulses(circleEl) {
  clearPulses(circleEl);
  const p1 = document.createElement('div');
  p1.classList.add('pulse');
  const p2 = document.createElement('div');
  p2.classList.add('pulse', 'layer-2');
  const p3 = document.createElement('div');
  p3.classList.add('pulse', 'layer-3');
  circleEl.appendChild(p1);
  circleEl.appendChild(p2);
  circleEl.appendChild(p3);
}

function showResultScreen(playerChoice, computerChoice, result) {
  showGameResult();

  lastResult = result;

  ['rock', 'paper', 'scissors', 'winner'].forEach(c => {
    yourChoiceCircle.classList.remove(c);
    computerChoiceCircle.classList.remove(c);
  });
  clearPulses(yourChoiceCircle);
  clearPulses(computerChoiceCircle);

  yourChoiceCircle.classList.add(playerChoice);
  computerChoiceCircle.classList.add(computerChoice);

  yourChoiceEmoji.src = choices[playerChoice].imgSrc;
  yourChoiceCircle.style.borderColor = choices[playerChoice].borderColor;
  computerChoiceEmoji.src = choices[computerChoice].imgSrc;
  computerChoiceCircle.style.borderColor = choices[computerChoice].borderColor;

  if (result === 'win') {
    resultMain.textContent = 'YOU WIN';
    resultSub.textContent = 'AGAINST PC';

    playAgainButton.textContent = 'PLAY AGAIN';
    nextButton.classList.remove('hidden');
    yourChoiceCircle.classList.add('winner');
    addPulses(yourChoiceCircle);
  }
  else if (result === 'lose') {
    resultMain.textContent = 'YOU LOST';
    resultSub.textContent = 'AGAINST PC';

    playAgainButton.textContent = 'PLAY AGAIN';
    nextButton.classList.add('hidden');
    computerChoiceCircle.classList.add('winner');
    addPulses(computerChoiceCircle);
  }
  else {
    resultMain.textContent = 'TIE UP';
    resultSub.textContent = '';
    playAgainButton.textContent = 'REPLAY';
    nextButton.classList.add('hidden');
  }

  updateScores(result);
}

optionCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    const playerChoice = circle.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    showResultScreen(playerChoice, computerChoice, result);
  });
});

playAgainButton.addEventListener('click', showGameOptions);
playAgainFromHurray.addEventListener('click', showGameOptions);


nextButton.addEventListener('click', () => {
  if (lastResult === 'win') {
    showHurrayScreen();
  } else {
    showGameOptions();
  }
});

rulesButton.addEventListener('click', () => {
  rulesDialog.classList.remove('hidden');
  rulesButton.style.display = 'none';
});
closeRulesButton.addEventListener('click', () => {
  rulesDialog.classList.add('hidden');
  rulesButton.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', () => {
  loadScores();
  showGameOptions();
});