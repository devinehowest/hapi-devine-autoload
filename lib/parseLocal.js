const path = require(`path`);
const fs = require(`fs`);

module.exports = ({folder, name} = {}) => {

  const p = path.join(folder, name);
  const dir = fs.lstatSync(p).isDirectory();

  return {folder, name, dir};

};
