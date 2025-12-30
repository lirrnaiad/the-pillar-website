import { useFeaturedArticleByCategory } from '../../hooks/useArticlesRest';
import { getSubcategoriesForCategory } from '../../config/categorySubcategories';
import HeroSection from '../../components/category/HeroSection';
import SubcategoryFeaturedSection from '../../components/category/SubcategoryFeaturedSection';
import './Videos.css';

function Videos() {
  const categorySlug = 'videos';
  const categoryLabel = 'VIDEOS';
  const subcategories = getSubcategoriesForCategory(categorySlug);

  // Fetch featured article for hero section
  const { article: featuredArticle, loading: heroLoading } = useFeaturedArticleByCategory(categorySlug);

  return (
    <div className="videos-page">
      {/* Small Header Section */}
      <section className="videos-header">
        <div className="container">
          <h1 className="videos-header__title">{categoryLabel}</h1>
        </div>
      </section>

      {/* Hero Section */}
      {!heroLoading && featuredArticle && (
        <HeroSection 
          article={featuredArticle} 
          categoryLabel={categoryLabel}
        />
      )}

      {/* Subcategory Sections */}
      {subcategories.length > 0 && subcategories[0] && (
        <SubcategoryFeaturedSection
          categorySlug={categorySlug}
          tagName={subcategories[0]}
          title={subcategories[0].toUpperCase()}
          gridLimit={4}
        />
      )}

      {subcategories.length > 1 && subcategories[1] && (
        <SubcategoryFeaturedSection
          categorySlug={categorySlug}
          tagName={subcategories[1]}
          title={subcategories[1].toUpperCase()}
          gridLimit={4}
        />
      )}
    </div>
  );
}

export default Videos;
