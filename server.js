/**
 * Production server for TAKTZEIT Vue 3 Application
 * 
 * This server serves the built application with appropriate security headers.
 */

const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cspMiddleware = require('./src/server/middleware/cspMiddleware');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Use Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: false // We'll use our custom CSP middleware
}));

// Use custom CSP middleware
app.use(cspMiddleware);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  // Set cache control headers
  setHeaders: (res, path) => {
    // Set long cache for assets with hash in filename
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    } else {
      // Set shorter cache for HTML and other files
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    }
  }
}));

// For all other routes, serve index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
