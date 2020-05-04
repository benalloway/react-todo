import React from "react"

function TodoItem(props){
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }
    return (
        <div className="todo-item">
            <input id={props.item.id} type="checkbox" onChange={() => props.onChange(props.item.id)} checked={props.item.completed} />
            <label style={props.item.completed ? completedStyle : null}>{props.item.text}</label>
        </div>
    )
}

export default TodoItem