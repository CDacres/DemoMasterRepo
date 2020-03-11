import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  itemWrapper: {
    height: '100%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    borderBottom: '2px solid transparent',
  },
  itemInner: {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 1,
    borderBottom: '2px solid transparent',
  },
  itemInnerUnderlined: {
    ':hover': {
      borderBottomColor: '#00c6ff',
    },
  },
});
