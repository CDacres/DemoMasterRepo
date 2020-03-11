import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  zipcubeIcon: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    verticalAlign: 'middle',
  },
  zipcubeLogoSvgHiddenSmall: {
    height: '50px',
    width: '110px',
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  },
  zipcubeLogoSvg: {
    height: '50px',
    width: '110px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});
