import React from 'react';
import {StateContext} from '../ReStated';

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
        <StateContext.Consumer>
            {(context) => (
                renderUI(context)
            )}
        </StateContext.Consumer>
    )
}

export default TaskList;