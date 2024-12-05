// category.js

window.onload = function () {
  const playerName = localStorage.getItem('playerName');
  const welcomeMessage = document.getElementById('welcomeMessage');

  if (playerName) {
    welcomeMessage.innerText = `Hallo, ${playerName}! Kies een categorie.`;
  } else {
    window.location.assign('/');  // Redirect naar de startpagina als de naam niet is gevonden
  }
};


