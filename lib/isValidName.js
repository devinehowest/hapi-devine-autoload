module.exports = f => {
  if (f === `index.js` || !f.endsWith(`.js`) || f.startsWith(`_`)) return false;
  return true;
};
