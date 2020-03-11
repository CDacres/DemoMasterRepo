import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  carouselButton: {
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '25%',
    minWidth: '1px',
    pointerEvents: 'auto',
    borderWidth: '0px',
    borderStyle: 'initial',
    borderColor: 'initial',
    borderImage: 'initial',
    padding: '0px',
    ':active': {
      outline: '0px',
    },
    ':focus': {
      outline: '0px',
    },
  },
  carouselButton_hidden: {
    width: '5%',
  },
  carouselButton_next: {
    right: '0px',
    background: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 100%)',
  },
  carouselButton_prev: {
    left: '0px',
    background: 'linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.25) 100%)',
  },
  carouselButtonInner: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  carouselButtonInner_next: {
    right: '16px',
  },
  carouselButtonInner_prev: {
    left: '16px',
  },
});
