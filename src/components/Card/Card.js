import React, {Component} from 'react';
import './Card.scss';
import copy from  '../../images/copy.png';
import copySign from  '../../images/copySign.png';

class Card extends Component{

	render() {
		const {name, lastName, age, onDelete, uniqueId, onDouble, duplicate} = this.props;
		return (
			<div className="card">
				<span>Name:<br/> {name} </span>
				<span>Last name:<br/> {lastName} </span>
				<span>Age: {age} </span>
				<div className="delete" onClick={() => onDelete(uniqueId)}>X</div>
				<div className="duplicate" onClick={() => onDouble(uniqueId)}><img src={copy}/></div>
				{duplicate && <div className="duplikat"><img src={copySign}/></div>}
			</div>
		)
	}
}

export {Card};