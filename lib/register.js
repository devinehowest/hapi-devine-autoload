const {omit} = require(`lodash`);
const path = require(`path`);

const logger = require(`./log`);

const register = ({plugin, server, log, plugins}) => {

  const {
    options = {},
    name,
    local,
    dir = false,
    folder = ``
  } = plugin;

  let {next} = options;
  if (next) next = plugins.filter(p => next.includes(p.name));

  const module = local ? path.join(folder, `${name}${dir ? `/index.js` : ``}`) : name;

  server.register({

    register: require(module),
    options: omit(options, [`after`])

  }, err => {

    if (err) console.error(err);
    if (log) logger(plugin);

    if (next.length > 0) {

      next.forEach(p => {
        register({plugin: p, server, log, plugins});
      });

    }

  });

};

module.exports = register;
