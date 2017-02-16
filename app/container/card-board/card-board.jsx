import React from 'react';
import { Deck, ScoreTable, NewGame } from '../../components';
import { Grid, Row, Col, ButtonToolbar, Button, Label } from 'react-bootstrap';
import chunk from 'lodash/chunk';
import chain from 'lodash/chain';
import shuffle from 'lodash/shuffle';
import map from 'lodash/map';
import {gamesApi} from '../../actions';


class CardBoard extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      turns: 0,
      cards: [],
      results: [],
      finished: false,
      createNewGame: false
    }
  }

  componentDidMount() {
    this.getResults();
  }

  createNewGame() {
    this.setState(Object.assign({}, this.state, {createNewGame: true}));
  }

  cancelCreateNewGame() {
    this.setState(Object.assign({}, this.state, {createNewGame: false}));
  }

  resetHighscore() {
    gamesApi.resetHighscore()
            .then(() => {
              this.setState(Object.assign({}, this.state, {results: []}))
            })
  }

  newGame(username) {
    gamesApi.newGame(username)
            .then((response) => {
              return response.json()
            })
            .then((game) => {
              this.setState(Object.assign({}, this.state, game, {createNewGame: false}));
            })
  }

  turnCard(card) {
    gamesApi.turnCard(this.state._id, card._id)
            .then((res) => {
              return res.json();
            })
            .then((game) => {
              if (this.state.turns != game.turns && !game.finished) {
                this.setState(Object.assign({}, this.state, {cards: this.state.cards.map((c) => {
                  if (c._id == card._id) {
                    c.turned = true;
                  }
                  return c;
                })}));
                setTimeout(()=> {
                  this.setState(Object.assign({}, this.state, game));
                }, 5e2);
              } else {
                console.log('getResults');
                this.setState(Object.assign({}, this.state, game));
                if (game.finished) {
                  this.getResults();
                }
              }
              
            })
  }

  getResults() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    gamesApi.getResults()
            .then((res) => {
              if (res.status == 200) {
                return res.json()
              }
              throw Error(res.statusText);
            })
            .then((results) => {
              this.setState(Object.assign({}, this.state, {results}));
              this.timeoutId = setTimeout(() => {
                this.getResults();
              }, 1e5)
            });
  }

  render() {
    const {turns, cards, results, createNewGame, finished} = this.state;
    return <Grid>
          <h1 className="text-center">Memory Game</h1>
          <Row>
            <Col sm={8}>
              <ButtonToolbar>
                  <Button bsStyle="primary" onClick={() => { this.createNewGame(); }}>Play</Button>
                  <Button bsStyle="danger" onClick={() => { this.resetHighscore(); }}>Reset highscore</Button>
              </ButtonToolbar>
            </Col>
            <Col sm={4}>
              <h4 className="text-right">Turns <Label>{turns}</Label></h4>
            </Col>
          </Row>
          <Row>
            {finished && (<h2>Congratulations. You have finished game</h2>)
                      || (<Deck cards={cards} turnCard={(card) => {this.turnCard(card)}}/>)}
            <ScoreTable results={results}/>
            <NewGame show={createNewGame}
                     startNewGame={(username) => { this.newGame(username);}} 
                     close={() => {this.cancelCreateNewGame()}}/>
          </Row>
        </Grid>

  }
}

export default CardBoard;