# Build and Deployment Guide

This document outlines the process for building and deploying the TAKTZEIT website.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Deployment Options](#deployment-options)
- [Continuous Integration](#continuous-integration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before building and deploying the application, ensure you have the following:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Access to the deployment environment
- Required environment variables (if any)

## Build Process

### Development Build

For development purposes, you can use the following command:

```bash
npm run dev
```

This will start a development server with hot module replacement (HMR) enabled.

### Production Build

To create a production build, use the following command:

```bash
npm run build
```

This will:
1. Compile all Vue components
2. Process and optimize all assets
3. Generate a production-ready build in the `dist` directory

### Preview Production Build

To preview the production build locally, use:

```bash
npm run preview
```

This will serve the production build from the `dist` directory.

## Deployment Options

### Static Hosting (Recommended)

The TAKTZEIT website is a static single-page application (SPA) and can be deployed to any static hosting service.

#### Option 1: Netlify

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy the site

#### Option 2: Vercel

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Framework preset: Vue.js
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy the site

#### Option 3: GitHub Pages

1. Build the project: `npm run build`
2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
   (This requires the `gh-pages` package to be installed and configured)

### Traditional Web Hosting

If using traditional web hosting:

1. Build the project: `npm run build`
2. Upload the contents of the `dist` directory to your web server
3. Configure the server to handle SPA routing (see below)

#### Apache Configuration

Create a `.htaccess` file in the root directory with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx Configuration

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Continuous Integration

The project can be set up with continuous integration to automate the build and deployment process.

### GitHub Actions

Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Performance Optimization

The build process includes several performance optimizations:

1. **Code Splitting**: The build process automatically splits code into chunks to improve load time
2. **Tree Shaking**: Unused code is removed from the final bundle
3. **Asset Optimization**: Images and other assets are optimized during the build
4. **Minification**: All JavaScript and CSS files are minified
5. **Compression**: Assets can be compressed using Gzip or Brotli

### Additional Optimizations

For further optimization, consider:

1. **Preloading Critical Assets**:
   ```html
   <link rel="preload" href="/fonts/greycliff-cf-bold.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **Lazy Loading Components**:
   ```javascript
   const LazyComponent = () => import('./LazyComponent.vue')
   ```

3. **Service Worker for Caching**:
   Configure a service worker to cache assets and API responses.

## Troubleshooting

### Common Issues

#### 1. Routing Issues in Production

If you encounter routing issues in production (404 errors when refreshing pages), ensure your server is configured to handle SPA routing as described in the [Deployment Options](#deployment-options) section.

#### 2. Missing Assets

If assets are missing in the production build:
- Check that all asset paths are relative
- Ensure assets are in the correct directories
- Verify that the `public` directory contains all static assets

#### 3. Build Failures

If the build process fails:
- Check for syntax errors in your code
- Verify that all dependencies are installed
- Check for compatibility issues between dependencies

### Getting Help

If you encounter issues not covered in this guide:
1. Check the Vue.js and Vite documentation
2. Search for similar issues on GitHub
3. Reach out to the development team
