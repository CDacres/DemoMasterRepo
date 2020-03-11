import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  dropdownButton: {
    background: '#ffffff none repeat scroll 0% 0%',
    textAlign: 'left',
    borderRadius: '2px',
    lineHeight: '18px',
    display: 'block',
    width: '100%',
  },
  dropdownReduced: {
    border: '1px solid #ebebeb',
  },
  dropdownExpanded: {
    borderColor: '#ebebeb #ebebeb #00c6ff',
    borderStyle: 'solid',
    borderWidth: '1px 1px 2px',
    borderImage: 'none 100% / 1 / 0 stretch',
  },
  buttonInnerCount: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  countContainer: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    ':before': {
      zIndex: 10,
    },
  },
  countInnerPopup : {
    fontSize: '17px',
    backgroundColor: '#00c6ff',
    borderColor: '#00c6ff',
    borderRadius: '3px',
    color: '#ffffff',
  },
  chevron_collapse: {
    transform: 'rotate(180deg)',
  },
  dropDownWrapper: {
    background: '#ffffff none repeat scroll 0% 0%',
    position: 'absolute',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15), 0px 0px 0px 1px rgba(0, 0, 0, 0.07)',
    borderRadius: '3px',
    width: '100%',
    minWidth: '280px',
    textAlign: 'left',
    boxSizing: 'border-box',
    zIndex: 2,
    left: '0px',
  },
  closeButton: {
    minWidth: '1px',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    borderRadius: '0px',
    border: '0px none',
    userSelect: 'auto',
    textAlign: 'left',
    color: '#00c6ff',
  },
});
