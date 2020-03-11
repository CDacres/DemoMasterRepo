import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  advertContainer: {
    '@media (max-width: 767px)': {
      marginTop: '20px',
      marginLeft: '20px',
      marginRight: '20px',
    },
    '@media (min-width: 768px)': {
      marginTop: '32px',
      marginLeft: '32px',
      marginRight: '32px',
    },
  },
  advertLink: {
    cursor: 'pointer',
    WebkitTransition: 'background 0.3s, border-color 0.3s',
    MozTransition: 'background 0.3s, border-color 0.3s',
    transition: 'background 0.3s, border-color 0.3s',
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '4px',
    width: 'auto',
    fontSize: '19px',
    lineHeight: '22px',
    letterSpacing: 'undefined',
    fontWeight: 700,
    border: '2px solid transparent',
    paddingRight: '24px',
    paddingLeft: '24px',
    minWidth: '77.66563145999496px',
    background: '#ffffff',
    '::-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
    ':focus::-moz-focus-inner': {
      border: '1px dotted #000000',
    },
    ':active': {
      borderColor: '#ececec',
    },
    ':hover': {
      background: '#ffffff',
    },
    ':disabled': {
      background: 'rgba(255, 255, 255, 0.3)',
      cursor: 'default',
    },
  },
  advertLinkText: {
    WebkitTransition: 'color 0.3s',
    MozTransition: 'color 0.3s',
    transition: 'color 0.3s',
    fontSize: '19px',
    lineHeight: '22px',
    letterSpacing: 'undefined',
  },
  advertLinkTextInner: {
    overflowWrap: 'break-word',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.2px',
    fontWeight: 700,
    color: '#484848',
  },
  advertTextContainer: {
    overflowWrap: 'break-word',
    fontSize: '19px',
    lineHeight: '24px',
    letterSpacing: 'undefined',
  },
  advertTextWrapper: {
    maxWidth: '210px',
    '@media (min-width: 768px)': {
      maxWidth: '288px',
    },
    '@media (min-width: 1128px)': {
      maxWidth: '404px',
    },
  },
});
