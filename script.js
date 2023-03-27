// Define quiz questions and answers
var questions = [  
    {   question: "What is the output of the following code: console.log(5 + '5');",        choices: ["A. 55", "B. 10", "C. '55'", "D. '10'"],
        answer: "C. '55'"
    },
    {
        question: "What is the keyword used to define a function in JavaScript?",
        choices: ["A. var", "B. console", "C. function", "D. array"],
        answer: "C. function"
    },
    {
        question: "What is the difference between '==' and '===' operators in JavaScript?",
        choices: ["A. The '==' and '===' operators in JavaScript are used to compare values, but they behave differently.", "B. These === & ++ are correct", "C. JavaScript only uses console log", "D. The '===' operator is called the strict equality operator and it also checks if the values on both sides are un-equal."],
        answer: "A. The '==' and '===' operators in JavaScript are used to compare values, but they behave differently."
    },
    {
        question: "How do you loop through an array in JavaScript?",
        choices: ["A. For Loop", "B. Margin", "C. Jump", "D. copy"],
        answer: "A. For Loop"
    },
    {
        question: "What is the purpose of the 'return' statement in a JavaScript function?",
        choices: ["A. 'return' statement is a powerful tool in JavaScript that allows you to specify the value only", "B. The 'return' statement in a JavaScript function is used to specify the value that the function should return when it's called.", "C. Return to the next line", "D. Never return to the next function."],
        answer: "B. The 'return' statement in a JavaScript function is used to specify the value that the function should return when it's called."
    }
];


  // Set initial values for game variables
var currentQuestion = 0;
var score = 0;
var timerInterval;

  // Get elements from HTML
var startBtn = document.querySelector("#start-btn");
var quizContainer = document.querySelector("#quiz");
var questionElement = document.querySelector("#question");
var choicesElement = document.querySelector("#choices");
var scoreElement = document.querySelector("#score");
var questionNumElement = document.querySelector("#question-num");
var gameOverElement = document.querySelector("#game-over");
var finalScoreElement = document.querySelector("#final-score");
var initialsElement = document.querySelector("#initials");
var submitScoreButton = document.querySelector("#submit-score");

var resultsContainer = document.querySelector("#results");

startBtn.addEventListener("click", startQuiz)

  // Function to start the quiz
  function startQuiz() {
    // Hide the start button
    document.querySelector("#start-btn").style.display = "none";
  
    // Show the quiz container
    quizContainer.style.display = "block";

    // Display the first question
    displayQuestion();

    // Set the time left to 60 seconds
    var timeLeft = 60;

    // Display the initial time
    document.querySelector(".timer-count").textContent = timeLeft;

    // Start the timer
    var timerInterval = setInterval(
        function() {
        // Update the time left
        timeLeft--;

        // Display the updated time
        document.querySelector(".timer-count").textContent = timeLeft;

        // End the quiz if time runs out
        if (timeLeft <= 0) {
            timeLeft = 0;
            endQuiz();
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Function to display the current question and choices
function displayQuestion() {
    // Clear the choices element
    choicesElement.innerHTML = "";
  
    // Display the current question
    questionElement.textContent = questions[currentQuestion].question;
  
    // Display the choices for the current question
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choice = questions[currentQuestion].choices[i];
        var choiceElement = document.createElement("button");
        choiceElement.textContent = choice;
        choiceElement.setAttribute("class", "choices");
        choicesElement.appendChild(choiceElement);

        // Add an event listener to each answer button
        choiceElement.addEventListener("click", function() {
            // Check if the answer is correct and increment the score if it is
            if (choice === questions[currentQuestion].answer) {
                score++;
            }

            // Move on to the next question
            currentQuestion++;

            // Check if there are any more questions left
            if (currentQuestion < questions.length) {
                // If there are, display the next question
                displayQuestion();
            } else {
                // If there aren't, end the quiz
                endQuiz();
            }
        });
    }
}


function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
  
    // Hide the quiz container
    quizContainer.style.display = "none";
  
    // Show the results container
    resultsContainer.style.display = "block";
  
    // Display the score
    scoreElement.textContent = score + "/" + questions.length;
    // Display the quiz results
    var quizResults = document.getElementById("results-container");
    quizResults.style.display = "block";
    quizResults.textContent = "You scored " + score + " out of " + questions.length + ".";
  }
   