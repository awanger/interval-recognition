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
// player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
player = new mm.Player();

function selectAnswer(e) {
  e.currentTarget.classList.add("selected");
  console.log("HELLO");
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



