import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  text: {
    color: '#484848',
    margin: '0px',
    overflowWrap: 'break-word',
    paddingTop: '0px',
    paddingBottom: '0px',
    display: 'inline',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.2px',
    fontWeight: 700,
  },
  twoLineTitle: {
    lineHeight: '18px',
    maxHeight: '36px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
});
