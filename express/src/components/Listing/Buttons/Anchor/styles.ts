import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  a: {
    fontSize: '16px',
    textDecoration: 'none',
    color: specs.primary,
    cursor: 'pointer',
    ':hover': {
      color: specs.primary,
    },
    ':visited': {
      color: specs.primary,
    },
  },
  red: {
    color: specs.error,
    ':hover': {
      color: specs.error,
    },
    ':visited': {
      color: specs.error,
    },
  },
});
