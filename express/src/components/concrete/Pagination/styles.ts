import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  paginateWrapper: {
    position: 'relative',
    width: '100%',
    zIndex: 0,
    '@media (min-width: 1128px)': {
      width: '66%',
    },
  },
  paginateContainer: {
    margin: '20px',
    textAlign: 'center',
  },
  pagination: {
    listStyle: 'none',
  },
  listItem: {
    width: '32px',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  break: {
    transform: 'translateY(-0.2em)',
  },
  arrowButton: {
    height: '32px',
    width: '32px',
    position: 'relative',
    border: '1px solid #00c6ff',
    borderRadius: '50%',
    fontSize: '0.75em',
    color: '#00c6ff',
    cursor: 'pointer',
  },
  page: {
    color: '#00c6ff',
    borderRadius: '50%',
  },
  pageLink: {
    backgroundColor: 'transparent',
    border: 'medium none',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'currentColor none medium',
  },
  active: {
    backgroundColor: '#00c6ff',
  },
  activeLink: {
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});
