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
    return (<div className="card-container">
        <div className={showImage && 'card flipped' || 'card'}>
            <div onClick={() => { this.props.turnCard(card); }} className="front"></div>
            <Image className='back' src={card.image} responsive />
        </div>
      </div>)
  }
}

export default Card;