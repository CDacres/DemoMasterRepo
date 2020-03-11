import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  option: {
    margin: '8px',
    display: 'inline-block',
    border: '2px solid ' + specs.primary,
    padding: '4px 8px',
    color: specs.primary,
    borderRadius: '4px',
    fontWeight: 400,
    fontFamily: specs.fontFamily,
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  large: {
    padding: '10px 16px',
  },
});
