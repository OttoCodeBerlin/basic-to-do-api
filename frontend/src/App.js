import React, { Component } from 'react'
import axios from 'axios'
import TodoList from './components/TodoList.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      todo: {
        title: '',
        description: '',
        owner: ''
      },
      todos: [],
      message: null
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleChangeUser = this.handleChangeUser.bind(this)
    this.handleSubmitTodo = this.handleSubmitTodo.bind(this)
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/tasks')
      .then(response => {
        const newTodos = response.data.map(todo => {
          return {
            todo: todo
          }
        })
        const newState = Object.assign({}, this.state, {
          todos: newTodos
        })
        this.setState(newState)
      })
      .catch(err => console.log(err))
  }

  // handleChangeTodo = e => {
  //   console.log(e.target)
  //   this.setState({
  //     todo: {
  //       title: e.target.title,
  //       description: e.target.description
  //       //owner: e.target.owner
  //     }
  //   })
  // }

  // handleChangeUser = e => {
  //   this.setState({
  //     username: e.target.username,
  //     password: e.target.password
  //   })
  // }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitTodo = e => {
    e.preventDefault()
    console.log(this.state)
    axios
      .post('http://localhost:5000/api/tasks/create', this.state.todo)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    this.setState({
      todo: {
        title: '',
        description: '',
        owner: ''
      },
      todos: [...this.state.todos, this.state.todo]
    })
  }

  handleSubmitSignup = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data.message)
      })
      .catch(error => {
        console.log(error)
      })
    // this.setState({
    //   message: response.data.message
    // })
    // this.setState({
    //   username: '',
    //   password: ''
    // })
  }

  handleSubmitLogin = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log('Ist Status 200')
          // this.props.updateUser({
          //   loggedIn: true,
          //   username: response.data.usernane
          // })
        }
      })
      .catch(error => {
        console.log(error)
      })
    // this.setState({
    //   message: response.data.message
    // })
    // this.setState({
    //   username: '',
    //   password: ''
    // })
  }

  render() {
    return (
      <div>
        <h1>Ironhack ToDo Exercise ;)</h1>
        <br />

        <form onSubmit={this.handleSubmitSignup}>
          <label>
            Username:
            <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Sign Up" />
        </form>

        <form onSubmit={this.handleSubmitLogin}>
          <label>
            Username:
            <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>

        <br />
        <form onSubmit={this.handleSubmitTodo}>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <br />

          <input type="submit" value="Create New ToDo" />
        </form>
        {/* {message && <p>{message}</p>} */}
        <p>Username: {this.state.username}</p>
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}
