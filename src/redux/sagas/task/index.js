import { ActionTypes } from '../../reducers/task/actions';

const fetchDataMockWrapper = (data) => {
	return () => Promise.resolve({
		body: data
	});
}

const fetchTasksMock = fetchDataMockWrapper([
	{
		id: 1,
		name: 'task 1'
	},
	{
		id: 2,
		name: 'task 2'
	}
]);

export const fetchTasks = function* () {
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
