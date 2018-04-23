import R from 'ramda';
import { ActionTypes } from './actions';

const initialState = {
    tasks: {}
};

export default function task(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.FETCH_TASKS:
            return {
                tasks: R.indexBy(R.prop('id'), action.payload)
            }
        case ActionTypes.DELETE_TASK:
            return {
                tasks: R.omit([action.payload], state.tasks)
            }
        case ActionTypes.UPDATE_TASK:
            return {
                tasks: {
                    ...state.tasks,
                    [action.payload.id]: action.payload
                }
            }
        default:
            return state;
    }
}