import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  agree: {
    float: 'right',
  },
  semiBold: {
    fontWeight: 600,
    overflowWrap: 'break-word',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 'normal',
  },
  link: {
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
  infoControls: {
    lineHeight: '18px',
  },
  infoControlsInner: {
    color: '#767676',
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
  collapsable: {
    fontSize: '16px',
  },
});
