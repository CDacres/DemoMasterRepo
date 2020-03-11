export function batchMap(array, fn, options, callback, params) {
    const initialTimeout = options.initialTimeout || 0;
    const batchSize = options.batchSize || 50;
    let timeoutMs = options.timeoutMs || 0;

    function map(done, todo) {
        if (done.length === 0) {
            setTimeout(() => {
                const mapped = todo.slice(0, batchSize).map((item) => {
                    fn(item, params);
                });
                map(done.concat(mapped), todo.slice(batchSize));
            }, initialTimeout);
        } else if (todo.length > 0) {
            // if (options.random) timeoutMs = ((Math.floor(Math.random() * 6) + 2) * 5000).toFixed();
            if (options.random) timeoutMs = 15000;
            setTimeout(() => {
                const mapped = todo.slice(0, batchSize).map((item) => {
                    fn(item, params);
                });
                map(done.concat(mapped), todo.slice(batchSize));
            }, timeoutMs);
        } else if (callback) {
            callback(null, done);
        }
    }
    map([], array);
}
