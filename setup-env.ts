const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: ${process.env['PRODUCTION'] || false},
  appId: '${process.env['APP_ID'] || 'my-app'}'
};`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.brightGreen(envConfigFile + ' \n'));
fs.writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    throw console?.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
