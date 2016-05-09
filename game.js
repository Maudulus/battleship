// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var clients = [];

// server.listen(80);
// var $ = require('jquery');
// var jsdom = require("jsdom");


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
	this.picks = {
		carrier: {head:"",tail:""},
		battleship: {head:"",tail:""},
		cruiser: {head:"",tail:""},
		submarine: {head:"",tail:""},
		destroyer: {head:"",tail:""}
	}	
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
			// console.log(currPlayer.grid);
			for (boat in currPlayer.picks) {
				console.log(currPlayer.picks[boat]);
			}
		}	
	}
	// shotCoords should be in the following format: 
	// {
	// 	head: "a1",
	// 	tail: "c1"
	// }
	this.receiveShot = function(playerID,shotCoords) {
		// if ( this.compareCoords(shotCoords) ) {
			for (var key in this.players){
				var currPlayer = this.players[key];
				if ( !currPlayer.turn ){

				}	
			}			
		// }
	}
	// this.compareCoords = function(shotCoords) {
	// 	var splitCoords = shotCoords.str1.split("");
	// 	var commonsFound = 0;
	// 	for (var i = 0; i < splitCoords.length; i++) {
	// 	    if(shotCoords.str2.indexOf(splitCoords[i]) != -1) commonsFound++;
	// 	}
	// 	return commonsFound == 0 ? false : true;
	// }
	this.combineHVGrid = function() {
		var hz = this.horizontal;	
		var currGrid = this.grid;
		this.vertical.forEach(function(lttr) {
			hz.forEach(function(nmbr) {
				currGrid[lttr + nmbr] = null;
			})			
		})
	}
}


var battleships = new game();
battleships.init([{id:"abc"},{id:"123"}]);
// console.log(battleships);

// var players = [];
// var battleships; 
// io.on('connection', function (socket) {
// 	clients.push(socket);
// 	players.push(socket.conn.id);
// 	if(players.length == 2) {
// 		var currentPlayers = players.splice(0,2);
// 		battleships = new game;
// 		battleships.init(currentPlayers);
// 		// socket.on('shot', function(data) {
// 		// 	console.log('go...')
// 		// 	battleships.receiveShot(data);
// 		// });		
// 	} else { 
// 		// console.log('not enough players...');
// 	}
// 	// socket.on('shot', function(data) {
// 	// 	console.log(battleships);
// 	// 	console.log(data)
// 	// });
// 	// socket.emit('news', { hello: 'world' });
// 	// socket.on('my other event', function (data) {
// 	// });
// });

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

