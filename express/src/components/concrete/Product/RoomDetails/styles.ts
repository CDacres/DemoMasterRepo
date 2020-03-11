import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  responsive: {
    fontSize: '16px',
  },
  detailsText: {
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
  },
  chevron: {
    fill: 'currentColor',
    height: '10px',
    width: '10px',
    transition: 'all 0.3s',
  },
  chevron_collapse: {
    transform: 'rotate(180deg)',
    transition: 'all 0.3s',
  },
  textContainer: {
    height: '112px',
    overflow: 'hidden',
    transition: 'height 0.3s linear',
  },
  collapsable: {
    fontSize: '16px',
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
  collapse: {
    height: 'auto',
  },
  contactButton: {
    fontSize: '14px',
  },
  contactButtonSpan: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
  },
});
