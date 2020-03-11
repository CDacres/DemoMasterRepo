import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  bannerWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  bannerContainer: {
    overflowAnchor: 'none',
  },
  bannerImageContainer: {
    width: '100%',
    position: 'relative',
    height: '400px',
    '@media (min-width: 1128px)': {
      height: '480px',
    },
  },
  bannerInnerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bannerImageInner: {
    position: 'relative',
    height: '100%',
    width: '100vw',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    left: '50%',
    right: '50%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  bannerTitleWrapper: {
    display: 'table',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  bannerTitleInner: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    maxWidth: '100%',
    marginTop: '-44px',
    '@media (min-width: 744px) and (max-width: 1127px)': {
      marginBottom: '24px',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '80px',
    },
  },
  bannerTitleIcon: {
    position: 'absolute',
    width: '100%',
    top: '23px',
    margin: '0px auto',
    '@media (min-width: 744px)': {
      top: '0px',
    },
  },
  bannerTitleTextWrapper: {
    color: '#3c3c41',
    fontSize: '32px',
    lineHeight: '36px',
    letterSpacing: 'normal',
    fontWeight: 800,
    textTransform: 'uppercase',
    '@media (min-width: 1128px)': {
      lineHeight: '1.15em',
      fontSize: '64px',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      lineHeight: '1.15em',
      fontSize: '80px',
      padding: '0px',
    },
    '@media (max-width: 743px)': {
      lineHeight: '1.15em',
      marginTop: '-12px',
      fontSize: '36px',
      marginBottom: '16px',
    },
  },
  bannerTitleLineIconWrapper: {
    color: '#e0929b',
    width: '80%',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    marginTop: '0px',
    '@media (min-width: 744px)': {
      marginTop: '-4px',
    },
  },
  bannerTitleLineIcon: {
    height: '12px',
    width: '100%',
    display: 'block',
  },
  bannerSubtitleWrapper: {
    marginTop: '-4px',
    '@media (max-width: 743px)': {
      marginTop: '-16px',
    },
  },
  bannerSubtitleText: {
    margin: 'auto',
    maxWidth: '280px',
    fontSize: '18px',
    color: '#3c3c41',
  },
  bannerButton: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
    fontSize: '14px',
    minWidth: '48.541px',
    fontWeight: 600,
    letterSpacing: 'normal',
    padding: '6px 15px',
    width: 'auto',
    ':active': {
      background: '#e2e2e2 none repeat scroll 0% 0%',
      borderColor: 'transparent',
      color: '#484848',
    },
  },
  bannerButtonWrapper: {
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    color: 'inherit',
  },
  bannerButtonInner: {
    textTransform: 'uppercase',
    letterSpacing: '1px',
    lineHeight: '32px',
    color: '#3c3c41',
  },
  bannerButtonIcon: {
    position: 'relative',
    top: '1px',
  },
  icon: {
    fill: 'currentColor',
    height: '10px',
    width: '10px',
  },
});
