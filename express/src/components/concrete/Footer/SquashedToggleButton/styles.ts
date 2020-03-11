import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  footerSquashedToggleContainer: {
    position: 'fixed',
    zIndex: 50,
    bottom: '13px',
    left: '13px',
    right: '110px',
    '@media (min-width: 1128px)': {
      left: 'auto',
      right: '110px',
    },
  },
  footerSquashedToggleButton: {
    width: 'auto',
    fontSize: '14px',
    letterSpacing: 'normal',
    padding: '6px 15px',
    fontWeight: 600,
    minWidth: '48.541px',
    boxShadow: '0px 3px 9px 3px rgba(0, 0, 0, 0.05)',
    background: '#ffffff none repeat scroll 0% 0%',
    borderColor: 'transparent',
    color: '#484848',
    ':-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
  },
  footerSquashedToggleButtonInner: {
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    color: 'inherit',
  },
  table: {
    display: 'table',
    margin: '0px auto',
  },
});
