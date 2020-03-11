import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  helpWrapper: {
    display: 'inline-block',
    verticalAlign: '-0.15em',
    marginLeft: '0.4em',
  },
  helpButton: {
    appearance: 'none',
    borderRadius: '50%',
    border: '0px none',
    outline: 'currentColor none 0px',
    margin: '-2px',
    color: 'buttontext',
    minWidth: '1px',
  },
});
