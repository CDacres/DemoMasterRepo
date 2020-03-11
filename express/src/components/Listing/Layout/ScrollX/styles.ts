import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    display: 'grid',
    justifyItems: 'stretch',
    overflow: 'hidden',
    gridColumnTemplate: '1fr',
    gridRowTemplate: 'auto',
  },
  overlay: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 1,
    pointerEvents: 'none',
  },
  scroll: {
    gridColumn: 1,
    gridRow: 1,
  },
  none: {},
  start: {
    boxShadow: '-6px 0px 6px -6px black inset',
  },
  middle: {
    boxShadow: '-6px 0px 6px -6px black inset, 6px 0px 6px -6px black inset',
  },
  end: {
    boxShadow: '6px 0px 6px -6px black inset',
  },
});
