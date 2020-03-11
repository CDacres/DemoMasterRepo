import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    height: '436px',
    width: '100%',
    border: specs.boxBorder,
    borderRadius: specs.borderRadius,
    display: 'table',
  },
  containerError: {
    borderColor: specs.boxBorderError,
  },
  inner: {
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  text: {
    fontSize: '24px',
  },
});
