
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    checkbox: {
        cursor: 'pointer',
        padding: '8px 0'
    },
    fakeCheckbox: {
        background: '#ffffff',
        border: '1px solid #DBDBDB',
        borderRadius: '2px',
        height: '12px',
        width: '12px',
        display: 'inline-block',
        textAlign: 'center',
        overflow: 'hidden',
        marginRight: '8px'
    },
    fakeCheckboxChecked: {
        background: '#ffffff',
        border: '1px solid #DBDBDB',
        borderRadius: '2px',
        height: '12px',
        width: '12px',
        display: 'inline-block',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: '#00c8ff',
        borderColor: '#00c8ff',
        marginRight: '8px'
    },
    fakeCheckboxCheckmark: {
        position: 'relative',
        display: 'inline-block',
        left: '-1px',
        margin: '-8px',
        verticalAlign: 'top'
    },
    fakeCheckboxCheckmarkSvg: {
        height: '26px',
        width: '20px',
        display: 'block',
        paddingLeft: '2px'
    },
    mapAutoRefresh: {
        padding: '0 8px'
    },
    mapRefreshControls: {
        position: 'absolute',
        top: '10px',
        left: '50px'
    },
    mapWrapper: {
        position: 'fixed',
        display: 'none',
        top: '0px',
        left: '0px',
        bottom: '0px',
        right: '0px',
        width: '100%',
        '@media (min-width: 1128px)': {
            display: 'block',
            left: 'auto',
            width: '34%'
        },
        '@media (min-width: 744px) and (max-width: 1127px)': {
            display: 'block',
            left: 'auto',
            width: '50%'
        },
        '@media (max-width: 743px)': {
            zIndex: 50
        }
    },
    mapWrapper_withTabs: {
        top: '105px'
    },
    mapPanelVisible: {
        display: 'block'
    },
    panel: {
        border: '1px solid #dce0e0',
        backgroundColor: '#fff',
        borderRadius: 0
    },
    refreshInput: {
        position: 'absolute',
        width: '0px',
        opacity: 0
    },
    refreshText: {
        fontSize: '0.7em'
    }
});

export default styles;
