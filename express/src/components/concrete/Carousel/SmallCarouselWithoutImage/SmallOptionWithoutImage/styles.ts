import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  smallOptionNoImageWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    '@media (min-width: 940px)': {
      width: '33.3333%',
    },
    '@media (max-width: 939px) and (min-width: 680px)': {
      width: '50%',
    },
    '@media (max-width: 679px)': {
      width: '100%',
    },
  },
  smallOptionNoImageContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: '6px',
    paddingRight: '6px',
  },
  smallOptionNoImage: {
    width: '100%',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
    textAlign: 'left',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
  },
  smallOptionTable: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  smallOptionTextContainer: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block',
    maxWidth: '250px',
    overflow: 'hidden',
  },
  smallOptionTitleText: {
    '@media screen and (min-width: 1440px)': {
      maxWidth: '330px',
    },
  },
});
