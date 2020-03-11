
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
    children: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '100%',
        width: '100%'
    },
    container_fullWidth: {
        position: 'relative',
        width: '100%',
        zIndex: 0
    },
    link: {
        textDecoration: 'none',
        color: '#484848',
        border: 'none',
        width: '100%',
        height: '100%',
        padding: '0px',
        background: 'transparent',
        textAlign: 'inherit',
        cursor: 'pointer',
        display: 'block'
    },
    shimmer: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px'
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
    twoLineTitle: {
        lineHeight: '18px',
        maxHeight: '36px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkitLineClamp': '2',
        '-webkitBoxOrient': 'vertical'
    }
});

export default styles;
