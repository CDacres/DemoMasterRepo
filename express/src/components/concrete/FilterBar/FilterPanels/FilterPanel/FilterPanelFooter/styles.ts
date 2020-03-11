import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  panelActionsButton: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
    background: 'transparent none repeat scroll 0% 0%',
    border: '0px none',
    padding: '0px',
    minWidth: '1px',
    textAlign: 'left',
    ':-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
    },
  },
  panelActions_applyButton: {
    color: '#00c6ff',
  },
  panelActions_cancelButton: {
    color: '#484848',
  },
  panelActionsContainerInner: {
    fontWeight: 600,
    overflowWrap: 'break-word',
    lineHeight: '18px',
    letterSpacing: 'normal',
  },
});
