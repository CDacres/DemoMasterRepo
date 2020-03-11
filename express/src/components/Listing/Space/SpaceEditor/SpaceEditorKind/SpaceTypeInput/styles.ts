import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    borderRadius: specs.borderRadius,
    marginBottom: '16px',
  },
  area: {
    gridTemplateColumns: 'auto 1fr auto',
  },
  iconDisabled: {
    opacity: 0.26,
  },
  icon: {
    width: '32px',
    height: '32px',
    margin: '24px 0px 24px 24px',
  },
  image: {
    width: '96px',
    height: '96px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  },
});
