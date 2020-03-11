import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  columnsWrapper: {
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
  copyrightWrapper: {
    display: 'inline-block',
    paddingTop: '1px',
    whiteSpace: 'nowrap',
    marginRight: '5px',
  },
  footerBaseContainer: {
    marginTop: '25px',
  },
  footerBaseText: {
    margin: '0px',
    overflowWrap: 'break-word',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.2px',
    paddingTop: '0px',
    paddingBottom: '0px',
    color: '#767676',
  },
  footerOuter: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #dbdbdb',
    marginTop: '15px',
    '@media (max-width: 767px)': {
      borderTop: '0px',
    },
  },
  footerOuter_squashed: {
    bottom: '0px',
    padding: '0px',
    position: 'fixed',
    transformOrigin: 'center bottom 0px',
    transition: '-ms-transform 0.2s ease-out 0s, transform 0.2s ease-out 0s, transform 0.2s ease-out 0s',
    width: '100%',
    zIndex: 50,
  },
  footerOuter_squashed_hidden: {
    transform: 'scaleY(0)',
  },
  footerOuter_squashed_visible: {
    transform: 'scaleY(1)',
  },
  footerInner: {
    paddingTop: '24px',
    paddingBottom: '24px',
    margin: 'auto',
    paddingLeft: '12px',
    paddingRight: '12px',
    '@media (min-width: 1128px)': {
      maxWidth: '1080px',
    },
    '@media (max-width: 1127px)': {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
    '@media (max-width: 767px)': {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    backgroundColor: 'transparent',
    '@media (min-width: 768px)': {
      paddingTop: '48px',
      paddingBottom: '48px',
    },
  },
  fontSettings: {
    margin: '0px',
    overflowWrap: 'break-word',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.2px',
  },
  linkList: {
    listStyle: 'none',
    marginTop: '15px',
    marginBottom: '0px',
    paddingLeft: '0px',
  },
  socialIconsContainer: {
    display: 'inline',
    marginLeft: '-6px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  table: {
    display: 'table',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  flagContainer: {
    float: 'right',
  },
  telephoneNumber: {
    fontSize: '14px',
    color: '#767676',
  },
});
