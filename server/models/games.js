var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Card = new Schema({
    suit: { type: String, required: true },
    image: { type: String, required: true },
    code: { type: String, required: true },
    value: { type: String, required: true },
    opened: { type: Boolean, default: false },
    turned: { type: Boolean, default: false },
});


var Game = new Schema({
    username: { type: String, required: true },
    finished: { type: Boolean, default: false },
    turns: { type: Number, default: 0},
    cards: [Card],
});



module.exports = {
    Game: mongoose.model('Game', Game),
    Card: mongoose.model('Card', Card)
};
