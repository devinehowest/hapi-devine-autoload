const register = require(`./register`);

module.exports = (plugins, server, log = false) => {
  plugins.filter(p => !p.options.after).forEach(p => register({plugin: p, server, log, plugins}));
};
