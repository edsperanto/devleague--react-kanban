import React, {Component} from 'react';
import Header from '../header/header';
import Board from '../board/board';
import About from '../../components/About';
import './app.css';

import { connect } from 'react-redux';
import { addCard } from '../../actions';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

class App extends Component {
	componentWillMount() {
		let oReq = new XMLHttpRequest();
		oReq.addEventListener('load', _ => {
			let Cards = JSON.parse(oReq.response);
			Cards.forEach(({id, title, type, priority, by, to}) => {
				this.props.onAddCard(id, title, type, priority, by, to);
			});
		});
		oReq.open('GET', `${this.props.baseUrl}/api/card/all`);
		oReq.send();
	}
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

function mapStateToProps(state) {
	return { 
		baseUrl: state.baseUrl,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onAddCard: (id, title, type, priority, by, to) => {
			dispatch(addCard(id, title, type, priority, by, to));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
