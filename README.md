# The Pillar E-Publication Website

Official digital archive and publication platform for **The Pillar**, the student publication of the University of Eastern Philippines.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** CSS (no frameworks)
- **Routing:** React Router DOM
- **API:** GraphQL (graphql-request)
- **State Management:** React Context API + Custom Hooks

## Project Structure

```
the-pillar-website/
├── public/                     # Static assets served as-is
├── src/
│   ├── assets/                 # Images, fonts, etc.
│   │   └── images/
│   ├── components/             # Reusable React components
│   │   ├── common/             # Shared components (Header, Footer, Nav)
│   │   └── ui/                 # UI primitives (Button, Card, Input)
│   ├── context/                # React Context providers
│   │   └── AuthContext.jsx      # Authentication context
│   ├── hooks/                  # Custom React hooks
│   │   ├── useArticles.js       # Article data hooks
│   │   └── useCategories.js     # Category data hooks
│   ├── pages/                  # Page components
│   │   ├── Home/               # Landing page
│   │   ├── News/               # News section
│   │   ├── Feature/            # Feature articles
│   │   ├── Opinion/            # Opinion pieces
│   │   ├── SciTech/            # Science & Technology
│   │   ├── Photos/             # Photojournalism
│   │   ├── Cartoons/           # Cartoons and Comics
│   │   ├── Videos/             # Video content
│   │   ├── Editorial/          # Editorial articles
│   │   ├── About/              # About The Pillar
│   │   ├── Article/            # Single article view
│   │   ├── Archive/            # Digital archive of past issues
│   │   └── admin/              # CMS Admin pages
│   │       ├── Dashboard/
│   │       ├── Login/
│   │       ├── NewArticle/
│   │       ├── EditArticle/
│   │       └── ManageArticles/
│   ├── services/               # GraphQL API service layer
│   │   ├── api.js              # GraphQL client & utilities
│   │   ├── queries.js           # GraphQL queries
│   │   ├── mutations.js         # GraphQL mutations
│   │   └── index.js             # Service exports
│   ├── styles/                 # Global CSS files
│   │   └── variables.css       # CSS custom properties
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App-level styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global reset/base styles
├── index.html                  # HTML entry point
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend GraphQL endpoint
# Default: http://localhost:8080/graphql

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration

Create a `.env` file in the project root:

```env
# GraphQL API Endpoint
VITE_API_URL=http://localhost:8080/graphql
```

**Note:** The backend must be running for the frontend to fetch data. See the [main README](../README.md) for backend setup instructions.

## API Integration

The frontend communicates with the backend via GraphQL. The API service layer is located in `src/services/`.

### Using the API Services

**Example: Fetching articles**

```javascript
import { useArticles } from '../hooks/useArticles';

function ArticleList() {
  const { articles, loading, error } = useArticles({
    first: 10,
    filter: { status: 'PUBLISHED' },
    sort: { field: 'PUBLISHED_AT', direction: 'DESC' }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
}
```

**Example: Fetching a single article by slug**

```javascript
import { useArticle } from '../hooks/useArticles';
import { useParams } from 'react-router-dom';

function ArticlePage() {
  const { slug } = useParams();
  const { article, loading, error } = useArticle(slug);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <article>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
```

**Example: Authentication**

```javascript
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const { login, isAuthenticated, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      // Redirect to dashboard
    }
  };

  // ...
}
```

### Available Hooks

- `useArticles(options)` - Fetch articles with pagination and filtering
- `useArticle(slug)` - Fetch a single article by slug
- `useFeaturedArticles(first)` - Fetch featured articles
- `useArticlesByCategory(categorySlug, options)` - Fetch articles by category
- `useRecentArticles(first)` - Fetch recent articles
- `useSearchArticles(query, options)` - Search articles
- `useCategories()` - Fetch all categories
- `useCategory(slug)` - Fetch a single category by slug
- `useAuth()` - Authentication context hook

### Direct API Usage

You can also use the API services directly:

```javascript
import { query, mutate } from '../services/api';
import { GET_ARTICLES, LOGIN } from '../services/queries';

// Query
const { data, error } = await query(GET_ARTICLES, {
  first: 10,
  filter: { status: 'PUBLISHED' }
});

// Mutation (requires authentication)
const { data, error } = await mutate(LOGIN, {
  email: 'user@example.com',
  password: 'password123'
});
```

## Content Sections

Based on The Pillar's publication structure:

| Section | Description | Route |
|---------|-------------|-------|
| News | Campus and community news | `/news` |
| Feature | In-depth feature articles | `/feature` |
| Opinion | Opinion pieces and columns | `/opinion` |
| Sci-Tech | Science and technology content | `/sci-tech` |
| Photos | Photojournalism | `/photos` |
| Cartoons | Cartoons and comics | `/cartoons` |
| Videos | Video content | `/videos` |
| Editorial | Editorial board articles | `/editorial` |

## Team

- Sean Ivan M. Fabia
- Paolo Leandro L. Pinca
- Marl June S. Ordonia
- Khristher John B. Balat
- Adielyn P. Quitorio

## License

© 2025 The Pillar, University of Eastern Philippines

