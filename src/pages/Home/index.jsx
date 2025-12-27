import { useState } from 'react';
import { Dropdown } from '../../components/ui/Dropdown';
import './Home.css';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'news', label: 'News' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'feature', label: 'Feature' },
    { value: 'scitech', label: 'Science & Tech' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'sports', label: 'Sports' },
    { value: 'photos', label: 'Photos' },
    { value: 'videos', label: 'Videos' },
    { value: 'cartoons', label: 'Cartoons' },
  ];

  return (
    <div className="home">
      {/* Hero/Featured Section - TODO: Implement ArticleHero component */}
      <section className="home__featured">
        <div className="container">
          <h2 className="home__section-label">FEATURED</h2>
          <div className="home__hero-placeholder">
            <p>Featured Article Hero Component goes here</p>
            <small>Assigned to: Khristher - ArticleHero component</small>
          </div>
        </div>
      </section>

      {/* Recently Posted Section */}
      <section className="home__recent">
        <div className="container">
          <h2 className="home__section-label">RECENTLY POSTED</h2>
          <div className="home__grid-placeholder">
            <p>Article Grid Component goes here</p>
            <small>Assigned to: Khristher - ArticleGrid component</small>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="home__section">
        <div className="container">
          <h2 className="home__section-label">BROWSE BY CATEGORY</h2>
          
          <div className="home__filter-container">
            <Dropdown
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              label="Select a category"
              placeholder="All Categories"
            />
            <p className="home__filter-info">
              Currently viewing: <strong>{categoryOptions.find(opt => opt.value === selectedCategory)?.label}</strong>
            </p>
          </div>

          <div className="home__grid-placeholder">
            <p>Articles from {categoryOptions.find(opt => opt.value === selectedCategory)?.label} will be displayed here</p>
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

