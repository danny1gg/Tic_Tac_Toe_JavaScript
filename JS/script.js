var table = document.getElementById("gameTable");
var gameStatus = document.getElementById("showGameStatus");
var playerMove = document.getElementById("showPlayerMove");
var nrMove = 0, haveThreeMatchingCells = 0;
var gameFinished = false;
var gridMap = [];
var player = "X";
startRound();

function startRound() {
	var counterCells = 1;
	for (let i = 1; i <= 3; ++i) {
		let row = document.createElement("tr");	
		for (let j = 1; j <= 3; ++j) {
			var cell = document.createElement("td");
			cell.setAttribute("id", counterCells++);
			cell.setAttribute("onClick", "selectCell()");
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
}

function selectCell() {
	let id = event.srcElement.id;
	let selectedCell = document.getElementById(id);
	if (selectedCell.innerHTML == "" && gameFinished == false) {
		switchPlayersMove(selectedCell); 
		selectedCell.innerHTML = player;
		gridMap[id] = player;
		checkForWinner(player);	
	}	
}

function switchPlayersMove(cell) {
	if (nrMove % 2 == 0) {
		player = "X";
		playerMove.innerHTML = "Player 2 to move... 0";
		playerMove.style.color = "red";
		cell.style.color = "blue";
	} else {
		player = "0";
		playerMove.innerHTML = "Player 1 to move... X";
		playerMove.style.color = "blue";
		cell.style.color = "red";
	}
	++nrMove;
}

function checkForWinner(player) {
	for (let i = 1; i <= 3; ++i) {
		if (gridMap[i] == player && gridMap[i + 3] == player && gridMap[i + 6] == player 
			|| gridMap[(i * 3) - 2] == player && gridMap[(i * 3) - 1] == player && gridMap[i * 3] == player 
			|| gridMap[5 - (i + i)] == player && gridMap[5] == player && gridMap[5 + (i + i)] == player && i <= 2) {
			(player == "X") ? ++haveThreeMatchingCells : --haveThreeMatchingCells;
		}
		showWinner();
	}
}

function showWinner() {
	if (haveThreeMatchingCells == 1) {
		gameStatus.innerHTML = "Player 1 won!";
		displayEndGameElements();
	} else if (haveThreeMatchingCells == -1) {
		gameStatus.innerHTML = "Player 2 won!";
		displayEndGameElements();
	} else if (nrMove == 9) {
		gameStatus.innerHTML = "Draw!";
		displayEndGameElements();
	}
}

function displayEndGameElements() {
	gameFinished = true;
	showPlayerMove.innerHTML = "";
	document.getElementById("reload").style.visibility = "visible";
}
