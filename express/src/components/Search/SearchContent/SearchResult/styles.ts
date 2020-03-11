import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  resultCardHead: {
    width: '100%',
    position: 'relative',
    zIndex: 0,
  },
  resultContainer: {
    display: 'inline-block',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    width: '100%',
  },
  resultContainerWithMap: {
    '@media (min-width: 744px)': {
      width: '50%',
    },
    '@media (min-width: 1440px)': {
      width: '33.3333%',
    },
  },
  resultContainerWithoutMap: {
    '@media (min-width: 744px)': {
      width: '50%',
    },
    '@media (min-width: 1128px)': {
      width: '25%',
    },
    '@media (min-width: 1440px)': {
      width: '20%',
    },
  },
  resultContainerInner: {
    width: '100%',
    height: '100%',
  },
  resultCard: {
    position: 'relative',
    background: '#ffffff none repeat scroll 0% 0%',
    color: '#484848',
    height: '100%',
  },
});
