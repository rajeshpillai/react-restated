import React, { Component } from 'react';

// Create a context
export const StateContext = React.createContext(null);
export const {Provider, Consumer} = StateContext;

const SKIP_PROPERTIES = ["props", "context", 
                          "refs", "updater",
                          "_reactInternalFiber","_reactInternalInstance",
                          "isReactComponent"];

export class Container extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        console.log("Called parent render");
        let map = {};
        for (var property in this) {
            console.log(property);
            //map.set(property, this[property]);
            if (property.startsWith("_")) continue;  // SKIP private methods, starts with "_"
            if (SKIP_PROPERTIES.indexOf(property) < 0 ) {
                map[property] = this[property];
            }
        }
        console.dir(map);
        return (
          <Provider value={map}>
            {this.props.children}
          </Provider>
        )
      }
}
