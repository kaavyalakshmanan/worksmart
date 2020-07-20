// Reducer: where state goes
// Where we check our actions
// Actions file has getTodos and addTodos action -> dispatches to reducer and sends payload
// When we fetch data from server got getTodos, we dispatch to reducer and send that response we get from server to reducer
// Then we do what we want with it (eg add todo)

import {v4 as uuid} from "uuid";
import {GET_TODOS, ADD_TODO, DELETE_TODO} from '../actions/types';

const initialState = {
    todos: [
        {id: uuid(), description: 'Throw way trash'},
        {id: uuid(), description: 'Buy groceries'},
        {id: uuid(), description: 'Walk dog'},
        {id: uuid(), description: 'Water plants'},
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state
            }
        default:
            return state;
    }
}