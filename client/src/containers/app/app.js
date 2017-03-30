import React, {Component} from 'react';
import Header from '../header/header';
import Board from '../board/board';
import About from '../../components/About';
import './app.css';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Router>
					<div className="route-container">
						<Header />
						<Route exact path="/" component={Board} />
						<Route path="/about" component={About} />
					</div>
				</Router>
      </div>
    );
  }
}

export default App;
