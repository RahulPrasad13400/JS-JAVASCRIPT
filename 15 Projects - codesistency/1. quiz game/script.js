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

const quizQuestions  = [
    {
        question : "Favourite Fictional cartoon character",
        answers : [
            { text : "Bubu dudu", correct : true},
            { text : "chotta beam", correct : false},
            { text : "tom and jerry", correct : false},
            { text : "Oggy and the Cockroaches", correct : false},
        ]
    },
    {
        question : "Which is the favourite food of peekus",
        answers : [
            { text : "Biriyani", correct : false},
            { text : "Vegetarian foods", correct : false},
            { text : "Mandi", correct : true},
            { text : "Shawarma", correct : false}
        ] 
    },
    {
        question : "First Movie date of bubu dudu",
        answers : [
            { text : "Jhon wick", correct : false},
            { text : "Romanjam", correct : true},
            { text : "Bromance", correct : false},
            { text : "Kishkindha Kaandam", correct : false},
        ]
    },
    {
        question : "First place bubu dudu visited together",
        answers : [
            { text : "Nadukani", correct : true},
            { text : "Beach", correct : false},
            { text : "bhoothathankettu", correct : false},
            { text : "Inchathotty", correct : false},
        ]
    },
    {
        question : "Which is the first place peekus first kissed",
        answers : [
            { text : "Near a road side", correct : false},
            { text : "Nadukani", correct : false},
            { text : "Inchathotty", correct : false},
            { text : "bhoothathankettu", correct : true},
        ]
    }
]

let currentQuestionIndex = 0
let currentScore = 0
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

