import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wizardBar_segment: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    height: '56px',
    backgroundColor: '#efefef',
    color: '#737373',
    cursor: 'pointer',
    zIndex: 0,
    ':first-child': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
    ':first-child > div': {
      paddingLeft: '12px',
    },
    ':last-child': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      ':after': {
        display: 'none',
      },
      ':before': {
        display: 'none',
      },
    },
  },
  wizardBar_segmentInner: {
    flex: 'none',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  wizardBar_segmentInner_incompleteText: {
    color: '#cf0446',
  },
  wizardBar_segment_current: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    height: '56px',
    backgroundColor: '#00c6ff',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 1,
    ':first-child': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
    ':first-child > div': {
      paddingLeft: '12px',
    },
    ':last-child': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      ':after': {
        display: 'none',
      },
      ':before': {
        display: 'none',
      },
    },
    ':after': {
      content: '""',
      position: 'absolute',
      top: '18px',
      right: '-20px',
      backgroundColor: '#00c6ff',
      borderRadius: '4px',
      borderRight: '2px solid transparent',
      borderTop: '2px solid transparent',
      height: '42px',
      width: '42px',
      marginTop: '-11px',
      marginLeft: '12px',
      transform: 'rotate(45deg)',
    },
    ':before': {
      content: '""',
      position: 'absolute',
    },
  },
});
