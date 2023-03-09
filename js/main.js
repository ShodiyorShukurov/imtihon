// GET ELEMENT FROM DOM
// const elScoreQuestion = document.querySelector('.js-score-text');
// const elAnswerBtn = document.querySelector('.js-answar-btn');
// const elTime = document.querySelector('.js-time');
// const elNumberQu = document.querySelector('.js-number-questions');
// const elTrueAnswar = document.querySelector('.true-answar');
// const elFalseAnswar = document.querySelector('.false-answar');

const elQuestion = Array.from(document.querySelectorAll('.question-text'));
const elImg = document.querySelector('.js-card-img');
// console.log(elQuestion)
const startingMinuteEasy = 8;
let timeEasy = startingMinuteEasy * 60;

const elTime = document.querySelector('.js-time-easy');
const elTimeMedium = document.querySelector('.js-time-medium');
const elTimeHard = document.querySelector('.js-time-hard');

setInterval(updateCoundownEasy, 1000);
function updateCoundownEasy() {
    const minutes = Math.floor(timeEasy / 60);
    let secondes = timeEasy % 60;

    elTime.innerText = `${minutes} : ${secondes}`;
    timeEasy--;

}
const startingMinuteMedium = 5;
let timeMedium = startingMinuteMedium * 60;

setInterval(updateCoundownMedium, 1000);
function updateCoundownMedium() {
    const minutes = Math.floor(timeMedium / 60);
    let secondes = timeMedium % 60;

    elTimeMedium.innerText = `${minutes} : ${secondes}`;
    timeMedium--;

}

const startingMinuteHard = 3;
let timeHard = startingMinuteHard * 60;
setInterval(updateCoundownHard, 1000);
function updateCoundownHard() {
    const minutes = Math.floor(timeHard / 60);
    let seconds = timeHard % 60;

    elTimeHard.innerText = `${minutes} : ${seconds}`;
    timeHard--;

}

let currentQuestion = {}
let accemptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableCounter = 0;
let maxQuestions = 10;
let newArray = [];

startGame = () => {
    questionCounter = 0;
    score = 0;
    newArray = [...roadSymbol];
    // console.log(newArray);
    getNewQuetion();
}
getNewQuetion = () => {
    if (newArray.length === 0 || questionCounter >= maxQuestions) {
        window.location.assign('/');
    }
    questionCounter++;
    let questionIndex = Math.floor(Math.random() * newArray.length);
    currentQuestion = newArray[questionIndex];
    // elImg.src = currentQuestion.roadSymbol.symbol_img;

    elQuestion.forEach(choice => {
        const number = choice.dataset['number'];

        choice.innerText = currentQuestion['choice.incorrect_answer' + number];

    });

    newArray.splice(questionIndex, 1);
    accemptingAnswer = true;
}
// console.log(getNewQuetion)

elQuestion.forEach(choice => {
    choice.addEventListener('click', (evt) => {
        console.log(evt.target)
        if (!accemptingAnswer) return;

        const selectedChoice = evt.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer === currentQuestion.answar ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuetion();
        }, 1000)
    })
})

startGame();