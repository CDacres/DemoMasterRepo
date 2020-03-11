import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    display: 'block',
  },
  mobileInputWrapper: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    height: '50px',
  },
  mobileCalendarWrapper: {
    position: 'absolute',
    top: '50px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
  inputWrapper: {
    background: '#ffffff none repeat scroll 0% 0%',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '130px',
  },
  inputContainer: {
    fontWeight: 200,
    fontSize: '16px',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    lineHeight: '24px',
    color: '#484848',
    width: '100%',
    padding: '11px 11px 9px',
    borderRadius: '4px',
    outline: '0px',
    background: '#ffffff none repeat scroll 0% 0%',
    borderImage: 'none',
    borderTop: '0px',
    borderRight: '0px',
    borderBottom: '2px solid #00c6ff',
    borderLeft: '0px',
  },
});
