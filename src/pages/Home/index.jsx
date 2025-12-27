import './Home.css';
import { ArticleCard } from '../../components/ui/ArticleCard';

function Home() {
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
            <ArticleCard
              thumbnail={'https://picsum.photos/800/600?random=1'}
              category={'News'}
              title={'USC, PYDO spearheads Balik Kampus \u201925, spotlights Fair and Kabataan Caravan'}
              excerpt={'An effort to promote active student involvement, provide learning opportunities, inform and update students on organizational plans and achievements.'}
              date={'2025-09-22'}
              onClick={() => console.log('Article clicked')}
            />
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

