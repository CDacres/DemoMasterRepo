import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import RheostatDefaultTheme from 'rheostat/lib/themes/DefaultTheme';
import ReactDatesDefaultTheme from 'react-dates/lib/theme/DefaultTheme';

const primary = '#00c6ff';
const white = '#ffffff';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme({
  ...RheostatDefaultTheme,
  reactDates: {
    ...ReactDatesDefaultTheme.reactDates,
    border: {
      ...ReactDatesDefaultTheme.reactDates.border,
      input: {
        border: 0,
        borderTop: 0,
        borderRight: 0,
        borderBottom: 0,
        borderLeft: 0,
        outlineFocused: 0,
        borderFocused: 0,
        borderTopFocused: 0,
        borderLeftFocused: 0,
        borderBottomFocused: 0,
        borderRightFocused: 0,
        borderRadius: 0,
      },
    },
    color: {
      ...ReactDatesDefaultTheme.reactDates.color,
      core: {
        ...ReactDatesDefaultTheme.reactDates.color.core,
        primary,
        primaryShade_1: primary,
        primaryShade_2: primary,
        primaryShade_3: primary,
        primaryShade_4: primary,
        primary_dark: primary,
      },
      selected: {
        backgroundColor: primary,
        backgroundColor_active: primary,
        backgroundColor_hover: primary,
        borderColor: primary,
        borderColor_active: primary,
        borderColor_hover: primary,
        color: white,
        color_active: white,
        color_hover: white,
      },
    },
    font: {
      ...ReactDatesDefaultTheme.reactDates.font,
      input: {
        ...ReactDatesDefaultTheme.reactDates.font.input,
        weight: 400,
      },
    },
  },
});
