# API Documentation

This document outlines the API endpoints and data structures used in the TAKTZEIT website.

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Overview

The TAKTZEIT website uses a combination of static data and API endpoints for dynamic content. The primary API is a RESTful JSON API that provides data for portfolio items, team members, testimonials, and form submissions.

## Authentication

Most API endpoints are public and do not require authentication. Form submission endpoints may use a simple API key for spam protection.

### API Key Authentication

For endpoints that require an API key:

```
POST /api/contact
X-API-Key: your-api-key
```

## Endpoints

### Contact Form

**Endpoint:** `POST /api/contact`

**Description:** Submit a contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "firma": "Example Corp",
  "betreff": "Project Inquiry",
  "anmerkungen": "I would like to discuss a potential project."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

### Portfolio Items

**Endpoint:** `GET /api/portfolio`

**Description:** Get all portfolio items

**Query Parameters:**
- `client_id` (optional): Filter by client ID
- `category_id` (optional): Filter by category ID
- `limit` (optional): Limit the number of results
- `offset` (optional): Offset for pagination

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "title": "Project Title",
      "description": "Project description",
      "image": "/images/portfolio/project1.jpg",
      "clientId": 2,
      "categoryId": 3,
      "date": "2023-01-15"
    },
    // More items...
  ],
  "total": 24,
  "limit": 10,
  "offset": 0
}
```

### Clients

**Endpoint:** `GET /api/clients`

**Description:** Get all clients

**Response:**
```json
{
  "clients": [
    {
      "id": 1,
      "name": "Client Name",
      "logo": "/images/clients/client1.svg",
      "website": "https://example.com"
    },
    // More clients...
  ]
}
```

### Categories

**Endpoint:** `GET /api/categories`

**Description:** Get all portfolio categories

**Response:**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Web Design",
      "slug": "web-design"
    },
    // More categories...
  ]
}
```

### Team Members

**Endpoint:** `GET /api/team`

**Description:** Get all team members

**Response:**
```json
{
  "members": [
    {
      "id": 1,
      "name": "John Doe",
      "position": "CEO",
      "image": "/images/team/john-doe.jpg",
      "bio": "Short biography",
      "social": {
        "linkedin": "https://linkedin.com/in/johndoe",
        "twitter": "https://twitter.com/johndoe"
      }
    },
    // More members...
  ]
}
```

### Testimonials

**Endpoint:** `GET /api/testimonials`

**Description:** Get all testimonials

**Response:**
```json
{
  "testimonials": [
    {
      "id": 1,
      "author": "Jane Smith",
      "company": "Example Corp",
      "position": "Marketing Director",
      "content": "Working with TAKTZEIT was a great experience...",
      "image": "/images/testimonials/jane-smith.jpg"
    },
    // More testimonials...
  ]
}
```

## Data Models

### Portfolio Item

```typescript
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  clientId: number;
  categoryId: number;
  date: string; // ISO date format
  featured?: boolean;
  link?: string;
  gallery?: string[]; // Array of image URLs
}
```

### Client

```typescript
interface Client {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description?: string;
}
```

### Category

```typescript
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}
```

### Team Member

```typescript
interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    xing?: string;
    email?: string;
  };
}
```

### Testimonial

```typescript
interface Testimonial {
  id: number;
  author: string;
  company: string;
  position?: string;
  content: string;
  image?: string;
  rating?: number; // 1-5
}
```

### Contact Form

```typescript
interface ContactForm {
  name: string;
  email: string;
  firma?: string;
  betreff: string;
  anmerkungen?: string;
}
```

## Error Handling

API errors are returned with appropriate HTTP status codes and a JSON response body:

```json
{
  "error": true,
  "code": "VALIDATION_ERROR",
  "message": "Invalid email address",
  "details": {
    "field": "email",
    "value": "invalid-email"
  }
}
```

Common error codes:
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Requested resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Permission denied
- `INTERNAL_ERROR`: Server error

## Examples

### Fetching Portfolio Items with Filters

**Request:**
```javascript
fetch('/api/portfolio?client_id=3&category_id=2')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Submitting a Contact Form

**Request:**
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com',
    firma: 'Example Corp',
    betreff: 'Project Inquiry',
    anmerkungen: 'I would like to discuss a potential project.'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
