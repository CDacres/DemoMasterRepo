import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cardCategoryWrapper: {
    height: '16px',
    maxHeight: '16px',
    fontSize: '14px',
    textTransform: 'uppercase',
    lineHeight: '20.0167px',
    marginTop: '-4px',
  },
  cardCategory: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  smallText: {
    fontSize: '12px',
    overflowWrap: 'break-word',
    lineHeight: '16px',
    fontWeight: 800,
  },
  cardBodySplit: {
    clear: 'both',
    marginBottom: '-2px',
  },
});
