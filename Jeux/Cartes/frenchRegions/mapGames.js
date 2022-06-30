/* DOM ELEMENTS*/

timerDisplay = document.getElementById('timerDisplay')
questionDisplay = document.getElementById('displayInstruction')
startButton = document.getElementById('startButton')

/* VARIABLES */

var playState = false
var timerValue = 5
var paths = document.querySelector('#allMap').querySelectorAll('.land');
var question = ["Corse", "Grand Est", "Nouvelle-Aquitaine", "Auvergne-Rhone-Alpes", "Bourgogne-Franche-Comte", "Ile-de-France", "Occitanie", "Hauts-de-France", "Normandie", "Pays de la Loire","Provence-Alpes-Cote d'Azur","Bretagne"];
var answer = ''
var indexIncrease = 0
var score = 0

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
    shuffleArray(question)
    indexIncrease = 0
    score = 0
    questionDisplay.textContent = question[indexIncrease];
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
    hideElement(startButton)
    showElement(timerDisplay)
    showElement(questionDisplay)
    playState = true
    timerValue = 5
    timer()
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

function winChecking(questions,anwser) {
    if (indexIncrease==question.length-1) {
        gameFinished() // c'est la bonne reponse et il n'y a plus de question la partie est terminer
    }
    else {
    if (questions == anwser) {
            animColor('goodAnwser');
            score ++
            indexIncrease ++
            questionDisplay.textContent = question[indexIncrease];
        }
    else {
        animColor('badAnwser');
        indexIncrease ++
        questionDisplay.textContent = question[indexIncrease];
    }
}
}


// game finished

function gameFinished() {
    resetAll()
}

function animColor(goodOrBad) {
    document.getElementById(answer).classList.add(goodOrBad)
    setTimeout(function(){document.getElementById(answer).classList.remove(goodOrBad);},300)
}
