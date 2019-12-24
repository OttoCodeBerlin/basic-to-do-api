import React, { Component } from 'react'
import axios from 'axios'
import TodoList from './components/TodoList.js'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      userId: '',
      title: '',
      description: '',
      owner: '',
      todos: [],
      message: null
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleChangeLogin = this.handleChangeLogin.bind(this)
    // this.handleChangeTodo = this.handleChangeTodo.bind(this)
    this.handleSubmitTodo = this.handleSubmitTodo.bind(this)
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)

    axios.defaults.withCredentials = true
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // handleChangeLogin(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handleChangeSignup(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  handleSubmitTodo(e) {
    e.preventDefault()
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios
      .post(
        'http://localhost:5000/api/tasks/create',
        {
          title: this.state.title,
          description: this.state.description,
          owner: this.state.userId
        },
        config
      )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    this.setState({
      todos: [
        ...this.state.todos,
        {
          todo: {
            title: this.state.title,
            description: this.state.description,
            owner: this.state.userId
          }
        }
      ],
      title: '',
      description: '',
      owner: ''
    })
  }

  handleSubmitSignup(e) {
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
  }

  handleSubmitLogin(e) {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
          console.log('Ist Status 200')
          this.setState({
            username: response.data.username,
            password: response.data.password,
            loggedIn: true,
            userId: response.data._id
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleLogout(e) {
    e.preventDefault()
    axios
      .delete('http://localhost:5000/api/logout', {})
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log('Ist Status 200')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleCheck(e) {
    e.preventDefault()
    axios
      .get('http://localhost:5000/api/loggedin')
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log('Ist Status 200')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDelete(id) {
    axios
      .post('http://localhost:5000/api/tasks/delete/' + id)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    const newTodos = this.state.todos.filter(todo => todo.todo._id !== id)
    this.setState({
      todos: newTodos
    })
  }

  handleEdit(id) {
    axios
      .post('http://localhost:5000/api/tasks/edit/' + id, {
        title: this.state.title,
        description: this.state.description
        // owner: this.state.userId
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    const newTodos = this.state.todos.map(todo => {
      if (todo.todo._id === id) {
        todo.todo.title=this.state.title
        todo.todo.description=this.state.description
        return todo
      } else {
        return todo
      }
    })
    this.setState({
      todos: newTodos
    })
  }

  render() {
    return (
      <div>
        <h1>Ironhack ToDo Exercise ;)</h1>
        <br />

        <form onSubmit={this.handleSubmitSignup}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Sign Up" />
        </form>

        <form onSubmit={this.handleSubmitLogin}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
        <br />
        <input onClick={this.handleLogout} type="submit" value="Logout" />
        <br />
        <input onClick={this.handleCheck} type="submit" value="Check if Logged In" />
        <br />
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
        <TodoList
          todos={this.state.todos}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}
