#!/bin/bash

# This script implements the component structure refactoring as outlined in component-structure.md

# Create the directory structure
mkdir -p src/components/animations
mkdir -p src/components/base
mkdir -p src/components/forms
mkdir -p src/components/layout
mkdir -p src/components/navigation
mkdir -p src/components/portfolio
mkdir -p src/components/sections
mkdir -p src/components/ui

# Create index.js files for each directory
cat > src/components/animations/index.js << 'EOF'
// Animation components
import PageTransitionAnimation from './PageTransitionAnimation.vue';
import StaggeredAnimation from './StaggeredAnimation.vue';

export {
  PageTransitionAnimation,
  StaggeredAnimation
};
EOF

cat > src/components/base/index.js << 'EOF'
// Base components
import BaseButton from './BaseButton.vue';
import BaseCard from './BaseCard.vue';
import BaseInput from './BaseInput.vue';
import HorizontalNavigation from './HorizontalNavigation.vue';
import SectionHeading from './SectionHeading.vue';
import VerticalNavigation from './VerticalNavigation.vue';

export {
  BaseButton,
  BaseCard,
  BaseInput,
  HorizontalNavigation,
  SectionHeading,
  VerticalNavigation
};
EOF

cat > src/components/forms/index.js << 'EOF'
// Form components
// This directory is prepared for future form components
// Currently, form elements are part of other components

export {
  // Export form components here when added
};
EOF

cat > src/components/layout/index.js << 'EOF'
// Layout components
import AppLayout from './AppLayout.vue';
import PageLayout from './PageLayout.vue';

export {
  AppLayout,
  PageLayout
};
EOF

cat > src/components/navigation/index.js << 'EOF'
// Navigation components
import NavBar from './NavBar.vue';
import SectionLinks from './SectionLinks.vue';

export {
  NavBar,
  SectionLinks
};
EOF

cat > src/components/portfolio/index.js << 'EOF'
// Portfolio components
import ClientLogoFilters from './ClientLogoFilters.vue';
import PortfolioSection from './PortfolioSection.vue';
import PortfolioSectionFiltered from './PortfolioSectionFiltered.vue';
import PortfolioSlider from './PortfolioSlider.vue';

export {
  ClientLogoFilters,
  PortfolioSection,
  PortfolioSectionFiltered,
  PortfolioSlider
};
EOF

cat > src/components/sections/index.js << 'EOF'
// Section components
import BrandSection from './BrandSection.vue';
import ContactSection from './ContactSection.vue';
import FooterSection from './FooterSection.vue';
import HeroSection from './HeroSection.vue';
import HistorySection from './HistorySection.vue';
import JourneySection from './JourneySection.vue';
import ServicesSection from './ServicesSection.vue';
import TeamSection from './TeamSection.vue';
import TestimonialsSection from './TestimonialsSection.vue';

export {
  BrandSection,
  ContactSection,
  FooterSection,
  HeroSection,
  HistorySection,
  JourneySection,
  ServicesSection,
  TeamSection,
  TestimonialsSection
};
EOF

cat > src/components/ui/index.js << 'EOF'
// UI components
import ContactButton from './ContactButton.vue';
import CookieBanner from './CookieBanner.vue';
import CookieButton from './CookieButton.vue';
import CookieManager from './CookieManager.vue';
import FixedHistoryButton from './FixedHistoryButton.vue';
import PageLoader from './PageLoader.vue';
import ScrollIndicator from './ScrollIndicator.vue';
import ScrollToTop from './ScrollToTop.vue';
import VideoModal from './VideoModal.vue';

export {
  ContactButton,
  CookieBanner,
  CookieButton,
  CookieManager,
  FixedHistoryButton,
  PageLoader,
  ScrollIndicator,
  ScrollToTop,
  VideoModal
};
EOF

cat > src/components/index.js << 'EOF'
// Main components index file
// Re-export all component groups

export * from './base';
export * from './layout';
export * from './sections';
export * from './ui';
export * from './navigation';
export * from './portfolio';
export * from './animations';
export * from './forms';
EOF

# Move components to their appropriate directories
# Section components
mv src/components/BrandSection.vue src/components/sections/
mv src/components/ContactSection.vue src/components/sections/
mv src/components/FooterSection.vue src/components/sections/
mv src/components/HeroSection.vue src/components/sections/
mv src/components/HistorySection.vue src/components/sections/
mv src/components/JourneySection.vue src/components/sections/
mv src/components/ServicesSection.vue src/components/sections/
mv src/components/TeamSection.vue src/components/sections/
mv src/components/TestimonialsSection.vue src/components/sections/

# UI components
mv src/components/ContactButton.vue src/components/ui/
mv src/components/CookieBanner.vue src/components/ui/
mv src/components/CookieButton.vue src/components/ui/
mv src/components/CookieManager.vue src/components/ui/
mv src/components/FixedHistoryButton.vue src/components/ui/
mv src/components/PageLoader.vue src/components/ui/
mv src/components/ScrollIndicator.vue src/components/ui/
mv src/components/ScrollToTop.vue src/components/ui/
mv src/components/VideoModal.vue src/components/ui/

# Navigation components
mv src/components/NavBar.vue src/components/navigation/
mv src/components/SectionLinks.vue src/components/navigation/

# Portfolio components
mv src/components/ClientLogoFilters.vue src/components/portfolio/
mv src/components/PortfolioSection.vue src/components/portfolio/
mv src/components/PortfolioSectionFiltered.vue src/components/portfolio/
mv src/components/PortfolioSlider.vue src/components/portfolio/

# Animation components
mv src/components/PageTransitionAnimation.vue src/components/animations/
mv src/components/StaggeredAnimation.vue src/components/animations/

# Remove test components
rm -f src/components/BurgerTest.vue
rm -f src/components/HelloWorld.vue

echo "Component structure refactoring completed successfully!"
echo "Please update imports in your files to use the new structure."
