
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#F2F2F2',
        boxShadow: '0 0 0 2px #DBDBDB',
        borderRadius: '50%',
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'middle',
        width: '28px',
        height: '28px'
    },
    avatarImage: {
        verticalAlign: 'top'
    },
    container: {
        position: 'absolute',
        width: '100%',
        right: '0px'
    },
    content: {
        backgroundColor: '#ffffff',
        border: '1px solid #DBDBDB',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        minWidth: '282px',
        maxWidth: '460px',
        minHeight: '60px',
        position: 'absolute',
        right: '0px',
        top: '0px'
    },
    content_baseline: {
        display: 'table',
        padding: '16px 0',
        color: '#484848',
        borderBottom: '1px solid transparent',
        width: '100%',
        borderColor: '#F2F2F2'
    },
    container_link: {
        display: 'block',
        padding: '0 16px',
        textDecoration: 'none'
    },
    container_table: {
        display: 'table',
        width: '100%'
    },
    container_table_child: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'middle'
    },
    fang: {
        position: 'absolute',
        width: '20px',
        height: '10px',
        top: '-9px'
    },
    fangShape: {
        fill: '#ffffff'
    },
    fangStroke: {
        stroke: '#DBDBDB',
        fill: 'transparent'
    },
    list: {
        padding: '0px',
        listStyleType: 'none'
    },
    menu: {
        position: 'absolute',
        top: '100%',
        right: '0px',
        width: '460px',
        zIndex: -1
    },
    navContainer: {
        display: 'none',
        opacity: 1,
        webkitTransition: '0.25s opacity ease-out',
        mozTransition: '0.25s opacity ease-out',
        transition: '0.25s opacity ease-out',
        '@media (min-width: 1025px)': {
            display: 'block'
        }
    },
    navLink: {
        webkitAppearance: 'none',
        mozAppearance: 'none',
        appearance: 'none',
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        display: 'inline-block',
        height: '64px',
        lineHeight: '64px',
        textDecoration: 'none',
        margin: '0px',
        position: 'relative',
        padding: '0 16px',
        whiteSpace: 'nowrap'
    },
    navList: {
        display: 'table',
        listStyle: 'none',
        padding: '0px',
        margin: '0px',
        height: '64px'
    },
    notificationBadge: {
        fill: '#008489',
        height: '6px',
        opacity: 0,
        position: 'absolute',
        top: '50%',
        webkitTransform: 'translate3d(4px, -8px, 0)',
        msTransform: 'translate3d(4px, -8px, 0)',
        transform: 'translate3d(4px, -8px, 0)',
        webkitTransformOriginX: '7px',
        msTransformOriginX: '7px',
        transformOriginX: '7px',
        webkitTransformOriginY: '-5px',
        msTransformOriginY: '-5px',
        transformOriginY: '-5px',
        width: '6px'
    },
    notificationBadgeVisible: {
        fill: '#008489',
        height: '6px',
        opacity: 0,
        position: 'absolute',
        top: '50%',
        webkitTransform: 'translate3d(4px, -8px, 0)',
        msTransform: 'translate3d(4px, -8px, 0)',
        transform: 'translate3d(4px, -8px, 0)',
        webkitTransformOriginX: '7px',
        msTransformOriginX: '7px',
        transformOriginX: '7px',
        webkitTransformOriginY: '-5px',
        msTransformOriginY: '-5px',
        transformOriginY: '-5px',
        width: '6px',
        webkitAnimationDuration: '0.5s',
        animationDuration: '0.5s',
        webkitAnimationTimingFunction: 'ease',
        animationTimingFunction: 'ease',
        webkitAnimationFillMode: 'both',
        animationFillMode: 'both'
    },
    text: {
        color: '#767676',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    underlineWrapper: {
        height: '100%',
        verticalAlign: 'middle',
        mozBoxSizing: 'border-box',
        boxSizing: 'border-box'
    },
    underline: {
        padding: '8px 0',
        verticalAlign: 'middle',
        lineHeight: 1,
        borderBottom: '2px solid transparent'
    },
    underlineNone: {
        borderBottom: 'none'
    }
});

export default styles;
