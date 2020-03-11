import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  fullWidth: {
    width: '100%',
    textAlign: 'left',
  },
  tableHeader: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '23px',
    textAlign: 'left',
    borderBottom: '1px solid #e1e4e4',
    margin: '0px -5px 15px',
  },
  innerWrapper: {
    margin: '0px 5px',
  },
  highlightedHeader: {
    color: '#36d7b7',
  },
  highlightedCol: {
    color: '#36d7b7',
  },
  highlightedText: {
    display: 'block',
    margin: '-10px 10px',
    backgroundColor: '#e0f9f4',
  },
  tableHeaderRow: {
    display: 'flex',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  tableBodyRow: {
    display: 'flex',
    padding: '5px 0px',
    textAlign: 'center',
  },
  tableHeaderCol: {
    width: '100%',
    padding: '0px 0px 20px',
    ':first-of-type': {
      textAlign: 'left',
    },
  },
  tableBodyCol: {
    width: '100%',
    padding: '10px 0px',
    fontSize: '16px',
    ':first-of-type': {
      textAlign: 'left',
      fontSize: '16px',
    },
    ':last-of-type': {
      textAlign: 'center',
    },
  },
  collapsable: {
    fontSize: '16px',
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
  tableFooter: {
    margin: '0px -5px',
  },
  eatsWrapper: {
    margin: '0px 5px',
    fontSize: '15px',
  },
  eatIn: {
    margin: '5px 0px',
  },
  unavailable: {
    color: '#d9d9d9',
  },
});
