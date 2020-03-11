import 'babel-polyfill';
import 'es6-promise/auto';
import $ from 'jquery';
import 'jquery-ui';

$.put = function(url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = {};
    }
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
};

$.delete = function(url, data, callback, type) {
    if ($.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = {};
    }
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
        contentType: type
    });
};

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

if (!Array.prototype.concatAll) {
    Array.prototype.concatAll = function concatAll() {
        const results = [];
        this.forEach(subArray => results.push.apply(results, subArray));
        return results;
    };
}

if (!Array.prototype.concatMap) {
    Array.prototype.concatMap = function concatMap(projectionFunction) {
        return this.map(item => projectionFunction(item)).concatAll();
    };
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                // c. Increase k by 1.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

// Lazy loading dev analytics for speed:
//import('./analytics/index.js').then((analytics) => {
//    analytics.init();
//});

// function getCheckoutLogs() {
//     $.get('/api/v1/analytics?logtype=checkout')
//     .done((response) => {
//         response.map((log) => {
//             console.log(JSON.parse(log.data));
//         });
//     })
//     .fail(console.log);
// }
