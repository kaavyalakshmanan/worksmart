// Reducer: where state goes
// Where we check our actions
// Actions file has getTodos and addTodos action -> dispatches to reducer and sends payload
// When we fetch data from server got getTodos, we dispatch to reducer and send that response we get from server to reducer
// Then we do what we want with it (eg add todo)

import {GET_TODOS, ADD_TODO, DELETE_TODO, TODOS_LOADING} from '../actions/types';

const initialState = {
    todos: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload,
                loading: false
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            };
        case TODOS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}