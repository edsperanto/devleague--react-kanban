import React, {Component} from 'react';
import './board.css';
import Card from '../../components/Card';

import { connect } from 'react-redux';
import { addCard } from '../../actions';

class Board extends Component {
	constructor() {
		super();
		this.state = {
			queueCards: [],
			progressCards: [],
			doneCards: [],
			editing: null,
			editBuff: {}
		};
		this.reload();
	}
	reload() {
		['queue', 'progress', 'done'].map((type) => {
			return (_ => {
				let oReq = new XMLHttpRequest();
				oReq.addEventListener('load', _ => {
					this.setState({
						[`${type}Cards`]: JSON.parse(oReq.response)
					});
				});
				oReq.open('GET', `/api/card/all/${type}-card`);
				oReq.send();
			})();
		});
	}
	onEdit = ({id, title, type, priority, by, to}) => {
		return (event) => {
			if(this.state.editing === id) {
				let oReq = new XMLHttpRequest();
				oReq.addEventListener('load', _ => this.reload());
				oReq.open('PUT', `/api/card/edit/${id}`);
				oReq.setRequestHeader("Content-Type", "application/json");
				oReq.send(JSON.stringify(this.state.editBuff));
			}
			this.setState({
				editBuff: {title, type, priority, by, to},
				editing: (this.state.editing === id) ? null : id
			});
		}
	}
	onDel = (event) => {
		let ele = event.target.parentElement.parentElement.parentElement;
		let oReq = new XMLHttpRequest();
		oReq.addEventListener('load', _ => ele.remove());
		oReq.open('DELETE', `/api/card/delete/${ele.dataset.id}`);
		oReq.send();
	}
	change = (prop) => {
		return (event) => {
			let newEditBuff = this.state.editBuff;
			newEditBuff[prop] = event.target.value;
			this.setState({editBuff: newEditBuff});
		}
	}
	render() {
		return (
			<div className="Board">
				{['queue', 'progress', 'done'].map(type => {
					return (
						<div key={type} className={type}>
							<div className="board-title">
								{((type !== 'done') ? 'IN ' : '') + type.toUpperCase()}
							</div>
							{
								this.state[`${type}Cards`].map(card => {
									const {id, title, type, priority, by, to} = card;
									return (<Card 
										key={id}
										id={id}
										title={title}
										type={type}
										priority={priority}
										by={by}
										to={to}
										editing={this.state.editing === id}
										onDel={this.onDel}
										onEdit={this.onEdit(card)}
										change={this.change}
									/>);
								})
							}
						</div>
					)
				})}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		queueCards: state.queueCards,
		progressCards: state.progressCards,
		doneCards: state.doneCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onAddCard: (title, type, priority, by, to) => {
			dispatch(addCard(title, type, priority, by, to));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);
