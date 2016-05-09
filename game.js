var game = function () {
	this.turn = true;
	this.carrier = 5;
	this.battleship = 4;
	this.cruiser = 3;
	this.submarine = 3;
	this.destroyer = 2;
	this.horizontal = [1,2,3,4,5,6,7,8,9,10];
	this.vertical = ["a","b","c","d","e","f","g","h","i","j"];
	this.grid = {};
	this.players = {
		player1:{},
		player2:{}
	}
	this.init = function(playersArr, positionPicks) {
		this.combineHVGrid();
		for (var key in this.players) {
			var currPlayer = this.players[key];
			currPlayer.id = playersArr.pop();
			currPlayer.grid = this.grid;
			currPlayer.picks = positionPicks.pop();
			currPlayer.turn = !this.turn;
			this.turn = !this.turn;
		}
		this.setBoats();
		// this.startGame();
	}
	// this.startGame = function(positionPicks) {
	// 	for (var key in this.players){
	// 		var currPlayer = this.players[key];

	// 		// if (currPlayer.turn) {
	// 			// console.log('player ' + currPlayer.id + ' initiating send...')
	// 			// this.sendClientMsg(currPlayer.id,'message');
	// 		// }
	// 	}
	// }
	// this.sendClientMsg = function(currPlayerId,message) {
	// 	for (var i = 0; i < clients.length; i++) {
	// 		if (currPlayerId == clients[i].client.id) {
	// 			console.log('player ' + currPlayerId + ' sending client message...')
	// 			clients[i].emit('yourTurn', { message: message });
	// 		}
	// 	}
	// }
	this.setBoats = function () {
		for (var key in this.players){
			var currPlayer = this.players[key];
			for (boats in currPlayer.picks) {
				var currBoat = currPlayer.picks[boats];
				var isVertical = this.compareCoords(currBoat);
				var boatPosition = currBoat.head;
				while (boatPosition <= currBoat.tail) {
					currPlayer.grid[boatPosition] = boats;
					boatPosition = this.splitIncrease(boatPosition,isVertical);
				}
			}
			// console.log(currPlayer.grid)
		}	
	}
	// shotCoords should be in the following format: 
	// {
	// 	head: "a1",
	// 	tail: "c1"
	// }
	this.receiveShot = function(playerID,shotCoords) {
		for (var key in this.players){
			var currPlayer = this.players[key];
			if ( !currPlayer.turn ){

			}	
		}			
	}
	this.compareCoords = function(boatCoords) {
		var theHeadNum = boatCoords.head.replace( /^\D+/g, '');
		return boatCoords.tail.indexOf(theHeadNum) > -1 ?  false : true;
	}
	// this function returns increased coordinate position
	this.splitIncrease = function(coords, isVert){
		// var splitCoords = coords.split("");
		var splitCoords = coords.match(/[a-zA-Z]+|[0-9]+/g)
		return isVert ? splitCoords[0] + this.nextChar(splitCoords[1]) : this.nextChar(splitCoords[0]) + splitCoords[1];
		// return this.nextChar(splitCoords[0]) + this.nextChar(splitCoords[1]);
	}
	this.combineHVGrid = function() {
		var hz = this.horizontal;	
		var currGrid = this.grid;
		this.vertical.forEach(function(lttr) {
			hz.forEach(function(nmbr) {
				currGrid[lttr + nmbr] = null;
			})			
		})
	}
	this.nextChar = function(c) {
	    return String.fromCharCode(c.charCodeAt(0) + 1);
	}
}


var battleships = new game();
battleships.init([
		{id:"abc"},
		{id:"123"}
	],
	[
		{
			carrier: {head:"e10",tail:"j10"},
			battleship: {head:"a3",tail:"a6"},
			cruiser: {head:"f3",tail:"h3"},
			submarine: {head:"j6",tail:"j8"},
			destroyer: {head:"a1",tail:"b1"}
		},
		{
			carrier: {head:"e10",tail:"j10"},
			battleship: {head:"a3",tail:"a6"},
			cruiser: {head:"f3",tail:"h3"},
			submarine: {head:"j6",tail:"j8"},
			destroyer: {head:"a1",tail:"b1"}
		}
	]
);
// console.log(battleships.splitIncrease("c2", "horizontal"));
// console.log(battleships);
// console.log(battleships);
