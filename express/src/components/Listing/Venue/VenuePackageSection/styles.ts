import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  packageRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '-8px',
    marginLeft: '-8px',
    marginRight: '-8px',
  },
  packageContainer: {
    height: '218px',
    '@media (min-width: 744px)': {
      width: '33.3333%',
    },
    '@media (min-width: 1128px)': {
      width: '25%',
    },
  },
});
