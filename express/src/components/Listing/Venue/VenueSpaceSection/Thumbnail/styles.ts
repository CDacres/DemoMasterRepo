import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    display: 'grid',
    background: '#dcdcdc',
    alignItems: 'center',
    justifyItems: 'center',
  },
  cell: {
    gridColumn: '1',
    gridRow: '1',
  },
  thumb: {
    width: '52px',
    height: '52px',
    transform: 'translate(27px, 9px) scale(2)',
  },
});
