// Set the object for questions and answers
var myQuestions = [
  {
    question:
      "What declaration must be included in as the first item in an HTML decument before the tag and is used to provide instructions to the web browser?",
    answers: {
      a: "&lt;code&gt;&lt;/code&gt;",
      b: "embed",
      c: "&lt;!DOCTYPE&gt;",
      d: "&lt;caption&gt;",
    },
    correctAnswer: "c",
  },
  {
    question:
      "What tag is used to render or transform text into an emphasized (italics) version?",
    answers: {
      a: "&lt;strong&gt;",
      b: "&lt;blockquote&gt;",
      c: "&lt;a&gt;",
      d: "&lt;em&gt;",
    },
    correctAnswer: "d",
  },
  {
    question:
      "In JavaScript, what element is used to store multiple values in a single variable?",
    answers: {
      a: "Strings",
      b: "Arrays",
      c: "Functions",
      d: "Variables",
    },
    correctAnswer: "b",
  },
  {
    question:
      "In JavaScript, what is a block of code that is used to perform a specific task?",
    answers: {
      a: "Declaration",
      b: "String",
      c: "Functions",
      d: "Variable",
    },
    correctAnswer: "c",
  },
  {
    question:
      "In JavaScript, what is used in conjunction with HTML to 'react' to certain elements?",
    answers: {
      a: "Condition",
      b: "RegExp",
      c: "Event",
      d: "Boolean",
    },
    correctAnswer: "c",
  },
];

// set variables to get elements in html
var introContainer = document.getElementById("intro");
var quizContainer = document.getElementById("quiz");
var quizStart = document.getElementById("start");
var timeCaculate = document.getElementById("timer");
// set initial time for the timer
var secondsLeft = 75;
// set a global variable for timer dunctions
var timerInterval;
var newLabel = document.createElement("label");
var nameInput = document.createElement("Input");
var scoreLable = document.createElement("lable");
var scoreInput = document.createElement("Input");
var submitBtn = document.createElement("button");

// Set timer function
function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeCaculate.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      myStopFunction();
      sendMessage();
      myScore();
    }
  }, 1000);
}

// set message function when timer reachs to 0
function sendMessage() {
  timeCaculate.textContent = " ";

  var imgEl = document.createElement("img");

  imgEl.setAttribute("src", "./images/Gameover.jpg");

  quizContainer.appendChild(imgEl);
  // imgEl.parentNode.removeChild(imgEl);
}

// Set timer stop function when the user compltet the quiz whithin the time
function myStopFunction() {
  clearInterval(timerInterval);
  quizContainer.innerHTML = "";
}

// set an eventlistener to listen to mouse click and execute fonctions
quizStart.addEventListener("click", function () {
  document.getElementById("quiz").style.fontSize = "x-large";
  setTime();
  showQuestions(0);
});

// set function for showing quiz questions one by one
function showQuestions(n) {
  quizStart.style.visibility = "hidden";
  introContainer.innerHTML = "";
  quizContainer.innerHTML = "";

  quizContainer.innerHTML =
    quizContainer.innerHTML + myQuestions[n].question + "<br>" + "<br>";

  for (letter in myQuestions[n].answers) {
    quizContainer.innerHTML =
      quizContainer.innerHTML +
      "<button onclick='myFunction(" +
      n +
      "," +
      letter +
      ")' id=" +
      letter +
      ">" +
      letter +
      ":" +
      myQuestions[n].answers[letter] +
      "</button>" +
      "<br>";
  }
}

// set function for mouse click on the answer option button
function myFunction(questionNumber, answer) {
  checkResult(answer.id, questionNumber);
  if (questionNumber < myQuestions.length - 1) {
    showQuestions(questionNumber + 1);
  } else {
    myStopFunction();
    myScore();
  }
}

// // set function for checking if the user click on the correct option.
function checkResult(answer, questionNumber) {
  if (answer != myQuestions[questionNumber].correctAnswer) {
    secondsLeft = secondsLeft - 15;
  }
}

// set function for storing scores and initial
function myScore() {
  newLabel.setAttribute("for", "name");
  nameInput.setAttribute("type", "text");
  submitBtn.setAttribute("class", "button");
  document.body.appendChild(newLabel);
  document.body.appendChild(nameInput);
  document.body.appendChild(submitBtn);
  newLabel.innerHTML = "<br>" + "<br>" + "<br>" + "Enter your name";
  scoreLable.innerHTML =
    "<br>" + "<br>" + "<br>" + "<br>" + "<br>" + "Enter your score   ";
  submitBtn.innerHTML = "SUBMIT";
}

// store value
submitBtn.setAttribute("id", "btn");
nameInput.setAttribute("id", "name");
submitBtn.addEventListener("click", function () {
  var name = document.getElementById("name");
  var score = document.getElementById("score");
  if (name.value != null) {
    localStorage.setItem("name", name.value);
    localStorage.setItem("score", secondsLeft);
  }
});
