import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  tourThisSpaceBox: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
  },
  tourThisSpace: {
    '-webkit-transition-property': 'background, border-color, color',
    '-moz-transition-property': 'background, border-color, color',
    transitionProperty: 'background, border-color, color',
    '-webkit-transition-duration': '0.2s',
    transitionDuration: '0.2s',
    '-webkit-transition-timing-function': 'ease-out',
    transitionTimingFunction: 'ease-out',
    transition: 'all 0.15s linear',
    fontSize: '14px',
    lineHeight: '18px',
    padding: '8px 16px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
    background: '#ffffff',
    borderColor: 'transparent',
    ':active': {
      background: '#e2e2e2',
    },
    ':disabled': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
    ':-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
    ':focus :-moz-focus-inner': {
      border: '1px dotted #000000',
    },
  },
  buttonText: {
    margin: '0px',
    overflowWrap: 'break-word',
    lineHeight: '16px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#484848',
    fontWeight: 900,
  },
  touring: {
    position: 'relative',
    margin: '0px',
  },
  wrapper: {
    position: 'relative',
    '@media (min-width: 768px)': {
      margin: '0px 24px',
    },
  },
  asideImagesContainer: {
    height: '0px',
    '@media (min-width: 768px)': {
      width: '50%',
      float: 'left',
    },
  },
  mainImage: {
    '@media (min-width: 768px)': {
      width: '50%',
      float: 'left',
    },
  },
  mainImageButton: {
    background: 'transparent',
    border: '0px none',
    textAlign: 'left',
    padding: '0px',
    width: '100%',
    height: '100%',
  },
  asideImageRow: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: '204.5px',
    marginBottom: '16px',
    position: 'relative',
    '@media (min-width: 768px)': {
      height: '326.4px',
    },
  },
  asideNoImages: {
    padding: '40px',
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
  asideNoImagesTitle: {
    fontWeight: 'normal',
    fontSize: '28px',
    lineHeight: '34px',
    maxHeight: '204px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (min-width: 1128px)': {
      fontSize: '40px',
      lineHeight: '46px',
      maxHeight: '322px',
    },
  },
  asideNoImagesReview: {
    fontSize: '22px',
    lineHeight: '32px',
    letterSpacing: '-0.2px',
  },
  asideNoImagesReviewText: {
    fontStyle: 'italic',
  },
  asideNoImagesReviewPerson: {
    fontWeight: 'bold',
  },
  spacer: {
    height: '44px',
    width: '85.41px',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    height: '425px',
    '@media (min-width: 768px)': {
      height: '668.8px',
    },
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonsWrapper: {
    position: 'absolute',
    top: '32px',
    right: '24px',
    '@media (min-width: 768px)': {
      top: '24px',
    },
  },
  buttonsContainer: {
    whiteSpace: 'nowrap',
    lineHeight: 0,
  },
});
