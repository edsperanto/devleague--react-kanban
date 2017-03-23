import React from 'react';

const Card = (props) => {
	return (!props.editing) ? (
		<div className={'card ' + props.type} data-id={props.id}>
				<p><b>{props.title}</b></p>
				<p>Priority: {props.priority}</p>
				<p>Assigned By: {props.by}</p>
				<div className="card-bottom">
					<div className="card-menu">
						<div onClick={props.onEdit}>Edit</div>
						<div onClick={props.onDel}>Delete</div>
					</div>
					<div>
						<p>{props.to}</p>
					</div>
				</div>
		</div>
	) : (
		<div>
			<div className="editCover"></div>
			<div className={'card editCard ' + props.type} data-id={props.id}>
				<div className="editTitle">Editing</div>
				<div>
					<label>Title:</label>
					<input type="text" onChange={props.cTitle} defaultValue={props.title} />
				</div>
				<div>
					<label>Assigned By:</label>
					<input type="text" onChange={props.cBy} defaultValue={props.by} />
				</div>
				<div>
					<label>Assigned To:</label>
					<input type="text" onChange={props.cTo} defaultValue={props.to} />
				</div>
				<div>
					<label>Priority:</label>
					<input type="radio" name="priority" value="Low" checked={props.priority==='Low'} />
					<label>Low</label>
					<input type="radio" name="priority" value="Medium" checked={props.priority==='Medium'} />
					<label>Medium</label>
					<input type="radio" name="priority" value="High" checked={props.priority==='High'} />
					<label>High</label>
				</div>
				<div>
					<label>Status:</label>
					<input type="radio" name="type" value="queue" checked={props.type==='queue-card'} />
					<label>In Queue</label>
					<input type="radio" name="type" value="progress" checked={props.type==='progress-card'} />
					<label>In Progress</label>
					<input type="radio" name="type" value="done" checked={props.type==='done-card'} />
					<label>Done</label>
				</div>
				<div className="card-menu">
					<div onClick={props.onEdit}>Done</div>
					<div onClick={props.onDel}>Delete</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
