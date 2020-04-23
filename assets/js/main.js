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
const footer = document.querySelector('footer');
let footerContainer = footer.firstElementChild;

// player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
player = new mm.Player();

function selectAnswer(e) {
  if (selectedAnswer) {
    selectedAnswer.classList.remove("highlight"); // remove highlight from previously selected button
  }
  selectedAnswer = e.currentTarget; // select new button
  e.currentTarget.classList.add("highlight");
  activateActionBtn();
}

function activateActionBtn() {
  if(selectedAnswer) {
    actionBtn.classList.add("highlight");
    actionBtn.addEventListener("click", checkAnswer, false);
  }
}

function checkAnswer() {
  actionBtn.classList.remove("highlight");
  selectedAnswer.classList.remove("highlight");
  var selectedCode = selectedAnswer.children[0].innerText;
  var comment = document.createElement("div");

  if(selectedCode == currentQuestion.correctAnswer) {
    // remove and add the appropriate CSS classes for the action button
    actionBtn.classList.add("next");
    actionBtn.innerHTML = "Next"
    actionBtn.removeEventListener("click", checkAnswer, false);
    actionBtn.addEventListener("click", nextQuestion, false);


    comment.innerHTML = '<img class="icon" src="assets/icons/checkmark.svg" alt=""> That\'s correct. Nice job!'
    comment.classList.add("comment");
    
    // add appropriate classes for footer    
    footer.classList.add("correct");
    footerContainer.replaceChild(comment, footerContainer.firstElementChild) // replace help icon with comment instead

    selectedAnswer.classList.add("correct");


  } else {
    console.log("aw phooey. please try again");
    // disable selection of everything except for the try again button
  }
}

function playQuestion() {
  player.start(currentQuestion);
}

function displayQuestion() {
  console.log("Display question");
}

function nextQuestion() {
  console.log('i just ran the nextQuestion function');
}

function init() {
  shuffledQuestions = questions;
  currentQuestion = shuffledQuestions[0]; 
  // playQuestion();
}

init();