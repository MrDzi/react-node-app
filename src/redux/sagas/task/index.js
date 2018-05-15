import { takeEvery, put, call } from 'redux-saga/effects'
import * as R from 'ramda';
import { ActionTypes } from '../../reducers/task/actions';

let tasks = [
	{
		id: 1,
		name: 'task 1',
		categoryId: 1,
	},
	{
		id: 2,
		name: 'task 2',
		categoryId: 2,
	}
]

const fetchTasksMockWrapper = (tasks = null) => {
	return () => Promise.resolve({
		body: tasks
	});
}

const updateTaskMockWrapper = (task) => {
	const taskFromCollection = R.find(R.propEq('id', task.id), tasks);
	task = {
		...taskFromCollection,
		...task
	}
	return () => Promise.resolve();
}

const deleteTaskMockWrapper = (taskId) => {
	tasks = R.filter((task) => task.id !== taskId, tasks);
	return () => Promise.resolve();
}

const createTaskMockWrapper = (task) => {
	task.id = tasks.length + 1;
	tasks.push(task);
	return () => Promise.resolve();
}

const fetchTasksMock = fetchTasksMockWrapper(tasks);
const updateTaskMock = (task) => updateTaskMockWrapper(task);
const deleteTaskMock = (taskId) => deleteTaskMockWrapper(taskId);
const createTaskMock = (task) => createTaskMockWrapper(task);

/*** Real api requests ***/
const fetchTasksApi = function() {
	return fetch('http://localhost:3001/tasks')
		.then(response => response.json());
}

const fetchTasks = function* () {
	try {
		const response = yield call(fetchTasksApi);
		console.log(response);
		yield put({
			type: ActionTypes.FETCHED_TASKS,
			payload: response
		});
	} catch (error) {
		console.log(error);
	}
}

const updateTask = function* (action) {
	try {
		yield call(updateTaskMock, [action.payload]);
	    yield put({
			type: ActionTypes.UPDATED_TASK,
			payload: action.payload
		});
	} catch (error) {
		console.log(error);
	}
}

const deleteTask = function* (action) {
	try {
		yield call(deleteTaskMock, action.payload);
		yield put({
			type: ActionTypes.DELETED_TASK,
			payload: action.payload
		});
	} catch (error) {
		console.log(error);
	}
}

const createTask = function* (action) {
	try {
		yield call(createTaskMock, action.payload);
		yield put({
			type: ActionTypes.CREATED_TASK,
			payload: action.payload
		});
	} catch (error) {
		console.log(error);
	}
}

export const taskSagas = [
	takeEvery(ActionTypes.FETCH_TASKS, fetchTasks),
	takeEvery(ActionTypes.UPDATE_TASK, updateTask),
	takeEvery(ActionTypes.DELETE_TASK, deleteTask),
	takeEvery(ActionTypes.CREATE_TASK, createTask)
]
