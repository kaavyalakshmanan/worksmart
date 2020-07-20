// Where we make requests to backend
import axios from 'axios';
import {GET_TODOS, ADD_TODO, DELETE_TODO, TODOS_LOADING} from './types';

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
    console.log("successfully loaded todos");
};

export const addTodo = todo => dispatch => {
    axios
        .post('/api/todos', todo)
        .then(res => 
            dispatch({
                type: ADD_TODO,
                payload: res.data
            }))
};

export const deleteTodo = id => dispatch => {
    axios
        .delete(`api/todos/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
        );
};

export const setTodosLoading = () => {
    return {
        type: TODOS_LOADING
    }
}