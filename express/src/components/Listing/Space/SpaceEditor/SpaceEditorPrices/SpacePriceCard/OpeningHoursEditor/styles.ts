import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr 1fr',
    gridGap: '8px',
  },
  dividerLine: {
    gridColumn: '1 / span 3',
    margin: '8px 0px',
    border: specs.dividerBorder,
  },
});
