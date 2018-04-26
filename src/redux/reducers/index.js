import { combineReducers } from 'redux';

import category from './category';
import task from './task';

export default combineReducers({
    category,
    task
});
