import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  reviewWrapper: {
    maxHeight: '93px',
    overflow: 'hidden',
    transition: 'height 0.3s linear',
  },
  review: {
    fontSize: '16px',
  },
  collapsable: {
    fontSize: '16px',
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
  collapse: {
    maxHeight: 'auto',
  },
});
