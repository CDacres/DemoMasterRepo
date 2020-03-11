import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  serviceRatingGridContainer: {
    width: '100%',
    textAlign: 'center',
  },
  serviceRatingQuestionLabel: {
    display: 'inline-block',
    color: 'rgba(0, 0, 0, 0.3)',
    fontStyle: 'italic',
    '@media (max-width: 594px)': {
      display: 'block',
      textAlign: 'left',
    },
  },
  serviceRatingQuestionLabelLast: {
    '@media (max-width: 594px)': {
      textAlign: 'right',
    },
  },
  serviceRatingList: {
    display: 'inline-block',
    fontSize: '0px',
    lineHeight: '36px',
  },
});
