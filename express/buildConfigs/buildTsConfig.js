// this
const fs = require('fs');

module.exports.default = function(aliases) {

  const aliasString = Object.keys(aliases).map((alias) => {
    const path = aliases[alias];
    return `"@${alias}": ["${path}"],\n      "@${alias}/*": ["${path}/*"]`
  }).concat([`"@src/*": ["*"]`]).join(',\n      ');

  let config = {
    "compilerOptions": {
      "target": "esnext",
      "module": "esnext",
      "jsx": "preserve",
      "allowJs": true,
      "moduleResolution": "node",
      "allowSyntheticDefaultImports": true,
      "experimentalDecorators": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "removeComments": true,
      "preserveConstEnums": true,
      "sourceMap": true,
      "skipLibCheck": true,
      "baseUrl": ".",
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      "strict": false,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "resolveJsonModule": true,
      "isolatedModules": true
    },
    "exclude": [
      "node_modules"
    ],
    "include": [
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx"
    ]
  };
  config.compilerOptions.paths = JSON.parse(`{${aliasString}}`);

  const outputJSON = JSON.stringify(config, null, 2);

  const output =
`// This file is automatically created - to update use the templates in './buildConfigs'
${outputJSON}`

  fs.writeFile('./src/tsconfig.json', output, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('TsConfig saved!');
  });
}



