
import { StyleSheet } from 'aphrodite';

const width = StyleSheet.create({
    full: {
        width: '100%'
    },
    oneThird: {
        width: '33.3333%'
    },
    twoThirds: {
        width: '66.6666%'
    }
});

const align = StyleSheet.create({
    verticalAlignMiddle: {
        verticalAlign: 'middle'
    },
    verticalAlignTop: {
        verticalAlign: 'top'
    }
});

const whiteSpace = StyleSheet.create({
    normal: {
        whiteSpace: 'normal'
    }
});

const display = StyleSheet.create({
    block: {
        display: 'block'
    },
    inline: {
        display: 'inline'
    },
    inlineBlock: {
        display: 'inline-block'
    },
    table: {
        display: 'table'
    },
    tableCell: {
        display: 'table-cell'
    }
});

const position = StyleSheet.create({
    relative: {
        position: 'relative'
    }
});

const float = StyleSheet.create({
    left: {
        float: 'left'
    },
    none: {
        float: 'none'
    },
    right: {
        float: 'right'
    }
});

const border = StyleSheet.create({
    borderless: {
        borderRadius: '2px',
        borderColor: '#ffffff'
    },
    none: {
        border: 0
    }
});

const margin = StyleSheet.create({
    none: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
    }
});

const type = StyleSheet.create({
    base: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '19px',
        lineHeight: '24px',
        letterSpacing: 'undefined'
    },
    copy: {
        color: '#484848',
        marginLeft: '8px',
        verticalAlign: 'middle'
    },
    small: {
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px'
    }
});

const container = StyleSheet.create({
    base: {
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        borderRadius: '4px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#DBDBDB',
        boxShadow: '0 1px 3px 0px rgba(0, 0, 0, 0.08)',
        padding: '0px'
    },
    borderLeft: {
        borderLeft: '1px solid #e4e4e4'
    },
    borderRight: {
        borderRight: '1px solid #e4e4e4'
    },
    table: {
        display: 'table',
        tableLayout: 'fixed'
    },
    tableCell: {
        display: 'table-cell',
        verticalAlign: 'middle',
        position: 'relative',
        transition: 'width 0.3s'
    }
});

const input = StyleSheet.create({
    base: {
        paddingTop: '0px',
        paddingBottom: '0px',
        border: '0px'
    },
    button: {
        fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        background: '#ffffff',
        border: '0px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline',
        textAlign: 'left',
        padding: '11px 12px',
        position: 'relative',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        outline: 'none'
    },
    container: {
        overflow: 'hidden',
        position: 'relative'
    },
    ellipsis: {
        textOverflow: 'ellipsis'
    },
    fakeValuePlaceholder: {
        color: '#484848',
        backgroundColor: 'transparent'
    },
    focusUnderline: {
        position: 'absolute',
        left: '0px',
        right: '0px',
        bottom: '0px',
        height: '2px',
        background: '#00c8ff',
        transition: 'opacity 0.3s',
        opacity: 0,
        zIndex: 1
    },
    icon: {
        color: '#767676',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    labelHidden: {
        position: 'absolute',
        display: 'block',
        border: '0px',
        margin: '-1px',
        padding: '0px',
        height: '1px',
        width: '1px',
        clip: 'rect(0, 0, 0, 0)',
        overflow: 'hidden'
    },
    prefix: {
        paddingLeft: '12px',
        paddingTop: '11px'
    }
});

const zIndex = StyleSheet.create({
    0: {
        zIndex: 0
    },
    1: {
        zIndex: 1
    },
    2: {
        zIndex: 2
    },
    3: {
        zIndex: 3
    },
    4: {
        zIndex: 4
    },
    5: {
        zIndex: 5
    }
});

export {
    align,
    border,
    container,
    display,
    float,
    input,
    margin,
    position,
    type,
    whiteSpace,
    width,
    zIndex
};
