const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
      { text: "France", correct: true },
      { text: "Brazil", correct: false },
      { text: "Germany", correct: false },
      { text: "Argentina", correct: false }
    ]
  },
  {
    question: "Who is known as the 'King of Football'?",
    answers: [
      { text: "Pelé", correct: true },
      { text: "Diego Maradona", correct: false },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "David Beckham", correct: false }
    ]
  },
  {
    question: "Which English club is nicknamed 'The Red Devils'?",
    answers: [
      { text: "Manchester United", correct: true },
      { text: "Chelsea", correct: false },
      { text: "Arsenal", correct: false },
      { text: "Liverpool", correct: false }
    ]
  },
  {
    question: "Which player is famous for scoring the 'Hand of God' goal?",
    answers: [
      { text: "Diego Maradona", correct: true },
      { text: "Lionel Messi", correct: false },
      { text: "Neymar", correct: false },
      { text: "Kylian Mbappé", correct: false }
    ]
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    answers: [
      { text: "Brazil", correct: true },
      { text: "Italy", correct: false },
      { text: "Germany", correct: false },
      { text: "Argentina", correct: false }
    ]
  }
];


let currentQuestionIndex = 0
let score = 0
let answerDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length
maxScoreSpan.textContent = quizQuestions.length

startButton.addEventListener('click', startQuiz)
restartButton.addEventListener('click', restartQuiz)

function startQuiz(){
    currentQuestionIndex = 0
    scoreSpan.textContent = 0
    score = 0

    startScreen.classList.remove('active')
    quizScreen.classList.add('active')

    showQuestion()
}

function showQuestion(){
    answerDisabled = false
    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex+1

    const progressPercent = (currentQuestionIndex/quizQuestions.length)*100
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    // TO CLEAN UP THE PREVIOUS ANSWER BUTTONS 
    answersContainer.innerHTML = ""

    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct
        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button)
    })
}

function selectAnswer(event){
    if(answerDisabled) return

    answerDisabled = true

    const selectedButton = event.target
    const isCorrect = selectedButton.dataset.correct === 'true'

    Array.from(answersContainer.children).forEach((button)=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }else if(button === selectedButton){
            button.classList.add("incorrect")
        }
    })

    if(isCorrect){
        score++
        scoreSpan.textContent = score
    }

    setTimeout(()=>{
        currentQuestionIndex++
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion()
        }else{
            showResults()
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score
    const percentage = (score/quizQuestions.length)*100

    if (percentage === 100) {
        resultMessage.textContent = "🥰";
    } else if (percentage >= 80) {
        resultMessage.textContent = "😍";
    } else if (percentage >= 60) {
        resultMessage.textContent = "😊";
    } else if (percentage >= 40) {
        resultMessage.textContent = "😐";
    } else {
        resultMessage.textContent = "😥";
    }

}

function restartQuiz(){
    resultScreen.classList.remove("active")
    startQuiz()
}

