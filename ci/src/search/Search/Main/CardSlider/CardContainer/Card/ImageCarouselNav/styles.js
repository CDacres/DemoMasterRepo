
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    accessible: {
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
    anchor: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        pointerEvents: 'auto'
    },
    fullWidth_fullHeight: {
        width: '100%',
        height: '100%'
    },
    navigation: {
        position: 'absolute',
        pointerEvents: 'none',
        top: '0px',
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    navButton: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: '0px',
        padding: '0px',
        display: 'block',
        position: 'absolute',
        height: '100%',
        width: '25%',
        pointerEvents: 'auto',
        outline: 'none'
    },
    next: {
        right: '0px',
        background: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 100%)'
    },
    nextIcon: {
        position: 'absolute',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none'
    },
    nextIconSvg: {
        display: 'block',
        fill: 'rgb(255, 255, 255)',
        height: '24px',
        width: '24px',
        pointerEvents: 'none'
    },
    previous: {
        left: '0px',
        background: 'linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.25) 100%)'
    },
    previousIcon: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none'
    },
    previousIconSvg: {
        display: 'block',
        fill: 'rgb(255, 255, 255)',
        height: '24px',
        width: '24px'
    }
});

export default styles;
