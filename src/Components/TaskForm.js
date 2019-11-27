import React from 'react';
import {Consumer } from '../ReStated';

const TaskForm = () => {
    let taskTitle = React.createRef();
    return <Consumer>
      {(context) => (
        <div>
            <input className="input-title" ref={taskTitle} refxxx={(title)=>{this.taskTitle = title}} 
              type="text" placeholder="what do you want to do today?" />
            <button className="button-add" type="submit"
              onClick={(e) => {context.actions.onAddTask(taskTitle.current.value)}}>
              &#x271A;
            </button>
        </div>
      )}
    </Consumer>
}

export default TaskForm;
  