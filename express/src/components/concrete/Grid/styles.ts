import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cardsContainer: {
    marginLeft: '-24px',
    marginRight: '-24px',
    padding: '0px 18px',
    '@media (min-width: 768px)': {
      padding: '0px 16px',
    },
    '@media (min-width: 1128px)': {
      marginLeft: '-8px',
      marginRight: '-8px',
    },
  },
  card: {
    position: 'relative',
    color: '#484848',
    height: '100%',
  },
});
