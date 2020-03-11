import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
    background: '#00c6ff',
  },
  container: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  title: {
    color: '#ffffff',
  },
  buttonsContainer: {
    whiteSpace: 'nowrap',
    margin: '6px 0px 7px 16px',
  },
  saveButtonSmallScreen: {
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    paddingTop: '6px 15px',
    boxShadow: 'none',
    background: '#ffffff',
    borderColor: 'transparent',
    minWidth: '48.541px',
  },
  cancelButton: {
    appearance: 'none',
    userSelect: 'auto',
    textAlign: 'left',
    color: '#ffffff',
    borderWidth: '0px none',
    minWidth: '1px',
    fontSize: '16px',
  },
});
