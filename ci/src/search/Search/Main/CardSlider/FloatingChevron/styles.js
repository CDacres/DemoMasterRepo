
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    button: {
        display: 'inline-block',
        cursor: 'pointer',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: 1,
        position: 'relative',
        outline: 'none'
    },
    button_styleInverse: {
        border: '2px solid transparent',
        background: '#ffffff'
    },
    button_floating: {
        boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)'
    },
    floatingChevronContainer: {
        position: 'absolute',
        top: '50%',
        display: 'block',
        webkitTransform: 'translateY(-50%)',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
        zIndex: 1
    },
    floatingChevronContainer_left: {
        left: '-10px'
    },
    floatingChevronContainer_right: {
        right: '-10px'
    },
    icon: {
        display: 'inline-block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        webkitTransform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)'
    },
    icon_styleInverse: {
        color: '#484848'
    },
    iconLeftSvg: {
        display: 'block',
        fill: 'currentcolor',
        height: '1em',
        width: '1em'
    },
    iconRightSvg: {
        display: 'block',
        fill: 'currentcolor',
        height: '1em',
        width: '1em'
    }
});

export default styles;
