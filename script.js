const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');

const countdownEl = document.getElementById('countdown');
const startForm = document.getElementById('start-form');
const gameQuestions = document.getElementById('game-questions');
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');

let questionAmount = 0;
let questionsArray = [];
let playerAnswers = [];
let timer;
let timePlayed = 0;
let penaltyTime = 0;
let finalTime = 0;
let currentQuestionIndex = 0;

function hideAllPages() {
  splashPage.hidden = true;
  countdownPage.hidden = true;
  gamePage.hidden = true;
  scorePage.hidden = true;
}

function showPage(page) {
  hideAllPages();
  page.hidden = false;
}

function generateQuestions() {
  questionsArray = [];
  for (let i = 0; i < questionAmount; i++) {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const correct = Math.random() > 0.5;
    let answer = correct ? a * b : a * b + Math.floor(Math.random() * 5) + 1;
    questionsArray.push({
      question: `${a} × ${b} = ${answer}`,
      correct: answer === a * b
    });
  }
}

function displayNextQuestion() {
  if (currentQuestionIndex >= questionsArray.length) {
    endGame();
    return;
  }
  gameQuestions.innerHTML = `<div class="item-container"><p>${questionsArray[currentQuestionIndex].question}</p></div>`;
}

function startTimer() {
  timePlayed = 0;
  timer = setInterval(() => {
    timePlayed += 0.1;
  }, 100);
}

function stopTimer() {
  clearInterval(timer);
  finalTime = timePlayed + penaltyTime;
  finalTimeEl.textContent = `${finalTime.toFixed(1)}s`;
  baseTimeEl.textContent = `Base Time: ${timePlayed.toFixed(1)}s`;
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime.toFixed(1)}s`;
}

function endGame() {
  stopTimer();
  showPage(scorePage);
}

function startGame() {
  currentQuestionIndex = 0;
  playerAnswers = [];
  penaltyTime = 0;
  generateQuestions();
  showPage(gamePage);
  displayNextQuestion();
  startTimer();
}

function countdownStart() {
  let count = 3;
  countdownEl.textContent = count;
  showPage(countdownPage);
  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(interval);
      startGame();
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}

startForm.addEventListener('submit', (e) => {
  e.preventDefault();
  questionAmount = +document.querySelector('input[name="question"]:checked').value;
  countdownStart();
});

document.querySelector('.wrong').addEventListener('click', () => {
  if (!questionsArray[currentQuestionIndex].correct) {
    // correct choice
  } else {
    penaltyTime += 0.5;
  }
  currentQuestionIndex++;
  displayNextQuestion();
});

document.querySelector('.right').addEventListener('click', () => {
  if (questionsArray[currentQuestionIndex].correct) {
    // correct choice
  } else {
    penaltyTime += 0.5;
  }
  currentQuestionIndex++;
  displayNextQuestion();
});

document.querySelector('.play-button').addEventListener('click', () => {
  showPage(splashPage);
});
