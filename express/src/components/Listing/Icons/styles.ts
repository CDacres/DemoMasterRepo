import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  svg: {
    fill: specs.primary,
  },
  drag: {
    color: specs.dragColor,
  },
  geo: {
    transform: 'translateY(-32px)',
    filter: 'drop-shadow(1px -1px 1px rgba(0, 0, 0, 1))',
  },
  image: {
    height: '20px',
    width: '20px',
    fill: '#fff',
  },
});
