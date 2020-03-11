import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  buttonText: {
    transition: 'color 0.2s',
    fontSize: '19px',
    lineHeight: '22px',
    letterSpacing: 'undefined',
    color: '#00c6ff',
  },
});

const buttonColorStyles = StyleSheet.create({
  primary: {
    background: '#00c6ff',
    borderColor: 'transparent',
  },
  success: {
    backgroundColor: '#46d633',
    borderColor: 'transparent',
  },
  warning: {
    backgroundColor: '#ffc020',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: '#f7462b',
    borderColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  grey: {
    backgroundColor: 'rgba(48, 48, 48, 0.5)',
    borderColor: 'transparent',
  },
  black: {
    backgroundColor: 'transparent',
    borderColor: '#ffffff',
  },
  white: {
    backgroundColor: 'transparent',
    borderColor: '#484848',
  },
  whiteNoBorder: {
    backgroundColor: '#ffffff',
    borderColor: 'transparent',
  },
});

const buttonStyles = StyleSheet.create({
  updated: {
    width: 'auto',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 'normal',
    padding: '10px 22px',
    fontWeight: 800,
    borderWidth: '2px',
    boxShadow: 'none',
    ':disabled': {
      background: 'rgba(0, 198, 255, 0.3)',
    },
  },
});

const spanColorStyles = StyleSheet.create({
  primary: {
    color: '#ffffff',
  },
  success: {
    color: '#ffffff',
  },
  warning: {
    color: '#ffffff',
  },
  danger: {
    color: '#ffffff',
  },
  link: {},
  grey: {
    color: '#ffffff',
  },
  black: {
    color: '#484848',
  },
  white: {
    color: '#484848',
  },
  whiteNoBorder: {
    color: '#484848',
  },
});

const spanStyles = StyleSheet.create({
  updated: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 'normal',
    fontWeight: 'inherit',
  },
});

export {
  buttonColorStyles,
  buttonStyles,
  spanColorStyles,
  spanStyles,
};
