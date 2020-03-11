
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
        paddingLeft: '6px',
        paddingRight: '6px',
        paddingBottom: '30px',
        '@media (min-width: 1128px)': {
            paddingBottom: '0px'
        },
        '@media (min-width: 744px)': {
            paddingLeft: '8px',
            paddingRight: '8px'
        }
    },
    cardContainerDisabled_CarouselLg: {
        width: '100%',
        height: '100%',
        paddingLeft: '6px',
        paddingRight: '6px',
        paddingBottom: '12px',
        paddingTop: '8px',
        '@media (min-width: 1128px)': {
            paddingBottom: '12px',
            paddingTop: '8px'
        },
        '@media (min-width: 744px)': {
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '8px',
            paddingBottom: '12px'
        }
    },
    cardContainerDisabled_CarouselMd: {
        width: '100%',
        height: '100%',
        paddingLeft: '6px',
        paddingRight: '6px',
        paddingBottom: '12px',
        paddingTop: '8px',
        '@media (min-width: 1128px)': {
            paddingBottom: '12px',
            paddingTop: '8px'
        },
        '@media (min-width: 744px)': {
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '8px',
            paddingBottom: '12px'
        }
    },
    cardContainerDisabled_CarouselSm: {
        width: '100%',
        height: '100%',
        paddingLeft: '6px',
        paddingRight: '6px',
        paddingBottom: '12px',
        paddingTop: '8px',
        '@media (min-width: 1128px)': {
            paddingBottom: '12px',
            paddingTop: '8px'
        },
        '@media (min-width: 744px)': {
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '8px',
            paddingBottom: '12px'
        }
    },
    containerRelative: {
        position: 'relative'
    },
    link: {
        textDecoration: 'none',
        color: '#484848'
    }
});

export default styles;
