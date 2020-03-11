import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cardTitleContainer: {
    lineHeight: '22px',
    maxHeight: '55px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '19px',
    color: '#484848',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    '@media (max-width: 767px)': {
      lineHeight: '18px',
      maxHeight: '36px',
      fontSize: '15px',
    },
  },
  cardTitle: {
    margin: '0px',
    overflowWrap: 'break-word',
    lineHeight: '1.375em',
    fontWeight: 700,
    '@media (max-width: 767px)': {
      lineHeight: '1.28571em',
      fontSize: '14px',
    },
  },
});
