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