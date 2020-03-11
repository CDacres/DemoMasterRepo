
import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    center: {
        textAlign: 'center'
    },
    buttonList: {
        margin: '0px',
        padding: '0px'
    },
    buttonContainer: {
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLight: '8px',
        marginRight: '8px'
    },
    chevronButton: {
        backgroundColor: 'transparent',
        borderColor: '#00c8ff',
        color: '#00c8ff',
        border: '1px solid',
        width: '32px',
        height: '32px',
        borderRadius: '16px',
        position: 'relative'
    },
    chevronContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '0.75em'
    },
    elipsis: {
        userSelect: 'none',
        transform: 'translateY(-0.35em)'
    },
    link: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#00c8ff',
        textDecoration: 'none'
    },
    linkSelected: {
        color: '#FFFFFF'
    },
    noLeftMargin: {
        marginLeft: 0
    },
    noRightMargin: {
        marginRight: 0
    },
    numberContainer: {
        width: '32px',
        height: '32px',
        borderRadius: '16px',
        lineHeight: '32px',
        textAlign: 'center'
    },
    numberContainer_selected: {
        backgroundColor: '#00c8ff',
        color: '#ffffff'
    },
    text: {
        color: '#484848',
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        margin: '0px',
        wordWrap: 'break-word',
        letterSpacing: 'undefined',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    size_regular: {
        fontSize: '19px'
    },
    weight_light: {
        fontWeight: 300
    }
});

export default styles;
