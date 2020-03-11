
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    outerContainer: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        webkitTransform: 'translate3d(0,0,0)',
        background: 'none',
        overflowY: 'hidden',
        pointerEvents: 'none',
        zIndex: 2000
    },
    panel: {
        pointerEvents: 'auto',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #DBDBDB',
        boxShadow: '0 0 2px 0px rgba(22, 22, 22, 0.2)',
        height: '100%',
        overflowY: 'hidden',
        position: 'relative',
        willChange: 'transform',
        zIndex: 2001
    },
    panelContent: {
        overflowY: 'auto'
    },
    panelContent_full: {
        width: '100%',
        position: 'absolute'
    },
    panelContent_withFixedHeader: {
        top: '59px'
    },
    panelContent_withFooter: {
        bottom: '79px'
    },
    panelBody: {
        paddingLeft: '20px',
        paddingRight: '20px'
    }
});

export default styles;
