#!/bin/bash

# This script moves all components to their appropriate folders according to the component structure

echo "Starting component migration..."

# Create directories if they don't exist
mkdir -p src/components/animations
mkdir -p src/components/portfolio
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/components/navigation

# Move section components
echo "Moving section components..."
mv -f src/components/BrandSection.vue src/components/sections/ 2>/dev/null || echo "BrandSection.vue already moved"
mv -f src/components/ContactSection.vue src/components/sections/ 2>/dev/null || echo "ContactSection.vue already moved"
mv -f src/components/FooterSection.vue src/components/sections/ 2>/dev/null || echo "FooterSection.vue already moved"
mv -f src/components/HeroSection.vue src/components/sections/ 2>/dev/null || echo "HeroSection.vue already moved"
mv -f src/components/HistorySection.vue src/components/sections/ 2>/dev/null || echo "HistorySection.vue already moved"
mv -f src/components/JourneySection.vue src/components/sections/ 2>/dev/null || echo "JourneySection.vue already moved"
mv -f src/components/ServicesSection.vue src/components/sections/ 2>/dev/null || echo "ServicesSection.vue already moved"
mv -f src/components/TeamSection.vue src/components/sections/ 2>/dev/null || echo "TeamSection.vue already moved"
mv -f src/components/TestimonialsSection.vue src/components/sections/ 2>/dev/null || echo "TestimonialsSection.vue already moved"

# Move UI components
echo "Moving UI components..."
mv -f src/components/ContactButton.vue src/components/ui/ 2>/dev/null || echo "ContactButton.vue already moved"
mv -f src/components/CookieBanner.vue src/components/ui/ 2>/dev/null || echo "CookieBanner.vue already moved"
mv -f src/components/CookieButton.vue src/components/ui/ 2>/dev/null || echo "CookieButton.vue already moved"
mv -f src/components/CookieManager.vue src/components/ui/ 2>/dev/null || echo "CookieManager.vue already moved"
mv -f src/components/FixedHistoryButton.vue src/components/ui/ 2>/dev/null || echo "FixedHistoryButton.vue already moved"
mv -f src/components/PageLoader.vue src/components/ui/ 2>/dev/null || echo "PageLoader.vue already moved"
mv -f src/components/ScrollIndicator.vue src/components/ui/ 2>/dev/null || echo "ScrollIndicator.vue already moved"
mv -f src/components/ScrollToTop.vue src/components/ui/ 2>/dev/null || echo "ScrollToTop.vue already moved"
mv -f src/components/VideoModal.vue src/components/ui/ 2>/dev/null || echo "VideoModal.vue already moved"

# Move navigation components
echo "Moving navigation components..."
mv -f src/components/NavBar.vue src/components/navigation/ 2>/dev/null || echo "NavBar.vue already moved"
mv -f src/components/SectionLinks.vue src/components/navigation/ 2>/dev/null || echo "SectionLinks.vue already moved"

# Move portfolio components
echo "Moving portfolio components..."
mv -f src/components/ClientLogoFilters.vue src/components/portfolio/ 2>/dev/null || echo "ClientLogoFilters.vue already moved"
mv -f src/components/PortfolioSection.vue src/components/portfolio/ 2>/dev/null || echo "PortfolioSection.vue already moved"
mv -f src/components/PortfolioSectionFiltered.vue src/components/portfolio/ 2>/dev/null || echo "PortfolioSectionFiltered.vue already moved"
mv -f src/components/PortfolioSlider.vue src/components/portfolio/ 2>/dev/null || echo "PortfolioSlider.vue already moved"

# Move animation components
echo "Moving animation components..."
mv -f src/components/PageTransitionAnimation.vue src/components/animations/ 2>/dev/null || echo "PageTransitionAnimation.vue already moved"
mv -f src/components/StaggeredAnimation.vue src/components/animations/ 2>/dev/null || echo "StaggeredAnimation.vue already moved"

# Remove test components
echo "Removing test components..."
rm -f src/components/BurgerTest.vue 2>/dev/null || echo "BurgerTest.vue not found"
rm -f src/components/HelloWorld.vue 2>/dev/null || echo "HelloWorld.vue not found"

echo "Component migration completed!"
echo "Now updating import paths..."

# Update import paths in section components
echo "Updating import paths in section components..."
find src/components/sections -name "*.vue" -type f -exec sed -i '' 's/from "\.\.\//from "\.\.\/.\.\/components\//g' {} \;
find src/components/sections -name "*.vue" -type f -exec sed -i '' "s/from '\.\.\/'/from '\.\.\/.\.\/components\//g" {} \;
find src/components/sections -name "*.vue" -type f -exec sed -i '' 's/from "\.\.\//from "\.\.\/.\.\/composables\//g' {} \;
find src/components/sections -name "*.vue" -type f -exec sed -i '' "s/from '\.\.\/'/from '\.\.\/.\.\/composables\//g" {} \;

# Update import paths in portfolio components
echo "Updating import paths in portfolio components..."
find src/components/portfolio -name "*.vue" -type f -exec sed -i '' 's/from "\.\.\//from "\.\.\/.\.\/composables\//g' {} \;
find src/components/portfolio -name "*.vue" -type f -exec sed -i '' "s/from '\.\.\/'/from '\.\.\/.\.\/composables\//g" {} \;

# Update import paths in ui components
echo "Updating import paths in ui components..."
find src/components/ui -name "*.vue" -type f -exec sed -i '' 's/from "\.\.\//from "\.\.\/.\.\/composables\//g' {} \;
find src/components/ui -name "*.vue" -type f -exec sed -i '' "s/from '\.\.\/'/from '\.\.\/.\.\/composables\//g" {} \;

# Update import paths in navigation components
echo "Updating import paths in navigation components..."
find src/components/navigation -name "*.vue" -type f -exec sed -i '' 's/from "\.\.\//from "\.\.\/.\.\/composables\//g' {} \;
find src/components/navigation -name "*.vue" -type f -exec sed -i '' "s/from '\.\.\/'/from '\.\.\/.\.\/composables\//g" {} \;

# Update import paths in animation components
echo "Updating import paths in animation components..."
find src/components/animations -name "*.vue" -type f -exec sed -i '' 's/from "\.\.\//from "\.\.\/.\.\/composables\//g' {} \;
find src/components/animations -name "*.vue" -type f -exec sed -i '' "s/from '\.\.\/'/from '\.\.\/.\.\/composables\//g" {} \;

echo "Import paths updated!"
echo "Component structure refactoring completed successfully!"
