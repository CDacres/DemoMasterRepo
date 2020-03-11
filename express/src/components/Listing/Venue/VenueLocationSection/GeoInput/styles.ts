import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    border: specs.boxBorder,
  },
  inner: {
    gridRow: '1',
    gridColumn: '1',
  },
  map: {
    height: '100%',
  },
  button: {
    height: '36px',
  },
});
