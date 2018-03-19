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