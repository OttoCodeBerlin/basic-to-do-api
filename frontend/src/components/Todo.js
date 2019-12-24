import React from 'react'

function Todo(props) {

  const handleEditClick = e => {
    e.preventDefault()
    props.handleEdit(props.id)
  }
  
  return (
    <div>
      <h2>Title: {props.title}</h2>
      <h4>Description: {props.description}</h4>
      <h6>Created by: {props.owner}</h6>
      <button onClick={() => props.handleDelete(props.id)}>DELETE</button>

      <form onSubmit={handleEditClick}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            // value={props.title}
            onChange={props.handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            // value={props.description}
            onChange={props.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="EDIT" />
      </form>

      {/* <button onClick={() => props.handleEdit(props.id)}>EDIT</button> */}
    </div>
  )
}

export default Todo
