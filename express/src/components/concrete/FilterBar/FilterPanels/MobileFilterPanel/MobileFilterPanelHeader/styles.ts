import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  panelHeaderContainer: {
    height: '58px',
    display: 'table',
    verticalAlign: 'top',
    width: '100%',
  },
  panelHeader: {
    width: '30%',
  },
  panelHeaderTitle: {
    width: '40%',
  },
  panelHeaderText: {
    fontWeight: 600,
    overflowWrap: 'break-word',
    lineHeight: '18px',
    letterSpacing: 'normal',
  },
  panelHeaderClearButton: {
    color: '#00c6ff',
    fontWeight: 'inherit',
    overflowWrap: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    minWidth: '1px',
    textAlign: 'inherit',
    borderWidth: '0px',
    borderRadius: '0px',
  },
  panelHeaderCloseButton: {
    padding: '20px',
    margin: '-20px',
  },
});
