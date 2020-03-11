
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        padding: '20px 0'
    },
    containerInline: {
        display: 'inline-block',
        pointerEvents: 'none'
    },
    baseline: {
        borderBottom: '1px solid #DBDBDB'
    },
    titleContainer: {
        marginTop: '16px',
        marginBottom: '32px'
    },
    text: {
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    size_regular: {
        fontSize: '19px',
        lineHeight: '24px',
        letterSpacing: 'undefined'
    },
    weight_light: {
        fontWeight: 300
    },
    collapsedTitleContainer: {
        paddingTop: '24px',
        paddingBottom: '24px'
    },
    containerFallback: {
        textAlign: 'justify',
        lineHeight: 0,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    beforeFallback: {
        display: 'inline-block',
        verticalAlign: 'middle',
        flexGrow: 1
    },
    afterFallback: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    textInline: {
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        display: 'inline'
    },
    component_button: {
        color: '#00c8ff',
        font: 'inherit',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        textDecoration: 'none',
        appearance: 'none',
        background: 'transparent',
        border: '0px',
        cursor: 'pointer',
        margin: '0px',
        padding: '0px',
        textAlign: 'left',
        userSelect: 'auto',
        outline: 'none'
    },
    iconWrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',
        transitionProperty: '-ms-transform,-webkit-transform,transform',
        transitionDuration: '250ms',
        transitionTimingFunction: 'ease-in-out'
    }
});

export default styles;
