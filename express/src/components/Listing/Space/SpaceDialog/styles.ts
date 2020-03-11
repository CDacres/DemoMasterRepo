import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  spacer: {
    height: '196px',
  },
  container: {
    padding: '16px',
    boxShadow: specs.boxShadowTop,
    zIndex: 1,
  },
  button: {
    height: '48px',
  },
});
