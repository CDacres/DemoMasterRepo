import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  pageHeader: {
    marginBottom: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    '@media (min-width: 744px)': {
      marginBottom: '24px',
    },
  },
  pageHeaderTitle: {
    fontSize: '24px',
    lineHeight: '30px',
    fontWeight: 700,
    overflowWrap: 'anywhere',
    marginBottom: '24px',
    '@media (min-width: 744px)': {
      fontSize: '32px',
      lineHeight: '36px',
    },
  },
});
