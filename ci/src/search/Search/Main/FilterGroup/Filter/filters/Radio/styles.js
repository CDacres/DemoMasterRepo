
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    checked: {
        backgroundColor: '#00c8ff',
        borderRadius: '50%',
        height: '6px',
        margin: '33%',
        width: '6px'
    },
    column: {
        display: 'table-cell',
        verticalAlign: 'top',
        whiteSpace: 'normal'
    },
    container: {
        display: 'inline-block',
        position: 'relative'
    },
    containerTable: {
        background: 'transparent',
        border: '0px',
        cursor: 'pointer',
        display: 'table',
        padding: '0px'
    },
    label: {
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
        position: 'relative'
    },
    labelSpacing: {
        paddingLeft: '12px'
    },
    radioButtonContainer: {
        marginBottom: '8px'
    },
    radioButton: {
        background: '#ffffff',
        border: '1px solid #DBDBDB',
        borderRadius: '50%',
        display: 'inline-block',
        height: '18px',
        marginTop: '3px',
        verticalAlign: 'top',
        width: '18px'
    },
    radioInput: {
        height: '100%',
        margin: '0px',
        opacity: 0,
        position: 'absolute',
        width: '100%'
    },
    text: {
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
        position: 'relative'
    }
});

export default styles;
