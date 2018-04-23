import { expect } from 'chai';
import task from '../';

describe('task', () => {
    const initialState = {
        tasks: {}
    }
    
    it('should return initialState with undefined action', () => {
        expect(task(initialState, {})).to.deep.equal(initialState)
    })
    
    it('should remove task on DELETE_TASK action', () => {
        const previousState = {
            tasks: {
                1: {
                    id: 1,
                    name: 'task 1'
                },
                2: {
                    id: 2,
                    name: 'task 2'
                }
            }
        }
        const action = {
            type: 'DELETE_TASK',
            payload: 1
        }
        const newState = task(previousState, action);
        expect(newState).to.deep.equal({
            tasks: {
                2: {
                    id: 2,
                    name: 'task 2'
                }
            }
        });
    })
    
    it('should ignore removing non-existing task', () => {
        const previousState = {
            tasks: {
                1: {
                    id: 1,
                    name: 'task 1'
                },
                2: {
                    id: 2,
                    name: 'task 2'
                }
            }
        }
        const action = {
            type: 'DELETE_TASK',
            payload: 3
        }
        const newState = task(previousState, action);
        expect(newState).to.deep.equal({
            tasks: {
                1: {
                    id: 1,
                    name: 'task 1'
                },
                2: {
                    id: 2,
                    name: 'task 2'
                }
            }
        });
    })
    
    it('should save fetched tasks indexed by id', () => {
        const action = {
            type: 'FETCH_TASKS',
            payload: [
                {
                    id: 1,
                    name: 'task 1'
                },
                {
                    id: 2,
                    name: 'task 2'
                }
            ]
        }
        const newState = task(initialState, action);
        expect(newState).to.deep.equal({
            tasks: {
                1: {
                    id: 1,
                    name: 'task 1'
                },
                2: {
                    id: 2,
                    name: 'task 2'
                }
            }
        });
    })
    
    it('should update existing task on UPDATE_TASK', () => {
        const action = {
            type: 'UPDATE_TASK',
            payload: {
                id: 1,
                name: 'task 11'
            }
        }
        const previousState = {
            tasks: {
                1: {
                    id: 1,
                    name: 'task 1'
                }
            }
        }
        const newState = task(previousState, action);
        expect(newState).to.deep.equal({
            tasks: {
                1: {
                    id: 1,
                    name: 'task 11'
                }
            }
        });
    })
})