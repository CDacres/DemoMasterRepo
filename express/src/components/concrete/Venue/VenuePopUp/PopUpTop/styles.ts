import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    width: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1,
    borderBottom: '1px solid #ebebeb',
  },
  closeButton: {
    margin: '-16px',
  },
  closeButtonIcon: {
    fill: 'currentColor',
  },
});
