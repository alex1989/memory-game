import React from 'react';
import ReactDOM from 'react-dom';

import CardBoard from './container/card-board/card-board';

require('bootstrap/dist/css/bootstrap.css');

ReactDOM.render(
	<CardBoard />,
	document.body.appendChild(document.createElement('div')),
);
