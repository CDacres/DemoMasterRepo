import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  largeOptionLink: {
    textDecoration: 'none',
    color: '#484848',
    ':hover': {
      textDecoration: 'none',
    },
  },
  carouselContainer: {
    height: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    '@media (min-width: 744px)': {
      width: '100%',
    },
  },
  carouselContainerLarge: {
    width: '272px',
    borderRadius: '16px',
  },
  carouselContainerSmall: {
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'normal',
    width: '130px',
  },
  innerImageWrapper: {
    overflow: 'hidden',
  },
  innerImageWrapperLarge: {
    background: '#484848 none repeat scroll 0% 0%',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  innerImageWrapperSmall: {
    marginTop: '-1px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  threeImgWrapper: {
    paddingBottom: '100%',
    position: 'relative',
  },
  threeImgContainer: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
  },
  threeImgInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mainImgWrapper: {
    height: '100%',
    display: 'inline-block',
    width: '70%',
  },
  sideImgWrapper: {
    height: '100%',
    display: 'inline-block',
    width: '30%',
  },
  sideImgContainer: {
    height: '50%',
  },
  imgInner: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  titleWrapper: {
    color: '#484848',
    textOverflow: 'ellipsis',
    maxHeight: '2.75em',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  textWrapper: {
    color: '#484848',
    textOverflow: 'ellipsis',
    maxHeight: '3.85714em',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
});
