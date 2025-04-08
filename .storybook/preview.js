import '../src/assets/scss/main.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'primary',
        value: '#D8292F',
      },
      {
        name: 'secondary',
        value: '#4D4D4D',
      },
    ],
  },
  layout: 'centered',
};
