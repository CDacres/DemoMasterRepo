import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  reviewsWrapper: {
    lineHeight: 'normal',
    maxHeight: '22px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
  },
  reviewsCount: {
    fontSize: '12px',
    overflowWrap: 'break-word',
    lineHeight: '16px',
    color: '#484848',
    verticalAlign: 'middle',
  },
});
