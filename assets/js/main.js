player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
// player = new mm.Player();

const possibleAnswers = document.querySelectorAll('.btn');
const answerGrid = document.querySelector('#answer-buttons')
const speakerBtn = document.querySelector('#speaker-btn');
const actionBtn = document.querySelector("#action-btn");
const footer = document.querySelector('footer');
let shuffledQuestions, currentQuestion, selectedAnswer;
let footerContainer = footer.firstElementChild;
let comment = document.querySelector('.comment')


function resetState() {
  // reset selectedAnswer
  selectedAnswer.classList = selectedAnswer.classList[0]; //remove every class except the first one
  selectedAnswer = null;

  // reset footer
  footer.classList = "";
  comment.innerHTML= '<img class="icon" src="assets/icons/help.svg" alt="">'
  
  // reset action button
  actionBtn.innerText = "Check";
  actionBtn.classList = "";
  actionBtn.removeEventListener("click", nextQuestion, false);
  actionBtn.removeEventListener("click", tryAgain, false);

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
  var selectedCode = selectedAnswer.children[0].innerText;
  selectedAnswer.classList.remove("highlight");

  if(selectedCode == currentQuestion.correctAnswer) {
    actionBtn.classList.add("correct");
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
    actionBtn.classList.add("incorrect");
    actionBtn.innerHTML = "Try Again"
    actionBtn.addEventListener("click", tryAgain, false);
    // add comment
    comment.innerHTML = '<img class="icon" src="assets/icons/xmark.svg" alt=""> Not quite...please try again'
    comment.classList.add("comment");    
    // add appropriate classes for footer    
    footer.classList.add("incorrect");
    footerContainer.replaceChild(comment, footerContainer.firstElementChild) // replace help icon with comment instead
    // modify selected button
    selectedAnswer.classList.add("incorrect");
  }
}
function nextQuestion() {
  resetState();
  shuffleQuestions();
  playQuestion();
}

function tryAgain() {
  resetState();
  playQuestion();
}

function playQuestion() {
  answerGrid.classList.add('disable');
  setTimeout(function() { player.start(currentQuestion) 
                          speakerBtn.classList.add('animate')}, 1000);
  
  setTimeout(function() { answerGrid.classList.remove('disable')
                          speakerBtn.classList.remove('animate')}, 5000);
}

function shuffleQuestions() {

  // Taken from https://bit.ly/2KvsvDw
  // Fisher-Yates algorithm
  function yatesShuffle(array) {
    for(let i = array.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }
  
  shuffledQuestions = yatesShuffle(questions);
  currentQuestion = shuffledQuestions[0];
}

function init() {
  shuffleQuestions();
  possibleAnswers.forEach(function(button) {
    button.addEventListener("click", selectAnswer);
  });
  speakerBtn.addEventListener("click", playQuestion, false);
  playQuestion();
  console.log("initialized");
}

window.onload = init;