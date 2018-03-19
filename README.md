THe project is inspired from react-unstated and couple of other articles.(https://github.com/jamiebuilds/unstated).  It is only intended for educational purpose as of now.

## Table of Contents

- [Introduction to reStated](#intro-to-restated)
- [Installation] (#installation)
- [Usage Examples](#usage-examples)
- [Sending Feedback](#sending-feedback)

## Introduction to reStated

ReStated is a state management library using more of an object oriented approach.

## Installation
Right now the entire source code lives withing the below folder
(https://github.com/rajeshpillai/react-restated/tree/master/src/ReStated/index.js)

I will create an NPM package once I test this enough as I don't want to 
pollute the npm repository.

## Usage Examples

The library is very simple to use.  First import Consumer and Container
in your main application.  The below example is of a simple task/todo
app wherein we demonstrate how to do the basic CRUD part of the app.

```js
import {Consumer, Container} from './ReStated';
```

Create a Provider.  The provider should extends from the Container class.
The provider exposes state and the actions.  By default all actions defined
here is available to the consumer/subscriber.

In case you don't want any specific action to be available just being the
name of the action with an underscore,'_'
```js
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

  onAddTask = (title) => {
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

  onDeleteTask = (taskId) => {
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

```

In the render() of the provider ensure to call the render of the base class
by calling super.render();

Now your main App class can be coded as below.

```js
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
```

Please note, in whichever component you need state, wrap the component 
within the Consumer.

Let's take a look at the TaskApp component.

```js
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


```

The TaskApp component as such doesn't need any state information.

Now let's have a look at TaskForm and TaskList component.  The TaskForm
component needs access to the context as it has to invoke the actions
on the provider.  So, import the {Consumer} from the library and wrap
your component within the <Consumer> component.  The context is available
as part of a render props function.

```js
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
```

The below is the code for the TaskList component.

```js
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

```

I will be updating this demo as this is still WIP.
## Sending Feedback

We are always open to [your feedback](https://github.com/rajeshpillai/react-restated/issues).
