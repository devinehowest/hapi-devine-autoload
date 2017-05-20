module.exports = ({name, dir}) => {

  if (dir) return !name.startsWith(`_`);
  return name !== `index.js` && name.endsWith(`.js`) && !name.startsWith(`_`);

};
