import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  activeFilterOverlay: {
    position: 'fixed',
    height: '100vh',
    width: '100%',
    top: '48px',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%',
  },
  filterBar: {
    borderBottom: '1px solid #ebebeb',
    width: '100%',
    position: 'fixed',
    zIndex: 9,
    height: '49px',
    background: '#ffffff',
    transition: '-ms-transform 200ms linear 0s, -webkit-transform 200ms linear 0s, transform 200ms linear 0s',
  },
  filterBarInner: {
    height: '100%',
    transition: 'opacity 100ms ease-out 0s',
  },
  filterBarInnerWrapper: {
    display: 'flex',
  },
  filterBarInnerContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
  filterBarInnerHeight: {
    height: '48px',
    width: '100%',
  },
  filterBarInnerActive: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
  filterBarInnerWrapperSmall: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
  },
  filterBarBottom: {
    width: '100%',
    height: '48px',
    zIndex: 1,
    position: 'relative',
  },
});
