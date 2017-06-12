const chalk = require(`chalk`);
const path = require(`path`);

module.exports = plugin => {

  const {local, dir, folder} = plugin;
  let {name} = plugin;

  if (local) {
    const base = path.basename(folder);
    name = `${base}/${name}${dir ? `/index.js` : `.js`}`;
  }


  console.log(
    `${chalk.yellow(`hapi-devine-autoload`)}: finished registering ${chalk.cyan(`'${name}'`)}`
  );


};
