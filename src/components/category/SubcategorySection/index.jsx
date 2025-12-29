import { useArticlesByCategoryAndTag } from '../../../hooks/useArticlesRest';
import ArticleCard from '../../ui/ArticleCard';
import { Spinner } from '../../common';
import './SubcategorySection.css';

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
 * SubcategorySection Component
 * Displays articles filtered by category and tag in a grid layout
 * 
 * @param {Object} props
 * @param {string} props.categorySlug - Category slug
 * @param {string} props.tagName - Tag name to filter by
 * @param {string} props.title - Section title (e.g., "ACADEME", "NATIONAL NEWS")
 * @param {number} props.limit - Maximum number of articles to display (default: 6)
 */
const SubcategorySection = ({ 
  categorySlug, 
  tagName, 
  title, 
  limit = 6 
}) => {
  const { articles, loading, error } = useArticlesByCategoryAndTag(
    categorySlug,
    tagName,
    {
      size: limit,
      sortField: 'publishedAt',
      sortDirection: 'DESC',
      autoFetch: true,
    }
  );

  if (error) {
    console.error(`Error loading ${title} articles:`, error);
    return null; // Don't show error, just don't render the section
  }

  if (loading) {
    return (
      <section className="subcategory-section">
        <div className="container">
          <h2 className="subcategory-section__title">{title}</h2>
          <div className="subcategory-section__loading">
            <Spinner size="48px" />
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <section className="subcategory-section">
      <div className="container">
        <h2 className="subcategory-section__title">{title}</h2>
        <div className="subcategory-section__grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubcategorySection;

