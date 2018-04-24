import { ActionTypes } from './actions.js';
import R from 'ramda';

const initialState = {
	categories: {}
}

export default function category(state = initialState, action) {
	switch(action.type) {
		case ActionTypes.FETCH_CATEGORIES:
			return {
				...state,
				categories: R.indexBy(R.prop('id'), action.payload)
			}
		case ActionTypes.CREATE_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					[action.payload.id]: action.payload
				}
			}
		case ActionTypes.UPDATE_CATEGORY:
			return {
				...state,
				categories: {
					...state.categories,
					[action.payload.id]: action.payload
				}
			}
		default:
			return state;
	}
}
