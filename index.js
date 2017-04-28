const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);

const isValidName = require(`./lib/isValidName`);

module.exports.register = (server, options, next) => {

  const {
    path: p,
    plugins = [],
    log = true,
    pluginOptions = {}
  } = options;

  const register = (f, isModule = true, isDir = false) => {

    const plugin = require(f);

    const name = isModule ? f : path.basename(f, `.js`);

    server.register({

      register: plugin,
      options: pluginOptions[name]

    }, err => {

      if (err) console.error(err);

      else {

        if (log) {

          const base = isModule ? `` : `${path.basename(p)}/`;
          const ext = isModule ? `` : isDir ? `/index.js` : `.js`;
          const n = `${base}${name}${ext}`;

          console.log(
            `${chalk.yellow(`hapi-devine-autoload`)}: registered ${chalk.cyan(`'${n}'`)}`
          );

        }

      }

    });


  };

  if (log) console.log(``);

  plugins.forEach(p => {
    register(p.register.attributes.pkg.name, true);
  });

  if (p) {
    fs.readdirSync(p).forEach(f => {

      if (f.startsWith(`_`)) return;

      const ff = path.join(p, f);
      const isDir = fs.lstatSync(ff).isDirectory();

      if (!isDir && !isValidName(f)) return;

      register(ff, false, isDir);

    });
  }

  if (log) console.log(``);

  next();

};

module.exports.register.attributes = {
  pkg: require(`./package.json`)
};
