/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['light', 'dark']
  },
  plugins: [require('daisyui')]
};
