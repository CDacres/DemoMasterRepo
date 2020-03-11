import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cardTextContainer: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardTextContainer_3: {
    maxHeight: '54px',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  cardTextContainer_7: {
    maxHeight: '126px',
    WebkitLineClamp: 7,
    WebkitBoxOrient: 'vertical',
  },
  cardText: {
    overflowWrap: 'break-word',
    fontWeight: 300,
  },
  priceTextContainer: {
    maxHeight: '18px',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
  },
  priceText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowWrap: 'break-word',
    fontWeight: 300,
  },
});
