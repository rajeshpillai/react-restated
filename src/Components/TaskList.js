import React from 'react';
import {Consumer} from '../ReStated';

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
        <Consumer>
            {(context) => (
                renderUI(context)
            )}
        </Consumer>
    )
}

export default TaskList;