import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    horizontalNavWrapper: {
        position: 'absolute',
        left: '24px',
        top: '64px'
    },
    moveableDivWithTabs: {
        display: 'block',
        position: 'absolute',
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #e4e4e4',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
        height: '105px'
    },
    moveableDiv_hidden: {
        height: '64px'
    },
    searchBarWrapper: {
        display: 'block',
        position: 'absolute',
        left: '135px',
        top: '10px',
        right: '12px',
        zIndex: 100,
        '@media (min-width: 1128px)': {
            width: '572px'
        },
        '@media (min-width: 1025px) and (max-width: 1127px)': {
            width: '472px'
        },
        '@media (max-width: 1024px)': {
            left: '175px'
        },
        '@media (max-width: 744px)': {
            left: '95px'
        }
    }
});

export default styles;
