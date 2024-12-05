window.onload = function () {
  const playerName = localStorage.getItem('playerName');
  const latestScore = localStorage.getItem('latestScore');
  const questionsAttempted = JSON.parse(localStorage.getItem('questionsAttempted')) || [];
  const finalScoreElement = document.getElementById('finalScore');
  const topScoresList = document.getElementById('highScoresList');
  const questionResultsList = document.getElementById('questionResults');

  // Toon de score en naam van de speler
  if (playerName && latestScore !== null) {
    finalScoreElement.innerHTML = `Gefeliciteerd ${playerName}, je hebt de quiz voltooid. Je score is: ${latestScore} van de 100.`;
  }

  // Toon de top 3 hoge scores
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScoresList.innerHTML = highScores.slice(0, 3).map((score, index) => {
    return `<li class="high-score">${index + 1}. ${score.name} - ${score.score} punten</li>`;
  }).join('');

  // Toon de resultaten van elke vraag
  questionsAttempted.forEach((question, index) => {
    const questionResult = document.createElement('li');
    questionResult.innerHTML = `
      <strong>Vraag ${index + 1}:</strong> ${question.question}
      <br>Je hebt deze vraag ${question.correct ? 'goed' : 'fout'} beantwoord
      <br>Jouw antwoord: ${question.selectedAnswer}
      <br>Het juiste antwoord: ${question.correctAnswer}
      <br><br>
    `;
    questionResultsList.appendChild(questionResult);
  });
};
