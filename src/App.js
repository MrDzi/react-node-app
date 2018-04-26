import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasksSelector } from './redux/reducers/task/selectors';
import { fetchTasks } from './redux/reducers/task/actions';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1'
		}
	}
	componentDidMount() {
		this.props.fetchTasks();
	}
	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	render() {
    	return (
      		<div className="app">
        		<header className="app-header">
          			<h1 className="app-title">ReactNode App</h1>
        		</header>
				<Nav tabs>
					<NavItem>
						<NavLink
							onClick={() => {
								this.toggleTab('1');
							}}
						>
							Default
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							onClick={() => {
								this.toggleTab('2');
							}}
						>
							Category 1
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId='1'>
						Content of the FIRST tab
					</TabPane>
					<TabPane tabId='2'>
						Content of the SECOND tab
						{JSON.stringify(this.props.tasks)}
					</TabPane>
				</TabContent>
      		</div>
    	);
  	}
}

function mapStateToProps(state) {
	return {
		tasks: tasksSelector(state)
	}
}

const mapDispatchToProps = {
	fetchTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
