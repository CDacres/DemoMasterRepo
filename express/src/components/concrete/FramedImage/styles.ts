import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  frame: {
    border: '0px solid #dce0e0',
    boxShadow: '0px 2px 6px #bebebe',
    '@media (max-width: 1127px)': {
      padding: '12px',
    },
    '@media (max-width: 767px)': {
      padding: '12px',
      minHeight: '245px',
    },
  },
});
