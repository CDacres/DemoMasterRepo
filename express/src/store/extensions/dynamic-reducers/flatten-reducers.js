export default function flattenReducers(reducers, parentKey) {
  // If the reducers is a function, not an object
  if (typeof reducers === 'function') {
    // Replace all those pesky forward slashes in the reducer with full stops and return the object
    return { [parentKey.replace(/\//g, '.')]: reducers };
  }

  // Otherwise reduce the dastardly reducers down to a new object and flatten each one as you go
  return Object.keys(reducers).reduce(
    (reducerMap, key) => ({
      ...reducerMap,
      ...flattenReducers(reducers[key], parentKey ? `${parentKey}.${key}` : key)
    }),
    {}
  );
}
