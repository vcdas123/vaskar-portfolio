// Mantine's preset must run before Tailwind so `light-dark()`/`rem()` helpers are
// expanded, then Tailwind generates the utility layer.
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62.5em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
