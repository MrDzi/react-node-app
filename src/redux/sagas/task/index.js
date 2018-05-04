import { takeEvery, put, call } from 'redux-saga/effects'
import * as R from 'ramda';
import { ActionTypes } from '../../reducers/task/actions';

let tasks = [
	{
		id: 1,
		name: 'task 1'
	},
	{
		id: 2,
		name: 'task 2'
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

const fetchTasksMock = fetchTasksMockWrapper(tasks);
const updateTaskMock = (task) => updateTaskMockWrapper(task);
const deleteTaskMock = (taskId) => deleteTaskMockWrapper(taskId);

const fetchTasks = function* () {
	try {
		const response = yield call(fetchTasksMock);
		yield put({
			type: ActionTypes.FETCHED_TASKS,
			payload: response.body
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

export const taskSagas = [
	takeEvery(ActionTypes.FETCH_TASKS, fetchTasks),
	takeEvery(ActionTypes.UPDATE_TASK, updateTask),
	takeEvery(ActionTypes.DELETE_TASK, deleteTask)
]
