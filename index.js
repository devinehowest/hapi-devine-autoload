const buildPlugins = require(`./lib/buildPlugins`);
const registerPlugins = require(`./lib/registerPlugins`);

module.exports.register = (server, options, next) => {

  const {
    path: p,
    plugins = [],
    pluginOptions = {},
    log = true
  } = options;

  if (log) console.log(``);

  buildPlugins({arr: plugins, folder: p, options: pluginOptions})
    .then(plugins => registerPlugins(plugins, server, log))
    .then(() => {
      if (log) console.log(``);
      return next();
    });

};

module.exports.register.attributes = {
  pkg: require(`./package.json`)
};
