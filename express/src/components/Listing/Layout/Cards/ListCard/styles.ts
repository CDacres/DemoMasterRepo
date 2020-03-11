import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    border: specs.boxBorder,
    transition: 'border-color 300ms ease-in-out',
    borderWidth: '2px',
  },
  selected: {
    borderColor: specs.primary,
    borderWidth: '2px',
  },
  area: {
    display: 'grid',
    gridColumnGap: '16px',
  },
  text: {
    fontSize: '16px',
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.26)',
  },
  first: {
    borderRadius: '3px 3px 0px 0px',
  },
  last: {
    borderRadius: '0px 0px 3px 3px',
    borderBottom: specs.boxBorder,
    borderWidth: '2px',
  },
});
