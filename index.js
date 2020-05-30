// declare the variables
var scores, currentScore, score, dices, activePlayer;
dices = document.querySelector("#dices");

init();


document.querySelector('#btn-roll-dice').addEventListener('click', rollDice);
document.querySelector('#btn-hold').addEventListener('click', hold);
document.querySelector('#btn-new-game').addEventListener('click', newGame);


function init() {
	scores = [0, 0];
	currentScore = 0;
	score = 0;
	dices.style.display = 'none';
	activePlayer = 0;
	document.querySelector(`#score-0`).textContent = 0;
	document.querySelector(`#score-1`).textContent = 0;
	document.querySelector('#current-score-0').textContent = 0;
	document.querySelector('#current-score-1').textContent = 0;
	document.querySelector('#card-0').classList.add('active-player');
	document.querySelector('#card-1').classList.remove('active-player');
}

function rollDice() {

	dices.style.display = '';
	// generate a random number between 1 and 6
	var random = Math.ceil(Math.random() * 6);

	// change the dice
	var diceImage = document.querySelector('#dice-image');
	diceImage.src = `./assets/dice-${random}.png`;


	// change the current score of the active player 
	// if random is one set the current score to zero and change the active player 
	if (random === 1) {
		nextPlayer();

	} else {
		currentScore += random;
		document.querySelector(`#current-score-${activePlayer}`).textContent = currentScore;
	}

}

function hold() {
	var activePlayerScore = document.querySelector(`#score-${activePlayer}`);
	// add the score 
	scores[activePlayer] += currentScore;

	// update the ui
	activePlayerScore.textContent = scores[activePlayer];


	if (scores[activePlayer] >= 20) {
		document.querySelector(`#player-${activePlayer}`).textContent = 'Winner !';
		dices.style.display = 'none';

		// disable the roll and hold buttons
		document.querySelector('#btn-hold').disabled = true;
		document.querySelector('#btn-roll-dice').disabled = true;

		// add the winner class and remove the active class to the winner 
		document.querySelector(`#card-${activePlayer}`).classList.remove('active-player');
		document.querySelector(`#card-${activePlayer}`).classList.add('winner-player');
	} else {
		nextPlayer();
	}
}


function nextPlayer() {
	currentScore = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;


	for (var i = 0; i < scores.length; i++) {
		document.getElementById(`current-score-${i}`).textContent = '0';
	}

	for (let i = 0; i < scores.length; i++) {
		document.querySelector(`#card-${i}`).classList.toggle('active-player');
	}

	dices.style.display = 'none';
}


function newGame() {
	init();

	// enable the roll and hold buttons
	document.querySelector('#btn-hold').disabled = false;
	document.querySelector('#btn-roll-dice').disabled = false;

	// Reset the name of the players 
	document.querySelector(`#player-0`).textContent = 'Player 0';
	document.querySelector(`#player-1`).textContent = 'Player 1';

	// Remove the winner class from both players since we don't know which one is the winner 
	// and add the active class to the player 0
	document.querySelector(`#card-0`).classList.remove('winner-player');
	document.querySelector(`#card-1`).classList.remove('winner-player');
	document.querySelector(`#card-0`).classList.add('active-player');

}