import { useParams, Link } from 'react-router-dom';
import './Article.css';
import { getArticleBySlug, getRecentArticles, getCategoryById, getArticlesByCategory } from '../../data/mockArticles';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { ArticleGrid } from '../../components/common/ArticleGrid';

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString();
  } catch (e) {
    return d;
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inlineToHtml(text = '') {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function renderContent(content = '') {
  if (!content) return null;
  const blocks = content.split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    // Headings
    const hMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      const level = Math.min(hMatch[1].length, 6);
      return (
        <h${level} key={i} dangerouslySetInnerHTML={{ __html: inlineToHtml(hMatch[2]) }} />
      );
    }

    // Blockquote
    if (/^>\s?/.test(trimmed)) {
      const text = trimmed.replace(/^>\s?/, '');
      return <blockquote key={i} dangerouslySetInnerHTML={{ __html: inlineToHtml(text) }} />;
    }

    // Image-only block: ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      return <img key={i} src={imgMatch[2]} alt={imgMatch[1] || ''} className="article__inline-image" />;
    }

    // Paragraph (allow inline bold/italic/links)
    return <p key={i} dangerouslySetInnerHTML={{ __html: inlineToHtml(block) }} />;
  });
}

function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const categoryObj = article ? getCategoryById(article.category) : null;
  const related = getRecentArticles(3).filter((a) => a.slug !== slug);
  const relatedByCategory = getArticlesByCategory(article?.category).filter((a) => a.slug !== slug).slice(0, 4);

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
          <div className="article__content">{
            renderContent(article.content)
          }</div>

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

        { (relatedByCategory.length > 0 || related.length > 0) && (
          <section className="article__related container">
            <h2 className="article__section-title">Related Articles</h2>
            <ArticleGrid
              articles={(relatedByCategory.length > 0 ? relatedByCategory : related).map((r) => ({
                id: r.id,
                slug: r.slug,
                thumbnail: r.image,
                category: r.category,
                title: r.title,
                excerpt: r.excerpt,
                date: r.publishedAt,
              }))}
              onCardClick={(a) => { window.location.href = `/article/${a.slug}` }}
            />
          </section>
        )}

      </div>
    </article>
  );
}

export default Article;

