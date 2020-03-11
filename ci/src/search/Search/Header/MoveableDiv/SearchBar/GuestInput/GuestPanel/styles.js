import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        top: '40px',
        left: '0px',
        zIndex: 10,
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        boxShadow: '0 14px 36px 2px rgba(0, 0, 0, 0.15)',
        overflowY: 'auto',
        visibility: 'visible',
        whiteSpace: 'normal',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        width: '200px',
        maxHeight: '30vh'
    },
    dropdownItem: {
        cursor: 'pointer',
        display: 'table',
        listStyleType: 'none',
        padding: '5px 12px',
        width: '100%',
        ':hover': {
            backgroundColor: '#fafafa'
        },
        ':focus': {
            outline: 'none'
        }
    },
    panel: {
        position: 'relative',
        top: '-39px'
    },
    panelList: {
        padding: 0
    },
    textContainer: {
        display: 'table-cell',
        verticalAlign: 'top',
        width: '100%',
        pointerEvents: 'none'
    },
    filtersText: {
        fontWeight: 300,
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        pointerEvents: 'none'
    }
});

export default styles;
