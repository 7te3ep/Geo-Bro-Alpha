/* DOM ELEMENTS*/

let timerDisplay = document.getElementById('timerDisplay')
let questionDisplay = document.getElementById('displayInstruction')
let startButton = document.getElementById('startButton')
let scoreDisplay = document.getElementById('scoreDisplay')
let scoreCard = document.getElementById('scoreCard')


/* VARIABLES */

var playState = false
var timerValue = 50
var paths = document.querySelector('#allMap').querySelectorAll('.land');
var question = ["Islande","Luxembourg","Portugal","Pays-Bas","Suisse","Royaume-Unie","Allemagne","Italie","Autriche","Espagne","France","Belgique"];
var answer = ''
var indexIncrease = 0
var score = 0
var timerScoreValue = 100

/* TOOLS FUNCTION */

function hideElement(element) {
    element.style.opacity = '0%'
    setTimeout(function(){ element.style.display = 'none'},500)
}

function showElement(element) {
    element.style.transition = 'opacity 500ms'
    element.style.display = 'flex'
    setTimeout(function(){element.style.opacity = '100%'},500)
}

function resetAll() {
    playState = false
    hideElement(questionDisplay)
    hideElement(timerDisplay)
    showElement(startButton)
    showElement(scoreCard)
    shuffleArray(question)
    indexIncrease = 0
    questionDisplay.textContent = question[indexIncrease];
    score = 0
    timerScoreValue = 100
}

paths.forEach(function (path) {
    path.addEventListener('click', function(e){
        answer = this.id;
        if (playState == true) {
        console.log(answer, question[indexIncrease])
        winChecking(answer,question[indexIncrease]);} // verifie si l'id de la reponse correspond a la question
    })
})

function shuffleArray(question){
    question.sort(()=> Math.random() - 0.5);
}

/* MAIN */

resetAll()

// when button clicked
function gameStart() {
    hideElement(scoreCard)
    hideElement(startButton)
    showElement(timerDisplay)
    showElement(questionDisplay)
    playState = true
    timerValue = 50
    timer()
    timerScore()
}

// timer

function timer() {
    if (playState == true) {
        // fait baisser la valeur du timer toutes les secondes
        if (timerValue >= 1) {
            timerValue --;
            timerDisplay.textContent = timerValue;
            setTimeout(timer,1000)
        // si la valeur est negative apparition bouton restart + fin du jeu
        }
        else {
            gameFinished()
        }
    }
}

function timerScore() {
    if (playState == true) {
        // fait baisser la valeur du timer toutes les secondes
        if (timerScoreValue > 10) {
            timerScoreValue = timerScoreValue - 10
            console.log(timerScoreValue)
            console.log(score)
        // si la valeur est negative apparition bouton restart + fin du jeu
        }
        setTimeout(timerScore,1000)
    }
}

function winChecking(questions,anwser) {
    if (indexIncrease==question.length-1) {
        gameFinished() // c'est la bonne reponse et il n'y a plus de question la partie est terminer
    }
    else {
        if (questions == anwser) {
            animColor('goodAnwser');
            indexIncrease ++
            questionDisplay.textContent = question[indexIncrease];
            score = score + timerScoreValue 
            timerScoreValue = 100
        }
        else {
            animColor('badAnwser');
            indexIncrease ++
            questionDisplay.textContent = question[indexIncrease];
            timerScoreValue = 100
        }
    }
}

// game finished

function gameFinished() {
    scoreDisplay.textContent = score
    resetAll()
}

function animColor(goodOrBad) {
    document.getElementById(answer).classList.add(goodOrBad)
    setTimeout(function(){document.getElementById(answer).classList.remove(goodOrBad);},300)
}