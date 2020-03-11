import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  arrowButton: {
    lineHeight: '0.78',
    userSelect: 'none',
    backgroundColor: '#ffffff',
    color: '#757575',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e4e7e7',
    borderImage: 'initial',
    borderRadius: '3px',
    padding: '6px 9px',
    minWidth: 'fit-content',
  },
  forgotLink: {
    fontSize: '15px',
  },
  datepicker: {
    minWidth: '319px',
    display: 'flex',
    justifyContent: 'center',
  },
  itemContainer: {
    fontSize: '14px',
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  header: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
    overflowWrap: 'break-word',
    letterSpacing: 'normal',
  },
  summary: {
    marginTop: '20px',
  },
  tooltip: {
    height: 'fit-content',
  },
});
