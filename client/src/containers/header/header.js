import React, {Component} from 'react';
import './header.css';
import MenuBtn from '../../components/MenuBtn';

import { connect } from 'react-redux';
import { addCard, updateEditing } from '../../actions';

import {Link} from 'react-router-dom';

class Header extends Component {
	onCreate = _ => {
		let oReq = new XMLHttpRequest();
		let blankCard = {
			title: 'test title',
			priority: 'Medium',
			by: 'test by',
			to: 'test to'
		}
		oReq.addEventListener('load', _ => {
			let data = JSON.parse(oReq.response);
			let {id, title, type, priority, by, to} = data;
			this.props.onAddCard(id, title, type, priority, by, to);
			this.props.onUpdateEditing(id);
		});
		oReq.open('POST', '/api/card/new');
		oReq.send(JSON.stringify(blankCard));
	}
	render() {
		return (
			<div className="Header">
				<Link to="/"><div className="logo">KANBAN</div></Link>
				<div className="menu">
					<Link to="/about"><MenuBtn text="About" /></Link>
					<MenuBtn
						text="+ NEW TASK"
						onClick={this.onCreate}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		cards: state.cards,
		editing: state.editing
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onAddCard: (id, title, type, priority, by, to) => {
			dispatch(addCard(id, title, type, priority, by, to));
		},
		onUpdateEditing: (id) => {
			dispatch(updateEditing(id));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
