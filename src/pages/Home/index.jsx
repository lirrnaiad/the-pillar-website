import React from 'react';
import { useFeaturedArticles, useRecentArticles, useArticlesByCategory } from '../../hooks/useArticlesRest';
import SectionHeading from '../../components/ui/SectionHeading';
import FeaturedHero from '../../components/home/FeaturedHero';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Home.css';

/**
 * Format date for display
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Transform REST API article to FeaturedHero format
 */
const transformToFeaturedHeroFormat = (article) => {
  if (!article) return null;
  
  const authorName = article.author?.fullName || 
                     (article.author?.firstName && article.author?.lastName 
                      ? `${article.author.firstName} ${article.author.lastName}` 
                      : '');
  
  return {
    category: article.category?.name || 'Article',
    headline: article.title || 'Untitled',
    meta: `${formatDate(article.publishedAt)}${authorName ? ` | By ${authorName}` : ''}`,
    image: article.cover?.url || 'https://placehold.co/1200x800/082640/dfd0b8?text=Article',
    link: getArticleLink(article)
  };
};

/**
 * Get article link based on category
 */
const getArticleLink = (article) => {
  if (!article || !article.slug) return '#';
  
  const categorySlug = article.category?.slug?.toLowerCase() || '';
  
  if (categorySlug === 'photos' || categorySlug.includes('photo')) {
    return `/photos/${article.slug}`;
  }
  if (categorySlug === 'cartoons' || categorySlug === 'cartoons-and-comics' || categorySlug.includes('cartoon') || categorySlug.includes('comic')) {
    return `/cartoons/${article.slug}`;
  }
  
  return `/article/${article.slug}`;
};

const Home = () => {
  // Fetch featured articles (limit to 2-3 for the hero)
  const { articles: featuredArticles, loading: featuredLoading } = useFeaturedArticles(3);
  
  // Fetch recent articles (for "Recently Posted" section)
  const { articles: recentArticles, loading: recentLoading } = useRecentArticles(3);
  
  // Fetch latest news articles (for "Latest News" section)
  const { articles: latestNewsArticles, loading: latestNewsLoading } = useArticlesByCategory('news', {
    page: 0,
    size: 6,
    sortField: 'publishedAt',
    sortDirection: 'DESC',
  });

  // Transform featured articles for FeaturedHero component
  const transformedFeaturedArticles = featuredArticles.slice(0, 3).map(transformToFeaturedHeroFormat).filter(Boolean);

  return (
    <div className="home">
      {/* Featured Section */}
      <section className="home__section">
        <div className="container">
          <SectionHeading title="Featured" />
          {featuredLoading ? (
            <div className="home__loading">
              <Spinner size="72px" message="Loading featured articles..." />
            </div>
          ) : transformedFeaturedArticles.length > 0 ? (
            <FeaturedHero articles={transformedFeaturedArticles} />
          ) : (
            <div className="home__empty">
              <p>No featured articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recently Posted Section */}
      <section className="home__section home__section--bg">
        <div className="container">
          <SectionHeading title="Recently Posted" />
          {recentLoading ? (
            <div className="home__loading">
              <Spinner size="48px" message="Loading recent articles..." />
            </div>
          ) : recentArticles.length > 0 ? (
            <div className="recent-grid">
              <div className="recent-grid__main">
                <ArticleCard 
                  article={recentArticles[0]} 
                  variant="hero" 
                  className="h-full"
                />
              </div>
              <div className="recent-grid__side">
                {recentArticles.slice(1, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <div className="home__empty">
              <p>No recent articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="home__section">
        <div className="container">
          <SectionHeading title="Latest News" />
          {latestNewsLoading ? (
            <div className="home__loading">
              <Spinner size="48px" message="Loading latest news..." />
            </div>
          ) : latestNewsArticles.length > 0 ? (
            <div className="news-grid">
              {latestNewsArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="home__empty">
              <p>No news articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
