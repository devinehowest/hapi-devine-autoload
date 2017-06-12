module.exports = (plugins, key) => {

  const next = plugins.filter(p => p.options.after === key).map(p => p.name);

  return next ? next : [];

};
