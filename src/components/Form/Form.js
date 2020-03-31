import React, {Component} from 'react';
import './Form.scss';
import uuid from 'react-uuid';

class Form extends Component{

	state = {
		name: '',
		lastName : '',
		age: '',
		submit: false,
		close: false,
	}

	shouldComponentUpdate(nextProps, nextState){
		const {name, lastName, age} = this.state;
		if (nextState.submit !== this.state.submit || nextState.close !== this.state.close) {
			return true
		}
		return false
	}

	componentDidUpdate(){
		const {closeForm, addNewPlayer} = this.props;
		if (this.state.submit) {
			const {name, lastName, age} = this.state;
				const newPlayer = {
					name: name,
					lastName: lastName,
					age: age,
					id: uuid(),
				}
				addNewPlayer(newPlayer);
		}
		closeForm(false);
	}


	addName(event) {
		this.setState({
			name : event.target.value,
		})
	}

	addLastName(event) {
		this.setState({
			lastName : event.target.value,
		})
	}

	addAge(event) {
		this.setState({
			age : event.target.value,
		})
	}

	addPlayer() {
		this.setState({
			submit : true,
			close: true,
		})
	}

	closeForm(){
		this.setState({
			close: true,
		})
	}

	render() {
		return (
			<section className="form">
				<p>Add new player</p>
				<label className="first">Name: 
					<input type="text" 
						   name="name" 
						   id="name" 
						   placeholder="Type name" 
						   onChange={e => this.addName(e)}
					/>
				</label>
				<label>Last Name: 
					<input type="text" 
						   name="lastName" 
						   id="lastName" 
						   placeholder="Type lastname" 
						   onChange={e => this.addLastName(e)}
				    />
				</label>
				<label>Age: 
					<input type="number" 
						   name="age" 
						   id="age" 
						   placeholder="Type age" 
						   onChange={ e => this.addAge(e)}
					/>
				</label>
				<input type="submit" 
					   value="Submit" 
					   onClick={ () => this.addPlayer()}
				/>
				<button onClick={ () => this.closeForm()}>X</button>
			</section>
		)
	}
}

export {Form};