import React from 'react';
import {connect} from 'react-redux'
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';

import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import {setSearchField} from '../actions';

const mapStateToProps = (state) => {
	console.log("A");
	return {
		searchField: state.searchField
	}
}
const mapDispatchToProps = (dispatch) => {
	console.log("B");
	return {
	onSearchChange: (event) => {
		console.log("E");
		dispatch(setSearchField(event.target.value))
		}
	}
}
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			robots: []
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=>response.json())
			.then(users =>{this.setState ({ robots: users})});
	}

	render () {
		const {robots} = this.state;
		const {searchField, onSearchChange} = this.props;
		const filterrobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return !robots.length? 
			<h1>Loading</h1> :
			(<div className='tc'>
				<h1 className='f1'>Robot Friends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filterrobots} />
					</ErrorBoundary>
				</Scroll>
			</div>);
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);