import React from 'react';
import {Consumer } from '../ReStated';

const TaskForm = () => (
    <Consumer>
      {(context) => (
        <div>
            <input className="input-title" ref={(title)=>{this.taskTitle = title}} 
              type="text" placeholder="what do you want to do today?" />
            <button className="button-add" type="submit"
              onClick={(e) => {context.onAddTask(this.taskTitle.value)}}>
              &#x271A;
            </button>
        </div>
      )}
    </Consumer>
)

export default TaskForm;
  