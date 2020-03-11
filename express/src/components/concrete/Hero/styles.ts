/* tslint:disable:max-line-length */
import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  heroOuter: {
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    position: 'relative',
    height: '700px',
    marginTop: '-83px',
  },
  heroInner: {
    margin: 'auto',
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
  },
  heroBackground: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(247, 247, 247, 1)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: 1,
    backgroundPositionX: '80%',
    backgroundPositionY: '38%',
    '@media (max-width: 767px)': {
      backgroundPositionX: '72%',
      height: '206%',
    },
    '@media (min-width: 768px)': {
      backgroundPositionX: '60%',
      backgroundPositionY: '68%',
      height: '124%',
    },
    '@media screen and (min-width: 1800px)': {
      backgroundPositionY: '35%',
    },
  },
  heroBackgroundPush: {
    position: 'absolute',
    zIndex: 1,
    bottom: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'linear-gradient(to left, rgba(250, 250, 250, 0) 45%, rgba(250, 250, 250, 0.8) 55%, rgba(250, 250, 250, 1) 100%)',
    '@media (max-width: 767px)': {
      backgroundImage: 'linear-gradient(to top, rgba(250, 250, 250, 0) 15%, rgba(250, 250, 250, 0.8) 46%, rgba(250, 250, 250, 1) 100%)',
    },
  },
  heroContent: {
    zIndex: 2,
    position: 'absolute',
    left: '0px',
    '@media (min-width: 1128px)': {
      top: '50%',
      transform: 'translateY(-50%)',
      paddingTop: '60px',
      paddingBottom: '60px',
      width: '480px',
    },
    '@media (max-width: 1127px)': {
      top: '140px',
      width: '420px',
    },
    '@media (max-width: 767px)': {
      top: '93px',
      width: '100%',
      maxWidth: '400px',
    },
  },
  heroPush: {
    '@media (min-width: 768px)': {
      paddingTop: '700px',
    },
    '@media (max-width: 767px)': {
      paddingTop: '800px',
    },
  },
});
