import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  sectionHeader: {
    background: 'transparent none repeat scroll 0% 0%',
    border: 'medium none',
    textAlign: 'left',
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    '@media (min-width: 1128px)': {
      width: '50%',
    },
  },
  sectionHeaderContainer: {
    display: 'table',
    width: '100%',
  },
  sectionHeaderH3: {
    fontWeight: 800,
    fontSize: '24px',
    lineHeight: '30px',
    letterSpacing: 'normal',
    '@media (max-width: 743px)': {
      lineHeight: '26px',
    },
  },
  sectionHeaderH4: {
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    fontWeight: 'normal',
    '@media (max-width: 743px)': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
});
