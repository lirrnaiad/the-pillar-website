import './CategoryPage.css';

// Reusable category page template
// Usage: <CategoryPage category="News" description="Latest campus news..." />
function CategoryPage({ category, description, categoryColor }) {
  return (
    <div className="category-page">
      <div className="container">
        <header className="category-page__header">
          <h1 
            className="category-page__title"
            style={{ '--category-color': categoryColor }}
          >
            {category}
          </h1>
          {description && (
            <p className="category-page__description">{description}</p>
          )}
        </header>

        <div className="category-page__content">
          {/* ArticleGrid component goes here */}
          <div className="category-page__placeholder">
            <p>Article Grid will be displayed here</p>
            <small>Use the ArticleGrid component from Khristher</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;

