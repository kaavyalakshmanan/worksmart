import React, {Component} from 'react';
import AppNavbar from "./components/AppNavbar";
import TodoList from "./components/TodoList";
import TodoModal from './components/todoModal';
import {Container} from 'reactstrap';

// Share state throughout components
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar />
      <Container>
      <TodoModal />
      <TodoList />
      </Container>
    </div>
    </Provider>
    );
  }
}

export default App;
