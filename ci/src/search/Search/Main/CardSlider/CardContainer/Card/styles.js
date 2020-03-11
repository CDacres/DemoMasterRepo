
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    back: {
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFF',
        padding: '15px',
        border: '1px solid #E8E8E8',
        '@media (max-width: 743px)': {
            height: '365px'
        }
    },
    container: {
        display: 'inline-block',
        background: 'transparent',
        border: '0px',
        padding: '0px',
        cursor: 'pointer',
        position: 'relative'
    },
    container_fullWidth: {
        position: 'relative',
        width: '100%',
        zIndex: 0
    },
    container_fullWidth_fullHeight: {
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: 'none'
    },
    cornerTriangle: {
        ':hover': {
            cursor: 'pointer'
        },
        zIndex: 10,
        position: 'absolute',
        right: '0px',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 50px 50px 0',
        borderColor: 'transparent #00c8ff transparent transparent',
        opacity: 0.8,
        filter: 'alpha(opacity = 80)'
    },
    cornerTriangleBack: {
        top: '-10px'
    },
    children: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '100%',
        width: '100%'
    },
    extraBold: {
        fontWeight: 900
    },
    fullWidth_fullHeight: {
        width: '100%',
        height: '100%'
    },
    imageOverlay: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingBottom: '8px',
        background: 'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.65) 100%)'
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
    name: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '21px',
        lineHeight: '21px',
        color: '#ffffff',
        paddingLeft: '-1px',
        textShadow: '0px 0.5px, 0.5px 0px, 0.5px 0.5px'
    },
    roomInfoContainer: {
        display: 'table-cell',
        textOverflow: 'ellipsis'
    },
    twoLineTitle: {
        width: '100%',
        lineHeight: '18px',
        maxHeight: '36px',
        overflow: 'hidden',
        display: 'table'
    },
    typeTag: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: 'undefined',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: 'undefined',
        fontWeight: 900,
        display: 'inline-block',
        padding: '0 6px',
        borderRadius: '3px',
        backgroundColor: '#ffffff'
    }
});

export default styles;
