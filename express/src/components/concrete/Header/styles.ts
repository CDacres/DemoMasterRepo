import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  headerWrapper: {
    width: '100%',
    height: '64px',
    '@media (min-width: 744px)': {
      height: '81px',
    },
  },
  headerWrapperSticky: {
    position: 'sticky',
    zIndex: 10,
    top: '0px',
  },
  header: {
    position: 'relative',
    zIndex: 5,
    fontWeight: 600,
    display: 'block',
  },
  headerContainer: {
    transitionDuration: '200ms',
    transitionProperty: 'background-color, box-shadow',
    transitionTimingFunction: 'ease-out',
    backgroundColor: '#ffffff',
    borderBottom: 'none',
    width: '100%',
    boxShadow: 'none',
  },
  headerContainerSticky: {
    boxShadow: 'none',
    borderBottom: '1px solid #e4e4e4',
    '@media (max-width: 743px)': {
      boxShadow: 'none',
      border: '0px none',
    },
  },
  headerContainerTransparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  navTable: {
    display: 'table',
    borderSpacing: '0px',
    width: '100%',
  },
});
