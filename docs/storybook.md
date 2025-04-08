# Storybook Documentation

This document provides information about using Storybook for component development and documentation.

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Writing Stories](#writing-stories)
- [Component Documentation](#component-documentation)
- [Addons](#addons)
- [Best Practices](#best-practices)

## Overview

Storybook is a tool for developing UI components in isolation. It makes building stunning UIs organized and efficient. The TAKTZEIT website uses Storybook for:

1. Component development in isolation
2. Visual documentation of components
3. Testing component variations
4. Accessibility testing
5. Interactive component exploration

## Getting Started

### Installation

The Storybook configuration is already set up in the project. To install the required dependencies, run:

```bash
npm install --save-dev @storybook/vue3 @storybook/addon-links @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/builder-vite
```

### Running Storybook

To start Storybook locally:

```bash
npm run storybook
```

This will start Storybook on port 6006. Open your browser and navigate to http://localhost:6006 to view the component library.

### Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

This will create a `storybook-static` directory with the built Storybook that can be deployed to any static hosting service.

## Writing Stories

Stories are written in JavaScript files with a `.stories.js` extension. They are located in the `stories` directory, organized by component type.

### Basic Story Structure

```javascript
import MyComponent from '../src/components/MyComponent.vue';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    // Control the props of your component
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'The component variant',
    },
    // ... other props
  },
};

// Template for all stories
const Template = (args) => ({
  components: { MyComponent },
  setup() {
    return { args };
  },
  template: '<MyComponent v-bind="args" />',
});

// Create stories with different props
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  // ... other props
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  // ... other props
};
```

### Story Organization

Stories are organized by component type:

```
stories/
├── components/
│   ├── base/
│   │   ├── BaseButton.stories.js
│   │   ├── BaseCard.stories.js
│   │   └── ...
│   ├── ui/
│   │   ├── ContactButton.stories.js
│   │   ├── CookieBanner.stories.js
│   │   └── ...
│   └── sections/
│       ├── HeroSection.stories.js
│       ├── ServicesSection.stories.js
│       └── ...
└── pages/
    ├── HomePage.stories.js
    └── ...
```

## Component Documentation

Storybook can be used to document components using the `@storybook/addon-docs` addon.

### Component Documentation Example

```javascript
import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs';
import BaseButton from '../src/components/base/BaseButton.vue';

<Meta title="Components/Base/BaseButton" component={BaseButton} />

# BaseButton

A reusable button component with various styles.

<ArgsTable of={BaseButton} />

## Examples

### Primary Button

<Canvas>
  <Story name="Primary">
    {() => ({
      components: { BaseButton },
      template: '<BaseButton variant="primary">Primary Button</BaseButton>',
    })}
  </Story>
</Canvas>

### Secondary Button

<Canvas>
  <Story name="Secondary">
    {() => ({
      components: { BaseButton },
      template: '<BaseButton variant="secondary">Secondary Button</BaseButton>',
    })}
  </Story>
</Canvas>
```

## Addons

The TAKTZEIT Storybook setup includes several addons:

1. **@storybook/addon-links**: Create links between stories
2. **@storybook/addon-essentials**: A collection of essential addons:
   - Controls: Interact with component props
   - Actions: Capture events
   - Docs: Document components
   - Viewport: Test responsive designs
   - Backgrounds: Change component backgrounds
   - Toolbars: Add toolbar items
3. **@storybook/addon-interactions**: Test component interactions
4. **@storybook/addon-a11y**: Test component accessibility

## Best Practices

1. **Write stories for all components**: Every component should have at least one story
2. **Document component props**: Use `argTypes` to document all props
3. **Show different states**: Create stories for different component states (normal, hover, active, disabled, etc.)
4. **Test edge cases**: Create stories for edge cases (empty data, long text, etc.)
5. **Use controls**: Make props controllable to test different configurations
6. **Test accessibility**: Use the a11y addon to test component accessibility
7. **Keep stories simple**: Each story should demonstrate one aspect of the component
8. **Use consistent naming**: Use consistent naming for stories across components
