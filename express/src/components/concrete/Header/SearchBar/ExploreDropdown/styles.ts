import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  suggestions: {
    border: '1px solid #ebebeb',
    borderRadius: '0px 0px 4px 4px',
    boxShadow: '0px 15px 46px -10px rgba(26, 26, 29, 0.3)',
    overflow: 'hidden',
    paddingTop: '8px',
    transition: 'background-color 200ms linear 0s',
    '@media (min-width: 744px)': {
      position: 'absolute',
      top: '100%',
      width: '100%',
    },
    '@media (max-width: 743px)': {
      position: 'absolute',
      left: '0px',
      top: '100%',
      right: '0px',
      maxHeight: 'calc(-64px + 100vh)',
      overflow: 'auto',
      border: 'medium none',
      width: '100vw',
    },
  },
  suggestionsReduced: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    visibility: 'hidden',
  },
  suggestionsExtended: {
    backgroundColor: '#ffffff',
    visibility: 'visible',
  },
  suggestionList: {
    transition: 'opacity 300ms linear 266ms',
  },
  suggestionListReduced: {
    margin: '0px',
    padding: '0px',
    visibility: 'hidden',
    opacity: 0,
  },
  suggestionListExtended: {
    opacity: 1,
    visibility: 'visible',
  },
  suggestionListItem: {
    listStyleType: 'none',
  },
  suggestionTitleText: {
    textTransform: 'uppercase',
  },
});
