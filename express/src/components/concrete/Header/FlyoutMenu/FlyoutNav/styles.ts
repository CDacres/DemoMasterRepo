import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  childContainer: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  container: {
    listStyleType: 'none',
    padding: '88px 24px 24px',
  },
  link: {
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    fontWeight: 'normal',
    display: 'block',
    textDecoration: 'none',
    position: 'relative',
    color: '#484848',
    cursor: 'pointer',
  },
  linkContainer: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
});
