import React from 'react';

import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=>response.json())
			.then(users =>{this.setState ({ robots: users})});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value});
	}
	render () {
		const {robots,searchfield} = this.state;
		const filterrobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !robots.length? 
			<h1>Loading</h1> :
			(<div className='tc'>
				<h1 className='f1'>Robot Friends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filterrobots} />
					</ErrorBoundary>
				</Scroll>
			</div>);
	}	
}

export default App;