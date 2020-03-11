function compareObjects(x, y) {
    let objectsAreSame = true;
    for (const propertyName in x) {
        if (x[propertyName] !== y[propertyName]) {
            objectsAreSame = false;
            break;
        }
    }
    return objectsAreSame;
}

function diffArraysOfObjects(a, b) {
    const onlyInA = a.filter(current =>
        b.filter(currentB =>
            currentB.value === current.value && currentB.display === current.display).length === 0);
    const onlyInB = b.filter(current =>
        a.filter(currentA =>
            currentA.value === current.value && currentA.display === current.display).length === 0);
    return onlyInA.concat(onlyInB);
}

export {
    compareObjects,
    diffArraysOfObjects,
};
