import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  filterButton: {
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '-0.2px',
    padding: '6px 12px',
    background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0%',
    border: '1px solid #dce0e0',
    minWidth: '1px',
    width: 'auto',
  },
  filterButtonSmall: {
    letterSpacing: '0.2px',
    outline: 'none',
    transition: 'background 0.3s ease 0s, border-color 0.3s ease 0s',
  },
  filterButtonActive: {
    background: '#00c6ff none repeat scroll 0% 0%',
    border: '1px solid #00c6ff',
    ':hover': {
      background: '#00c6ff none repeat scroll 0% 0%',
      borderColor: '#00c6ff',
    },
  },
  filterButtonTextSmall: {
    transition: 'color 0.3s ease-in 0s',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
});
