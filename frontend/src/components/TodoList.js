import React from 'react'

import Todo from './Todo'

export default function TodoList(props) {
  return (
    <div>
      <h2>List of ToDos</h2>
      <div>
        {props.todos.map((c, index) => (
          <Todo title={c.todo.title} description={c.todo.description} owner={c.todo.owner} />
        ))}
      </div>
    </div>
  )
}
