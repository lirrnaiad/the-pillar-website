# The Pillar E-Publication Website

Official digital archive and publication platform for **The Pillar**, the student publication of the University of Eastern Philippines.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** CSS (no frameworks)
- **Routing:** React Router DOM

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
│   ├── hooks/                  # Custom React hooks
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
│   ├── services/               # API service functions
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

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Sections

Based on The Pillar's publication structure:

| Section | Description |
|---------|-------------|
| News | Campus and community news |
| Feature | In-depth feature articles |
| Opinion | Opinion pieces and columns |
| Sci-Tech | Science and technology content |
| Photos | Photojournalism |
| Cartoons | Cartoons and comics |
| Videos | Video content |
| Editorial | Editorial board articles |

## Team

- Sean Ivan M. Fabia
- Paolo Leandro L. Pinca
- Marl June S. Ordonia
- Khristher John B. Balat
- Adielyn P. Quitorio

## License

© 2025 The Pillar, University of Eastern Philippines

