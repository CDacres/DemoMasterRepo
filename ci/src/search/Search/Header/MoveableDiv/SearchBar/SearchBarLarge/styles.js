
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderRadius: '2px',
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: 0,
        display: 'block',
        width: '100%'
    },
    container_noMargins: {
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px'
    },
    hiddenLabel: {
        position: 'absolute',
        display: 'block',
        border: '0px',
        margin: '-1px',
        padding: '0px',
        height: '1px',
        width: '1px',
        clip: 'rect(0, 0, 0, 0)',
        overflow: 'hidden'
    },
    inputContainer: {
        overflow: 'hidden',
        position: 'relative'
    },
    input: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        backgroundColor: 'transparent',
        border: '0px',
        padding: '11px',
        width: '100%',
        textOverflow: 'ellipsis',
        outline: 'none'
    },
    inputExpandedFull: {
        width: '100%'
    },
    inputExpanded: {
        width: '75%'
    },
    prefixContainer: {
        float: 'left'
    },
    prefix: {
        paddingLeft: '12px',
        paddingTop: '11px'
    },
    results: {
        backgroundColor: 'rgb(255, 255, 255)',
        marginTop: '0px',
        position: 'absolute',
        borderColor: 'rgb(219, 219, 219)',
        borderRadius: '0px 0px 2px 2px',
        borderStyle: 'solid',
        borderWidth: '1px',
        padding: '0px',
        overflow: 'hidden'
    },
    result: {
        cursor: 'pointer',
        display: 'table',
        listStyleType: 'none',
        width: '100%',
        outline: 'none'
    },
    resultTall: {
        padding: '8px 12px'
    },
    showUnderline: {
        opacity: 1
    },
    textContainer: {
        display: 'table-cell',
        verticalAlign: 'top',
        width: '100%',
        pointerEvents: 'none'
    },
    text: {
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
    },
    subtext: {
        fontWeight: 300,
        color: 'rgb(118, 118, 118)',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        wordWrap: 'break-word',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        margin: '0px'
    }
});

export default styles;
