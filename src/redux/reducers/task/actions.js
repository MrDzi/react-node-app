export const ActionTypes = {
    FETCH_TASKS: 'FETCH_TASKS',
	FETCHED_TASKS: 'FETCHED_TASKS',
	CREATE_TASK: 'CREATE_TASK',
	CREATED_TASK: 'CREATED_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
	UPDATED_TASK: 'UPDATED_TASK',
    DELETE_TASK: 'DELETE_TASK',
	DELETED_TASK: 'DELETED_TASK',
	UPDATE_DRAFT: 'UPDATE_DRAFT',
	RESET_DRAFT: 'RESET_DRAFT'
}

export const fetchTasks = () => ({
	type: ActionTypes.FETCH_TASKS
})

export const updateTask = (task) => ({
	type: ActionTypes.UPDATE_TASK,
	payload: task
})

export const updateDraft = (task) => ({
	type: ActionTypes.UPDATE_DRAFT,
	payload: task
})

export const resetDraft = () => ({
	type: ActionTypes.RESET_DRAFT
})

export const deleteTask = (taskId) => ({
	type: ActionTypes.DELETE_TASK,
	payload: taskId
})
