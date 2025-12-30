import { useFeaturedArticleByCategory } from '../../hooks/useArticlesRest';
import { getSubcategoriesForCategory } from '../../config/categorySubcategories';
import HeroSection from '../../components/category/HeroSection';
import SubcategoryFeaturedSection from '../../components/category/SubcategoryFeaturedSection';
import './Photos.css';

function Photos() {
  const categorySlug = 'photos';
  const categoryLabel = 'PHOTOS';
  const subcategories = getSubcategoriesForCategory(categorySlug);

  // Fetch featured article for hero section
  const { article: featuredArticle, loading: heroLoading } = useFeaturedArticleByCategory(categorySlug);

  return (
    <div className="photos-page">
      {/* Small Header Section */}
      <section className="photos-header">
        <div className="container">
          <h1 className="photos-header__title">{categoryLabel}</h1>
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
    </div>
  );
}

export default Photos;
