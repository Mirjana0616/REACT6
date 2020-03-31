import React, {Component} from 'react';
import './Cards.scss';
import {Card} from '../Card/Card';
import uuid from 'react-uuid';

class Cards extends Component{




	render() {
		const {onDelete, onDouble} = this.props;
		return (
			<div className="cards">
			{this.props.players.map( element => <Card 
													key={element.id}
													uniqueId={element.id}
													name={element.name}
													lastName={element.lastName}
													age={element.age}
													duplicate={element.copy}
													onDelete={onDelete}
													onDouble={onDouble}
												/>
									)
			}
			</div>
		)
	}
}

export {Cards};