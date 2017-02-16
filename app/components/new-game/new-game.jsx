import React from 'react';
import { Modal, FormGroup, HelpBlock, FormControl, ControlLabel, Button } from 'react-bootstrap';
import * as _ from 'lodash';

class NewGame extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired,
    startNewGame: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: props.show,
      username: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {showModal: nextProps.show}))
  }

  validateUsername() {
    const length = this.state.username.length;
    if (length == 0) return 'error';
    else {
      return'success';
    }
  }

  handleChange(e) {
    this.setState(Object.assign({}, this.state, { username: e.target.value }));
  }

  render() {
    const {username} = this.state;
    return <Modal show={this.state.showModal} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title>Start New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId="username" validationState={this.validateUsername()}>
                <ControlLabel>Username</ControlLabel>
                <FormControl type="text" value={username} placeholder="Enter Username" onChange={(e) => this.handleChange(e)}/>
                <HelpBlock>Please enter username</HelpBlock>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary"
                      disabled={username.length == 0}
                      onClick={() => {this.props.startNewGame(username)}}>Start</Button>
              <Button onClick={this.props.close}>Close</Button>
            </Modal.Footer>
          </Modal>
  }
};

export default NewGame;

