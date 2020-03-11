
export const concatAll = (array) => {
    const results = [];
    array.forEach(subArray => results.push(...subArray));
    return results;
};

export const concatMap = (array, projectionFunction) =>
    concatAll(array.map(item => projectionFunction(item)));
