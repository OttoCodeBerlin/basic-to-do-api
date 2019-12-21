import React from 'react'

function Todo(props) {
  // console.log(props)
  return (
    <div>
    <h2>Title: {props.title}</h2>
    <h4>Description: {props.description}</h4>
    <h6>Created by: {props.owner}</h6>
  </div>
  ) 
}

export default Todo
