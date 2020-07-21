// Container: component that's hooked to redux
// Redux state inside a component
import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addTodo} from '../actions/todoActions';
import PropTypes from 'prop-types';

class TodoModal extends Component {
    state = {
        modal: false,
        name: ""
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            description: this.state.name
        }
        // Add todo via addTodo action
        this.props.addTodo(newTodo);
        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                {this.props.isAuthenticated ?  <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Todo
                </Button> : <h4 className="mb-3 ml-4">Please log in to manage items</h4>}
               

                <Modal 
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}> Add to todo list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="todo">Todo</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="todo"
                                    placeholder="Add todo list item"
                                    onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >Add Todo
                                    </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todo: state.todo,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addTodo})(TodoModal)