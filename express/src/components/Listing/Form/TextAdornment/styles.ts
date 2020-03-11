import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  text: {
    color: specs.textColor,
    opacity: 0.8,
    fontSize: '16px',
    textAlign: 'center',
  },
  equalPadding: {
    padding: '0px 8px',
  },
  leftPadding: {
    padding: '0px 4px 0px 8px',
  },
  boldText: {
    fontWeight: 700,
  },
});
