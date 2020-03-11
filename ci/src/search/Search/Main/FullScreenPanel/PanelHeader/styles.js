
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    buttonContainer: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        color: 'buttontext',
        border: '0px',
        display: 'block',
        padding: '20px',
        margin: '-20px',
        outline: 'none'
    },
    closeButtonSvg: {
        display: 'block',
        fill: 'rgb(72, 72, 72)',
        height: '15px',
        width: '15px'
    },
    componentButton: {
        color: '#00c8ff',
        font: 'inherit',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        textDecoration: 'none',
        appearance: 'none',
        background: 'transparent',
        border: '0px',
        cursor: 'pointer',
        margin: '0px',
        padding: '0px',
        textAlign: 'left',
        userSelect: 'auto',
        outline: 'none'
    },
    containerHeader: {
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        display: 'table',
        verticalAlign: 'top',
        width: '100%',
        borderBottom: '1px solid #DBDBDB'
    },
    containerHeaderCenter: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '40%'
    },
    containerHeaderLeft: {
        display: 'table-cell',
        textAlign: 'left',
        verticalAlign: 'middle',
        width: '30%'
    },
    containerHeaderRight: {
        display: 'table-cell',
        textAlign: 'right',
        verticalAlign: 'middle',
        width: '30%'
    },
    text: {
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    size_small: {
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px'
    }
});

export default styles;
