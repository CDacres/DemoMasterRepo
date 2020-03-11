import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cardsGridFooterContainer: {
    display: 'inline-block',
    textAlign: 'left',
    width: '100%',
  },
  cardsGridFooterButton: {
    background: 'transparent',
    color: '#00c6ff',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '14px',
    textAlign: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: '100%',
    '@media (min-width: 768px)': {
      padding: '4px 0px',
      textAlign: 'left',
      width: 'auto',
    },
    '@media (max-width: 767px)': {
      border: '1px solid #00c6ff',
      borderRadius: '4px',
    },
  },
  cardsGridFooterButtonText: {
    letterSpacing: '0.2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '@media (min-width: 768px)': {
      display: 'inline',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '22px',
      marginRight: '6px',
    },
    '@media (max-width: 767px)': {
      display: 'block',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '18px',
    },
  },
  cardsGridFooterButtonCaret: {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'inline',
    },
  },
  icon: {
    height: '10px',
    width: '10px',
    fill: 'currentColor',
  },
});
