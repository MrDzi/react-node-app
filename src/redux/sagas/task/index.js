import { takeEvery, put, call } from 'redux-saga/effects'
import * as R from 'ramda';
import { ActionTypes } from '../../reducers/task/actions';

const tasks = [
	{
		id: 1,
		name: 'task 1'
	},
	{
		id: 2,
		name: 'task 2'
	}
]

const fetchDataMockWrapper = (data = null) => {
	return () => Promise.resolve({
		body: data
	});
}

const updateDataMockWrapper = (task) => {
	const taskFromCollection = R.find(R.propEq('id', task.id), tasks);
	task = {
		...taskFromCollection,
		...task
	}
	return () => Promise.resolve();
}

const fetchTasksMock = fetchDataMockWrapper(tasks);
const updateTaskMock = (task) => updateDataMockWrapper(task);

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

export const taskSagas = [
	takeEvery(ActionTypes.FETCH_TASKS, fetchTasks),
	takeEvery(ActionTypes.UPDATE_TASK, updateTask)
]
