import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  savedIconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    padding: '10px',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    color: '#46d633',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: 9999,
  },
  savingOverlay: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998,
  },
  savingOverlayBackground: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
  savingText: {
    flex: 'none',
    color: '#fff',
    zIndex: 9999,
  },
});
