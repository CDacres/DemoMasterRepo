import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridGap: '8px',
  },
  outside: {
    borderBottom: specs.boxBorder,
    height: '1px',
    width: '100%',
  },
  text: {
    fontWeight: 400,
    color: specs.textSeparator,
  },
});
