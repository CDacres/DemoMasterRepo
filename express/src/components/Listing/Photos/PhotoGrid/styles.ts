import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  grid: {
    display: 'grid',
    gap: '12px',
    alignItems: 'stretch',
    justifyItems: 'stretch',
    gridAutoRows: '1fr',
    ':before': {
      content: '""',
      width: '0px',
      paddingBottom: '100%',
      gridRow: '1 / 1',
      gridColumn: '1 / 1',
    },
    gridTemplateColumns: 'repeat(3, 1fr)',
    '@media (min-width: 744px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  list: {
    ':first-child': {
      gridRow: '1 / 1',
      gridColumn: '1 / 1',
    },
  },
});
