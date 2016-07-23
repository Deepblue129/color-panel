import React from 'react';
import { render } from 'react-dom';
import ColorPanel from './../build/Component.js';

render(
  <ColorPanel
    colors={['#000', '#333', '#666', '#999', '#ccc', '#fff']}
    width="15em"
    height="1.5em"
  />,
  document.getElementById('entry')
);
