import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    backgroundColor: '#a6dce0',
    height: '567px',
    '@media (max-width: 743px)': {
      height: '360px',
    },
  },
  inner: {
    width: '100%',
    height: '100%',
  },
  mapWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  mapPosition: {
    position: 'absolute',
    top: '0px',
    left: '0px',
  },
  mapContainer: {
    backgroundColor: '#a4ddf5',
  },
  mapInner: {
    zIndex: 0,
    borderWidth: '0px',
  },
});
