import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  checkboxContainer: {
    height: '62px',
    overflow: 'hidden',
  },
  checkboxContainerMobile: {
    height: '0px',
    overflow: 'hidden',
  },
  collapse: {
    transform: 'translateY(0px)',
    opacity: 1,
    transition: '-ms-transform 304ms ease-out 0s, -webkit-transform 304ms ease-out 0s, transform 304ms ease-out 0s, opacity 304ms ease-out 0s',
    height: 'auto',
  },
  collapsable: {
    overflowWrap: 'break-word',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'normal',
    border: '0px none',
    borderRadius: '0px',
    textAlign: 'left',
    userSelect: 'auto',
    minWidth: '1px',
  },
  chevron: {
    fill: 'currentColor',
    height: '10px',
    width: '10px',
    transition: 'all 0.1s',
  },
  chevron_collapse: {
    transform: 'rotate(180deg)',
    transition: 'all 0.1s',
  },
  wrapper: {
    display: 'block',
    width: '100%',
    background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0%',
    color: 'inherit',
    border: 'medium none',
    font: 'inherit',
    textAlign: 'left',
    borderRadius: '0px',
  },
  smallButton: {
    color: '#00c6ff',
    borderWidth: '0px',
    borderStyle: 'none',
    borderRadius: '0px',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textAlign: 'left',
    minWidth: '1px',
  },
});
