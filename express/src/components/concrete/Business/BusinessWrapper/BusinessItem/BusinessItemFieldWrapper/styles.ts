import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    transition: 'height 0.5s ease 0s',
  },
  wrapperClosed: {
    height: '48px',
  },
  wrapperOpen: {
    height: '86px',
  },
  wrapperMultiClosed: {
    height: '0px',
  },
  wrapperMultiOpen: {
    height: '704px',
  },
  container: {
    position: 'relative',
    opacity: 1,
    transition: 'none 0s ease 0s',
  },
});
