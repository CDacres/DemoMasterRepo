import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  pageContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  detailsTop: {
    marginTop: '-51px',
    paddingTop: '51px',
  },
  bottomMenu: {
    zIndex: 6,
  },
  bottomMenuWrapper: {
    '@media (max-width: 743px)': {
      paddingRight: '24px',
    },
    '@media (min-width: 1128px)': {
      maxWidth: '1080px',
    },
  },
  bottomMenuTable: {
    '@media (min-width: 744px)': {
      marginLeft: '-5px',
    },
  },
  mobileTabletMenu: {
    display: 'block',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    zIndex: 2,
    backgroundColor: '#ffffff',
  },
  mobileTabletMenuWrap: {
    borderTop: '1px solid #dbdbdb',
  },
  mobileMenuTable: {
    display: 'table',
    width: '100%',
  },
  sidebarContainer: {
    position: 'absolute',
    marginLeft: '45px',
    width: '376px',
    zIndex: 3,
    top: '24px',
  },
  sticky: {
    position: 'fixed',
  },
  reportButton: {
    fontSize: '14px',
    padding: '0px',
    border: '0px none',
    outline: 'none',
    backgroundColor: 'transparent',
    ':hover' : {
      textDecoration: 'underline',
    },
  },
});
