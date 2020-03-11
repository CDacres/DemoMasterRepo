import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  iconContainer: {
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'fixed',
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: '250ms',
    transitionTimingFunction: 'ease-out',
    zIndex: 8,
    whiteSpace: 'nowrap',
    marginRight: '16px',
    bottom: '16px',
  },
  filterButton: {
    lineHeight: '16px',
    letterSpacing: 'normal',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 800,
    backgroundColor: '#ffffff',
    padding: '8px 16px',
    boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.14)',
    borderRadius: '80px',
    border: 'medium none',
  },
  filterToggleIconContainer: {
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    color: '#484848',
  },
});
