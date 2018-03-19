import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskApp = () => (
    <React.Fragment>
      <TaskForm />
      <ul className = "task-list">
          <TaskList/>
      </ul>
    </React.Fragment>
)
export default TaskApp;

