import React from 'react';
import './Spinner.css';
import logoImage from '../../../assets/images/thepillar-logo.png';

export default function Spinner({ size = '56px', message, className = '' }) {
  const style = { ['--spinner-size']: size };

  return (
    <div className={`spinner ${className}`} style={style} role="status" aria-live="polite">
      <div className="spinner__rings">
        <div className="spinner__ring"></div>
        <div className="spinner__ring spinner__ring--alt"></div>
      </div>
      <div className="spinner__core">
        <img src={logoImage} alt="The Pillar logo" className="spinner__logo" />
      </div>
      {message && <div className="spinner__message">{message}</div>}
    </div>
  );
}
