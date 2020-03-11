import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  accountCard: {
    '@media (min-width: 744px)': {
      display: 'flex',
      height: '100%',
    },
  },
  accountLink: {
    display: 'block',
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#484848',
  },
  arrowContainer: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginTop: '-2px',
  },
  subtitleContainer: {
    minHeight: '48px',
  },
});
