import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  searchBar: {
    display: 'inherit',
  },
  searchBarWrapper: {
    display: 'block',
    position: 'absolute',
    zIndex: 21,
    '@media (min-width: 1128px)': {
      left: '80px',
    },
    '@media (min-width: 744px)': {
      top: '16px',
      transition: 'width 200ms ease-in 0s',
    },
    '@media (max-width: 743px)': {
      height: '64px',
      left: '0px',
      right: '0px',
      top: '0px',
      transition: 'z-index 300ms steps(1) 0s',
    },
  },
  searchBarWrapperReduced: {
    '@media (min-width: 744px)': {
      width: '460px',
    },
    '@media (max-width: 743px)': {
      zIndex: 9,
    },
  },
  searchBarWrapperExtended: {
    '@media (min-width: 744px)': {
      width: '600px',
    },
  },
  searchBarWrapperInnerSmall: {
    '@media (max-width: 743px)': {
      alignItems: 'center',
      bottom: '0px',
      display: 'flex',
      left: '0px',
      overflowX: 'hidden',
      paddingLeft: '8px',
      paddingRight: '8px',
      position: 'absolute',
      right: '0px',
      top: '0px',
    },
  },
  searchBarContainer: {
    '@media (min-width: 744px)': {
      width: '100%',
      display: 'table',
    },
    '@media (max-width: 743px)': {
      transition: 'transform 300ms ease-out 0s',
      display: 'flex',
      willChange: 'transform',
    },
  },
  searchBarContainerReduced: {
    '@media (max-width: 743px)': {
      transform: 'translate3d(80px, 0px, 0px)',
    },
  },
  searchBarContainerExtended: {
    '@media (max-width: 743px)': {
      transform: 'translate3d(0px, 0px, 0px)',
    },
  },
  searchBarInput: {
    backgroundColor: '#ffffff',
    transition: 'box-shadow 200ms ease-in 0s',
    border: '1px solid #ebebeb',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    height: '48px',
    '@media (min-width: 744px)': {
      display: 'table-cell',
      width: '100%',
      verticalAlign: 'middle',
      ':hover': {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 12px rgba(26, 26, 29, 0.08)',
      },
    },
    '@media (max-width: 743px)': {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
    },
  },
  searchBarInputExtended: {
    '@media (min-width: 744px)': {
      boxShadow: '0px 15px 46px -10px rgba(26, 26, 29, 0.3)',
      borderRadius: '4px 4px 0px 0px',
      borderBottom: 'none',
    },
  },
  searchForm: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  searchFormLabel: {
    display: 'table',
    tableLayout: 'fixed',
    whiteSpace: 'nowrap',
    width: '100%',
    lineHeight: 'normal',
  },
  searchFormLabelText: {
    position: 'absolute',
    display: 'block',
    border: '0px none',
    margin: '-1px',
    height: '1px',
    width: '1px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    overflow: 'hidden',
  },
  searchFormIconWrapper: {
    paddingTop: '3px',
    paddingLeft: '5px',
    paddingRight: '10px',
    width: '39px',
    height: '100%',
  },
  searchFormIconWrapperExtended: {
    '@media (max-width: 743px)': {
      display: 'none',
    },
  },
  searchFormInputWrapper: {
    height: '100%',
    width: '100%',
  },
  searchFormInputContainer: {
    overflow: 'hidden',
    position: 'relative',
    // '::placeholder': {
    //   color: '#717171',
    //   opacity: 1,
    //   fontWeight: 800,
    // },
  },
  // searchFormInput: {
  //   backgroundColor: 'transparent',
  //   border: '0px none',
  //   width: '100%',
  //   textOverflow: 'ellipsis',
  //   fontWeight: 800,
  //   fontSize: '17px',
  //   fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
  //   color: '#484848',
  // },
  // searchFormInputExtended: {
  //   padding: '0px 36px 0px 0px',
  //   ':focus': {
  //     outline: 'none',
  //   },
  // },
  searchClearWrapper: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    top: '0px',
    height: '100%',
  },
  searchClearWrapperExtended: {
    display: 'block',
    ':before': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: '100%',
    },
  },
  searchClearButton: {
    color: '#767676',
    background: 'transparent none repeat scroll 0% 0%',
    border: '0px none',
    paddingLeft: '12px',
    paddingRight: '8px',
    paddingTop: '0px',
    paddingBottom: '0px',
    minWidth: '1px',
  },
  searchCancel: {
    '@media (min-width: 744px)': {
      display: 'none',
    },
    '@media (max-width: 743px)': {
      ':before': {
        width: '32px',
        content: '" "',
      },
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      height: '48px',
      justifyContent: 'flex-end',
      marginLeft: '8px',
      transition: 'opacity 300ms ease-in 200ms',
    },
  },
  searchCancelReduced: {
    '@media (max-width: 743px)': {
      ':before': {
        display: 'block',
      },
      opacity: 0,
      visibility: 'hidden',
    },
  },
  searchCancelExtended: {
    '@media (max-width: 743px)': {
      ':before': {
        display: 'none',
      },
      opacity: 1,
      visibility: 'visible',
    },
  },
  searchCancelButton: {
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    border: 'medium none',
    padding: '4px',
    width: 'auto',
    minWidth: '56px',
  },
});
