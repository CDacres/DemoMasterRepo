import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  s25: {
    display: 'grid',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '32px',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '1fr 3fr',
      gridColumnGap: '32px',
    },
  },
  s33: {
    display: 'grid',
    gridGap: '32px',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  s50: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '3fr 1fr',
      gridColumnGap: '32px',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '32px',
    },
  },
  s50x: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '32px',
    },
  },
  s50l: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '32px',
    },
  },
  s66: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '3fr 1fr',
      gridColumnGap: '32px',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '2fr 1fr',
      gridColumnGap: '32px',
    },
  },
  s66l: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '2fr 1fr',
      gridColumnGap: '32px',
    },
  },
  s75: {
    display: 'grid',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '1fr',
      gridColumnGap: '32px',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: '3fr 1fr',
      gridColumnGap: '32px',
    },
  },
  s75l: {
    display: 'grid',
    '@media (min-width: 744px)': {
      gridTemplateColumns: '3fr 1fr',
      gridColumnGap: '32px',
    },
  },
  s100: {
    display: 'grid',
  },
});
