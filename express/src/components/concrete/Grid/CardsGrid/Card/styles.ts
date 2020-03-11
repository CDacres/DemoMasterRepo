import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cardContainerInner: {
    width: '100%',
    height: '100%',
    paddingTop: '8px',
    paddingBottom: '12px',
    paddingLeft: '6px',
    paddingRight: '6px',
    '@media (min-width: 768px)': {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cardContainer: {
    display: 'inline-block',
    verticalAlign: 'top',
    whiteSpace: 'normal',
  },
  cardContainer_normal: {
    '@media (max-width: 969px)': {
      width: '50%',
    },
    '@media (min-width: 970px) and (max-width: 1239px)': {
      width: '33.3333%',
    },
    '@media (min-width: 1240px)': {
      width: '25%',
    },
  },
  cardContainer_8_withoutCollapse: {
    '@media (max-width: 969px)': {
      ':nth-child(n+5)': {
        display: 'none',
      },
    },
    '@media (min-width: 970px) and (max-width: 1239px)': {
      ':nth-child(n+7)': {
        display: 'none',
      },
    },
    '@media (min-width: 1240px)': {
      ':nth-child(n+9)': {
        display: 'none',
      },
    },
  },
  cardContainer_12_withoutCollapse: {
    '@media (max-width: 969px)': {
      ':nth-child(n+5)': {
        display: 'none',
      },
    },
    '@media (min-width: 970px) and (max-width: 1239px)': {
      ':nth-child(n+7)': {
        display: 'none',
      },
    },
    '@media (min-width: 1240px)': {
      ':nth-child(n+13)': {
        display: 'none',
      },
    },
  },
  cardContainer_all: {
    '@media (max-width: 767px)': {
      width: '50%',
    },
    '@media (min-width: 768px) and (max-width: 969px)': {
      width: '33.3333%',
    },
    '@media (min-width: 970px) and (max-width: 1239px)': {
      width: '25%',
    },
    '@media (min-width: 1240px)': {
      width: '20%',
    },
  },
});
