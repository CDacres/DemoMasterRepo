
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    afterFallback: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    baseContainer: {
        borderBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    beforeFallback: {
        display: 'inline-block',
        verticalAlign: 'middle',
        flexGrow: 1
    },
    button: {
        display: 'inline-block',
        cursor: 'pointer',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: 1,
        position: 'relative',
        border: '2px solid transparent',
        background: 'transparent',
        borderColor: '#00c8ff',
        width: '32px',
        height: '32px',
        borderWidth: '1px',
        outline: 'none',
        ':disabled': {
            background: 'transparent',
            cursor: 'default',
            borderColor: 'rgba(0, 132, 137, 0.3)'
        }
    },
    buttons: {
        width: '120px'
    },
    center: {
        textAlign: 'center'
    },
    containerFallback: {
        textAlign: 'justify',
        lineHeight: 0,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    fieldSet: {
        border: 'none',
        margin: '0px',
        padding: '0px'
    },
    icon: {
        display: 'inline-block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#00c8ff',
        fontSize: '16px'
    },
    iconDisabled: {
        color: 'rgba(0, 132, 137, 0.3)'
    },
    left: {
        textAlign: 'left'
    },
    middleAlignedCell: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    right: {
        textAlign: 'right'
    },
    table: {
        display: 'table'
    },
    text: {
        fontWeight: 300,
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        fontSize: '19px',
        lineHeight: '24px',
        letterSpacing: undefined,
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    visuallyHidden: {
        position: 'absolute',
        display: 'block',
        border: '0px',
        margin: '-1px',
        padding: '0px',
        height: '1px',
        width: '1px',
        clip: 'rect(0, 0, 0, 0)',
        overflow: 'hidden'
    }
});

export default styles;
