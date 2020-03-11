import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  serviceRatingItem: {
    fontSize: '14px',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    color: 'rgba(0, 0, 0, 0.55)',
    borderRadius: '25px',
    display: 'inline',
    marginRight: '3px',
    cursor: 'pointer',
    ':hover': {
      background: 'rgba(0, 0, 0, 0.05)',
      color: 'rgba(0, 0, 0, 0.95)',
    },
  },
  ratingSelected: {
    background: 'rgba(0, 0, 0, 0.05)',
    color: 'rgba(0, 0, 0, 0.95)',
  },
});
