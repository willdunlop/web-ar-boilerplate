
// /* Three dependencies */
import Core from './core';

/* UI Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';

import Interface from './interface';

const core = new Core();

ReactDOM.render(<Interface core={core}/>, document.getElementById('ui'));
