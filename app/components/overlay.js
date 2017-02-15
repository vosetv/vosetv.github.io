import React from 'react';

const Overlay = ({ children }) =>
  <div className="overlay">
    <div className="overlay__content">
      <svg viewBox="0 0 30 30">
        <circle style="stroke-width: 3" cx="15" cy="15" r="13"/>
        <circle id="overlay__loader" style="stroke-width: 3.2" stroke-dasharray="7, 80" stroke-dashoffset="0" cx="15" cy="15" r="13"/>
      </svg>
      { children }
    </div>
  </div>

export default Overlay;
