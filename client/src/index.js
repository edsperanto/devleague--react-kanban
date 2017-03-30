import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/app';
import './index.css';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import cards from './reducers';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

let store = createStore(cards);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route exact path="/" component={App} />
		</Router>
	</Provider>,
  document.getElementById('root')
);
