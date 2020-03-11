
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    cardSliderContainer: {
        marginTop: '0px',
        overflowY: 'hidden',
        marginLeft: '-24px',
        marginRight: '-24px',
        '@media (min-width: 1128px)': {
            marginLeft: '-8px',
            marginRight: '-8px',
            overflow: 'hidden'
        }
    },
    cardSlider: {
        transition: '-ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '0 18px',
        marginBottom: '-30px'
    },
    cardSlider_enableCarouselMd: {
        '@media (min-width: 744px)': {
            padding: '0 16px'
        }
    },
    cardSlider_enableCarouselLg: {
        '@media (min-width: 1128px)': {
            marginBottom: '0px',
            padding: '0px',
            overflow: 'visible'
        }
    },
    cardSlider_disableSliderXs: {
        '@media (max-width: 743px)': {
            marginBottom: '0px',
            padding: '0 16px',
            overflow: 'visible',
            whiteSpace: 'normal',
            marginTop: '0px'
        }
    },
    cardSlider_disableSliderSm: {
        '@media (max-width: 1128px)': {
            marginBottom: '0px',
            padding: '0 16px',
            overflow: 'visible',
            whiteSpace: 'normal',
            marginTop: '0px'
        }
    },
    cardSlider_disableSliderMd: {
        '@media (min-width: 1128px)': {
            marginBottom: '0px',
            padding: '0px',
            overflow: 'visible',
            whiteSpace: 'normal',
            marginTop: '0px'
        }
    },
    cardSlider_disableSliderLg: {
        '@media (min-width: 1128px)': {
            marginBottom: '0px',
            padding: '0px',
            overflow: 'visible',
            whiteSpace: 'normal',
            marginTop: '0px'
        }
    },
    responsiveColumn_portraitLarge: {
        display: 'inline-block',
        verticalAlign: 'top',
        whiteSpace: 'normal',
        '@media (min-width: 1284px)': {
            width: '16.666666666666668%'
        },
        '@media (min-width: 1078px) and (max-width: 1283px)': {
            width: '20%'
        },
        '@media (min-width: 872px) and (max-width: 1077px)': {
            width: '25%'
        },
        '@media (min-width: 666px) and (max-width: 871px)': {
            width: '33.333333333333336%'
        },
        '@media (max-width: 665px)': {
            width: '50%'
        }
    },
    responsiveColumn_normal: {
        display: 'inline-block',
        verticalAlign: 'top',
        whiteSpace: 'normal',
        '@media (min-width: 1548px)': {
            width: '20%'
        },
        '@media (min-width: 1248px) and (max-width: 1547px)': {
            width: '25%'
        },
        '@media (min-width: 948px) and (max-width: 1247px)': {
            width: '33.333333333333336%'
        },
        '@media (min-width: 648px) and (max-width: 947px)': {
            width: '50%'
        },
        '@media (max-width: 647px)': {
            width: '66.6667%'
        }
    },
    responsiveColumn_portraitSmall: {
        display: 'inline-block',
        verticalAlign: 'top',
        whiteSpace: 'normal',
        '@media (min-width: 1472px) and (max-width: 1649px)': {
            width: '12.5%'
        },
        '@media (min-width: 1294px) and (max-width: 1471px)': {
            width: '14.285714285714286%'
        },
        '@media (min-width: 1116px) and (max-width: 1293px)': {
            width: '16.666666666666668%'
        },
        '@media (min-width: 938px) and (max-width: 1115px)': {
            width: '20%'
        },
        '@media (min-width: 760px) and (max-width: 937px)': {
            width: '25%'
        },
        '@media (max-width: 759px)': {
            width: '33.333333333333336%'
        }
    },
    responsiveColumn_square: {
        display: 'inline-block',
        verticalAlign: 'top',
        whiteSpace: 'normal',
        '@media (min-width: 1284px)': {
            width: '16.666666666666668%'
        },
        '@media (min-width: 1078px) and (max-width: 1283px)': {
            width: '20%'
        },
        '@media (min-width: 872px) and (max-width: 1077px)': {
            width: '25%'
        },
        '@media (min-width: 666px) and (max-width: 871px)': {
            width: '33.333333333333336%'
        },
        '@media (max-width: 665px)': {
            width: '50%'
        }
    },
    responsiveColumn_search: {
        display: 'inline-block',
        verticalAlign: 'top',
        whiteSpace: 'normal',
        width: '100%',
        '@media (min-width: 1440px)': {
            width: '33.333333333333336%'
        },
        '@media (min-width: 1128px) and (max-width: 1439px)': {
            width: '50%'
        },
        '@media (min-width: 744px) and (max-width: 1127px)': {
            width: '100%'
        }
    }
});

export default styles;
