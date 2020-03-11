import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  button: {
    border: '0px none',
    minWidth: '1px',
  },
  wrapper: {
    position: 'fixed',
    left: '0px',
    top: '0px',
    zIndex: 10,
  },
  container: {
    position: 'absolute',
    right: '0px',
    background: '#ffffff',
  },
  itemContainer: {
    overflowY: 'auto',
  },
  list: {
    listStyle: 'none',
  },
  checks: {
    width: '400px',
  },
  link: {
    color: '#767676',
    border: '0px none',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    borderBottom: '1px solid #f2f2f2',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20.02px',
    padding: '12px 16px',
    minWidth: '198px',
  },
});
