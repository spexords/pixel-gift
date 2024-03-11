import { Appearance } from '@stripe/stripe-js';

export const appearance: Appearance = Object.freeze({
  theme: 'night',
  variables: {
    fontFamily: 'Goldman, system-ui, sans-serif',
    fontWeightNormal: '400',
    borderRadius: '12px',
    colorBackground: '#06172c',
    colorPrimary: '#DBA619',
    accessibleColorOnColorPrimary: '#1A1B25',
    colorText: 'white',
    colorTextSecondary: 'white',
    colorTextPlaceholder: '#67707a',
    tabIconColor: 'white',
    logoColor: 'dark',
  },
  rules: {
    '.Input, .Block, .Select': {
      backgroundColor: 'transparent',
      border: '1.5px solid var(--colorPrimary)',
    },
  },
});
