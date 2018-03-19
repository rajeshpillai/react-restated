THe project is inspired from react-unstated and couple of other articles.(https://github.com/jamiebuilds/unstated).  It is only intended for educational purpose as of now.

## Table of Contents

- [Introduction to reStated](#intro-to-restated)
- [Installation](#installation)
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
  
  // This method is private and won't be available in the context.
  _privateMethod = () => {
    console.log("I am private!");
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

The TaskForm needs the context, as it has to invoke the onAddTask method when the button is clicked.

The below is the code for the TaskList component.  The TaskList component
also needs the context as it needs both the state info as well as the 
actions.

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
We can also create multiple providers if need be.   For e.g. let's  create
a TimeProvider which supplies time and also a Time component that needs data
from the TimeProvider.

The below is the code for TimeProvider.  Just extend any class from the 
Component and it has all the features required to become a Provider.

```js
import React from 'react';
import {Container} from '../ReStated';

export default class TimeProvider extends Container {
    state = {
        time: new Date()
    }
    render () {
        return super.render();
    }
}
```
The TimeProvider above exposes only a state object with one attribute time.
But you can use this as per your requirements add add methods, more properties etc.

Now lets create a <Time/> component that uses TimeProvider.

```js
import React from 'react';
import {Consumer} from '../ReStated';

const Time = () => {
    return (
      <Consumer>
        {({state}) => (
          <span className="time">{state.time.toString()}</span>
        )}
      </Consumer>
    );
}

export default Time;
```
To get the context we just have to wrap our component within the <Consumer>
component.

Now let's see how we can integrate this in our App component.

```js
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

```
In the App component we just wrap our Time component within the TimeProvider and voila we are done.

I will be updating this demo as this is still WIP.
## Sending Feedback

We are always open to [your feedback](https://github.com/rajeshpillai/react-restated/issues).
