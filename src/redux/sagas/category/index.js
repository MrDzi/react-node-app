import { takeEvery, put, call } from 'redux-saga/effects'
import * as R from 'ramda';
import { ActionTypes } from '../../reducers/category/actions';

let categories = [
	{
		id: 1,
		name: 'Category 1'
	},
	{
		id: 2,
		name: 'Category 2'
	}
]

const fetchCategoriesMockWrapper = (categories = null) => {
	return () => Promise.resolve({
		body: categories
	});
}

const updateCategoryMockWrapper = (category) => {
	const categoryFromCollection = R.find(R.propEq('id', category.id), categories);
	category = {
		...categoryFromCollection,
		...category
	}
	return () => Promise.resolve();
}

const createCategoryMockWrapper = (category) => {
	category.id = categories.length + 1;
	categories.push(category);
	return () => Promise.resolve();
}

const fetchCategoriesMock = fetchCategoriesMockWrapper(categories);
const updateCategoryMock = (category) => updateCategoryMockWrapper(category);
const createCategoryMock = (category) => createCategoryMockWrapper(category);

const fetchCategories = function* () {
	try {
		const response = yield call(fetchCategoriesMock);
		yield put({
			type: ActionTypes.FETCHED_CATEGORIES,
			payload: response.body
		});
	} catch (error) {
		console.log(error);
	}
}

const updateCategory = function* (action) {
	try {
		yield call(updateCategoryMock, [action.payload]);
	    yield put({
			type: ActionTypes.UPDATED_CATEGORY,
			payload: action.payload
		});
	} catch (error) {
		console.log(error);
	}
}

const createCategory = function* (action) {
	try {
		yield call(createCategoryMock, action.payload);
		yield put({
			type: ActionTypes.CREATED_CATEGORY,
			payload: action.payload
		});
	} catch (error) {
		console.log(error);
	}
}

export const categorySagas = [
	takeEvery(ActionTypes.FETCH_CATEGORIES, fetchCategories),
	takeEvery(ActionTypes.UPDATE_CATEGORY, updateCategory),
	takeEvery(ActionTypes.CREATE_CATEGORY, createCategory)
]
