
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    main: {
        position: 'relative',
        paddingTop: '105px'
    },
    main_noHero: {
        position: 'relative',
        paddingTop: '105px'
    },
    mainContentWrapper: {
        position: 'relative',
        width: '100%',
        zIndex: 0,
        '@media (min-width: 1128px)': {
            width: '66%'
        },
        '@media (min-width: 744px) and (max-width: 1127px)': {
            width: '50%'
        }
    },
    mainContentWrapperFullWidth: {
        position: 'relative',
        width: '100%',
        zIndex: 0
    },
    mapSearch: {
        top: '105px',
        bottom: '0px',
        left: '0px',
        right: '0px'
    },
    pageContainer: {
        margin: '0 auto',
        position: 'relative',
        paddingLeft: '24px',
        paddingRight: '24px'
    },
    pageContainer_boxedWidth: {
        maxWidth: '1080px'
    },
    pageContainer_fullWidth: {
        maxWidth: 'none'
    }
});

export default styles;
