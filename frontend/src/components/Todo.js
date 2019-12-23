import React from 'react'

function Todo(props) {
  return (
    <div>
      <h2>Title: {props.title}</h2>
      <h4>Description: {props.description}</h4>
      <h6>Created by: {props.owner}</h6>
      <button onClick={() => props.handleDelete(props.id)}>DELETE</button>
      <button onClick={() => props.handleEdit(props.id)}>EDIT</button>
    </div>
  )
}

export default Todo
