import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  amenity: {
    backgroundColor: '#f2f2f2',
  },
  amenityTextWrapper: {
    position: 'relative',
    height: '64px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    overflowWrap: 'break-word',
  },
  amenityText: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    overflowWrap: 'break-word',
    fontSize: '14px',
    lineHeight: '16px',
    maxHeight: '33px',
    overflow: 'hidden',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  amenityTextWithPrice: {
    top: '35%',
  },
  amenityPrice: {
    top: '75%',
    color: '#02b692',
  },
  amenityContainer: {
    overflow: 'hidden',
    transition: 'height 0.3s linear',
  },
  amenityWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    '@media (max-width: 767px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  collapsable: {
    fontSize: '16px',
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
});
