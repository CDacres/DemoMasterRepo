
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    headerController: {
        position: 'fixed',
        zIndex: 10,
        width: '100%'
    },
    contentFloating: {
        backgroundColor: 'transparent',
        borderBottom: 'none',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px'
    },
    containerRelative: {
        position: 'relative',
        zIndex: 5
    },
    containerTable: {
        display: 'table',
        width: '100%'
    },
    containerTableChildCellAlignMiddle: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    containerTableChildCellMiddleAlignMiddle: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'middle'
    }
});

export default styles;
