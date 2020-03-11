export const getDropdownTheme = editing => {
  if (editing) {
    return {
      container: {
        position: 'relative',
      },
      input: {
        fontSize: '19px',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        lineHeight: '24px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        backgroundColor: 'transparent',
        border: '0px none',
        padding: '11px',
        width: '100%',
        textOverflow: 'ellipsis',
        outline: 'none',
      },
      inputFocused: {
        width: '100%',
      },
      suggestionsContainer: {
        backgroundColor: '#ffffff',
        marginTop: '0px',
        position: 'absolute',
        borderColor: '#dbdbdb',
        borderRadius: '0px 0px 2px 2px',
        borderStyle: 'solid',
        borderWidth: '1px',
        padding: '0px',
        overflow: 'hidden',
        width: 'calc(100% + 10px)',
        left: '-7px',
        top: '47px',
        zIndex: 1,
        maxWidth: 'calc(100% + 9px)',
      },
      suggestionHighlighted: {
        backgroundColor: '#fafafa',
      },
      suggestionsList: {
        padding: '0px',
        margin: '0px',
      },
      suggestion: {
        cursor: 'pointer',
        display: 'table',
        listStyleType: 'none',
        width: '100%',
        outline: 'none',
        padding: '8px 12px',
      },
    };
  }
  return {
    container: {
      position: 'relative',
    },
    input: {
      fontSize: '19px',
      fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
      lineHeight: '24px',
      letterSpacing: '0.2px',
      paddingTop: '0px',
      paddingBottom: '0px',
      color: '#484848',
      backgroundColor: 'transparent',
      border: '0px none',
      padding: '11px',
      width: '100%',
      textOverflow: 'ellipsis',
      outline: 'none',
    },
    inputFocused: {
      width: '100%',
    },
    suggestionsContainer: {
      backgroundColor: '#ffffff',
      marginTop: '0px',
      position: 'absolute',
      borderColor: '#dbdbdb',
      borderRadius: '0px 0px 2px 2px',
      borderStyle: 'solid',
      borderWidth: '0px',
      padding: '0px',
      overflow: 'hidden',
      width: 'calc(100% + 10px)',
      left: '-7px',
      top: '47px',
    },
    suggestionHighlighted: {
      backgroundColor: '#fafafa',
    },
    suggestionsList: {
      padding: '0px',
      margin: '0px',
    },
    suggestion: {
      cursor: 'pointer',
      display: 'table',
      listStyleType: 'none',
      width: '100%',
      outline: 'none',
      padding: '8px 12px',
    },
  };
};
