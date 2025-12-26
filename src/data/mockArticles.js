// Mock article data for development
// Replace with actual API calls when backend is ready

export const categories = [
  { id: 'news', name: 'News', color: 'var(--color-news)' },
  { id: 'feature', name: 'Feature', color: 'var(--color-feature)' },
  { id: 'opinion', name: 'Opinion', color: 'var(--color-opinion)' },
  { id: 'sci-tech', name: 'Sci-Tech', color: 'var(--color-scitech)' },
  { id: 'editorial', name: 'Editorial', color: 'var(--color-editorial)' },
  { id: 'sports', name: 'Sports', color: 'var(--color-sports)' },
  { id: 'photos', name: 'Photos', color: 'var(--color-photos)' },
  { id: 'cartoons', name: 'Cartoons', color: 'var(--color-cartoons)' },
  { id: 'videos', name: 'Videos', color: 'var(--color-videos)' },
];

export const mockArticles = [
  {
    id: 1,
    slug: 'usc-pydo-spearheads-balik-kampus-25',
    title: "USC, PYDO spearheads Balik Kampus '25, spotlights Fair and Kabataan Caravan",
    excerpt: 'The University Student Council and Provincial Youth Development Office jointly organized the annual Balik Kampus event, featuring various activities for returning students.',
    content: 'Full article content goes here...',
    category: 'news',
    author: {
      name: 'Mychel Matnog',
      avatar: null,
    },
    photographer: 'Clarence Tuballas',
    image: 'https://placehold.co/800x500/1a1a2e/ffffff?text=Article+Image',
    publishedAt: '2025-09-23',
    isFeatured: true,
  },
  {
    id: 2,
    slug: 'horapillar-week-1-episode',
    title: 'HORAPILLAR Week 1: Welcome to the new semester',
    excerpt: 'The Pillar launches its podcast series HORAPILLAR, discussing campus life and student concerns.',
    content: 'Full article content goes here...',
    category: 'feature',
    author: {
      name: 'The Pillar Staff',
      avatar: null,
    },
    image: 'https://placehold.co/800x500/16213e/ffffff?text=Horapillar',
    publishedAt: '2025-09-20',
    isFeatured: false,
  },
  {
    id: 3,
    slug: 'editorial-student-welfare-priority',
    title: 'Student welfare should remain a priority',
    excerpt: 'An editorial piece discussing the importance of prioritizing student welfare in university policies.',
    content: 'Full article content goes here...',
    category: 'editorial',
    author: {
      name: 'Editorial Board',
      avatar: null,
    },
    image: 'https://placehold.co/800x500/e74c3c/ffffff?text=Editorial',
    publishedAt: '2025-09-18',
    isFeatured: false,
  },
  {
    id: 4,
    slug: 'opinion-campus-digitalization',
    title: 'Campus digitalization: Are we ready?',
    excerpt: 'A student perspective on the ongoing digital transformation initiatives at UEP.',
    content: 'Full article content goes here...',
    category: 'opinion',
    author: {
      name: 'Juan Dela Cruz',
      avatar: null,
    },
    image: 'https://placehold.co/800x500/9b59b6/ffffff?text=Opinion',
    publishedAt: '2025-09-15',
    isFeatured: false,
  },
  {
    id: 5,
    slug: 'scitech-new-computer-lab',
    title: 'New computer laboratory opens in CCS building',
    excerpt: 'The College of Computer Studies inaugurates a state-of-the-art computer laboratory.',
    content: 'Full article content goes here...',
    category: 'sci-tech',
    author: {
      name: 'Tech Team',
      avatar: null,
    },
    image: 'https://placehold.co/800x500/27ae60/ffffff?text=Sci-Tech',
    publishedAt: '2025-09-12',
    isFeatured: false,
  },
  {
    id: 6,
    slug: 'photos-foundation-day-2025',
    title: 'In Photos: UEP Foundation Day 2025',
    excerpt: 'A photo gallery capturing the highlights of this year\'s Foundation Day celebration.',
    content: 'Full article content goes here...',
    category: 'photos',
    author: {
      name: 'Photo Team',
      avatar: null,
    },
    photographer: 'Various Photographers',
    image: 'https://placehold.co/800x500/1abc9c/ffffff?text=Photos',
    publishedAt: '2025-09-10',
    isFeatured: false,
  },
];

// Helper functions
export function getArticleBySlug(slug) {
  return mockArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categoryId) {
  return mockArticles.filter((article) => article.category === categoryId);
}

export function getFeaturedArticle() {
  return mockArticles.find((article) => article.isFeatured);
}

export function getRecentArticles(limit = 6) {
  return [...mockArticles]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

export function getCategoryById(categoryId) {
  return categories.find((cat) => cat.id === categoryId);
}

