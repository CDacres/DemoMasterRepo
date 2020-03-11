
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    badgeContainer: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '12px',
        lineHeight: '20px',
        letterSpacing: '0.4px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#ffffff',
        backgroundColor: '#00c8ff',
        borderRadius: '10px',
        display: 'inline-block',
        height: '20px',
        textAlign: 'center',
        width: '20px'
    },
    buttonWithShadow: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        fontWeight: 700,
        backgroundColor: '#ffffff',
        padding: '8px 16px',
        boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)',
        borderRadius: '80px',
        border: 'none',
        cursor: 'pointer',
        textTransform: 'uppercase',
        outline: 'none'
    },
    buttonContainer: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '12px',
        lineHeight: 1,
        letterSpacing: '0.4px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        fontWeight: 700,
        overflow: 'hidden',
        boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)',
        borderRadius: '80px',
        backgroundColor: '#ffffff',
        display: 'inline-block'
    },
    button: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        paddingTop: '8px',
        paddingBottom: '8px',
        color: '#484848',
        fontWeight: 700,
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'inline-block',
        verticalAlign: 'middle',
        cursor: 'pointer',
        outline: 'none'
    },
    buttonLeft: {
        paddingLeft: '16px',
        paddingRight: '8px'
    },
    container: {
        height: '48px',
        width: '100%',
        position: 'initial',
        overflowX: 'initial',
        whiteSpace: 'initial'
    },
    dividerOuter: {
        display: 'inline',
        verticalAlign: 'middle'
    },
    divider: {
        display: 'inline',
        height: '100%',
        borderLeft: '1px solid #767676'
    },
    containerTable: {
        display: 'table'
    },
    containerTableChild: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    container_withMdSplitMap: {
        display: 'inline-block',
        '@media (min-width: 744px)': {
            marginRight: '50%'
        }
    },
    filterBar: {
        background: '#ffffff',
        height: '64px',
        borderBottom: '0px',
        width: '100%',
        padding: '0px',
        zIndex: 4,
        position: 'relative',
        paddingLeft: '16px',
        paddingTop: '16px'
    },
    filterBarWrapper: {
        height: '64px',
        background: '#ffffff',
        position: 'fixed',
        zIndex: 9,
        width: '66%'
    },
    filterBarWrapperRelative: {
        height: '64px',
        position: 'relative',
        width: '66%'
    },
    icon: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: 'undefined',
        paddingTop: 'undefined',
        paddingBottom: 'undefined',
        color: '#484848'
    },
    outContainer: {
        left: '0px',
        right: '0px',
        bottom: '16px',
        position: 'fixed',
        opacity: 1,
        textAlign: 'center',
        transitionProperty: 'opacity',
        transitionDuration: '250ms',
        transitionTimingFunction: 'ease-out',
        zIndex: 100,
        '@media (min-width: 1128px)': {
            opacity: 0,
            visibility: 'hidden'
        }
    },
    wrapper: {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
});

export default styles;
