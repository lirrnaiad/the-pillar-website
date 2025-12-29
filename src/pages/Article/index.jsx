import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Article.css';
import { Spinner } from '../../components/common';

function Article() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [slug]);

  return (
    <article className="article">
      <div className="container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <Spinner message="Loading article…" />
          </div>
        ) : (
          <div className="article__placeholder">
            <h1>Article View</h1>
            <p>Viewing article: <code>{slug}</code></p>
            <small>
              This page will display a single article with full content.
              <br />
              Assigned to: Khristher - Article page implementation
            </small>
          </div>
        )}
      </div>
    </article>
  );
}

export default Article;

