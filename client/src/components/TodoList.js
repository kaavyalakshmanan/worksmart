import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
// Get state from redux into a react component 
import {connect} from 'react-redux';
import {getTodos, deleteTodo} from '../actions/todoActions';
// Put component types inside prop types as a form of validation
import PropTypes from 'prop-types';

class TodoList extends Component {
    
    componentDidMount() {
        this.props.getTodos();

    }

    onDeleteClick = (id) => {
        this.props.deleteTodo(id);
    }

    render() {
        
        const { todos } = this.props.todo;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {todos.map(({_id, description}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
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
export default connect(mapStateToProps, { getTodos, deleteTodo })(TodoList);