import { gql } from './api';

/**
 * GraphQL mutations for authentication
 */

// Login mutation
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      tokenType
      expiresIn
      user {
        id
        email
        firstName
        lastName
        fullName
        avatarUrl
        role {
          id
          name
          permissions
        }
      }
    }
  }
`;

// Register mutation
export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $roleId: Int
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      roleId: $roleId
    ) {
      token
      tokenType
      expiresIn
      user {
        id
        email
        firstName
        lastName
        fullName
        role {
          id
          name
        }
      }
    }
  }
`;

// Refresh token mutation
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      tokenType
      expiresIn
      user {
        id
        email
        fullName
      }
    }
  }
`;

/**
 * GraphQL mutations for articles
 */

// Create article mutation
export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
      title
      slug
      status
      excerpt
      createdAt
    }
  }
`;

// Update article mutation
export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
      title
      slug
      status
      excerpt
      updatedAt
    }
  }
`;

// Delete article mutation (soft delete)
export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

// Publish article mutation
export const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(id: $id) {
      id
      status
      publishedAt
    }
  }
`;

// Archive article mutation
export const ARCHIVE_ARTICLE = gql`
  mutation ArchiveArticle($id: ID!) {
    archiveArticle(id: $id) {
      id
      status
    }
  }
`;

// Reject article mutation
export const REJECT_ARTICLE = gql`
  mutation RejectArticle($id: ID!, $reason: String!) {
    rejectArticle(id: $id, reason: $reason) {
      id
      status
    }
  }
`;

// Restore article mutation
export const RESTORE_ARTICLE = gql`
  mutation RestoreArticle($id: ID!) {
    restoreArticle(id: $id) {
      id
      status
    }
  }
`;

// Increment article views mutation
export const INCREMENT_ARTICLE_VIEWS = gql`
  mutation IncrementArticleViews($id: ID!) {
    incrementArticleViews(id: $id) {
      id
      viewCount
    }
  }
`;

// Toggle featured status mutation
export const TOGGLE_FEATURED = gql`
  mutation ToggleFeatured($id: ID!) {
    toggleFeatured(id: $id) {
      id
      featured
    }
  }
`;

// Add tag to article mutation
export const ADD_ARTICLE_TAG = gql`
  mutation AddArticleTag($articleId: ID!, $tagId: ID!) {
    addArticleTag(articleId: $articleId, tagId: $tagId) {
      id
      tags {
        id
        name
        slug
      }
    }
  }
`;

// Remove tag from article mutation
export const REMOVE_ARTICLE_TAG = gql`
  mutation RemoveArticleTag($articleId: ID!, $tagId: ID!) {
    removeArticleTag(articleId: $articleId, tagId: $tagId) {
      id
      tags {
        id
        name
        slug
      }
    }
  }
`;

/**
 * GraphQL mutations for categories
 */

// Create category mutation
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      slug
      description
      color
    }
  }
`;

// Update category mutation
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
      slug
      description
      color
    }
  }
`;

// Delete category mutation
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

/**
 * GraphQL mutations for tags
 */

// Create tag mutation
export const CREATE_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
      slug
    }
  }
`;

// Update tag mutation
export const UPDATE_TAG = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      id
      name
      slug
    }
  }
`;

// Delete tag mutation
export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`;

/**
 * GraphQL mutations for media
 */

// Upload media mutation
export const UPLOAD_MEDIA = gql`
  mutation UploadMedia($input: CreateMediaInput!) {
    uploadMedia(input: $input) {
      id
      url
      altText
      type
      sizeBytes
      width
      height
      createdAt
    }
  }
`;

// Delete media mutation
export const DELETE_MEDIA = gql`
  mutation DeleteMedia($id: ID!) {
    deleteMedia(id: $id)
  }
`;

