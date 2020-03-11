import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  priceLabel: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 'normal',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ebebeb',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    position: 'relative',
    zIndex: 0,
  },
  currencyWrapper: {
    fontWeight: 600,
    paddingLeft: '11px',
    visibility: 'visible',
    height: '46px',
  },
  currencyContainer: {
    display: 'table',
    position: 'relative',
    height: '100%',
  },
  numberWrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  numberContainer: {
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 'normal',
    padding: '11px',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    border: '0px none',
    width: '100%',
  },
});
