import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  location: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  avatarSize: {
    height: '48px',
    width: '48px',
  },
  link: {
    color: 'inherit',
    display: 'inline-block',
    textDecoration: 'none',
  },
  owner: {
    lineHeight: '18px',
    textAlign: 'center',
  },
  summaryText: {
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '18px',
    letterSpacing: 'normal',
  },
});
