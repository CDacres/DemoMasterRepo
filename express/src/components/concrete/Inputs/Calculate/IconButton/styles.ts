import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  signButton: {
    lineHeight: 1,
    height: '32px',
    width: '32px',
    boxShadow: 'none',
    borderRadius: '50%',
    minWidth: '1px',
    ':disabled': {
      borderColor: 'rgba(0, 198, 255, 0.3)',
    },
  },
  signContainer: {
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '16px',
  },
  signContainerEnabled: {
    color: '#00c6ff',
  },
  signContainerDisabled: {
    color: 'rgba(0, 198, 255, 0.3)',
  },
});
