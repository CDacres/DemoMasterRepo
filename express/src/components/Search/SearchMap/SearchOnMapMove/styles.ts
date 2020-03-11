import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  checkbox: {
    cursor: 'pointer',
    width: '16px',
    height: '16px',
    verticalAlign: 'baseline',
    left: '0px',
  },
  checkboxLabel: {
    display: 'block',
    textAlign: 'left',
  },
  mapRefreshControls: {
    position: 'absolute',
    left: '60px',
    top: '10px',
  },
  mapRefreshWrapper: {
    verticalAlign: 'middle',
    display: 'inline-block',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
  },
  redoSearchHereButton: {
    width: '100%',
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    padding: '8px 16px',
    fontWeight: 600,
    minWidth: '51.7771px',
    boxShadow: 'none',
    background: '#db3742 none repeat scroll 0% 0%',
    borderColor: 'transparent',
    color: '#ffffff',
    ':moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
  },
  redoSearchHereButtonText: {
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    color: 'inherit',
  },
  redoSearchHereButtonTable: {
    display: 'table',
    margin: '0px auto',
  },
  refreshText: {
    fontWeight: 600,
    overflowWrap: 'break-word',
    lineHeight: '16px',
    letterSpacing: 'normal',
  },
});
