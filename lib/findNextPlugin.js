module.exports = (plugins, key) => {

  const plugin = plugins.find(p => p.options.after === key);

  return plugin ? plugin.name : false;

};
