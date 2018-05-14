import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasksSelector } from '../../redux/reducers/task/selectors';
import { categoriesSelector } from '../../redux/reducers/category/selectors';
import { updateTask, updateTaskDraft, resetTaskDraft, deleteTask, createTask, clearTaskDraft, setShowCompleted } from '../../redux/reducers/task/actions';
import { ListGroup, ListGroupItem, Button, Modal, ModalBody, Input, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		}
	}
	openModalAndSetDraft(task) {
		this.props.updateTaskDraft(task);
		this.toggleModal();
	}
	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		});
	}
	updateOrCreateTask = () => {
		this.props.draftTask.hasOwnProperty('id') ? this.props.updateTask(this.props.draftTask) : this.props.createTask(this.props.draftTask);
		this.toggleModal();
	}
	render() {
		return (
			<div>
				<div className="d-flex justify-content-between">
					<Button
						color="success"
						onClick={this.toggleModal}
						className="mb-5"
						>
						Add New Task
					</Button>
					<FormGroup className="mb-0">
						<Label>
							<Input
								type="checkbox"
								onChange={(event) => {
									this.props.setShowCompleted(event.target.checked);
								}}
								/>{' '}
								Show completed
						</Label>
					</FormGroup>
				</div>
				<ListGroup>
					{
						this.props.tasks.map((task) => (
							<ListGroupItem key={task.id} className="d-flex align-items-center justify-content-between">
								<div>
									<span className="mr-5">{task.name}</span>
									<span className="mr-5">{task.status}</span>
									{
										task.date && (
											<span>{moment(task.date).format('MM/DD/YYYY')}</span>
										)
									}
								</div>
								<div className="d-flex align-items-center">
									<Button
										onClick={() => this.openModalAndSetDraft(task)}
									>
										Edit
									</Button>
									<Button
										className="ml-2"
										color="danger"
										onClick={() => this.props.deleteTask(task.id)}
									>
										Delete
									</Button>
									{
										task.status && task.status !== "Completed" && (
											<FormGroup className="ml-5 mb-0">
									          	<Label check>
									            	<Input
														type="checkbox"
														onChange={(event) => {
															this.props.updateTask({
																id: task.id,
																status: 'Completed'
															})
														}}
													/>{' '}
									            	Complete
									          	</Label>
									        </FormGroup>
										)
									}
								</div>
							</ListGroupItem>
						))
					}
				</ListGroup>
				<Modal
					isOpen={this.state.modalOpen}
					toggle={this.toggleModal}
					onClosed={this.props.clearTaskDraft}>
					<ModalBody>
						<Form>
        					<FormGroup>
								<Label for="taskName">Task name</Label>
          						<Input
									type="text"
									name="taskName"
									id="taskName"
									value={this.props.draftTask.name}
									onChange={(event) => {
										this.props.updateTaskDraft({
											name: event.target.value
										})
									}}
								/>
        					</FormGroup>
							<DatePicker
								className="mb-4"
								selected={this.props.draftTask.date}
								onChange={(date) => {
									this.props.updateTaskDraft({
										date: date
									});
								}}
								minDate={moment()}
								placeholderText="Select a date"
							/>
							<FormGroup>
					          	<Input
									type="select"
									name="select"
									id="categoryId"
									value={this.props.draftTask.categoryId}
									onChange={(event) => {
										this.props.updateTaskDraft({
											categoryId: parseInt(event.target.value, 10)
										})
									}}>
									<option>Select category</option>
									{
										this.props.categories.map((category) => (
											<option
												value={category.id}
												key={category.id}
											>
												{category.name}
											</option>
										))
									}
					        	</Input>
					        </FormGroup>
							<FormGroup>
					          	<Input
									type="select"
									name="select"
									id="status"
									value={this.props.draftTask.status || "none"}
									onChange={(event) => {
										this.props.updateTaskDraft({
											status: event.target.value
										})
									}}>
									<option value="None">Set status</option>
									<option value="To do">To do</option>
									<option value="In progress">In progress</option>
									<option value="Completed">Completed</option>
					        	</Input>
					        </FormGroup>
							<div className="text-right">
								<Button onClick={() => this.props.resetTaskDraft()}>Reset</Button>
								<Button
									className="ml-2"
									onClick={this.updateOrCreateTask}
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
		draftTask: state.task.draftTask,
		categories: categoriesSelector(state)
	}
}

const mapDispatchToProps = {
	updateTask,
	updateTaskDraft,
	resetTaskDraft,
	deleteTask,
	createTask,
	clearTaskDraft,
	setShowCompleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
