import React, {Component, Fragment} from 'react';
import './App.scss';
import uuid from 'react-uuid';



import {Cards} from './components/Cards/Cards';
import {Form} from './components/Form/Form';
import {Header} from './components/Header/Header';

class App extends Component {

	state = {
		filteredData: [],
		playersData :[
			{
				name : "Steve ",
				lastName : "Kerr",
				age: 30,
				id: uuid(),
			},
			{
				name : "Scottie",
				lastName : "Pippen",
				age: 30,
				id: uuid(),
			},
			{
				name : "Carlos",
				lastName : "Tevez",
				age: 35,
				id: uuid(),
			},
			{
				name : "Toni",
				lastName : "Kukoc",
				age: 27,
				id: uuid(),
			},
			{
				name : "Michael",
				lastName : "Jordan",
				age: 32,
				id: uuid(),
			},
			{
				name : "Dennis",
				lastName : "Rodman",
				age: 34,
				id: uuid(),
			},
			{
				name : "Ron",
				lastName : "Harper",
				age: 31,
				id: uuid(),
			},
			{
				name : "Luc",
				lastName : "Longley",
				age: 26,
				id: uuid(),
			}
			
		],
		form : false,
		searchedTerm: '',
	}

	componentDidMount(){
		const {playersData} = this.state;
		this.setState({
			filteredData: playersData,
		})
	}

	sholudComponentUpdate(nextProps, nextState) {
		if (nextState.form !== this.state.form || nextState.filteredData.length !== this.state.filteredData.length) {
			return true
		}
		return false
	}

	sortPlayers(a,b){
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();

		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}

		return comparison;
	}

	sort() {
		const myArr = [...this.state.playersData];
		myArr.sort(this.sortPlayers);
		this.setState({
			playersData : myArr,
		}, () => this.searchAfterAddingPlayer())
	}

	searchAfterAddingPlayer() {
		const filteredData = this.state.playersData.filter( item => {
			return item.name.concat(item.lastName).toLowerCase().includes(this.state.searchedTerm.toLowerCase().trim())
		})
	  	this.setState({
	  		filteredData : filteredData,
	  	})
	}

	dataSearch(text) {
		const filteredData = this.state.playersData.filter( item => {
			return item.name.concat(item.lastName).toLowerCase().includes(text.toLowerCase().trim())
		})
	  	this.setState({
	  		filteredData : filteredData,
	  		searchedTerm : text
	  	})
	}

	openForm(){
		this.setState({
			form: true,
		})
	}

	addPlayer(somePlayer) {
		const newTeam = [...this.state.playersData];
		const {name, lastName, age} = somePlayer;
		console.log("Name: " + name + " Lastname: " + lastName + " Age: " + age);
		if (!(name && lastName && age)) {
			alert("All fields must be filled !!!");
			this.setState({
				form: true,
			})
		} else {
			newTeam.push(somePlayer);
			console.log(newTeam);
			this.setState({
				playersData: newTeam,
				form: false,
			}, () => this.searchAfterAddingPlayer())
			
		}
	}

	closeForm(value){
		this.setState({
			form:value,
		})
	}

	onDelete(someId){
		const myArrayOfObjects = this.state.playersData.filter( item => {
			return item.id !== someId;
		})
		this.setState({
			filteredData : myArrayOfObjects,
			playersData :myArrayOfObjects,
		})
	}

	onDouble(someId){
		const isMyElement = element => element.id === someId;
		const myIndex = this.state.playersData.findIndex(isMyElement);
		const myArr = [...this.state.playersData];
		const myElement = {...this.state.playersData[myIndex]};
		myElement.id = uuid();
		myElement.copy = true;
		myArr.splice(myIndex + 1, 0, myElement);
		this.setState({
			playersData : myArr,
		}, () => this.searchAfterAddingPlayer())
	}

	render() {
		return (
			<Fragment>
				<Header  getSearched={(text) => this.dataSearch(text)} />
				<Cards players={this.state.filteredData} 
					   onDelete={someId => this.onDelete(someId)} 
					   onDouble={someId => this.onDouble(someId)}  
				/>
				{this.state.form && <Form  addNewPlayer={ player => this.addPlayer(player)} 
										   closeForm={ (value) => this.closeForm(value)}
									/>
				}
				<button className="add" onClick={() => this.openForm()}>Add Player</button>
				<button className="sort" onClick={ () => this.sort()}>Sort</button>
			</Fragment>
		)
	}
}

export default App;