import { all } from 'redux-saga/effects';
import { taskSagas } from './task';
// import { categorySagas } from './category';

export default function* rootSagas() {
	yield all([
		...taskSagas
		// ...categorySagas
	]);
}
