import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  filterPanel: {
    position: 'absolute',
    top: '40px',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0px 14px 36px 2px rgba(0, 0, 0, 0.15)',
    display: 'inline-block',
    maxHeight: 'calc(100vh - 152px)',
  },
  filterPanelWrapper: {
    height: '100%',
  },
  filterPanelContainer: {
    maxHeight: 'calc(100vh - 248px)',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  filterPanelInner: {
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
});
