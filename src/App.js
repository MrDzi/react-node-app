import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasksSelector } from './redux/reducers/task/selectors';
import { categoriesSelector } from './redux/reducers/category/selectors';
import { fetchTasks } from './redux/reducers/task/actions';
import { fetchCategories, createCategory, updateCategory, setSelectedCategory } from './redux/reducers/category/actions';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Modal, ModalBody, Input, Form, FormGroup, Button } from 'reactstrap';
import classnames from 'classnames';
import './App.css';
import TaskList from './components/task/TaskList';
import { updateCategoryDraft } from './redux/reducers/category/actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1',
			modalOpen: false
		}
	}
	componentDidMount() {
		this.props.fetchTasks();
		this.props.fetchCategories();
	}
	toggleCategoryModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		});
	}
	handleCategoryTabClick(tab, category) {
		if (this.state.activeTab === tab) {
			this.props.updateCategoryDraft(category);
			this.toggleCategoryModal();
		} else {
			this.toggleTab(tab);
			this.props.setSelectedCategory(category.id);
		}
	}
	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	updateOrCreateCategory = () => {
		this.props.draftCategory.hasOwnProperty('id') ? this.props.updateCategory(this.props.draftCategory) : this.props.createCategory(this.props.draftCategory);
		this.toggleCategoryModal();
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
								this.props.setSelectedCategory(null);
								this.toggleTab('1');
							}}
							className={classnames({active: this.state.activeTab === 1})}
						>
							Default
						</NavLink>
					</NavItem>
					{
						this.props.categories.map((category, index) => {
							const tabOrder = (index + 2).toString();
							return (
								<NavItem key={index}>
									<NavLink
										onClick={() => {
											this.handleCategoryTabClick(tabOrder, category);
										}}
										className={classnames({active: this.state.activeTab === tabOrder})}
									>
										{category.name}
									</NavLink>
								</NavItem>
							)
						})
					}
					<NavItem>
						<NavLink
							onClick={this.toggleCategoryModal}
						>
							Add New Category
						</NavLink>
					</NavItem>
				</Nav>
				<Container>
					<TabContent className="pt-50" activeTab={this.state.activeTab}>
						<TabPane tabId='1'>
							<TaskList />
						</TabPane>
						{
							this.props.categories.map((category, index) => {
								const tabOrder = (index + 2).toString();
								return (
									<TabPane tabId={tabOrder} key={index}>
										<TaskList />
									</TabPane>
								)
							})
						}
					</TabContent>
				</Container>
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleCategoryModal}>
					<ModalBody>
						<Form>
        					<FormGroup>
          						<Input
									type="text"
									name="taskName"
									id="taskName"
									value={this.props.draftCategory.name}
									onChange={(event) => {
										this.props.updateCategoryDraft({
											name: event.target.value
										});
									}}
								/>
        					</FormGroup>
							<div className="text-right">
								<Button
									className="ml-2"
									onClick={this.updateOrCreateCategory}
									color="primary"
								>
									Submit
								</Button>
							</div>
						</Form>
					</ModalBody>
				</Modal>
      		</div>
    	);
  	}
}

function mapStateToProps(state) {
	return {
		tasks: tasksSelector(state),
		categories: categoriesSelector(state),
		draftTask: state.task.draftTask,
		draftCategory: state.category.draftCategory
	}
}

const mapDispatchToProps = {
	fetchTasks,
	fetchCategories,
	updateCategoryDraft,
	createCategory,
	updateCategory,
	setSelectedCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
