import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  chevronWrapper: {
    color: '#767676',
    display: 'inline-block',
    fontSize: '9px',
    transition: 'color 1s ease 0s',
  },
  chevronContainer: {
    transitionProperty: 'transform',
    transitionDuration: '250ms',
    transitionTimingFunction: 'ease-in-out',
  },
});
