import React from 'react';
import { Image } from 'react-bootstrap';
require('./card.css');


class Card extends React.Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired,
    turnCard: React.PropTypes.func.isRequired,
  }

  render() {
    const { card } = this.props;
    const showImage = card.opened || card.turned;
    return (
        <div className="card-padding">
            {!showImage && <div onClick={() => { this.props.turnCard(card); }} className="card-back"></div>}
            <Image className={!showImage && 'hidden'} src={card.image} responsive />
        </div>)
  }
}

export default Card;