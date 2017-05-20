const fs = require(`fs`);
const parseLocal = require(`./parseLocal`);
const parseRemote = require(`./parseRemote`);

const isValidName = require(`./isValidName`);
const findNextPlugin = require(`./findNextPlugin`);

const parsePlugins = (plugins, opt) => {

  return plugins.map(p => {
    p.options = opt[p.name] || {};
    p.local = p.folder ? true : false;
    return p;
  }).map((p, _, arr) => {
    p.options.next = findNextPlugin(arr, p.name);
    return p;
  });

};

module.exports = ({folder, arr, options} = {}) => {

  const plugins = arr.map(name => parseRemote({name}));

  return new Promise((resolve, reject) => {

    if (folder && fs.existsSync(folder)) {

      fs.readdir(folder, (err, files) => {

        if (err) return reject(err);

        files = files
          .map(f => parseLocal({name: f, folder}))
          .filter(isValidName);

        return resolve(parsePlugins([...files, ...plugins], options));

      });

    } else {

      return resolve(parsePlugins(plugins, options));

    }

  });




};
