import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    margin: '0px 8px 8px',
    '@media (max-width: 743px)': {
      overflowY: 'visible',
      width: '100%',
      margin: '0px',
    },
  },
  headerWrapper: {
    position: 'sticky',
    top: '0px',
    backgroundColor: '#ffffff',
    zIndex: 2,
  },
  headerText: {
    margin: '-48px -8px 0px',
  },
  titleText: {
    fontSize: '32px',
    fontWeight: 400,
    lineHeight: '1.125em',
  },
  subtitleWrapper: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  navButtons: {
    margin: '0px -8px',
  },
});
