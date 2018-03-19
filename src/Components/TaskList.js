import React from 'react';
import {StateContext as MyContext} from '../ReStated';

const TaskList = () => {
    const renderUI = (context) => {
        return context.state.tasks.map((task) => {
        return (
            <li className="task-item" key={task.id}>
            <span>{task.title}</span>
            <button className="todo-delete-button"
                onClick={(e) => context.onDeleteTask(task.id)}>
                &#x274C;
            </button>
            </li>
        )
        })
    }
    return (
        <MyContext.Consumer>
        {(context) => (
            renderUI(context)
        )}
        </MyContext.Consumer>
    )
}

export default TaskList;