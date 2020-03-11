import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  productCategoryContainer: { // TODO: clean imageGrid4
    marginTop: '8px',
    display: 'grid',
    alignItems: 'stretch',
    justifyItems: 'stretch',
    gridGap: '12px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    '@media (min-width: 744px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@media (min-width: 1128px)': {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
  },
  container: {
    borderRadius: specs.borderRadius,
    height: '220px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  area: {
    gridTemplateRows: '1fr auto',
    height: '100%',
  },
  descTitle: {
    fontWeight: 700,
  },
});
