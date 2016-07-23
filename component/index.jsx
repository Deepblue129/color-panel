import React, { PropTypes } from 'react';

// eslint-disable-next-line react/prop-types
const ColorPanel = ({ height, width, colors }) => {
  const styles = {
    height,
    width,
    display: 'flex',
  };

  return (
    <div className="color-panel" style={styles}>
        {colors.map((color, i) =>
          <div
            style={{ backgroundColor: color, width: '100%', height: '100%' }}
            key={`color-panel-color${i}`}
          >
          </div>)}
    </div>
  );
};

ColorPanel.PropTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorPanel;
