/* global language_code XMLHttpRequest */

import { map as Rmap } from 'ramda';

function getLangFile(page) {
    const url = `/lang/${language_code}/${page}_lang.json`; // eslint-disable-line camelcase
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function loadLang(pages = []) {
    const lang = {};
    let counter = 0;
    return new Promise((resolve) => {
        Rmap((page) => {
            getLangFile(page)
            .then((response) => {
                lang[page] = JSON.parse(response);
                counter += 1;
                if (counter === pages.length) {
                    resolve(lang);
                }
            }).catch(error => console.log(error));
        }, pages);
    });
}

function parseLangLine(line, ...args) {
    let string = line;
    for (let i = 1; i < args.length + 1; i += 1) {
        const regex = new RegExp(`{{(${i})}}`, 'g');
        string = string.replace(regex, args[i - 1]);
    }
    return string;
}

export {
    loadLang,
    parseLangLine
};
