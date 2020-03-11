import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  root: {
    cursor: 'grab',
  },
  drag: {
    color: specs.dragColor,
  },
});
