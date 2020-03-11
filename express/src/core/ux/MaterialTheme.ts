import { createMuiTheme } from '@material-ui/core';
import { specs } from '@src/core/ux';

export const materialTheme = createMuiTheme({
  typography: {
    fontFamily: specs.fontFamily,
  },
  palette: {
    primary: { main: specs.primary },
    secondary: { main: specs.secondary },
    error: { main: specs.error },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
    },
  },
});
