import { useArticlesByCategory, useFeaturedArticleByCategory } from '../../hooks/useArticlesRest';
import { getSubcategoriesForCategory } from '../../config/categorySubcategories';
import HeroSection from '../../components/category/HeroSection';
import SubcategorySection from '../../components/category/SubcategorySection';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Sports.css';

function Sports() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sports/index.jsx:ENTRY',message:'Sports component rendered',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B'})}).catch(()=>{});
  // #endregion

  const categorySlug = 'sports';
  const categoryLabel = 'SPORTS';
  const subcategories = getSubcategoriesForCategory(categorySlug);

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sports/index.jsx:AFTER_CONFIG',message:'Category config loaded',data:{categorySlug,subcategories:subcategories?.length,subcategoriesList:subcategories},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // Fetch featured article for hero section
  const { article: featuredArticle, loading: heroLoading, error: heroError } = useFeaturedArticleByCategory(categorySlug);

  // Fetch latest articles (for "Latest Sports" section)
  const { articles: latestArticles, loading: latestLoading, error: latestError } = useArticlesByCategory(categorySlug, {
    page: 0,
    size: 6,
    sortField: 'publishedAt',
    sortDirection: 'DESC',
  });

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sports/index.jsx:AFTER_HOOKS',message:'Hooks executed',data:{heroLoading,heroError:heroError?.message,latestLoading,latestError:latestError?.message,hasFeaturedArticle:!!featuredArticle,latestArticlesCount:latestArticles?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'})}).catch(()=>{});
  // #endregion

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sports/index.jsx:BEFORE_RETURN',message:'About to render JSX',data:{categoryLabel,hasSubcategories:subcategories?.length>0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return (
    <div className="sports-page">
      {/* Small Header Section */}
      <section className="sports-header">
        <div className="container">
          <h1 className="sports-header__title">{categoryLabel}</h1>
        </div>
      </section>

      {/* Hero Section */}
      {!heroLoading && featuredArticle && (
        <HeroSection 
          article={featuredArticle} 
          categoryLabel={categoryLabel}
        />
      )}

      {/* Latest Sports Section */}
      <section className="sports-latest">
        <div className="container">
          <h2 className="sports-latest__title">LATEST {categoryLabel}</h2>
          {latestError && (
            <div style={{ padding: '20px', background: '#fee', border: '1px solid #fcc', marginBottom: '20px' }}>
              <strong>Error loading articles:</strong> {latestError}
            </div>
          )}
          {latestLoading ? (
            <div className="sports-latest__loading">
              <Spinner size="48px" message="Loading latest articles..." />
            </div>
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="sports-latest__grid">
              {latestArticles.slice(0, 4).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="default"
                />
              ))}
            </div>
          ) : !latestLoading && !latestError ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>No articles found for Sports category.</p>
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

export default Sports;

