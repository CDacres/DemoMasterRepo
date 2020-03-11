
import { StyleSheet } from 'aphrodite';

const opacityKeyframes = {
    '0%': {
        opacity: 0.1
    },
    '100%': {
        opacity: 0.3
    }
};

const styles = StyleSheet.create({
    breakingSpace: {
        fontSize: '0px'
    },
    buttonText: {
        border: 'none',
        cursor: 'pointer',
        background: 'transparent',
        paddingTop: 'undefined',
        paddingBottom: 'undefined',
        paddingRight: '0px',
        paddingLeft: '10px',
        whiteSpace: 'nowrap'
    },
    button_flushRight: {
        marginRight: '0px'
    },
    carouselRow: {
        marginTop: '48px',
        marginBottom: '48px'
    },
    chevronRight: {
        fill: 'currentcolor',
        height: '10px',
        width: '10px'
    },
    container: {
        position: 'relative'
    },
    headerContainer: {
        display: 'table',
        tableLayout: 'fixed'
    },
    rowHeader: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '22px',
        lineHeight: '28px',
        letterSpacing: '-0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        fontWeight: 700,
        marginBottom: '0px'
    },
    rowHeaderContainer: {
        marginBottom: '24px'
    },
    seeMoreColumn: {
        display: 'table-cell',
        verticalAlign: 'baseline'
    },
    seeMoreContainer: {
        paddingBottom: '22px'
    },
    text: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: 'undefined',
        color: '#484848'
    },
    shimmerAnimation: {
        animationDirection: 'alternate',
        animationDuration: '1s',
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationName: opacityKeyframes,
        animationTimingFunction: 'ease-in-out',
        backgroundColor: 'currentColor',
        display: 'inline-block',
        position: 'relative'
    },
    span_marginRight: {
        marginRight: '6px'
    },
    titleContainer: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'baseline'
    }
});

export default styles;
