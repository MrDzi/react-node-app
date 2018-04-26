import { createSelector } from 'reselect';
import { getTasksFromState } from './';
import * as R from 'ramda';

export const tasksSelector = createSelector(
    getTasksFromState,
    R.values
)