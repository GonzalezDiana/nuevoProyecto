/* Define the player model. */
/*
 * Represents a player in the game
 * @param name [String]: old state to intialize the new state
 */

var mongoose = require('mongoose');
var db= mongoose.createConnection('mongodb://localhost/Game');
var _ = require('lodash');

var PlayerSchema = mongoose.Schema({
	name: String,
	cards: {type: Array, default : [] },
	cartasJugadas:{type: Array, default : [] },
	envidoPoints:Number,
  currentGame: {type: Number, ref: 'Game' }
});

var Player = mongoose.model('Player', PlayerSchema); 

Player.prototype.setCards = function(cards){
	this.cards = cards;
	this.envidoPoints = this.points();
}

//Points
Player.prototype.points = function(){
	return Math.max(this.cards[0].puntos(this.cards[1]), this.cards[0].puntos(this.cards[2]), this.cards[1].puntos(this.cards[2]));
};

module.exports.player = Player;
