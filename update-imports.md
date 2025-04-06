# Updating Component Imports

After running the `refactor_components.sh` script, you'll need to update imports in your files to use the new component structure. Here are examples of how to update imports for different component types:

## Section Components

```javascript
// Before
import HeroSection from '../components/HeroSection.vue';
import ContactSection from '../components/ContactSection.vue';
import FooterSection from '../components/FooterSection.vue';

// After
import { HeroSection, ContactSection, FooterSection } from '../components/sections';
```

## UI Components

```javascript
// Before
import ContactButton from '../components/ContactButton.vue';
import CookieButton from '../components/CookieButton.vue';
import ScrollToTop from '../components/ScrollToTop.vue';

// After
import { ContactButton, CookieButton, ScrollToTop } from '../components/ui';
```

## Portfolio Components

```javascript
// Before
import PortfolioSlider from '../components/PortfolioSlider.vue';
import ClientLogoFilters from '../components/ClientLogoFilters.vue';

// After
import { PortfolioSlider, ClientLogoFilters } from '../components/portfolio';
```

## Navigation Components

```javascript
// Before
import NavBar from '../components/NavBar.vue';
import SectionLinks from '../components/SectionLinks.vue';

// After
import { NavBar, SectionLinks } from '../components/navigation';
```

## Animation Components

```javascript
// Before
import PageTransitionAnimation from '../components/PageTransitionAnimation.vue';
import StaggeredAnimation from '../components/StaggeredAnimation.vue';

// After
import { PageTransitionAnimation, StaggeredAnimation } from '../components/animations';
```

## Base Components

```javascript
// Before
import BaseButton from '../components/base/BaseButton.vue';
import BaseInput from '../components/base/BaseInput.vue';

// After
import { BaseButton, BaseInput } from '../components/base';
```

## Layout Components

```javascript
// Before
import AppLayout from '../components/layout/AppLayout.vue';
import PageLayout from '../components/layout/PageLayout.vue';

// After
import { AppLayout, PageLayout } from '../components/layout';
```

## Using the Main Index File

You can also import components directly from the main components index file:

```javascript
// Import from the main index file
import { 
  HeroSection, 
  ContactButton, 
  PortfolioSlider, 
  NavBar, 
  PageTransitionAnimation 
} from '../components';
```

This approach is convenient when importing components from different categories.
