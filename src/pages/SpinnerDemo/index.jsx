import React, { useState } from 'react';
import { Spinner } from '../../components/common';
import './SpinnerDemo.css';

export default function SpinnerDemo() {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="spinner-demo container">
      <h1>Spinner Demo</h1>
      <p>Use this page to preview the Spinner component variations.</p>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Spinner />
        <Spinner size="48px" />
        <Spinner size="96px" message={showMessage ? 'Loading demo...' : ''} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>
          <input type="checkbox" checked={showMessage} onChange={() => setShowMessage(s => !s)} />
          {' '}Show message on large spinner
        </label>
      </div>
    </div>
  );
}
