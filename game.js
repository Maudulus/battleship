var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clients = [];

server.listen(80);

var game = function () {
	this.turn = true;
	this.grid = {
		horizontal:[1,2,3,4,5,6,7,8],
		vertical: ["a","b","c","d","e","f","g"]
	};
	this.picks = {
		carrier: "",
		battleship: "",
		cruiser: "",
		submarine: "",
		destroyer: ""
	}	
	this.players = {
		player1:{},
		player2:{}
	}
	this.init = function(arr) {
		for (var key in this.players){
			var currPlayer = this.players[key];
			currPlayer.id = arr.pop();
			currPlayer.picks = this.picks;
			currPlayer.turn = !this.turn;
			this.turn = !this.turn;
		}
		this.startGame();
	}
	this.startGame = function() {
		for (var key in this.players){
			var currPlayer = this.players[key];
			if (currPlayer.turn) {
				console.log('player ' + currPlayer.id + ' initiating send...')
				this.sendClientMsg(currPlayer.id,'message');
			}
		}
	}
	this.sendClientMsg = function(currPlayerId,message) {
		for (var i = 0; i < clients.length; i++) {
			if (currPlayerId == clients[i].client.id) {
				console.log('player ' + currPlayerId + ' sending client message...')
				clients[i].emit('yourTurn', { message: message });
			}
		}
	}
}

var players = [];
var battleships; 
io.on('connection', function (socket) {
	clients.push(socket);
	players.push(socket.conn.id);
	if(players.length == 2) {
		var currentPlayers = players.splice(0,2);
		battleships = new game;
		battleships.init(currentPlayers);
	} else { 
		// console.log('not enough players...');
	}
	socket.on('shot', function(data) {
		console.log(data)
	});
	// socket.emit('news', { hello: 'world' });
	// socket.on('my other event', function (data) {
	// });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

