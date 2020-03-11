import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  reviewStar: {
    display: 'inline-block',
    position: 'relative',
    color: '#00c6ff',
    fontSize: '9px',
    height: '10px',
    marginRight: '1px',
    width: '9px',
    verticalAlign: 'middle',
  },
  reviewStarInverse: {
    color: '#d8d8d8',
  },
  reviewStarCover: {
    left: '0px',
    position: 'absolute',
  },
});
