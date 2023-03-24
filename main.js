//  GET ELEMENT FROM DOM
const elTestImg = document.querySelector('.js-avtotest-img');
const elTestTime = document.querySelector('.js-avto-test');
const elNumberQuestion = document.querySelector('.js-question-number');
const elQuestionFalse = document.querySelector('.js-question-false');
const elQuestionTrue = document.querySelector('.js-question-true')
const elTestVariant = Array.from(document.querySelectorAll('.js-avto-text'));


let currentQuestion = {};
let accemptingAnswer = false;
let score = 0;
let trueQuestion = 0;
let falseQuestion = 0;
let questionCounter = 0;
let availableQuestion = [];
let questions = [];

fetch("question.json")
    .then((res) => res.json())
    .then((data) => {


        questions = data.roadSymbol.map((question) => {
            const formattedQuestion = {
                questionImg: question.symbol_img,
            }
            const answarOption = [...question.incorrect_answer];
            formattedQuestion.answar = Math.floor(Math.random() * 4) + 1;
            answarOption.slice(
                formattedQuestion.answar - 1,
                0,
                question.symbol_title
            );
            answarOption.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
                // console.log(choice)
            })
            return formattedQuestion;
        })
        startGame()
    })
    .catch((err) => {
        console.log(err)
    });

const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    // console.log(availableQuestion)
}
function getNewQuetion() {
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
        if (score > 50 && countdownElement.textContent !== "Time's up") {
            return window.location.href = './winner.html';
        } else {
            return window.location.href = './lose.html';

        }
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    elTestImg.src = currentQuestion.question;
    choices.forEach((choice) => {
        let number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice', number];
        // console.log(number)
    });
    elNumberQuestion.textContent = `Qolgan savollar: ${questionCounter}/${MAX_QUESTION}`;
    availableQuestion.splice(questionIndex, 1);
    accemptingAnswer = true;
    // console.log(availableQuestion)
};

elTestVariant.forEach((choice) => {
    choice.addEventListener('click', (evt) => {
        if (!accemptingAnswer) return;

        accemptingAnswer = false;
        const selectedChoice = evt.target;
        const selectedAnswar = selectedChoice.dataset['number'];
        const classToApply =
            selectedAnswar == currentQuestion.answar ? 'corrent' : 'incoorent';
        if (classToApply = "coorent") {
            selectedAnswar.disabled = true;
            correntSound();
            incrementScore(CORRECT_BONUS);
            trueQuestion++
        } else {
            inCorrentSound()
            falseQuestion++;

        }
        if (falseQuestion === 5) {
            return window.location.assign('./lose.html');

        }

        elQuestionTrue.textContent = `To'g'ri javoblar: ${trueQuestion}`;
        elQuestionFalse.textContent = `Xato savollar: 0/${falseQuestion}`;
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuetion()
        }, 1000);

    });
});

incrementScore = (num) => {
    score += num;
};
correntSound = () => {
    let winner = new Audio("./audio/to'g'ri.mp3")
    winner.play()
}
inCorrentSound = () => {
    let lose = new Audio("./audio/xato.mp3");
    lose.play();
}

const elTime = document.querySelector('.js-avto-test');

if (document.title === 'Easy') {
    startTime = 8;
} else if (document.title === "Medium") {
    startTime = 5;
} else {
    startTime = 3;
}

let time = startTime * 60;

const countdownInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    elTime.textContent = `Qolgan vaqt: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    if (time <= 0) {
        clearInterval(countdownInterval)
        return window.location.assign('./lose.html');
    } else {
        time--;
    }
}, 1000)