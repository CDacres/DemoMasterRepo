// this
const fs = require('fs');

module.exports.default = function(aliases) {

  const aliasString = Object.keys(aliases).map((alias) => {
    const path = aliases[alias];
    return `'@${alias}': path.resolve(__dirname, 'src/${path}')`
  }).concat([`'@src': path.resolve(__dirname, 'src')`]).join(',\n  ');

  const output =
`// This file is automatically created - to update use the templates in './buildConfigs'
const path = require('path');

module.exports = {
  ${aliasString}
};
`
  fs.writeFile('aliases.js', output, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Aliases saved!');
  });
}



