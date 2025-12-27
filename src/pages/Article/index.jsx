import { useParams, Link } from 'react-router-dom';
import './Article.css';
import { getArticleBySlug, getRecentArticles, getCategoryById } from '../../data/mockArticles';
import { ArticleCard } from '../../components/ui/ArticleCard';

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString();
  } catch (e) {
    return d;
  }
}

function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const categoryObj = article ? getCategoryById(article.category) : null;
  const related = getRecentArticles(3).filter((a) => a.slug !== slug);

  if (!article) {
    return (
      <article className="article">
        <div className="container">
          <div className="article__notfound">
            <h1>Article not found</h1>
            <p>No article matches <code>{slug}</code>.</p>
            <p>
              <Link to="/">Return home</Link>
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="article article--full">
      <div className="container">
        <header className="article__header">
          <div className="article__hero" style={{ backgroundImage: `url(${article.image})` }} aria-hidden="true" />
          <div className="article__meta">
            {categoryObj ? (
              <Link
                to={`/category/${categoryObj.id}`}
                className="article__category"
                style={{ ['--badge-color']: categoryObj.color }}
              >
                {categoryObj.name}
              </Link>
            ) : (
              <span className="article__category" style={{ ['--badge-color']: `var(--color-${article.category})` }}>
                {article.category}
              </span>
            )}

            <h1 className="article__title">{article.title}</h1>

            <div className="article__byline">
              {article.author?.name && (
                <span className="article__author">By {article.author.name}</span>
              )}
              {article.publishedAt && (
                <time className="article__date" dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              )}
              {article.photographer && <span className="article__photographer"> — Photo: {article.photographer}</span>}
            </div>

            {article.excerpt && <p className="article__excerpt">{article.excerpt}</p>}
          </div>
        </header>

        <section className="article__body">
          <div className="article__content">
            {article.content.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="article__sidebar">
            <div className="card card--sticky">
              <h3>About the author</h3>
              <p>{article.author?.name || 'The Pillar'}</p>
            </div>
            <div className="card">
              <h3>Related</h3>
              <div className="article__related-list">
                {related.map((r) => (
                  <ArticleCard
                    key={r.id}
                    thumbnail={r.image}
                    category={r.category}
                    title={r.title}
                    excerpt={r.excerpt}
                    date={r.publishedAt}
                    onClick={() => { window.location.href = `/article/${r.slug}` }}
                  />
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </article>
  );
}

export default Article;

