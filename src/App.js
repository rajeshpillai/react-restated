import React, { Component } from 'react';
import './App.css';
import {StateContext as MyContext, Container} from './ReStated';

import TaskApp from './Components/TaskApp';
import Notification from './Components/Notification';

// Create a Provider
class MyProvider extends Container {
  state = {
    tasks: [
      {id: 1, title: "New React Context API"},
      {id: 2, title: "Learn VueJS"},
      {id: 3, title: "Master NodeJS"},
    ],
    notifications: [
      {taskId: 1, message: "Message 1 TaskID 1"},
      {taskId: 1, message: "Message 2 TaskID 1"},
      {taskId: 2, message: "Message 1 for TaskID 2"},
      
    ]
  }

  addTask = (title) => {
    console.log("adding...");
    let maxId = Math.max.apply(Math,
      this.state.tasks.map((task)=>{return task.id}));

    let task = {
      id:  maxId + 1 ,
      title: title
    }

    this.setState({
      tasks: [task, ...this.state.tasks]
    })
  }

  deleteTask = (taskId) => {
    let tasks = this.state.tasks.filter((task) => {
      return task.id !== taskId
    })

    this.setState({
      tasks
    })
  }

  render () {
    console.log("About to call parent render..");
    return super.render();
  }
}

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div className="container">
          <h1>Task Management App</h1>
          <TaskApp />
          <MyContext.Consumer>
            {(context) => (
                <Notification context={context} />
            )}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

export default App;
