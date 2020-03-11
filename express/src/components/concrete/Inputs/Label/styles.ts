import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  hiddenLabel: {
    position: 'absolute',
    display: 'block',
    border: '0px none',
    margin: '-1px',
    height: '1px',
    width: '1px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    overflow: 'hidden',
  },
});
