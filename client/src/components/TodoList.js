import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v4 as uuid} from "uuid";

class TodoList extends Component {
    state = {
        todos: [
            {id: uuid(), description: 'Throw way trash'},
            {id: uuid(), description: 'Buy groceries'},
            {id: uuid(), description: 'Walk dog'},
            {id: uuid(), description: 'Water plants'},
        ]
    }

    render() {
        const { todos } = this.state;
        return(
            <Container>
                <Button 
                className="add-btn"
                color="dark"
                onClick={() => {
                    const description = prompt('Enter todo');
                    if (description) {
                        this.setState(state => ({
                            todos: [...state.todos, {id: uuid(), description}]
                        }));
                    }
                }}
                >Add Item
                </Button>
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {todos.map(({id, description}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                todos: this.state.todos.filter(todo => todo.id !== id)
                                            }));
                                        }}
                                        >&times;</Button>
                                    {description}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

export default TodoList;