import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    border: '2px dashed #bbb',
    borderRadius: specs.borderRadius,
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    cursor: 'pointer',
  },
  plus: {
    fontSize: '46px',
    lineHeight: '46px',
    marginTop: '-18px',
    color: '#bbb',
  },
  text: {
    fontSize: '16px',
    fontWeight: 300,
  },
});
