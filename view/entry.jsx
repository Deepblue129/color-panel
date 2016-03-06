'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ColorPanel from 'component/index.jsx';

ReactDOM.render(
    <ColorPanel colors={['#000', '#333', '#666', '#999', '#ccc', '#fff']} width="15em" height="1.5em" />,
    document.getElementById('entry')
);
