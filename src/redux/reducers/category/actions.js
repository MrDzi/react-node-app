export const ActionTypes = {
	FETCH_CATEGORIES: 'FETCH_CATEGORIES',
	CREATE_CATEGORY: 'CREATE_CATEGORY',
	UPDATE_CATEGORY: 'UPDATE_CATEGORY',
	FETCHED_CATEGORIES: 'FETCHED_CATEGORIES',
	CREATED_CATEGORY: 'CREATED_CATEGORY',
	UPDATED_CATEGORY: 'UPDATED_CATEGORY',
	UPDATE_CATEGORY_DRAFT: 'UPDATE_CATEGORY_DRAFT',
	SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
}

export const updateCategoryDraft = (category) => ({
	type: ActionTypes.UPDATE_CATEGORY_DRAFT,
	payload: category
})

export const createCategory = (category) => ({
	type: ActionTypes.CREATE_CATEGORY,
	payload: category
})

export const fetchCategories = () => ({
	type: ActionTypes.FETCH_CATEGORIES
})

export const updateCategory = (category) => ({
	type: ActionTypes.UPDATE_TASK,
	payload: category
})

export const setSelectedCategory = (categoryId) => ({
	type: ActionTypes.SET_SELECTED_CATEGORY,
	payload: categoryId
})
