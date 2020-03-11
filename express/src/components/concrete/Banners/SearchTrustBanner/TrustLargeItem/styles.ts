import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  trustLargeContainer: {
    '@media (min-width: 1128px)': {
      maxWidth: '430px',
    },
  },
  trustLargeText: {
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
  },
});
