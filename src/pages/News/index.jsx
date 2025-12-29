import { useArticlesByCategory, useFeaturedArticleByCategory } from '../../hooks/useArticlesRest';
import HeroSection from '../../components/category/HeroSection';
import SubcategorySection from '../../components/category/SubcategorySection';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './News.css';

function News() {
  // Fetch featured article for hero section
  const { article: featuredArticle, loading: heroLoading } = useFeaturedArticleByCategory('news');

  // Fetch latest news articles (for "Latest News" section)
  const { articles: latestArticles, loading: latestLoading } = useArticlesByCategory('news', {
    page: 0,
    size: 6,
    sortField: 'publishedAt',
    sortDirection: 'DESC',
  });

  return (
    <div className="news-page">
      {/* Small Header Section */}
      <section className="news-header">
        <div className="container">
          <h1 className="news-header__title">NEWS</h1>
        </div>
      </section>

      {/* Hero Section */}
      {!heroLoading && featuredArticle && (
        <HeroSection 
          article={featuredArticle} 
          categoryLabel="NEWS"
        />
      )}

      {/* Latest News Section */}
      <section className="news-latest">
        <div className="container">
          <h2 className="news-latest__title">LATEST NEWS</h2>
          {latestLoading ? (
            <div className="news-latest__loading">
              <Spinner size="48px" message="Loading latest news..." />
            </div>
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="news-latest__grid">
              {latestArticles.slice(0, 4).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="default"
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Academe Section */}
      <SubcategorySection
        categorySlug="news"
        tagName="Academe"
        title="ACADEME"
        limit={6}
      />

      {/* National News Section */}
      <SubcategorySection
        categorySlug="news"
        tagName="National News"
        title="NATIONAL NEWS"
        limit={6}
      />
    </div>
  );
}

export default News;
