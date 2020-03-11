import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'none',
        appearance: 'none',
        background: 'none',
        border: 'none',
        padding: '0px',
        margin: '0px',
        outline: 'none',
        '@media (max-width: 1024px)': {
            display: 'table-cell'
        }
    },
    content: {
        display: 'table-cell',
        height: '64px',
        position: 'relative',
        textAlign: 'center',
        textDecoration: 'none',
        transition: '0.25s color',
        paddingLeft: '24px',
        paddingRight: '24px',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap'
    },
    icon: {
        color: '#FF5A5F',
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: '34px',
        transition: '0.25s color'
    },
    iconWrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        transitionDuration: '250ms',
        transitionTimingFunction: 'ease-in-out'
    },
    invisibleText: {
        position: 'absolute',
        top: 0,
        clip: 'rect(1px, 1px, 1px, 1px)',
        clipPath: 'inset(0px 0px 99.9% 99.9%)',
        overflow: 'hidden',
        height: '1px',
        width: '1px',
        padding: 0,
        border: 0,
        left: 'auto'
    },
    logo: {
        display: 'table-cell'
    },
    logoContainer: {
        position: 'relative',
        zIndex: 20
    },
    logoContainerLink: {
        display: 'none',
        '@media (min-width: 1025px)': {
            display: 'table-cell'
        }
    },
    logoLink: {
        fontSize: '16px',
        lineHeight: '2.75',
        fontWeight: 400,
        letterSpacing: 'normal',
        opacity: 1,
        msFilter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=$ieopacity)',
        filter: 'alpha(opacity=100)',
        position: 'relative',
        zIndex: 1,
        display: 'inline-block',
        padding: '0 10px',
        height: '44px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
        webkitTapHighlightColor: 'transparent',
        outlineOffset: '-7px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '96px 176px',
        backgroundPosition: 'center center',
        width: '92px',
        backgroundImage: 'url(/css/images/globalnav/zipcube/zipcube_logo_black_full.svg)'
    },
    menuIndicator: {
        color: '#767676',
        display: 'table-cell',
        fontSize: '9px',
        paddingLeft: '22px',
        verticalAlign: 'middle',
        transition: '1s color',
        '@media (min-width: 1025px)': {
            display: 'none'
        },
        '@media (max-width: 744px)': {
            paddingLeft: '15px'
        }
    }
});

export default styles;
