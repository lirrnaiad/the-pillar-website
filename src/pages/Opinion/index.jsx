import { useArticlesByCategory, useFeaturedArticleByCategory } from '../../hooks/useArticlesRest';
import { getSubcategoriesForCategory } from '../../config/categorySubcategories';
import HeroSection from '../../components/category/HeroSection';
import SubcategorySection from '../../components/category/SubcategorySection';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Opinion.css';

function Opinion() {
  const categorySlug = 'opinion';
  const categoryLabel = 'OPINION';
  const subcategories = getSubcategoriesForCategory(categorySlug);

  // Fetch featured article for hero section
  const { article: featuredArticle, loading: heroLoading } = useFeaturedArticleByCategory(categorySlug);

  // Fetch latest articles (for "Latest Opinion" section)
  const { articles: latestArticles, loading: latestLoading } = useArticlesByCategory(categorySlug, {
    page: 0,
    size: 6,
    sortField: 'publishedAt',
    sortDirection: 'DESC',
  });

  return (
    <div className="opinion-page">
      {/* Small Header Section */}
      <section className="opinion-header">
        <div className="container">
          <h1 className="opinion-header__title">{categoryLabel}</h1>
        </div>
      </section>

      {/* Hero Section */}
      {!heroLoading && featuredArticle && (
        <HeroSection 
          article={featuredArticle} 
          categoryLabel={categoryLabel}
        />
      )}

      {/* Latest Opinion Section */}
      <section className="opinion-latest">
        <div className="container">
          <h2 className="opinion-latest__title">LATEST {categoryLabel}</h2>
          {latestLoading ? (
            <div className="opinion-latest__loading">
              <Spinner size="48px" message="Loading latest articles..." />
            </div>
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="opinion-latest__grid">
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

      {/* Subcategory Sections */}
      {subcategories.length > 0 && subcategories[0] && (
        <SubcategorySection
          categorySlug={categorySlug}
          tagName={subcategories[0]}
          title={subcategories[0].toUpperCase()}
          limit={6}
        />
      )}

      {subcategories.length > 1 && subcategories[1] && (
        <SubcategorySection
          categorySlug={categorySlug}
          tagName={subcategories[1]}
          title={subcategories[1].toUpperCase()}
          limit={6}
        />
      )}
    </div>
  );
}

export default Opinion;
