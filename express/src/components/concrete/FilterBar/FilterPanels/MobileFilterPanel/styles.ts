import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  mobileFilterPanelContainer: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0%',
    pointerEvents: 'none',
    overflowY: 'hidden',
    zIndex: 2000,
  },
  mobileFilterPanelContainerInner: {
    pointerEvents: 'auto',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ebebeb',
    boxShadow: '0px 0px 2px 0px rgba(22, 22, 22, 0.2)',
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
    position: 'relative',
    willChange: 'transform',
    zIndex: 2001,
  },
});
