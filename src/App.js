import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';

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
					</TabPane>
				</TabContent>
      		</div>
    	);
  	}
}

export default App;
