import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  itemWrapper: {
    display: 'inline-block',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ffffff',
    borderRadius: '6px',
    transition: 'border-color 0.3s ease 0s',
    padding: '3px',
    outline: 'none',
    ':focus': {
      borderColor: 'rgba(0, 0, 0, 0.42)',
    },
    ':hover': {
      borderColor: 'rgba(0, 0, 0, 0.42)',
    },
    ':active': {
      borderColor: 'rgba(0, 0, 0, 0.42)',
    },
  },
  itemContainer: {
    cursor: 'pointer',
    listStyleType: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.16)',
  },
  itemContainerSelected: {
    backgroundColor: '#00c6ff',
    borderColor: '#00c6ff',
  },
  itemTitleSelected: {
    color: '#ffffff',
  },
});
