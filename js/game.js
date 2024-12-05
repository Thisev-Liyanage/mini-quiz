// Retrieve category from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category');

// Set the correct JSON file based on the selected category
let jsonFile = '';
if (selectedCategory === '9') {
  jsonFile = '/data/Algemene-Kennis.json'; // Algemene Kennis
} else if (selectedCategory === '18') {
  jsonFile = '/data/Entertainment-Videospellen.json'; // Entertainment: Videospellen
} else if (selectedCategory === '21') {
  jsonFile = '/data/Sport.json'; // Sport
} else {
  // Default to Algemene Kennis if no category is selected
  jsonFile = '/data/Algemene-Kennis.json';
}

// Elementen van de HTML
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');
const questionText = document.getElementById('question');
const choiceTexts = document.querySelectorAll('.choice-text');
const timerText = document.getElementById('timer');
const gameContainer = document.getElementById('game');
const loader = document.getElementById('loader');

// Initialiseer de spelvariabelen
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timerInterval;
let timeLeft = 15; // Start de timer op 15 seconden
let questionsAttempted = [];

// Haal vragen op uit het lokale JSON-bestand
fetch(jsonFile)
  .then((response) => response.json())
  .then((loadedQuestions) => {
    const questions = loadedQuestions.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
        choice1: loadedQuestion.choice1,
        choice2: loadedQuestion.choice2,
        choice3: loadedQuestion.choice3,
        choice4: loadedQuestion.choice4,
        answer: loadedQuestion.answer,
        image: loadedQuestion.image || '',  
      };
      return formattedQuestion;
    });

    startGame(questions);
  })
  .catch((err) => {
    console.error('Fout bij het laden van de vragen:', err);
  });

// Start het spel
function startGame(questions) {
  availableQuestions = [...questions];
  questionCounter = 0;
  score = 0;
  timeLeft = 15; // Zet de timer terug naar 15 seconden
  scoreText.innerText = score;
  loader.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  loadNextQuestion();
}

// Laad de volgende vraag
function loadNextQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= 10) {
    return endGame();
  }

  questionCounter++;
  progressText.innerText = `Vraag ${questionCounter} / 10`;
  progressBarFull.style.width = `${(questionCounter / 10) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions.splice(questionIndex, 1)[0];

  // Set the question text
  questionText.innerHTML = currentQuestion.question;

  // Set the question image
  const questionImage = document.getElementById('questionImage');
  if (currentQuestion.image) {
    questionImage.src = currentQuestion.image;
    questionImage.style.display = 'block'; // Show image if exists
  } else {
    questionImage.style.display = 'none'; // Hide image if no image exists
  }

  // Set the choices
  choiceTexts.forEach((choice, index) => {
    choice.innerText = currentQuestion['choice' + (index + 1)];
  });

  acceptingAnswers = true;
  startTimer(); // Start de timer wanneer een nieuwe vraag wordt geladen
}

// Start de timer
function startTimer() {
  timeLeft = 15; // Zet de timer terug naar 15 seconden elke keer als een nieuwe vraag wordt geladen
  timerText.innerText = timeLeft;
  timerText.classList.remove('warning'); // Verwijder de waarschuwing als deze eerder is toegevoegd
  clearInterval(timerInterval); // Stop elke bestaande timer om overlapping te voorkomen

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.innerText = timeLeft;

    // Voeg het waarschuwings effect toe in de laatste 5 seconden
    if (timeLeft <= 5) {
      timerText.classList.add('warning'); // Voeg de waarschuwingklasse toe (rood en pulserend)
    } else {
      timerText.classList.remove('warning'); // Verwijder de waarschuwing als de tijd boven de 5 seconden is
    }

    // Wanneer de tijd op is, ga naar de volgende vraag
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop de timer wanneer de tijd op is
      loadNextQuestion(); // Laad de volgende vraag
    }
  }, 1000);
}

// Behandel het antwoord van de gebruiker
choiceTexts.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.getAttribute('data-number');
    const correct = selectedAnswer == currentQuestion.answer;

    // Sla het resultaat van de vraag op
    questionsAttempted.push({
      question: currentQuestion.question,
      selectedAnswer: selectedChoice.innerText,
      correctAnswer: currentQuestion['choice' + currentQuestion.answer],
      correct: correct
    });

    localStorage.setItem('questionsAttempted', JSON.stringify(questionsAttempted));

    if (correct) {
      score += 10;
      scoreText.innerText = score;
    }

    selectedChoice.classList.add(correct ? 'correct' : 'incorrect');

    setTimeout(() => {
      selectedChoice.classList.remove(correct ? 'correct' : 'incorrect');
      loadNextQuestion();
    }, 1000);
  });
});

// Eindig het spel
function endGame() {
  clearInterval(timerInterval);

  const playerName = localStorage.getItem('playerName'); // Haal de naam van de speler uit localStorage
  if (playerName) {
    localStorage.setItem('latestScore', score); // Sla de score op in localStorage

    // Haal de hoge scores op en werk ze bij
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name: playerName, score: score });

    // Sorteer de hoge scores op score (aflopend)
    highScores.sort((a, b) => b.score - a.score);

    // Sla de bijgewerkte hoge scores op in localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }

  // Redirect naar de eindpagina
  window.location.assign('/end.html');
}
