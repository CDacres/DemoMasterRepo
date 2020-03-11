import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px',
  },
  container: {
    borderBottom: 'none',
  },
  area: {
    gridTemplateColumns: '1fr auto',
    paddingLeft: '8px',
    height: '46px',
  },
});
