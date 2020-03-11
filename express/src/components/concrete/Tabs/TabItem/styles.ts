import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  tabButton: {
    fontWeight: 600,
    backgroundColor: 'transparent',
    borderRadius: '0px',
    borderWidth: '0px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    bottom: '-1px',
    display: 'block',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    minWidth: '1px',
    outline: 'none',
  },
  active: {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    color: '#00c6ff',
    transitionProperty: 'color',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
  },
  notActive: {
    borderColor: 'transparent',
    color: '#484848',
  },
});
