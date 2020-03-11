import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  labelInnerWrapper: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  labelInputWrapper: {
    position: 'relative',
    top: '2px',
  },
  labelInputContainer: {
    display: 'inline-block',
    cursor: 'pointer',
  },
  checkboxInput: {
    position: 'absolute',
    width: '0px',
    opacity: 0,
    ':focus + [data-style-default="true"]': {
      boxShadow: '0px 0px 2px 2px #00c6ff',
      outline: 'currentColor none medium',
    },
    ':focus + [data-fake-checkbox]': {
      zIndex: 1,
    },
  },
  fakeCheckbox: {
    height: '18px',
    width: '18px',
    display: 'inline-block',
    textAlign: 'center',
    background: '#ffffff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ebebeb',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  fakeMobileCheckbox: {
    height: '22px',
    width: '22px',
    borderRadius: '4px',
  },
  fakeCheckboxChecked: {
    backgroundColor: '#00c6ff',
    borderColor: '#00c6ff',
  },
  fakeCheckBoxDisabled: {
    backgroundColor: '#f2f2f2',
    borderColor: '#d8d8d8',
    color: '#d8d8d8',
  },
  fakeCheckboxCheckmark: {
    position: 'relative',
    display: 'inline-block',
    left: '-1px',
    margin: '-8px',
    verticalAlign: 'top',
    fontSize: '32px',
  },
  fakeCheckboxCheckmarkSvg: {
    height: '1em',
    width: '1em',
    display: 'block',
    overflow: 'visible',
  },
  labelCellInner: {
    fontWeight: 'normal',
    cursor: 'pointer',
  },
  labelTextWrapper: {
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  labelTextMobileWrapper: {
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: 'normal',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  labelSubtext: {
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: 'normal',
    display: 'block',
  },
});
