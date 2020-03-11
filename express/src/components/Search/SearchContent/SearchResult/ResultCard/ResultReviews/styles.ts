import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  reviewSection: {
    lineHeight: 'normal',
    maxHeight: '22px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    MozBoxOrient: 'vertical',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
  },
  reviewSectionText: {
    fontSize: '12px',
    fontWeight: 400,
    overflowWrap: 'break-word',
    lineHeight: '16px',
  },
  verticallyAligned_middle: {
    verticalAlign: 'middle',
    lineHeight: '21px',
  },
});
