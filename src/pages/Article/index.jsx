import { useParams } from 'react-router-dom';
import './Article.css';

function Article() {
  const { slug } = useParams();

  return (
    <article className="article">
      <div className="container">
        <div className="article__placeholder">
          <h1>Article View</h1>
          <p>Viewing article: <code>{slug}</code></p>
          <small>
            This page will display a single article with full content.
            <br />
            Assigned to: Khristher - Article page implementation
          </small>
        </div>
      </div>
    </article>
  );
}

export default Article;

