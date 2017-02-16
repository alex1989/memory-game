var express = require('express');
var request = require('request');
var router = express.Router();
var lodash = require('lodash');
var gamesModels = require('../models/games');


/* New game */
router.post('/new', function(req, res, next) {
  var params = req.body;
  
  var promiseGetRequest = function(api) {
    return new Promise(function(resolve, reject) {
      request(api, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      })
    });
  };

  promiseGetRequest('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(function(deck) {
    return promiseGetRequest('https://deckofcardsapi.com/api/deck/' + deck.deck_id + '/draw/?count=6');
  })
  .then(function(deckInfo) {
    var cards = lodash.chain(deckInfo.cards)
                      .flatMap(function(card) {
                        return [card, Object.assign({}, card)]
                      })
                      .shuffle()
                      .value();
    var createCard = function(card) {
      var instance = new gamesModels.Card(card);
      return instance.save()
                     .then(function(cardInstance) {
                       return cardInstance;
                     })
                     .catch(function(error) {
                       console.error('error', error);
                     });
    }
    return Promise.all(cards.map(createCard));
  })
  .then(function(cards) {
    var game = new gamesModels.Game({
      username: params.username,
      cards: cards
    })
    return game.save()
  })
  .then(function(game) {
    res.status(200).json(game);
  })
  .catch(function(err) {
    res.status(500).send({err: err});
  })
});

router.post('/turn/:gameId/:cardId', function(req, res, next) {
  var params = req.params;
  gamesModels.Game.findOne({_id: params.gameId})
                  .then(function(game) {
                    var totalTurnedСards = game.cards.reduce(function(total, card) {
                      return total + ((card.turned && !card.opened && card._id != params.cardId) ? 1 : 0);
                    }, 0);
                    var turnedCard = game.cards.find(function(card) {
                      return card._id == params.cardId
                    });
                    if (totalTurnedСards == 1) {
                      var matchCard = game.cards.find(function(card) {
                          return card.turned &&
                                 turnedCard.code == card.code &&
                                 card._id != turnedCard._id;
                      });
                      return Promise.all(game.cards.map(function(card) {
                               card.turned = false;
                               if ((turnedCard && matchCard) &&
                                   (card._id == turnedCard._id || card._id == matchCard._id)) {
                                 card.opened = true;
                               }
                               return card.save()
                             })).then(function(cards){
                               game.turns += 1;
                               game.finished = game.cards.every(function(card) {
                                return card.opened;
                               });
                               return game.save();
                             });
                    }
                    turnedCard.turned = true;
                    return turnedCard.save().then(function(card) {
                      return game.save();
                    });
                  })
                  .then(function(game) {
                    res.status(200).json(game);
                  })
                  .catch(function(err) {
                    res.status(404).send('Not found');
                  })
});

router.get('/results', function(req, res, next) {
  gamesModels.Game.find({finished: true}, null, {sort: {'turns': 1}})
                  .then(function(games) {
                    res.status(200).json(games);
                  })
                  .catch(function(err) {
                    res.status(404).send('Not found');
                  })  
});


router.post('/reset-results', function(req, res, next) {
  gamesModels.Game.remove({finished: true})
                  .then(function(cards) {
                    res.status(200).json({success: true, cards: cards});
                  })
                  .catch(function(err) {
                    res.status(404).send('Not found');
                  });
});

/* GET users listing. */
router.get('/:gameId', function(req, res, next) {
  var params = req.params;
  gamesModels.Game.findOne({_id: params.gameId, finished: false})
                  .then(function(card) {
                    res.status(200).json(card);
                  })
                  .catch(function(err) {
                    res.status(404).send('Game not found');
                  })  
});

module.exports = router;