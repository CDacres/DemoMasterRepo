import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  textGridContainer: {
    '@media (min-width: 768px)': {
      width: '33.3333%',
      float: 'left',
    },
  },
  cardContainerInner: {
    width: '100%',
    height: '100%',
    '@media (min-width: 768px)': {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cardTextWrapper: {
    '@media (min-width: 768px)': {
      width: '91.6667%',
      float: 'left',
    },
  },
  cardTextTitleWrapper: {
    '@media (min-width: 768px)': {
      marginTop: '48px',
      marginBottom: '24px',
    },
    '@media (max-width: 767px)': {
      marginTop: '24px',
      marginBottom: '16px',
    },
  },
  cardTextTitle: {
    fontWeight: 700,
    '@media (min-width: 768px)': {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '-0.6px',
      paddingTop: '2px',
      paddingBottom: '2px',
    },
    '@media (max-width: 767px)': {
      fontSize: '22px',
      lineHeight: '28px',
      letterSpacing: '-0.2px',
      paddingTop: '0px',
      paddingBottom: '0px',
    },
  },
  cardTextText: {
    overflowWrap: 'break-word',
    fontSize: '19px',
    lineHeight: '24px',
    letterSpacing: 'undefined',
    color: '#484848',
    fontWeight: 300,
  },
});
