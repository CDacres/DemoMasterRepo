import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  hours: {
    fontSize: '16px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@media (max-width: 320px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  closed: {
    color: '#b3b3b3',
  },
});
