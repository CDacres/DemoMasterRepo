import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  hiddenText: {
    position: 'absolute',
    display: 'block',
    border: '0px none',
    margin: '-1px',
    padding: '0px',
    height: '1px',
    width: '1px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    overflow: 'hidden',
  },
  inlineText: {
    margin: '0px',
    overflowWrap: 'break-word',
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    display: 'inline',
  },
  resultCardBodyLink: {
    display: 'block',
    textDecoration: 'none',
  },
  resultCardBodyTitleContainer: {
    lineHeight: '22px',
    maxHeight: '44px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '19px',
    MozBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  resultCardBodyTitleText: {
    overflowWrap: 'break-word',
    fontSize: '17px',
    lineHeight: '1.375em',
    fontWeight: 700,
  },
  resultCardBodyTitleTextInner: {
    display: 'inline-block',
    lineHeight: '22px',
    fontWeight: 800,
  },
  cardSecondLineContainer: {
    fontSize: '14px',
    lineHeight: '1.43em',
    color: '#484848',
    maxHeight: '18px',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
  },
  cardSecondLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowWrap: 'break-word',
    fontWeight: 300,
  },
  textColor: {
    color: '#484848',
  },
});
