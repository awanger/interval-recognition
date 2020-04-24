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
let comment = document.querySelector(".comment")

// player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
player = new mm.Player();


function resetState() {
  // reset footer
  footer.classList = "";
  comment.innerHTML= '<img class="icon" src="assets/icons/help.svg" alt="">'
  
  // reset action button
  actionBtn.innerText = "Check";
  actionBtn.classList = "";
  actionBtn.removeEventListener("click", nextQuestion, false);
  actionBtn.addEventListener("click", checkAnswer, false);

  // reset selectedAnswer
  selectedAnswer.classList = selectedAnswer.classList[0]; //remove every class except the first one
  selectedAnswer = null;

}

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
  actionBtn.removeEventListener("click", checkAnswer, false);
  selectedAnswer.classList.remove("highlight");
  var selectedCode = selectedAnswer.children[0].innerText;

  if(selectedCode == currentQuestion.correctAnswer) {
    // remove and add the appropriate CSS classes for the action button
    actionBtn.classList.add("next");
    actionBtn.innerHTML = "Next"
    actionBtn.addEventListener("click", nextQuestion, false);
    // add comment
    comment.innerHTML = '<img class="icon" src="assets/icons/checkmark.svg" alt=""> That\'s correct. Nice job!'
    comment.classList.add("comment");    
    // add appropriate classes for footer    
    footer.classList.add("correct");
    footerContainer.replaceChild(comment, footerContainer.firstElementChild) // replace help icon with comment instead
    // modify selected button
    selectedAnswer.classList.add("correct");
  } else {
    console.log("aw phooey. please try again");
    // disable selection of everything except for the try again button
  }
}
function nextQuestion() {
  resetState();
}

function playQuestion() {
  player.start(currentQuestion);
}

function addEventListeners() {
  console.log("adding all the appropriate event listeners");
}

function init() {
  shuffledQuestions = questions;
  currentQuestion = shuffledQuestions[0];
  // playQuestion();
}

init();