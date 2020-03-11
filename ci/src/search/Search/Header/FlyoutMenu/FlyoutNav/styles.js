
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    childContainer: {
        transition: '-ms-transform 304ms ease-out,-webkit-transform 304ms ease-out,transform 304ms ease-out',
        position: 'fixed',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px',
        transform: 'translateY(0)'
    },
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        overflow: 'hidden',
        listStyleType: 'none',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '24px',
        paddingTop: '88px'
    },
    divider: {
        border: '0px',
        borderTop: '1px solid #DBDBDB',
        margin: '16px 0',
        height: '0px'
    }
});

export default styles;
