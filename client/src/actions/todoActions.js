// Where we make requests to backend
import axios from 'axios';
import {GET_TODOS, ADD_TODO, DELETE_TODO, TODOS_LOADING} from './types';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getTodos = () => dispatch => {
    dispatch(setTodosLoading());
    axios
        .get('/api/todos/')
        .then(res => 
            dispatch({
                type: GET_TODOS,
                payload: res.data
            },
            console.log(res.data)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    console.log("successfully loaded todos");
};

export const addTodo = todo => (dispatch, getState) => {
    axios
        .post('/api/todos', todo, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_TODO,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteTodo = id => (dispatch, getState) => {
    axios
        .delete(`api/todos/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setTodosLoading = () => {
    return {
        type: TODOS_LOADING
    }
}