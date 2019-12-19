import React, { Component } from 'react'
import axios from 'axios'
import Todo from './components/Todo.js'
import TodoList from './components/Todo.js'

export default class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/tasks')
      .then(response => {
        console.log(response)
        const newTodos = response.data.map(todo => {
          return {
            todooo: todo
          }
        })

        const newState = Object.assign({}, this.state, {
          todos: newTodos
        })

        this.setState(newState)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1>G'day</h1>
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}
