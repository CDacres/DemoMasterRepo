import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'block',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
    '@media (min-width: 1128px)': {
      display: 'table',
    },
  },
  radioDefault: {
    borderColor: '#ebebeb',
  },
  radioSelected: {
    borderColor: '#00c6ff',
  },
  priceWrapper: {
    fontWeight: 'normal',
    display: 'block',
    whiteSpace: 'nowrap',
    '@media (min-width: 744px)': {
      display: 'table-cell',
      verticalAlign: 'top',
      textAlign: 'right',
      whiteSpace: 'normal',
    },
  },
  text: {
    lineHeight: '22px',
    letterSpacing: 'normal',
    fontWeight: 'normal',
  },
});
