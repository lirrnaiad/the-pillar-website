import React, { useEffect, useState } from 'react';
import './Archive.css';
import { Spinner } from '../../components/common';

function Archive() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="archive">
      <div className="container">
        <header className="archive__header">
          <h1 className="archive__title">Archive</h1>
          <p className="archive__description">
            Browse through past issues and publications of The Pillar.
          </p>
        </header>

        <div className="archive__content">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 0' }}>
              <Spinner size="64px" message="Loading archives…" />
            </div>
          ) : (
            <div className="archive__placeholder">
              <p>Publication archive will be displayed here</p>
              <small>Past issues organized by year/month</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Archive;

