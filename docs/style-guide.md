# Style Guide

This document outlines the styling conventions and guidelines for the TAKTZEIT website.

## Table of Contents
- [CSS/SCSS Architecture](#cssscss-architecture)
- [Naming Conventions](#naming-conventions)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Breakpoints](#breakpoints)
- [Components](#components)
- [Accessibility](#accessibility)

## CSS/SCSS Architecture

The project uses a modular SCSS architecture with the following structure:

```
src/assets/scss/
├── _focus.scss           # Focus styles for accessibility
├── _fonts.scss           # Font definitions
├── _mixins.scss          # SCSS mixins
├── _reset.scss           # CSS reset
├── _typography.scss      # Typography styles
├── _utilities.scss       # Utility classes
├── _variables.scss       # SCSS variables
├── components/           # Component-specific styles
│   ├── _app-layout.scss
│   ├── _base-button.scss
│   ├── _base-input.scss
│   ├── _contact-button.scss
│   ├── _cookie-banner.scss
│   ├── _cookie-button.scss
│   ├── _footer-section.scss
│   ├── _hero-section.scss
│   ├── _history-section.scss
│   ├── _legal-pages.scss
│   ├── _navbar.scss
│   ├── _page-layout.scss
│   ├── _portfolio-section.scss
│   ├── _services-section.scss
│   ├── _team-section.scss
│   └── _testimonials-section.scss
└── main.scss             # Main SCSS file that imports all others
```

### Principles

1. **Modularity**: Each component has its own SCSS file
2. **Scoping**: Component styles are scoped to avoid conflicts
3. **Variables**: Use SCSS variables for consistent values
4. **Mixins**: Use mixins for reusable style patterns
5. **Nesting**: Limit nesting to 3 levels deep for readability

## Naming Conventions

The project uses BEM (Block, Element, Modifier) naming convention:

```scss
.block {
  // Block styles
  
  &__element {
    // Element styles
    
    &--modifier {
      // Modifier styles
    }
  }
}
```

Example:
```scss
.navbar {
  // Navbar styles
  
  &__logo {
    // Navbar logo styles
    
    &--large {
      // Large navbar logo styles
    }
  }
}
```

## Colors

The project uses a defined color palette stored in SCSS variables:

```scss
// Primary colors
$primary-color: #D8292F;
$secondary-color: #4D4D4D;
$text-color: #FFFFFF;
$background-color: #333333;

// Neutral colors
$gray-100: #F5F5F5;
$gray-200: #E5E5E5;
$gray-300: #D4D4D4;
$gray-400: #A3A3A3;
$gray-500: #737373;
$gray-600: #525252;
$gray-700: #404040;
$gray-800: #262626;
$gray-900: #171717;
```

## Typography

The project uses the following font families:

```scss
$font-primary: 'Greycliff CF', sans-serif;
$font-secondary: 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-headline: 'Greycliff CF', sans-serif;
```

Font sizes are defined using a modular scale:

```scss
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-md: 1.125rem;   // 18px
$font-size-lg: 1.25rem;    // 20px
$font-size-xl: 1.5rem;     // 24px
$font-size-2xl: 1.875rem;  // 30px
$font-size-3xl: 2.25rem;   // 36px
$font-size-4xl: 3rem;      // 48px
$font-size-5xl: 4rem;      // 64px
```

## Spacing

The project uses a consistent spacing scale:

```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
$spacing-2xl: 3rem;     // 48px
$spacing-3xl: 4rem;     // 64px
$spacing-4xl: 6rem;     // 96px
$spacing-5xl: 8rem;     // 128px
```

## Breakpoints

The project uses the following breakpoints for responsive design:

```scss
$breakpoint-xs: 480px;   // Extra small devices
$breakpoint-sm: 768px;   // Small devices
$breakpoint-md: 992px;   // Medium devices
$breakpoint-lg: 1200px;  // Large devices
$breakpoint-xl: 1440px;  // Extra large devices
$breakpoint-2xl: 1920px; // 2X large devices
```

Media query mixins:

```scss
@mixin media-xs {
  @media (max-width: $breakpoint-xs) {
    @content;
  }
}

@mixin media-sm {
  @media (max-width: $breakpoint-sm) {
    @content;
  }
}

@mixin media-md {
  @media (max-width: $breakpoint-md) {
    @content;
  }
}

@mixin media-lg {
  @media (max-width: $breakpoint-lg) {
    @content;
  }
}

@mixin media-xl {
  @media (max-width: $breakpoint-xl) {
    @content;
  }
}

@mixin media-2xl {
  @media (max-width: $breakpoint-2xl) {
    @content;
  }
}
```

## Components

Component styles follow these guidelines:

1. Use scoped styles to prevent leakage
2. Use BEM naming convention
3. Use SCSS variables for consistent values
4. Use mixins for reusable patterns
5. Keep styles modular and focused on a single component

Example component style:

```vue
<style lang="scss" scoped>
.component {
  padding: $spacing-md;
  background-color: $background-color;
  
  &__header {
    margin-bottom: $spacing-sm;
    font-size: $font-size-lg;
    color: $primary-color;
  }
  
  &__content {
    font-size: $font-size-base;
    color: $text-color;
    
    &--highlighted {
      background-color: rgba($primary-color, 0.1);
      padding: $spacing-sm;
    }
  }
  
  @include media-sm {
    padding: $spacing-sm;
    
    &__header {
      font-size: $font-size-md;
    }
  }
}
</style>
```

## Accessibility

The project follows these accessibility guidelines for styling:

1. Use sufficient color contrast (WCAG AA minimum)
2. Provide focus styles for interactive elements
3. Use relative units (rem, em) for font sizes
4. Ensure text is readable at different screen sizes
5. Support keyboard navigation
6. Use semantic HTML elements
7. Provide ARIA attributes where necessary

Focus styles are defined in `_focus.scss` and applied to all interactive elements.
