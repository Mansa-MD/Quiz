const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions = [
  {
    question: "What's the biggest animal in the world?",
    choice1: "Blue Whale",
    choice2: "Elephant",
    choice3: "Rhinoceros",
    choice4: "Polar Bear",
    answer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    choice1: "Vincent van Gogh",
    choice2: "Michelangelo di Lodovico",
    choice3: "Leonardo da Vinci",
    choice4: "Pablo Ruiz Picasso",
    answer: 3
  },
  {
    question: "What is the capital of Iceland?",
    choice1: "Hofn",
    choice2: "Akureyri",
    choice3: "Vik",
    choice4: "Reykjavík",
    answer: 4
  },
  {
    question: "To a single decimal point, many kilometers in a mile?",
    choice1: "3.6 km",
    choice2: "1.6 km",
    choice3: "1.0 km",
    choice4: "5.8 km",
    answer: 2
  },
  {
    question: "What nut is in the middle of a Ferrero Rocher?",
    choice1: "Pistachios",
    choice2: "Almond",
    choice3: "Hazelnut",
    choice4: "Peanut",
    answer: 3
  },
  {
    question: "What two elements are in water?",
    choice1: "Estrogen + Hydrogen",
    choice2: "Oxygen + Nitrogen ",
    choice3: "Hydrogen + Helium",
    choice4: "Oxygen + Hydrogen",
    answer: 4
  }
];

//CONSTANTS
const rightAnswers = 5;
const maxQuestions = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  //console.log(getNewQuestion());
};

document.getElementById('timer').innerHTML =
  005 + ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}


getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      console.log(classToApply);
    if (classToApply === "correct") {
      incrementScore(rightAnswers);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
