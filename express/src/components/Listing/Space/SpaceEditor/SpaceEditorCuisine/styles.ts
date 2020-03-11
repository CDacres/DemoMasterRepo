import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnGap: '8px',
    '@media (min-width: 744px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});
