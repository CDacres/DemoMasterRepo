import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  favouriteButton: {
    color: 'buttontext',
    border: '0px none',
    display: 'block',
    padding: '8px',
    margin: '-8px',
    minWidth: '1px',
  },
  icon: {
    display: 'block',
    height: '28px',
    width: '28px',
  },
  favouriteButtonContainer: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    zIndex: 2,
  },
});
