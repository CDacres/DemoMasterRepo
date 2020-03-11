import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    textAlign: 'right',
  },
  button: {
    height: '45px',
  },
  stepContainer: {
    listStyleType: 'none',
    padding: '0px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: specs.borderRadius,
    '@media (min-width: 744px)': {
      display: 'flex',
      textAlign: 'center',
    },
  },
  backDiv: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    transform: 'scale(0.5)',
    fill: specs.primary,
    height: '18px',
    width: '18px',
    margin: '0px 8px 0px 0px',
  },
});
