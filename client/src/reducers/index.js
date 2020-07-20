// Root reducer -> brings together other reducers
// Eg- todos reducer, auth reducer, error reducer

import {combineReducers} from 'redux';
import todoReducer from './todoReducer';

export default combineReducers({
    todo: todoReducer
})