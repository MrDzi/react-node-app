import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasksSelector } from './redux/reducers/task/selectors';
import { fetchTasks } from './redux/reducers/task/actions';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap';
import classnames from 'classnames';
import './App.css';
import TaskList from './components/task/TaskList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1'
		}
	}
	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	componentDidMount() {
		this.props.fetchTasks();
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
							className={classnames({active: this.state.activeTab === '1'})}
						>
							Default
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							onClick={() => {
								this.toggleTab('2');
							}}
							className={classnames({active: this.state.activeTab === '2'})}
						>
							Category 1
						</NavLink>
					</NavItem>
				</Nav>
				<Container>
					<TabContent className="pt-50" activeTab={this.state.activeTab}>
						<TabPane tabId='1'>
							<TaskList></TaskList>
						</TabPane>
						<TabPane tabId='2'>
							Content of the SECOND tab
							{JSON.stringify(this.props.tasks)}
						</TabPane>
					</TabContent>
				</Container>
      		</div>
    	);
  	}
}

function mapStateToProps(state) {
	return {
		tasks: tasksSelector(state),
		draftTask: state.task.draftTask
	}
}

const mapDispatchToProps = {
	fetchTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
