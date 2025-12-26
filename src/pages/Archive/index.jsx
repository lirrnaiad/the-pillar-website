import './Archive.css';

function Archive() {
  return (
    <div className="archive">
      <div className="container">
        <header className="archive__header">
          <h1 className="archive__title">Archive</h1>
          <p className="archive__description">
            Browse through past issues and publications of The Pillar.
          </p>
        </header>

        <div className="archive__content">
          <div className="archive__placeholder">
            <p>Publication archive will be displayed here</p>
            <small>Past issues organized by year/month</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archive;

