
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    button: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        background: '#ffffff',
        border: '0px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline',
        textAlign: 'left',
        padding: '11px 12px',
        position: 'relative',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        outline: 'none'
    },
    container: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '19px',
        lineHeight: '24px',
        letterSpacing: undefined,
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        borderRadius: '4px',
        border: '1px solid #DBDBDB',
        boxShadow: '0 1px 3px 0px rgba(0, 0, 0, 0.08)',
        padding: '0px',
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
        position: 'relative'
    },
    container_fullWidth: {
        display: 'table-cell',
        verticalAlign: 'middle',
        position: 'relative',
        transition: 'width 0.3s',
        width: '100%'
    },
    copy: {
        color: '#484848',
        marginLeft: '8px',
        verticalAlign: 'middle'
    },
    icon: {
        color: '#767676',
        display: 'inline-block',
        verticalAlign: 'middle'
    }
});

export default styles;
