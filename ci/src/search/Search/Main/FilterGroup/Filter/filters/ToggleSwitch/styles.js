
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    baseContainer: {
        borderBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    checkboxInput: {
        position: 'absolute',
        width: '0px',
        opacity: 0,
        ':before': {
            display: 'none'
        }
    },
    checkedBackground: {
        position: 'absolute',
        left: '-1px',
        top: '-1px',
        bottom: '-1px',
        right: '-1px',
        backgroundColor: '#00c8ff',
        opacity: 0,
        display: 'inherit',
        borderRadius: '32px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#00c8ff',
        transitionProperty: 'opacity',
        transitionDuration: '250ms',
        transitionTimingFunction: 'ease-in-out'
    },
    checkedBackground_on: {
        opacity: 1
    },
    checkmarkCover: {
        position: 'absolute',
        top: '10px',
        left: '5px',
        right: '5px',
        bottom: '10px',
        backgroundColor: '#ffffff',
        transform: 'scaleX(1)',
        transitionDelay: '0px',
        transitionDuration: '0px',
        transformOrigin: 'right center'
    },
    checkmarkCover_on: {
        transform: 'scaleX(0)',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        transitionDelay: '125ms',
        transitionDuration: '250ms',
        transformOrigin: 'right center',
        transitionTimingFunction: 'ease-in-out'
    },
    childContainer: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'middle'
    },
    container: {
        display: 'table',
        width: '100%'
    },
    icon: {
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        stroke: 'currentColor'
    },
    iconContainer: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px'
    },
    label: {
        background: 'transparent',
        border: '0px',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '0px',
        whiteSpace: 'nowrap'
    },
    slider: {
        width: '32px',
        height: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#00c8ff',
        color: '#00c8ff',
        display: 'block',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        transitionDuration: '250ms',
        transitionTimingFunction: 'ease-in-out',
        overflow: 'hidden',
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        transform: 'translate3d(0, 0, 0)'
    },
    sliderChecked: {
        transform: 'translate3d(16px, 0, 0)'
    },
    text: {
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        fontSize: '19px',
        lineHeight: '24px',
        letterSpacing: undefined,
        paddingTop: '0px',
        paddingBottom: '0px',
        display: 'inline'
    },
    subText: {
        fontWeight: 300,
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    times: {
        transform: 'rotate(45deg)',
        transitionDelay: '62.5ms',
        transitionDuration: '187.5ms'
    },
    times_on: {
        transform: 'rotate(0)'
    },
    timesScale: {
        transform: 'scale(0, 0)',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        transitionDelay: '0px',
        transitionDuration: '62.5ms'
    },
    timesScale_on: {
        transform: 'scale(1, 1)'
    },
    uncheckedBackground: {
        appearance: 'none',
        height: '32px',
        width: '48px',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#00c8ff',
        margin: 'auto',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        outline: 'none'
    }
});

export default styles;
