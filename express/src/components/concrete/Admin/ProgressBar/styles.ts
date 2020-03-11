import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    marginBottom: '90px',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (min-width: 744px)': {
      width: '720px',
      maxWidth: '100%',
    },
    '@media (min-width: 1128px)': {
      width: '1140px',
      maxWidth: '100%',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: '-15px',
    marginLeft: '-15px',
    '@media (min-width: 744px)': {
      marginRight: '-15px',
      marginLeft: '-15px',
    },
    '@media (min-width: 1128px)': {
      marginRight: '-15px',
      marginLeft: '-15px',
    },
  },
  inner: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 0,
    boxFlex: 1,
    flexPositive: 1,
    flexGrow: 1,
    maxWidth: '100%',
    '@media (min-width: 744px)': {
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    '@media (min-width: 1128px)': {
      paddingRight: '15px',
      paddingLeft: '15px',
    },
  },
  list: {
    marginTop: '50px',
    marginBottom: '50px',
    counterReset: 'step',
    paddingInlineStart: 0,
  },
  defaultWidth: {
    width: '14.28%',
  },
  listItem: {
    listStyleType: 'none',
    float: 'left',
    fontSize: '12px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#7d7d7d',
    ':before': {
      width: '15px',
      height: '15px',
      content: '""',
      lineHeight: '30px',
      border: '2px solid #7d7d7d',
      backgroundColor: '#7d7d7d',
      display: 'block',
      textAlign: 'center',
      margin: '0px auto 10px auto',
      borderRadius: '50%',
      transition: 'all 0.8s',
    },
    ':after': {
      width: '100%',
      height: '2px',
      content: '""',
      position: 'absolute',
      backgroundColor: '#7d7d7d',
      top: '7px',
      left: '-50%',
      zIndex: -1,
      transition: 'all 0.8s',
    },
    ':first-child:after': {
      content: 'none',
    },
  },
  listItemActive: {
    ':before': {
      borderColor: '#00c6ff',
      backgroundColor: '#00c6ff',
      transition: 'all 0.8s',
    },
    ':after': {
      backgroundColor: '#00c6ff',
      transition: 'all 0.8s',
    },
  },
  textActive: {
    color: '#00c6ff',
  },
  button: {
    border: '0px none',
    fontSize: '12px',
    lineHeight: '17.16px',
    color: '#7d7d7d',
  },
});
