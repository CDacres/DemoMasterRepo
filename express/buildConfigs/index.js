const data = require('./aliases.json');
require('./buildAliases').default(data);
require('./buildBabelRc').default(data);
require('./buildTsConfig').default(data);