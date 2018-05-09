import { createSelector } from 'reselect';
import { getTasksFromState, getShowOnlyCompletedFromState } from './';
import { getSelectedCategoryId } from '../category'
import * as R from 'ramda';

const getTasksFunction = (tasks, selectedCategoryId, showOnlyCompletedFromState) => {
	const unnormalizedTasks = R.values(tasks);
	return unnormalizedTasks
		.filter((task) => {
			return selectedCategoryId ? task.categoryId === selectedCategoryId : true;
		})
		.filter((task) => {
			return showOnlyCompletedFromState ? task.status === 'Completed' : true;
		})

}

export const tasksSelector = createSelector(
    getTasksFromState,
	getSelectedCategoryId,
	getShowOnlyCompletedFromState,
    getTasksFunction
)
