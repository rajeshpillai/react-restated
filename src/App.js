import React, { Component } from 'react';
import './App.css';

const MyContext = React.createContext();

// Create a Provider
class MyProvider extends Component {
  state = {
    tasks: [
      {id: 1, title: "New React Context API"},
      {id: 2, title: "Learn VueJS"},
      {id: 3, title: "Master NodeJS"},
    ]
  }

  addTask = (title) => {
    let maxId = Math.max.apply(Math,
      this.state.tasks.map((task)=>{return task.id}));

    let task = {
      id: maxId + 1 ,
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

  render() {
    return (
      <MyContext.Provider value={{
          state: this.state,
          onAddTask: (task) => this.addTask(task),
          onDeleteTask: (taskId) => this.deleteTask(taskId)
      }}>
          {this.props.children}
      </MyContext.Provider>
    )
  }
}

const TaskApp = () => (
  <React.Fragment>
    <TaskForm />
    <ul className = "task-list">
        <TaskList/>
    </ul>
  </React.Fragment>
)

const TaskForm = () => (
  <MyContext.Consumer>
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
  </MyContext.Consumer>
)

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

class App extends Component {

  render() {
    return (
      <MyProvider>
        <div className="container">
          <h1>Task Management App</h1>
          <TaskApp />
        </div>
      </MyProvider>
    );
  }
}

export default App;
