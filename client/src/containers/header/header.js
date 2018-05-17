import React, {Component} from 'react';
import './header.css';
import MenuBtn from '../../components/MenuBtn';

import { connect } from 'react-redux';
import { addCard, updateEditing, updateEditBuff, editCard } from '../../actions';

import {Link} from 'react-router-dom';

class Header extends Component {
	onCreate = _ => {
		let oReq = new XMLHttpRequest();
		let blankCard = {
			title: '[blank title]',
			priority: '[unassigned priority]',
            type: 'queue-card',
			by: '[blank]',
			to: '[blank]'
		}
		oReq.addEventListener('load', _ => {
			let data = JSON.parse(oReq.response);
			let {id, title, type, priority, by, to} = data;
            this.props.onUpdateEditBuff(id, title, type, priority, by, to);
			this.props.onAddCard(id, title, type, priority, by, to);
			this.props.onUpdateEditing(id);
		});
		oReq.open('POST', `${this.props.baseUrl}/api/card/new`);
		oReq.send(JSON.stringify(blankCard));
	}
	render() {
		return (
			<div className="Header">
				<Link to="/projects/kanban/"><div className="logo">KANBAN</div></Link>
				<div className="menu">
					<Link to="/projects/kanban/about"><MenuBtn text="About" /></Link>
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
		baseUrl: state.baseUrl,
		cards: state.cards,
		editing: state.editing,
		editBuff: state.editBuff
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onAddCard: (id, title, type, priority, by, to) => {
			dispatch(addCard(id, title, type, priority, by, to));
		},
		onUpdateEditBuff: (id, title, type, priority, by, to) => {
			dispatch(updateEditBuff(id, title, type, priority, by, to));
		},
		onUpdateEditing: (id) => {
			dispatch(updateEditing(id));
		},
		onEditCard: (id, title, type, priority, by, to) => {
			dispatch(editCard(id, title, type, priority, by, to));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
