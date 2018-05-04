import * as R from 'ramda';
import { ActionTypes } from './actions';

const initialState = {
    tasks: {},
	draftTask: {
		name: ''
	}
};

export default function task(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.FETCHED_TASKS:
            return {
				...state,
                tasks: R.indexBy(R.prop('id'), action.payload)
            }
		case ActionTypes.CREATE_TASK:
			return {
				...state,
				tasks: {
					...state.tasks,
					[action.payload.id]: action.payload
				}
			}
        case ActionTypes.DELETED_TASK:
            return {
				...state,
                tasks: R.omit([action.payload], state.tasks)
            }
        case ActionTypes.UPDATED_TASK:
            return {
				...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.id]: action.payload
                },
				draftTask: initialState.draftTask
            }
		case ActionTypes.UPDATE_DRAFT:
			return {
				...state,
				draftTask: {
					...state.draftTask,
					...action.payload
				}
			}
		case ActionTypes.RESET_DRAFT:
			return {
				...state,
				draftTask: state.tasks[state.draftTask.id]
			}
        default:
            return state;
    }
}

export const getTasksFromState = (state) => state.task.tasks;
