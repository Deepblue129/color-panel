'use strict';

import React from 'react';
import './style.scss';

const ColorPanel = (props) => {
	var styles = {
		height: props.height,
		width: props.width
	};

	return (
		<div className="color-panel" style={styles}>
			{props.colors.map(function(color, i) {
				return (
					<div style={{backgroundColor : color}} key={'color-panel-color' + i} ></div>
				);
			})}
		</div>
	)
}

ColorPanel.propTypes = {
	height: React.PropTypes.string.isRequired,
	width: React.PropTypes.string.isRequired,
	colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}

export default ColorPanel;

