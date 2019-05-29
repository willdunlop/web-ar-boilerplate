import React, { Component } from 'react';

import constants from '../config/constants';

class Controls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMode: constants.activeMode,
        };
    }


    setControlsMode(e, mode) {
        constants.activeMode = mode;
        this.setState({ activeMode: mode });
    }



    render() {
        const { activeMode, isDev } = this.state;
        return (
            <div className="controls">
                <div className="controls__container">
                  {constants.viewModes.map(mode =>
                    <button
                        onClick={(e) => this.setControlsMode(e, mode)}
                        className={`controls__control controls__position ${activeMode === mode ? "controls__control--active" : ''}`}
                    >
                        {mode}
                    </button>
                  )}
                </div>

            </div>
        );
    }
}

export default Controls;
