import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    display: 'block',
    height: 'auto',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    background: '#484848',
    borderStyle: 'none',
    borderColor: 'initial',
    borderImage: 'initial',
    borderRadius: '12px',
    borderWidth: '0px',
    overflow: 'hidden',
    textDecoration: 'none',
    '@media (min-width: 415px)': {
      height: '296px',
      borderRadius: '16px',
    },
    '@media (min-width: 1128px)': {
      height: '376px',
    },
    '@media (min-width: 1440px)': {
      height: '415px',
    },
  },
  space: {
    paddingTop: '125%',
    '@media (min-width: 743px)': {
      display: 'none',
    },
  },
  textWrapper: {
    display: 'flex',
    height: '100%',
    maxWidth: '256px',
    paddingTop: '36px',
    paddingLeft: '24px',
    paddingBottom: '36px',
    zIndex: 1,
    flexFlow: 'column',
    '@media (min-width: 415px)': {
      maxWidth: '316px',
      paddingLeft: '36px',
      position: 'relative',
    },
    '@media (min-width: 1128px)': {
      maxWidth: '448px',
    },
  },
  textWrapperSmallScreen: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    display: 'flex',
    maxWidth: '288px',
    flexFlow: 'column',
  },
  box: {
    flexGrow: 1,
  },
  imgWrapper: {
    position: 'absolute',
    top: '-1px',
    left: '0px',
    right: '0px',
    bottom: '-1px',
  },
  imgContainer: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    height: '100%',
    width: '100%',
  },
  imgInner: {
    objectFit: 'cover',
    verticalAlign: 'bottom',
    height: '100%',
    width: '100%',
    position: 'static',
  },
  imgBreak: {
    display: 'none',
    backgroundImage: 'none',
  },
});
