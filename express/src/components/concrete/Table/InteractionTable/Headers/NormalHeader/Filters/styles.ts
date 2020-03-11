import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  form: {
    position: 'relative',
    width: '100%',
    zIndex: 2,
    ':after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: '4px',
      zIndex: 2,
      pointerEvents: 'none',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ebebeb',
    },
  },
  formTypingMode: {
    ':after': {
      borderColor: '#00c6ff',
    },
  },
  inputWrapper: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  sliderWrapper: {
    display: 'table',
    verticalAlign: 'middle',
  },
  sliderContainer: {
    marginRight: '-8px',
  },
  sliderButton: {
    display: 'table',
    appearance: 'none',
    textAlign: 'left',
    userSelect: 'auto',
    border: '0px none',
    minWidth: '1px',
  },
});
