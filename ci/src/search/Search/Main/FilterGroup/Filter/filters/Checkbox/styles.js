
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    checkboxInput: {
        position: 'absolute',
        width: '0px',
        opacity: 0
    },
    container: {
        background: 'transparent',
        cursor: 'pointer',
        padding: '0px'
    },
    fakeCheckbox: {
        background: '#ffffff',
        border: '1px solid #DBDBDB',
        borderRadius: '2px',
        height: '18px',
        width: '18px',
        display: 'inline-block',
        textAlign: 'center',
        overflow: 'hidden'
    },
    fakeCheckboxChecked: {
        background: '#ffffff',
        border: '1px solid #DBDBDB',
        borderRadius: '2px',
        height: '18px',
        width: '18px',
        display: 'inline-block',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: '#00c8ff',
        borderColor: '#00c8ff'
    },
    fakeCheckboxCheckmark: {
        position: 'relative',
        display: 'inline-block',
        left: '-1px',
        margin: '-8px',
        verticalAlign: 'top'
    },
    fakeCheckboxCheckmarkSvg: {
        height: '32px',
        width: '32px',
        display: 'block'
    },
    title: {
        fontWeight: 300,
        cursor: 'pointer',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '19px',
        lineHeight: '24px',
        letterSpacing: 'undefined',
        paddingTop: 'undefined',
        paddingBottom: 'undefined',
        color: '#484848',
        display: 'inline-block',
        position: 'relative',
        top: '-3px',
        verticalAlign: 'top',
        paddingLeft: '8px'
    },
    subtitle: {
        fontWeight: 300,
        cursor: 'pointer',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '4px',
        paddingBottom: '0px',
        color: '#484848',
        display: 'block',
        paddingLeft: '8px',
    }
});

export default styles;
