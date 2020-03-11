import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    cursor: 'pointer',
    border: '2px dashed #bbb',
    borderRadius: '4px',
    display: 'grid',
  },
  containerError: {
    borderColor: specs.boxBorderError,
  },
  imgContainer: {
    gridColumn: 1,
    gridRow: 1,
    display: 'grid',
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: 0.1,
  },
  contentContainer: {
    gridColumn: 1,
    gridRow: 1,
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    rowGap: '12px',
    fontSize: '16px',
    fontWeight: 500,
    opacity: 1,
    zIndex: 1,
  },
  buttonContainer: {
    minWidth: '128px',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: specs.primary,
    color: specs.white,
  },
  buttonIcon: {
    width: '1.1em',
    height: '1.1em',
    fill: specs.white,
  },
});
