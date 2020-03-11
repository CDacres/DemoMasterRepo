import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  bannerWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  bannerContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
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
  bannerTitle: {
    fontWeight: 300,
    '@media (max-width: 767px)': {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.6px',
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
    textTransform: 'uppercase',
    fontSize: '14px',
    ':active': {
      background: '#e2e2e2 none repeat scroll 0% 0%',
      borderColor: 'transparent',
      color: '#484848',
    },
  },
  bannerButtonInner: {
    overflowWrap: 'break-word',
    fontWeight: 900,
    lineHeight: '1.3333em',
  },
  bannerButtonIcon: {
    position: 'relative',
    top: '2px',
  },
  icon: {
    fill: 'currentColor',
    height: '1em',
    width: '1em',
  },
});
