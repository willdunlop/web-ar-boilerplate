import React, { Component } from 'react';

import Portal from './portal';
import ColorPortal from './color-portal';
import Controls from './controls';

import constants from '../config/constants';
import helpers from '../config/helpers';

class Interface extends Component {
    constructor() {
        super();

    }


    render() {
        return (
            <div className="interface">
                <div id="AnimateMessage" className="interface__message">Tap the screen to begin the animation</div>
                <Controls />
            </div>
        );
    }
}

export default Interface;
