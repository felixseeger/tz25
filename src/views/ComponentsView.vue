<template>
  <div class="components-view">
    <div class="container">
      <h1 class="components-view__title">UI Components</h1>

      <!-- Section Headings -->
      <section class="components-section">
        <h2 class="components-section__title">Section Headings</h2>

        <div class="components-example">
          <SectionHeading
            title="Large Left-Aligned Heading"
            subtitle="Subtitle Text"
            description="This is a description text that provides additional context about this section. It can be multiple lines long and helps explain what the section is about."
            size="large"
            alignment="left"
          />

          <SectionHeading
            title="Medium Centered Heading"
            subtitle="With Subtitle"
            description="This is a centered section heading with a medium size."
            size="medium"
            alignment="center"
            divider
          />

          <SectionHeading
            title="Small Heading"
            subtitle="Small Size"
            size="small"
            alignment="left"
          />

          <SectionHeading
            title="Heading with Accent"
            accent="Text"
            size="large"
            alignment="left"
          />
        </div>
      </section>

      <!-- Buttons -->
      <section class="components-section">
        <h2 class="components-section__title">Buttons</h2>

        <div class="components-example">
          <h3>Button Variants</h3>
          <div class="button-grid">
            <BaseButton variant="primary">Primary Button</BaseButton>
            <BaseButton variant="secondary">Secondary Button</BaseButton>
            <BaseButton variant="outline">Outline Button</BaseButton>
            <BaseButton variant="text">Text Button</BaseButton>
            <BaseButton variant="danger">Danger Button</BaseButton>
          </div>

          <h3>Button Sizes</h3>
          <div class="button-grid">
            <BaseButton size="small">Small Button</BaseButton>
            <BaseButton size="medium">Medium Button</BaseButton>
            <BaseButton size="large">Large Button</BaseButton>
          </div>

          <h3>Button States</h3>
          <div class="button-grid">
            <BaseButton>Normal Button</BaseButton>
            <BaseButton disabled>Disabled Button</BaseButton>
            <BaseButton loading>Loading Button</BaseButton>
          </div>

          <h3>Block Button</h3>
          <BaseButton block>Block Button</BaseButton>

          <h3>Icon Buttons</h3>
          <div class="button-grid">
            <BaseButton icon="/path/to/icon.svg">Icon Left</BaseButton>
            <BaseButton icon="/path/to/icon.svg" iconPosition="right">Icon Right</BaseButton>
          </div>
        </div>
      </section>

      <!-- Inputs -->
      <section class="components-section">
        <h2 class="components-section__title">Form Inputs</h2>

        <div class="components-example">
          <h3>Basic Inputs</h3>
          <BaseInput
            v-model="textInput"
            label="Text Input"
            placeholder="Enter some text"
          />

          <BaseInput
            v-model="emailInput"
            type="email"
            label="Email Input"
            placeholder="Enter your email"
            required
          />

          <BaseInput
            v-model="passwordInput"
            type="password"
            label="Password Input"
            placeholder="Enter your password"
          />

          <h3>Input States</h3>
          <BaseInput
            v-model="disabledInput"
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />

          <BaseInput
            v-model="errorInput"
            label="Error Input"
            placeholder="This input has an error"
            error="This field is required"
          />

          <BaseInput
            v-model="successInput"
            label="Success Input"
            placeholder="This input is valid"
            success
          />

          <h3>Textarea</h3>
          <BaseInput
            v-model="textareaInput"
            type="textarea"
            label="Textarea"
            placeholder="Enter multiple lines of text"
            rows="4"
          />

          <h3>With Helper Text</h3>
          <BaseInput
            v-model="helperInput"
            label="Input with Helper Text"
            placeholder="Enter some text"
            helperText="This is some helpful information about this field"
          />

          <h3>With Character Count</h3>
          <BaseInput
            v-model="countInput"
            label="Input with Character Count"
            placeholder="Limited to 50 characters"
            maxlength="50"
            showCharacterCount
          />
        </div>
      </section>

      <!-- Cards -->
      <section class="components-section">
        <h2 class="components-section__title">Cards</h2>

        <div class="components-example">
          <h3>Card Variants</h3>
          <div class="card-grid">
            <BaseCard
              title="Default Card"
              subtitle="With shadow"
              variant="default"
            >
              <p>This is the content of the card. It can contain any elements.</p>
            </BaseCard>

            <BaseCard
              title="Outlined Card"
              subtitle="With border"
              variant="outlined"
            >
              <p>This is the content of the card. It can contain any elements.</p>
            </BaseCard>

            <BaseCard
              title="Elevated Card"
              subtitle="With stronger shadow"
              variant="elevated"
            >
              <p>This is the content of the card. It can contain any elements.</p>
            </BaseCard>
          </div>

          <h3>Hoverable Card</h3>
          <div class="card-grid">
            <BaseCard
              title="Hoverable Card"
              subtitle="Hover to see effect"
              hoverable
            >
              <p>This card has a hover effect. Try hovering over it!</p>
            </BaseCard>
          </div>

          <h3>Card with Image</h3>
          <div class="card-grid">
            <BaseCard
              title="Card with Image"
              subtitle="Image at the top"
              image="https://via.placeholder.com/400x200"
              imageAlt="Placeholder image"
            >
              <p>This card has an image at the top.</p>
            </BaseCard>
          </div>

          <h3>Card with Footer</h3>
          <div class="card-grid">
            <BaseCard
              title="Card with Footer"
              subtitle="Actions at the bottom"
            >
              <p>This card has a footer with actions.</p>

              <template #footer>
                <div style="display: flex; justify-content: flex-end; gap: 1rem;">
                  <BaseButton variant="text" size="small">Cancel</BaseButton>
                  <BaseButton variant="primary" size="small">Save</BaseButton>
                </div>
              </template>
            </BaseCard>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { BaseButton, BaseInput, BaseCard, SectionHeading } from '../components/base';

export default {
  name: 'ComponentsView',
  components: {
    BaseButton,
    BaseInput,
    BaseCard,
    SectionHeading
  },
  setup() {
    // Form input values
    const textInput = ref('');
    const emailInput = ref('');
    const passwordInput = ref('');
    const disabledInput = ref('Disabled value');
    const errorInput = ref('');
    const successInput = ref('Valid input');
    const textareaInput = ref('');
    const helperInput = ref('');
    const countInput = ref('');

    return {
      textInput,
      emailInput,
      passwordInput,
      disabledInput,
      errorInput,
      successInput,
      textareaInput,
      helperInput,
      countInput
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.components-view {
  padding: 2rem 0;

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #333;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.components-section {
  margin-bottom: 4rem;

  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid $primary-color;
    color: #333;
  }
}

.components-example {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    color: #333;

    &:first-child {
      margin-top: 0;
    }
  }
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
