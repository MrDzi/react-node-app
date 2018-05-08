import { ActionTypes } from './actions.js';
import * as R from 'ramda';

const initialState = {
	categories: {},
	draftCategory: {
		name: ''
	},
	selectedCategoryId: null
}

export default function category(state = initialState, action) {
	switch(action.type) {
		case ActionTypes.FETCHED_CATEGORIES:
			return {
				...state,
				categories: R.indexBy(R.prop('id'), action.payload)
			}
		case ActionTypes.CREATED_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					[action.payload.id]: action.payload
				}
			}
		case ActionTypes.UPDATED_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					[action.payload.id]: action.payload
				}
			}
		case ActionTypes.UPDATE_CATEGORY_DRAFT:
			return {
				...state,
				draftCategory: {
					...state.draftCategory,
					...action.payload
				}
			}
		case ActionTypes.SET_SELECTED_CATEGORY:
			return {
				...state,
				selectedCategoryId: action.payload
			}
		case ActionTypes.CLEAR_DRAFT:
			return {
				...state,
				draftCategory: initialState.draftCategory
			}
		default:
			return state;
	}
}

export const getCategoriesFromState = (state) => state.category.categories;
export const getSelectedCategoryId = (state) => state.category.selectedCategoryId;
