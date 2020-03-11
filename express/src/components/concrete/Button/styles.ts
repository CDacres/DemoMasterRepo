import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  button: {
    cursor: 'pointer',
    display: 'inline-block',
    margin: '0px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    WebkitTransition: 'background 0.2s, border-color 0.2s',
    MozTransition: 'background 0.2s, border-color 0.2s',
    transition: 'background 0.2s, border-color 0.2s',
    borderRadius: '4px',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    fontSize: '19px',
    lineHeight: '22px',
    letterSpacing: '0.2px',
    padding: '12px 24px',
    color: '#484848',
    fontWeight: 400,
    borderStyle: 'solid',
    minWidth: '77.66563145999496px',
    background: 'transparent',
    borderColor: '#00c6ff',
    borderWidth: '1px',
    outline: 'none',
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
    ':active': {
      textDecoration: 'none',
    },
    ':visited': {
      textDecoration: 'none',
    },
    ':disabled': {
      cursor: 'default',
    },
  },
});
