import { expect } from 'chai';
import category from '../';

describe('category', () => {

	const initialState = {
		categories: {}
	}

	it('should return initial state with undefined action', () => {
		expect(category(initialState, {})).to.deep.equal(initialState);
	})

	it ('should save fetched categories on FETCH_CATEGORIES action indexed by id', () => {
		const action = {
			type: 'FETCH_CATEGORIES',
			payload: [
				{
					id: 1,
					name: 'category 1'
				},
				{
					id: 2,
					name: 'category 2'
				}
			]
		}
		expect(category(initialState, action)).to.deep.equal({
			categories: {
				1: {
					id: 1,
					name: 'category 1'
				},
				2: {
					id: 2,
					name: 'category 2'
				}
			}
		});
	})

	it('should save new category on CREATE_CATEGORY action', () => {
		const action = {
			type: 'CREATE_CATEGORY',
			payload: {
				id: 2,
				name: 'category 2'
			}
		}
		const previousState = {
			categories: {
				1: {
					id: 1,
					name: 'category 1'
				}
			}
		};

		expect(category(previousState, action)).to.deep.equal({
			categories: {
				1: {
					id: 1,
					name: 'category 1'
				},
				2: {
					id: 2,
					name: 'category 2'
				}
			}
		});

	})

	it('should edit appropriate category on UPDATE_CATEGORY action', () => {
		const previousState = {
			categories: {
				1: {
					id: 1,
					name: 'category 1'
				}
			}
		}
		const action = {
			type: 'UPDATE_CATEGORY',
			payload: {
				id: 1,
				name: 'category 11'
			}
		}

		expect(category(previousState, action)).to.deep.equal({
			categories: {
				1: {
					id: 1,
					name: 'category 11'
				}
			}
		});
	})

});
