import ContactButton from '../../../src/components/ui/ContactButton.vue';

export default {
  title: 'Components/UI/ContactButton',
  component: ContactButton,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
};

const Template = (args) => ({
  components: { ContactButton },
  setup() {
    return { args };
  },
  template: '<div style="height: 100vh; position: relative;"><ContactButton v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};
