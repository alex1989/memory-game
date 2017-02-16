import React from 'react';
import { Table } from 'react-bootstrap';

class ScoreTable extends React.Component {

  static propTypes = {
    results: React.PropTypes.array.isRequired,
  }

  render() {
    const {results} = this.props;
    return <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Turns</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => 
            <tr key={idx}>
              <td>{idx}</td>
              <td>{result.turns}</td>
              <td>{result.username}</td>
            </tr>
          )}
        </tbody>
      </Table>;

  }
}

export default ScoreTable;