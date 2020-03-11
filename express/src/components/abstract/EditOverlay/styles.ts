import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  editOverlay: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998,
    backgroundColor: '#000',
    opacity: 0,
    transition: 'opacity .25s ease-in-out',
    ':hover': {
      opacity: 0.65,
      cursor: 'pointer',
    },
    ':hover > div:first-child': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  editOverlayText: {
    flex: 'none',
    color: '#fff',
    zIndex: 9999,
    fontSize: '54px',
  },
});
