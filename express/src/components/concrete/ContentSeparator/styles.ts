import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  separator: {
    borderBottom: '1px solid #ebebeb',
    overflow: 'hidden',
    textAlign: 'center',
  },
  withChild: {
    borderBottom: 'none',
  },
  span: {
    position: 'relative',
    padding: '0px 16px',
    ':after': {
      content: '""',
      position: 'absolute',
      borderBottom: '1px solid #ebebeb',
      top: '50%',
      right: '100%',
      width: '5000px',
    },
    ':before': {
      content: '""',
      position: 'absolute',
      borderBottom: '1px solid #ebebeb',
      top: '50%',
      left: '100%',
      width: '5000px',
    },
  },
  text: {
    color: '#767676',
    margin: '0px',
    fontSize: '15px',
    lineHeight: '18px',
    paddingTop: '0px',
    paddingBottom: '0px',
    display: 'inline',
  },
});
