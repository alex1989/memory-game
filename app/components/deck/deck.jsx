import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import * as _ from 'lodash';

import Card from '../card/card'

class Deck extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array.isRequired,
    turnCard: React.PropTypes.func.isRequired,
  }

  render() {
    const { cards, name } = this.props;
    const renderedCards = _.chain(_.chunk(cards, 4)).map((cardChain, idx) => {
      return <Row key={idx}>
               {cardChain.map((card) => <Col key={card._id} xs={3}><Card turnCard={this.props.turnCard} card={card}/></Col>)}
             </Row>
    }).value();

    return (<div className="deck">
              {renderedCards}
            </div>);
  }
};


export default Deck;