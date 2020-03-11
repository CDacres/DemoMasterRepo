
import { StyleSheet } from 'aphrodite';

const fadeInKeyframe = {
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 1
    }
};

const opacityKeyframes = {
    '0%': {
        opacity: 0.1
    },
    '100%': {
        opacity: 0.3
    }
};

const styles = StyleSheet.create({
    background: {
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat'
    },
    backgroundSize_cover: {
        position: 'absolute',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    fadeIn: {
        animationName: fadeInKeyframe,
        animationDuration: '2000ms',
        animationTimingFunction: 'ease-out'
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
    }
});

export default styles;
