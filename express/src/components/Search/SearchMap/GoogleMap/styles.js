import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  mapCanvas: {
    height: '100%'
  },
  mapFull: {
    height: '100%',
    width: '100%'
  },
  overlayView: {
    width: '50px',
    height: '30px',
    backgroundColor: '#fff',
    border: '1px solid #cfcfcf',
    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.39)',
    position: 'relative',
    textAlign: 'center',
    paddingTop: '10%',
    fontWeight: 'bold'
  },
  overlayViewHighlighted: {
    width: '50px',
    height: '30px',
    backgroundColor: '#00c6ff',
    color: '#fff',
    border: '1px solid #00c6ff',
    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.39)',
    position: 'relative',
    textAlign: 'center',
    paddingTop: '10%',
    fontWeight: 'bold'
  },
  fang: {
    position: 'absolute',
    width: '20px',
    height: '10px',
    bottom: '-10px',
    right: '15px',
    transform: 'rotate(180deg)'
  },
  // fangShapeHovered: {
  //   fill: '#00c6ff'
  // },
  priceText: {
    pointerEvents: 'none'
  }
});
