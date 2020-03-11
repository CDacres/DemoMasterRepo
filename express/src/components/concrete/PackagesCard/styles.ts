import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timeSeparator: {
    color: '#ebebeb',
  },
  priceButton: {
    '@media (max-width: 743px)': {
      width: '100%',
    },
  },
  priceExtras: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 743px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  priceExtraLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  priceIcon: {
    verticalAlign: 'middle',
  },
  priceExtraRight: {
    display: 'flex',
    flex: '0 0 auto',
    textAlign: 'center',
  },
  priceExtraSmallTable: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  collapsable: {
    fontSize: '16px',
    display: 'block',
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
  collapse: {
    height: 'auto',
    overflow: 'visible',
  },
  collapseTitle: {
    fontWeight: 700,
  },
  condensedRow: {
    display: 'flex',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  condensedDots: {
    flex: 1,
    borderBottom: '1px dotted #b3b3b3',
  },
});
