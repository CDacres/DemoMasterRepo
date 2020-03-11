import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  text: {
    '@media (max-width: 767px)': {
      display: 'none',
    },
    margin: '0px',
    overflowWrap: 'break-word',
    fontSize: '22px',
    lineHeight: '28px',
    letterSpacing: '-0.2px',
    paddingTop: '0px',
    paddingBottom: '0px',
    color: '#484848',
    fontWeight: 300,
  },
});
