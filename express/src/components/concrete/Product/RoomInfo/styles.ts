import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  itemWrapper: {
    paddingBottom: '16px',
  },
  link: {
    color: '#484848',
    textDecoration: 'none',
  },
  iconContainer: {
    float: 'left',
    paddingRight: '8px',
  },
  icon: {
    height: '12px',
    width: '12px',
    verticalAlign: 'middle',
  },
  textContainer: {
    float: 'left',
    width: '28%',
    '@media (max-width: 1127px)': {
      float: 'none',
    },
  },
  text: {
    fontWeight: 900,
    margin: '0px',
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    color: '#484848',
  },
  descriptionContainer: {
    '@media (max-width: 1127px)': {
      clear: 'both',
    },
  },
  description: {
    margin: '0px',
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    color: '#484848',
  },
});
