# Component Documentation

This document provides detailed information about the components used in the TAKTZEIT website.

## Table of Contents

- [Layout Components](#layout-components)
- [Navigation Components](#navigation-components)
- [Section Components](#section-components)
- [UI Components](#ui-components)
- [Base Components](#base-components)
- [Portfolio Components](#portfolio-components)

## Layout Components

### AppLayout

**File:** `src/components/layout/AppLayout.vue`

**Description:** The main layout component that wraps the entire application. It includes the navbar, main content area, and fixed UI elements.

**Props:**
- None

**Slots:**
- `default`: The main content of the application

**Usage:**
```vue
<AppLayout>
  <router-view />
</AppLayout>
```

### PageLayout

**File:** `src/components/layout/PageLayout.vue`

**Description:** A layout component for individual pages. It includes a header with title and subtitle, and a content area.

**Props:**
- `title` (String): The page title
- `subtitle` (String): The page subtitle
- `pageType` (String): The type of page (e.g., 'legal', 'career')
- `showFooter` (Boolean): Whether to show the footer

**Slots:**
- `default`: The page content

**Usage:**
```vue
<PageLayout
  title="IMPRESSUM"
  subtitle="Rechtliche Informationen"
  pageType="legal"
  :showFooter="true"
>
  <div class="page-content">
    <!-- Page content here -->
  </div>
</PageLayout>
```

## Navigation Components

### NavBar

**File:** `src/components/navigation/NavBar.vue`

**Description:** The main navigation bar component. It includes the logo, navigation links, and mobile menu toggle.

**Props:**
- None

**Events:**
- `menu-toggle`: Emitted when the menu is toggled

**Usage:**
```vue
<NavBar @menu-toggle="handleMenuToggle" />
```

### SectionLinks

**File:** `src/components/navigation/SectionLinks.vue`

**Description:** A component for navigation links to different sections of the page.

**Props:**
- `sections` (Array): An array of section objects with id and label properties

**Usage:**
```vue
<SectionLinks :sections="[
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' }
]" />
```

## Section Components

### HeroSection

**File:** `src/components/sections/HeroSection.vue`

**Description:** The main hero section with a video background, title, and call-to-action buttons.

**Props:**
- None

**Usage:**
```vue
<HeroSection />
```

### JourneySection

**File:** `src/components/sections/JourneySection.vue`

**Description:** A section showcasing the sales activation journey with animated steps.

**Props:**
- None

**Usage:**
```vue
<JourneySection />
```

### ServicesSection

**File:** `src/components/sections/ServicesSection.vue`

**Description:** A section showcasing TAKTZEIT's services with icons and descriptions.

**Props:**
- None

**Usage:**
```vue
<ServicesSection />
```

### TeamSection

**File:** `src/components/sections/TeamSection.vue`

**Description:** A section showcasing TAKTZEIT's team members with photos and information.

**Props:**
- None

**Usage:**
```vue
<TeamSection />
```

### TestimonialsSection

**File:** `src/components/sections/TestimonialsSection.vue`

**Description:** A section showcasing client testimonials with a carousel.

**Props:**
- None

**Usage:**
```vue
<TestimonialsSection />
```

### HistorySection

**File:** `src/components/sections/HistorySection.vue`

**Description:** A section showcasing TAKTZEIT's history with a timeline.

**Props:**
- None

**Usage:**
```vue
<HistorySection />
```

### BrandSection

**File:** `src/components/sections/BrandSection.vue`

**Description:** A section showcasing TAKTZEIT's brand and design services.

**Props:**
- None

**Usage:**
```vue
<BrandSection />
```

### ContactSection

**File:** `src/components/sections/ContactSection.vue`

**Description:** A section with a contact form and company information.

**Props:**
- None

**Usage:**
```vue
<ContactSection />
```

### FooterSection

**File:** `src/components/sections/FooterSection.vue`

**Description:** The footer section with links, social media, and copyright information.

**Props:**
- None

**Usage:**
```vue
<FooterSection />
```

## UI Components

### ContactButton

**File:** `src/components/ui/ContactButton.vue`

**Description:** A fixed button for navigating to the contact section.

**Props:**
- None

**Usage:**
```vue
<ContactButton />
```

### CookieButton

**File:** `src/components/ui/CookieButton.vue`

**Description:** A button for opening the cookie manager.

**Props:**
- None

**Usage:**
```vue
<CookieButton />
```

### CookieBanner

**File:** `src/components/ui/CookieBanner.vue`

**Description:** A banner for cookie consent that appears at the bottom of the page.

**Props:**
- None

**Usage:**
```vue
<CookieBanner />
```

### CookieManager

**File:** `src/components/ui/CookieManager.vue`

**Description:** A modal for managing cookie settings.

**Props:**
- `show` (Boolean): Whether to show the cookie manager

**Events:**
- `close`: Emitted when the cookie manager is closed

**Usage:**
```vue
<CookieManager :show="showCookieManager" @close="showCookieManager = false" />
```

### FixedHistoryButton

**File:** `src/components/ui/FixedHistoryButton.vue`

**Description:** A fixed button for navigating to the history section.

**Props:**
- None

**Usage:**
```vue
<FixedHistoryButton />
```

### PageLoader

**File:** `src/components/ui/PageLoader.vue`

**Description:** A loading screen for page transitions.

**Props:**
- `showText` (Boolean): Whether to show loading text
- `text` (String): The loading text

**Methods:**
- `show()`: Show the loader
- `hide()`: Hide the loader

**Usage:**
```vue
<PageLoader ref="pageLoader" :showText="true" text="Loading..." />
```

### ScrollIndicator

**File:** `src/components/ui/ScrollIndicator.vue`

**Description:** An indicator for scrolling progress.

**Props:**
- `position` (String): The position of the indicator ('top', 'bottom')
- `height` (String): The height of the indicator
- `zIndex` (Number): The z-index of the indicator

**Usage:**
```vue
<ScrollIndicator position="top" height="4px" :zIndex="1000" />
```

### ScrollToTop

**File:** `src/components/ui/ScrollToTop.vue`

**Description:** A button for scrolling to the top of the page.

**Props:**
- None

**Usage:**
```vue
<ScrollToTop />
```

### SectionScrollIndicator

**File:** `src/components/ui/SectionScrollIndicator.vue`

**Description:** An indicator for scrolling to the next section.

**Props:**
- None

**Usage:**
```vue
<SectionScrollIndicator />
```

### VideoModal

**File:** `src/components/ui/VideoModal.vue`

**Description:** A modal for displaying videos.

**Props:**
- `show` (Boolean): Whether to show the modal
- `videoSrc` (String): The source URL of the video

**Events:**
- `close`: Emitted when the modal is closed

**Usage:**
```vue
<VideoModal :show="showVideoModal" videoSrc="/videos/intro.mp4" @close="showVideoModal = false" />
```

## Base Components

### BaseButton

**File:** `src/components/base/BaseButton.vue`

**Description:** A reusable button component with various styles.

**Props:**
- `variant` (String): The button variant ('primary', 'secondary', 'outline', 'text')
- `size` (String): The button size ('sm', 'md', 'lg')
- `disabled` (Boolean): Whether the button is disabled
- `loading` (Boolean): Whether the button is in a loading state
- `type` (String): The button type ('button', 'submit', 'reset')

**Events:**
- `click`: Emitted when the button is clicked

**Usage:**
```vue
<BaseButton variant="primary" size="md" @click="handleClick">
  Click Me
</BaseButton>
```

### BaseCard

**File:** `src/components/base/BaseCard.vue`

**Description:** A reusable card component.

**Props:**
- `title` (String): The card title
- `subtitle` (String): The card subtitle
- `image` (String): The URL of the card image
- `imageAlt` (String): The alt text for the card image
- `variant` (String): The card variant ('default', 'outlined', 'elevated')

**Slots:**
- `default`: The card content
- `header`: The card header
- `footer`: The card footer

**Usage:**
```vue
<BaseCard
  title="Card Title"
  subtitle="Card Subtitle"
  image="/images/card-image.jpg"
  imageAlt="Card Image"
  variant="elevated"
>
  <p>Card content goes here.</p>
  <template #footer>
    <BaseButton>Read More</BaseButton>
  </template>
</BaseCard>
```

### BaseInput

**File:** `src/components/base/BaseInput.vue`

**Description:** A reusable input component.

**Props:**
- `modelValue` (String): The input value (v-model)
- `label` (String): The input label
- `type` (String): The input type ('text', 'email', 'password', etc.)
- `placeholder` (String): The input placeholder
- `required` (Boolean): Whether the input is required
- `disabled` (Boolean): Whether the input is disabled
- `error` (String): The error message to display

**Events:**
- `update:modelValue`: Emitted when the input value changes

**Usage:**
```vue
<BaseInput
  v-model="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
  :error="errors.email"
/>
```

### SectionHeading

**File:** `src/components/base/SectionHeading.vue`

**Description:** A reusable component for section headings.

**Props:**
- `title` (String): The section title
- `subtitle` (String): The section subtitle
- `alignment` (String): The text alignment ('left', 'center', 'right')

**Usage:**
```vue
<SectionHeading
  title="Our Services"
  subtitle="What we offer"
  alignment="center"
/>
```

### HorizontalNavigation

**File:** `src/components/base/HorizontalNavigation.vue`

**Description:** A navigation component for horizontal scrolling.

**Props:**
- `items` (Array): An array of navigation items with id and label properties
- `activeItem` (String): The ID of the active item

**Events:**
- `navigate`: Emitted when an item is clicked, with the item ID as the payload

**Usage:**
```vue
<HorizontalNavigation
  :items="[
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' }
  ]"
  activeItem="item1"
  @navigate="handleNavigate"
/>
```

### VerticalNavigation

**File:** `src/components/base/VerticalNavigation.vue`

**Description:** A navigation component for vertical scrolling.

**Props:**
- `items` (Array): An array of navigation items with id and label properties
- `activeItem` (String): The ID of the active item

**Events:**
- `navigate`: Emitted when an item is clicked, with the item ID as the payload

**Usage:**
```vue
<VerticalNavigation
  :items="[
    { id: 'section1', label: 'Section 1' },
    { id: 'section2', label: 'Section 2' },
    { id: 'section3', label: 'Section 3' }
  ]"
  activeItem="section1"
  @navigate="handleNavigate"
/>
```

## Portfolio Components

### PortfolioSection

**File:** `src/components/portfolio/PortfolioSection.vue`

**Description:** A section showcasing portfolio items with a slider.

**Props:**
- None

**Usage:**
```vue
<PortfolioSection />
```

### PortfolioSlider

**File:** `src/components/portfolio/PortfolioSlider.vue`

**Description:** A slider component for portfolio items.

**Props:**
- `items` (Array): An array of portfolio items

**Usage:**
```vue
<PortfolioSlider :items="portfolioItems" />
```

### PortfolioGrid

**File:** `src/components/portfolio/PortfolioGrid.vue`

**Description:** A grid component for portfolio items with filtering.

**Props:**
- `items` (Array): An array of portfolio items
- `clients` (Array): An array of client objects for filtering
- `categories` (Array): An array of category objects for filtering

**Usage:**
```vue
<PortfolioGrid
  :items="portfolioItems"
  :clients="clients"
  :categories="categories"
/>
```

### PortfolioGridSection

**File:** `src/components/portfolio/PortfolioGridSection.vue`

**Description:** A section component that wraps the PortfolioGrid with a heading.

**Props:**
- None

**Usage:**
```vue
<PortfolioGridSection />
```

### PortfolioSectionFiltered

**File:** `src/components/portfolio/PortfolioSectionFiltered.vue`

**Description:** A portfolio section with built-in filtering.

**Props:**
- `filter` (String): The initial filter to apply

**Usage:**
```vue
<PortfolioSectionFiltered filter="web-design" />
```
