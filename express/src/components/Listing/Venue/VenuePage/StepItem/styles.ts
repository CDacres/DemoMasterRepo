import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  tab: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    height: '56px',
  },
  current: {
    backgroundColor: '#00c6ff',
    color: '#fff',
    zIndex: 1,
    '@media (min-width: 744px)': {
      ':after': {
        content: '""',
        position: 'absolute',
        top: '18px',
        right: '-20px',
        backgroundColor: '#00c6ff',
        borderRadius: '4px',
        borderRight: '2px solid transparent',
        borderTop: '2px solid transparent',
        height: '42px',
        width: '42px',
        marginTop: '-11px',
        marginLeft: '12px',
        transform: 'rotate(45deg)',
      },
    },
    ':before': {
      content: '""',
      position: 'absolute',
    },
  },
  segment: {
    backgroundColor: '#efefef',
    color: '#737373',
    zIndex: 0,
  },
  pointer: {
    cursor: 'pointer',
  },
  inner: {
    width: '100%',
    wordBreak: 'normal',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    '@media (min-width: 744px)': {
      paddingRight: '30px',
    },
    '@media (max-width: 743px)': {
      marginLeft: '-40px',
    },
  },
  errorIcon: {
    marginTop: '5px',
  },
});
