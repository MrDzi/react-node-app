import { createSelector } from 'reselect';
import { getTasksFromState } from './';
import { getSelectedCategoryId } from '../category'
import * as R from 'ramda';

const getTasksFunction = (tasks, selectedCategoryId) => {
	const unnormalizedTasks = R.values(tasks);
	return unnormalizedTasks.filter((task) => {
		return selectedCategoryId ? task.categoryId === selectedCategoryId : true;
	})

}

export const tasksSelector = createSelector(
    getTasksFromState,
	getSelectedCategoryId,
    getTasksFunction
)
