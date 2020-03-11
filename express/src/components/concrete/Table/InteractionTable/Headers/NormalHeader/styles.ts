import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  content: {
    position: 'relative',
    background: '#ffffff',
  },
  stickyContent: {
    position: 'relative',
    boxShadow: '0px 9px 15px -7px rgba(0, 0, 0, 0.15)',
    background: '#ffffff',
  },
  contentWrapper: {
    padding: '16px 0px 15px 0px',
  },
  contentContainer: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  formContainer: {
    display: 'inline-block',
    verticalAlign: 'bottom',
  },
  formContent: {
    width: '1000px',
    '@media (min-width: 744px)': {
      width: '600px',
    },
  },
});
