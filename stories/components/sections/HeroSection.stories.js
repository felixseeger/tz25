import HeroSection from '../../../src/components/sections/HeroSection.vue';

export default {
  title: 'Components/Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => ({
  components: { HeroSection },
  setup() {
    return { args };
  },
  template: '<HeroSection v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
