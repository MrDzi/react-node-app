import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasksSelector } from './redux/reducers/task/selectors';
import { fetchTasks, updateTask, updateDraft, resetDraft } from './redux/reducers/task/actions';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Container, Button, Modal, ModalBody, Input, Form, FormGroup } from 'reactstrap';
import classnames from 'classnames';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1',
			modal: false,
			// taskDraft: {
			// 	id: null,
			// 	name: ''
			// }
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
	openModalAndSetDraft(task) {
		// this.setState({
		// 	taskDraft: task
		// });
		this.props.updateDraft(task);
		this.toggleModal();
	}
	toggleModal = () => {
		this.setState({
			modal: !this.state.modal
		});
	}
	updateTask() {
		this.props.updateTask(this.props.draftTask);
		this.toggleModal();
		// this.setState({
		// 	taskDraft: {
		// 		id: null,
		// 		name: ''
		// 	}
		// });
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
							<ListGroup>
								{
									this.props.tasks.map((task) => {
										return (
											<ListGroupItem key={task.id} className="d-flex align-items-center justify-content-between">
												<span>{task.name}</span>
												<div>
													<Button
														onClick={() => {
															this.openModalAndSetDraft(task)
														}}
														>
														Edit
													</Button>
												</div>
											</ListGroupItem>
										);
									})
								}
							</ListGroup>
						</TabPane>
						<TabPane tabId='2'>
							Content of the SECOND tab
							{JSON.stringify(this.props.tasks)}
						</TabPane>
					</TabContent>
				</Container>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalBody>
						<Form>
        					<FormGroup>
          						<Input
									type="text"
									name="taskName"
									id="taskName"
									defaultValue={this.props.draftTask.name}
									onChange={(event) => {
										// this.setState({
										// 	taskDraft: {
										// 		...this.state.taskDraft,
										// 		name: event.target.value
										// 	}
										// });
										this.props.updateDraft({
											name: event.target.value
										})
									}}
								/>
        					</FormGroup>
							<Button onClick={() => this.props.resetDraft()}>Reset</Button>
							<Button onClick={() => this.updateTask()}>Submit</Button>
						</Form>
					</ModalBody>
				</Modal>
      		</div>
    	);
  	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		tasks: tasksSelector(state),
		draftTask: state.task.draftTask
	}
}

const mapDispatchToProps = {
	fetchTasks,
	updateTask,
	updateDraft,
	resetDraft,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
