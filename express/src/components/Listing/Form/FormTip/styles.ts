import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  tip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 300,
    color: specs.primary,
    marginTop: '8px',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
