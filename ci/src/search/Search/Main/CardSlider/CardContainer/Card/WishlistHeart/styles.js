
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        display: 'inline-block',
        background: 'transparent',
        border: '0px',
        padding: '0px',
        cursor: 'pointer',
        position: 'relative'
    },
    wishlistHeartCheckbox: {
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
    wishlistHeartContainer: {
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 2
    },
    wishlistHeartIcon: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        pointerEvents: 'none'
    }
});

export default styles;
