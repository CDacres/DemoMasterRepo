
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
    chevron: {
        fontSize: '8px',
        color: '#00c8ff',
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    chevronSvg: {
        display: 'block',
        fill: 'currentcolor',
        height: '1em',
        width: '1em'
    },
    filterGroup: {
        display: 'inline-block',
        position: 'relative',
        zIndex: 5,
        marginRight: '8px'
    },
    iconWrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',
        webkitTransitionProperty: '-ms-transform,-webkit-transform,transform',
        mozTransitionProperty: 'transform',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        webkitTransitionDuration: '250ms',
        transitionDuration: '250ms',
        webkitTransitionTimingFunction: 'ease-in-out',
        transitionTimingFunction: 'ease-in-out',
        transform: 'rotate(0deg)'
    },
    iconWrapperOpen: {
        display: 'table-cell',
        verticalAlign: 'middle',
        webkitTransitionProperty: '-ms-transform,-webkit-transform,transform',
        mozTransitionProperty: 'transform',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        webkitTransitionDuration: '250ms',
        transitionDuration: '250ms',
        webkitTransitionTimingFunction: 'ease-in-out',
        transitionTimingFunction: 'ease-in-out',
        transform: 'rotate(180deg)'
    },
    label: {
        display: 'table-cell',
        verticalAlign: 'middle',
        paddingRight: '8px'
    },
    menuItem: {
        webkitAppearance: 'none',
        mozAppearance: 'none',
        appearance: 'none',
        cursor: 'pointer',
        padding: '0 19px',
        display: 'inline-block',
        height: '32px',
        color: '#767676',
        background: 'none',
        border: 'none',
        outline: 'none',
        borderRight: 'none',
        position: 'relative',
        verticalAlign: 'top',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '32px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '8px',
        paddingRight: '8px',
        borderRadius: '4px'
    },
    menuItemActive: {
        backgroundColor: '#F2F2F2'
    }
});

export default styles;
