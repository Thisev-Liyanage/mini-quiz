// start.js

document.getElementById('startGameBtn').addEventListener('click', () => {
  const playerName = document.getElementById('playerName').value.trim();

  if (!playerName) {
    alert('Vul uw naam in!');
    return;
  }

  // Bewaar de naam van de speler in localStorage
  localStorage.setItem('playerName', playerName);

  // Redirect naar de categorie-selectie pagina
  window.location.assign('/category.html');
});
