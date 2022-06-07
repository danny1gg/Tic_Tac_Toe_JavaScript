var table = document.getElementById("gameTable");
var gameStatus = document.getElementById("showGameStatus");
var playerMove = document.getElementById("showPlayerMove");
var nrMove = 0, countOnRowX = 0, countOnRow0 = 0;
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
		checkForWinner();	
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

function checkForWinner() {
	for (let i = 1; i <= 3; ++i) {
		if (gridMap[i] == "X" && gridMap[i + 3] == "X" && gridMap[i + 6] == "X" ||
			gridMap[(i * 3) - 2] == "X" && gridMap[(i * 3) - 1] == "X" && gridMap[i * 3] == "X" ||
			i == 1 && gridMap[1] == "X" && gridMap[5] == "X" && gridMap[9] == "X"||
			i == 1 && gridMap[3] == "X" && gridMap[5] == "X" && gridMap[7] == "X") {
			++countOnRowX;
		} else if (gridMap[i] == "0" && gridMap[i + 3] == "0" && gridMap[i + 6] == "0" ||
			gridMap[(i * 3) - 2] == "0" && gridMap[(i * 3) - 1] == "0" && gridMap[i * 3] == "0" ||
			i == 1 &&gridMap[1] == "0" && gridMap[5] == "0" && gridMap[9] == "0" ||
			i == 1 &&gridMap[3] == "0" && gridMap[5] == "0" && gridMap[7] == "0") {
			++countOnRow0;
		}
		showWinner();
	}
}

function showWinner() {
	if (countOnRowX == 1) {
		gameStatus.innerHTML = "Player 1 won!";
		displayEndGameElements();
	} else if (countOnRow0 == 1) {
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