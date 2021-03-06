## Synopsis

A React Component for a color panel. The color panel accepts a parameter of height and width. It then evenly distributes those colors in a column fashion. 

![alt text](screenshot.png)

## Code Example

Download from NPM `npm install color-panel --save`

Then include the component into your react like so:
```javascript
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ColorPanel from 'component/index.jsx';

ReactDOM.render(
    <ColorPanel colors={['#000', '#333', '#666', '#999', '#ccc', '#fff']} width="15em" height="1.5em" />,
    document.getElementById('entry')
);
```

## Get Started

Download from NPM `npm install color-panel --save`

## License

MIT