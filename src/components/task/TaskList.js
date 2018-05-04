import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasksSelector } from '../../redux/reducers/task/selectors';
import { updateTask, updateDraft, resetDraft, deleteTask } from '../../redux/reducers/task/actions';
import {  ListGroup, ListGroupItem, Button, Modal, ModalBody, Input, Form, FormGroup } from 'reactstrap';

class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		}
	}
	openModalAndSetDraft(task) {
		this.props.updateDraft(task);
		this.toggleModal();
	}
	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		});
	}
	updateTask() {
		this.props.updateTask(this.props.draftTask);
		this.toggleModal();
	}
	render() {
		return (
			<div>
				<ListGroup>
					{
						this.props.tasks.map((task) => {
							return (
								<ListGroupItem key={task.id} className="d-flex align-items-center justify-content-between">
									<span>{task.name}</span>
									<div>
										<Button
											onClick={() => this.openModalAndSetDraft(task)}
											>
											Edit
										</Button>
										<Button
											className="ml-1"
											color="danger"
											onClick={() => this.props.deleteTask(task.id)}
											>
											Delete
										</Button>
									</div>
								</ListGroupItem>
							);
						})
					}
				</ListGroup>
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
					<ModalBody>
						<Form>
        					<FormGroup>
          						<Input
									type="text"
									name="taskName"
									id="taskName"
									value={this.props.draftTask.name}
									onChange={(event) => {
										this.props.updateDraft({
											name: event.target.value
										})
									}}
								/>
        					</FormGroup>
							<div className="text-right">
								<Button onClick={() => this.props.resetDraft()}>Reset</Button>
								<Button
									className="ml-1"
									onClick={() => this.updateTask()}
									color="primary"
								>
									Submit
								</Button>
							</div>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		tasks: tasksSelector(state),
		draftTask: state.task.draftTask
	}
}

const mapDispatchToProps = {
	updateTask,
	updateDraft,
	resetDraft,
	deleteTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);