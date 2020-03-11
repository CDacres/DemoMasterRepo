import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  offerWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    '@media (max-width: 767px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  overflowWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  extendedUntil: {
    fontWeight: 600,
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
  },
  minOrder: {
    display: 'block',
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
  },
  promotionRibbon: {
    background: '#ff5c67',
    height: '30px',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 600,
    letterSpacing: '.07em',
    lineHeight: 3,
    position: 'absolute',
    width: '200px',
    top: '24px',
    right: '-60px',
    textAlign: 'center',
    '-webkit-transform': 'rotate(45deg)',
    transform: 'rotate(45deg)',
  },
  promotionDays: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    backgroundColor: '#ccc',
    borderRadius: '3px',
    color: '#fff',
    fontWeight: 700,
    height: '18px',
    lineHeight: '1.5em',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '34px',
    display: 'inline',
    fontSize: '12px',
  },
  available: {
    backgroundColor: '#36d7b7',
    color: '#fff',
  },
});
