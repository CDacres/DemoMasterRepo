import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  list: {
    listStyleType: 'none',
  },
  containerLink: {
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
  },
  contentContainer: {
    display: 'table',
    width: '100%',
  },
  contentBaselineLine: {
    borderBottom: '1px solid transparent',
    borderColor: '#f2f2f2',
  },
  text: {
    color: '#767676',
    overflowWrap: 'break-word',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '18px',
    letterSpacing: '0.2px',
  },
});
