// highscores.js

window.onload = function () {
  const highScoresList = document.getElementById('highScoresList');
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Display the high scores list
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join('');
  
  const clearScoresBtn = document.getElementById('clearScoresBtn');

  clearScoresBtn.addEventListener('click', () => {
    if (confirm('Weet je zeker dat je alle scores wilt verwijderen?')) {
      localStorage.removeItem('highScores');
      
      alert('Alle scores zijn verwijderd!');
      location.reload(); 
    }
  });
};
