const questions = [
  {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 2.0},
      {pitch: 61, startTime: 2.0, endTime: 4.0}
    ],
    totalTime: 4,
    correctAnswer: 'm2'
  },
  {
  notes: [
    {pitch: 63, startTime: 0.0, endTime: 2.0},
    {pitch: 60, startTime: 2.0, endTime: 4.0}
  ],
  totalTime: 4,
  correctAnswer: 'm3'
  }
]

let shuffledQuestions, currentQuestion;
let selectedAnswer; // only one answer should be selected at a time

const possibleAnswers = document.querySelectorAll(".btn");
possibleAnswers.forEach(function(button) {
  button.addEventListener("click", selectAnswer);
});

const speakerBtn = document.querySelector('#speaker-btn');
speakerBtn.addEventListener("click", playQuestion, false);
const actionBtn = document.querySelector("#action-btn");

// player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
player = new mm.Player();

function selectAnswer(e) {
  if (selectedAnswer) {
    selectedAnswer.classList.remove("highlight"); // remove highlight from previously selected button
  }
  selectedAnswer = e.currentTarget; // select new button
  e.currentTarget.classList.add("highlight");
  toggleActionBtn();
}

function toggleActionBtn() {
  if(selectedAnswer) {
    actionBtn.classList.remove("disabled");
    actionBtn.classList.add("highlight");
  }
}


function playQuestion() {
  player.start(currentQuestion);
}

function displayQuestion() {
  console.log("Display question");
}

function nextQuestion() {
  console.log('what');
}

function init() {
  shuffledQuestions = questions;
  currentQuestion = shuffledQuestions[0]; 
  playQuestion();
}

// init();



