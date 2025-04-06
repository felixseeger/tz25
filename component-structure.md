# Component Structure Refactoring

This document outlines the new component structure for better maintainability.

## Directory Structure

```
src/
├── components/
│   ├── animations/        # Animation-related components
│   │   ├── PageTransitionAnimation.vue
│   │   ├── StaggeredAnimation.vue
│   │   └── index.js
│   ├── base/              # Base/core UI components
│   │   ├── BaseButton.vue
│   │   ├── BaseCard.vue
│   │   ├── BaseInput.vue
│   │   ├── HorizontalNavigation.vue
│   │   ├── SectionHeading.vue
│   │   ├── VerticalNavigation.vue
│   │   └── index.js
│   ├── forms/             # Form-related components
│   │   └── index.js
│   ├── layout/            # Layout components
│   │   ├── AppLayout.vue
│   │   ├── PageLayout.vue
│   │   └── index.js
│   ├── navigation/        # Navigation components
│   │   ├── NavBar.vue
│   │   ├── SectionLinks.vue
│   │   └── index.js
│   ├── portfolio/         # Portfolio-related components
│   │   ├── ClientLogoFilters.vue
│   │   ├── PortfolioSection.vue
│   │   ├── PortfolioSectionFiltered.vue
│   │   ├── PortfolioSlider.vue
│   │   └── index.js
│   ├── sections/          # Page section components
│   │   ├── BrandSection.vue
│   │   ├── ContactSection.vue
│   │   ├── FooterSection.vue
│   │   ├── HeroSection.vue
│   │   ├── HistorySection.vue
│   │   ├── JourneySection.vue
│   │   ├── ServicesSection.vue
│   │   ├── TeamSection.vue
│   │   ├── TestimonialsSection.vue
│   │   └── index.js
│   ├── ui/                # UI components
│   │   ├── ContactButton.vue
│   │   ├── CookieBanner.vue
│   │   ├── CookieButton.vue
│   │   ├── CookieManager.vue
│   │   ├── FixedHistoryButton.vue
│   │   ├── PageLoader.vue
│   │   ├── ScrollIndicator.vue
│   │   ├── ScrollToTop.vue
│   │   ├── VideoModal.vue
│   │   └── index.js
│   └── index.js           # Main components index file
```

## Import Strategy

Instead of importing components directly, use the index.js files to import components:

```javascript
// Before
import HeroSection from '../components/HeroSection.vue';
import ContactButton from '../components/ContactButton.vue';

// After
import { HeroSection } from '../components/sections';
import { ContactButton } from '../components/ui';
```

## Benefits

1. **Better Organization**: Components are grouped by functionality and purpose
2. **Easier Imports**: Using index.js files makes imports cleaner and more maintainable
3. **Improved Discoverability**: New developers can quickly understand the component structure
4. **Scalability**: Easy to add new components to the appropriate category
5. **Consistency**: Enforces a consistent structure for the entire application

## Implementation Steps

1. Create the directory structure
2. Create index.js files for each directory
3. Move components to their appropriate directories
4. Update imports in existing files
5. Test the application to ensure everything works correctly
