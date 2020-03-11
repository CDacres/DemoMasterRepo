import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    marginRight: '20px',
  },
  container: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80px',
    width: '100%',
    textDecoration: 'none',
  },
  title: {
    color: '#484848',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
  },
  subtitleContent: {
    color: '#767676',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
  },
});
