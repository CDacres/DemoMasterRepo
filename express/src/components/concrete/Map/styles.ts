import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  staticMap: {
    position: 'relative',
    maxWidth: '100%',
  },
  zoom: {
    position: 'absolute',
    width: '1em',
    top: '0.5em',
    left: '0.5em',
    height: '1em',
    padding: '18px',
    background: 'white',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.27)',
  },
  siteZoom: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    height: '17px',
    width: '16px',
  },
  mapModalOverlay: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 5,
  },
  mapModal: {
    margin: '15% auto',
    width: '70%',
    height: '50%',
  },
  mapModalClose: {
    color: '#fff',
    margin: '0px 0px 5px 0px',
    fontSize: '28px',
    filter: 'alpha(opacity = 90)',
    opacity: 0.9,
    outline: 'none',
    float: 'right',
    ':focus': {
      textDecoration: 'none',
    },
    ':hover': {
      textDecoration: 'none',
    },
  },
});
