import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
    minHeight: '1px',
    float: 'none',
    '@media (min-width: 744px)': {
      width: '41.6667%',
    },
  },
  title: {
    marginBottom: '15px',
    fontSize: '145px',
    lineHeight: 1.1,
    letterSpacing: 'normal',
  },
  subtitle: {
    fontWeight: 'normal',
    lineHeight: 1.1,
    marginTop: '25px',
    marginBottom: '15px',
  },
  error: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#767676',
    marginTop: '25px',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  img: {
    border: '0px none',
    verticalAlign: 'middle',
  },
});
