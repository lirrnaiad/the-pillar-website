import { gql } from './api';

/**
 * GraphQL queries for articles
 */

// Get articles with pagination and filtering
export const GET_ARTICLES = gql`
  query GetArticles(
    $first: Int
    $after: String
    $filter: ArticleFilter
    $sort: ArticleSort
  ) {
    articles(first: $first, after: $after, filter: $filter, sort: $sort) {
      edges {
        node {
          id
          title
          slug
          excerpt
          status
          featured
          viewCount
          author {
            id
            fullName
            avatarUrl
          }
          category {
            id
            name
            slug
            color
          }
          cover {
            id
            url
            altText
          }
          tags {
            id
            name
            slug
          }
          publishedAt
          createdAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

// Get article by ID
export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      slug
      content
      excerpt
      status
      featured
      viewCount
      author {
        id
        fullName
        avatarUrl
        bio
      }
      category {
        id
        name
        slug
        color
      }
      cover {
        id
        url
        altText
      }
      tags {
        id
        name
        slug
      }
      metaTitle
      metaDescription
      ogImage
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

// Get article by slug (for public article pages)
export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      title
      slug
      content
      excerpt
      status
      featured
      viewCount
      author {
        id
        fullName
        avatarUrl
        bio
      }
      category {
        id
        name
        slug
        color
      }
      cover {
        id
        url
        altText
      }
      tags {
        id
        name
        slug
      }
      metaTitle
      metaDescription
      ogImage
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

// Search articles
export const SEARCH_ARTICLES = gql`
  query SearchArticles($query: String!, $first: Int, $after: String) {
    searchArticles(query: $query, first: $first, after: $after) {
      edges {
        node {
          id
          title
          slug
          excerpt
          author {
            fullName
          }
          category {
            name
            slug
          }
          publishedAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

// Get featured articles
export const GET_FEATURED_ARTICLES = gql`
  query GetFeaturedArticles($first: Int) {
    featuredArticles(first: $first) {
      id
      title
      slug
      excerpt
      author {
        fullName
        avatarUrl
      }
      category {
        name
        slug
        color
      }
      cover {
        url
        altText
      }
      publishedAt
    }
  }
`;

// Get articles by category
export const GET_ARTICLES_BY_CATEGORY = gql`
  query GetArticlesByCategory(
    $categorySlug: String!
    $first: Int
    $after: String
    $sort: ArticleSort
  ) {
    articlesByCategory(
      categorySlug: $categorySlug
      first: $first
      after: $after
      sort: $sort
    ) {
      edges {
        node {
          id
          title
          slug
          excerpt
          author {
            fullName
            avatarUrl
          }
          category {
            name
            slug
            color
          }
          cover {
            url
            altText
          }
          publishedAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

// Get recent articles
export const GET_RECENT_ARTICLES = gql`
  query GetRecentArticles($first: Int) {
    recentArticles(first: $first) {
      id
      title
      slug
      excerpt
      author {
        fullName
        avatarUrl
      }
      category {
        name
        slug
        color
      }
      cover {
        url
        altText
      }
      publishedAt
    }
  }
`;

/**
 * GraphQL queries for categories
 */

// Get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
      description
      color
    }
  }
`;

// Get category by slug
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categoryBySlug(slug: $slug) {
      id
      name
      slug
      description
      color
    }
  }
`;

/**
 * GraphQL queries for users
 */

// Get current authenticated user
export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      firstName
      lastName
      fullName
      avatarUrl
      bio
      role {
        id
        name
        permissions
      }
      createdAt
    }
  }
`;

/**
 * GraphQL queries for publication issues
 */

// Get all publication issues
export const GET_PUBLICATION_ISSUES = gql`
  query GetPublicationIssues {
    publicationIssues {
      id
      title
      slug
      coverUrl
      description
      publishedAt
      createdAt
    }
  }
`;

