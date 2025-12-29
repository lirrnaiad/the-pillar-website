import React from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import FeaturedHero from '../../components/home/FeaturedHero';
import ArticleCard from '../../components/ui/ArticleCard';
import './Home.css';

// Mock Data
const FEATURED_ARTICLES = [
  {
    category: 'News',
    headline: "USC, PYDO spearheads Balik Kampus '25, spotlights Fair and Kabataan Caravan",
    meta: 'September 23, 2025 | By Mychel Mainog',
    image: 'https://placehold.co/1200x800/082640/dfd0b8?text=Balik+Kampus',
    link: '/news/1'
  },
  {
    category: 'Feature',
    headline: 'UEP Students Excel in National Journalism Competition',
    meta: 'October 15, 2025 | By Sarah Johnson',
    image: 'https://placehold.co/1200x800/1a1a2e/ffffff?text=Journalism+Win',
    link: '/feature/1'
  }
];

const RECENT_ARTICLES = [
  {
    category: 'Cartoon',
    headline: 'KORAPTOBER WEEK 1',
    meta: 'October 04, 2025',
    image: 'https://placehold.co/800x600/dfd0b8/082640?text=Cartoon',
    link: '/cartoon/1'
  },
  {
    category: 'News',
    headline: "CCJ stages officers' induction; Sleuth King and Queen strut during acquaintance",
    meta: 'October 03, 2025 | Nino Balawang',
    image: 'https://placehold.co/800x600/2c3e50/ffffff?text=Induction',
    link: '/news/2'
  },
  {
    category: 'News',
    headline: "Lipon Panitik hosts Huruhimangraw for A.Y. '25-'26",
    meta: 'October 03, 2025 | Wenona Sagonoy',
    image: 'https://placehold.co/800x600/34495e/ffffff?text=Lipon+Panitik',
    link: '/news/3'
  }
];

const LATEST_NEWS = [
  {
    category: 'News',
    headline: "COE holds Stakeholders' Consultative Meeting",
    meta: 'October 03, 2025',
    image: 'https://placehold.co/600x400/082640/ffffff?text=COE',
    link: '/news/4'
  },
  {
    category: 'News',
    headline: "CNAHS kicks off A.Y. '25-'26 with Freshmen Orientation",
    meta: 'October 03, 2025',
    image: 'https://placehold.co/600x400/2980b9/ffffff?text=CNAHS',
    link: '/news/5'
  },
  {
    category: 'News',
    headline: "New Research Center Opens",
    meta: 'October 01, 2025',
    image: 'https://placehold.co/600x400/8e44ad/ffffff?text=Research',
    link: '/news/6'
  }
];

const Home = () => {
  return (
    <div className="home">
      {/* Featured Section */}
      <section className="home__section">
        <div className="container">
          <SectionHeading title="Featured" />
          <FeaturedHero articles={FEATURED_ARTICLES} />
        </div>
      </section>

      {/* Recently Posted Section */}
      <section className="home__section home__section--bg">
        <div className="container">
          <SectionHeading title="Recently Posted" />
          <div className="recent-grid">
            <div className="recent-grid__main">
              <ArticleCard 
                article={RECENT_ARTICLES[0]} 
                variant="hero" 
                className="h-full"
              />
            </div>
            <div className="recent-grid__side">
              <ArticleCard article={RECENT_ARTICLES[1]} />
              <ArticleCard article={RECENT_ARTICLES[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="home__section">
        <div className="container">
          <SectionHeading title="Latest News" />
          <div className="news-grid">
            {LATEST_NEWS.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;