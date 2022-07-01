// HTML ELEMENTS
let startButton = document.getElementById("startButton")
let questionDisplay = document.getElementById("Question")
let illustration = document.getElementById("illustration")
let button1 = document.getElementById("btn1")
let button2 = document.getElementById("btn2")
let button3 = document.getElementById("btn3")
let button4 = document.getElementById("btn4")
let buttonArea = document.getElementById("btnArea")
let scoreElement = document.getElementById("quizzAdvancement")
let scoreDisplay = document.getElementById('scoreDisplay')
let scoreCard = document.getElementById('scoreCard')

// VARIABLES
var gameState = ""
var score = ""
var currentIndex = ""
var arrCountry = [ "la France", "l'Allemagne", "l'Italie", "le Portugal" ]
var goodAnswer = ""
var score = ""

// TOOLS
var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
document.body.style.msTransform =   scale;       // IE 9
document.body.style.transform = scale;     // General

function hideElement(element) {
    element.style.opacity = '0%'
    setTimeout(function(){ element.style.display = 'none'},500)
}

function showElement(element) {
    element.style.transition = 'opacity 500ms'
    element.style.display = 'flex'
    setTimeout(function(){element.style.opacity = '100%'},500)
}

function shuffle() {
    arrCountry = arrCountry.sort(() => 0.5 - Math.random());
}

function resetAll() {
    scoreDisplay.textContent = score
    gameState = false
    shuffle()
    showElement(startButton)
    showElement(scoreCard)
    hideElement(questionDisplay)
    hideElement(buttonArea)
    hideElement(scoreElement)
    hideElement(illustration)
    score = 0
    currentIndex = 0
}

// MAIN 
resetAll()




// when button clicked
function gameStart() {
    gameState = true
    hideElement(startButton)
    hideElement(scoreCard)
    showElement(questionDisplay)
    showElement(buttonArea)
    showElement(illustration)
    showElement(scoreElement)
    display()
}

function display() {
    questionDisplay.innerText = arrCountry[currentIndex]
    scoreElement.innerText = score + "/20"
    checkQuestion(questionDisplay.innerText)

}

function checkQuestion(questionText) {
    switch(questionText) {
        case "la France": { setupAnswer("Paris", "Marseille", "Lyon", "Brest", "Paris"); break }
        case "l'Allemagne": { setupAnswer("Francfort", "Munich", "Hambourg", "Berlin", "Berlin"); break}
        case "l'Italie": { setupAnswer("Rome", "Naples", "Venise", "Florence", "Rome"); break}
        case "le Portugal": {setupAnswer("Porto", "Braga", "Lisbonne", "Madrid", "Lisbonne"); break}
        default: resetAll()
    }
}

function setupAnswer(answer1, answer2, answer3, answer4, goodAnswerP) {
    button1.innerText = answer1
    button2.innerText = answer2
    button3.innerText = answer3
    button4.innerText = answer4
    goodAnswer = goodAnswerP
}

function checkWin(buttonClicked) {
    if (goodAnswer == buttonClicked.innerText) {
        currentIndex++
        score++
    }
    else {
        currentIndex++
    }
    display()
}