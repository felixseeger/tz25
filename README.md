# TAKTZEIT Vue 3 Project

A modern Vue 3 website for TAKTZEIT GmbH with responsive design, performance optimizations, and a component-based architecture.

## Features

- Vue 3 with Composition API
- Responsive design with desktop media queries
- Performance optimizations:
  - Image lazy loading
  - Font optimization with staged loading and subsets
  - Proper caching strategies
  - Service worker for offline support
- Component-based architecture
- SCSS for styling

## Project Structure

### Components

#### Base Components

- **HorizontalNavigation**: Navigation component for horizontal scrolling sections
- **VerticalNavigation**: Navigation component for vertical scrolling sections

#### UI Components

- **ContactButton**: Button for contacting TAKTZEIT
- **CookieBanner**: Banner for cookie consent
- **CookieButton**: Button for managing cookie settings
- **CookieManager**: Component for managing cookie settings
- **FixedHistoryButton**: Fixed button for navigating to the history section
- **LazyImage**: Component for lazy loading images
- **PageLoader**: Loading screen for page transitions
- **ScrollIndicator**: Indicator for scrolling to the next section
- **ScrollToTop**: Button for scrolling to the top of the page
- **VideoModal**: Modal for displaying videos

#### Section Components

- **HeroSection**: Main hero section with video background
- **ServicesSection**: Section showcasing TAKTZEIT's services
- **PortfolioSection**: Section showcasing TAKTZEIT's portfolio
- **TeamSection**: Section showcasing TAKTZEIT's team
- **TestimonialsSection**: Section showcasing client testimonials
- **HistorySection**: Section showcasing TAKTZEIT's history
- **ContactSection**: Section for contacting TAKTZEIT
- **FooterSection**: Footer section with links and information

### Services

- **cacheService**: Service for caching data
- **cookieService**: Service for managing cookies
- **httpService**: Service for making HTTP requests
- **imageService**: Service for optimizing images

### Utilities

- **fontLoader**: Utility for optimizing font loading
- **fontSubsetter**: Utility for creating font subsets

## Performance Optimizations

### Image Optimization

- Lazy loading of images using Intersection Observer API
- Image compression during build process
- Responsive images with appropriate sizes

### Font Optimization

- Staged font loading (critical, important, complete)
- Font subsetting for critical text
- Font preloading for critical fonts
- Font-display: swap for better perceived performance

### Caching Strategies

- Service worker for caching static assets
- Cache-first strategy for images
- Network-first strategy for HTML
- Stale-while-revalidate strategy for CSS and JS
- Local storage caching for API responses

## Getting Started

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

## Testing

```bash
# Run Playwright tests
npm run test
```
