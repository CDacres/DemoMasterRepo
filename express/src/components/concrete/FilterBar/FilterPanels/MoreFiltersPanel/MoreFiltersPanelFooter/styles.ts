import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    background: '#ffffff none repeat scroll 0% 0%',
    width: '100%',
  },
  cancelButton: {
    color: '#484848',
    appearance: 'none',
    border: '0px none',
    padding: '0px',
    textAlign: 'left',
    userSelect: 'auto',
    fontSize: '15px',
    lineHeight: '18px',
  },
  applyButton: {
    border: '2px solid transparent',
    width: 'auto',
    fontWeight: 700,
    outline: 'none',
  },
  text: {
    color: '#484848',
    overflowWrap: 'break-word',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.2px',
  },
});
