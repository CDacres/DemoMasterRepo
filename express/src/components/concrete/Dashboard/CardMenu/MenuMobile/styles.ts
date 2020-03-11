import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  mobilePageContainer: {
    marginTop: '36px',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  titleMobile: {
    fontSize: '22px',
    lineHeight: '26px',
    letterSpacing: '-0.6px',
  },
  secondButtonContainer: {
    display: 'flex',
    marginLeft: '-4px',
  },
  thirdButtonContainer: {
    flex: '1 1 0%',
  },
  button: {
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: 'normal',
    color: '#484848',
    padding: '7px 15px',
    cursor: 'pointer',
    display: 'inline-block',
    minWidth: '48.541px',
    position: 'relative',
    textAlign: 'center',
    transitionDuration: '0.2s',
    transitionProperty: 'background, border-color, color',
    transitionTimingFunction: 'ease-out',
    width: '100%',
    background: 'transparent',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#b0b0b0',
    textDecoration: 'none',
  },
  buttonText: {
    fontSize: '12px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    fontWeight: 600,
  },
});
