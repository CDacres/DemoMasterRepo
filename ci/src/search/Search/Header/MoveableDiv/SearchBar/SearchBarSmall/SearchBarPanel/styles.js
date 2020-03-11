
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    body: {
        paddingLeft: '20px',
        paddingRight: '20px',
        padding: '20px'
    },
    button: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        background: '#ffffff',
        border: '1px solid #e4e4e4',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline',
        textAlign: 'left',
        padding: '11px 12px',
        position: 'relative',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        outline: 'none',
        boxShadow: '0 1px 1px 0px rgba(0, 0, 0, 0.15)'
    },
    buttonContainer: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        color: 'buttontext',
        border: '0px',
        display: 'block',
        padding: '20px',
        margin: '-20px',
        outline: 'none'
    },
    componentButton: {
        color: '#00c8ff',
        font: 'inherit',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        textDecoration: 'none',
        appearance: 'none',
        background: 'transparent',
        border: '0px',
        cursor: 'pointer',
        margin: '0px',
        padding: '0px',
        textAlign: 'left',
        userSelect: 'auto'
    },
    container: {
        zIndex: 1999,
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        webkitTransform: 'translate3d(0,0,0)',
        background: 'none',
        overflowY: 'hidden',
        pointerEvents: 'none'
    },
    container_dropdown: {
        pointerEvents: 'auto'
    },
    copy: {
        color: '#484848',
        marginLeft: '8px',
        verticalAlign: 'middle'
    },
    icon: {
        color: '#767676',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    innerContainer: {
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '0px',
        display: 'table',
        verticalAlign: 'top',
        width: '100%',
        borderBottom: 'none'
    },
    left: {
        display: 'table-cell',
        textAlign: 'left',
        verticalAlign: 'middle',
        width: '30%'
    },
    panel: {
        pointerEvents: 'auto',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #DBDBDB',
        boxShadow: '0 0 2px 0px rgba(22, 22, 22, 0.2)',
        height: 'auto',
        overflowY: 'hidden',
        position: 'relative',
        willChange: 'transform',
        borderBottom: '1px solid #DBDBDB',
        zIndex: 2000
    },
    panelContent: {
        overflowY: 'auto'
    },
    right: {
        display: 'table-cell',
        textAlign: 'right',
        verticalAlign: 'middle',
        width: '30%'
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
        paddingBottom: '0px'
    }
});

export default styles;
