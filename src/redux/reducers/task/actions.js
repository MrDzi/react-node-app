export const ActionTypes = {
    FETCH_TASKS: 'FETCH_TASKS',
	FETCHED_TASKS: 'FETCHED_TASKS',
	CREATE_TASK: 'CREATE_TASK',
	CREATED_TASK: 'CREATED_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
	UPDATED_TASK: 'UPDATED_TASK',
    DELETE_TASK: 'DELETE_TASK',
	DELETED_TASK: 'DELETED_TASK',
	UPDATE_TASK_DRAFT: 'UPDATE_TASK_DRAFT',
	RESET_TASK_DRAFT: 'RESET_TASK_DRAFT',
	CLEAR_TASK_DRAFT: 'CLEAR_TASK_DRAFT',
	SET_SHOW_COMPLETED: 'SET_SHOW_COMPLETED',
}

export const fetchTasks = () => ({
	type: ActionTypes.FETCH_TASKS
})

export const updateTask = (task) => ({
	type: ActionTypes.UPDATE_TASK,
	payload: task
})

export const updateTaskDraft = (task) => ({
	type: ActionTypes.UPDATE_TASK_DRAFT,
	payload: task
})

export const resetTaskDraft = () => ({
	type: ActionTypes.RESET_TASK_DRAFT
})

export const deleteTask = (taskId) => ({
	type: ActionTypes.DELETE_TASK,
	payload: taskId
})

export const createTask = (task) => ({
	type: ActionTypes.CREATE_TASK,
	payload: task
})

export const clearTaskDraft = () => ({
	type: ActionTypes.CLEAR_TASK_DRAFT
})

export const setShowCompleted = (showCompleted) => ({
	type: ActionTypes.SET_SHOW_COMPLETED,
	payload: showCompleted
})
