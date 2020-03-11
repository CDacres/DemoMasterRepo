import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  fieldContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '24px',
  },
  fieldLarge: {
    gridColumnEnd: 'span 2',
  },
  fieldSmall: {
    gridColumnEnd: 'span 2',
    '@media (min-width: 744px)': {
      gridColumnEnd: 'span 1',
    },
  },
});
