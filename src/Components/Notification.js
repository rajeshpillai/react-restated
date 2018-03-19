import React, {Component} from 'react';

export default class Notification extends Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return(this.props.children !== nextProps.children);
    }
    componentDidMount() {
        console.log(this.props.context.state.notifications);
    }
    render() {
        console.log("Notifications->render");
        return (
        <h2>{this.props.children}</h2>
        );
    }
}
  
  