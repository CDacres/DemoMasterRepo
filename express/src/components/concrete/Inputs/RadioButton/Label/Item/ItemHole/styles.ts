import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  input: {
    lineHeight: 'normal',
    height: '100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
  },
  iconWrapper: {
    backgroundColor: '#ffffff',
    color: '#00c6ff',
    borderColor: '#ebebeb',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '50%',
    display: 'inline-block',
    verticalAlign: 'top',
    position: 'relative',
    ':active': {
      boxShadow: '0px 0px 2px 3px #00c6ff',
    },
    ':focus': {
      boxShadow: '0px 0px 2px 3px #00c6ff',
    },
  },
  iconSmall: {
    fontSize: '6px',
    height: '18px',
    width: '18px',
  },
  iconLarge: {
    fontSize: '8px',
    height: '24px',
    marginTop: '-1px',
    width: '24px',
  },
  iconContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
});
