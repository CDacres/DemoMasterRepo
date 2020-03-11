export const getDropdownTheme = (editing: boolean) => {
  if (editing) {
    return {
      container: {
        position: 'relative',
      },
      input: {
        fontSize: '17px',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        lineHeight: '22px',
        color: '#484848',
        backgroundColor: 'transparent',
        border: '0px none',
        paddingTop: '11px',
        paddingBottom: '11px',
        width: '100%',
        textOverflow: 'ellipsis',
        outline: 'none',
        margin: '0px',
        '::-webkit-input-placeholder': {
          color: '#717171',
          opacity: 1,
          fontWeight: 800,
        },
        '::-moz-placeholder': {
          color: '#717171',
          opacity: 1,
          fontWeight: 800,
        },
        ':-moz-placeholder': {
          color: '#717171',
          opacity: 1,
          fontWeight: 800,
        },
        ':-ms-input-placeholder': {
          color: '#717171',
          opacity: 1,
          fontWeight: 800,
        },
        '::placeholder': {
          color: '#717171',
          opacity: 1,
          fontWeight: 800,
        },
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
        padding: '32px 32px 8px',
        overflow: 'hidden',
        width: 'calc(100% + 191px)',
        left: '-36px',
        top: '47px',
        zIndex: 1,
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
        padding: '12px',
      },
    };
  }
  return {
    container: {
      position: 'relative',
    },
    input: {
      fontSize: '17px',
      fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
      lineHeight: '22px',
      color: '#484848',
      backgroundColor: 'transparent',
      border: '0px none',
      paddingTop: '11px',
      paddingBottom: '11px',
      width: '100%',
      textOverflow: 'ellipsis',
      outline: 'none',
      margin: '0px',
      '::-webkit-input-placeholder': {
        color: '#717171',
        opacity: 1,
        fontWeight: 800,
      },
      '::-moz-placeholder': {
        color: '#717171',
        opacity: 1,
        fontWeight: 800,
      },
      ':-moz-placeholder': {
        color: '#717171',
        opacity: 1,
        fontWeight: 800,
      },
      ':-ms-input-placeholder': {
        color: '#717171',
        opacity: 1,
        fontWeight: 800,
      },
      '::placeholder': {
        color: '#717171',
        opacity: 1,
        fontWeight: 800,
      },
    },
    inputFocused: {
      width: '100%',
    },
    suggestionsContainer: {
      // backgroundColor: '#ffffff',
      // marginTop: '0px',
      // position: 'absolute',
      // borderColor: '#dbdbdb',
      // borderRadius: '0px 0px 2px 2px',
      // borderStyle: 'solid',
      // borderWidth: '0px',
      // padding: '32px 32px 8px',
      // overflow: 'hidden',
      // width: 'calc(100% + 191px)',
      // left: '-36px',
      // top: '47px'
      display: 'none',
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
      padding: '12px',
    },
  };
};
