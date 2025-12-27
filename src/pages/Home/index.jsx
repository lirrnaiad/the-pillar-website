import React, { useEffect, useState } from 'react';
import './Home.css';
import { Spinner } from '../../components/common';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch for demo purposes
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home">
      {/* Hero/Featured Section - TODO: Implement ArticleHero component */}
      <section className="home__featured">
        <div className="container">
          <h2 className="home__section-label">FEATURED</h2>
          <div className="home__hero-placeholder">
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
                <Spinner size="72px" message="Loading featured story..." />
              </div>
            ) : (
              <>
                <p>Featured Article Hero Component goes here</p>
                <small>Assigned to: Khristher - ArticleHero component</small>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Recently Posted Section */}
      <section className="home__recent">
        <div className="container">
          <h2 className="home__section-label">RECENTLY POSTED</h2>
          <div className="home__grid-placeholder">
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <Spinner size="48px" />
              </div>
            ) : (
              <>
                <p>Article Grid Component goes here</p>
                <small>Assigned to: Khristher - ArticleGrid component</small>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Category Sections - TODO: Add more sections based on Figma */}
      <section className="home__section">
        <div className="container">
          <h2 className="home__section-label">NEWS</h2>
          <div className="home__grid-placeholder">
            <p>News articles will be displayed here</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

