
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    flyoutMenuContainer: {
        position: 'relative',
        zIndex: 10
    },
    flyoutMenuMask: {
        height: '64px',
        width: '100%',
        backgroundColor: '#ffffff',
        position: 'absolute',
        top: '0px',
        left: '0px',
        transform: 'translateY(-64px)',
        transitionDuration: '0.05s',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        transitionTimingFunction: 'ease-out',
        transitionDelay: '0.3s',
        zIndex: 15
    }
});

export default styles;
