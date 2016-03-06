'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ColorPanel from 'components/color_panel/index.jsx';

ReactDOM.render(
    <ColorPanel colors={['#000', '#333', '#666', '#999', '#ccc', '#fff']} width='15em' height='1.5em' />, // Prints Hello World
    document.getElementById('entry')
);
