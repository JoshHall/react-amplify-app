import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator }  from 'aws-amplify-react'
import { Analytics } from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify'

const ListTodos = `
  query {
   listTodos{
     items {
       id name description completed
     }
   }
  }
`


class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: []
    }
  }

  async componentDidMount() {
    const todoData = await API.graphql(graphqlOperation(ListTodos))
    this.setState({ todos: todoData.data.listTodos.items })
  }
  // Auth.currentAuthenticatedUser()
  recordEvent() {
    console.log('about to record event!')
    Analytics.record({
      name: 'Test Event 1',
      attributes: {
        username: 'jishue'
      }
    });
  }
render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello from Amplify</h1>
        <button onClick={() => this.recordEvent()}>Record Event</button>
      </header>
      {
        this.state.todos.map((todo,i) => (
          <div>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
          </div>
        ))
      }
    </div>
  );
 }
}

export default withAuthenticator(App);
