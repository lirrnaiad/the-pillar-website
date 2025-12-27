import './Home.css';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { ArticleGrid } from '../../components/common/ArticleGrid';

function Home() {
  return (
    <div className="home">
      {/* Hero/Featured Section - TODO: Implement ArticleHero component */}
      <section className="home__featured">
        <div className="container">
          <h2 className="home__section-label">FEATURED</h2>
          <div className="home__hero-placeholder">
            <ArticleHero
              thumbnail={'https://picsum.photos/1200/800?random=201'}
              category={'Feature'}
              title={'Campus celebrates student innovation and projects during Balik Kampus'}
              excerpt={'Students showcased a range of projects, performances, and community programs during the university fair.'}
              date={'2025-09-22'}
              author={'By The Pillar Staff'}
              onClick={() => console.log('Open featured article')}
            />
          </div>
        </div>
      </section>

      {/* Recently Posted Section */}
      <section className="home__recent">
        <div className="container">
          <h2 className="home__section-label">RECENTLY POSTED</h2>
          <div className="home__grid-placeholder">
            {/** Example ArticleGrid for visual verification */}
            <ArticleGrid
              articles={[
                {
                  id: 1,
                  thumbnail: 'https://picsum.photos/800/600?random=101',
                  category: 'News',
                  title: 'USC, PYDO spearheads Balik Kampus \u201925, spotlights Fair and Kabataan Caravan',
                  excerpt:
                    'An effort to promote active student involvement, provide learning opportunities, inform and update students on organizational plans and achievements.',
                  date: '2025-09-22',
                },
                {
                  id: 2,
                  thumbnail: 'https://picsum.photos/800/600?random=102',
                  category: 'Feature',
                  title: 'Campus feature spotlight: student initiatives',
                  excerpt: 'Students showcase projects and creative works during the campus fair.',
                  date: '2025-09-21',
                },
                {
                  id: 3,
                  thumbnail: 'https://picsum.photos/800/600?random=103',
                  category: 'Photos',
                  title: 'Photowalk highlights campus life',
                  excerpt: 'A quick look at the moments captured during the photowalk event.',
                  date: '2025-09-20',
                },
              ]}
              onCardClick={(a) => console.log('Open article', a)}
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

