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
			currPlayer.hits = [];
			currPlayer.turn = !this.turn;
			this.turn = !this.turn;
		}
		this.setBoats();
	}
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
			if ( !currPlayer.turn && currPlayer.id == playerID ){
				if (currPlayer.grid[shotCoords]) {
					if (currPlayer.grid[shotCoords]!== "hit" && currPlayer.grid[shotCoords] !== "miss") {
						currPlayer.hits.push(currPlayer.grid[shotCoords]);
						currPlayer.grid[shotCoords] = "hit";
					}
				} else {
					currPlayer.grid[shotCoords] = "miss";
				}
			}	
			this.countHits(currPlayer);
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
	this.countHits = function(currPlayer) {
		var playerCarriers = this.countArr(currPlayer.hits,"carrier");
		var playerBattleships = this.countArr(currPlayer.hits,"battleship");
		var playerCruisers = this.countArr(currPlayer.hits,"cruiser");
		var playerSubmarines = this.countArr(currPlayer.hits,"submarine");
		var playerDestroyers = this.countArr(currPlayer.hits,"destroyer");
		if ( playerCarriers == this.carrier && playerBattleships == this.battleship && playerCruisers == this.cruiser && playerSubmarines == this.submarine && playerDestroyers == this.destroyer ) {
			return this.gameOver(currPlayer);
		}
	}
	this.countArr = function(dataset, search) {
		var count = 0;
		for(var i = 0; i< dataset.length; i++) {
			dataset[i] == search ? count++ : count+=0;
		}
		return count;
	}
	this.gameOver = function(currPlayer) {
		console.log("This game is over");
		return true;
	}
}


var battleships = new game();
battleships.init([
		"abc",
		"123"
	],
	[
		{
			carrier: {head:"e10",tail:"i10"},
			battleship: {head:"a3",tail:"a6"},
			cruiser: {head:"f3",tail:"h3"},
			submarine: {head:"j6",tail:"j8"},
			destroyer: {head:"a1",tail:"b1"}
		},
		{
			carrier: {head:"e10",tail:"i10"},
			battleship: {head:"a3",tail:"a6"},
			cruiser: {head:"f3",tail:"h3"},
			submarine: {head:"j6",tail:"j8"},
			destroyer: {head:"a1",tail:"b1"}
		}
	]
);
battleships.receiveShot("123","e10");
battleships.receiveShot("123","f10");
battleships.receiveShot("123","g10");
battleships.receiveShot("123","h10");
battleships.receiveShot("123","i10");
battleships.receiveShot("123","j10");
battleships.receiveShot("123","a3");
battleships.receiveShot("123","a4");
battleships.receiveShot("123","a5");
battleships.receiveShot("123","a6");
battleships.receiveShot("123","f3");
battleships.receiveShot("123","g3");
battleships.receiveShot("123","h3");
battleships.receiveShot("123","j6");
battleships.receiveShot("123","j7");
battleships.receiveShot("123","j8");
battleships.receiveShot("123","a1");
battleships.receiveShot("123","b1");
