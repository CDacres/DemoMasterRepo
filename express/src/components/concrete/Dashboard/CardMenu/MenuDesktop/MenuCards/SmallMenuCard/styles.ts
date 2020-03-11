import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  smallCardaccountLink: {
    display: 'block',
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#484848',
    '@media (max-width: 743px)': {
      margin: '6px 0px',
      padding: '20px 5px',
      textAlign: 'center',
    },
  },
});
