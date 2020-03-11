
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    text: {
        fontFamily: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        paddingTop: '12px',
        paddingBottom: '12px',
        color: '#484848',
        backgroundColor: 'transparent',
        borderWidth: '0px',
        borderBottom: '2px solid transparent',
        bottom: '-1px',
        cursor: 'pointer',
        display: 'inline-block',
        margin: '0 16px 0 0',
        paddingLeft: '0px',
        paddingRight: '0px',
        textDecoration: 'none',
        fontWeight: 700,
        textTransform: 'uppercase',
        ':hover': {
            color: '#00c8ff',
            borderBottom: '2px solid #00c8ff',
            webkitTransitionProperty: 'color',
            mozTransitionProperty: 'color',
            transitionProperty: 'color',
            webkitTransitionDuration: '300ms',
            transitionDuration: '300ms',
            webkitTransitionTimingFunction: 'ease-out',
            transitionTimingFunction: 'ease-out'
        },
        '@media (min-width: 744px)': {
            margin: '0 24px 0 0'
        },
        '@media (min-width: 1128px)': {
            margin: '0 32px 0 0'
        }
    }
});

export default styles;
