import { create, themes } from '@storybook/theming';
import { version } from '../package.json';
import lightLogo from './public/img/logo-light.svg';
import darkLogo from './public/img/logo-dark.svg';

const createTheme = (theme) => {
  return create({
    ...theme,
    brandTitle: `Svyazcom UI v${version}`,
    brandUrl: './',
    brandImage: theme.logo,
  });
};

const lightTheme = createTheme({
  ...themes.light,
  colors: {
    mode: 'light',
    text: {
      color: 'black',
      inverseColor: 'white',
    },
  },
  logo: lightLogo,
});

const darkTheme = createTheme({
  ...themes.dark,
  colors: {
    mode: 'dark',
    text: {
      color: 'white',
      inverseColor: 'black',
    },
  },
  logo: darkLogo,
});

export { 
  lightTheme, 
  darkTheme
};
