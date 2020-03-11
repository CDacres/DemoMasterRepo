import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  name: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '1.44em',
  },
  separator: {
    color: '#ebebeb',
  },
  openingHours: {
    fontSize: '18px',
    fontWeight: 300,
    lineHeight: '1.44em',
  },
  duration: {
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '1.375em',
  },
  tip: {
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '1.375em',
  },
  priceContainer: {
    minWidth: '200px',
  },
  monthMin: {
    display: 'grid',
    gridColumn: 1,
    gridRowGap: '12px',
  },
  footerText: {
    fontSize: '14px',
    fontWeight: 300,
    cursor: 'pointer',
  },
  footerTextPrimary: {
    color: specs.primary,
  },
  footerTextError: {
    color: specs.error,
  },
});
