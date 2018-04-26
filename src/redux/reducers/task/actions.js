export const ActionTypes = {
    FETCH_TASKS: 'FETCH_TASKS',
	FETCHED_TASKS: 'FETCHED_TASKS',
	CREATE_TASK: 'CREATE_TASK',
	CREATED_TASK: 'CREATED_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
	UPDATED_TASK: 'UPDATED_TASK',
    DELETE_TASK: 'DELETE_TASK',
	DELETED_TASK: 'DELETED_TASK',
}

export fetchTasks = () => ({
	type: ActionTypes.FETCH_TASKS
})
