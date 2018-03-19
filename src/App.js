import React, { Component } from 'react';
import './App.css';
import {Consumer, Container} from './ReStated';
import TaskApp from './Components/TaskApp';
import Notification from './Components/Notification';
import TimeProvider from './Providers/TimeProvider';
import Time from './Components/Time';

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

  actions = {
    onAddTask: (title) => {
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
    },

    onDeleteTask: (taskId) => {
      console.log("onDeleteTask...");
      let tasks = this.state.tasks.filter((task) => {
        return task.id !== taskId
      })

      this.setState({
        tasks
      }, ()=> {
        console.log("after update: ",this.state.tasks);
      });
    }
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
          <Consumer>
            {(context) => (
                <Notification context={context} />
            )}
          </Consumer>
        </div>
        <TimeProvider>
            <Time />
        </TimeProvider>
      </MyProvider>
    );
  }
}

export default App;
