/* global $ */

const consoleLog = (raw) => {
    const [colour, label, ...message] = raw.split(' ');
    return [
        `%c${label}`,
        `color: white; background-color: ${colour}; padding: 0 .5em`,
    ];
};

export function ConsoleLog(type, message) {
    let string = '';
    switch (type) {
    case 'success':
        string += 'green success ';
        break;
    case 'warning':
        string += 'orange warning ';
        break;
    case 'error':
        string += 'red error ';
        break;
    default:
        string += 'blue info ';
        break;
    }
    console.log(...consoleLog(string));
    console.log(message);
}

export function getVertical() {
    const usages = $.query.GET('usages') ? JSON.parse($.query.GET('usages')) : [3];
    if (usages.includes(1)) {
        return 'private offices';
    } else if (usages.includes(6)) {
        return 'event spaces';
    } else if (usages.includes(5, 13, 14)) {
        return 'desks';
    }
    return 'rooms';
}
