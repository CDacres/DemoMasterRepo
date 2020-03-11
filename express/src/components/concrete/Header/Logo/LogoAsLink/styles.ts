import { StyleSheet } from 'aphrodite/no-important';
import global from '@styles';

export default StyleSheet.create({
  menuIndicator: {
    backgroundColor: '#ffffff',
    bottom: '0px',
    height: '100%',
    left: '0px',
    position: 'fixed',
    right: '0px',
    top: '0px',
    zIndex: 10,
    transform: 'translateY(-100%)',
    transitionDuration: '0.2s',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
  },
  content: {
    height: '64px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    transition: '0.25s color',
    whiteSpace: 'nowrap',
    '@media (min-width: 744px)': {
      height: '80px',
    },
    display: 'table-cell',
    verticalAlign: 'middle',
    ...global.padding.leftright_3,
  },
  contentIconInner: {
    display: 'inline-block',
    fontSize: '34px',
    transition: 'color 0.25s ease 0s',
  },
});
