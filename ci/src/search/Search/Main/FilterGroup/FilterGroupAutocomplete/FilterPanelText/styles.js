
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    panelSmall: {
        position: 'absolute',
        top: '40px',
        left: '0px',
        zIndex: 10,
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        boxShadow: '0 14px 36px 2px rgba(0, 0, 0, 0.15)',
        padding: '24px',
        overflowY: 'auto',
        visibility: 'visible',
        whiteSpace: 'normal',
        width: '424px'
    },
    panelContentContainer: {
        marginBottom: '32px'
    },
    panelActionsContainer: {
        marginTop: '48px'
    },
    panelActionWrapper: {
        display: 'inline-block'
    },
    panelActionLink: {
        cursor: 'pointer'
    }
});

export default styles;
