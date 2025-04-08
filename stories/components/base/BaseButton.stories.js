import BaseButton from '../../../src/components/base/BaseButton.vue';

export default {
  title: 'Components/Base/BaseButton',
  component: BaseButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'text'],
      description: 'The button variant',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The button size',
      defaultValue: 'md',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
      defaultValue: false,
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The button type',
      defaultValue: 'button',
    },
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: '<BaseButton v-bind="args">{{ args.default || "Button" }}</BaseButton>',
});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  default: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'md',
  default: 'Secondary Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  size: 'md',
  default: 'Outline Button',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  size: 'md',
  default: 'Text Button',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'primary',
  size: 'sm',
  default: 'Small Button',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'primary',
  size: 'lg',
  default: 'Large Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'md',
  disabled: true,
  default: 'Disabled Button',
};

export const Loading = Template.bind({});
Loading.args = {
  variant: 'primary',
  size: 'md',
  loading: true,
  default: 'Loading Button',
};
