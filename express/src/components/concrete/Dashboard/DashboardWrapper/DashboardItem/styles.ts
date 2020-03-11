import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 0,
  },
  childContainer: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  input: {
    transform: 'translateY(0px)',
    opacity: 1,
    transition: '-ms-transform 304ms ease-out 0s, -webkit-transform 304ms ease-out 0s, transform 304ms ease-out 0s, opacity 304ms ease-out 0s',
  },
});
