import { createSelector } from 'reselect';
import { getCategoriesFromState } from './';
import * as R from 'ramda';

export const categoriesSelector = createSelector(
    getCategoriesFromState,
    R.values
)
