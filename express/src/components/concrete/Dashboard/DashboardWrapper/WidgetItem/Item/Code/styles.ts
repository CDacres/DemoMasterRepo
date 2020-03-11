import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  codeWrapper: {
    width: '50%',
    '@media (max-width: 743px)': {
      display: 'block',
      width: '100%',
    },
  },
  pre: {
    borderRadius: '2px',
    backgroundColor: '#ffffff',
    padding: '1em',
    display: 'block',
    margin: '0px 0px 10px',
    fontSize: '13px',
    lineHeight: '1.42857143',
    color: '#333',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    border: '1px solid #ccc',
  },
  code: {
    fontSize: 'inherit',
    color: 'inherit',
    whiteSpace: 'pre-wrap',
    backgroundColor: 'transparent',
    borderRadius: '0px',
  },
});
