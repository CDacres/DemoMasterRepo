import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    border: specs.boxBorder,
    borderRadius: 2,
    padding: '16px',
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: 'auto',
    display: 'none',
    '@media (min-width: 744px)': {
      display: 'grid',
      gridRowGap: '24px',
      gridTemplateRows: 'auto',
    },
  },
  title: {
    fontWeight: 700,
  },
});
