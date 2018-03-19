import React, { Component } from 'react';

// Create a context
export const StateContext = React.createContext(null);
export const {Provider, Consumer} = StateContext;

const SKIP_PROPERTIES = ["props", "context", "setState", "forceUpdate",
                          "refs", "updater",
                          "_reactInternalFiber","_reactInternalInstance",
                          "isReactComponent"];

export class Container extends Component {
    constructor() {
        console.log("Container:ctor");
        super();
        this.setup = this.setup.bind(this);
        this.setupDone = false;
        this.map = {};
    }
    
    setup() {
        // let map = {};
        // // todo: This code may be refactored
        // for (let property in this) {
        //     if (property.startsWith("_")) continue;  // SKIP private methods, starts with "_"
        //     if (SKIP_PROPERTIES.indexOf(property) < 0 ) {
        //         console.log(`Setting ${property}`)
        //         map[property] =  this[property];
        //     }
        // }
        // return map;
        let map = {};
        map.state = this.state;
        map.actions = this.actions;
        return map;
    }
    render () {
        let map = this.setup();
        return (
          <Provider value={map}>
            {this.props.children}
          </Provider>
        )
      }
}
