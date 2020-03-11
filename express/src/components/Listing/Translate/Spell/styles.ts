import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  text: {
    fontSize: '14px',
  },
  cardText: {
    fontSize: '18px',
    fontWeight: 600,
  },
  fieldText: {
    color: specs.grey,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
  },
  container: {
    color: specs.grey,
  },
  tip: {
    color: specs.primary,
    marginRight: '8px',
  },
});
