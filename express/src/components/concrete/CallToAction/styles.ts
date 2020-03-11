import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  ctaButton: {
    cursor: 'pointer',
    WebkitTransition: 'background 0.3s, border-color 0.3s',
    MozTransition: 'background 0.3s, border-color 0.3s',
    transition: 'background 0.3s, border-color 0.3s',
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '4px',
    width: 'auto',
    fontSize: '19px',
    lineHeight: '22px',
    letterSpacing: 'undefined',
    fontWeight: 700,
    border: '2px solid transparent',
    minWidth: '77.66563145999496px',
    background: '#00c6ff',
    borderColor: 'transparent',
    ':active': {
      background: '#00c6ff',
      borderColor: 'transparent',
      textDecoration: 'none',
    },
    ':hover': {
      background: '#00c6ff',
      borderColor: 'transparent',
      textDecoration: 'none',
    },
    ':disabled': {
      background: 'rgba(0, 132, 137, 0.3)',
      borderColor: 'transparent',
      cursor: 'default',
      textDecoration: 'none',
    },
  },
  ctaButtonText: {
    WebkitTransition: 'color 0.3s',
    MozTransition: 'color 0.3s',
    transition: 'color 0.3s',
    fontSize: '19px',
    lineHeight: '22px',
    letterSpacing: 'undefined',
    color: '#ffffff',
  },
  ctaContainer: {
    '@media (max-width: 767px)': {
      width: '100%',
      margin: '0px auto',
      marginBottom: '20px',
    },
    '@media (min-width: 768px)': {
      display: 'table',
      width: '85%',
      margin: '0px auto',
    },
    '@media (min-width: 1128px)': {
      maxWidth: '900px',
    },
  },
  ctaImage: {
    '@media (min-width: 768px)': {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '50%',
      height: '100%',
      paddingLeft: '24px',
    },
  },
  ctaSubtitleContainer: {
    overflowWrap: 'break-word',
    fontSize: '22px',
    lineHeight: '28px',
    letterSpacing: '-0.2px',
    fontWeight: 300,
  },
  ctaTextContainer: {
    whiteSpace: 'normal',
    '@media (min-width: 768px)': {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
    '@media (max-width: 767px)': {
      marginBottom: '20px',
    },
  },
  ctaTitleContainer: {
    fontWeight: 700,
    overflowWrap: 'break-word',
    fontSize: '28px',
    lineHeight: '32px',
    letterSpacing: '-0.6px',
    '@media (max-width: 767px)': {
      fontSize: '25px',
      lineHeight: '30px',
    },
  },
  ctaWrapper: {
    '@media (min-width: 768px)': {
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      paddingTop: '48px',
      paddingBottom: '48px',
      marginTop: '24px',
      marginBottom: '24px',
    },
    '@media (max-width: 767px)': {
      borderRadius: '3px',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
      border: '0.5px solid rgba(0, 0, 0, 0.22)',
      padding: '20px',
      marginTop: '8px',
      marginBottom: '8px',
    },
  },
});
