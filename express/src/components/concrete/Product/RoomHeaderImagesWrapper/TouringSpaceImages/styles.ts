import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  touringContainer: {
    background: '#ffffff none repeat scroll 0% 0%',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    zIndex: 6,
    position: 'fixed',
  },
  touringTopBarContainer: {
    height: '64px',
    width: '100%',
    borderBottom: '1px solid #e4e4e4',
    position: 'relative',
    zIndex: 0,
  },
  touringTopBarLeft: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '24px',
    zIndex: 1,
  },
  touringTopBarRight: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    right: '24px',
    zIndex: 1,
  },
  touringTopBarWrapper: {
    display: 'table',
    position: 'relative',
    height: '100%',
  },
  touringRightWrapper: {
    whiteSpace: 'nowrap',
    lineHeight: 0,
  },
  iconButton: {
    minWidth: '1px',
    borderColor: 'transparent',
  },
  touringWrapper: {
    position: 'absolute',
    width: '100%',
    top: '64px',
    bottom: '100px',
  },
  touringInner1: {
    position: 'absolute',
    width: '100%',
    top: '0px',
    bottom: '0px',
  },
  touringInner2: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
  },
  closeButton: {
    position: 'sticky',
    top: '0px',
    alignSelf: 'flex-start',
    border: '0px none',
    boxShadow: 'none',
    zIndex: 3,
  },
  header: {
    marginTop: '50px',
  },
  photosBlock: {
    marginLeft: '-5px',
    marginRight: '-5px',
    marginTop: '20px',
  },
});
