import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  carouselWrapper: {
    marginLeft: '-24px',
    marginRight: '-24px',
    overflowY: 'hidden',
  },
  carouselWrapperDesktop: {
    '@media (min-width: 744px)': {
      marginLeft: '-8px',
      marginRight: '-8px',
      overflow: 'hidden',
    },
  },
  carouselContainer: {
    transition: '-ms-transform 0.5s, -webkit-transform 0.5s, transform 0.5s',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    padding: '0px 18px 30px',
    marginBottom: '-30px',
  },
  carouselFlex: {
    display: 'flex',
  },
  carouselContainerDesktop: {
    '@media (min-width: 744px)': {
      overflow: 'visible',
    },
    '@media (min-width: 1128px)': {
      overflow: 'visible',
    },
  },
  carouselContainerMobile: {
    '@media (min-width: 744px)': {
      padding: '0px 16px 30px',
    },
  },
});
