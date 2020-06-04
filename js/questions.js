const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let count = 59;

//Questions Array
let questions = [
  {
    question: "Accoding to greek mythlogy, the name of Zeus father is ",
    choice1: "Spartacus",
    choice2: "Uranus",
    choice3: "Kronos",
    choice4: "Thanos",
    answer: 3
  },
  {
    question: "Which empire did Genghis Khan reign over?",
    choice1: "Roman Empire",
    choice2: "Byzantine Empire",
    choice3: "Ottoman Empire",
    choice4: "Mongol Empire",
    answer: 4
  },
  {
    question: "What is the square root of √2916?",
    choice1: "54",
    choice2: "244",
    choice3: "84",
    choice4: "24",
    answer: 1
  },
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
    question: "To a single decimal point, how many kilometers in a mile?",
    choice1: "3.6 km",
    choice2: "1.6 km",
    choice3: "1.0 km",
    choice4: "5.8 km",
    answer: 2
  },
  {
    question: "How much horsepower(hp) does the 2020 Koenigsegg Gemera have ?",
    choice1: "1,900hp",
    choice2: "1,700hp",
    choice3: "1,500hp",
    choice4: "2,000hp",
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
  },
  {
    question: "What food item is classified as a complex carbonhydrate?",
    choice1: "White Rice",
    choice2: "Sweet Potatoes",
    choice3: "Soda",
    choice4: "French Bread",
    answer: 2
  },
  {
    question: "In the anime series DragonBall Z, what was Goku's saiyan name?",
    choice1: "Kakarot",
    choice2: "Raditz",
    choice3: "Bardock",
    choice4: "Broly",
    answer: 1
  },
  {
    question: "The expression \"if you want peace, prepare for war\" comes from the book \"      \"?",
    choice1: "Eradicate All Oppositions",
    choice2: "Ten Commandments of Strategy",
    choice3: "Epitoma Rei Militaris",
    choice4: "The Art of War",
    answer: 3
  }
];

//Constants
const rightAnswers = 20;
const maxQuestions = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  //Spread operator for full copy of questions from questions array to available questions
  availableQuesions = [...questions];
  console.log(availableQuesions);
  getNewQuestion();
};

//Countdown timer
timer = setInterval(function() {
  $("#timer").html(count--);
  if(count == -1) {
    clearInterval(timer);
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }
}, 1000);

//New question after previous question has been answer
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
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
    if (classToApply === "correct") { incrementScore(rightAnswers);}
  
    //Correct & Incorrect color indicators
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