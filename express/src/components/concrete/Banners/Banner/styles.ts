import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  bannerBodyContainer: {
    height: '260px',
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative',
    '@media (min-width: 768px)': {
      height: '250px',
    },
    '@media (min-width: 1128px)': {
      height: '300px',
    },
  },
  bannerImageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
  },
  bannerDivider: {
    borderRadius: '3px',
    border: 'solid 0.5px rgba(0, 0, 0, 0.05)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  bannerChildContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});
