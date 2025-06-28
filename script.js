var homePage = document.getElementById("home-page");
var quizPage = document.getElementById("quiz-page");
var resultsPage = document.getElementById("results-page");

var startButton = document.getElementById("start-button");
var category = document.getElementById("category");
var questionText = document.getElementById("question-text");
var optionsBox = document.getElementById("options-container");
var checkAnswerBtn = document.getElementById("check-answer");
var nextBtn = document.getElementById("next-question");
var currentQText = document.getElementById("current-question");
var totalQText = document.getElementById("total-questions");
var progressLine = document.getElementById("progress-indicator");
var resultCat = document.getElementById("result-category");
var scoreResult = document.getElementById("score-display");
var percentageResult = document.getElementById("percentage-display");
var feedbackText = document.getElementById("feedback-message");
var retryBtn = document.getElementById("retry-button");
var homeBtn = document.getElementById("home-button");

var index = 0;
var score = 0;
var selectedOption = null;
var questionsList = [];

var quizQuestions = {
  html: [
    { q: "What does HTML stand for?", o: ["Hyper text makeup language", "Hyper Text Markup Language", "Hyperlinks Text Machine Language", "Markup Tool Language"], a: 1 },
    { q: "Which tag is used to create a link?", o: ["<a>", "<link>", "<href>", "<url>"], a: 0 },
    { q: "What tag creates a line break?", o: ["<br>", "<lb>", "<break>", "<line>"], a: 0 }
  ],
  css: [
    { q: "What is used to style HTML?", o: ["JavaScript", "PHP", "CSS", "XML"], a: 2 },
    { q: "Which property changes text color?", o: ["color", "background", "font-color", "text"], a: 0 },
    { q: "Which symbol is used for ID selector?", o: [".", "#", "*", "$"], a: 1 }
  ],
  javascript: [
    { q: "Which company developed JavaScript?", o: ["Microsoft", "Netscape", "Google", "IBM"], a: 1 },
    { q: "Which keyword declares a variable?", o: ["var", "int", "define", "include"], a: 0 },
    { q: "Which method logs output to console?", o: ["print()", "log()", "console.log()", "write()"], a: 2 }
  ]
};

category.onchange = function () {
  if (category.value !== "") {
    startButton.disabled = false;
  }
};

startButton.onclick = function () {
  var selectedCat = category.value;
  questionsList = quizQuestions[selectedCat];
  totalQText.textContent = questionsList.length;
  resultCat.textContent = selectedCat.toUpperCase();
  index = 0;
  score = 0;
  showPage("quiz");
  loadQuestion();
};

function showPage(pageName) {
  homePage.classList.remove("active");
  quizPage.classList.remove("active");
  resultsPage.classList.remove("active");

  if (pageName === "home") {
    homePage.classList.add("active");
  } else if (pageName === "quiz") {
    quizPage.classList.add("active");
  } else if (pageName === "results") {
    resultsPage.classList.add("active");
  }
}

function loadQuestion() {
  selectedOption = null;
  checkAnswerBtn.disabled = true;
  nextBtn.classList.add("hidden");

  var currentQuestion = questionsList[index];
  questionText.textContent = currentQuestion.q;
  currentQText.textContent = index + 1;
  progressLine.style.width = (index / questionsList.length) * 100 + "%";

  optionsBox.innerHTML = "";

  for (var i = 0; i < currentQuestion.o.length; i++) {
    var btn = document.createElement("button");
    btn.textContent = currentQuestion.o[i];
    btn.className = "option";

    btn.onclick = function (e) {
      var buttons = document.querySelectorAll(".option");
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("selected");
      }
      e.target.classList.add("selected");
      selectedOption = Array.from(buttons).indexOf(e.target);
      checkAnswerBtn.disabled = false;
    };

    optionsBox.appendChild(btn);
  }
}

checkAnswerBtn.onclick = function () {
  var correctAnswer = questionsList[index].a;
  var allButtons = document.querySelectorAll(".option");

  for (var i = 0; i < allButtons.length; i++) {
    if (i === correctAnswer) {
      allButtons[i].classList.add("correct");
    } else {
      allButtons[i].classList.add("incorrect");
    }
    allButtons[i].classList.add("disabled");
  }

  if (selectedOption === correctAnswer) {
    score++;
  }

  checkAnswerBtn.disabled = true;
  nextBtn.classList.remove("hidden");
};

nextBtn.onclick = function () {
  index++;
  if (index < questionsList.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  scoreResult.textContent = score + "/" + questionsList.length;
  percentageResult.textContent = Math.round((score / questionsList.length) * 100) + "%";

  if (score === questionsList.length) {
    feedbackText.textContent = "Excellent!";
  } else if (score >= questionsList.length / 2) {
    feedbackText.textContent = "Good Job!";
  } else {
    feedbackText.textContent = "Keep learning!";
  }

  progressLine.style.width = "100%";
  showPage("results");
}

retryBtn.onclick = function () {
  index = 0;
  score = 0;
  loadQuestion();
  showPage("quiz");
};

homeBtn.onclick = function () {
  category.value = "";
  startButton.disabled = true;
  showPage("home");
};
