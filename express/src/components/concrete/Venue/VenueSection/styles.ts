import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  sectionWrapper: {
    ':before': {
      content: '""',
      display: 'flex',
    },
    ':after': {
      content: '""',
      display: 'flex',
    },
  },
  topContainer: {
    position: 'relative',
    width: '100vw',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    left: '50%',
    right: '50%',
  },
  sectionContainer: {
    display: 'flex',
  },
  sectionContainerHorizontal: {
    flexDirection: 'row',
    '@media (max-width: 743px)': {
      flexDirection: 'column',
    },
  },
  sectionContainerVertical: {
    flexDirection: 'column',
  },
});
