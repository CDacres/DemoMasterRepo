import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cols: {
    position: 'relative',
    minHeight: '1px',
    float: 'left',
    padding: '0px',
  },
  cols3: {
    width: '100%',
    '@media (min-width: 768px)': {
      width: '33.3333%',
    },
  },
  cols5: {
    '@media (min-width: 768px)': {
      width: '33.3333%',
    },
    '@media (min-width: 992px)': {
      width: '20%',
    },
  },
  title: {
    color: '#ccc',
    lineHeight: '1.3em',
    margin: '0em 1em 0.4em 0em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontWeight: 400,
  },
  subtitle: {
    fontSize: '14px',
    color: '#ccc',
    lineHeight: '0.7em',
    margin: '0em 0em 2em 0em',
  },
  noSubtext: {
    margin: '5px 0px',
  },
});
