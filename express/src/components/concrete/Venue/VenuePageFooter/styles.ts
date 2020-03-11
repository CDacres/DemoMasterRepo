import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  footerWrapper: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0px 3px 9px 3px rgba(0, 0, 0, 0.05)',
    zIndex: 5,
    borderTop: '1px solid #ebebeb',
    padding: '10px 0px',
    transition: 'background-color 0.25s ease 0s, color 0.25s ease 0s',
    // STYLE FOR TRANSITION
    // borderTop: 'none',
    // backgroundColor: '#0e0e0e',
    // transition: 'backgroundColor 0.25s, color 0.25s',
    // ':before': {
    //   content: '""',
    //   display: 'block',
    //   position: 'absolute',
    //   top: '0px',
    //   width: '100%',
    //   height: '30px',
    //   transform: 'translateY(-100%)',
    //   background: 'linear-gradient(to top, #0e0e0e, transparent)',
    // },
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
  avatar: {
    height: '48px',
    width: '48px',
    display: 'block',
    position: 'relative',
  },
  title: {
    overflowWrap: 'break-word',
    fontSize: '10px',
    fontWeight: 800,
    lineHeight: '1.2em',
    color: '#767676',
    textTransform: 'uppercase',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    '@media (min-width: 744px)': {
      minWidth: '200px',
      maxWidth: '205px',
    },
  },
  footerButton: {
    ':active': {
      backgroundColor: '#00c6ff',
    },
  },
  footerButtonSpan: {
    lineHeight: '1.375em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '2.75em',
    lineClamp: 2,
  },
});
