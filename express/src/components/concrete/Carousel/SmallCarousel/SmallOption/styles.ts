import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  smallOptionLink: {
    display: 'flex',
  },
  smallOption: {
    backgroundColor: 'transparent',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
    float: 'left',
    textAlign: 'left',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderImage: 'initial',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  smallOptionWidthSmallScreen: {
    width: '140px',
  },
  smallOptionTable: {
    display: 'table',
    width: '100%',
    height: '100%',
    borderSpacing: '0px',
  },
  smallOptionImageWrapper: {
    width: '96px',
    height: '72px',
    minHeight: '100%',
    overflow: 'auto',
    background: '#484848',
  },
  smallOptionImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  cardImageSmall: {
    width: '96px',
    height: '72px',
  },
  smallOptionTextNormal: {
    padding: '14px 16px 10px',
  },
  smallOptionTextContainer: {
    color: '#484848',
  },
  smallOptionTextInner: {
    letterSpacing: '0px',
    overflowWrap: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  smallOptionTextSizeSubtitle: {
    '@media (min-width: 1128px)': {
      fontSize: '16px',
      lineHeight: '16px',
    },
  },
  smallOptionTextSizeNormal: {
    '@media (min-width: 1128px)': {
      fontSize: '17px',
      lineHeight: '21px',
    },
  },
  smallOptionSubtitleWrapper: {
    color: '#767676',
  },
  smallOptionImageWrapperSmallScreen: {
    contain: 'strict',
    position: 'relative',
    width: '100%',
    zIndex: 0,
    paddingTop: '56.25%',
    background: '#484848',
  },
  smallOptionImageContainerSmallScreen: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    height: '100%',
    width: '100%',
  },
  smallOptionTextWrapperSmallScreen: {
    whiteSpace: 'normal',
    minHeight: '56px',
  },
  smallOptionTextWrapperSmallScreenNormal: {
    padding: '10px',
  },
  optionWidth6: {
    '@media (min-width: 1720px)': {
      width: '16.6667%',
    },
    '@media (min-width: 1460px) and (max-width: 1719px)': {
      width: '20%',
    },
    '@media (min-width: 1200px) and (max-width: 1459px)': {
      width: '25%',
    },
    '@media (min-width: 940px) and (max-width: 1199px)': {
      width: '33.3333%',
    },
    '@media (max-width: 939px)': {
      width: '50%',
    },
  },
  optionWidth5: {
    '@media (min-width: 1460px)': {
      width: '20%',
    },
    '@media (min-width: 1200px) and (max-width: 1459px)': {
      width: '25%',
    },
    '@media (min-width: 940px) and (max-width: 1199px)': {
      width: '33.3333%',
    },
    '@media (max-width: 939px)': {
      width: '50%',
    },
  },
  optionWidth4: {
    '@media (min-width: 1440px)': {
      width: '25%',
    },
    '@media (min-width: 1128px) and (max-width: 1439px)': {
      width: '25%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      width: '33.3333%',
    },
  },
  optionWidth3: {
    '@media (min-width: 1440px)': {
      width: '33.3333%',
    },
    '@media (min-width: 1128px) and (max-width: 1439px)': {
      width: '33.3333%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      width: '33.3333%',
    },
  },
});
