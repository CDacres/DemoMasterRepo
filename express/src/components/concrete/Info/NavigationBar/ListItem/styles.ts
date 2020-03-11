import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    boxSizing: 'border-box',
    minHeight: '50px',
    height: '80px',
    lineHeight: '80px',
    ':after': {
      content: '""',
      marginLeft: '0px',
      marginRight: '0px',
      color: '#484848',
      borderBottom: 'none',
    },
  },
  wrapperSelected: {
    color: '#00c6ff',
  },
  selectedSpanWrapper: {
    borderBottom: '2px solid #00c6ff',
    height: '80px',
  },
  selectedSpan: {
    height: '50px',
    cursor: 'default',
    borderBottom: '0px',
  },
});
