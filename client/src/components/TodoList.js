import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v4 as uuid} from "uuid";
// Get state from redux into a react component 
import {connect} from 'react-redux';
import {getTodos} from '../actions/todoActions';
// Put component types inside prop types as a form of validation
import PropTypes from 'prop-types';

class TodoList extends Component {
    
    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        
        const { todos } = this.props.todo;
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

TodoList.propTypes = {
    getTodos: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}

// todo comes from root reducer (index.js)
const mapStateToProps = (state) => ({
    todo: state.todo
})

// mapStateToProps takes todos state and map into a component property so that we can use in TodoList.js
export default connect(mapStateToProps, { getTodos })(TodoList);